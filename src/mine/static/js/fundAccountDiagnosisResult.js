/*
 * @Author: your name
 * @Date: 2019-12-09 15:53:31
 * @LastEditTime: 2019-12-12 20:31:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htjf-app\src\mine\static\js\fundAccountDiagnosisResult.js
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayer.js');
require('@pathCommonJs/components/elasticLayerTypeTwo.js');
require('@pathCommonJs/components/headBarConfig.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


$(function() {

    var fundAccountDiagnosisResult = {
        $e: {
            holdingBox: $('#holdingBox'), // 账户持仓情况
            holdingBoxTemp: $('#holdingBox-template'), // 账户持仓情况模板
            diagnosis:$("#diagnosis-box"), //诊断结论
            templateTransferFunds:$("#templateTransferFunds"), //基金列表模板
            TransferFundsContent:$(".otherAddList .selectFundCode"), //基金列表容器
            sex:$("#sex"), //性别
            professional:$("#professional"), //职业
            investment_year:$("#investment_year"), //投资年限
            riskLevel:$(".riskLevel"), //风险等级
            expectedInvestment_year:$("#expectedInvestment_year"), //预计投资年限
            liquidity:$("#liquidity"),  //流动性需求
            yield_second:$("#yield_second"), // 最高预期年化收益
            yield_first:$("#yield_first"),  // 最低预期年化收益
            loss_second:$("#loss_second"),  //最高承受最大回撤
            loss_first:$("#loss_first"),    // 最低承受最大回撤
            yieldControl:$(".yieldControl"), //年化收益数据显示容器
            lossControl:$(".lossControl"),   // 可承受数据显示容器

        },
        gV: {
              otherFundCodeData:"", //其他基金数据
              readyPurchaseHTFunds:"", //恒天基金
              userAge:"", //年龄
              sexData:"",//性别
              professionalData:"",//职业
              investment_yearData:"", //投资年限
              riskLevelData:"稳健型", //风险等级
              expectedInvestment_yearData:"", //预计投资年限
              liquidityData:"", //流动性需求
              yield_firstData:"",// 最低预期年化收益
              yield_secondData:"", // 最高预期年化收益
              loss_firstData:"",  // 最低承受最大回撤
              loss_secondData:"",  //最高承受最大回撤
              typeInput:"",//预期年化收益率 与 可承受最大回撤
        },
        init: function() {
            var that = this;
            that.getData();
            that.initAddOtherFundCode();
            that.initParmis();
            that.queryDictionary();
            that.events();
        },
        initAddOtherFundCode:function(){
            //初始化其他基金
            var that = this;
            that.gV.otherFundCodeData = JSON.parse(sessionStorage.getItem("addAccountDiagnosisResultList"))
            generateTemplate(that.gV.otherFundCodeData, that.$e.TransferFundsContent, that.$e.templateTransferFunds);
            if(that.gV.otherFundCodeData){
               if(that.gV.otherFundCodeData.length>0){
                    $(".addOtherFundcodeBox_noData").hide();
               }else{
                    $(".addOtherFundcodeBox_noData").show();
               }
            }else{
                $(".addOtherFundcodeBox_noData").show();
            }
        },
        initData:function(data){
            that.gV.userAge = data.age;
            that.gV.sexData = data.sex == 0 ?"女":"男";
            that.gV.professionalData = data.evocation ;
            that.gV.investment_yearData = data.investDurationLevel;
            that.gV.riskLevelData = data.riskLevel;
            that.gV.expectedInvestment_yearData = data.eInvestDurationLevel;
            that.gV.liquidityData = data.liquidityRequirement;
            that.gV.yield_firstData = data.eYieldratePerYearMin;
            that.gV.yield_secondData = data.eYieldratePerYearMax;
            that.gV.loss_firstData = data.affordableMaxDeficitRateMin;
            that.gV.loss_secondData = data.affordableMaxDeficitRateMax;
            that.gV.otherFundCodeData = data.readyPurchaseQTFunds;
            that.gV.readyPurchaseHTFunds= data.readyPurchaseHTFunds;
        },
        initParmis:function(){
             var that = this;
             that.$e.sex[0].textContent = that.gV.sexData ==""?"请选择":that.gV.sexData;
             that.$e.professional[0].textContent = that.gV.professionalData ==""?"请选择":that.gV.professionalData;
             that.$e.investment_year[0].textContent = that.gV.investment_yearData ==""?"请选择":that.gV.investment_yearData;
             that.$e.riskLevel[0].textContent = that.gV.riskLevelData ==""?"请选择":that.gV.riskLevelData;
             that.$e.expectedInvestment_year[0].textContent = that.gV.expectedInvestment_yearData ==""?"请选择":that.gV.expectedInvestment_yearData;
             that.$e.liquidity[0].textContent = that.gV.liquidityData ==""?"请选择":that.gV.liquidityData;
             that.$e.yield_first[0].textContent = that.gV.yield_firstData ==""?"请选择":that.gV.yield_firstData;
             that.$e.yield_second[0].textContent = that.gV.yield_secondData ==""?"请选择":that.gV.yield_secondData;
             that.$e.loss_first[0].textContent = that.gV.loss_firstData ==""?"请选择":that.gV.loss_firstData;
             that.$e.loss_second[0].textContent = that.gV.loss_secondData ==""?"请选择":that.gV.loss_secondData;
        },
        queryDictionary:function(){
            //字典
            var that = this;
            var queryString = "fundDiagnosisRiskLevel,fundDiagnosisEInvestDurationLevel"
            var obj = [{
                url : site_url.queryDictionary_api,
                data:{
                    keySets:queryString
                },
                needDataEmpty: true,
                callbackDone:function(json){
                    console.log("8989",json)
                }

            }];
            $.ajaxLoading(obj);
        },
        getData:function(){
           var that = this;
           var obj = [{
               url:site_url.addBeforeFundDiagnosisApply_api,
               needDataEmpty:true,
               callbackDone:function(json){
                   console.log("回显申请数据",json)
                   if(json.data){
                        that.initData(json.data);
                        that.initParmis();
                   }
               }
           }];
           $.ajaxLoading(obj)
        },
        addFundDiagnosisApply:function(){
            var that = this;
            var obj = [{
                url:site_url.addFundDiagnosisApply_api,
                needDataEmpty:true,
                data:{
                    id:"",  //主键
                    age:"", //年龄
                    evocation:"", //职业
                    evocationExtension:"",//职业描述
                    investDurationLevel:"", //投资年限
                    riskLevel:"",  //风险等级
                    eInvestDurationLevel:"",  //预计投资年限
                    liquidityRequirement:"",  //流动性需求
                    eYieldratePerYearMin:"", //预期年化收益率最小值
                    eYieldratePerYearMax:"",  //预期年化收益率最大值
                    affordableMaxDeficitRateMin:"",  //可承受最大亏损最小值
                    affordableMaxDeficitRateMax:"",  //可承受最大亏损最大值
                    readyPurchaseHTFunds:"",    //已购买恒天基金
                    readyPurchaseQTFunds:""      //已购买其他基金
                },
                callbackDone:function(json){
                   console.log("提交申请",json)
                }
            }];
            $.ajaxLoading(obj)
        },
        queryFundDiagnosisApplyInfo:function(){
            //修改申请过来回显详情数据
            var that = this;
            var obj = [{
                url:site_url.queryFundDiagnosisApplyInfo_api,
                needDataEmpty:true,
                data:{
                    applyId:"", //基金诊断申请id
                },
                callbackDone:function(json){
                    if(json.data){
                        that.initData(json.data);
                        that.initParmis();
                    }
                }
            }];
            $.ajaxLoading(obj)
        },
        updateFundDiagnosisApply:function(){
            //修改基金诊断申请
            var that = this;
            var obj = [{
                url:site_url.updateFundDiagnosisApply_api,
                needDataEmpty:true,
                data:{
                    id:"",  //主键
                    age:"", //年龄
                    evocation:"", //职业
                    evocationExtension:"",//职业描述
                    investDurationLevel:"", //投资年限
                    riskLevel:"",  //风险等级
                    eInvestDurationLevel:"",  //预计投资年限
                    liquidityRequirement:"",  //流动性需求
                    eYieldratePerYearMin:"", //预期年化收益率最小值
                    eYieldratePerYearMax:"",  //预期年化收益率最大值
                    affordableMaxDeficitRateMin:"",  //可承受最大亏损最小值
                    affordableMaxDeficitRateMax:"",  //可承受最大亏损最大值
                    readyPurchaseHTFunds:"",    //已购买恒天基金
                    readyPurchaseQTFunds:""      //已购买其他基金
                },
                callbackDone:function(json){
                    console.log("修改申请",json)
                }
            }];
            $.ajaxLoading(obj)
        },
       events:function(){
            var that = this;
            mui("body").on("mdClick",".mui-icon-arrowright",function(){
             
                var type = $(this).attr("type");
                $('.popup').css('display', 'block')
                $(".popup-content .selectItemList").hide();
                if(type == "sex"){
                    $(".popup-content .sex").show()
                }else if(type == "professional"){
                    $(".popup-content .professional").show()
                }else if(type == "investment_year"){
                    $(".popup-content .investment_year").show()
                }else if(type == "expectedInvestment_year"){
                    $(".popup-content .expectedInvestment_year").show()
                }else if(type == "liquidity"){
                    $(".popup-content .liquidity").show()
                }else if(type == "yield"){
                    $(".popup-content .yield").show()
                    that.gV.typeInput = "yield";
                }else if(type == "loss"){
                    $(".popup-content .loss").show()
                    that.gV.typeInput = "loss";
                }
            
            })
            mui("body").on("mdClick",".selectItemList ul li",function(){
                var type = $(this).attr("type");
                var val = $(this).find("span")[0].textContent;
                $(this).find(".radioCheckItemImg").show();
                $(this).siblings().find(".radioCheckItemImg").hide();
                $(".popup_true").attr("type",type).attr("val",val);
            })

            //弹出框确定按钮
            mui("body").on("mdClick",".popup_true",function(){
                var type = $(this).attr("type");
                var val = $(this).attr("val");
                if(type == "sex"){
                    that.$e.sex[0].textContent = val;
                    that.gV.sexData = val;
                }else if(type == "professional"){
                    that.$e.professional[0].textContent = val;
                    that.gV.professionalData = val;
                }else if(type == "investment_year"){
                    that.$e.investment_year[0].textContent = val;
                    that.gV.investment_yearData = val
                }else if(type == "expectedInvestment_year"){
                    that.$e.expectedInvestment_year[0].textContent = val;
                    that.gV.expectedInvestment_yearData = val
                }else if(type == "liquidity"){
                    that.$e.liquidity[0].textContent = val;
                    that.gV.liquidityData = val;
                }
                else{
                    if(that.gV.typeInput == "yield"){
                        var firstVal = $(".yieldFirst").val();
                        var secondVal = $(".yieldSecond").val();
                        if(secondVal<firstVal){
                            $(".yieldWarmMessage").show();
                            $(".yieldWarmMessage").html("最大年化收益率大于最小年化收益")
                            return;
                        }else{
                            $(".yieldWarmMessage").hide();  
                        }
                        if(secondVal>100 || firstVal>100){
                            $(".yieldWarmMessage").show();
                            $(".yieldWarmMessage").html("年化收益小于100")
                            return;
                        }else{
                            $(".yieldWarmMessage").hide();
                        }
                        if(secondVal == "" ||firstVal == ""){
                            $(".yieldWarmMessage").show();
                            $(".yieldWarmMessage").html("年化收益不能为空")
                            return;
                        }else{
                            $(".yieldWarmMessage").hide();
                        }
                        that.$e.yield_first[0].textContent = firstVal;
                        that.$e.yield_second[0].textContent = secondVal;
                        that.gV.yield_secondData = secondVal;
                        that.gV.yield_firstData = firstVal
                        that.$e.yieldControl.show();

                    }else if(that.gV.typeInput == "loss"){
                        var firstVal = $(".lossFirst").val();
                        var secondVal = $(".lossSecond").val();
                        if(secondVal<firstVal){
                            $(".lossWarmMessage").show();
                            $(".lossWarmMessage").html("最大可承受回撤大于最小可承受回撤")
                            return;
                        }else{
                            $(".lossWarmMessage").hide();  
                        }
                        if(secondVal>100 || firstVal>100){
                            $(".lossWarmMessage").show();
                            $(".lossWarmMessage").html("年化收益小于100")
                            return;
                        }else{
                            $(".lossWarmMessage").hide();
                        }
                        if(secondVal == "" ||firstVal == ""){
                            $(".lossWarmMessage").show();
                            $(".lossWarmMessage").html("年化收益不能为空")
                            return;
                        }else{
                            $(".lossWarmMessage").hide();
                        }
                        that.$e.loss_first[0].textContent = firstVal;
                        that.$e.loss_second[0].textContent = secondVal;
                        that.gV.loss_secondData = secondVal;
                        that.gV.loss_firstData = firstVal;
                        that.$e.lossControl.show();
                    }
                }
                
                $('.popup').css('display', 'none')
            })
            //弹出框取消按钮
            mui("body").on("mdClick",".popup_cancel",function(){
                $('.popup').css('display', 'none')
            })

            //新增其他的清除按钮
            mui("body").on("mdClick",".otherAddList ul li .mui-icon-close",function(){
                $(this).parent().remove();
                var fundCode = $(this).parent().attr("code");
                var newArr = [];
                that.gV.otherFundCodeData.forEach(function(item){
                      if(item.fundCode != fundCode){
                          newArr.push(item)
                      }
                });
                that.gV.otherFundCodeData = newArr;
                sessionStorage.setItem("addAccountDiagnosisResultList",JSON.stringify(newArr))
                if(that.gV.otherFundCodeData){
                    if(that.gV.otherFundCodeData.length>0){
                         $(".addOtherFundcodeBox_noData").hide();
                    }else{
                         $(".addOtherFundcodeBox_noData").show();
                    }
                 }else{
                     $(".addOtherFundcodeBox_noData").show();
                 }
            })

            //新增其他新建添加按钮
            mui("body").on("mdClick",".addOtherFundcodeBox .mui-icon-plusempty",function(){
                window.location.href = site_url.addAccountDiagnosisResult_url;
            })

           //提交申请
           mui("body").on("mdClick",".comfirmButtom .mui-btn",function(){
               that.addFundDiagnosisApply();
               var tital = "提交申请成功";
               var value = "恒天公募基金研究团队正在快马加鞭赶来,我们将尽快与你联系,请耐心等待并保持手机畅通";
                $.elasticLayerTypeTwo({
                    id: "tip",
                    title: tital,
                    p: '<p>' + value + '</p>',
                    buttonTxt: '知道了',
                    zIndex: 100,
                });
           })

       },
      
     
      
    };
    fundAccountDiagnosisResult.init();
});