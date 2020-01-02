/*
 * @page: 基金诊断
 * @Author: songxiaoyu
 * @Date:   2019-08-09 11:54:51
 * @Last Modified by:   songxiaoyu
 * @description:
 */
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayer.js');
require('@pathCommonJs/components/elasticLayerTypeTwo.js');
require('@pathCommonJs/components/headBarConfig.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
require('@pathCommonJs/components/elasticLayerTypeTwo.js');


$(function() {

    var fundAccountDiagnosis = {
        $e: {
            holdingBox: $('#holdingBox'), // 账户持仓情况
            holdingBoxTemp: $('#holdingBox-template'), // 账户持仓情况模板
            diagnosis:$("#diagnosis-box") //诊断结论
        },
        gV: {
            pageCurrent:1,  // 账户持仓情况分页参数
            pageSize:5,    // 账户持仓情况分页参数
            holdList:[],   // 账户持仓情况
            color:{
                color1:['#FBE2BD','#D69549'],
                color2:['#AA6545','#EDA377'],
                color3:['#182F7A','#7286C1'],
                color4:['#A3C2D3','#D5EFF4'],
                color5:['#E2DBEA','#BEB1DB'],
                color6:['#F1C5B8','#DE9A87'],
                color7:['#B5BBBD','#E1E5E7']
            },
            pie:{        //基金配置比例
               
                pieData: [],
            },
            heavyBar:{   //重仓行业配置
               
                barData: [],
            },
            volumeBar:{  //组合券种分布
               
                barData: [],
            },
            singleaAuthenPath:"", //一键认证路径
            realLi: $('#real-condition>li'),
            tipsWrap:$("#tips-wrap"),


            
        },
        init: function() {
            var that = this;
            that.getHoldData();  //账户持仓详情
            that.getPieData()   //基金配置比例详情
            that.getAssetData()  //资产配置比例
            that.getHeavyData()  // 重仓行业配置
            that.getVolumeData()  // 组合券种分布
            that.getAccountStyleData()  // 账户风格
            that.getDiagnosisData()  // 诊断结论
            // that.drawCircle();
            //that.drawBar()

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
                            window.location.href = site_url.applyHistory_url
                              
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
        getHoldData: function(t) {
            var that = this;
            var obj = [{
                url: site_url.accountHoldShareDetail_api, //1
                data: {
                    "pageCurrent": that.gV.pageCurrent,
                    "pageSize": that.gV.pageSize,

                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    var data = json.data.holdShareList;
                    if(!json.data){
                        window.location.href = site_url.noAccountHoldShare_url
                    }else{
                        if(json.data.holdShareList.length==0){
                            window.location.href = site_url.noAccountHoldShare_url
                        }
                    }
                       $("#holdingBox").html("")
                      // 将列表插入到页面上
                      generateTemplate(data, that.$e.holdingBox, that.$e.holdingBoxTemp);
                    
                },
                callbackNoData:function(){
                    window.location.href = site_url.noAccountHoldShare_url
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                    window.location.href = site_url.noAccountHoldShare_url
                }
            }]
            $.ajaxLoading(obj);
        },
        getPieData: function(t) {
            var that = this;
            var obj = [{
                url: site_url.fundConfigRatioDetail_api, //1
                data: {
                
                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    var data = json.data;
                    that.gV.pie.pieData = []
                    if(!!data.stockRatio&&Number(data.stockRatio)!=0){
                        that.gV.pie.pieData.push({name: '股票型',value:(Number( data.stockRatio)*100).toFixed(2),itemStyle:that.getPieColor('stockRatio'),})
                    }
                    if(!!data.mixRatio&&Number(data.mixRatio)!=0){
                        that.gV.pie.pieData.push({name: '混合型',value:(Number( data.mixRatio)*100).toFixed(2),itemStyle:that.getPieColor('mixRatio'),})
                    }
                    if(!!data.bondRatio&&Number(data.bondRatio)!=0){
                        that.gV.pie.pieData.push({name: '债券型',value:(Number (data.bondRatio)*100).toFixed(2),itemStyle:that.getPieColor('bondRatio'),})
                    }
                    if(!!data.breakEvenRatio&&Number(data.breakEvenRatio)!=0){
                        that.gV.pie.pieData.push({name: '保本型',value:(Number(data.breakEvenRatio)*100).toFixed(2),itemStyle:that.getPieColor('breakEvenRatio'),})
                    }
                    if(!!data.goodsRatio&&Number(data.goodsRatio)!=0){
                        that.gV.pie.pieData.push({name: '商品型',value:(Number (data.goodsRatio)*100).toFixed(2),itemStyle:that.getPieColor('goodsRatio'),})
                    }
                    if(!!data.alternativeInvestRatio&&Number(data.alternativeInvestRatio)!=0){
                        that.gV.pie.pieData.push({name: '投资型',value:(Number (data.alternativeInvestRatio)*100).toFixed(2),itemStyle:that.getPieColor('alternativeInvestRatio'),})
                    }
                    if(!!data.currencyRatio&&Number(data.currencyRatio)!=0){
                        that.gV.pie.pieData.push({name: '市场型',value:(Number (data.currencyRatio)*100).toFixed(2),itemStyle:that.getPieColor('currencyRatio'),})
                    }
                   
                   that.drawCircle()
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        getAssetData: function(t) {
            var that = this;
            var obj = [{
                url: site_url.assetConfigRatioDetail_api, //1
                data: {
                
                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    if(json.status == '0000'){
                        var data = json.data;
                        $("#assets-box .stockAssetRatio .num").html(Number(data.stockAssetRatio).toFixed(2) + '%')
                        $("#assets-box .cashAssetRatio .num").html(Number(data.cashAssetRatio).toFixed(2) + '%')
                        $("#assets-box .bondAssetRatio .num").html(Number(data.bondAssetRatio).toFixed(2) + '%')
                        $("#assets-box .otherAssetRatio .num").html(Number(data.otherAssetRatio).toFixed(2) + '%')
                        var assets_width = $("#assets-box").width();
                        var arr = [
                            {key:'stockAssetRatio',val:Number(data.stockAssetRatio)/110*assets_width},
                            {key:'cashAssetRatio',val:Number(data.cashAssetRatio)/110*assets_width},
                            {key:'bondAssetRatio',val:Number(data.bondAssetRatio)/110*assets_width},
                            {key:'otherAssetRatio',val:Number(data.otherAssetRatio)/110*assets_width},
                        ] 
                         var newArr = arr.sort(that.compare('val'));
                         var num = 0;
                         newArr.forEach(function(item){
                             if(item.val<45){
                                 var chaNum = item.val -45;
                                 num = num + chaNum
                                 item.val = 45;
                             }
                         })
                         newArr[newArr.length - 1].val = newArr[newArr.length - 1].val + num;
                         console.log("898",newArr)

                         newArr.forEach(function(item){
                             var type = item.key;
                             if(type == "stockAssetRatio"){
                                $("#assets-box .stockAssetRatio").css({'width':item.val+ 'px'});
                                $("#assets-box .stockAssetRatio .shape").css({'width':item.val + 'px',
                                'background':'linear-gradient(to left,'+ that.gV.color.color1[0] + ',' + that.gV.color.color1[1] + ')'});
                             }else if(type == "cashAssetRatio"){
                                $("#assets-box .cashAssetRatio").css({'width':item.val+ 'px'});
                                $("#assets-box .cashAssetRatio .shape").css({'width':item.val + 'px',
                                'background':'linear-gradient(to left,'+ that.gV.color.color2[0] + ',' + that.gV.color.color2[1] + ')'});
                             }else if(type == "bondAssetRatio"){
                                $("#assets-box .bondAssetRatio").css({'width':item.val+ 'px'});
                                $("#assets-box .bondAssetRatio .shape").css({'width':item + 'px',
                                'background':'linear-gradient(to left,'+ that.gV.color.color3[0] + ',' + that.gV.color.color3[1] + ')'});
                             }else if(type == "otherAssetRatio"){
                                $("#assets-box .otherAssetRatio").css({'width':item.val+ 'px'});
                                $("#assets-box .otherAssetRatio .shape").css({'width':item.val + 'px',
                                'background':'linear-gradient(to left,'+ that.gV.color.color4[0] + ',' + that.gV.color.color4[1] + ')'});
                             }
                         })

                    //    $("#assets-box .stockAssetRatio").css({'width':Number(data.stockAssetRatio)/100*assets_width+ 'px'});
                     //   $("#assets-box .cashAssetRatio").css({'width':Number(data.cashAssetRatio)/100*assets_width + 'px'});
                     //   $("#assets-box .bondAssetRatio").css({'width':Number(data.bondAssetRatio)/100*assets_width + 'px'});
                    //    $("#assets-box .otherAssetRatio").css({'width':Number(data.otherAssetRatio)/100*assets_width+ 'px'});

                    //    $("#assets-box .stockAssetRatio .shape").css({'width':Number(data.stockAssetRatio)/100*assets_width + 'px',
                    //    'background':'linear-gradient(to left,'+ that.gV.color.color1[0] + ',' + that.gV.color.color1[1] + ')'});
                    //    $("#assets-box .cashAssetRatio .shape").css({'width':Number(data.cashAssetRatio)/100*assets_width + 'px',
                    //    'background':'linear-gradient(to left,'+ that.gV.color.color2[0] + ',' + that.gV.color.color2[1] + ')'});
                    //    $("#assets-box .bondAssetRatio .shape").css({'width':Number(data.bondAssetRatio)/100*assets_width + 'px',
                    //    'background':'linear-gradient(to left,'+ that.gV.color.color3[0] + ',' + that.gV.color.color3[1] + ')'});
                    //    $("#assets-box .otherAssetRatio .shape").css({'width':Number(data.otherAssetRatio)/100*assets_width + 'px',
                    //    'background':'linear-gradient(to left,'+ that.gV.color.color4[0] + ',' + that.gV.color.color4[1] + ')'});


                        // $("#assets-box .stockAssetRatio .shape").css({'width':Number(data.stockAssetRatio)/100*assets_width + 'px',
                        // 'background':'#FBE2BD'});
                        // $("#assets-box .cashAssetRatio .shape").css({'width':Number(data.cashAssetRatio)/100*assets_width + 'px',
                        // 'background':'linear-gradient(to left,#FBE2BD,#D69549)'});
                        // $("#assets-box .bondAssetRatio .shape").css({'width':Number(data.bondAssetRatio)/100*assets_width + 'px',
                        // 'background':'linear-gradient(to left,#FBE2BD,#D69549)'});
                        // $("#assets-box .otherAssetRatio .shape").css({'width':Number(data.otherAssetRatio)/100*assets_width + 'px',
                        // 'background':'linear-gradient(to left,#FBE2BD,#D69549)'});
                    }
                    
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        compare:function(property){
            var that = this;
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        },
        getHeavyData: function(t) {
            var that = this;
            var obj = [{
                url: site_url.heavyIndustryConfigRatioDetail_api, //1
                data: {

                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    var data = json.data.industryConfigRatioList;
                   // that.gV.heavyBar.barData = data;
                   var newData = [];
                   data.forEach(function(item){
                       if(Number(item.industryNavRatio)>0){
                           item.industryNavRatio =( Number (item.industryNavRatio)*100).toFixed(2);
                           newData.push(item)
                       }
                   })
                   that.gV.heavyBar.barData = newData
                    that.drawBar(newData,"heavy-warehouse-box");
                    
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        getVolumeData: function(t) {
            var that = this;
            var obj = [{
                url: site_url.bondTypeAndValue_api, //1
                data: {

                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    var data = json.data;
                    var newData = [
                        //{"industryName":"同业存单比例","industryNavRatio":data.cdsRatio},
                        //{"industryName":"中期票据比例","industryNavRatio":data.mtnValueRatio},
                        //{"industryName":"短期融资券比例","industryNavRatio":data.cpValueRatio},
                        //{"industryName":"央行票据比例","industryNavRatio":data.ctrBankBillRatio},
                        //{"industryName":"企债比例","industryNavRatio":data.corpBondRatio},
                        //{"industryName":"可转债比例","industryNavRatio":data.covertBondRatio},
                        //{"industryName":"金融债比例","industryNavRatio":data.finanBondRatio},
                        //{"industryName":"国债比例","industryNavRatio":data.govBondRatio}
                    ]
                    if(Number(data.cdsRatio)>0){
                        newData.push({"industryName":"同业存单比例","industryNavRatio":(Number(data.cdsRatio)*100).toFixed(2)})
                    }
                    if(Number(data.mtnValueRatio)>0){
                        newData.push({"industryName":"中期票据比例","industryNavRatio":(Number(data.mtnValueRatio)*100).toFixed(2)})
                    }
                    if(Number(data.cpValueRatio)>0){
                        newData.push({"industryName":"短期融资券比例","industryNavRatio":(Number(data.cpValueRatio)*100).toFixed(2)})
                    }
                    if(Number(data.ctrBankBillRatio)>0){
                        newData.push({"industryName":"央行票据比例","industryNavRatio":(Number(data.ctrBankBillRatio)*100).toFixed(2)})
                    }
                    if(Number(data.corpBondRatio)>0){
                        newData.push({"industryName":"企债比例","industryNavRatio":(Number(data.corpBondRatio)*100).toFixed(2)})
                    }
                    if(Number(data.covertBondRatio)>0){
                        newData.push({"industryName":"可转债比例","industryNavRatio":(Number(data.covertBondRatio)*100).toFixed(2)})
                    }
                    if(Number(data.finanBondRatio)>0){
                        newData.push({"industryName":"金融债比例","industryNavRatio":(Number(data.finanBondRatio)*100).toFixed(2)})
                    }
                    if(Number(data.govBondRatio)>0){
                        newData.push({"industryName":"国债比例","industryNavRatio":(Number(data.govBondRatio)*100).toFixed(2)})
                    }
                   
                    that.drawBar(newData,"volume-distribution-box")
                    
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }];
            $.ajaxLoading(obj);
        },
        getAccountStyleData: function(t) {
            var that = this;
            var obj = [{
                url: site_url.diagnosisAccountStyle_api, 
                data: {

                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    var data = json.data;
                    $(".fl1").html(data[1]);
                    $(".fl2").html(data[2]);
                    $(".fl3").html(data[3]);
                    $(".fl4").html(data[4]);
                    $(".fl5").html(data[5]);
                    $(".fl6").html(data[6]);
                    $(".fl7").html(data[7]);
                    $(".fl8").html(data[8]);
                    $(".fl9").html(data[9]);
                    
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        getDiagnosisData: function(t) {
            var that = this;
            var obj = [{
                url: site_url.diagnoseResult_api, //1
                data: {

                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    var data = json.data;
                    var fundStyle = data.fundStyle;    //账户风格
                    var fundType = data.fundType;      //基金风格
                    var assetConfig = data.assetConfig;  //资产配置比例
                    var heavyIndustry = data.heavyIndustry;  //重仓行业
                    var bondIndustry = data.bondIndustry;  //债券类型
                    var str = "";
                    if(!!fundStyle){
                        str = str + "当前账户风格为"+fundStyle + ","
                    }
                    if(!!fundType){
                        str = str +"配置"+fundType+"型基金较多,"
                    }
                    if(!!assetConfig){
                        str = str + assetConfig +"仓位较高,"
                    }
                    if(!!heavyIndustry){
                        str = str + "重仓行业为"+heavyIndustry +","
                    }
                    if(!!bondIndustry){
                        str = str + '债券中'+ bondIndustry +'占比较多。'
                    }
                    //var star = "当前账户风格为'fundStyle'，配置‘fundType’型基金较多，‘assetConfig’仓位较高，重仓行业为‘heavyIndustry’，债券中‘bondStyle’占比较多"
                    that.$e.diagnosis.html(str)
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        events: function() {
            var that = this;
            mui("body").on("mdClick", ".account-holdings .down", function() {
                if($(this).hasClass('up')){
                    $(this).removeClass('up')
                    that.gV.pageSize = 5
                }else{
                    $(this).addClass('up')
                    that.gV.pageSize = 100000
                }
               
                that.getHoldData();
            },{
                'htmdEvt': 'fundAccountDiagnosis_01'
            });


            // 获取专属报告
            mui("body").on("mdClick", ".btnBottom", function() {
                that.getReport();
            },{
                'htmdEvt': 'fundAccountDiagnosis_02'
            });

            mui("body").on('mdClick','.content .getReport',function(){
                that.getConditionsOfOrder();
            });
            
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
        //给饼图付渐变色
        getPieColor(val){
            var itemStyle = { 
                normal: {
                    color: {
                        colorStops: [],
                        global: false,
                        type: "linear",
                        x: 0,
                        x2: 1,
                        y: 0,
                        y2: 1
                    }
                }
            }
            if(val == 'stockRatio'){
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#fadeb7" })
                itemStyle.normal.color.colorStops.push({offset: 0.5,color: "#eabe87" })
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#d7964b" })
                return itemStyle;
            };
            if(val == 'mixRatio'){
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#ca835d" })
                itemStyle.normal.color.colorStops.push({offset: 0.5,color: "#c57e59" })
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#c8815c" })
                return itemStyle;
            }
            if(val == 'bondRatio'){
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#374d92" })
                itemStyle.normal.color.colorStops.push({offset: 0.5,color: "#445a9d" })
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#5267a8" })
                return itemStyle;
            }
            if(val == 'breakEvenRatio'){
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#c8e4eb" })
                itemStyle.normal.color.colorStops.push({offset: 0.5,color: "#b6d3e0" })
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#a9c8d7" })
                return itemStyle;
            }
            if(val == 'goodsRatio'){
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#bfb3db" })
                itemStyle.normal.color.colorStops.push({offset: 0.5,color: "#c8bddf" })
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#d1c7e3" })
                return itemStyle;
            }
            if(val == 'alternativeInvestRatio'){
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#e8af9f" })
                itemStyle.normal.color.colorStops.push({offset: 0.5,color: "#ebb8a9" })
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#f0c1b4" })
                return itemStyle;
            }
            if(val == 'currencyRatio'){
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#bfc4c6" })
                itemStyle.normal.color.colorStops.push({offset: 0.5,color: "#c9ced0" })
                itemStyle.normal.color.colorStops.push({offset: 0,color: "#dce1e3" })
                return itemStyle;
            }
        },
        drawCircle() {
            var that = this;
            var pieChart = echarts.init(document.getElementById('allocation-pie'));
            var optionData = []
            var pieData = that.gV.pie.pieData
            console.log("pieData",pieData)
            pieData.forEach(n => {
                optionData.push(n.name)
            })
            // 指定图表的配置项和数据
            option = {
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    data: optionData,
                    icon: "roundRect",
                    itemWidth: 14,  // 设置宽度
                    itemHeight: 8, // 设置高度
                    itemGap: 5,//设置间距
                    textStyle:{
                      fontSize:12,
                      color:"##CA965F"
                    },
                    x: '55%',
                    y: '35%',
                    formatter: function (name) {
                        for (var i = 0; i < pieData.length; i++) {
                            if (name === pieData[i].name) {
                                return " {title|" + name + "}  {value|" + pieData[i].value + "%"+"}"
                            }
                        }
                    },
                    textStyle: {
                        fontSize: 16,
                        rich: {
                            value: {
                                fontSize: 16,
                                fontWeight: 600
                            }
                        }
                    },
                    selectedMode:false,
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['46%', '60%'],
                        center: ['30%', '47%'],
                        avoidLabelOverlap: false,
                        hoverAnimation: false,
                        label: {
                            normal: {
                                show: false, //去掉引导线
                                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                backgroundColor: '#eee',
                                borderColor: '#aaa',
                                borderWidth: 1,
                                borderRadius: 4,
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 16,
                                        lineHeight: 33
                                    },
                                    per: {
                                        color: '#eee',
                                        backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:pieData
                    }
                ]
            };
            // 绘制图表
            pieChart.setOption(option);
        },

        drawBar(data,listBoxId){
            var that = this;
            var barBoxContent = echarts.init(document.getElementById(listBoxId));
            var optionData = [];
            var barData = [];
            data.forEach(function(item){
                optionData.push(item.industryName)
            });
            data.forEach(function(item){
                barData.push(item.industryNavRatio)
            })
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter:'{c}%'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: ["0", "100%"],
                    axisTick:{show:false},
                    axisLabel:{
                        formatter:(val)=>{
                            if(val!=0){
                                return val +"%"
                            }
                           
                        }
                    }
                },
                yAxis: {
                    type: 'category',
                    data: optionData,
                    axisTick:{show:false}
                },
                series: [
                    {
                        name: '2011年',
                        type: 'bar',
                        data: barData,
                        itemStyle:{
                            normal:{
                                color:function(params){
                                    var colorList = [ '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B','#FE8463','#3232CD','#238e68'];
                                    return colorList[params.dataIndex]
                                },
                                label:{
                                    show:false,
                                    position:'right',
                                    formatter:'{b}\n{c}%'
                                },
                                barBorderRadius:"10px"
                            }
                        },
                        barGap:"40%"
                    }
                ]
            };
            barBoxContent.setOption(option)
        }
    };
    fundAccountDiagnosis.init();
});