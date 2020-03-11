/*
 * @Author: your name
 * @Date: 2019-11-26 14:42:56
 * @LastEditTime : 2019-12-31 12:10:56
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htjf-app\src\financial\static\js\publicPlacement\cashTransformOut.js
 */
/**  
* @Page:  现金管理 -- 转出
* @Author: yangjinlai
* @Date:   2019-11-25
* 
*/

require('@pathCommonBase/base.js');

require('@pathIncludJs/vendor/mui/mui.picker.min.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayer.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
//引入复制功能
// var Clipboard = require('clipboard');
var popPicker = require('@pathCommonJsCom/popPicker.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');

var payPass = require('@pathCommonJsCom/payPassword.js');


$(function () {

	var regulatory = {

		gv:{
		   productName: '',   //产品名称
		   transformTotalMoney:"",   //产品转出总额度
		   transformMoney:"",    //产品转出额度
		   dailyOnceMaxLimit:"",  //单日最高限额 整数
		   fundCode:splitUrl['fundCode'] ,//基金编号
		   outType:"fast",//转出方式  快速位fast 普通位common
		   dailyOnceMaxLimitWan:"", //单笔最高限额
		   dailyMaxLimitWan:"" ,//单日最高限额：
		   dailyTimesMaxLimit:"",//单日最多笔数
		   operationType:"1",//转出方式，快速1 普通0
		   ruleId:"",//转出信息ID
		   cashList:"",//银行卡列表

		   defaultBankData:"", //默认银行卡信息
		   defaultBankNo:"",   //默认银行代码
		   defaultBankAccount:"",   //默认银行账号
		   defaultTradeAcco:"",   // 默认交易账号
		   defaultCapitalMode:"",  // 默认资金方式
		   
		
		   defaultBankSingleNum:"", //默认银行单笔限额
		   defaultOneDayNum:"", //默认银行单日限额
		   
		   
		   checkImgUrl:'/common/img/account_icon_check@2x.png', //银行卡勾选
		   ruleList:[]
		},

		$e:{
			el_productName:$("#transformProductName"), //产品名称元素
			el_transformInput:$(".transformInput"), //转出金额
			el_transformRule:$(".transformRule"), //转出规则
			el_transformRule_icon:$(".explain .left .iconfont"), //转出到账时间提示
			el_agreementRule:$(".agreementRule"), // 转出协议规则
			iconCheck: $(".item2 .iconfont"), //同意协议选择框
			confirmBtn:$(".confirmeDemptionPay"), // 确定按钮
			el_dailyOnceMaxLimitWan:$(".dailyOnceMaxLimitWan"), //单笔最高限额
			el_dailyMaxLimitWan:$(".dailyMaxLimitWan") ,//单日最高限额：
		    el_dailyTimesMaxLimit:$(".dailyTimesMaxLimit"),//单日最多笔数
			templateTransferFunds:$("#cashTransformOutList"),//银行卡模板
			TransferFundsContent:$(".cashListConent"), //银行卡列表容器
			el_singleNum:$(".singleNum"), //单笔限额
			el_defaultBankName:$(".defaultBankName"), //默认银行卡名称
			el_defaultBankCode:$(".defaultBankCode"), //默认银行卡号后四位
			el_defaultBankImgUrl:$(".defaultBankImgUrl"), //默认银行logo
			el_maxTranMoney:$(".maxMoney") //赎回金额
			
		},


		webinit: function () {
			var that = this;
			that.events();
			that.initParmes();
			that.findProtocolBasi();
			that.cashListWiki();
			that.pofCashLimit();
			if(splitUrl['productName']) {
				that.gv.productName = new Base64().decode(splitUrl['productName']);
			}
		},

        /*
            绑定事件
         */
         // 获取该账户的余额
		 initParmes:function(){
			var that = this;
			 var obj =[{
				 url:site_url.pofGetAssetsCashList_api,
				 data:{
					 "fundCode":that.gv.fundCode,
					 "pageSize":10,
					 "pageCurrent": 1
				 },
				 callbackDone:function(json){
					    that.gv.transformTotalMoney = json.data.pageList[0].totalMoney;
						that.gv.transformMoney = json.data.pageList[0].totalMoney;
						that.$e.el_productName.html(that.gv.productName);
						that.$e.el_transformInput.val(json.data.pageList[0].totalMoney);
				 }
			 }]
			 $.ajaxLoading(obj);
		  },
		 findProtocolBasi:function(){
			var that = this;
			var obj =[
				{
					url:site_url.findProtocolBasic_api,
					data:{
						"code":that.gv.fundCode,
						"template":"0"
					},
					needDataEmpty:true,
					callbackDone:function(json){
						that.gv.ruleList = json.data;
						that.$e.el_transformRule[0].textContent = that.gv.ruleList[2].title;
						that.$e.el_transformRule.attr("ruleId",that.gv.ruleList[2].id);
						that.$e.el_transformRule_icon.attr("ruleId",that.gv.ruleList[2].id);
						that.$e.el_agreementRule[0].textContent = that.gv.ruleList[1].title;
						that.$e.el_agreementRule.attr('ruleId',that.gv.ruleList[1].id);
						
						// if(that.$e.el_transformRule[0].textContent!=""){
						// 	$(".cashRight").show()
						// }
					}
				}
			]
			$.ajaxLoading(obj);
		 },
		 cashListWiki:function(){
			 var that = this;
			 var obj = [{
				 url:site_url.cashList_api,
				 needDataEmpty:true,
				 data:{
					 'code':that.gv.fundCode,
					  //'code':"003075",
					 'operationType':'1'
				 },
				 callbackDone:function(json){
					 console.log("9999",json);
					 that.gv.cashList = json.data.pageList;
					 var defaultCarData = json.data.pageList[0];
					 that.gv.defaultBankNo = defaultCarData.bankNo;
					 that.gv.defaultBankAccount = defaultCarData.bankAccountSecret;
					 that.gv.defaultCapitalMode = defaultCarData.capitalMode;
					 that.gv.defaultTradeAcco =defaultCarData.tradeAcco;
					 for(var i = 0 ;i<that.gv.cashList.length;i++){
						 var carNum = that.gv.cashList[i].bankAccountMask.substr(-4);
						 that.gv.cashList[i].carNum = carNum;
						 if(i == 0){
							that.gv.cashList[i].checkStatu = true; 
						 }else{
							that.gv.cashList[i].checkStatu = false
						 }

					 }
					 if(that.gv.cashList.length == 1){
						 $("#bank a.iconfont").hide();
					 }else{
						$("#bank a.iconfont").show();
					 }

					 that.$e.el_defaultBankName[0].textContent =defaultCarData.bankName;
					 that.$e.el_defaultBankImgUrl.attr("src",defaultCarData.bankThumbnailUrl);
					 that.$e.el_defaultBankCode[0].textContent =defaultCarData.bankAccountMask.substr(-4);
					 that.$e.el_singleNum[0].textContent = defaultCarData.availableShare;
					 that.gv.transformTotalMoney = defaultCarData.availableShare;
					 that.gv.transformMoney = defaultCarData.availableShare;
					 that.$e.el_transformInput.val(that.gv.transformMoney);
					 generateTemplate(that.gv.cashList, that.$e.TransferFundsContent, that.$e.templateTransferFunds);
					 for(var i=0;i<$(".cashListConent .cashCheckItem").length;i++){
						 if(i==0){
							$(".cashListConent .cashCheckItem").eq(i).find(".radioCheckItemImg").show();
						 }else{
							$(".cashListConent .cashCheckItem").eq(i).find(".radioCheckItemImg").hide(); 
						 }
					 }
					// $(".cashListConent .cashCheckItem").eq(0).find(".radioCheckItemImg").show();
					//$(".cashListConent .cashCheckItem").not(0).find(".radioCheckItemImg").hide();
                     
				 }

			 }];
			 $.ajaxLoading(obj)
		 },
		   //转出确认
		   cancelOrder:function(password){
			var that = this;
            var param = {
				"fundCode":regulatory.gv.fundCode, //基金代码(有)
				"fundName":regulatory.gv.fundName, //基金名称(有)
				"bankNo":regulatory.gv.defaultBankNo,   //银行代码(有)
				"bankAccount":regulatory.gv.defaultBankAccount,   // 银行账号(有)
				"tradeAcco":regulatory.gv.defaultTradeAcco,   // 交易账号 (有)
				"capitalMode":regulatory.gv.defaultCapitalMode,  //  资金方式(有)
				"password":password,  
				"redempShare":regulatory.gv.transformMoney,  //  赎回份额 （无）
				"operationType":regulatory.gv.operationType,  // 赎回方式 （无）
				"shareType":"A"      // 份额分类（无）
            };
            var obj = [{
                url:site_url.doCashTreasureSell_api,
                data:param,
                needDataEmpty: true,
                callbackDone:function(res){
                    var data = res.data;
                    if(res.status == '0000'){
                        window.location.href =  site_url.pofSurelyResults_url + '?allotNo=' + data.allotNo + '&flag=out'+"&outType="+regulatory.gv.outType;
                    }else{
						tipAction(json.message);
					}
                },
                callbackNoData:function(json){
                    $("#passwordWrap").hide();
                    tipAction(json.message);
                },
                callbackFail:function(json){
                    $("#passwordWrap").hide();
                    tipAction(json.message);
                }
            }];
            $.ajaxLoading(obj);
		},
		//转出金额限制
		pofCashLimit:function(){
			var that = this;
			var obj = [{
				url:site_url.pofCashLimit_api,
				data:{
					'fundCode':that.gv.fundCode
				},
				needDataEmpty:true,
				callbackDone:function(json){
					var data = json.data;
					that.gv.dailyMaxLimitWan = data.dailyMaxLimitWan;
					that.gv.dailyTimesMaxLimit = data.dailyTimesMaxLimit;
					that.gv.dailyOnceMaxLimit = data.dailyOnceMaxLimit;
					that.gv.dailyOnceMaxLimitWan = data.dailyOnceMaxLimitWan;
					that.$e.el_dailyOnceMaxLimitWan[0].textContent = that.gv.dailyOnceMaxLimitWan;
					that.$e.el_dailyMaxLimitWan[0].textContent = that.gv.dailyMaxLimitWan;
					that.$e.el_dailyTimesMaxLimit[0].textContent = that.gv.dailyTimesMaxLimit;
					$(".transformInput").attr("maxlength",data.dailyMaxLimit);
				}
			}]
			$.ajaxLoading(obj);
		},
		//查询转出规则信息
		findProtocolContentRule:function(id){
		   var that = this;
		   var obj = [{
			   url:site_url.findProtocolContentRule_api,
			   contentTypeSearch: true,
			   data:{
				   "id":id
			   },
			   needDataEmpty:true,
			   callbackDone:function(res){
				   console.log("999",res);
				   var html = res.data.content;
				   if(res.status == "0000"){
					$('.elasticLayer.transOutRule').show();
					   $(".elasticContent").html(html);
				   }else{
					$(".elasticContent").html("规则查询失败");
				   }
			   }
		   }];
		   $.ajaxLoading(obj);

		},
		events: function () {
			var that = this;

			/** 下面三个事件： 银行卡列表出现/隐藏 **/
			mui("body").on('mdClick','.onright',function(){
				$('.popup').css('display','block');
			}, {
				htmdEvt: 'cashTransformOut_01'
			}) 

			mui("body").on('mdClick','.popup-close',function(){
				$('.popup').css('display','none');
			}, {
				htmdEvt: 'cashTransformOut_02'
			}) 

			mui("body").on('mdClick','.popup-mask',function(){
				$('.popup').css('display','none');
			}, {
				htmdEvt: 'cashTransformOut_03'
			}) 
           
		   //银行卡单选
		   mui("body").off("mdClick",".cashCheckItem").on('mdClick','.cashCheckItem',function(){
			//   $(this).find(".imgLogo").attr("src",that.gv.checkImgUrl);
			  // $(this).siblings().find(".imgLogo").attr("src","");
			   $(this).find(".radioCheckItemImg").show();
			   $(this).siblings().find(".radioCheckItemImg").hide();
			   that.gv.defaultBankNo = $(this).attr("bankNo"); //默认银行代码
			   that.gv.defaultBankAccount = $(this).attr("bankAccount"); //默认银行账号
			   that.gv.defaultTradeAcco = $(this).attr("tradeAcco");  // 默认交易账号
			   that.gv.defaultCapitalMode = $(this).attr("capitalMode"); // 默认资金方式
			 
			   that.$e.el_singleNum[0].textContent = $(this).attr('singleNum');
			   that.gv.transformTotalMoney =  $(this).attr('singleNum');
			    that.gv.transformMoney =  $(this).attr('singleNum');
				that.$e.el_transformInput.val(that.gv.transformMoney);
			   
			   that.$e.el_defaultBankName[0].textContent = $(this).attr("bankName");
			   that.$e.el_defaultBankImgUrl.attr("src",$(this).attr("bankLogoUrl"));
			   that.$e.el_defaultBankCode[0].textContent = $(this).attr("carNum");
			}, {
				htmdEvt: 'cashTransformOut_04'
			})

		   //普通与快速切换
		   mui("body").off("mdClick",".tabWrapper .tab").on('mdClick','.tabWrapper .tab',function(){   
	           $(this).find(".activeIcon").addClass("active");
			   $(this).siblings().find(".activeIcon").removeClass("active");
			   var type = $(this).attr("type");
			   that.gv.outType = type;
			   if(type == 'fast'){
				   that.gv.operationType = "1";
				   $(".explain .left").eq(0).show();
				   $(".explain .left").eq(1).hide();
				   $('.typeDetailMoney').show();
			   }else if(type == 'common'){
				that.gv.operationType = "0";
				$(".explain .left").eq(1).show();
				$(".explain .left").eq(0).hide();
				$('.typeDetailMoney').hide();
			   }
			}, {
				htmdEvt: 'cashTransformOut_05'
			})
		   mui("body").off('mdClick','.clearMoney').on('mdClick','.clearMoney',function(){
			   that.gv.transformMoney = 0;
			   that.$e.el_transformInput.val(0);

		   	}, {
				htmdEvt: 'cashTransformOut_06'
			})
			
			//点击转出规则
			mui('body').on('mdClick','.explain .transformRule',function(){
				that.gv.ruleId = $(this).attr("ruleId");
				var id = $(this).attr("ruleId");
				//that.findProtocolContentRule(id);
				window.location.href = site_url.superContent_url + '?id='+id+ '&financial=true';
			},{
				htmdEvt: 'cashTransformOut_07'
			}) 

			//点击同意协议
			mui('body').on('mdClick','.item2 .iconfont',function(){
				$("#transformInput").blur();
			//that.$e.iconCheck.on('mdClick', function() {
				var val =$(".msecond input")[0].value;
				that.gv.transformMoney = val;
				if( parseFloat( that.gv.transformTotalMoney)< parseFloat( that.gv.transformMoney) ){

					//$(".checkMessage").css({"display":"block"});
					//$(".checkMessage").html("转出金额超过最大额度")
					tipAction("转出金额超过最大额度"+that.gv.transformTotalMoney+"元");
					return
				}else{		
					$(".checkMessage").css({"display":"none"}); 
				}
				
                if ($(this).hasClass("check")) {
					$(this).removeClass("check").html('&#xe668;');
					that.$e.confirmBtn.attr('disabled',true);
					//if(that.gv.transformMoney!=""){
					//	that.$e.confirmBtn.removeAttr("disabled");
					//}else{
					//	that.$e.confirmBtn.attr('disabled',true)
					//}
                } else {
					$(this).addClass("check").html('&#xe669;');
					if(that.gv.transformMoney!=""){
						that.$e.confirmBtn.removeAttr("disabled");
					}else{
						that.$e.confirmBtn.attr('disabled',true);
					}
					
                }
			}, {
				htmdEvt: 'cashTransformOut_08'
			});

			  //转出金额
			//$(".msecond input").change(function(){
			$(".msecond input").on('input propertychange',function(){
				that.gv.transformMoney = $(this)[0].value;
				if( parseFloat( that.gv.transformTotalMoney)< parseFloat( that.gv.transformMoney) ){
					//$(".checkMessage").css({"display":"block"});
					//$(".checkMessage").html("转出金额超过最大额度")
					tipAction("转出金额超过最大额度"+that.gv.transformTotalMoney+"元");
					return
				}else{		
					$(".checkMessage").css({"display":"none"}); 
				}
				if($(this)[0].value == ""){
					that.$e.confirmBtn.attr('disabled',true);
				}else{
					if($(".item2 .iconfont").hasClass("check")){
						that.$e.confirmBtn.removeAttr("disabled");
					}else{
						that.$e.confirmBtn.attr('disabled',true);
					}
				}
			})

			//赎回确认 
			mui('body').on('mdClick','.confirmeDemptionPay',function(){   
			//$(".confirmeDemptionPay").on('click',function(){
				var val =$(".msecond input")[0].value;
				that.gv.transformMoney = val;
				if(parseFloat(that.gv.transformMoney) < 0.01) {
					tipAction("转出金额最小值为0.01元");
					return
				}else if(parseFloat(that.gv.transformMoney)>that.gv.dailyOnceMaxLimit && that.gv.operationType == '1'){
					//$(".checkMessage").css({"display":"block"});
					//$(".checkMessage").html("转出金额超过单笔最高限额");
					tipAction("转出金额超过单笔最高限额"+that.gv.dailyOnceMaxLimit + "元");
					return 
				}else{
					$(".checkMessage").css({"display":"none"});
				}
				$(".pwd-input").val('');
                $(".fake-box input").val('');
				$(".msecond input").blur();
				$("#passwordWrap").show();
				payPass(that.cancelOrder)
			}, {
				htmdEvt: 'cashTransformOut_09'
			})

			//转出全部
			mui('body').on('mdClick','.tranoutAllMoney',function(){ 
			//$(".tranoutAllMoney").on('click',function(){
				$("#transformInput").blur();
				$(".msecond input").val(that.gv.transformTotalMoney);
				that.gv.transformMoney = that.gv.transformTotalMoney;
				if($(".item2 .iconfont").hasClass("check")){
					that.$e.confirmBtn.removeAttr("disabled");
				}else{
					that.$e.confirmBtn.attr('disabled',true);
				}
			}, {
				htmdEvt: 'cashTransformOut_11'
			})
			//转出金额清零
			mui('body').on('mdClick','.clearMoney',function(){ 
			//$(".clearMoney").on('click',function(){/
				$(".msecond input").val("");
				that.gv.transformMoney = "";
				$(".item2 .iconfont").removeClass("check").html('&#xe668;');
				that.$e.confirmBtn.attr('disabled',true);
			}, {
				htmdEvt: 'cashTransformOut_12'
			})
			mui('body').on('mdClick','.elasticLayer.transOutRule .elasticButtons',function(){
				$('.elasticLayer.transOutRule').hide();
			}, {
				htmdEvt: 'cashTransformOut_10'
			}) 
			//点击转出到账时间
			mui('body').on('mdClick','.explain .tranTime',function(){
				var type = $(this).attr("type");
				if(type == "fast"){
					tipAction("部分银行不支持2小时快速到账");
				}
				//var id = $(this).children().attr("ruleId");
				//that.gv.ruleId = id;
				//that.findProtocolContentRule(id);
				//window.location.href = site_url.superContent_url + '?id='+id+ '&financial=true'
			},{
				htmdEvt: 'cashTransformOut_13'
			}) 
			//阅读规则
			mui('body').on('mdClick','.file .agreementRule',function(){
				$("#transformInput").blur();
				that.gv.ruleId = $(this).attr("ruleId");
				var id = $(this).attr("ruleId");
				//that.findProtocolContentRule(id);
				window.location.href = site_url.superContent_url + '?id='+id+ '&financial=true';
			},{
				htmdEvt: 'cashTransformOut_14'
			})
			
		}

		

	};
	//调用函数
	regulatory.webinit();

})
