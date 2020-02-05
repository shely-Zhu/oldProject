/**
 * 我的定投_定投详情 js
 * @author 蔡文琦  2019-11-23
 */
require('@pathCommonBase/base.js');

require('@pathCommonJs/ajaxLoading.js');
// require('@pathCommonJs/components/headBarConfig.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var payPass = require('@pathCommonJsCom/payPassword.js');
//获取地址栏参数
$(function() {
    var fundCode;
    var regard = {

            init: function() {
                var that = this;

                //页面初始化
                that.getData();


            },
            gV: {
                json: {},
                copyJson: {} //复制一份值做暂停和终止续投
            },
            getData: function() {

                var that = this;
                var scheduledProtocolId = splitUrl['scheduledProtocolId'];
                    //请求页面数据
                var obj = [{
                    url: site_url.pofFixedDetail_api,
                    data: {
                        scheduledProtocolId: scheduledProtocolId
                    },
                    callbackDone: function(json) {
                        json = json.data;
                        that.gV.copyJson = JSON.parse(JSON.stringify(json));
                        that.gV.copyJson.scheduledProtocolId = scheduledProtocolId;
                        $('.fundName').html(json.fundName + ' ' + json.fundCode);
                        $('.balanceMask').html(json.balanceMask);
                        $('.totalTradeTimes').html(json.totalTradeTimes);
                        $('.totalCfmBalaMask').html(json.totalCfmBalaMask);
                        $('.nextFixrequestDateMask').html(json.nextFixrequestDateMask);
                        $('.fixedPeriodMask').html(json.fixedPeriodMask);
                        $('.capitalModeDesc').html(json.capitalModeDesc);
                        $('.bankName').html(json.bankName);
                        $('.bankAccountMask').html(json.bankAccountMask);
                        $('.signDate').html(json.signDateMask);
                        $('.bankNo').html(json.bankAccountMask.substr(json.bankAccountMask.length - 4));
                        // $('.bankThumbnailUrl').attr('src', json.bankThumbnailUrl);
                        //银行logo取字段为thumbnailUrl
                        $('.bankThumbnailUrl').attr('src', json.thumbnailUrl);
                        
                        $('.totalCfmShareMask').html(json.totalCfmShareMask);
                        $('.serviceCharge').html('含手续费' + json.serviceCharge + '元');
                        fundCode = json.fundCode;
                        that.gV.json = json;
                        that.events();
                        var fixState, str;
                        switch (json.fixState) {
                            case 'A':
                                fixState = "进行中";
                                str = '<div type="1" >终止</div> <div class="cen" type="0"  >暂停</div> <div class="active edit ">修改</div>';
                                break;

                            case 'H':
                                fixState = "已终止";
                                str = "";
                                $('.nextFixrequestDateMask').html('已终止');
                                break;

                            case 'P':
                                fixState = "已暂停";
                                str = '<div type="1"  >终止</div> <div class="active" type="2" >续投</div>';
                                break;
                            case 'D':
                                fixState = "删除";
                                break;
                            case 'F':
                                fixState = "签约失败";
                                break;

                            default:
                                break;
                        }
                        if (fixState == '已终止' || fixState == '删除' || fixState == '签约失败') {
                            $(".fixState").addClass("redColor");
                        } else {
                            $(".fixState").removeClass("redColor");
                        }
                        if (fixState == '已暂停') {
                            $(".fixState").addClass("yellowColor");
                        } else {
                            $(".fixState").removeClass("yellowColor");
                        }
                        $('.fixState').html(fixState);
                        $('.footer').html(str);
                        var tplm = $("#dataLists").html();
                        var template = Handlebars.compile(tplm);
                        var tradeRecord = json.tradeRecord;
                        json.tradeRecordStutas = tradeRecord.length > 0 ? 1 : 0;
                        if (json.tradeRecord.length > 0) {
                            for (var i = 0; i < json.tradeRecord.length; i++) {
                                if (json.tradeRecord[i].status == "1") {
                                    json.tradeRecord[i].statusDesc_1 = "定投成功";
                                } else if (json.tradeRecord[i].status == "3") {
                                    json.tradeRecord[i].statusDesc_1 = "待确认";
                                } else {
                                    json.tradeRecord[i].statusDesc_1 = "定投失败";
                                }
                            }
                        }
                        tradeRecord.forEach(function(n) {
                            n.tradeTime = n.tradeTime.split(" ")[0];
                            n.status = n.status === "1" || n.status === "3" ? 1 : 0;
                        });
                        var html = template(json);
                        $(".tplBox").html(html);

                    }
                }]
                $.ajaxLoading(obj);
            },
            changeStatus: function(pwd, type) {
                var tip = ['定投计划已暂停', '定投计划已终止', '续投成功'];
                var fixStateArr = ['P', 'H', 'A'];
                var msg = tip[Number(type)];
                var that = this;
                that.gV.copyJson.fixState = fixStateArr[Number(type)];
                that.gV.copyJson.password = pwd;
                    //请求页面数据
                var obj = [{
                    url: site_url.pofFixedChange_api,
                    data: that.gV.copyJson,
                    callbackDone: function(json) {
                        tipAction(msg);
                        $("#passwordWrap").hide();
                        $("#passwordWrap input").val("");
                        setTimeout(function() {
                            //window.history.go(-1)
                            window.location.href = site_url.myInvestmentPlan_url;
                        }, 800)
                    },
                    callbackFail: function(json) {
                        tipAction(json.message);
                        $("#passwordWrap").hide();
                        $("#passwordWrap input").val("");
                    }
                }]
                $.ajaxLoading(obj);
            },
            events: function() {
                var that = this;
                var fundType = that.gV.json.fundType;
                    // 详情
                mui("body").on("mdClick", ".posRight", function() {
                    window.location.href = site_url.pofPublicDetail_url + '?fundCode=' + fundCode + '&fundType=' + fundType;
                }, {
                    htmdEvt: 'castSurelyDetails_01'
                });
                // 修改
                mui("body").on("mdClick", ".edit", function(e) {
                    var scheduledProtocolId = splitUrl['scheduledProtocolId'];
                    window.location.href = site_url.pofOrdinarySetThrow_url + '?scheduledProtocolId=' + scheduledProtocolId + '&fundCode=' + fundCode;
                }, {
                    htmdEvt: 'castSurelyDetails_02'
                });
                // 终止 暂停 续投
                mui("body").on("mdClick", ".footer >div", function(e) {
                    var type = $(this).attr('type');
                    if (!type) return
                    $("#passwordWrap").show();
                    payPass(function(pwd) {
                        that.changeStatus(pwd, type);
                    });
                }, {
                    htmdEvt: 'castSurelyDetails_03'
                });

                //跳转到定投详情结果页 publicTradeDetail_url
                mui("body").on("mdClick", ".is_fail .state_fail", function() {
                    var obj = {
                        applyId: $(this).attr("allotNo"),
                        fundCombination: "",
                        fundCode: that.gV.copyJson.fundCode,
                        fundBusinCode: "039",
                        allotType: "2", //定投为2 买回0 赎回1
                        Fixbusinflag: "",
                    };
                    window.location.href = site_url.publicTradeDetail_url + '?applyId=' + obj.applyId + '&fundCombination=' + obj.fundCombination + '&fundCode=' + obj.fundCode + '&fundBusinCode=' + obj.fundBusinCode + '&allotType=' + obj.allotType + '&Fixbusinflag=' + obj.Fixbusinflag;

                }, {
                    htmdEvt: 'castSurelyDetails_04'
                })

            },


        }
        /*调用*/
    regard.init()
})