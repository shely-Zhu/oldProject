/*
 * @Author: your name
 * @Date: 2019-11-26 14:42:56
 * @LastEditTime : 2020-01-10 14:34:39
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htjf-app\src\financial\static\js\publicPlacement\redemptionBuy.js
 */
/**  
 * @Page:  普通基金产品详情页_定投
 * @Author: caoqihai  
 * @Date:   2019-11-23
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

var payPass = require('@pathCommonJsCom/payPassword.js');

$(function() {

    var regulatory = {

        getElements: {
            accountName: $('#accountName'), //公共账户名称
            name: $('#name'), //公募账户名
            number: $('#number'), //账号
            linenum: $('#linenum'), //行号
            openingBank: $("#openingBank"), //开户行
            topc: $('#topc'), //提示信息
            templateTransferFunds: $("#templateTransferFunds"), //基金列表模板
            TransferFundsContent: $(".transferFundsContent"), //基金列表容器
            iconCheck: $(".item2 .iconfont"), //同意协议选择框
            confirmBtn: $(".confirmeDemptionPay"), // 确定按钮
            maxMoneyContent: $(".maxMoneyContent span"),
        },
        gV: { //全局变量
            transferFunds: "",
            fundCode: splitUrl["fundCode"], //现在的基金编号
            targetfundcode: "", //赎回后目前的基金编号
            nowRedempShare: "", //赎回后目前的赎回份额
            maxRedempShare: "", //最大赎回份额
            payType: "",
            maxMoney: "",
            checkImgUrl: "/common/img/account_icon_check@2x.png",
            dataList: "",
            enableSharesMax: "", //最大赎回金额
        },
        init: function() {
            var that = this;
            that.getPublicFundDetail();
        },
        getPublicFundDetail: function() {
            var that = this;
            var obj = [{
                url: site_url.pofAssessList_api,
                data: {
                    tradeAcc: splitUrl["tradeNo"],
                    fundCode: splitUrl["fundCode"]
                },
                callbackDone: function(json) {
                    that.gV.dataList = json.data[0] || ''
                    that.initParmes();
                    that.events();
                    that.initHtml();
                    that.initQueryTransferFunds();
                }
            }];
            $.ajaxLoading(obj);
        },
        initHtml: function() {
            var that = this;
            var redemptionBuyTitalHtml = "";
            var onrightLeftOneimgUrl = "";
            var onrightLeftOneName = "";
            var onrightLeftOneCode = "";
            console.log(that.gV.dataList.enableShares)
            $(".redemptionBuyTital span.name").html(that.gV.dataList.fundName);
            $(".redemptionBuyTital span.code").html(that.gV.dataList.fundCode);
            $(".listOneCar img").attr("src", that.gV.dataList.bankThumbnailUrl);
            $(".listOneCar i").html(that.gV.dataList.bankName);
            if (that.gV.dataList != "") {
                $(".listOneCar span.carNum").html(that.gV.dataList.bankAccountMask.substr(-4));
                $(".listSecondCar span.code").html(that.gV.dataList.bankAccountMask.substr(-4));
            }
            $(".pay span.payTime").html(that.gV.dataList.estimateArrivalDate);
            // $(".msecond input").val(that.gV.dataList.enableShares);
            $(".listSecondCar span.name").html(that.gV.dataList.bankName);
            $(".popupCarList .bank-img").attr("src", that.gV.dataList.bankThumbnailUrl);
        },
        //查看详情提交
        /*findMessageCen:function(id){
            var obj = [{
                url: site_url.findMessageCenterById_api,
                 contentTypeSearch: true,
                data: {
                    "id": id,  
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function (json) {
                    console.log("json",json);
                    var html = json.data.content;
                    if(json.status == "0000"){
                        $('.elasticLayer.transOutRule').show()
                           $(".elasticContent").html(html);
                       }else{
                         $('.elasticLayer.transOutRule').show()
                         $(".elasticContent").html("规则查询失败");
                       }
                },

            }];
            $.ajaxLoading(obj);
        },*/
        //初始化右侧展开
        initQueryTransferFunds: function() {
            var that = this;
            var obj = [{
                url: site_url.queryTransferFunds_api,
                needDataEmpty: true,
                data: {
                    type: "2"
                },
                callbackDone: function(json) {
                    var arr = [];
                    json.data.forEach(function(item) {
                        if (item.fundCode != that.gV.fundCode) {
                            arr.push(item);
                        }
                    })
                    that.gV.transferFunds = arr;
                    // 将列表插入到页面上
                    var fundCodeList= [];
                    var Redata = [];
                    for (var i = 0; i < that.gV.transferFunds.length; i++) {
                        var code = that.gV.transferFunds[i].fundCode;
                        fundCodeList.push(code);
                    }
                    Redata = that.searchNewfundDetails(fundCodeList);
                    for (var i = 0; i < that.gV.transferFunds.length; i++) {
                        var code = that.gV.transferFunds[i].fundCode;
                         if(Redata.length>0){
                             for(var j = 0 ;j<Redata.length ; j++){
                                 if(code == Redata[j].trdCode){
                                    that.gV.transferFunds[i].annYldRat = Redata[j].annYldRat;
                                 }
                             }
                         }
                    }
                    generateTemplate(that.gV.transferFunds, that.getElements.TransferFundsContent, that.getElements.templateTransferFunds);
                }
            }];
            $.ajaxLoading(obj);
        },
        //查询基金七日年化
        searchNewfundDetails: function(codeList) {
            var that = this;
            var callbackData;
            var obj = [{
                url: site_url.newfundDetailList_api,
                needDataEmpty: true,
                async: false,
                data: codeList,
                callbackDone: function(json) {
                    if(json.status == '0000'){
                        callbackData = json.data;
                    }
                },


            }];
            $.ajaxLoading(obj);
            return callbackData;
        },
        //赎回确认
        cancelOrder: function(password) {
            var that = this;
            var param = {
                password: password,
                fundCode: regulatory.gV.dataList.fundCode, //基金代码 
                tradeNo: regulatory.gV.dataList.tradeNo, //交易账号
                redempShare: regulatory.gV.nowRedempShare, //赎回份额
                redempFlag: "0", //赎回标识
                capitalMode: regulatory.gV.dataList.capitalMode, //资金方式
                shareType: regulatory.gV.dataList.shareType, //份额分类
                targetfundcode: regulatory.gV.targetfundcode, //目前基金编号
                channel: "app", //渠道
            };
            var obj = [{
                url: site_url.redemptionPay_api,
                data: param,
                needDataEmpty: true,
                callbackLoginBack: function() {
                    $(".confirmeDemptionPay").removeAttr("disabled");
                },
                callbackDone: function(res) {
                    var data = res.data;
                    $("#passwordWrap").hide();
                    if (res.status == '0000') {
                        window.location.href = site_url.pofSurelyResultsDetail_url + '?applyId=' + data.allotNo + '&fundBusinCode=' +
                            "024" + "&fundCode=" + regulatory.gV.dataList.fundCode + '&flag=redemption' + '&fixbusinflag=' + data.fixbusinflag;
                    } else {
                        $('.elasticLayer.transOutRule').show()
                        $(".elasticContent").html(res.message);
                    }
                    $(".confirmeDemptionPay").removeAttr("disabled");
                },
                callbackNoData: function(json) {
                    $("#passwordWrap").hide();
                    tipAction(json.message);
                    $(".confirmeDemptionPay").removeAttr("disabled");
                },
                callbackFail: function(json) {
                    $("#passwordWrap").hide();
                    tipAction(json.message);
                    $(".confirmeDemptionPay").removeAttr("disabled");
                },

            }];
            $.ajaxLoading(obj);
        },
        initParmes: function() {
            var that = this;
            var parmesDataList = that.gV.dataList;
            that.gV.fundCode = parmesDataList.fundCode;
            //that.gV.nowRedempShare = parmesDataList.enableShares;
            that.gV.maxRedempShare = parmesDataList.enableShares;
            $(".maxMoneyContent span").text(that.gV.maxRedempShare);
            $(".msecond-one").attr("placeholder","最多可赎回"+that.gV.maxRedempShare+"份");
        },
        // 关闭密码弹框，按钮设置为可点击
        closeCallBack: function() {
            $(".confirmeDemptionPay").removeAttr("disabled");
        },
        /*
            绑定事件
         */
        events: function() {
            var that = this;
            mui("body").on('mdClick', '.onright', function() {
                $('.popup').css('display', 'block');
            }, {
                htmdEvt: 'redemptionBuy_01'
            })
            
	        $(".msecond-one").on("blur", function() {
				    window.scrollTo(0, 0);//ios回滚到顶部
			})

            mui("body").on('mdClick', '.popup-close', function() {
                $('.popup').css('display', 'none');
            }, {
                htmdEvt: 'redemptionBuy_02'
            })

            mui("body").on('mdClick', '.popup-mask', function() {
                $('.popup').css('display', 'none');
            }, {
                htmdEvt: 'redemptionBuy_03'
            })

            mui("body").on('mdClick', '.findMessageCen', function() {
                var id = "79";
                // 跳转赎回说明页面
                window.location.href = site_url.redemptionExplain_url + '?id=' + id;
                // that.findMessageCen(id);
            }, {
                htmdEvt: 'redemptionBuy_04'
            })

            //银行卡与基金形成单选
            mui("body").on('mdClick', ".radioCheckItem", function() {
                var type = $(this).attr("type");
                if (type == 'car') {
                    //银行
                    $(".transferFundsContent li").attr("checkStatu", "off");
                    $(".transferFundsContent li .radioCheckItemImg").css({ "display": "none" });

                    $(".listOnefund").css({ "display": "none" });
                    $(".listOneCar").css({ "display": "flex" });
                    $(".maxMoneyContent").css({ "display": "block" });
                    that.gV.targetfundcode = that.gV.dataList.fundCode;
                    $(this).siblings().find(".radioCheckItemImg").css({ "display": "none" });
                } else if (type == 'fund') {
                    // $(".carContent li").attr("checkStatu","off");
                    $(".carContent li .radioCheckItemImg").css({ "display": "none" });
                    //$(this).siblings().attr("checkStatu","off");
                    $(this).siblings().find(".radioCheckItemImg").css({ "display": "none" });
                    $(".listOnefund").css({ "display": "block" });
                    $(".listOneCar").css({ "display": "none" });
                    $(".maxMoneyContent").css({ "display": "none" });
                    var fundCode = $(this).attr("fundCode");
                    var fundName = $(this).find("span.fundName")[0].textContent;
                    var fundMessage = $(this).find("span.fundMessage")[0].textContent;
                    that.gV.targetfundcode = fundCode;
                    console.log(fundCode, fundName);
                    $(".listOnefund .fundName").html(fundName);
                    $(".listOnefund .fundCode").html(fundCode);
                    $(".listOnefund .fundMessage").html(fundMessage);
                }
                //  $(this).attr("checkStatu","on");
                $(this).find(".radioCheckItemImg").css({ "display": "block" });
                $('.popup').css('display', 'none');

                //  that.confirmCheck();
            }, {
                htmdEvt: 'redemptionBuy_05'
            })

            //点击全部，初始化最大赎回额度
            mui("body").on('mdClick', '.forAll', function() {
                $(".msecond .msecond-one")[0].value = that.gV.dataList.enableShares;
                that.gV.nowRedempShare = that.gV.dataList.enableShares;
                if (that.gV.dataList.enableShares) {
                    that.getElements.confirmBtn.removeAttr('disabled');
                } 
            }, {
                htmdEvt: 'redemptionBuy_06'
            })

            // 交易规则
            mui("body").on("mdClick", ".goPofTransactionRules", function(e) {
                window.location.href = site_url.pofTransactionRules_url + '?fundCode=' + regulatory.gV.dataList.fundCode;
            }, {
                htmdEvt: 'redemptionBuy_07'
            });

            //赎回确认
            mui("body").on('mdClick', '.confirmeDemptionPay', function() {
                // $(".confirmeDemptionPay").on('click',function(){
                $(".pwd-input").val('');
                $(".fake-box input").val('');
                $(".msecond input").blur();
                $("#passwordWrap").show();
                payPass(that.cancelOrder, null, that.closeCallBack);
                that.getElements.confirmBtn.attr('disabled', true);
            }, {
                htmdEvt: 'redemptionBuy_08'
            })

            //忘记密码跳转
            mui("body").on("mdClick", ".passwordTop .forgetP", function() {
                window.location.href = site_url.pofForgotPassword_url;
            }, {
                htmdEvt: 'redemptionBuy_12'
            })
            // $(".msecond input").change(function(){
            $(".msecond input").on('input propertychange', function() {
                that.gV.nowRedempShare = $(this)[0].value;
                if (parseFloat(that.gV.maxRedempShare) < parseFloat(that.gV.nowRedempShare)) {
                    //  $(".checkMessage").css({"display":"block"});
                    // $(".checkMessage").html("超出最大赎回份额")
                    tipAction("超出最大赎回份额" + that.gV.maxRedempShare);
                    return
                } else {
                    $(".checkMessage").css({ "display": "none" });
                }
                if ($(this)[0].value == "") {
                    that.getElements.confirmBtn.attr('disabled', true);
                } else {
                    that.getElements.confirmBtn.removeAttr("disabled");
                }
            })

            //点击同意协议
            mui("body").on('mdClick', '.item2 .iconfont', function() {
                //that.getElements.iconCheck.on('click', function() {
                that.gV.nowRedempShare = $(".msecond input")[0].value;
                if ($(this).hasClass("check")) {
                    $(this).removeClass("check").html('&#xe668;');
                    that.getElements.confirmBtn.attr('disabled', true);

                } else {
                    $(this).addClass("check").html('&#xe669;');
                    if (that.gV.nowRedempShare != "") {
                        that.getElements.confirmBtn.removeAttr("disabled");
                    } else {
                        that.getElements.confirmBtn.attr('disabled', true);
                    }
                }
            }, {
                htmdEvt: 'redemptionBuy_09'
            });
            //忘记密码跳转
            mui("body").on("mdClick", ".passwordTop .forgetP", function() {
                window.location.href = site_url.pofForgotPassword_url;
            }, {
                htmdEvt: 'redemptionBuy_10'
            })

            mui('body').on('tap', '.elasticLayer.transOutRule .elasticButtons', function() {
                $('.elasticLayer.transOutRule').hide();
            }, {
                htmdEvt: 'redemptionBuy_11'
            })
        },
    };
    //调用函数
    regulatory.init();

})