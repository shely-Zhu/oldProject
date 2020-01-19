/*
 * @Author: yanan
 * @Date: 2019-12-09 15:53:31
 * @LastEditTime : 2020-01-10 11:37:21
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htjf-app\src\mine\static\js\fundAccountDiagnosisResult.js
 */

/*
 * @Author: tianjunguo 修改样式，增加请选择
 * @Date: 2019-1-9 
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayerTypeTwo.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
require('@pathIncludJs/vendor/mui/mui.picker.min.js');
var popPicker = require('@pathCommonJsCom/popPicker.js');


$(function() {

    var fundAccountDiagnosisResult = {
        $e: {
            holdingBox: $('#holdingBox'), // 账户持仓情况
            holdingBoxTemp: $('#holdingBox-template'), // 账户持仓情况模板
            diagnosis:$("#diagnosis-box"), //诊断结论
            templateTransferFunds:$("#templateTransferFunds"), //基金列表模板
            TransferFundsContent:$(".otherAddList .selectFundCode"), //基金列表容器
            readyPurchaseHTFunds:$("#readyPurchaseHTFunds"), //恒天基金模板
            templateTransferFundsList:$(".templateTransferFundsList"),  //恒天基金容器
            userAge:$(".userAge"), //年龄
            sex:$("#sex"), //性别
            professional:$("#professional"), //职业
            professionalDescript:$("#professionalDescript"), //职业描述
            investment_year:$("#investment_year"), //投资年限
            riskLevel:$("#riskLevel"), //风险等级
            expectedInvestment_year:$("#expectedInvestment_year"), //预计投资年限
            liquidity:$("#liquidity"),  //流动性需求
            // yield_second:$("#yield_second"), // 最高预期年化收益
            yield_first:$(".yield_first"),  // 最低预期年化收益
            // loss_second:$("#loss_second"),  //最高承受最大回撤
            loss_first:$(".loss_first"),    // 最低承受最大回撤
            yieldControl:$(".yieldControl"), //年化收益数据显示容器
            lossControl:$(".lossControl"),   // 可承受数据显示容器
            fundDiagnosisSexTemplate:$(".popup-content .sex ul"), //性别下拉列表容器
            fundDiagnosisVocationTemplate:$(".popup-content .professional ul"), //职业下拉列表容器
            fundDiagnosisInvestDurationTemplate:$(".popup-content .investment_year ul"),  //投资年限下拉列表容器
            fundDiagnosisRiskLevelTemplate:$(".popup-content .riskLevel ul"),  //风险下拉列表容器
            fundDiagnosisEInvestDurationLevelTemplate:$(".popup-content .expectedInvestment_year ul"),  //预期投资年限下拉列表容器
            fundDiagnosisLiquidityRequirementTemplate:$(".popup-content .liquidity ul"),  //流动性需求下拉列表容器
            templateSelectBox:$(".selectItem") , //下拉框模板
        },
        gV: {
              applyType:splitUrl['type'], // add 为新增  edit 为编辑
              applyId:splitUrl['applyId'],   //编辑具体的基金的id
              otherFundCodeData:[], //其他基金数据
              readyPurchaseHTFunds:"", //恒天基金
              selectPurchaseHTFunds:[],//已购买恒天基金
              userAge:"", //年龄
              birthDate:"", 
              sexData:"",//性别
              sexDataCode:"", //性别编码
              professionalData:"",//职业
              professionalDataCode:"", //职业编码
              professionalDescriptData:"", // 职业描述
              investment_yearData:"", //投资年限
              investment_yearDataCode:"",  //投资年限编码
              riskLevelData:"", //风险等级
              riskLevelDataCode:"", //风险等级编码
              expectedInvestment_yearData:"", //预计投资年限
              expectedInvestment_yearDataCode:"", //预计投资年限编码
              liquidityData:"", //流动性需求
              liquidityDataCode:"", //流动性需求编码
            //   yield_firstData:"",// 最低预期年化收益
              yield_secondData:"", // 最高预期年化收益
            //   loss_firstData:"",  // 最低承受最大回撤
              loss_secondData:"",  //最高承受最大回撤
              typeInput:"",//预期年化收益率 与 可承受最大回撤
              fundDiagnosisSexDicData:"", //性别数据字典
              fundDiagnosisVocationDicData:"", //职业数据字典
              fundDiagnosisInvestDurationDicData:"" ,//投资年限字典
              fundDiagnosisRiskLevelDicData:"", //风险等级字典
              fundDiagnosisEInvestDurationLevelDicData:"", //预计投资年限字典
              fundDiagnosisLiquidityRequirementDicData:"", //流动性需求字典
              dataPickData:"", //其他基金的日期
        },
        init: function() {
            var that = this;
            that.queryDictionary();
            that.initResource();
            that.events();
        },
        initAddOtherFundCode: function() {
            //初始化其他基金
            var that = this;
            that.$e.TransferFundsContent.html("")
            generateTemplate(that.gV.otherFundCodeData, that.$e.TransferFundsContent, that.$e.templateTransferFunds);
            if (that.gV.otherFundCodeData) {
                if (that.gV.otherFundCodeData.length > 0) {
                    $(".addOtherFundcodeBox_noData").hide();
                } else {
                    $(".addOtherFundcodeBox_noData").show();
                }
            } else {
                $(".addOtherFundcodeBox_noData").show();
            }
        },
        initSelectVal: function() {
            //初始化数据字典下拉框值
            var that = this;
            //  generateTemplate(that.gV.fundDiagnosisSexDicData,that.$e.fundDiagnosisSexTemplate,that.$e.templateSelectBox);  //init性别
            //  generateTemplate(that.gV.fundDiagnosisVocationDicData,that.$e.fundDiagnosisVocationTemplate,that.$e.templateSelectBox);  //init职业
            //  generateTemplate(that.gV.fundDiagnosisInvestDurationDicData,that.$e.fundDiagnosisInvestDurationTemplate,that.$e.templateSelectBox);  //init投资年限
            //  generateTemplate(that.gV.fundDiagnosisRiskLevelDicData,that.$e.fundDiagnosisRiskLevelTemplate,that.$e.templateSelectBox);  //init风险
            //  generateTemplate(that.gV.fundDiagnosisEInvestDurationLevelDicData,that.$e.fundDiagnosisEInvestDurationLevelTemplate,that.$e.templateSelectBox);  //init预计投资年限
            //  generateTemplate(that.gV.fundDiagnosisLiquidityRequirementDicData,that.$e.fundDiagnosisLiquidityRequirementTemplate,that.$e.templateSelectBox);  //init流动性
        },
        initData: function(data) {
            var that = this
            that.gV.userAge = data.age;  //年龄
            that.gV.birthDate = data.birthDate ; //出生日期
            that.gV.sexDataCode = data.sex;  //性别
            that.gV.sexData = data.sex;  //性别
            that.gV.professionalDataCode = data.evocation ;  //职业
            that.gV.professionalDescriptData = data.evocationExtension; //职业描述
            that.gV.investment_yearDataCode = data.investDurationLevel;  //投资年限
            that.gV.riskLevelDataCode = data.riskLevel;   //风险等级
            that.gV.expectedInvestment_yearDataCode = data.eInvestDurationLevel;  //预期年限
            that.gV.liquidityDataCode = data.liquidityRequirement; //流动性
            // that.gV.yield_firstData = data.eYieldratePerYearMax + "%";
            that.gV.yield_secondData = data.eYieldratePerYearMax;
            // that.gV.loss_firstData = data.affordableMaxDeficitRateMax + "%";
            that.gV.loss_secondData = data.affordableMaxDeficitRateMax;
            that.gV.otherFundCodeData = data.readyPurchaseQTFunds;
            // that.gV.otherFundCodeData = JSON.parse(sessionStorage.getItem("addAccountDiagnosisResultList")) != ""?JSON.parse(sessionStorage.getItem("addAccountDiagnosisResultList")):data.readyPurchaseQTFunds;
            //sessionStorage.setItem("addAccountDiagnosisResultList",JSON.stringify(that.gV.otherFundCodeData));
            that.initAddOtherFundCode();
            that.gV.readyPurchaseHTFunds = data.readyPurchaseHTFunds;
            /*that.gV.readyPurchaseHTFunds.forEach(function(item,index){
                if(!!item.id){
                    item.checkStatu = true
                    that.gV.selectPurchaseHTFunds.push(item) 
                }else{
                    item.checkStatu = false
                }
                item.purchaseSourceType="1"
            })*/
            for (var i = 0; i < that.gV.readyPurchaseHTFunds.length; i++) {
                if (!!that.gV.readyPurchaseHTFunds[i].id) {
                    that.gV.readyPurchaseHTFunds[i].checkStatu = true
                    that.gV.selectPurchaseHTFunds.push(that.gV.readyPurchaseHTFunds[i])
                } else {
                    that.gV.readyPurchaseHTFunds[i].checkStatu = false
                }
                that.gV.readyPurchaseHTFunds[i].purchaseSourceType = "1"
            }
            if (that.gV.readyPurchaseHTFunds) {
                generateTemplate(that.gV.readyPurchaseHTFunds, that.$e.templateTransferFundsList, that.$e.readyPurchaseHTFunds)
            }
        },
        escapeCode: function(code, type) {
            var that = this;
            var val = "请选择";
            if (type == "fundDiagnosisSex") {
                /*that.gV.fundDiagnosisSexDicData.forEach(function(item){
                    if(item.dicCode == code){
                         val = item.value
                    }
                })*/
                // for (var i = 0; i < that.gV.fundDiagnosisSexDicData.length; i++) {
                //     if (that.gV.fundDiagnosisSexDicData[i].dicCode == code) {
                //         val = that.gV.fundDiagnosisSexDicData[i].text
                //     }
                // }
                if(code){
                    val = "男";
                }else{
                    val = "女";
                }
            } else if (type == 'fundDiagnosisVocation') {
                /*that.gV.fundDiagnosisVocationDicData.forEach(function(item){
                    if(item.dicCode == code){
                        val = item.value
                    }
                })*/
                for (var i = 0; i < that.gV.fundDiagnosisVocationDicData.length; i++) {
                    if (that.gV.fundDiagnosisVocationDicData[i].dicCode == code) {
                        val = that.gV.fundDiagnosisVocationDicData[i].text
                    }
                }
            } else if (type == 'fundDiagnosisInvestDuration') {
                /*that.gV.fundDiagnosisInvestDurationDicData.forEach(function(item){
                    if(item.dicCode == code){
                        val = item.value
                    }
                })*/
                for (var i = 0; i < that.gV.fundDiagnosisInvestDurationDicData.length; i++) {
                    if (that.gV.fundDiagnosisInvestDurationDicData[i].dicCode == code) {
                        val = that.gV.fundDiagnosisInvestDurationDicData[i].text
                    }
                }
            } else if (type == 'fundDiagnosisRiskLevel') {
                /*that.gV.fundDiagnosisRiskLevelDicData.forEach(function(item){
                    if(item.dicCode == code){
                        val = item.value
                    }
                })*/
                for (var i = 0; i < that.gV.fundDiagnosisRiskLevelDicData.length; i++) {
                    if (that.gV.fundDiagnosisRiskLevelDicData[i].dicCode == code) {
                        val = that.gV.fundDiagnosisRiskLevelDicData[i].text
                    }
                }
            } else if (type == 'fundDiagnosisEInvestDurationLevel') {
                /*that.gV.fundDiagnosisEInvestDurationLevelDicData.forEach(function(item){
                    if(item.dicCode == code){
                        val = item.value
                    }
                })*/
                for (var i = 0; i < that.gV.fundDiagnosisEInvestDurationLevelDicData.length; i++) {
                    if (that.gV.fundDiagnosisEInvestDurationLevelDicData[i].dicCode == code) {
                        val = that.gV.fundDiagnosisEInvestDurationLevelDicData[i].text
                    }
                }
            } else if (type == 'fundDiagnosisLiquidityRequirement') {
                /*that.gV.fundDiagnosisLiquidityRequirementDicData.forEach(function(item){
                    if(item.dicCode == code){
                        val = item.value
                    }
                })*/
                for (var i = 0; i < that.gV.fundDiagnosisLiquidityRequirementDicData.length; i++) {
                    if (that.gV.fundDiagnosisLiquidityRequirementDicData[i].dicCode == code) {
                        val = that.gV.fundDiagnosisLiquidityRequirementDicData[i].text
                    }
                }
            }
            return val;
        },
        mandatory:function(){
            var  that = this;
            var str = "" ;
            if(that.$e.userAge[0].value == "" || that.$e.userAge[0].value == null){
               str = "请填写您的年龄"
               tipAction(str)
               return false
            }else if(that.$e.professional[0].textContent=="请选择"){
               str = "请选择您的性别"
               tipAction(str)
               return false
            }else if(that.$e.professional[0].textContent=="请选择"){
                str = "请选择您的职业"
                tipAction(str)
                return false
            }else if(that.$e.investment_year[0].textContent=="请选择"){
                str = "请选择您的投资年限"
                tipAction(str)
                return false
            }else if(that.$e.riskLevel[0].textContent=="请选择"){
                str = "请选择您的风险等级"
                tipAction(str)
                return false
            }else if(that.$e.expectedInvestment_year[0].textContent=="请选择"){
                str = "请选择您的预计投资年限"
                tipAction(str)
                return false
            }else if(that.$e.liquidity[0].textContent=="请选择"){
                str = "请选择您的流动性需求"
                tipAction(str)
                return false
            }else if(!that.$e.yield_first[0].value){
            // &&!that.$e.yield_second[0].textContent
                str = "请填写您的预期年化收益"
                tipAction(str)
                return false
            }else if(!that.$e.loss_first[0].value){
            // &&!that.$e.loss_second[0].textContent
                str = "请填写您的最大回撤"
                tipAction(str)
                return false
            }else if(that.gV.selectPurchaseHTFunds.length==0&&that.gV.otherFundCodeData.length==0){
                str = "请您勾选一笔基金或者添加一笔基金"
                tipAction(str)
                return false
            }
            return true
        },
        initParmis:function(){
             var that = this;
             that.$e.userAge[0].value =  that.gV.userAge
             that.$e.sex[0].textContent = that.escapeCode(that.gV.sexDataCode,"fundDiagnosisSex");   //性别
             that.$e.professional[0].textContent = that.escapeCode(that.gV.professionalDataCode,"fundDiagnosisVocation");  //职业
             if(!!that.gV.professionalDescriptData){
                that.$e.professionalDescript.show()
                that.$e.professionalDescript[0].value = that.gV.professionalDescriptData;  //职业描述
             }
             
             that.$e.investment_year[0].textContent = that.escapeCode(that.gV.investment_yearDataCode,"fundDiagnosisInvestDuration");  //投资年限
             that.$e.riskLevel[0].textContent = that.escapeCode(that.gV.riskLevelDataCode,"fundDiagnosisRiskLevel");  //风险等级
             that.$e.expectedInvestment_year[0].textContent = that.escapeCode(that.gV.expectedInvestment_yearDataCode,"fundDiagnosisEInvestDurationLevel"); //预期年限
             that.$e.liquidity[0].textContent = that.escapeCode(that.gV.liquidityDataCode,"fundDiagnosisLiquidityRequirement");  //流动性
            //  || !! that.gV.yield_secondData
            //  if(!!that.gV.yield_firstData){
            //     that.$e.yieldControl.show();
            //     $("#yearOwn").hide();
            //     $("#maxLossOwn").hide();
            //  }else{
            //     that.$e.yieldControl.hide();
            //     $("#yearOwn").show();
            //     $("#maxLossOwn").show();
            //  }
            //  || !!that.gV.loss_secondData
            //  if(!!that.gV.loss_firstData){
            //     that.$e.lossControl.show();
            //  }else{
            //     that.$e.lossControl.hide();
            //  }
            //  that.$e.yield_first[0].textContent = that.gV.yield_firstData ==""?"请选择":that.gV.yield_firstData;
             that.$e.yield_first[0].value = that.gV.yield_secondData ===""?"请输入":that.gV.yield_secondData;
            //  that.$e.loss_first[0].textContent = that.gV.loss_firstData ==""?"请选择":that.gV.loss_firstData;
             that.$e.loss_first[0].value = that.gV.loss_secondData ===""?"请输入":that.gV.loss_secondData;
        },
        queryDictionary: function() {
            //字典
            var that = this;
            var queryString = "fundDiagnosisSex,fundDiagnosisVocation,fundDiagnosisInvestDuration,fundDiagnosisRiskLevel,fundDiagnosisEInvestDurationLevel,fundDiagnosisLiquidityRequirement"
            var obj = [{
                url: site_url.queryDictionary_api,
                contentTypeSearch: true,
                data: {
                    keySets: queryString
                },
                needDataEmpty: true,
                callbackDone: function(json) {
                    that.gV.fundDiagnosisSexDicData = json.data.fundDiagnosisSex;
                    that.gV.fundDiagnosisVocationDicData = json.data.fundDiagnosisVocation;
                    that.gV.fundDiagnosisInvestDurationDicData = json.data.fundDiagnosisInvestDuration;
                    that.gV.fundDiagnosisRiskLevelDicData = json.data.fundDiagnosisRiskLevel;
                    that.gV.fundDiagnosisEInvestDurationLevelDicData = json.data.fundDiagnosisEInvestDurationLevel;
                    that.gV.fundDiagnosisLiquidityRequirementDicData = json.data.fundDiagnosisLiquidityRequirement;
                    that.initSelectVal();
                }

            }];
            $.ajaxLoading(obj);
        },
        initResource: function() {
            //获取回显申请数据
            var that = this;
            if (that.gV.applyType == "add") {
                that.getData();
            } else if (that.gV.applyType == "edit") {
                that.queryFundDiagnosisApplyInfo(that.gV.applyId);
            }
        },
        getData: function() {
            var that = this;
            var obj = [{
                url: site_url.addBeforeFundDiagnosisApply_api,
                needDataEmpty: true,
                callbackDone: function(json) {
                    console.log("回显申请数据", json)
                    if (json.data) {
                        that.initData(json.data);
                        that.initParmis();
                    }
                }
            }];
            $.ajaxLoading(obj)
        },
        addFundDiagnosisApply: function() {
            var that = this;
            var obj = [{
                url:site_url.addFundDiagnosisApply_api,
                needDataEmpty:true,
                data:{
                    id:"",  //主键 
                    age:that.gV.userAge, //年龄
                    birthDate:that.gV.birthDate,  //出生日期
                    sex:(!!that.$e.sex.attr("num"))?that.$e.sex.attr("num"):that.gV.sexDataCode, //性别
                    evocation:(!!that.$e.professional.attr("num"))? that.$e.professional.attr("num"):that.gV.professionalDataCode, //职业
                    evocationExtension:that.$e.professionalDescript.val(),//职业描述
                    investDurationLevel:(!!that.$e.investment_year.attr("num"))?that.$e.investment_year.attr("num"):that.gV.investment_yearDataCode, //投资年限
                    riskLevel:(!!that.$e.riskLevel.attr('num'))?that.$e.riskLevel.attr('num'):that.gV.riskLevelDataCode,  //风险等级
                    eInvestDurationLevel:(!!that.$e.expectedInvestment_year.attr("num"))?that.$e.expectedInvestment_year.attr("num"):that.gV.expectedInvestment_yearDataCode,  //预计投资年限
                    liquidityRequirement:(!!that.$e.liquidity.attr("num"))?that.$e.liquidity.attr("num"):that.gV.liquidityDataCode,  //流动性需求
                    // eYieldratePerYearMin:that.gV.yield_firstData, //预期年化收益率最小值
                    eYieldratePerYearMax:that.gV.yield_secondData,  //预期年化收益率最大值
                    // affordableMaxDeficitRateMin:that.gV.loss_firstData,  //可承受最大亏损最小值
                    affordableMaxDeficitRateMax:that.gV.loss_secondData,  //可承受最大亏损最大值
                    readyPurchaseHTFunds:that.gV.selectPurchaseHTFunds,    //已购买恒天基金
                    readyPurchaseQTFunds:that.gV.otherFundCodeData      //已购买其他基金
                },
                callbackDone: function(json) {
                    console.log("提交申请", json)
                    var tital = "新增提交申请成功";
                    var value = "恒天公募基金研究团队正在快马加鞭赶来,我们将尽快与你联系,请耐心等待并保持手机畅通";
                    $.elasticLayerTypeTwo({
                        id: "tip",
                        title: tital,
                        p: '<p>' + value + '</p>',
                        buttonTxt: '知道了',
                        zIndex: 100,
                        htmdEvtYes: 'fundAccountDiagnosisResult_09',
                    });
                    setTimeout(function(){
                        //window.location.href = site_url.applyHistory_url 
                    },1000)
                   
                },
                callbackNoData: function(json) {
                    tipAction(json.message);
                }

            }];
            $.ajaxLoading(obj)
        },
        queryFundDiagnosisApplyInfo: function(applyId) {
            //修改申请过来回显详情数据
            var that = this;
            var obj = [{
                url: site_url.queryFundDiagnosisApplyInfo_api,
                needDataEmpty: true,
                contentTypeSearch: true,
                data: {
                    applyId: applyId, //基金诊断申请id
                },
                callbackDone: function(json) {
                    if (json.data) {
                        that.initData(json.data);
                        that.initParmis();
                        if(json.data.applyStatus=="3"||json.data.applyStatus == "4"){
                            $(".submitButton").attr('disabled', true)
                        }else{
                            $(".submitButton").removeAttr("disabled");
                        }
                    }
                }
            }];
            $.ajaxLoading(obj)
        },
        updateFundDiagnosisApply: function() {
            //修改基金诊断申请
            var that = this;
            var obj = [{
                url:site_url.updateFundDiagnosisApply_api,
                needDataEmpty:true,
                data:{
                    id:that.gV.applyId,  //主键
                    age:$(".userAge").val() , //年龄
                    birthDate:that.gV.birthDate,  //出生日期
                    sex:(!!that.$e.sex.attr("num"))?that.$e.sex.attr("num"):that.gV.sexDataCode, //性别
                    evocation:(!!that.$e.professional.attr("num"))? that.$e.professional.attr("num"):that.gV.professionalDataCode, //职业
                    evocationExtension:that.$e.professionalDescript.val(),//职业描述
                    investDurationLevel:(!!that.$e.investment_year.attr("num"))?that.$e.investment_year.attr("num"):that.gV.investment_yearDataCode, //投资年限
                    riskLevel:(!!that.$e.riskLevel.attr('num'))?that.$e.riskLevel.attr('num'):that.gV.riskLevelDataCode,  //风险等级
                    eInvestDurationLevel:(!!that.$e.expectedInvestment_year.attr("num"))?that.$e.expectedInvestment_year.attr("num"):that.gV.expectedInvestment_yearDataCode,  //预计投资年限
                    liquidityRequirement:(!!that.$e.liquidity.attr("num"))?that.$e.liquidity.attr("num"):that.gV.liquidityDataCode,  //流动性需求
                    // eYieldratePerYearMin:that.gV.yield_firstData, //预期年化收益率最小值
                    eYieldratePerYearMax:that.gV.yield_secondData,  //预期年化收益率最大值
                    // affordableMaxDeficitRateMin:that.gV.loss_firstData,  //可承受最大亏损最小值
                    affordableMaxDeficitRateMax:that.gV.loss_secondData,  //可承受最大亏损最大值
                    readyPurchaseHTFunds:that.gV.selectPurchaseHTFunds,    //已购买恒天基金
                    readyPurchaseQTFunds:that.gV.otherFundCodeData       //已购买其他基金
                },
                callbackDone: function(json) {
                    console.log("修改申请", json);
                    var tital = "编辑提交申请成功";
                    var value = "恒天公募基金研究团队正在快马加鞭赶来,我们将尽快与你联系,请耐心等待并保持手机畅通";
                     $.elasticLayerTypeTwo({
                         id: "tip",
                         title: tital,
                         p: '<p>' + value + '</p>',
                         buttonTxt: '知道了',
                         zIndex: 100,
                         htmdEvtYes:'fundAccountDiagnosisResult_10'
                     });
                     setTimeout(function(){
                       // window.location.href = site_url.applyHistory_url 
                    },1000)
                },
                callbackNoData: function(json) {
                    tipAction(json.message);
                }
            }];
            $.ajaxLoading(obj)
        },
        professionalCallback:function(){
            var that =this;
            if(that.$e.professional.attr("num")=="98"){
                //职业为其他
                that.$e.professionalDescript.show()
            }else{
                that.$e.professionalDescript.hide()
            }
        },
       events:function(){
            var that = this;
            // var dtPicker = new mui.DtPicker({
            //     type: 'date'
            // });
            // 购买日期选择
            mui("body").on("mdClick", ".addOtherFund_content .mui-icon-arrowright,.addOtherFund_content .dataPick,#dataPickDec", function() {
                if($('.addOtherFund_content .dataPick').text() =='请选择'||$('.addOtherFund_content .dataPick').text()==''){
                    $('.addOtherFund_content .dataPick').text('请选择');
                    if($('body').find('.mui-dtpicker').length==0){
                        var dtPicker = new mui.DtPicker({
                            type: 'date'
                        });
                        var type = $(this).attr("type");
                        $('.popup').show()
                        $("#dataPickDec").hide();
                        //$('.popup-content .popup-mask').hide();
                        $('.mui-dtpicker').show()
                        that.gV.dataPickData = "";
                        // 监听日期选择点击事件
                        dtPicker.show(function(selectItems) {
                            $('.popup-mask').show();
                            // $('.popup').css('display', 'none')
                            that.gV.dataPickData = selectItems.value;
                            $(".dataPick")[0].textContent = selectItems.value;
                        })
                    }
                }else{
                    $('.mui-dtpicker').remove();
                    $('.mui-backdrop').remove();
                    if($('body').find('.mui-dtpicker').length<=1){
                    var dtPicker = new mui.DtPicker({
                        type: 'date'
                    });
                    var type = $(this).attr("type");
                    $('.popup').show()
                    $("#dataPickDec").hide();
                    //$('.popup-content .popup-mask').hide();
                    $('.mui-dtpicker').show()
                    that.gV.dataPickData = "";
                    // 监听日期选择点击事件
                    dtPicker.show(function(selectItems) {
                        $('.popup-mask').show();
                        // $('.popup').css('display', 'none')
                        that.gV.dataPickData = selectItems.value;
                        $(".dataPick")[0].textContent = selectItems.value;
                    })
                }
                    
                }
                
                
            },{
                'htmdEvt':'fundAccountDiagnosisResult_01'
            })
            
            mui("body").on("mdClick", ".addOtherFund_content .comfirmButtom .addOtherTrue", function() {
                var fundCode = $(".fundCode_input").val();
                var dataPick = $(".dataPick")[0].textContent=='请选择'?'':$(".dataPick")[0].textContent;
                var money = $(".money_input").val();
                var obj = {
                    "fundCode": fundCode,
                    "purchaseDate": new Date(dataPick).getTime(),
                    "purchaseDateStr": dataPick,
                    "purchaseAmount": money,
                    "purchaseSourceType": 2
                }
                if (fundCode != "" && dataPick != "" && money != "") {
                    if (!!that.gV.otherFundCodeData) {
                        if (that.gV.otherFundCodeData.length == 0) {
                            that.gV.otherFundCodeData.push(obj)
                        } else {
                            var arr = [];
                            that.gV.otherFundCodeData.forEach(function(item) {
                                if (item.fundCode != obj.fundCode) {
                                    arr.push(item)
                                }
                            })
                            arr.push(obj);
                            that.gV.otherFundCodeData = arr;
                        }
                    } else {
                        var arr = [];
                        arr.push(obj);
                        that.gV.otherFundCodeData = arr
                    }

//                  $(".warmMessage").hide()
                    $(".warmMessage").css("visibility","hidden")
                    $(".addOtherFund").hide()
                    $(".addOtherFund_content").hide()
                    that.initAddOtherFundCode()
                } else {
//                  $(".warmMessage").show()
                    $(".warmMessage").css("visibility","visible")
                }
            },{
                'htmdEvt':'fundAccountDiagnosisResult_02'
            })

            mui("body").on("mdClick", ".addOtherFund_content .comfirmButtom .addOtherFalse", function() {
//              $(".warmMessage").hide()
                $(".warmMessage").css("visibility","hidden")
                $(".addOtherFund").hide()
                $(".addOtherFund_content").hide()
            },{
                'htmdEvt':'fundAccountDiagnosisResult_03'
            })
            // 性别选择
            mui("body").on("mdClick", ".content-item .mui-icon-arrowright,.content-item .right", function() {
                var type = $(this).attr("type");
                // $('.popuplist').css('display', 'block')
                $(".popup-content .selectItemList").hide();
                $(".mui-dtpicker").hide();
                // $('.popup-mask').show();
                if (type == "sex") {
                    popPicker(1, that.gV.fundDiagnosisSexDicData, that.$e.sex);
                   // $(".popup-content .sex").show()
                }else if(type == "professional"){
                    popPicker(1, that.gV.fundDiagnosisVocationDicData, that.$e.professional,that.professionalCallback.bind(that));
                   // $(".popup-content .professional").show()
                }else if(type == "investment_year"){
                    popPicker(1, that.gV.fundDiagnosisInvestDurationDicData, that.$e.investment_year);
                    //   $(".popup-content .investment_year").show()
                } else if (type == "riskLevel") {
                    popPicker(1, that.gV.fundDiagnosisRiskLevelDicData, that.$e.riskLevel);
                    //   $(".popup-content .riskLevel").show()
                } else if (type == "expectedInvestment_year") {
                    popPicker(1, that.gV.fundDiagnosisEInvestDurationLevelDicData, that.$e.expectedInvestment_year);
                    //   $(".popup-content .expectedInvestment_year").show()
                } else if (type == "liquidity") {
                    popPicker(1, that.gV.fundDiagnosisLiquidityRequirementDicData, that.$e.liquidity);
                    // $(".popup-content .liquidity").show()
                } 
                // else if (type == "yield") {
                //     // $('.popuplist').css('display', 'block')
                //     // $('.popup-mask').show();
                //     // $('#yearOwn').hide();
                //     // $(".popup-content .yield").show()
                //     $(".yield_first").show();
                //     $("#maxLossOwn").hide();
                //     // that.gV.typeInput = "yield";
                // } else if (type == "loss") {
                //     $('.popuplist').css('display', 'block')
                //     $("#maxLossOwn").hide();
                //     $('.popup-mask').show();
                //     $(".popup-content .loss").show()
                //     that.gV.typeInput = "loss";
                // }
            }, {
                'htmdEvt': 'fundAccountDiagnosisResult_04'
            })
            $(".yield_first").on("input" , function() {
                var val = $(this).val()
                that.gV.yield_secondData = val*1;
                if(val){
                    $(".iptRight1").css("color","black")
                }
            })
            $(".loss_first").on("input" , function() {
                var val = $(this).val()
                that.gV.loss_secondData = val*1;
                if(val){
                    $(".iptRight2").css("color","black")
                }
            })
            //弹出框确定按钮
            mui("body").on("mdClick", ".popup_true", function() {
                if (that.gV.typeInput == "yield") {
                    var firstVal = $(".yieldFirst").val();
                    // var secondVal = $(".yieldSecond").val();
                    // secondVal == "" ||
                    if (firstVal == "") {
                        $(".yieldWarmMessage").show();
                        $(".yieldWarmMessage").html("年化收益不能为空")
                        return;
                    }else {
                        $(".yieldWarmMessage").hide();
                    }
                    // if (secondVal > 100 || firstVal > 100) {
                    //     $(".yieldWarmMessage").show();
                    //     $(".yieldWarmMessage").html("年化收益应小于100")
                    //     return;
                    // } else {
                    //     $(".yieldWarmMessage").hide();
                    // }
                    // if (secondVal < firstVal) {
                    //     $(".yieldWarmMessage").show();
                    //     $(".yieldWarmMessage").html("最大年化收益率应大于最小年化收益")
                    //     return;
                    // } else {
                    //     $(".yieldWarmMessage").hide();
                    // }
                    that.$e.yield_first[0].textContent = firstVal + "%";
                    // that.$e.yield_second[0].textContent = secondVal;
                    // that.gV.yield_secondData = secondVal;
                    that.gV.yield_firstData = firstVal + "%";
                    that.$e.yieldControl.show();
                    $("#yearOwn").hide();
                    $("#maxLossOwn").hide();
                } else if (that.gV.typeInput == "loss") {
                    var firstVal = $(".lossFirst").val();
                    // var secondVal = $(".lossSecond").val();
                    // secondVal == "" || 
                    if (firstVal == "") {
                        $(".lossWarmMessage").show();
                        $(".lossWarmMessage").html("最大可承受回撤不能为空")
                        return;
                    } else {
                        $(".lossWarmMessage").hide();
                    }
                    // if (secondVal > 100 || firstVal > 100) {
                    //     $(".lossWarmMessage").show();
                    //     $(".lossWarmMessage").html("最大可承受回撤应小于100")
                    //     return;
                    // } else {
                    //     $(".lossWarmMessage").hide();
                    // }
                    // if (secondVal < firstVal) {
                    //     $(".lossWarmMessage").show();
                    //     $(".lossWarmMessage").html("最大可承受回撤应大于最小可承受回撤")
                    //     return;
                    // } else {
                    //     $(".lossWarmMessage").hide();
                    // }
                    
                    that.$e.loss_first[0].textContent = firstVal + "%";
                    // that.$e.loss_second[0].textContent = secondVal;
                    // that.gV.loss_secondData = secondVal;
                    that.gV.loss_firstData = firstVal + "%";
                    that.$e.lossControl.show();
                    $("#yearOwn").hide();
                    $("#maxLossOwn").hide();
                }
                $(this).attr("type", "")
                $('.popuplist').css('display', 'none')
                $(".mui-backdrop").remove()
            }, {
                'htmdEvt': 'fundAccountDiagnosisResult_05'
            })

            //弹出框取消按钮
            mui("body").on("mdClick", ".popup_cancel", function() {
            	$('#yearOwn').show();
            	$('#maxLossOwn').show();
            	$('#dataPickDec').show();
                
                $(".mui-backdrop").remove()
                if(that.gV.yield_secondData != "" && that.gV.yield_firstData != ""){
                    $("#yearOwn").hide();
                    $('.popuplist').css('display', 'none')
                }
                if(that.gV.loss_secondData != "" && that.gV.loss_firstData != ""){
                    $("#maxLossOwn").hide();
                    $('.popuplist').css('display', 'none')
                }
               
            }, {
                'htmdEvt': 'fundAccountDiagnosisResult_06'
            })
            //新增其他的清除按钮
            mui("body").on("mdClick", ".otherAddList ul li .mui-icon-close", function() {
                $(this).parent().remove();
                var fundCode = $(this).parent().attr("code");
                var newArr = [];
                /*that.gV.otherFundCodeData.forEach(function(item){
                      if(item.fundCode != fundCode){
                          newArr.push(item)
                      }
                });*/
                for (var i = 0; i < that.gV.otherFundCodeData.length; i++) {
                    if (that.gV.otherFundCodeData[i].fundCode != fundCode) {
                        newArr.push(that.gV.otherFundCodeData[i])
                    }
                }
                that.gV.otherFundCodeData = newArr;
                // sessionStorage.setItem("addAccountDiagnosisResultList",JSON.stringify(newArr))
                if (that.gV.otherFundCodeData) {
                    if (that.gV.otherFundCodeData.length > 0) {
                        $(".addOtherFundcodeBox_noData").hide();
                    } else {
                        $(".addOtherFundcodeBox_noData").show();
                    }
                } else {
                    $(".addOtherFundcodeBox_noData").show();
                }
            }, {
                'htmdEvt': 'fundAccountDiagnosisResult_07'
            })

            //新增其他新建添加按钮
            mui("body").on("mdClick", ".addOtherFundcodeBox .mui-icon-plusempty", function() {
                //弹框前初始化一下
                $(".addOtherFund_content .fundCode_input").val('');
                $(".addOtherFund_content .money_input").val('');
                //初始化时间选择控件
                $("#dataPickDec").show();
                $(".dataPick")[0].textContent = "";
                $('.mui-dtpicker').remove();
                $('.mui-backdrop').remove();

                $(".addOtherFund").show()
                $(".addOtherFund_content").show()
                $(".popup_true").attr("type", "addOtherFund");
                // window.location.href = site_url.addAccountDiagnosisResult_url;
            }, {
                'htmdEvt': 'fundAccountDiagnosisResult_08'
            })

            //提交申请
            mui("body").on("mdClick", ".submitButton", function() {
                if( !that.mandatory()){
                   return false
                }
                if (that.gV.applyType == "add") {
                    that.addFundDiagnosisApply()
                } else if (that.gV.applyType == 'edit') {
                    that.updateFundDiagnosisApply()
                }
            }, {
                'htmdEvt': 'fundAccountDiagnosisResult_09'
            })
     
            mui("body").on("mdClick",".elasticButtons",function(){
                // window.location.href = site_url.applyHistory_url 
                location.href = "javascript:history.go(-1)";
            }, {
                'htmdEvt': 'fundAccountDiagnosisResult_10'
            } )

            //基金勾选
            mui("body").on("mdClick", ".templateTransferFundsList li input", function() {
                var checkStatu = $(this).parent().attr("checkStatus");
                var id = $(this).attr("listId");
                var fundCode = $(this).parent().attr("fundCode");
                var purchaseDate = $(this).parent().attr("purchaseDate");
                var purchaseAmount = $(this).parent().attr("purchaseAmount");
                var diagnoseApplyId = $(this).parent().attr("diagnoseApplyId");
                var obj = {
                    "id": id,
                    "fundCode": fundCode,
                    "purchaseDate": purchaseDate,
                    "diagnoseApplyId": diagnoseApplyId,
                    "purchaseAmount": purchaseAmount
                }
                if (checkStatu == "false") {
                    //勾选 添加
                    that.gV.selectPurchaseHTFunds.push(obj)
                    $(this).parent().attr("checkStatus", "true")
                } else {
                    //去除
                    var newArr = [];
                    /*that.gV.selectPurchaseHTFunds.forEach(function(item){
                        if(item.fundCode != fundCode){
                            newArr.push(item)
                        }
                    })*/
                    for (var i = 0; i < that.gV.selectPurchaseHTFunds.length; i++) {
                        if (that.gV.selectPurchaseHTFunds[i].fundCode != fundCode) {
                            newArr.push(that.gV.selectPurchaseHTFunds[i])
                        }
                    }
                    that.gV.selectPurchaseHTFunds = newArr
                    $(this).parent().attr("checkStatus", "false")

                }


                console.log("8888", status)
            }, {
                'htmdEvt': 'fundAccountDiagnosisResult_11'
            })
        },



    };
    fundAccountDiagnosisResult.init();
});