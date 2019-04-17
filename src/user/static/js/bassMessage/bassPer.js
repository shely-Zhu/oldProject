/* 个人基本信息页面
 * author zhangweipeng 2017-05-31
 */
 
require('../../../../include/js/vendor/config.js');  
    
require('../../../../include/js/vendor/mui/mui.picker.min.js');    
 
//zepto模块 
require('../../../../include/js/vendor/zepto/callback.js');   
require('../../../../include/js/vendor/zepto/deferred.js'); 
//黑色提示条
var tipAction = require('../../../../common/js/components/tipAction.js');   
var autoTextarea =  require('../../../../common/js/components/autoTextarea.js');   
require('../../../../common/js/input.js');   
require('../../../../common/js/components/utils.js'); 
require('../../../../common/js/ajaxLoading.js');
var shipFnc=require('../../../../common/js/components/shipSec.js');
var splitUrl = require('../../../../common/js/components/splitUrl.js'); 
var Base64 = require('../../../../include/js/vendor/base64/base64.js'); 
 
$(function(){
	 
	var realName = {  
		
		investSelect:'',
		shipSelect:'',
		badCoreSelect:'',
		
		getElements : {
			nextBtn: '.keep', //下一步的按钮
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
						$('[check=birthSelect]')
							.html( jsonData.birthday.substring(0,4)+"-"+jsonData.birthday.substring(4,6)+"-"+jsonData.birthday.substring(6,8) )
							.attr("num",1).addClass('noIcon unable');
					}
					//性别
					if(!!jsonData.sex){
						$('[check=genderSelect]')
							.html( jsonData.sexDesc )
							.attr("num",jsonData.sex).addClass('unable noIcon');
					}
					//国籍
					if( !!jsonData.nationality ){						
						$('[check=nationSelect]').html( jsonData.nationalityDesc ).attr('num',jsonData.nationality).addClass('unable noIcon'); //国籍
					}else{
						if($('.idTypeSelect [check=idTypeSelect]').html() != '外国护照'){
                        	$(".nationSelect [check=nationSelect]").html("中国").attr('num','156').addClass('hasSelect');
                        }else{
                        	$(".nationSelect [check=nationSelect]").html("请选择您的国籍").removeAttr('num').removeClass('unable hasSelect');
                        }
					}
					//证件有效期
					if(!!jsonData.idnovalidDate){
						if(jsonData.idnovalidDate=="2099-12-30"){
							$('[check=timeTypeSelect]').html('长期有效').attr('num',0).addClass('unable noIcon');
							$('.timeSelect').hide().find('a').attr('needcheck',false);
						}else{

							var queryFreezeStatus = [{
					            url: site_url.queryFreezeStatus_api, // 客户冻结状态查询
					            data: {
					                hmac: "", //预留的加密信息     
					                params: { //请求的参数信息                  
					                     msgId:""//消息id
					                }
					            },
					            needLogin: true,
					            callbackDone: function(data) {
					            	var outdateFreezeStatus = data.data.outdateFreezeStatus;
					            	// 如果证件冻结代表证件过期
					            	if(outdateFreezeStatus == 1) { // 证件已过期
					            		$(".timeSelect").show().parents('.formBox').show();
										$('[check=timeTypeSelect]').html('已过期').addClass('hasSelect').css("color","red");
					            	} else{
										$(".timeSelect").show().parents('.formBox').show();
										$('[check=timeTypeSelect]').html('非长期有效').attr('num',1).addClass('hasSelect');
										$('[check=timeSelect]').html(jsonData.idnovalidDate).addClass('hasSelect')
										  .attr('num',1);
					            	}
					            },
					        }];
					        $.ajaxLoading(queryFreezeStatus);
						}
					}
					//职业类型
					if( !!jsonData.vocation && !!jsonData.vocationDesc){
						$('[check=vocaSelect]').html( jsonData.vocationDesc)
							.attr("num",jsonData.vocation).addClass("hasSelect");
					}
					//通讯地址
					if( !!jsonData.messageAddress ){
						if($.trim(jsonData.messageAddress).length>28){
							$('[check=perAddress]').val($.trim(jsonData.messageAddress).substring(0,25)+"...");
							that.messageAddress = $.trim(jsonData.messageAddress);
						}else{
							$('[check=perAddress]')
							.val($.trim(jsonData.messageAddress));
						}
					}
					//实际受益人
					if(!!jsonData.beneficiary&&jsonData.beneficiary != jsonData.maskName){//本人
						$('[check=investSelect]').attr('num',1).addClass("hasSelect").find('.value').html("其他主体");
						realName.investSelect=jsonData.beneficiary;
					}else{
						$('[check=investSelect]').attr('num',0).addClass("hasSelect").find('.value').html("本人");
						realName.investSelect=jsonData.maskName;
					}
					//是否存在控制关系
					if(jsonData.isDecisionMaker=="1"){
						$('[check=shipSelect]').attr('num',1).addClass("hasSelect").find('.value').html("是");
						realName.shipSelect=jsonData.decisionMaker;
					}else if(jsonData.isDecisionMaker=="0"){
						$('[check=shipSelect]').attr('num',0).addClass("hasSelect").find('.value').html("否");
						realName.shipSelect="";
					}
					//是否有不良记录
					if(jsonData.badRecord=="1"){
						$('[check=badCoreSelect]').attr('num',1).addClass("hasSelect").find('.value').html("是");
						realName.badCoreSelect=jsonData.badRecordReason;
					}else if(jsonData.badRecord=="0"){
						$('[check=badCoreSelect]').attr('num',0).addClass("hasSelect").find('.value').html("否");
						realName.badCoreSelect="";
					}
					//回显完成后要调用一次textarea
					$.each($("textarea"),function(i,el){
			        	autoTextarea(el);// 调用
			        })
				},
				     
			}];
			$.ajaxLoading(obj);
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
			//隐藏证件有效期至
			$(".timeSelect").parents('.formBox').hide();
			//更改选择框文字
			$('[check=shipSelect]').find('.value').html("请选择")
			$('[check=badCoreSelect]').find('.value').html("请选择");
			//使textarea自动适应获取高度
			$.each($("textarea"),function(i,el){
	        	autoTextarea(el);// 调用
	       	});
	       
			$("[check=beneificiaryName]").attr("placeholder","请输入姓名");
		}, 
		
		
		//该函数里绑定事件
		eventsFunc: function(){
			var that = this; 
			
			//点击下一步按钮 
			mui("body").on('tap', that.getElements.nextBtn, function(){ 
				var $this = $(this);
				if($this.hasClass("disable")){
					return false;
				}else{
					$this.addClass("disable");
				}
				var result = $.checkInput(); 
				if( !result ){ 
					//校验未通过
					$this.removeClass("disable");
					return false;
				}
				//判断回显数据用户有没有修改或者判断输入框中是否存在...为结尾的文字
				var reg=/[.]{3}$/g;
				if(!reg.test($("[check=perAddress]").val())){
					that.messageAddress=$("[check=perAddress]").val();
				}
				var obj=[{
					url: site_url.supplyUserInfo_api,
					data: {   
						hmac:"", //预留的加密信息     
						params:{//请求的参数信息 
							birthday:$("[check=birthSelect]").html().replace(/[-]/g,""),//出生日期 8位19900505
							vocation:$("[check=vocaSelect]").attr("num"),//职业类型
							messageAddress:that.messageAddress,//通讯地址
							beneficiary:$('[check=investSelect] .value').html()=="本人"?$('.fontName').html():that.investSelect,//实际受益人
							sex:$('[check=genderSelect]').attr('num'),
							nationality:$('[check=nationSelect]').attr('num'),
							idnovalidDate:$('[check=timeTypeSelect]').attr('num')==0?'2099-12-30':$('[check=timeSelect]').html(),
							isDecisionMaker:$('.shipSelect .value').html()=="否"?'0':'1',
							decisionMaker:that.shipSelect,
							badRecord:$('.badCoreSelect .value').html()=="否"?'0':'1',
							badRecordReason:that.badCoreSelect,
					    }
					},
					needLogin: true,
					needDataEmpty: false,
					callbackDone:function(){
						$this.removeClass("disable");
						if(splitUrl()["originUrl"]){
							var url=new Base64().decode(splitUrl()["originUrl"]);
							if( url.indexOf("prdPrvDetails") != -1 ){
								tipAction("您已补充完整基本信息",function(){
									window.location.href=url;					
								})
							}else if( url.indexOf("productDetail") != -1 || url.indexOf("totalAssets") != -1 ){
								tipAction("您已补充完整基本信息",function(){
									window.location.href=url;					
								}) 
							}
						}else{
							tipAction("您已成功修改个人基本信息",function(){			
								window.location.href=site_url.mine_url; //跳转到我的页面
							})
						}
						window.location.href = new Base64().decode(splitUrl()["originUrl"]);
					},
					callbackFail:function(data){
						tipAction(data.msg,function(){
							$this.removeClass("disable");
						});
					}
				}]
				$.ajaxLoading(obj);
				
			})
			
			//国籍列表选择关闭
			mui("body").on('tap', '.nationality li', function(e){
				var ele=e.target || e.srcElement;
				$(".nationality li").find(".selectNation").removeClass('selectNation');
				$(ele).addClass("selectNation");
				$('[check=nationSelect]').html($(ele).html()).attr("num",$(ele).attr('num')).addClass('hasSelect');
				$(".nationality").hide();
			})
			
			//实际受益人列表
			mui("body").on('tap','.investSelect',function(){
				shipFnc(realName,'仅用于按照监管要求收集您的受益人信息，不影响收益分配，收益仍将分配至您本人账户','investSelect',['本人','其他主体'],100);
			})
			
			//控制人关系
			mui("body").on('tap','.shipSelect',function(){
				shipFnc(realName,'实际控制关系是指您做出的投资决策是否受控于其他自然人','shipSelect',['否','是'],100);
			})
			
			//不良记录
			mui("body").on('tap','.badCoreSelect',function(){
				shipFnc(realName,'请确认是否有不良诚信记录','badCoreSelect',['否','是'],100);
			})
		}
	}
	
	realName.init();
})
