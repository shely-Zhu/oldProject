/*
 * @page: 公募自选总资产
 * @Author: shiyunrui
 * @Date:   2019-11-19
 * @description:
 * 公募持仓页面
 */

require('../../../include/js/vendor/config.js');
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function () {

    var somePage = {
        gV: { // 全局变量
            showBankList: false,
            //请求到的总资产data
            data: '',
        },
        init: function () {
            var that = this;
            that.events();
            that.getData();
        },
        getData: function (t) {
            var that = this;
            var obj = [{ // 公募总资产
                url: site_url.totalAssets_api,
                data: {},
                //async: false,
                needDataEmpty: true,
                callbackDone: function (json) {
                    that.data = json.data;
                    //总资产
                    $('.totalM').html(that.data.myAssetTotalMask);
                    //待确认金额
                    $('.be_confirmed_amount .value').html(that.data.inTransitTotal);
                    //昨日总收益
                    $('.first_h_profit_box .h_profit_value').html(that.data.inTransitTotal);
                    //持仓总收益
                    $('.second_h_profit_box .h_profit_value').html(that.data.inTransitTotal);
                    //设置比较器
                    Handlebars.registerHelper("if_than_0", function (value, options) {
                        if (value > 0) {
                            return options.fn(this);
                        } else {
                            return options.inverse(this);
                        }
                    });
                    //列表渲染
                    var tplm = $("#dataLists").html();
                    var template = Handlebars.compile(tplm);
                    var html = template(that.data.fundDetailList);
                    $("#pageLists").html(html);
                },
                callbackFail: function (data) {
                    console.log('加载失败');
                }
            }];
            $.ajaxLoading(obj);
        },
        events: function () { //绑定事件
            var that = this;
            //点击筛选银行卡
            $('#bank_screen').on('click', function (e) {
                that.gV.showBankList = !that.gV.showBankList;
                if (that.gV.showBankList) {
                    $('.bank_list').show();
                    $('#bank_screen iconfont').html('&#xe62a;');
                } else {
                    $('.bank_list').hide();
                    $('#bank_screen iconfont').html('&#xe62a;');
                }

            })

            // 头部文案提示(金钱展示隐藏)
            mui("body").on('tap', '.j_icon', function (e) {
                //总资产
                $('.totalM').html("****");
                //待确认金额
                $('.be_confirmed_amount .value').html("****");
                //昨日总收益
                $('.first_h_profit_box .h_profit_value').html("****");
                //持仓总收益
                $('.second_h_profit_box .h_profit_value').html("****");
                $(this).addClass('eyecose');
            })
            mui("body").on('tap', '.eyecose', function (e) {
                //总资产
                $('.totalM').html(that.data.myAssetTotalMask);
                //待确认金额
                $('.be_confirmed_amount .value').html(that.data.inTransitTotal);
                //昨日总收益
                $('.first_h_profit_box .h_profit_value').html(that.data.inTransitTotal);
                //持仓总收益
                $('.second_h_profit_box .h_profit_value').html(that.data.inTransitTotal);
                $(this).removeClass('eyecose');
            })
            //打开资产组成说明
            mui("body").on('tap', '.assetsBtn', function (e) {
                $('.mask').show();
                $('.tipContainer').show();
            })
            //关闭资产组成说明
            mui("body").on('tap', '.buttonOne', function (e) {
                $('.mask').hide();
                $('.tipContainer').hide();
            })
        },
    };
    somePage.init();
});