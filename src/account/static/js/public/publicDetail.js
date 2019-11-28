/**
 * 公募资产详情页
 *
 * @author shiyunrui 20191123
 *
 * 具体可以参考 privateDetail.js
 */

require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');

require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/headBarConfig.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js');
//是否大于0的判断器 用于设置涨红跌绿 可以参考publicAssets.js
Handlebars.registerHelper("if_than_0", function (value, options) {
    if (value > 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
//获取地址栏参数
getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return '';
}
$(function () {
    var fundCode
    var regard = {
        gV: {
            json: {}
        },
        init: function () {
            var that = this;
            //页面初始化
            that.getData();
            that.events();
        },
        changeVal: function (prop, num, isfalse) {
            isfalse = isfalse === undefined ? true : false
            key = this.gV.json[prop]
            var value = key.toFixed(num)
            if (isfalse) {
                if (key > 0) {
                    value = "+" + value
                } else if (key < 0) {
                    value = "-" + value
                }
            }
            this.gV.json[prop] = value
        },
        getData: function () {
            var that = this;
            // 请求页面数据
            var obj = [{
                url: site_url.newfundDetails_api,
                data: {
                    fundCode: getQueryString('fundCode') ? getQueryString('fundCode') : '000847'
                },
                callbackDone: function (json) {
                    that.gV.json = json.data

                    var tplm = $("#dataLists").html();
                    var template = Handlebars.compile(tplm);
                    that.changeVal('annYldRat', 4)
                    that.changeVal('unitYld', 4, false)
                    that.changeVal('chgRat1w', 2)
                    that.changeVal('chgRat3m', 2)
                    that.changeVal('chgRat1y', 2)
                    that.changeVal('chgRatBgn', 2)
                    that.gV.json.trDate = that.gV.json.trDate.slice(5)
                    console.log(that.gV.json);
                    var html = template(that.gV.json);

                    $(".tplBox").html(html);
                    console.log($(".net_worth_area .net_worth_item .value"));
                    $.each($(".net_worth_area .net_worth_item .value"), function (i, v) {
                        if (Number($(v).text().slice(0, $(v).text().length - 1)) >= 0) {
                            $(v).addClass('value_red')
                        } else {
                            $(v).addClass('value_green')
                        }
                    });
                    $("#HeadBarpathName").html(that.gV.json.secuSht);
                },
                callbackFail: function (json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },
        events: function () {
            var that = this;

            // 基金经理
            mui("body").on("tap", ".fundManager", function (e) {
                // var scheduledProtocolId = getQueryString('scheduledProtocolId')
                // window.location.href = site_url.pofOrdinarySetThrow_url + '?scheduledProtocolId=' + scheduledProtocolId + '&fundCode=' + fundCode;
                window.location.href = site_url.pofFundManager_url + '?fundCode=000847'
            });
            // 基金公司
            mui("body").on("tap", ".fundCompany", function (e) {
                window.location.href = site_url.pofFundCompany_url + '?fundComId=gz04tVwXga'
            });
            // 基金档案
            mui("body").on("tap", ".fundFile", function (e) {
                window.location.href = site_url.pofFundFile_url + '?fundCode=000847&secuId=000846.OF'
            });
            // 交易规则
            mui("body").on("tap", ".dealRegArea .rule", function (e) {
                window.location.href = site_url.pofTransactionRules_url + '?fundCode=000847'
            });

        },


    }
    /*调用*/
    regard.init()
})
