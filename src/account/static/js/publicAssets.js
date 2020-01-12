/*
 * @page: 公募自选总资产
 * @Author: shiyunrui
 * @Date:   2019-11-19
 * @description:
 * 公募持仓页面
 * update:chentiancheng 2020-01-08
 * @description:
 * 新增事件clickEvent方法
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var setCookie = require('@pathCommonJsCom/setCookie.js');
var frozenAccount = require('@pathCommonJs/components/frozenAccount.js');
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js');
var authenticationProcess = require('@pathCommonCom/authenticationProcess/authenticationProcess.js');

$(function() {

    var somePage = {
        gV: { // 全局变量
            showBankList: false,
            data: '', //请求到的总资产data
            isShowInfo: true, //是否展示信息 默认展示
            listLoading: $('.listLoading') //所有数据区域，第一次加载的loading结构

        },
        init: function() {
            var that = this;
            that.getData('');
            that.initRightBtn();
            that.clickEvent();
            that.bankEvents();
        },
        // 获取认证信息
        getUserInfo: function () {
          var that = this;
          // 请求页面数据
          var obj = [{
              url: site_url.queryUserBaseInfo_api,
              data: {
              },
              callbackDone: function (json) {
                  var data = json.data
                  that.gV.accountType = data.accountType
              }
          }]
          $.ajaxLoading(obj);
        },
        //获取用户信息
          getUserInfo_1:function(){
          var that = this;
          var obj = [{
            url:site_url.user_api,
            data:{

            },
            callbackDone:function(json){
              var data = json.data
                that.gV.userStatus = data.investFavour
            }
          }];
          $.ajaxLoading(obj);
        },
        getData: function(bankAccount) {
            var that = this;
            var obj = [{
                    url: site_url.normalPofList_api, //查询银行卡列表
                    data: {
                        useEnv: 1
                    },
                    needLogin: true, //需要判断是否登陆
                    needLoading: false, // 接口请求完不隐藏loading
                    callbackDone: function(json) { //成功后执行的函数
                        if (json.data.pageList.length) {
                            //获取银行卡后四位
                            Handlebars.registerHelper("get_last_4_value", function(value, options) {
                                if (value.length > 4) {
                                    return ' - ' + value.substring(value.length - 4);
                                }
                                return '';
                            });
                            json.data.pageList.unshift({ 'bankName': '全部', 'bankAccountMask': '' })
                            var tplm = $("#bankLists").html();
                            var template = Handlebars.compile(tplm);
                            var html = template(json.data.pageList);
                            $("#bank_list").html(html);
                        }
                    }
                },
                { // 公募总资产
                    url: site_url.pofTotalAssets_api,
                    data: {
                        bankAccount: bankAccount,
                    },
                    //async: false,
                    needDataEmpty: true,
                    needLoading: false, // 接口请求完不隐藏loading
                    callbackDone: function(json) {
                        if (json.status == '1000') {
                            $('.noData').show();
                            return;
                        }
                        that.gV.listLoading.hide();
                        that.gV.data = json.data;
                        //设置比较器
                        Handlebars.registerHelper("if_than_0", function(value, options) {
                            if (value > 0) {
                                return options.fn(this);
                            } else {
                                return options.inverse(this);
                            }
                        });
                        that.chooseTipDesc();
                        that.renderView();
                        that.events();
                    },
                    callbackNoData: function(json) {
                        $('.noData').show();
                    }
                }
            ];
            $.ajaxLoading(obj);
        },
        renderView: function() {
            var that = this;
            //渲染整个页面 flag=true 渲染真实数据  flag=false 渲染成为***
            if (that.gV.isShowInfo) {
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
                var html = template(that.gV.data.cashDetails);
                $("#cashPageLists").html(html);

                //普通基金列表渲染
                var tplm = $("#dataLists").html();
                var template = Handlebars.compile(tplm);
                var html = template(that.gV.data.fundDetailList);
                $("#pageLists").html(html);
                //模板渲染完毕后展示没有更多数据的样式
                $('footer').removeClass('hide');

                if (that.gV.data.fundDetailList.length == 0 && that.gV.data.cashDetails.length == 0) {
                    $(".noData").show()
                    $('footer').hide()
                }

                //渲染完模板后再添加事件
            } else {
                //所有标位显示的区域都更换为****
                $('.show_item').html('****');
                $('.position_h').css('color', '#272727');
            }
        },
        initRightBtn: function() {
            //初始化右上角的按钮btn
            $('.rightBtn').show().html('交易记录').css('color', '#fff');
            mui("body").on('mdClick', '.rightBtn', function(e) {
                setCookie("transactionRecordsAjaxData", "", -1);
                setCookie("transactionRecordsShowData", "", -1);
                window.location.href = site_url.transactionRecords_url;
            }, {
                'htmdEvt': 'publicAssets_0'
            })
        },
        bankEvents: function() { //绑定事件
            var that = this;
            //点击筛选银行卡
            mui("body").on('mdClick', '#bank_screen', function(e) {
                that.gV.showBankList = !that.gV.showBankList;
                $(".noData").hide()
                if (that.gV.showBankList) {
                    $('.bank_list').show();
                    $('#bank_screen .iconfont').html('&#xe62a;');
                } else {
                    $('.bank_list').hide();
                    $('#bank_screen .iconfont').html('&#xe609;');
                }
            }, {
                'htmdEvt': 'publicAssets_11'
            })
            //银行卡列表点击
            mui("body").on('mdClick', '.bank_item', function(e) {
                $(this).find('.iconfont').removeClass('hide');
                $(this).siblings().find('.iconfont').addClass('hide');
                $(this).addClass('bank_listactive');
                $(this).siblings().removeClass('bank_listactive');
                //将获取到的名字填充到外部
                $('#bank_screen .bank_screen_name').html($(this).find('.bank_screen_name').html());
                //点击后拿到银行卡号去筛选银行卡
                var bankAccount = $(this).attr('bankAccount');
                that.getData(bankAccount);
                //选择后将列表关闭
                that.gV.showBankList = !that.gV.showBankList;
                $('.bank_list').hide();
                $('#bank_screen .iconfont').html('&#xe609;');
            }, {
                'htmdEvt': 'publicAssets_12'
            })
        },
        events: function() { //绑定事件
            var that = this;
            //普通基金item的点击 进入持仓详情
            mui("body").on('mdClick', '#pageLists .hold_item', function(e) {
                var index = $(this).index();
                var fundCode = $(this).attr("data-fundCode")
                var tradeNo = $(this).attr("data-tradeNo")
                window.location.href = site_url.optionalPublicDetail_url + '?fundCode=' + fundCode + '&tradeNo=' + tradeNo
            }, {
                'htmdEvt': 'publicAssets_1'
            })
            //现金宝基金item的点击 进入持仓详情
            mui("body").on('mdClick', '#cashPageLists .hold_item', function(e) {
                var index = $(this).index();
                window.location.href = site_url.superStreasureDetail_url + '?fundCode=' + that.gV.data.cashDetails[index].fundCode;
            }, {
                'htmdEvt': 'publicAssets_2'
            })
            //点击持仓列表的感叹号 进入交易明细明细
            mui("body").on('mdClick', '.position_tip', function(e) {
                //跳转到收益明细
                window.location.href = site_url.returnsDetail_url + '?fundCode=' + $(this).attr('data-fundcode');
                return false;
            }, {
                'htmdEvt': 'publicAssets_3'
            })
            //购买
            mui("body").on('mdClick', '.buy_btn', function(e) {
                var fundCode = $(this).attr("fundCode");
                var fundName = $(this).attr("fundName");
                var id = $(this).parent().parent().parent().parent().attr("id")
                var flag = frozenAccount("buyFreeze", window.location.href, false, 'privateDetail_13')
                if (!flag) {
                    if (id == "cashPageLists") {
                        //现金宝
                        var url = site_url.pofCashTransformIn_url + "?fundCode=" + fundCode + "&noReload=1";
                        authenticationProcess(fundCode, url,'publicAssets_cash')
                    } else {
                        //普通基金
                        var url = site_url.fundTransformIn_url + '?fundCode=' + fundCode + '&fundName=' + fundName;
                        authenticationProcess(fundCode, url,'publicAssets')
                        //window.location.href = site_url.fundTransformIn_url + '?fundCode=' + fundCode + '&fundName=' + fundName;
                    }
                }
                return false
            }, {
                'htmdEvt': 'publicAssets_4'
            })
            //赎回
            mui("body").on('mdClick', '.redeem_btn', function(e) {
                var index = $(this).parent().parent().parent().index();
                var id = $(this).parent().parent().parent().parent().attr("id")
                var tradeNo = $(this).parent().parent().parent().attr("data-tradeNo")
                var fundCode = $(this).parent().parent().parent().attr("data-fundCode")
                // 转出时判断是否有司法冻结
                var flag = frozenAccount("saleFreeze", window.location.href, '', 'privateDetail_13')
                if (!flag) {
                    if (id == "cashPageLists") {
                        //现金宝
                        var fundCode = that.gV.data.cashDetails[index].fundCode
                        var productName = that.gV.data.cashDetails[index].fundName
                        window.location.href = site_url.pofCashTransformOut_url + '?fundCode=' + fundCode + '&productName=' + new Base64().encode(productName);
                    } else if (id == "pageLists") {
                        window.location.href = site_url.redemptionBuy_url + '?tradeNo=' + tradeNo + "&fundCode=" + fundCode
                    } else {
                        return false
                    }
                }
                return false
            }, {
                'htmdEvt': 'publicAssets_5'
            })
            // 头部文案提示(金钱展示隐藏)
            mui("body").on('mdClick', '.j_icon', function(e) {
                $('.j_icon').addClass('eyecose');
                that.gV.isShowInfo = false;
                that.renderView();
            }, {
                'htmdEvt': 'publicAssets_6'
            })
            mui("body").on('mdClick', '.eyecose', function(e) {
                $('.j_icon').removeClass('eyecose');
                that.gV.isShowInfo = true;
                that.renderView();
            }, {
                'htmdEvt': 'publicAssets_7'
            })
            
        },
        //点击事件
        clickEvent:function(){
            //打开资产组成说明
            mui("body").on('mdClick', '.assetsBtn', function(e) {
                $('.mask').show();
                $('.tipContainer').show();
            }, {
                'htmdEvt': 'publicAssets_8'
            })
            //关闭资产组成说明
            mui("body").on('mdClick', '.buttonOne', function(e) {
                $('.mask').hide();
                $('.tipContainer').hide();
            }, {
                'htmdEvt': 'publicAssets_9'
            })
            mui('body').on('mdClick', '.position_tip', function(e) {

                return false;
            }, {
                'htmdEvt': 'publicAssets_10'
            })
        },
        chooseTipDesc: function() {
            var that = this;
            /*that.gV.data.fundDetailList.forEach(element => {
                //自己处理一下文案的显示
                if (element.isShowDivideMsg == '1' && element.divideMsg){
                    element.myTip = element.divideMsg;
                } else if (element.canBeSpentMsg){
                    element.myTip = element.canBeSpentMsg;
                }
            });*/
            for (var i = 0; i < that.gV.data.fundDetailList.length; i++) {
                if (that.gV.data.fundDetailList[i].isShowDivideMsg == '1' && that.gV.data.fundDetailList[i].divideMsg) {
                    that.gV.data.fundDetailList[i].myTip = that.gV.data.fundDetailList[i].divideMsg;
                } else if (that.gV.data.fundDetailList[i].canBeSpentMsg) {
                    that.gV.data.fundDetailList[i].myTip = that.gV.data.fundDetailList[i].canBeSpentMsg;
                }
            }
        },
        addSymbol: function(value, valueMask) {
            //添加正负号
            if (value > 0) {
                return "+" + valueMask;
            } else {
                return valueMask;
            }
        }
    };
    somePage.init();
});