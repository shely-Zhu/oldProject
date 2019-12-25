/**
 * 历史净值js
 * @author  zhangweipeng 2017-03-23
 */

require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');

require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');

require('@pathCommonJsCom/tabScroll.js');
//黑色提示条的显示和隐藏
var tipAction = require('@pathCommonJsCom/tipAction.js');

require('@pathCommonJsCom/goTopMui.js');
var splitUrl = require('@pathCommonJsCom/splitUrl.js');

$(function() {

    var hisValue = {

        getElements: {
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
        },

        setting: {

            fundCode: splitUrl()['fundCode'], //当前的基金代码

            //导航
            navList: {
                noMoney: [{ name: '日期' }, { name: '单位净值(元)' }, { name: '累计净值(元)' }]
            },

        },

        page: 1, //当前页码，默认为1


        init: function() {
            var that = this;

            that.beforeFunc();
            that.initMui();
        },

        beforeFunc: function() {
            var that = this;

            //拼导航模板
            var source = $('#productList-nav-template').html(),
                template = Handlebars.compile(source);
            var header = template(that.setting.navList.noMoney);

            //插入页面
            $('.nav').append(header);


            //设置切换区域的高度
            //计算节点高度并设置
            //if( !that.height ){
            var height = windowHeight - $('.nav').height();
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
            }
        },

        getData: function(t) {
            var that = this;

            //重设ajaxFail
            that.ajaxFail = false;

            var obj = [{
                url: site_url.prvHisValue_api,
                data: {
                    hmac: "", //预留的加密信息
                    params: { //请求的参数信息
                        pageNo: that.page, // 当前页
                        pageSize: 20, //每页记录数
                        productCode: that.setting.fundCode, // 基金代码
                        days: "",
                        netValueBeginDate: "", // 查询起始日期(非必须)
                        netValueEndDate: "" // 查询结束日期(非必须)
                    }
                },
                needDataEmpty: false,
                callbackDone: function(json) {

                    that.jsonData = json.data;

                    if (!$.util.objIsEmpty(that.jsonData.pageList)) {
                        //有数据，拼模板

                        var source = $('#productList-list-template').html(),
                            template = Handlebars.compile(source);
                        that.html = template(that.jsonData);

                        setTimeout(function() {
                            if (that.jsonData.pageList.length < 20) {
                                //当数据少于that.setting.ajaxParams.pageSize时	
                                t.endPullupToRefresh(true);
                            } else {
                                t.endPullupToRefresh(false);
                                //去掉mui-pull-bottom-pocket的mui-hidden
                                //$('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                            }
                            that.page++;
                            $('.income').find('.contentWrapper .mui-table-view-cell').append(that.html);
                            $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                        }, 2000)

                    } else {
                        //显示没有数据
                        //没有数据
                        if (that.page == 1) {
                            //第一页时
                            $('.income .mui-table-view-cell').html(that.getElements.noData).css("boxShadow", "none");
                            $('.income').find('.noData').show();
                        } else {
                            //其他页
                            t.endPullupToRefresh(true);
                            $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                        }
                    }
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }]
            $.ajaxLoading(obj);
        },

        //初始化mui的上拉加载
        initMui: function() {
            var that = this;

            mui.init({
                pullRefresh: {
                    container: '.contentWrapper',
                    up: {
                        //auto: false,
                        contentrefresh: '拼命加载中',
                        contentnomore: '没有更多了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: function() {

                            //执行ajax请求
                            that.getData(this);
                        }
                    }
                }
            });

            //init后需要执行ready函数，才能够初始化出来
            mui.ready(function() {

                //隐藏当前的加载中loading
                if (!$('.list').hasClass('hasPullUp')) {
                    $('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                }

                //显示loading
                that.getElements.listLoading.show();

                //这一句初始化并第一次执行mui上拉加载的callback函数
                mui('.contentWrapper').pullRefresh().pullupLoading();

                //隐藏loading，调试接口时需要去掉
                setTimeout(function() {
                    that.getElements.listLoading.hide();
                }, 2000);


                //为$id添加hasPullUp  class
                $('.list').addClass('hasPullUp');
            });
        }

    }

    hisValue.init();

})