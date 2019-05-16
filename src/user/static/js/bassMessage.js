/* 基本信息页面
 * author zhangweipeng 2017-05-31
 */
 
require('../../../include/js/vendor/config.js');  
    
require('../../../include/js/vendor/mui/mui.picker.min.js');    
 
//zepto模块 
require('../../../include/js/vendor/zepto/callback.js');   
require('../../../include/js/vendor/zepto/deferred.js'); 
//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');   
var autoTextarea =  require('../../../common/js/components/autoTextarea.js');   
require('../../../common/js/input.js');   
require('../../../common/js/components/utils.js'); 
require('../../../common/js/ajaxLoading.js');
var splitUrl = require('../../../common/js/components/splitUrl.js'); 
var Base64 = require('../../../include/js/vendor/base64/base64.js'); 
 
$(function(){
	 
	var realName = {  
		 
		getElements : {
			nextBtn: '.keep', //下一步的按钮
			//submitBtn: '.submitBtn', //下一页，提交按钮
			closeBtn: '.branchSearchArea .close', //支行信息查询区域关闭按钮
		},
 
		setting: {
			//跳转到实名认证的页面，都需要在Url地址上添加来时的链接 
			//originUrl，且用base64编码
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
					//回显姓名
					if( !!jsonData.maskName ){
						$('.fontName').html( jsonData.maskName ); //姓名 
					}
					//出生日期  ---
					if( !!jsonData.birthday ){
						$('[check=birthSelect]').html( jsonData.birthday ).addClass('unable ')
							.attr("num",1);
					}
					//职业类型
					if( !!jsonData.vocation ){
						$('[check=vocaSelect]').html( jsonData.vocation).addClass('unable')
							.attr("num",1);
					}
					if(!!jsonData.beneficiary ){
						$('[check=investSelect]').html("其他主体").attr("num","1")
							.addClass('unable');
						$('[check=beneificiaryName]').val(jsonData.beneficiary)
							.attr('disabled','disabled');
					}
					//通讯地址
					if( !!jsonData.messageAddress ){
						$('[check=address]').val( jsonData.messageAddress.length>40?jsonData.messageAddress.substring(0,37)+"..." : jsonData.messageAddress )
							.attr('disabled','disabled');
					}
					if(splitUrl()["src"] == "per"){
			
					}else if(splitUrl()["src"] == "org"){
							//回显姓名
						if( !!jsonData.maskName ){
							$('.contactName').html( jsonData.contactName ); //姓名 
						}
					}
					

				},
				     
			}];
			$.ajaxLoading(obj);
			
			//判断是否显示受益人模块，主要用于数据回显时
			if($('.investSelect [check=investSelect]').attr("num")== "1" ){
				$(".investSelect").parent().removeClass("isBor");
                $(".beneificary").show().find("input").removeClass("noShow");
			}else{
				$(".investSelect").parent().addClass("isBor");
                $(".beneificary").hide().find("input").addClass("noShow");
			}
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
			
			//使textarea自动适应获取高度
			$.each($("textarea"),function(i,el){
	        	autoTextarea(el);// 调用
	        })
			
			if(splitUrl()["src"] == "per"){
				$("[check=investSelect]").html("请选择");
				$("[check=beneificiaryName]").attr("placeholder","请输入姓名");
			}else if(splitUrl()["src"] == "org"){
				$("[check=investSelect]").html("请选择").attr("errortip","请选择交易实际受益人");
			}
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
					}else if( el.check == 'idTypeSelect'){
						sessionStorage.idTypeNum = el.result; //证件类型num
						sessionStorage.idTypeTxt = $('[check=idTypeSelect]').html(); //证件类型文案
					}else if( el.check == 'num_1'){ 
						sessionStorage.idNum = el.result; //证件号
					}else if(el.check == "birthSelect"){
						sessionStorage.birthNo = el.result;
						sessionStorage.birthDay = $('[check=birthSelect]').html(); //出生日期
					}else if( el.check == 'bankNum'){
						sessionStorage.bankNum = el.result; //银行卡号
					}else if( el.check == 'bankSelect'){
						sessionStorage.bankInfoNum = el.result; //发卡银行
						sessionStorage.bankInfoTxt = $('[check=bankSelect]').html(); //发卡银行文案
					}else if( el.check == 'provinceCitySelect'){
						//省份
						sessionStorage.province = $('.provinceCitySelect [check=provinceCitySelect]').attr('num_0');
						//城市
						sessionStorage.city = $('.provinceCitySelect [check=provinceCitySelect]').attr('num_1');
					}else if( el.check == 'branchSelect'){
						//支行代码
						sessionStorage.branchNo = el.result;
						sessionStorage.branchTxt = $('[check=branchSelect]').html(); //支行列表文案
					}else if( el.check == 'vocaSelect'){
						sessionStorage.vocationNo = el.result;
						sessionStorage.vocationTxt = $('[check=vocaSelect]').html(); //职业类型文案
					}else if( el.check == 'address'){
						sessionStorage.address = el.result;
					}else if( el.check == 'investSelect'){
						sessionStorage.investNo = el.result;
						sessionStorage.investTxt = $('[check=investSelect]').html(); //决策者类型
					}else if(el.check == 'beneificiaryName'){
						sessionStorage.beneificiaryName = el.result;
					}
				})
				sessionStorage.hasData = true;

				//跳转到下一步页面
				window.location.href = site_url.realNameStepTwo_url + '?originUrl';
				
			})
		}
	}
	
	realName.init();
})
