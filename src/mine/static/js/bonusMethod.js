/**
 * 修改分红方式页面 js
 * @author 蔡文琦  2019-11-20
 */

require('@pathCommonBase/base.js');

require('@pathCommonJs/ajaxLoading.js');
// require('@pathCommonJs/components/elasticLayer.js');
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();


$(function() {
    var somePage = {
        //获取页面元素
        $e: {
            bonusType: $('.bonusType'),
            duigou: $('.duigou'),
            adjustmentTemp: $('#adjustment-template'), //模板
        },
        //全局变量
        gV: {
            flag: 1,
            bonusType: "",
            publicFundDetail: "",
        },
        //页面初始化函数
        init: function() {
            var that = this;
            that.getPublicFundDetail()
            that.events()
        },
        // 获取产品信息
        getPublicFundDetail: function() {
            var that = this;
            //发送ajax请求
            var obj = [{
                url: site_url.pofAssessList_api,
                data: {
                    tradeAcc: splitUrl["tradeNo"],
                    fundCode: splitUrl["fundCode"]
                },
                callbackDone: function(json) {
                    var jsonData = json.data[0] || []
                    that.gV.publicFundDetail = jsonData
                    that.gV.publicFundDetail.fundCode = jsonData.fundCode
                    that.gV.publicFundDetail.tradeNo = jsonData.tradeNo
                    that.getDividend()
                }
            }];
            $.ajaxLoading(obj);
        },
        getDividend: function() {
            var that = this;
            var obj = [{
                url: site_url.pofQueryDividendByCode_api,
                data: {
                    tradeAcco: that.gV.publicFundDetail.tradeNo,
                    fundCode: that.gV.publicFundDetail.fundCode,
                },
                needLogin: true,
                needLoading: true,
                callbackDone: function(json) {
                    var jsonData = json.data; //防止数据为空下面循环出错
                    if (!jsonData.length) {
                        return false;
                    }
                    // 将列表插入到页面上
                    generateTemplate(jsonData, $(".inner"), that.$e.adjustmentTemp);
                    for (var i = 0; i < jsonData.length; i++) {
                        if (jsonData[i].checkFlag == 1) {
                            $(".duigou").eq(i).css('display', 'block')
                            $(".bonusType").eq(i).text(jsonData[i].autoBuyDes + "(当前分红方式)");
                        } else if (jsonData[i].checkFlag == 0) {
                            $(".duigou").eq(i).css('display', 'none')
                            $(".bonusType").eq(i).text(jsonData[i].autoBuyDes);
                        }
                    }
                },
            }]
            $.ajaxLoading(obj);
        },

        //获取数据函数
        changeBonusType: function(tra, fund, autoBuy) {
            var that = this;
            var obj = [{
                url: site_url.updateDividend_api,
                data: {
                    tradeAcco: tra,
                    fundCode: fund,
                    autoBuy: autoBuy, //分红方式
                },
                //async: false,
                needLogin: true,
                needDataEmpty: true,
                callbackDone: function(json) {
                    window.location.href = site_url.optionalPublicDetail_url
                },
            }]
            $.ajaxLoading(obj);
        },
        //注册事件
        events: function() {
            var that = this;
            mui('body').on("mdClick", ".type_one", function(e) {
                var autoBuy = $(this).attr("data-autoBuy")
                if ($(this).attr("data-checkFlag") != "1") {
                    $.elasticLayer({
                        id: "tip",
                        title: '',
                        p: '<p>' + '修改分红方式为“<span>' + $(this).attr("data-autoBuyDes") + '</span>”<br>分红方式确认前将不能再次修改</p>',
                        yesTxt: '确定',
                        celTxt: '取消',
                        htmdEvtYes: 'bonusMethod_02', // 埋点确定按钮属性
                        htmdEvtCel: 'bonusMethod_03', // 埋点取消按钮属性
                        zIndex: 100,
                        callback: function() {
                            that.changeBonusType(that.gV.publicFundDetail.tradeNo, that.gV.publicFundDetail.fundCode, autoBuy)
                        }
                    });
                }
            }, {
                'htmdEvt': 'bonusMethod_01'
            })
        }
    };
    somePage.init();
});