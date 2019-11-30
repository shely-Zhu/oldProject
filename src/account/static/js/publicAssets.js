/*
 * @page: 公募自选总资产
 * @Author: shiyunrui
 * @Date:   2019-11-19
 * @description:
 * 公募持仓页面
 */

require('@pathIncludJs/base.js');
require('../../../common/js/ajaxLoading.js');
require('@pathCommonJs/components/headBarConfig.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');

$(function () {

    var somePage = {
        gV: { // 全局变量
            showBankList: false,
            data: '',//请求到的总资产data
            isShowInfo: true//是否展示信息 默认展示
        },
        init: function () {
            var that = this;
            that.getData('');
            that.getBankList();
        },
        getBankList: function () {
            //查询银行卡列表
            var that = this;
            var param = {
                useEnv: 0
            };

            //发送ajax请求
            var obj = [{
                url: site_url.normalPofList_api,
                data: param,
                needLogin: true,//需要判断是否登陆
                //needDataEmpty: false,//不需要判断data是否为空
                callbackDone: function (json) {  //成功后执行的函数

                    if (json.data.pageList.length) {
                        //获取银行卡后四位
                        Handlebars.registerHelper("get_last_4_value", function (value, options) {
                            return value.substring(value.length - 4);
                        });
                        var tplm = $("#bankLists").html();
                        var template = Handlebars.compile(tplm);
                        var html = template(json.data.pageList);
                        $("#bank_list_area").html(html);
                        //渲染模板后设置点击事件
                        that.bankEvents();
                    }
                },
                callbackFail: function (json) {  //失败后执行的函数
                    tipAction(json.msg);
                }
            }];
            $.ajaxLoading(obj);

        },
        getData: function (bankAccount) {
            var that = this;
            var obj = [{ // 公募总资产
                url: site_url.pofTotalAssets_api,
                data: {
                    bankAccount: bankAccount,
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function (json) {
                    if (json.status == '1000'){
                        $('.noData').show();
                        return;
                    }
                    that.gV.data = json.data;
                    //设置比较器
                    Handlebars.registerHelper("if_than_0", function (value, options) {
                        if (value > 0) {
                            return options.fn(this);
                        } else {
                            return options.inverse(this);
                        }
                    });
                    that.chooseTipDesc();
                    that.renderView(true);
                    that.events();
                },
                callbackFail: function (data) {
                    console.log('加载失败');
                }
            }];
            $.ajaxLoading(obj);
        },
        renderView: function (){
            var that = this;
            //渲染整个页面 flag=true 渲染真实数据  flag=false 渲染成为***
            if (that.gV.isShowInfo){
                //总资产
                $('.totalM').html(that.gV.data.myAssetTotalMask);
                //待确认金额
                $('.be_confirmed_amount .value').html(that.gV.data.inTransitTotal);
                //昨日总收益
                $('.first_h_profit_box .h_profit_value').html(that.addSymbol(that.gV.data.todayProfit, that.gV.data.todayProfitMask));
                //持仓总收益
                $('.second_h_profit_box .h_profit_value').html(that.addSymbol(that.gV.data.cumulativeProfit, that.gV.data.cumulativeProfitMask));
                //现金宝列表渲染
                var tplm = $("#cashLists").html();
                var template = Handlebars.compile(tplm);
                var html = template(that.gV.data.cashDetail);
                $("#cashPageLists").html(html);

                //普通基金列表渲染
                var tplm = $("#dataLists").html();
                var template = Handlebars.compile(tplm);
                var html = template(that.gV.data.fundDetailList);
                $("#pageLists").html(html);
                //模板渲染完毕后展示没有更多数据的样式
                $('footer').removeClass('hide');
                //渲染完模板后再添加事件
            } else {
                //所有标位显示的区域都更换为****
                $('.show_item').html('****');
                $('.position_h').css('color', '#272727');
            }
        },
        bankEvents: function () { //绑定事件
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
            $('.bank_item').on('click', function(){
                $(this).find('.iconfont').removeClass('hide');
                $(this).siblings().find('.iconfont').addClass('hide');
                //将获取到的名字填充到外部
                $('#bank_screen .bank_screen_name').html($(this).find('.bank_screen_name').html());
                //点击后拿到银行卡号去筛选银行卡
                var bankAccount = $(this).attr('bankAccount');
                that.getData(bankAccount);
                //选择后将列表关闭
                that.gV.showBankList = !that.gV.showBankList;
                $('.bank_list').hide();
                $('#bank_screen .iconfont').html('&#xe609;');
            })
        },
        events: function () { //绑定事件
            var that = this;
            //交易记录按钮点击 跳转到交易记录
            mui("body").on('tap', '.trade_list', function (e) {
                window.location.href = site_url.transactionRecords_url;
            })
            //普通基金item的点击 进入持仓详情
            mui("body").on('tap', '#pageLists .hold_item', function (e) {
                var index = $(this).index();
                sessionStorage.setItem("publicFundDetail",JSON.stringify(that.gV.data.fundDetailList[index])) 
                window.location.href=site_url.optionalPublicDetail_url;
            })
            //现金宝基金item的点击 进入持仓详情
            mui("body").on('tap', '#cashPageLists .hold_item', function (e) {
                var index = $(this).index();
                sessionStorage.setItem("cashFundDetail",JSON.stringify(that.gV.data.cashDetail[index])) 
                window.location.href=site_url.superStreasureDetail_url;
            })
            //点击持仓列表的感叹号 进入交易明细明细
            mui("body").on('tap', '.position_tip', function (e) {
                //跳转到收益明细
                window.location.href = site_url.returnsDetail_url + '?fundCode=' + $(this).attr('data-fundcode');
                return false;
            })
            //购买
            mui("body").on('tap', '.buy_btn', function (e) {
                window.location.href = site_url.fundTransformIn_url;   
                return false;
            })
            //赎回
            mui("body").on('tap', '.redeem_btn', function (e) {
                window.location.href = site_url.redemptionBuy_url;
                return false;
            })
            // 头部文案提示(金钱展示隐藏)
            mui("body").on('tap', '.j_icon', function (e) {
                $('.j_icon').addClass('eyecose');
                that.gV.isShowInfo = false;
                that.renderView();
            })
            mui("body").on('tap', '.eyecose', function (e) {
                $('.j_icon').removeClass('eyecose');
                that.gV.isShowInfo = true;
                that.renderView();
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
            mui('body').on('tap', '.position_tip', function (e){
                
                return false;
            })
        },
        chooseTipDesc: function(){
            var that = this;
            that.gV.data.fundDetailList.forEach(element => {
                //自己处理一下文案的显示
                element.myTip = element.divideMsg? element.divideMsg: element.canBeSpentMsg? element.canBeSpentMsg: '';
            });
        },
        addSymbol: function (value, valueMask) {
            //添加正负号
            if (value > 0){
                return "+" + valueMask;
            } else if (value < 0){
                return "-" + valueMask;
            } else {
                return valueMask;
            }
        }
    };
    somePage.init();
});