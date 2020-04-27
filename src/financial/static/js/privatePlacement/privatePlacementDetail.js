/*
//  私募基金产品详情
//  @author zhangyanping 2019-11-25

    update:chentiancheng 2020-01-08
    删除司法冻结文案

    updata :caoqihai 2020-1-8
    身份证过期  不弹出弹窗 直接到原生
    that.$e.realLi.eq(2).find(".tips-li-right").attr("conditionjump")!=8&&that.$e.realLi.eq(2).find(".tips-li-right").attr("conditiontype")!=3

*/

require('@pathCommonBase/base.js');

// require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');

// require('@pathCommonJsCom/headBarConfig.js');
var goBack = require('@pathCommonJsCom/goBack.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
//引入弹出层
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js');
var privateAuthenticationProcess = require('@pathCommonCom/authenticationProcess/privateAuthenticationProcess.js');
var moment = require('moment');

$(function() {
    var privatePlacementDetail = {
        //获取页面元素
        $e: {
            projectId: splitUrl['projectId'],
            adjustmentTemp: $('#wrap-template'), // 最新调仓模板
            conditionTemplate: $('#condition-template'), // 最新调仓模板
            VideoListTemplate:$("#VideoList-template"),//视频模板
            realLi: $('#real-condition>li'), // 条件下的五条
            lineType: '',
        },
        getElements: {
            name: $('#name'), //公募账户名
            number: $('#number'), //账号
            linenum: $('#linenum'), //行号
            openingBank: $("#openingBank"), //开户行
            topc: $('#topc'), //提示信息
            tipIcon: $(".tipIcon"), //净值披露信息
            isElecContract: '', //是否是电子合同产品【0.否 1.是】
            unitNetValueDes: '每周五24:00前更新上周净值',
            productNameTip:'',
            reourceData:true,   //标签内容
            collectAccountFlag:true,    //标签募集账号
            symboltype:'none',    //echarts 节点样式
            priceLimitArr: {}, //保存各个时段涨跌幅数据
        },
        data: {
            canClick: true,
            custType: "", //客户类型
            fundDetailObj: "", //详情接口拿到的对象
            buyFreeze: "", //是否买入冻结
            productName: "", //产品名称
            isRiskEndure: '', // 是否风险测评 0-否 1-是
            endurePubIsold: '', // 公募风险评测是否过期 0:否 1:是
            endurePriIsold: '', // 私募风险测评是否过期0:否 1:是
            isSatisfied:'',  //0 （开启策略限制并不满足） 1 （未开启策略限制或开启策略限制并满足）
            isOpenWealth:"1",//是否开通财富账户。0未开通，1已开通
            productRiskLevel:"",//产品等级
            riskRank:"",//用户等级
            qrnhWfsy: {
                oneMonth: {},
                threeMonth: {},
                halfYear: {},
                oneYear: {},
                sinceNow: {}
            },
            dwjzljjz: {
                oneMonth: {},
                threeMonth: {},
                halfYear: {},
                oneYear: {},
                sinceNow: {}
            },
            incomeModeJF: 0 // 0固收 1浮收普通 2浮收稳裕
        },

        //页面初始化函数
        init: function() {

            var that = this;

            that.getData();
            // 查询产品亮点
            that.queryProductImage();
            that.queryProjectVedioList();
            that.events();
        },
        getData: function() {
            var that = this;
            // 获取私募产品基本信息
            var obj = [{
                url: site_url.queryFundDetailV2_api,
                data: {
                    projectId: that.$e.projectId,
                    // projectId:"35940",
                },
                contentTypeSearch: true,
                needLogin: true,
                callbackDone: function(json) {
                    var jsonData = json.data;
                    that.data.fundDetailObj = jsonData;
                    var projectLableHtml, projectLableHtmlList;
                    var businessCompareReferenceMin = jsonData.businessCompareReferenceMin,
                        businessCompareReferenceMax = jsonData.businessCompareReferenceMax;
                    // 根据收益分配方式区分 0固收 1浮收普通 2浮收稳裕
                    console.log(that.data.incomeModeJF,jsonData.incomeModeJF)
                    that.data.incomeModeJF = jsonData.incomeModeJF;
                    that.data.productRiskLevel = jsonData.productRiskLevel
                    //用户等级不匹配 防止接口加载缓慢数据无返回就判断，加上超时调用方法  riskRank风测过期接口返回为6,无法拦截
                    setTimeout(function(){
                        if((that.data.riskRank<that.data.productRiskLevel)||that.data.riskRank == '6'){
                            var obj = {
                                title: '提示',
                                id: 'tipIcon',
                                p: '<p>您的风险测评等级与该产品风险等级不匹配，请您查看与您风险测评等级相匹配的产品</p><p>如果您近期个人信息已发生变化，请您根据实际情况重新测评</p>',
                                yesTxt: '重新测评',
                                celTxt: '其他产品',
                                hideCelButton: false,
                                zIndex: 100,
                                celIsHide:false,
                                callback: function(t) {
                                    window.location.href = site_url.riskAppraisal_url + '?type=private';
                                },
                                callbackCel: function() {
                                    goBack()
                                }
                            };
                            $.elasticLayer(obj);
                        }
                    },300)
                    //默认隐藏
                    $(".tipIcon").hide()
                    if (jsonData.incomeModeJF == '0') {
                        // 头部不同的展示
                        $('.fixedIncome').removeClass('hide');

                        // 基本信息的展示
                        $('.performanceComparison').removeClass('hide');
                        // $('.lineWrap').addClass('hide');

                        that.queryBenefitLevel();

                        if (Number(businessCompareReferenceMax) <= Number(businessCompareReferenceMin)) {
                            if (businessCompareReferenceMin != '') {
                                $(".fixedIncome .netValue").html(businessCompareReferenceMin + "%");
                            }
                        } else {
                            $(".fixedIncome .netValue").html(businessCompareReferenceMin + "%-" + businessCompareReferenceMax + "%");
                            console.log($(".fixedIncome .netValue").html().length);
                            if($(".fixedIncome .netValue").html().length>7){
                                $(".fixedIncome .netValue").css({"font-size":'0.4rem',"display":"inline-block","margin-top":"0.2rem"})
                            }
                        }
                    } else if (jsonData.incomeModeJF == '1') { //1浮收普通   展示历史业绩走势
                        // 头部不同的展示
                        $('.floatProfit').removeClass('hide');

                        that.$e.lineType = 'wfsy';
                        $('.lineWrap').removeClass('hide');
                        $('.lineWrap .wfsy').removeClass('hide');
                        $('.lineWrap .qrnh').addClass('hide');

                        $("#qrnhLine").addClass("hide");
                        $("#wfsyLine").removeClass("hide");
                        // 涨跌幅
                        $('.priceLimit').removeClass('hide');

                        // 单位净值  跟产品经理确认，这里展示后台返回的数据  产品肖金凤说页面展示的是净值时展示小问号提示按钮
                        $(".tipIcon").show()

                        if (jsonData.unitNetValue == null || jsonData.unitNetValue == "" || jsonData.unitNetValue == undefined || jsonData.unitNetValue == '--') {
                            $('.netValue').html('--')
                        } else {
                            $('.netValue').html(jsonData.unitNetValue);
                        }
                        // 折线图
                        that.getTypeOneData(that.$e.lineType);

                    } else if (jsonData.incomeModeJF == '2') { //2浮收稳裕   展示七日年化
                        // 头部不同的展示
                        $('.floatProfitWy').removeClass('hide');

                        that.$e.lineType = 'qrnh';
                        $('.lineWrap').removeClass('hide');
                        $("#qrnhLine").removeClass("hide");
                        $("#wfsyLine").addClass("hide");
                        // 展示七日年化
                        $('.netValue').html(jsonData.sevenIncomeRate);
                        $('#historyDetailBtn').removeClass('hide');
                        // 折线图
                        that.getTypeTwoData(that.$e.lineType);
                    }
                    that.data.productName = jsonData.productName;
                    // 私募产品 产品名称
                    $('.productNameTip').html(jsonData.productName);
                    // console.log($('.productNameTip').text().length)
                    //判断字符长度大于40  出现弹框
                    if($('.productNameTip').text().length>40){
                        var dataText=jsonData.productName;
                            dataText=dataText.substring(0,40);
                            dataText=dataText+"...";;
                            $('.productNameTip').html(dataText);
                        $(".nameTip").show();
                    }else{
                        $(".nameTip").hide();
                    }
                    // 一句话产品详情
                    $('.introduction').html(jsonData.productLightspot);
                    // 净值日期 非空判断
                    if (jsonData.netValueDate == null || jsonData.netValueDate == "" || jsonData.netValueDate == undefined || jsonData.netValueDate == '--') {
                        $('.netValueDate').html('--');
                    } else {
                        if(jsonData.incomeModeJF == '2'){
                            var now = jsonData.profitThoudDate;
                        }else{
                        var now = moment(jsonData.netValueDate).format('YYYY-MM-DD');
                            now= now.substring(5);
                        }
                        $('.netValueDate').html(now);
                    }
                    // 起投金额
                    $('.investmentAmountNum').html(jsonData.investStart + '万');
                    // 产品期限
                    $('.productDeadlineNum').html(jsonData.projectTerm);
                    // 预约资质
                    if(jsonData.orderCondition && jsonData.orderCondition!='') {
                        $('.appointment span').html(jsonData.orderCondition);
                    } else {
                        $(".appointment").hide();
                    }
                    // 产品特点标签
                    that.getElements.isElecContract = jsonData.isElecContract; // 是否是电子合同产品【0.否 1.是】
                    if (!!jsonData.projectLable) {
                        // var projectLable = jsonData.projectLable;
                        $.each(jsonData.projectLable, function(i, el) {
                            if(el == '关注度高'){
                               projectLableHtml = '<span id="red">' + el + '</span>';
                            }else{
                                projectLableHtml = '<span>' + el + '</span>';
                            }
                            // projectLableHtml = '<span>' + el + '</span>'
                            $('.productLabel').append(projectLableHtml);
                        })
                    }
                    //0 债权投资;1 证券投资（二级市场）;2 股权投资;3 海外投资;4 其他
                    if (jsonData.investDirect == "2" || jsonData.investDirect == "4") { // 债权投资、股权投资、其他服务不展示
                        // that.getElements.tipIcon.hide();
                    } else if (jsonData.investDirect == "0" || jsonData.investDirect == "1" || jsonData.investDirect == "3") { // 海外投资  （证券投资）二级市场展示
                        // that.getElements.tipIcon.show();
                        var productModule = 'netValueCycleAPP';
                        that.queryProductImage(productModule);
                    };


                    // 基本信息
                    // 剩余额度
                    if (jsonData.surplusLevel) {
                        $('.remaining').html(jsonData.surplusLevel+"万");
                    } else {
                        $('.remain').hide();
                    }
                    // 募集起截止日
                    if (jsonData.projectUpTime && jsonData.projectDownTime) {
                        $('.deadline').html(jsonData.projectUpTime + '~' + jsonData.projectDownTime);
                    } else {
                        $('.deadlineMj').hide();
                    }
                    // 管理人
                    if (jsonData.projectIssuer) {
                        $('.custodian .changgeRight').html(jsonData.projectIssuer);
                    } else {
                        $('.custodian').hide();
                    }
                    // 风险等级
                    if(jsonData.productRiskLevelDesc){
                        var startHtml="";
                            //星星
                            for(var i=0;i<jsonData.productRiskLevel;i++){
                                startHtml+="<span class='iconfont starLight'>&#xe639;</span>";
                            }
                            //空白星星
                            for(var j=5;j>jsonData.productRiskLevel;j--){
                                startHtml+="<span class='iconfont starDefault'>&#xe63b;</span>";
                            }
                        $('.riskGrade .changgeRight').html(jsonData.productRiskLevelDesc+startHtml);
                    }else{
                        $('.riskGrade').hide();
                    }
                    // 发行规模
                    if (jsonData.formatIssuanceSize) {
                        $('.issuingScale .changgeRight').html(jsonData.formatIssuanceSize + '万');
                    } else {
                        $('.issuingScale').hide();
                    }
                    // 投资方向
                    if (jsonData.investDirect == '0') {
                        $('.direction .changgeRight').html('债权投资');
                    } else if (jsonData.investDirect == '1') {
                        $('.direction .changgeRight').html('证券投资(二级市场)');
                    } else if (jsonData.investDirect == '2') {
                        $('.direction .changgeRight').html('股权投资');
                    } else if (jsonData.investDirect == '3') {
                        $('.direction .changgeRight').html('海外投资');
                    } else if (jsonData.investDirect == '4') {
                        $('.direction .changgeRight').html('其他');
                    } else {
                        $('.direction').hide();
                    }
                    // 投资领域
                    if (jsonData.investArea) {
                        $('.investmentArea .changgeRight').html(jsonData.investArea);
                    } else {
                        $('.investmentArea').hide();
                    }
                    // 投资方式
                    if (jsonData.investWay) {
                        $('.investmentWay .changgeRight').html(jsonData.investWay);
                    } else {
                        $('.investmentWay').hide();
                    }
                    // 收益分配方式
                    if (jsonData.incomeModeDesc) {
                        $('.incomeType .changgeRight').html(jsonData.incomeModeDesc);
                    } else {
                        $('.incomeType').hide();
                    }


                    // 交易须知
                    if( !jsonData.buyRate && !jsonData.managementFee && !jsonData.trusteeFee){
                        $('.productRateHeader').hide();
                    }else{
                        // 认购费率
                        if (jsonData.buyRate) {
                            $('.productRateBuy span').html(jsonData.buyRate + '%');
                        } else {
                            $('.productRateBuy').hide();
                        }
                        // 管理费率
                        if (jsonData.managementFee) {
                            $('.productRateManage span').html(jsonData.managementFee + '%');
                        } else {
                            $('.productRateManage').hide();
                        }
                        // 托管费率
                        if (jsonData.trusteeFee) {
                            $('.productRateTrust span').html(jsonData.trusteeFee + '%');
                        } else {
                            $('.productRateTrust').hide();
                        }
                    }
                    // 预约递增金额
                    if (jsonData.minBase) {
                        $('.advanceAmount .changgeRight').html(jsonData.minBase + '万');
                    } else {
                        $('.advanceAmount').hide();
                    }
                    // 预约有效天数
                    if (jsonData.reserveEffectDays) {
                        $('.reservationDay .changgeRight').html(jsonData.reserveEffectDays + '天');
                    } else {
                        $('.reservationDay').hide();
                    }
                    // 打款截止日期
                    if (jsonData.projectDownTime) {
                        $('.paymentDeadline .changgeRight').html(jsonData.projectDownTime);
                    } else {
                        $('.paymentDeadline').hide();
                    }
                    // 预计成立日期
                    if (jsonData.setupDate) {
                        $('.establishment .changgeRight').html(jsonData.setupDate);
                    } else {
                        $('.establishment').hide();
                    }
                    // 允许购买客户类型
                    if (jsonData.customerType == 0) {
                        $('.clientType .changgeRight').html('机构');
                    } else if (jsonData.customerType == 1) {
                        $('.clientType .changgeRight').html('个人');
                    } else if (jsonData.customerType == 2) {
                        $('.clientType .changgeRight').html('产品');
                    } else if (jsonData.customerType == 3) {
                        $('.clientType .changgeRight').html('不限');
                    } else {
                        $('.clientType').hide();
                    }
                    // 允许购买客户等级
                    if (jsonData.customerRiskLevelDesc) {
                        $('.clientLevel .changgeRight span').html(jsonData.customerRiskLevelDesc);
                    } else {
                        $('.clientLevel').hide();
                    }
                    // 汇款备注
                    $('.remittance').html('【xxx（姓名）认购（产品）】');
                    // 赎回开放频率
                    if(jsonData.redemptionOpenFrequency){
                        $('.redemptionOpenFrequency .detailText').html(jsonData.redemptionOpenFrequency);
                    }else{
                        $('.redemptionOpenFrequency').hide();
                    }

                    // 立即预约上的认购申购费率
                    $('.buyRate span').html(jsonData.buyRate + '%');

                    // 立即预约按钮展示逻辑
                    switch (jsonData.productStatus) {
                        case "1": //尚未预约，可以预约
                            $(".buyButton").show().html("立即预约");
                            $(".over").hide();
                            break;
                        case "2": //可以预约，但是会告知要联系理财师
                            $(".buyButton").show().html("立即预约");
                            $(".over").hide();
                            break;
                        case "3": //可以预约，但是需要重新风险测评
                            $(".buyButton").show().html("立即预约");
                            $(".over").hide();
                            break;
                        case "4": //产品已售罄
                            $(".over").show().html("已售罄");
                            $(".buyButton").hide();
                            break;
                        case "5": //产品已成立
                            $(".over").show().html("已成立");
                            $(".buyButton").hide();
                            break;
                        case "6": //已预约   产品处于可取消预约状态
                            $(".rightBtn").show();
                            $(".buyButton").hide();
                            break;
                        case "7": //产品未开始
                            $(".over").show().html("未开始");
                            $(".buyButton").hide();
                            break;
                        case "9": //可以预约，风测过期但是需要重新风险测评
                            $(".buyButton").show().html("立即预约");
                            $(".over").hide();
                            break;
                    }
                },
                callbackNoData:function(json){
                }
            }, {
                url: site_url.queryUserAuthInfo_api,
                data: {
                    hmac: "", //预留的加密信息
                    params: {}
                },
                needLogin: true,
                // async: false, //同步
                needDataEmpty: false, //需要判断data是否为空
                callbackDone: function(json) {
                    var jsonData = json.data;
                    that.data.custType = jsonData.accountType; // 客户类型【0.机构 1.个人】
                    that.data.buyFreeze = jsonData.buyFreeze; // 是否冻结买入：0-否；1-是；
                    that.data.lawFreezeStatus = jsonData.lawFreezeStatus; // 是否司法冻结：0-否；1-是；
                    that.data.isRiskEndure = jsonData.isRiskEndure; // 是否风险测评 0-否 1-是
                    that.data.accreditedInvestor = jsonData.accreditedInvestor;   //合格投资者【空-未做过】【0-未通过】【1-已通过】【2-已过期】
                    that.data.riskRank = jsonData.riskRank
                    if (that.data.isRiskEndure == 0) {
                        window.location.href = site_url.riskAppraisal_url + '?type=private';
                    }


                },
            }];
            $.ajaxLoading(obj);

        },
        queryBenefitLevel:function(){
            var that = this;
            var obj = [{
                url: site_url.prvLevel_api,
                data: {
                    projectId: that.$e.projectId,
                },
                contentTypeSearch:true,
                needLogin: true,
                callbackDone: function(json) {
                    var that = this;
                    // 判断业绩比较基准是否有值，有值展示，无值隐藏
                    if(json.data.length == 0){
                        $('.performanceComparison').hide();
                    }else{
                        $.each(json.data, function(i, el) {
                            if (el.benifitUpperLimit == "0" || !el.benifitUpperLimit) {
                                el.bool = false;
                            } else {
                                el.bool = true;
                            }
                        })

                        var tplm = $("#prvLevel").html();
                        var template = Handlebars.compile(tplm);
                        $(".performance").html(template(json.data));
                    }


                },
                callbackNoData: function(json) {
                    // tipAction(json.message);
                    $(".performanceComparison").hide();
                }
            }];
            $.ajaxLoading(obj);

        },
        //视频列表
        queryProjectVedioList:function(){
            var that = this;
            var obj = [{
                url: site_url.queryProjectVedioList_api,
                data: {
                    projectId: that.$e.projectId,
                },
                contentTypeSearch:true,
                needLogin: true,
                callbackDone: function(json) {
                    var tplm = $("#VideoList-template").html();
                    var template = Handlebars.compile(tplm);
                    //排除数据为空数组情况
                    if(json.data.length>0){
                        $(".VideoList").html(template(json.data));
                        $(".firstVideoBox").find(".firstVideo").attr("src",json.data[0].videoCoverUrl)
                        $(".firstVideoBox").find(".firstVideoTitleText").html(json.data[0].videoName)
                        $(".firstVideoBox").find(".firstVideoSpeaker").html(json.data[0].videoSpeaker)
                        $(".firstVideoBox").attr("videoId",json.data[0].videoId)
                        $(".videoOnline").show();
                    }else{
                        $(".videoOnline").hide();
                    }
                   
                },
                callbackNoData: function(json) {
                    // tipAction(json.message);
                    // $(".performanceComparison").hide();
                    $(".videoOnline").hide();
                },
                callbackFail:function(json){
                    $(".videoOnline").hide();
                }
            }];
            $.ajaxLoading(obj);

        },
        //请求七日年化
        getTypeTwoData: function(type, num) {
            var that = this;
            num = num ? num : 3;
            var newData = {
                    sevenIncomeRate: [], //存放折线图七日年化
                    profitThoudDate: [], //存放折线图收益日期
                    profitThoudValue: [] //存放折线图万份收益
                }
                //判断是否已经有数据了，有的话不再请求接口
            if (num == 0 && that.data['qrnhWfsy'].oneMonth.profitThoudDate && that.data['qrnhWfsy'].oneMonth.profitThoudDate.length) {
                //请求的是近一个月的数据
                that.drawLine(type, that.data['qrnhWfsy'].oneMonth);
                return false;
            } else if (num == 1 && that.data['qrnhWfsy'].threeMonth.profitThoudDate && that.data['qrnhWfsy'].threeMonth.profitThoudDate.length) {
                //近三个月
                that.drawLine(type, that.data['qrnhWfsy'].threeMonth);
                return false;
            } else if (num == 2 && that.data['qrnhWfsy'].halfYear.profitThoudDate && that.data['qrnhWfsy'].halfYear.profitThoudDate.length) {
                // 半年
                that.drawLine(type, that.data['qrnhWfsy'].halfYear);
                return false;
            } else if (num == 3 && that.data['qrnhWfsy'].oneYear.profitThoudDate && that.data['qrnhWfsy'].oneYear.profitThoudDate.length) {
                //近一年
                that.drawLine(type, that.data['qrnhWfsy'].oneYear);
                return false;
            } else if (num == 4 && that.data['qrnhWfsy'].sinceNow.profitThoudDate && that.data['qrnhWfsy'].sinceNow.profitThoudDate.length) {
                //成立至今
                that.drawLine(type, that.data['qrnhWfsy'].sinceNow);
                return false;
            }
            //没有数据，请求接口
            var obj = [{
                url: site_url.earningCurve_api,
                data: {
                    projectId: that.$e.projectId,
                    profitRange: num
                },
                needLogin: true,
                callbackDone: function(json) {
                    console.log(json);
                    that.data.echartsClickFlag = false;
                    var jsonData = json.data;
                    //拼数据
                    $.each(jsonData, function(i, el) {
                        newData.sevenIncomeRate.push( el.sevenYearYield);
                        newData.profitThoudDate.push(el.curveDate);
                        newData.profitThoudValue.push(el.incomeUnit);
                    })
                    switch (Number(num)) {
                        case 0:
                            that.data['qrnhWfsy'].oneMonth = newData;
                            break;
                        case 1:
                            that.data['qrnhWfsy'].threeMonth = newData;
                            break;
                        case 2:
                            that.data['qrnhWfsy'].halfYear = newData;
                            break;
                        case 3:
                            that.data['qrnhWfsy'].oneYear = newData;
                            break;
                        case 4:
                            that.data['qrnhWfsy'].sinceNow = newData;
                            break;
                    }
                    that.drawLine(type, newData);
                },
                callbackNoData: function(json) {
                    that.data.echartsClickFlag = false;
                    $("#qrnhLine").addClass("hide");
                    $("#wfsyLine").addClass("hide");
                    $(".noDataHintEcharts").removeClass("hide");
                },
                callbackFail: function(json) {
                    that.data.echartsClickFlag = false;
                    $("#qrnhLine").addClass("hide");
                    $("#wfsyLine").addClass("hide");
                    $(".noDataHintEcharts").removeClass("hide");
                }
            }];
            $.ajaxLoading(obj);
        },
        //请求历史业绩走势
        getTypeOneData: function(type, num) {
            var that = this;
            num = num ? num : 3;
            var newData = {
                sevenIncomeRate: [], //存放折线图历史业绩净值
                profitThoudDate: [], //存放折线图净值日期
            }

            // 当涨跌幅返回空时，隐藏涨跌幅
            if( that.getElements.priceLimitArr[num] == ''){
                $(".priceLimit").addClass("hide");
            } else {
                $(".priceLimit").removeClass("hide");
                $(".priceLimit span").html( that.getElements.priceLimitArr[num] );
            }

            if (num == 0 && that.data['dwjzljjz'].oneMonth.profitThoudDate && that.data['dwjzljjz'].oneMonth.profitThoudDate.length) {
                //请求的是近一个月的数据
                that.drawLine(type, that.data['dwjzljjz'].oneMonth);
                //展示涨跌幅数据
                return false;
            } else if (num == 1 && that.data['dwjzljjz'].threeMonth.profitThoudDate && that.data['dwjzljjz'].threeMonth.profitThoudDate.length) {
                //近三个月
                that.drawLine(type, that.data['dwjzljjz'].threeMonth);
                return false;
            } else if (num == 2 && that.data['dwjzljjz'].halfYear.profitThoudDate && that.data['dwjzljjz'].halfYear.profitThoudDate.length) {
                //近三个月
                that.drawLine(type, that.data['dwjzljjz'].halfYear);
                return false;
            } else if (num == 3 && that.data['dwjzljjz'].oneYear.profitThoudDate && that.data['dwjzljjz'].oneYear.profitThoudDate.length) {
                //近一年
                that.drawLine(type, that.data['dwjzljjz'].oneYear);
                return false;
            } else if (num == 4 && that.data['dwjzljjz'].sinceNow.profitThoudDate && that.data['dwjzljjz'].sinceNow.profitThoudDate.length) {
                //成立至今
                that.drawLine(type, that.data['dwjzljjz'].sinceNow);
                return false;
            }

            //没有数据，请求接口
            var obj = [{
                //url: site_url.prvHisValue_api,
                url: site_url.queryHistoryNetValue_api,
                data: {
                    projectId: splitUrl['projectId'],
                    profitRange: num
                },
                needLogin: true,
                callbackDone: function(json) {
                    var jsonData = json.data;

                    var unitNetChangePercent = jsonData.pageList[0].unitNetChangePercent;

                    //当涨跌幅返回不为空时显示到页面上，为空则隐藏
                    if(unitNetChangePercent == '') {
                        $(".priceLimit").addClass("hide");
                    } else {
                        $(".priceLimit").removeClass("hide");
                        $(".priceLimit span").html(unitNetChangePercent);
                    }

                    //保存各个时段涨跌幅数据
                    that.getElements.priceLimitArr[num] = unitNetChangePercent;

                    //拼数据
                    $.each(jsonData.pageList, function(i, el) {
                        newData.sevenIncomeRate.unshift(el.unitNetValue);
                        newData.profitThoudDate.unshift(el.netValueDate);
                    })
                    // debugger
                    // newData.profitThoudDate=newData.profitThoudDate.reverse()

                    switch (Number(num)) {
                        case 0:
                            that.data['dwjzljjz'].oneMonth = newData;
                            break;
                        case 1:
                            that.data['dwjzljjz'].threeMonth = newData;
                            break;
                        case 2:
                            that.data['dwjzljjz'].halfYear = newData;
                            break;
                        case 3:
                            that.data['dwjzljjz'].oneYear = newData;
                            break;
                        case 4:
                            that.data['dwjzljjz'].sinceNow = newData;
                            break;
                    }

                    that.drawLine(type, newData);
                },
                callbackNoData: function(json) {
                    that.data.echartsClickFlag = false;
                    $("#qrnhLine").addClass("hide");
                    $("#wfsyLine").addClass("hide");
                    $(".noDataHintEcharts").removeClass("hide");
                    // $(".lineWrap").hide();
                },
                callbackFail: function(json) {
                    that.data.echartsClickFlag = false;
                    $("#qrnhLine").addClass("hide");
                    $("#wfsyLine").addClass("hide");
                    $(".noDataHintEcharts").removeClass("hide");
                    // $(".lineWrap").hide();

                }
            }];
            $.ajaxLoading(obj);
        },
        //画折线图
        //type必传
        drawLine: function(type, data) {
            var that = this;
            console.log($('#qrnhLine')[0]);

            //判断有多少数据 只有一个值时 symbol 为circle 多组值时 symbol为 none
            if( data.profitThoudDate.length == 1 ){
                that.getElements.symboltype = 'circle';
            }

            if (type == 'qrnh') {
                //画的是七日年化折线图
                $("#qrnhLine").removeClass("hide");
                $(".noDataHintEcharts").addClass("hide");
                $(".rightTitle").removeClass("hide");
                $(".priceLimit").addClass("hide");
                var chartId = $('#qrnhLine')[0],
                    tooltipUnit = '%',
                    xAxisData = data.profitThoudDate,
                    seriesData = data.sevenIncomeRate;
            } else if (type == 'wfsy') {
                //画的是历史业绩折线图
                $("#wfsyLine").removeClass("hide");
                $(".noDataHintEcharts").addClass("hide");
                var chartId = $('#wfsyLine')[0],
                    tooltipUnit = '',
                    xAxisData = data.profitThoudDate,
                    seriesData = data.sevenIncomeRate;
            }

            var myChart = echarts.init(chartId);
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    formatter: '<p style="font-size:0.36rem;color: #DAB57C;">{c}'+ tooltipUnit +'</p><p style="font-size:0.24rem;color:#4A4A4A">{b}</p>',
                    backgroundColor: 'rgba(218,181,124, 0.1)',
                    // renderMode : 'richText',
                    extraCssText: [7, 15, 15, 15],
                    textStyle: {
                        color: '#FADFBB'
                    },
                    confine: true,
                    axisPointer: {
                        type: 'line',
                        lineStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: '#fff' // 0% 处的颜色
                                }, {
                                    offset: 0.5,
                                    color: '#F1CDA8' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#D2B280' // 0% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    }
                },
                grid: {
                    top: '10%',
                    left: '5%',
                    right: '5%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xAxisData,
                    axisLine: {
                        lineStyle: {
                            color: '#FADFBB',
                            width:0.5 //横网格线粗细
                        }
                    },
                    axisLabel: {
                        show: true,
                        color: '#9B9B9B', //这里用参数代替了
                        margin: 20,
                        padding:[0,14,0,4],
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#FADFBB',
                            width:0.5
                        }
                    },
                    axisLabel: {
                        show: true,
                        color: '#9B9B9B',
                        formatter: '{value}%',
                    },
                    type : 'value',

                    axisLabel: {                   
                        formatter: function (value, index) {  
                            if(type == 'qrnh') {
                                return value.toFixed(4) + '%'; 
                            } else {
                                return value.toFixed(4);      
                            }      
                        },
                        color:"#9B9B9B"
                    }
                },
                series: [{
                    type: 'line',
                    lineStyle: {
                        color: '#FADFBB'
                    },
                    itemStyle: {
                        show: false
                    },
                    symbol: that.getElements.symboltype,
                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: '#F2E3CA' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#fff' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    },
                    data: seriesData
                }]
            });

        },
        // 查询产品亮点
        queryProductImage: function(productModule) {
            var that = this;
            //发送ajax请求
            var obj = [{
                url: site_url.queryProductImage_api,
                data: {
                    projectId: that.$e.projectId,
                    limitNum: '',
                    productModule: productModule,
                },
                needLogin: true, //需要判断是否登陆
                needDataEmpty: true, //需要判断data是否为空
                callbackDone: function(json) { //成功后执行的函数
                    var json = json.data[0];
                    if (productModule == 'netValueCycleAPP') {
                        var features = json.features;
                        if (features) {
                            that.getElements.unitNetValueDes = features;
                        }

                    } else {
                        if (json.imgPath == '' && json.features == '') {
                            $('.lightPointCon').hide();
                        } else {
                            if (!json.imgPath) {
                                if (json.features) {
                                    $(".lightPoint").html(json.features);
                                } else {
                                    return false;
                                }
                            } else {
                                $(".lightPoint img").attr("src", json.imgPath);
                            }
                        }
                    }

                },
                callbackNoData: function(json) {
                    $('.lightPointCon').hide();
                }
            }];
            $.ajaxLoading(obj);
            //懒加载
            $(".lazyload").lazyload();
        },

        // 募集账户信息
        collectAccount: function() {
            var that = this;

            //发送ajax请求
            var obj = [{
                url: site_url.getRaiseInfo_api,
                data: {
                    projectId: that.$e.projectId,
                },
                contentTypeSearch: true,
                needLogin: true, //需要判断是否登陆
                callbackDone: function(json) { //成功后执行的函数

                    //添加数据判断，有的时候才显示
                    json.data.accountName && $('#name').html(json.data.accountName);
                    json.data.account && $('#number').html(json.data.account);
                    json.data.bankName && $('#linenum').html(json.data.bankName);
                    json.data.branchBankName && $('#openingBank').html(json.data.branchBankName);

                    $('#topc').html(json.data.remarks);

                    that.getElements.collectAccountFlag = false;

                },
                callbackNoData: function() {
                    $(".productRateContainer").hide()
                }
            }];
            $.ajaxLoading(obj);

        },
        getJumpUrl: function(v) { //获取跳转链接
            var that = this;
            var jumpUrl = ""; //跳转链接
            if (v.conditionJump == 1) { //跳转到认证中心页面
                jumpUrl = site_url.realName_url;
            } else if (v.conditionJump == 2) { //跳转到完善信息页面
                jumpUrl = site_url.completeInformation_url;
            } else if (v.conditionJump == 3) { //跳转到专项风测页面
                jumpUrl = site_url.riskAppraisal_url + "?type=asset";
            } else if (v.conditionJump == 4) { //跳转到投资者分类申请页面
                jumpUrl = site_url.investorClassification_url+ "?isOpenAcc=" + that.data.isOpenWealth;
            } else if (v.conditionJump == 5) { //跳转到投资者分类结果页页面
                jumpUrl = site_url.investorClassificationResult_url;
            } else if (v.conditionJump == 6) { //跳转到合格投资者申请 页面
                jumpUrl = site_url.chooseQualifiedInvestor_url + "?isOpenAcc=" + that.data.isOpenWealth;
            } else if (v.conditionJump == 7) { //跳转到合格投资者结果页面
                jumpUrl = site_url.qualifiedInvestorResult_url;
            }else if (v.conditionJump == 8) { //信息查看（修改证件有效期）
                jumpUrl = site_url.completeInfoEditModify_url;
            }else if (v.conditionJump == 9) { //跳转到普通风测
                jumpUrl = site_url.riskAppraisal_url + '?type=private';
            }else if(v.conditionJump == 10){//跳转到进身份证上传页面无开户流程
                jumpUrl = site_url.realIdcard_url + "?type=alone";
            }
            else if (v.conditionJump == 11) { //跳转到进身份证上传页面
                jumpUrl = site_url.realIdcard_url;
            } else if (v.conditionJump == 12) { //跳转到人脸识别页面
                jumpUrl = site_url.realFaceCheck_url;
            } else if (v.conditionJump == "13b") { //跳转到线下申请状态页面
                jumpUrl = site_url.realOffline_url;
            } else if (v.conditionJump == 14 || v.conditionJump == "13a") { //跳转到视频双录状态页面
                jumpUrl = site_url.realVideoTranscribe_url + '?type=default';
            }
            return jumpUrl;
        },
        queryReourceListByLabel: function() { //根据标签号查询产品材料
            var that = this;
            var labels = '0,1,2,3,4,5'

            var obj = [{ //根据标签号查询产品材料
                url: site_url.queryReourceListByLabel_api, //根据标签号查询产品材料   queryReourceListByLabel.action
                data: {
                    projectId: that.$e.projectId, // 产品代码
                    labels: labels,
                },
                needLogin: true,
                needDataEmpty: true,
                contentTypeSearch: true,
                async: false,
                callbackDone: function(json) {
                    var jsonData = json.data;

                    // 风险揭示书
                    if (jsonData.fxjss) {
                        jsonData.title = '风险揭示信息';
                        that.processData(jsonData.fxjss);
                        jsonData.displayGrounp = jsonData.fxjss;
                        generateTemplate(jsonData, $(".panel3"), that.$e.adjustmentTemp);
                    }
                    // 产品信息
                    if (jsonData.cpxx) {
                        jsonData.title = '产品介绍信息';
                        that.processData(jsonData.cpxx);
                        jsonData.displayGrounp = jsonData.cpxx;
                        generateTemplate(jsonData, $(".panel3"), that.$e.adjustmentTemp);
                    }
                    // 管理报告
                    if (jsonData.glbg) {
                        jsonData.title = '管理报告';
                        that.processData(jsonData.glbg);
                        jsonData.displayGrounp = jsonData.glbg;
                        generateTemplate(jsonData, $(".panel3"), that.$e.adjustmentTemp);
                    }
                    // 资金分配
                    if (jsonData.zjfp) {
                        jsonData.title = '资金分配';
                        that.processData(jsonData.zjfp);
                        jsonData.displayGrounp = jsonData.zjfp;
                        generateTemplate(jsonData, $(".panel3"), that.$e.adjustmentTemp);
                    }
                    // 重要公告及通知
                    if (jsonData.zyggjtz) {
                        jsonData.title = '重要公告及通知';
                        that.processData(jsonData.zyggjtz);
                        jsonData.displayGrounp = jsonData.zyggjtz;
                        generateTemplate(jsonData, $(".panel3"), that.$e.adjustmentTemp);
                    }
                    // 恒天简报
                    if (jsonData.htjb) {
                        jsonData.title = '恒天简报';
                        that.processData(jsonData.htjb);
                        jsonData.displayGrounp = jsonData.htjb;
                        generateTemplate(jsonData, $(".panel3"), that.$e.adjustmentTemp);
                    }

                    that.getElements.reourceData = false;
                },
                callbackFail: function(json) {
                    //请求失败，
                    //显示错误提示
                    tipAction(json.message);
                    //隐藏loading，调试接口时需要去掉
                    setTimeout(function() {
                        // that.getElements.listLoading.hide();
                    }, 100);
                },
                callbackNoData: function(json) {
                    //没有数据
                    $('.without.noData').show();
                    setTimeout(function() {
                        // that.getElements.listLoading.hide();
                    }, 100);
                }

            }]
            $.ajaxLoading(obj);

        },
        // 处理数据
        processData: function(data) {
            var that = this;

            $.each(data, function(i, el) {
                el.name = el.fileName.substring(1, el.fileName.indexOf("】"));
                el.marName = el.fileName.substring(el.fileName.indexOf("】") + 1);

                if (el.fileName.indexOf(".pdf") != -1) {
                    el.line = true; //线上可预览
                    el.href = site_url.downloadNew_api + "?filePath=" + el.fileUrl + "&fileName=" + new Base64().encode(el.fileName) + "&groupName=" + el.groupName + "&show=1";
                } else {
                    el.line = false; //需下载
                    el.href = site_url.downloadNew_api + "?filePath=" + el.fileUrl + "&fileName=" + new Base64().encode(el.fileName) + "&groupName=" + el.groupName;
                }
            })
            return data;
        },
        //满足条件的后续判断
        nextStep: function() {
            var that = this;
            if (that.data.fundDetailObj.isElecContract == "1") { //电子合同逻辑
                if (that.data.fundDetailObj.isAllowAppend == "1") { //追加商品参数fundCode,
                    //跳转到追加商品链接
                    if (that.data.custType == "1") { //客户类型【0.机构 1.个人】
                        //跳转到电子合同追加页面
                        window.location.href = site_url.orderLimit_url + "?fundCode=" + that.$e.projectId + "&isAllowAppend=" +
                            that.data.fundDetailObj.isAllowAppend + '&isSatisfied=' + that.data.isSatisfied;
                    } else {
                        //跳转到普通预约
                        window.location.href = site_url.registration_url + "?fundCode=" + that.$e.projectId + "&isAllowAppend=" +
                            that.data.fundDetailObj.isAllowAppend;
                    }
                } else { //预约
                    //跳转到预约产品链接
                    if (that.data.custType == "1") { //客户类型【0.机构 1.个人】
                        //跳转到电子合同预约页面
                        window.location.href = site_url.orderLimit_url + "?fundCode=" + that.$e.projectId + "&isAllowAppend=" +
                            that.data.fundDetailObj.isAllowAppend + '&isSatisfied=' + that.data.isSatisfied;
                    } else {
                        //跳转到普通预约
                        window.location.href = site_url.registration_url + "?fundCode=" + that.$e.projectId + "&isAllowAppend=" +
                            that.data.fundDetailObj.isAllowAppend;

                    }
                }
            } else { //非电子合同

                window.location.href = site_url.registration_url + "?fundCode=" + that.$e.projectId + "&isAllowAppend=" +
                    that.data.fundDetailObj.isAllowAppend;

            }
        },

        events: function() {
            var that = this;
            //tab点击切换
            mui("body").on('mdClick', '.tabs>li', function() {
                $(this).addClass('active').siblings().removeClass('active');
                $(".wrap>.panel").eq($(this).index()).addClass('active').siblings().removeClass('active');
                var spanHeight = $('.clientLevel .changgeRight span').height();
                if (spanHeight > 50) {
                    $('.clientLevel .changgeRight').css({
                        lineHeight: '0.5rem'
                    });
                }
                // tab点击切换时请求接口
                if ($(this).index() == 1) {
                    if(that.getElements.collectAccountFlag){
                        // 募集账户信息
                        that.collectAccount();
                    }
                    else{
                        return false;
                    }

                } else if ($(this).index() == 2) {
                    // 获取标签
                    if( that.getElements.reourceData ){
                        that.queryReourceListByLabel();
                    }
                    else{
                        return false;
                    }

                }
            }, {
                htmdEvt: 'privatePlacementDetail_01'
            });
            //折线图点击月份请求数据
            mui("body").on('mdClick', '.lineWrap .time', function() {
                    $('.lineDraw .time').removeClass('active');
                    $(this).addClass('active');
                    if(that.data.incomeModeJF == 1) { // 展示净值走势
                        that.getTypeOneData(that.$e.lineType, $(this).attr('num'));
                    } else if (that.data.incomeModeJF == 2) { // 展示七日年化
                        that.getTypeTwoData(that.$e.lineType, $(this).attr('num'));
                    }
                }, {
                    htmdEvt: 'privatePlacementDetail_02'
                })
                // 募集账户的信息的拷贝
            mui("body").on('mdClick', '.copy_btn', function(event) {
                var $this = $(this);
                var copyText = $this.siblings('div').text()
                    //实例化clipboard
                var clipboard = new Clipboard('.copy_btn', {
                    text: function() {
                        return copyText;
                    }
                });
                clipboard.on("success", function(e) {
                    //text = '';
                    tipAction("复制成功");
                });
                clipboard.on("error", function(e) {
                    tipAction("请选择“拷贝”进行复制!");
                });
                clipboard.onClick(event);

            }, {
                htmdEvt: 'privatePlacementDetail_03'
            });
            // 复制全部
            mui("body").on('mdClick', '.copyAll', function(event) {
                var $this = $(this);
                var copyText = $('#name').text() + $('#number').text() + $('#linenum').text() + $('#openingBank').text();
                //实例化clipboard
                var clipboard = new Clipboard('.copyAll', {
                    text: function() {
                        return copyText;
                    }
                });
                clipboard.on("success", function(e) {
                    //text = '';
                    tipAction("复制成功");
                });
                clipboard.on("error", function(e) {
                    tipAction("请选择“拷贝”进行复制!");
                });
                clipboard.onClick(event);

            }, {
                htmdEvt: 'privatePlacementDetail_04'
            });
            // 历史明细点击跳转
            mui("body").on('mdClick', '#historyDetailBtn', function() {
                // alert(site_url.historyDetail_url + '?projectId=' + that.$e.projectId);
                window.location.href = site_url.historyDetail_url + '?projectId=' + that.$e.projectId;
            }, {
                'htmdEvt': 'privatePlacementDetail_05'
            });

            // 立即预约
            mui("body").on('mdClick', '.buyButton', function() {
                var params = {
                    type: 2,
                    projectId: that.$e.projectId,
                    htmdEvt: "privatePlacementDetail",
                    projectName: that.data.productName,
                    isElecContract: that.data.fundDetailObj.isElecContract,
                    isAllowAppend: that.data.fundDetailObj.isAllowAppend
                }
                privateAuthenticationProcess(params);
            }, {
                htmdEvt: 'privatePlacementDetail_06'
            });
            // 点击产品材料
            mui("body").on('mdClick', '.contentLink', function() {
                var $this = $(this);
                console.log($this.attr('href'));
                window.location.href = $this.attr('href');
            }, {
                'htmdEvt': 'privatePlacementDetail_07'
            });
            mui("body").on('mdClick', '.tipIcon', function() {
                var $this = $(this);
                var obj = {
                    title: '帮助',
                    id: 'tipIcon',
                    p: that.getElements.unitNetValueDes,
                    yesTxt: '知道了',
                    zIndex: 100,
                    hideCelButton: true, //为true时隐藏cel按钮，仅使用yes按钮的所有属性
                    callback: function(t) {

                    },
                };
                $.elasticLayer(obj);
            }, {
                'htmdEvt': 'privatePlacementDetail_08'
            })
              //点击一键预约逻辑
            mui("body").on('mdClick', '.tips-btn', function() {

            },{
                htmdEvt: 'privatePlacementDetail_09'
            });
            //点击查看明细跳转
            mui("body").on('mdClick', '.lookDetailed', function() {
                window.location.href = site_url.tobeConfirmTransaction_url+"?type=toBeConfirmed";//查看明细跳转待确认明细
            },{
                htmdEvt: 'privatePlacementDetail_10'
            });
            // 产品名称
            mui("body").on('mdClick', '.nameTip', function() {
                var $this = $(this);
                var obj = {
                    title: '产品名称',
                    id: 'nameTip',
                    p: that.data.productName,
                    yesTxt: '确认',
                    zIndex: 100,
                    hideCelButton: true, //为true时隐藏cel按钮，仅使用yes按钮的所有属性
                };
                $.elasticLayer(obj);
            },{
                htmdEvt: 'privatePlacementDetail_11'
            })
            //视频
            mui("body").on('mdClick', '.firstVideoBox', function() {
                window.location.href = site_url.privatePlacementDetailJumpVideo_url+"?cid=" + $(this).attr("videoId")              

            },{
                htmdEvt: 'privatePlacementDetail_12'
            });
            //视频列表
            mui("body").on('mdClick', '.VideoListBox', function() {
                window.location.href = site_url.privatePlacementDetailJumpVideo_url+"?cid=" + $(this).attr("videoId")

            },{
                htmdEvt: 'privatePlacementDetail_13'
            });
            
        }
    };
    privatePlacementDetail.init();
});