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
require('@pathCommonJs/components/headBarConfig.js');

$(function () {

    var somePage = {
        gV: { // 全局变量
            showBankList: false,
            //请求到的总资产data
            data: '',
        },
        init: function () {
            var that = this;
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
                    //设置将数字转为中文的方法
                    Handlebars.registerHelper("noToChinese", function (value, options) {
                        return that.noToChinese(value);
                    });
                    //列表渲染
                    var tplm = $("#dataLists").html();
                    var template = Handlebars.compile(tplm);
                    var html = template(that.data.fundDetailList);
                    $("#pageLists").html(html);
                    //渲染完模板后再添加事件
                    that.events();
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
                    $('#bank_screen .iconfont').html('&#xe62a;');
                } else {
                    $('.bank_list').hide();
                    $('#bank_screen .iconfont').html('&#xe609;');
                }
            })
            //银行卡列表点击
            $('.bank_list .bank_screen').on('click', function(){
                $(this).find('.iconfont').removeClass('hide');
                $(this).siblings().find('.iconfont').addClass('hide');
                $('#bank_screen .bank_screen_name').html($(this).find('.bank_screen_name').html());
                //选择后将列表关闭
                that.gV.showBankList = !that.gV.showBankList;
                $('.bank_list').hide();
                $('#bank_screen .iconfont').html('&#xe609;');
            })
            //item的点击 进入持仓详情
            $('.hold_item').on('click', function(){
                //todo 跳转
            })
            //点击持仓列表的感叹号 进入持仓明细
            $('.position_tip').on('click', function(){
                //todo 跳转
            })
            //购买
            $('.buy_btn').on('click', function(){
                //todo 跳转
            })
            //赎回
            $('.redeem_btn').on('click', function(){
                //todo 跳转
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
        
        //数字转中文 例如1转为一
        noToChinese: function (num) {
            if (!/^\d*(\.\d*)?$/.test(num)) {
                alert("Number is wrong!");
                return "Number is wrong!";
            }
            var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
            var BB = new Array("", "十", "百", "千", "万", "亿", "点", "");
            var a = ("" + num).replace(/(^0*)/g, "").split("."),
                k = 0,
                re = "";
            for (var i = a[0].length - 1; i >= 0; i--) {
                switch (k) {
                    case 0:
                        re = BB[7] + re;
                        break;
                    case 4:
                        if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                            re = BB[4] + re;
                        break;
                    case 8:
                        re = BB[5] + re;
                        BB[7] = BB[5];
                        k = 0;
                        break;
                }
                if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
                if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
                k++;
            }
            if (a.length > 1) //加上小数部分(如果有小数部分) 
            {
                re += BB[6];
                for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
            }
            return re;
        },
    };
    somePage.init();
});