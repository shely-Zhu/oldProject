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
					//回显姓名 --机构名称
					if( !!jsonData.maskName ){
						$('.fontName').html( jsonData.maskName ); //姓名 
					}
					//出生日期  ---
					if( !!jsonData.birthday ){
						$('[check=birthSelect]')
							.html( jsonData.birthday.substring(0,4)+"-"+jsonData.birthday.substring(4,6)+"-"+jsonData.birthday.substring(6,8) )
							.attr("num",1).addClass('hasSelect');
					}
					//产品类型
					if(!!jsonData.productType){
						$('[check=pdTypeSelect]').html( jsonData.productTypeDesc)
							.attr("num",jsonData.productType).addClass("unable noIcon");
						if(jsonData.productType == '0'){ //公募产品类型
							$('[check=pofPdTypeSelect]').attr('needcheck',true);
							$('[check=pofPdTypeSelect]').parents(".formBox").show();
						}else{
							$('[check=pofPdTypeSelect]').attr('needcheck',false);
							$('[check=pofPdTypeSelect]').parents(".formBox").hide();
						}
					}
					//公募产品类型
					if(!!jsonData.productSubclass){
						$('[check=pofPdTypeSelect]').html( jsonData.productSubclassDesc)
							.attr("num",jsonData.productSubclass).addClass("unable noIcon");
					}
					//产品备案机构
					if(!!jsonData.recordOrg){
						$('[check=filingOrgSelect]').html( jsonData.recordOrgDesc)
							.attr("num",jsonData.recordOrg).addClass("unable noIcon");
					}
					//代理人姓名
					if( !!jsonData.contactName){
						$('.contactName').html( jsonData.contactName);
					}
					//代理人职业类型
					if( !!jsonData.vocation && !!jsonData.vocationDesc){
						$('[check=vocaSelect]').html( jsonData.vocationDesc)
							.attr("num",jsonData.vocation).addClass("hasSelect");
					}
					//实际受益人
					if(!!jsonData.beneficiary){
						if(jsonData.beneficiary != jsonData.maskName){
							$('[check=investSelect]').attr('num',1).removeClass('hasSelect').parents('.investSelect').addClass('unable isBor noIcon');
							$('[check=investSelect] .value').html("其他主体")
							$('.investIntro').show().find('.introBox').html(jsonData.beneficiary);
						}else{
							$('[check=investSelect]').attr('num',0).removeClass('hasSelect').parents('.investSelect').addClass('unable noIcon');
							$('[check=investSelect] .value').html("本机构");
						}
						realName.investSelect=jsonData.beneficiary;
					}
					//是否存在控制关系
					if(!!jsonData.isDecisionMaker){
						if(jsonData.isDecisionMaker=="1"){
							$('[check=shipSelect]').attr('num',1).parents('.shipSelect').addClass('unable isBor noIcon');
							$('[check=shipSelect] .value').html('是');
							$('.shipIntro').show().find('.introBox').html(jsonData.decisionMaker);
						}else{
							$('[check=shipSelect]').attr('num',0).parents('.shipSelect').addClass('unable noIcon');
							$('[check=shipSelect] .value').html('否');
						}
						realName.shipSelect=jsonData.decisionMaker;
					}
					//是否有不良记录
					if(!!jsonData.badRecord){
						if(jsonData.badRecord=="1"){
							$('[check=badCoreSelect]').attr('num',1).parents('.badCoreSelect').addClass('unable isBor noIcon');
							$('[check=badCoreSelect] .value').html('是');
							$('.badCoreIntro').show().find('.introBox').html(jsonData.badRecordReason);
						}else{
							$('[check=badCoreSelect]').attr('num',0).parents('.badCoreSelect').addClass('unable noIcon');
							$('[check=badCoreSelect] .value').html('否');
						}
						realName.shipSelect=jsonData.badRecordReason;
					}
					//注册地址
					if(!!jsonData.regAddress){
						if($.trim(jsonData.regAddress.length)>28){
							$('[check=regAddress]').val($.trim(jsonData.regAddress).substring(0,25)+"...");
							that.regAddress = $.trim(jsonData.regAddress); 
						}else{
							$('[check=regAddress]')
							.val($.trim(jsonData.regAddress));
						}
					}
					//办公地址
					if(!!jsonData.officeAddress){
						if($.trim(jsonData.officeAddress).length>28){
							$('[check=doAddress]').val($.trim(jsonData.officeAddress).substring(0,25)+"...");
							that.officeAddress = $.trim(jsonData.officeAddress); 
						}else{
							$('[check=doAddress]')
							.val($.trim(jsonData.officeAddress));
						}
					}
					//经营范围
					if(!!jsonData.businessScope){
						if($.trim(jsonData.businessScope).length>28){
							$('[check=busCope]')
							.val($.trim(jsonData.businessScope).substring(0,25)+"..."); 
							that.businessScope = $.trim(jsonData.businessScope);
						}else{
							$('[check=busCope]')
							.val($.trim(jsonData.businessScope));
						}
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
			$('[check=pofPdTypeSelect]').attr('needcheck',false);
			$("[check=pofPdTypeSelect]").parents(".formBox").hide();
			//更改选择框文字
			$('[check=shipSelect]').find('.value').html("请选择")
			$('[check=badCoreSelect]').find('.value').html("请选择");
			$(".investSelect .value").html('本机构')
			$('.badCoreSelect').addClass('isBor');
			//使textarea自动适应获取高度
			$.each($("textarea"),function(i,el){
	        	autoTextarea(el);// 调用
	        })
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
				if(!reg.test($("[check=orgAddress]").val())){
					that.messageAddress=$("[check=orgAddress]").val();
				}
				if(!reg.test($("[check=regAddress]").val())){
					that.regAddress=$("[check=regAddress]").val();
				}
				if(!reg.test($("[check=doAddress]").val())){
					that.officeAddress=$("[check=doAddress]").val();
				}
				if(!reg.test($("[check=busCope]").val())){
					that.businessScope=$("[check=busCope]").val();
				}
				
				//请求修改基本信息接口
				var obj=[{
					url: site_url.supplyUserInfo_api,
					data: {    
						hmac:"", //预留的加密信息     
						params:{//请求的参数信息 
							birthday:$("[check=birthSelect]").html().replace(/[-]/g,""),//出生日期 8位19900505
							vocation:$("[check=vocaSelect]").attr("num"),//职业类型
							beneficiary:$('[check=investSelect] .value').html()=="本机构"?$('.fontName').html():that.investSelect,//实际受益人
							regAddress:that.regAddress,//注册地址(机构帐户)
							officeAddress:that.officeAddress,//办公地址(机构帐户)
							businessScope:that.businessScope,//经营范围(机构帐户)
							productType:$('[check=pdTypeSelect]').attr('num'),
							productSubclass:$('[check=pofPdTypeSelect]').attr('num'),
							recordOrg:$('[check=filingOrgSelect]').attr('num'),
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
							tipAction("您已补充完整基本信息",function(){
								window.location.href=new Base64().decode(splitUrl()["originUrl"]);					
							})
						}else{
							tipAction("您已成功修改机构基本信息",function(){			
								window.location.href=site_url.mine_url; //跳转到我的页面
							})
						}
					},
					callbackFail:function(data){
						tipAction(data.message,function(){
							$this.removeClass("disable");
						});
					}
				}]
				$.ajaxLoading(obj);
			})
			
			//实际受益人列表
			mui("body").on('tap','.investSelect',function(){
				if( !$(this).hasClass('unable')){
					shipFnc(realName,'仅用于按照监管要求收集贵单位的实际控制人、受益人信息，不影响收益分配，收益仍将分配至贵单位账户','investSelect',['本产品','其他主体'],200);
				}
			})
			
			//控制人关系
			mui("body").on('tap','.shipSelect',function(){
				if( !$(this).hasClass('unable')){
					shipFnc(realName,'实际控制关系是指您做出的投资决策是否受控于其他自然人','shipSelect',['否','是'],200);
				}	
			})
			
			//不良记录
			mui("body").on('tap','.badCoreSelect',function(){
				if( !$(this).hasClass('unable')){
					shipFnc(realName,'请确认是否有不良诚信记录','badCoreSelect',['否','是'],200);
				}
			})
		}
		
	}
	
	realName.init();
})
