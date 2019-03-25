/**
 * 实名认证js文件
 * @author yangjinlai 2017-02-14

 **实名认证拆分
 ** @author zhangyanping 2018-07-06

 ** 鉴权需要传的capitalMode对应的是银行列表里的bankChanel字段
-->
 */

require('../../../../include/js/vendor/config.js');

require('../../../../include/js/vendor/mui/mui.picker.min.js');

//zepto模块
require('../../../../include/js/vendor/zepto/callback.js');
require('../../../../include/js/vendor/zepto/deferred.js');

//确认是否离开当前页面的函数
var ConfirmAwayNowPage = require('../../../../common/js/components/ConfirmAwayNowPage.js');
//黑色提示条
var tipAction = require('../../../../common/js/components/tipAction.js');
var getBranchList = require('../../../../common/json/branchList.js');
var autoTextarea =  require('../../../../common/js/components/autoTextarea.js');
require('../../../../common/js/input.js');
require('../../../../common/js/components/utils.js');
require('../../../../common/js/ajaxLoading.js');
require('../../../../common/js/components/elasticLayer.js');
var shipFnc=require('../../../../common/js/components/shipSec.js');
var splitUrl = require('../../../../common/js/components/splitUrl.js');
var Base64 = require('../../../../include/js/vendor/base64/base64.js');
//刷新图文验证码
var getNewTwyzm = require('../../../../common/js/components/getNewTwyzm.js');
$(function(){

	var realName = {

		investSelect:'',
		shipSelect:'',
		badCoreSelect:'',

		getElements : {
			nextBtn: '.nextBtn', //下一步的按钮
			//submitBtn: '.submitBtn', //下一页，提交按钮
			closeBtn: '.branchSearchArea .close', //支行信息查询区域关闭按钮
		},

		setting: {
			//跳转到实名认证的页面，都需要在Url地址上添加来时的链接
			//originUrl，且用base64编码
			originUrl : splitUrl()['originUrl'],
		},

		//初始化函数
		init: function(){
			var that = this;

			//页面初始ajax请求
			that.getData();


			//页面打开后最先执行
			that.beforeSetFunc();

			//调用绑定事件函数
			that.eventsFunc();
		},

		//页面初始数据
		getData: function(){
			var that = this;

			//从localstorage中取数据回显
			if(sessionStorage.hasData){
				$('[check=name]').val(sessionStorage.name); //姓名
				//证件类型
				$('[check=idTypeSelect]').html(sessionStorage.idTypeTxt)
					.attr('num', sessionStorage.idTypeNum).addClass('hasSelect');
				//证件号
				$('[check=num_1]').val(sessionStorage.idNum);
				//银行卡号
				$('[check=bankNum]').val(sessionStorage.bankNum);
				//发卡银行
				$('[check=bankSelect]').html(sessionStorage.bankInfoTxt)
					.attr({'num': sessionStorage.bankInfoNum,'sonDicNo': sessionStorage.sonDicNo}).addClass('hasSelect');

				//银行省名称
				$('[check=bankProvinceSelect]').html(sessionStorage.provinceName)
					.attr('num', sessionStorage.provinceId)
					.addClass('hasSelect');
				//银行城市名称
				$('[check=provinceCitySelect]').html(sessionStorage.cityName)
					.attr('num', sessionStorage.cityId)
					.addClass('hasSelect');
				//支行信息
				$('[check=branchSelect]').html(sessionStorage.branchTxt)
					.attr('num', sessionStorage.branchNo).addClass('hasSelect');
				getBranchList();

			}else{

				//请求接口数据
				var obj = [{
					url: site_url.queryUserInfoToAuth_api,
					data: {
						hmac:"", //预留的加密信息
						params:{//请求的参数信息
					    }
					},
					needLogin: true,
					needDataEmpty: false,
					callbackDone: function(json){
						var jsonData = json.data;

						//已实名认证
						//回显姓名
						if( !$.util.objIsEmpty(jsonData)){
							if( !!jsonData.maskName ){
								$('[check=name]').val( jsonData.maskName ).attr('disabled','disabled'); //姓名
							}

							//证件类型
							if( !!jsonData.id_kind_gb && jsonData.id_kind_gb_desc){
								$('[check=idTypeSelect]').html( jsonData.id_kind_gb_desc )
									.attr('num', jsonData.id_kind_gb ).addClass('hasSelect').addClass('unable');
							}

							//证件号码,返显用idNoEncrypt
							if( !!jsonData.idNoEncrypt ){
								$('[check=num_1]').val( jsonData.idNoEncrypt ).attr('disabled','disabled')
								.attr("decrypedField",jsonData.id_no).attr("needCheck",false);
							}

						}
						//回显完成后要调用一次textarea
						$.each($("textarea"),function(i,el){
				        	autoTextarea(el);// 调用
				       	})
					},
					callbackFail: function(json){

					}
				}];
				$.ajaxLoading(obj);
			};
		},

		//页面打开后最先执行的逻辑
		beforeSetFunc: function(){
			var that = this;

			//初始化mui
			mui.init();

			//将originUrl保存起来，用于实名认证第二屏和第三屏成功后返回
			sessionStorage.setItem('originUrl', that.setting.originUrl);

			//从url上获取originUrl参数
			//var originUrl = splitUrl()['originUrl'];
			$('[check=shipSelect]').addClass("hasSelect").attr('num',0);
			$('[check=badCoreSelect]').addClass("hasSelect").attr('num',0);
			//使textarea自动适应获取高度
			$.each($("textarea"),function(i,el){
	        	autoTextarea(el);// 调用
	        })

			//确认是否离开当前页面的函数
			ConfirmAwayNowPage( '您是否确定要放弃实名认证？', that.setting.originUrl );

		},


		//该函数里绑定事件
		eventsFunc: function(){
			var that = this;

			//点击下一步按钮
			mui("body").on('tap', that.getElements.nextBtn, function(){
				var $this = $(this);

				var result = $.checkInput();
				if( !result ){
					//校验未通过
					return false;
				}

				//判断是否选择多选框
				if( !$('.agreement input[type=checkbox]').is(':checked') ){
                    console.log('未选择复选框');
                    tipAction("请阅读并勾选协议");
                    return false;
                }

                //校验通过----不与ajax交互，不做改变状态
				//$this.attr("disabled", true).addClass('disable');

				//校验通过，存入localstorage
				$.each(result, function(i, el){
					if( el.check == 'name' ){
						sessionStorage.name = el.result; //姓名
						if($(".investSelect .value").html()=="本人"){
							realName.investSelect=el.result;
						}
					}else if( el.check == 'idTypeSelect'){
						sessionStorage.idTypeNum = el.result; //证件类型num
						sessionStorage.idTypeTxt = $('[check=idTypeSelect]').html(); //证件类型文案
					}
					else if( el.check == 'num_1'){
						sessionStorage.idNum = el.result; //证件号
					}
					else if( el.check == 'bankNum'){
						sessionStorage.bankNum = el.result; //银行卡号
					}else if( el.check == 'bankSelect'){
						sessionStorage.bankInfoNum = el.result; //发卡银行
						sessionStorage.bankInfoTxt = $('[check=bankSelect]').html(); //发卡银行文案
						sessionStorage.sonDicNo = $('.bankSelect [check=bankSelect]').attr('sonDicNo');
					}else if( el.check == 'bankProvinceSelect'){
						//银行省名称
						sessionStorage.provinceId = $('.bankProvinceSelect [check=bankProvinceSelect]').attr('num');
						sessionStorage.provinceName= $('.bankProvinceSelect [check=bankProvinceSelect]').html();
					}
					else if( el.check == 'provinceCitySelect'){  //银行城市名称
						//城市
						sessionStorage.cityId = $('.provinceCitySelect [check=provinceCitySelect]').attr('num');
						//城市名称
						sessionStorage.cityName = $('.provinceCitySelect [check=provinceCitySelect]').html();
					}else if( el.check == 'branchSelect'){
						//支行代码
						sessionStorage.branchNo = el.result;
						sessionStorage.branchTxt = $('[check=branchSelect]').html(); //支行列表文案
					}else if( el.check == 'vocaSelect'){
						sessionStorage.vocationNo = el.result;
						sessionStorage.vocationTxt = $('[check=vocaSelect]').html(); //职业类型文案
					}else if( el.check == 'perAddress'){
						var reg=/[.]{3}$/g;
						if(sessionStorage.address){
							if(!reg.test(el.result)){
								sessionStorage.address=el.result;
							}
						}else{
							sessionStorage.address=el.result;
						}
					}else if( el.check == 'bankPhone' ){
						bankphone = el.result; //银行预留手机号码
					}else if( el.check == 'twyzm'){
						twyzm = el.result; //图文验证码
					}else if( el.check == 'dxyzm'){
						dxyzm = el.result; //图文验证码
					}
				})
				sessionStorage.hasData = true;

				var obj = [{
					url: site_url.realNameSubmit_api,
					data: {
						hmac:"", //预留的加密信息
						params:{//请求的参数信息
							custName: sessionStorage.name,//持卡人姓名
							custIdNo: sessionStorage.idNum,//证件号码
							custIdType: sessionStorage.idTypeNum,//证件类型【参照备注】
							bankName: sessionStorage.bankInfoTxt, //银行名称
							bankIdNo: sessionStorage.bankInfoNum ,//银行代号
							bankCardNo: sessionStorage.bankNum,//银行卡号
							mobileNo: bankphone,//预留手机号码
							branchNo: sessionStorage.branchNo,//支行代码
							clientType:'wap',//客户端类型
							smsCode: dxyzm,//短信验证码
							originalSerialNo: $('body').attr('serialNo'),//原流水号（获取短信返回的流水号）
							imgCode: twyzm, //图文验证码
							cityId:sessionStorage.cityId,//银行城市id
							cityName:sessionStorage.cityName,//银行城市名称
							provinceId:sessionStorage.provinceId,//银行省id
							provinceName:sessionStorage.provinceName,//银行省名称
							subbranch:sessionStorage.branchTxt,//支行名称
							capitalMode:sessionStorage.sonDicNo, //银行卡鉴权类型(根据银行列表取值)
 						}
					},
					needLogin: true,
					needDataEmpty: false,
					callbackDone: function(json){

						//判断是否进入公募开户页面
						if( json.data.openAccount == 0){
							//未开户，进入公募开户页面，交易密码设置页面
							$this.removeAttr("disabled").removeClass('disable');
							window.location.href = site_url.realNameStepThree_url;
						}else{
							//公募已开户，判断私募实名认证是否成功
							if( json.data.privateOfferStatus == 0){
								 //私募实名认证成功,直接显示实名认证成功页面
								 $this.removeAttr("disabled").removeClass('disable');
								 window.location.href = site_url.realNameStepFour_url;
							}else{
								//私募实名认证失败，显示错误提示
								tipAction(json.data.privateOfferMsg, function(){
									$this.removeAttr("disabled").removeClass('disable');
								})

							}
						}
					},
					callbackFail: function(json){
						tipAction(json.msg, function(){
							getNewTwyzm();
							$this.removeAttr("disabled").removeClass('disable');
						});
					},
				}]
				$.ajaxLoading(obj);

				//跳转到下一步页面
				// window.location.href = site_url.realNameStepTwo_url + '?originUrl';

			})

			//支行列表查询区域关闭
			mui("body").on('tap', that.getElements.closeBtn, function(){
				//$('.inputWrap').hide();
            	$('.branchSearchArea').hide();

			})

			//支行列表查询区域选择
			mui("body").on('tap', '.branchSearchArea li', function(){
				$('.branchSelect [check=branchSelect]').html($(this).html()).attr('num', $(this).attr('branchNo')).addClass('hasSelect')
				$('.branchSearchArea').hide();
			})

		}
	}

	realName.init();
})
