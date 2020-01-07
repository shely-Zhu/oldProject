/**  
 * @Page:  新发基金
 * @Author: zhangyanping
 * @Date:   2019-12-16
 * 
 */
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var moment = require('moment');

$(function() {
    var newFundDetail = {
        getElements: {
            secuId: '', // 基金编码
            fmcComName: '', //基金公司 
            chiName: '', ///基金中文名称
            fundCode: splitUrl['fundCode'],
            productStatus: splitUrl['productStatus'], // productStatus=0 立即买入按钮可点击 productStatus=1 立即买入按钮置灰不可点击
        },
        gV: {
            singleaAuthenPath: "", //一键认证路径
            realLi: $('#real-condition>li'),
            tipsWrap: $("#tips-wrap"),
            isHighAgeStatus:true,  //投资者年龄默认小于60的状态为true  大于就位false
        },
        init: function() {
            var that = this;
            that.getData();

            that.events();
        },
        getConditionsOfOrder: function() {
            var that = this;

            var obj = [{
                url: site_url.queryCustomerAuthInfo_api,
                data: {
                    fundCode: splitUrl['fundCode'],
                },
                callbackDone: function(json) {
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
                    if (jsonData.isWealthAccount == "0" && jsonData.isRiskEndure == "1" && jsonData.isPerfect == "1" && jsonData.isInvestFavour == "1") {
                        that.gV.realLi.hide();
                        that.gV.tipsWrap.hide();
                        $(".isRiskMatch_mask").show();
                        $(".isRiskMatchBox").show();
                        if(jsonData.isHighAge=="1"&&that.gV.isHighAgeStatus){
                            //年龄校验
                             //that.gV.isHighAgeStatus = false;
                             $(".isRiskMatchBox_match").hide()
                             $(".isRiskMatchBox_noMatch").show()
                             $(".isRiskMatchBox_header").html("您认/申购的基金产品风险等级为成长级/进取级，属中高/高风险产品，投资该产品可能产生较大损失。基于您的年龄情况，我司建议您综合考虑自身的身心承受能力、资金承受能力、风险承受能力及控制能力，审慎选择。")
                             $(".isRiskMatchResult").html("继续购买")
                             $(".isRiskMatchResult").attr("type","isHighAge")
                             return false;
                         }
                         if(jsonData.isZdTaLimit == "1"){
                             //中登校验
                             $(".isRiskMatchBox_match").hide()
                             $(".isRiskMatchBox_noMatch").show()
                             $(".isRiskMatchBox_header").css({"line-height":"1.5rem"})
                             $(".isRiskMatchBox_header").html("检测到您的证件类型无法购买该基金，请选购其他基金")
                             $(".isRiskMatchResult").html("选购其他基金")
                             $(".isRiskMatchResult").attr("type","isZdTaLimit")
                             return false;
                         }
                        if (jsonData.isRiskMatch == "1") {
                            //风险等级匹配
                            $(".isRiskMatchBox_match").show()
                            $(".isRiskMatchBox_noMatch").hide()
                            $(".isRiskMatchBox_header").css({"line-height":"1.5rem"})
                            $(".isRiskMatchBox_header").html("你选择的产品与您现在的风险承受能力相匹配")
                        } else if (jsonData.isRiskMatch == "0") {
                            $(".isRiskMatchBox_noMatch").show()
                            $(".isRiskMatchBox_match").hide()
                            $(".isRiskMatchBox_header").css({"line-height":"1.5rem"})
                            $(".isRiskMatchBox_header").html("你选择的产品与您现在的风险承受能力不相匹配")
                            $(".isRiskMatchResult").html("查看评测结果")
                            $(".isRiskMatchResult").attr("type", "noRisk")
                        } else if (jsonData.isRiskMatch == "2") {
                            $(".isRiskMatchBox_noMatch").show()
                            $(".isRiskMatchBox_match").hide()
                            $(".isRiskMatchBox_header").css({"line-height":"1.5rem"})
                            $(".isRiskMatchBox_header").html("您的风险测评已过期,请重新进行风险测评")
                            $(".isRiskMatchResult").html("重新风测")
                            $(".isRiskMatchResult").attr("type", "repeatRisk")
                        }

                    } else {
                        that.gV.tipsWrap.show()
                        that.gV.realLi.show();

                    }
                    that.gV.singleaAuthenPath = that.getSingleaAuthenPath(jsonData);
                    if (jsonData.isWealthAccount == "1") {
                        //是否开通财富账户
                        that.gV.realLi.eq(0).show()
                    } else {
                        that.gV.realLi.eq(0).hide()
                    }
                    if (jsonData.isRiskEndure == "0" || jsonData.isRiskEndure == null) {
                        //是否风测
                        that.gV.realLi.eq(1).show()
                    } else {
                        that.gV.realLi.eq(1).hide()
                    }
                    if (jsonData.isPerfect == "0" || jsonData.isPerfect == null) {
                        //是否完善资料
                        that.gV.realLi.eq(2).show()
                    } else {
                        that.gV.realLi.eq(2).hide()
                    }
                    if (jsonData.isInvestFavour == "0" || jsonData.isInvestFavour == null) {
                        //是否投资者分类
                        that.gV.realLi.eq(3).show()
                    } else {
                        that.gV.realLi.eq(3).hide()
                    }
                    if (jsonData.isRiskMatch == "0" || jsonData.isRiskMatch == null) {
                        //是否风险等级
                        that.gV.realLi.eq(4).show()
                    } else {
                        that.gV.realLi.eq(4).hide()
                    }
                    that.gV.realLi.eq(4).hide()

                }
            }];
            $.ajaxLoading(obj);
        },
        getSingleaAuthenPath: function(data) {
            var that = this;
            var singleaAuthenPath = "";
            if (data.isWealthAccount == "1") {
                return singleaAuthenPath = "isWealthAccount"
            } else if (data.isRiskEndure != "1") {
                return singleaAuthenPath = "isRiskEndure"
            } else if (data.isPerfect != "1") {
                return singleaAuthenPath = "isPerfect"
            } else if (data.isInvestFavour != "1") {
                return singleaAuthenPath = 'isInvestFavour'
            }
        },
        getData: function() {
            var that = this;
            // 请求页面数据
            var obj = [{
                url: site_url.newfundDetails_api,
                data: {
                    fundCode: that.getElements.fundCode,
                },
                callbackDone: function(json) {
                    var jsonData = json.data;
                    //当前时间
                    var nowDate = new Date();
                    var endDate = new Date(jsonData.issEndDt);
                    var totalSeconds = parseInt((endDate - nowDate) / 1000); // 当前时间与募集截止日的日期相比
                    var issBgnDt = new Date(jsonData.issBgnDt);
                    var timeDiff = parseInt((issBgnDt - nowDate) / 1000); // 当前时间与募集起始日的日期相比
                    // 基金简称 + 基金编码
                    $("#HeadBarpathName").html("<span>" + jsonData.secuSht + "</span>" + "</br><span class='secuId'>" + jsonData.trdCode + "</span>");
                    // that.setHeadLineHeight()
                    // 认购期
                    $('.subscriptionDate').html(jsonData.issBgnDt + '-' + jsonData.issEndDt);
                    // 新发基金倒计时

                    if (totalSeconds > 0) {
                        that.TimeDown(jsonData.issEndDt);
                        that.getElements.productStatus = 0;
                    } else if (totalSeconds <= 0 && jsonData.issBgnDt || timeDiff > 0) {
                        $('.subscriptionTime').html('<span>00</span>天<span>00</span>小时<span>00</span>分<span>00</span>秒');
                        $('.buyButton').attr("disabled", true).addClass('disable');
                    }
                    // 认购流程的募集期
                    $('.collectDate').html(jsonData.issEndDt.substring(5));
                    // 购买费率
                    $('.purchaseRate').html(jsonData.purchaseRate + '%');
                    $('.discountRate').html(jsonData.discountRate / 100 + '%');
                    // 认购起点
                    $(".buyStart").html(jsonData.tradeLimitList[0].minValue);

                    that.getElements.secuId = jsonData.secuId;
                    // 基金经理
                    $('.fundManagerTxt').html(jsonData.fundManager);
                    // 基金公司
                    $('.fundCompanyTxt').html(jsonData.fmcComName);
                    that.getElements.fmcComId = jsonData.fmcComId;

                    // if(that.getElements.productStatus == 1){
                    //  $('.buyButton').attr("disabled", true).addClass('disable'); 
                    // }
                    that.getElements.chiName = jsonData.chiName;
                },
                callbackFail: function(json) {
                    tipAction(json.message);
                },
                callbackNoData: function(json) {
                    $('.subscriptionTime').html('<span>00</span>天<span>00</span>小时<span>00</span>分<span>00</span>秒');
                },
            }]
            $.ajaxLoading(obj);
        },
        TimeDown: function(endDateStr) {
            var that = this;
            var endDate = new Date(endDateStr);
            //当前时间
            var nowDate = new Date();
            //相差的总秒数
            var totalSeconds = parseInt((endDate - nowDate) / 1000);
            //天数
            var days = Math.floor(totalSeconds / (60 * 60 * 24));
            //取模（余数）
            var modulo = totalSeconds % (60 * 60 * 24);
            //小时数
            var hours = Math.floor(modulo / (60 * 60));
            modulo = modulo % (60 * 60);
            //分钟
            var minutes = Math.floor(modulo / 60);
            //秒
            var seconds = modulo % 60;

            setTimeout(function() {
                that.TimeDown(endDateStr);
            }, 1000)

            $('.subscriptionTime').html('<span>' + days + '</span>天<span>' + hours + '</span>小时<span>' + minutes + '</span>分<span>' + seconds + '</span>秒')
        },
        setHeadLineHeight: function() {
            if ($("#HeadBarpathName").height() <= $(".backBtn").height()) {
                $("#HeadBarpathName").removeClass("doubleLines").addClass("singleLine")
            } else {
                $("#HeadBarpathName").removeClass("singleLine").addClass("doubleLines")
            }
        },
        events: function() {
            var that = this;
            // 基金档案
            mui("body").on('mdClick', ".fundFile", function(e) {
                window.location.href = site_url.pofFundFile_url + '?secuId=' + that.getElements.secuId + '&fundCode=' + that.getElements.fundCode;
            }, {
                htmdEvt: 'newFundDetail_0'
            });

            // 基金经理
            mui("body").on('mdClick', ".fundManager", function(e) {
                window.location.href = site_url.pofFundManager_url + '?fundCode=' + that.getElements.fundCode;
            }, {
                htmdEvt: 'newFundDetail_1'
            });

            // 基金公司
            mui("body").on('mdClick', ".fundCompany", function(e) {
                window.location.href = site_url.pofFundCompany_url + '?fundComId=' + that.getElements.fmcComId;
            }, {
                htmdEvt: 'newFundDetail_2'
            });

            // 买入
            mui("body").on('mdClick', ".buyButton", function(e) {
                var $this = $(this);
                if ($this.hasClass("disable")) {
                    return false;
                } else {

                    that.getConditionsOfOrder();
                }

            }, {
                htmdEvt: 'newFundDetail_3'
            });

            //风测等级匹配成功
            mui("body").on('mdClick', ".isRiskMatchBox_match", function() {
                $(".isRiskMatch_mask").hide();
                $(".isRiskMatchBox").hide();
                window.location.href = site_url.fundTransformIn_url + '?fundCode=' + that.getElements.fundCode + '&fundName=' + that.getElements.chiName+"&noReload=1";
            }, {
                htmdEvt: 'newFundDetail_4'
            })

            //风险等级匹配失败
            mui("body").on("mdClick", ".isRiskMatchBox_cancel", function() {
                $(".isRiskMatch_mask").hide();
                $(".isRiskMatchBox").hide();
                // that.gV.isRiskMatchBox.hide();
            }, {
                htmdEvt: 'newFundDetail_5'
            })

            //风险等级匹配失败结果跳转
            mui("body").on("mdClick", ".isRiskMatchResult", function() {
                $(".isRiskMatch_mask").hide();
                $(".isRiskMatchBox").hide();
                var type = $(this).attr("type");
                if (type == "noRisk") {
                    //未风测
                    window.location.href = site_url.riskAppraisal_url + "?type=private"
                } else if (type == "repeatRisk") {
                    //风测过期
                    window.location.href = site_url.riskAppraisal_url + "?type=private"
                }else if(type == "isHighAge"){
                    that.gV.isHighAgeStatus = false;
                    that.getConditionsOfOrder()
                }else if(type == "isZdTaLimit"){
                     //跳理财首页
                     window.location.href = site_url.wealthIndex_url
                }
            }, {
                htmdEvt: 'newFundDetail_6'
            })

            //认证
            mui("body").on('mdClick', ".tips-li .tips-li-right", function(e) {
                var type = $(this).parent().index()
                switch (type) {
                    case 0: //开通账户
                        window.location.href = site_url.realName_url
                        break;

                    case 1: //风险评测
                        window.location.href = site_url.riskAppraisal_url + "?type=private"
                        break;

                    case 2: //完善基本信息
                        window.location.href = site_url.completeInformation_url
                        break;

                    case 3: //投资者分类
                        window.location.href = site_url.investorClassification_url
                        break;
                    case 4: //合格投资者认证
                        window.location.href = site_url.chooseQualifiedInvestor_url
                        break;

                    default:
                        break;
                }
            }, {
                htmdEvt: 'newFundDetail_7'
            });
            //一键认证
            mui("body").on('mdClick', ".tips .tips-btn", function(e) {
                var key = that.gV.singleaAuthenPath;
                switch (key) {
                    case "isWealthAccount": //开通账户
                        window.location.href = site_url.realName_url
                        break;

                    case "isRiskEndure": //私募风险评测  type=private type=asset 资管风测
                        window.location.href = site_url.riskAppraisal_url + "?type=private"
                        break;

                    case "isPerfect": //完善基本信息
                        window.location.href = site_url.completeInformation_url
                        break;

                    case "isInvestFavour": //投资者分类
                        window.location.href = site_url.investorClassification_url
                        break;
                    case "isRiskMatch": //合格投资者认证
                        window.location.href = site_url.chooseQualifiedInvestor_url
                        break;

                    default:
                        break;
                }
            }, {
                htmdEvt: 'newFundDetail_8'
            });
        },
    }
    /*调用*/
    newFundDetail.init()
})