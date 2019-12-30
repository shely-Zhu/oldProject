/*
 * @Author: your name
 * @Date: 2019-12-27 10:17:54
 * @LastEditTime : 2019-12-29 11:17:29
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htjf-app\src\mine\static\js\noAccountHoldShare.js
 */
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
// require('@pathCommonJs/components/elasticLayer.js');
// require('@pathCommonJs/components/elasticLayerTypeTwo.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathIncludJs/vendor/mui/mui.picker.min.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js'); 
// require('@pathCommonJs/components/elasticLayerTypeTwo.js');


$(function() {

    var fundAccountDiagnosisResult = {
        $e: {
            holdingBox: $('#holdingBox'), // 账户持仓情况
            holdingBoxTemp: $('#holdingBox-template'), // 账户持仓情况模板
            diagnosis:$("#diagnosis-box"), //诊断结论
            noData: $(".noData"),
        },
        gV: {
              dataPickData:"", //基金代码
              fundCode:"", //购买日期
              buyMoney:"",   //购买金额
              url:"addAccountDiagnosisResult_url",
              singleaAuthenPath:"", //一键认证路径
            realLi: $('#real-condition>li'),
            tipsWrap:$("#tips-wrap"),
        },
        init: function() {
            var that = this;

            that.events();
        },
        getConditionsOfOrder:function(){
            var that = this;

            var obj = [{
                url:site_url.queryCustomerAuthInfo_api,
                data: {
                    fundCode:"000847",
                },
                callbackDone:function(json){
                    var jsonData = json.data,
                        notice = "",
                        noticeObj = "",
                        isPopup = "", //弹框售前告知书
                        isRiskPopup = "", //期限不符弹框
                        PopupElasticLayer = "",
                        objElasticLayer = "", // 产品风险等级与个人承受能力匹配弹框
                        isReal = "", //是否实名认证，因为如果机构切一键认证是实名，点击需要提示弹框。
                        singleaAuthenPath = "", //一键认证跳转链接
                        singleaAuthen = false; //条件框是否展示
                        if(jsonData.isWealthAccount != "1"&&jsonData.isRiskEndure == "1"&&jsonData.isPerfect == "1"&&jsonData.isInvestFavour=="1"){
                            that.gV.realLi.hide();
                            that.gV.tipsWrap.hide();
                            $(".isRiskMatch_mask").show();
                            $(".isRiskMatchBox").show();
                            if(jsonData.isRiskMatch == "1"){
                                //风险等级匹配
                                $(".isRiskMatchBox_match").show()
                                $(".isRiskMatchBox_noMatch").hide()
                            }else if(jsonData.isRiskMatch == "0"){
                                $(".isRiskMatchBox_noMatch").show()
                                $(".isRiskMatchBox_match").hide()
                                $(".isRiskMatchResult").html("查看评测结果")
                                $(".isRiskMatchResult").attr("type","noRisk")
                            }else if(jsonData.isRiskMatch == "2"){
                                $(".isRiskMatchBox_noMatch").show()
                                $(".isRiskMatchBox_match").hide()
                                $(".isRiskMatchResult").html("重新风测")
                                $(".isRiskMatchResult").attr("type","repeatRisk")
                            }
                              
						}else{
                            that.gV.tipsWrap.show()
                            that.gV.realLi.show();
							
                        }
                        that.gV.singleaAuthenPath = that.getSingleaAuthenPath(jsonData);
                        if(jsonData.isWealthAccount=="1"){
							//是否开通财富账户
							that.gV.realLi.eq(0).show()  
						}else{
							that.gV.realLi.eq(0).hide()
						}
						if(jsonData.isRiskEndure=="0"||jsonData.isRiskEndure == null){
							//是否风测
							that.gV.realLi.eq(1).show()  
						}else{
							that.gV.realLi.eq(1).hide()
						}
						if(jsonData.isPerfect=="0" ||jsonData.isPerfect== null){
							//是否完善资料
							that.gV.realLi.eq(2).show()  
						}else{
							that.gV.realLi.eq(2).hide()
						}
						if(jsonData.isInvestFavour=="0" || jsonData.isInvestFavour == null){
							//是否投资者分类
							that.gV.realLi.eq(3).show()  
						}else{
							that.gV.realLi.eq(3).hide()
                        }
						if(jsonData.isRiskMatch=="0" || jsonData.isRiskMatch == null){
							//是否风险等级
							that.gV.realLi.eq(4).show()  
						}else{
							that.gV.realLi.eq(4).hide()
                        }
                        that.gV.realLi.eq(4).hide()
                        
                }
            }];
            $.ajaxLoading(obj);
        },
        getSingleaAuthenPath:function(data){
            var that = this;
            var singleaAuthenPath="";
            if(data.isWealthAccount == "1"){
              return singleaAuthenPath = "isWealthAccount"
            }else if(data.isRiskEndure !="1"){
             return singleaAuthenPath = "isRiskEndure"
            }else if(data.isPerfect != "1"){
             return  singleaAuthenPath = "isPerfect"
            }else if(data.isInvestFavour != "1"){
             return  singleaAuthenPath = 'isInvestFavour'
            }
         },
       
       events:function(){
            var that = this;
            that.$e.noData.show();
            mui("body").on('mdClick','.getReport',function(){
                that.getConditionsOfOrder();
            });
            mui("body").on('mdClick','.goUrl_list button',function(){
                //跳理财首页
                window.location.href = site_url.wealthIndex_url
            })
            
                   //风测等级匹配成功
                   mui("body").on('mdClick',".isRiskMatchBox_match",function(){
                    $(".isRiskMatch_mask").hide();
                    $(".isRiskMatchBox").hide();
                    //wealthIndex_url
                    window.location.href = site_url.applyHistory_url;
                 })
   
                //风险等级匹配失败
                mui("body").on("mdClick",".isRiskMatchBox_cancel",function(){
                    $(".isRiskMatch_mask").hide();
                    $(".isRiskMatchBox").hide();
                  // that.gV.isRiskMatchBox.hide();
                })
   
                //风险等级匹配失败结果跳转
                mui("body").on("mdClick",".isRiskMatchResult",function(){
                    $(".isRiskMatch_mask").hide();
                    $(".isRiskMatchBox").hide();
                    var type = $(this).attr("type");
                    if(type == "noRisk"){
                        //未风测
                        window.location.href = site_url.riskAppraisal_url + "?type=private"
                    }else if(type == "repeatRisk"){
                        //风测过期
                        window.location.href = site_url.riskAppraisal_url + "?type=private"
                    }
                })

                   //认证
                   mui("body").on('mdClick', ".tips-li .tips-li-right", function (e) {
                    var type = $(this).parent().index()
                    switch (type) {
                        case 0:   //开通账户
                            window.location.href = site_url.realName_url
                            break;
    
                        case 1:   //风险评测
                            window.location.href = site_url.riskAppraisal_url + "?type=private"
                            break;
    
                        case 2:   //完善基本信息
                            window.location.href = site_url.completeInformation_url
                            break;
    
                        case 3:  //投资者分类
                            window.location.href = site_url.investorClassification_url
                            break;
                        case 4:  //合格投资者认证
                            window.location.href = site_url.chooseQualifiedInvestor_url
                            break;
    
                        default:
                            break;
                    }
                });
                //一键认证
                mui("body").on('mdClick', ".tips .tips-btn", function (e) {
                    var key = that.gV.singleaAuthenPath;
                    switch (key) {
                        case "isWealthAccount":   //开通账户
                            window.location.href = site_url.realName_url
                            break;
    
                        case "isRiskEndure":   //私募风险评测  type=private type=asset 资管风测
                            window.location.href = site_url.riskAppraisal_url + "?type=private"
                            break;
    
                        case "isPerfect":   //完善基本信息
                            window.location.href = site_url.completeInformation_url
                            break;
    
                        case "isInvestFavour":  //投资者分类
                            window.location.href = site_url.investorClassification_url
                            break;
                        case "isRiskMatch":  //合格投资者认证
                            window.location.href = site_url.chooseQualifiedInvestor_url
                            break;
    
                        default:
                            break;
                    }
                });
                mui("body").on('mdClick',".icontips-close",function(){
                  
                   $("#tips-wrap").hide()
                
                })
        
       },
      
     
      
    };
    fundAccountDiagnosisResult.init();
});