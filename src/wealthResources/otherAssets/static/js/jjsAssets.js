/*
 * @page: 其他资产(定融定投)
 * @Author: shiyunrui
 * @Date:   2019-7-3 11:54:51
 * @Last Modified by:   songxiaoyu
 * @description:
 * 2019-9-10 待确认资产添加
 */
require('@pathCommonJsCom/utils.js');
//ajax调用
require('@pathCommonJs/ajaxLoading.js');
//zepto模块--callback
require('@pathIncludJs/vendor/zepto/callback.js');
//zepto模块--deferred
require('@pathIncludJs/vendor/zepto/deferred.js');
//路径配置文件
require('@pathIncludJs/vendor/config.js');
//下拉加载更多
require('@pathCommonJs/scrollFullPage.js');
//立即绑定/暂不绑定弹层
require('@pathCommonJsCom/accountOrBind.js');
require('@pathCommonJsCom/bottomNav.js');
//下拉加载
require('@pathCommonJsCom/elasticLayer.js');
//恒天财富部分组件判断显示与隐藏
require('@pathCommonJsCom/chtwm/ifChtwm.js');
// 切换
require('@pathCommonJsCom/tabScroll.js');
require('@pathCommonJsCom/goTopMui.js');
//黑色提示条的显示和隐藏
var tipAction = require('@pathCommonJsCom/tipAction.js');


$(function() {
    var data = {
        getElements: {
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
        },
        gV: { //一些设置
            navList: [ //导航
                { type: '已持仓资产', num: '0' },
                { type: '待确认资产', num: '1' },
            ],
            aP: {
                pageNo: 1,
                pageSize: 10,
            },
            current_index: 0, //左右滑动区域的索引
            list_template: '', //列表的模板，生成后存放在这里
            ajaxArr: [], //存放每一个ajax请求的传参数据
            // 存放ajax请求地址  已持仓  待确认
            siteUrlArr: [site_url.queryAssetsDetailByPages_api, site_url.getJJSInTransitAssets_api], 
            listToTop: '', // 滑动区域距离顶部距离
            navToTop: '', // 滑动nav距离顶部距离
            totalCount: $(".totalCount"), //总资产
            jAlready: $(".j_already"), //已持仓
            jTobe: $(".j_tobe"), //待确认
        },
        html: '', //存放生成的html
        init: function() { //初始化函数
            var that = this;

            //拼模板，初始化左右滑动mui组件
            that.beforeFunc();

            //初始化第一屏区域的上拉加载
            that.initMui($('#scroll1'));

            that.getData();

            //事件监听
            that.events();
        },

        beforeFunc: function() { //拼模板，初始化左右滑动mui组件
            var that = this,
                contentArr = []; //传给tabScroll组件的contentList参数的数组

            // list内容模板
            var source = $('#second-template').html(),
                template = Handlebars.compile(source),
                list_html = template();

            //将生成的模板内容存到that.list_template上
            that.gV.list_template = template;

            // 外容器优先加载
            var wrap_source = $('#first-template').html(),
                wrap_template = Handlebars.compile(wrap_source),
                wrap_html = wrap_template({ content: list_html });

            $.each(that.gV.navList, function(i, el) {
                that.gV.ajaxArr[el.num] = {
                    pageNum: that.gV.aP.pageNo, //当前第几页(默认为1) 非必填项, 默认设置成第一页
                    pageSize: that.gV.aP.pageSize, //每页显示几条数据(默认10) 非必填项， 默认设置成20
                }

                contentArr.push({
                    id: i,
                    content: wrap_html
                })
            })

            var obj = {
                wrapper: $('.myAsset'), //存放整个组件的区域
                needNavAction: false,
                //needBlock: true,
                navList: that.gV.navList, //导航
                contentLength: that.gV.navList.length, //左右滑动的区域个数，即导航数组长度
                contentList: contentArr, //此时只有框架，实际列表内容还未请求
                callback: function(t) { //t返回的是 id 为 scroll1 / scroll2 这样的切换后当前区域中的节点

                    //data-scroll属性即当前左右切换区域的索引
                    var index = t.attr('data-scroll');

                    //data-scroll属性即当前左右切换区域的索引
                    that.gV.current_index = index;

                    //判断当前区域是否已经初始化出来上拉加载
                    if (t.hasClass('hasPullUp')) {
                        //有这个class，表示已经初始化，不再执行下一步
                        return false;
                    }

                    //没有hasPullUp class，表示没有初始化，调用initMui，进行初始化
                    //并请求第一次数据
                    that.initMui(t);
                }
            }
            $.tabScroll(obj);

            //此时所有切换区域的内容都是空的
            //设置切换区域的高度
            //计算节点高度并设置
            if (!that.height) {
                that.gV.listToTop = document.getElementById('scroll1').getBoundingClientRect().top;
                that.gV.navToTop = document.getElementById('slider').getBoundingClientRect().top;
                that.height = windowHeight - that.gV.listToTop;
            }

            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(that.height).addClass('setHeight');
            }

            // 为实现滚动区域滚动到顶部，定位，添加遮罩层
            // $('.scroll_mask').css('top', that.gV.listToTop)
        },

        initMui: function($id) {
            var that = this;
            w = $id.attr('id'),
                s = '#' + w + ' .contentWrapper';

            mui.init({
                pullRefresh: {
                    container: s,
                    up: {
                        contentrefresh: '拼命加载中',
                        contentnomore: '没有更多了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: function() {
                            //执行ajax请求
                            that.commonAjax($id, this, 'more');

                        }
                    }
                }
            });

            mui.ready(function() { //init后需要执行ready函数，才能够初始化出来

                //隐藏当前的加载中loading
                if (!$id.hasClass('hasPullUp')) {
                    $id.find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                }

                mui(".mui-slider").slider();

                //显示loading
                that.getElements.listLoading.show();

                //这一句初始化并第一次执行mui上拉加载的callback函数
                mui(s).pullRefresh().pullupLoading();

                //为$id添加hasPullUp  class
                $($id).addClass('hasPullUp');
            });

            // mui('.mui-slider').slider().stopped = true;
        },
        commonAjax: function($id, t) { // 获取产品数据的公用ajax方法;$id为各区域的 scroll+num id
            var that = this;

            //获取产品列表
            var obj = [{
                url: that.gV.siteUrlArr[that.gV.current_index],
                data: that.gV.ajaxArr[that.gV.current_index],
                needLogin: true,
                callbackDone: function(json) {
                    var jsonData = json.data,
                        pageList = jsonData.pageList;

                    if (!$.util.objIsEmpty(pageList)) {

                        jsonData.already = that.gV.current_index == 0 ? 1 : 0;
                        jsonData.tobe = that.gV.current_index == 1 ? 1 : 0;

                        var list_html = that.gV.list_template(jsonData);

                        //设置这两参数，在initMui()中使用
                        //判断是否显示没有更多了等逻辑，以及插入新数据
                        that.listLength = pageList.length;
                        that.html = list_html;

                        //重设当前页码
                        if (!$.util.objIsEmpty(pageList)) {
                            //设置每个ajax传参数据中的当前页码
                            that.gV.ajaxArr[that.gV.current_index].pageNum++;
                        }
                    } else {
                        //没有数据
                        that.listLength = 0;
                        that.html = '';
                    }

                    //有数据
                    setTimeout(function() {

                        if (that.listLength < that.gV.aP.pageSize) {

                            if (that.gV.ajaxArr[that.gV.current_index].pageNum == 1) {
                                //第一页时
                                if (that.listLength == 0) {
                                    //没有数据
                                    $id.find('.list .mui-table-view-cell').html(that.getElements.noData.clone(false)).addClass('noCon');
                                    $id.find('.noData').show();
                                    //隐藏loading，调试接口时需要去掉
                                    setTimeout(function() {
                                        that.getElements.listLoading.hide();
                                    }, 100);
                                    t.endPullupToRefresh(true);

                                    return false;
                                } else {
                                    //有数据，没有更多了
                                    t.endPullupToRefresh(true);
                                }
                            } else {
                                //其他页，没有更多了
                                t.endPullupToRefresh(true);
                            }
                        } else {
                            t.endPullupToRefresh(false);
                        }

                        $id.find('.contentWrapper .mui-pull-bottom-pocket').removeClass('mui-hidden');

                        if (that.gV.ajaxArr[that.gV.current_index].pageNum == 1) {
                            //第一屏
                            $id.find('.contentWrapper .mui-table-view-cell').html(that.html);
                        } else {
                            $id.find('.contentWrapper .mui-table-view-cell').append(that.html);
                        }

                        //隐藏loading
                        setTimeout(function() {
                            that.getElements.listLoading.hide();
                        }, 100);

                    }, 200)
                },
                callbackFail: function(json) {
                    //请求失败，
                    //隐藏loading
                    //that.getElements.listLoading.hide();
                    //显示错误提示
                    tipAction(json.message);

                    t.endPullupToRefresh(false);
                    $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');

                    //隐藏loading，调试接口时需要去掉
                    setTimeout(function() {
                        that.getElements.listLoading.hide();
                    }, 100);
                    //return false;
                },
                callbackNoData: function(json) {

                    //没有数据
                    $id.find('.mui-scroll .list').html(that.getElements.noData.clone(false)).addClass('noCon');
                    $id.find('.noData').show();

                    setTimeout(function() {
                        that.getElements.listLoading.hide();
                    }, 100);
                }
            }]
            $.ajaxLoading(obj);
        },
        getData: function() {
            var that = this;
            var obj = [{
                url: site_url.getJJSAssets_api, //查询总资产 从中拿到jjs的资产
                data: {},
                callbackDone: function(json) {
                    //拿到jjs资产并填充界面
                    that.gV.totalCount.html(json.data.jjsTotalAssetMask);
                    that.gV.jAlready.html('+'+json.data.jjsHoldAssetMask);
                    that.gV.jTobe.html(json.data.jjsInTransitAssetMask);
                },
            }];
            $.ajaxLoading(obj);
        },
        events: function() { //绑定事件
            var that = this;

            //跳转到转入转出详情页
            mui("body").on('tap', '.goTradeDetail', function() {

                if ($(this).attr('tradeType') == 1) { //买入
                    window.location.href = site_url.buyAndRedemptionDetails_url + '?combRequestNo=' + $(this).attr('combRequestNo') + '&tradeType=' + $(this).attr('tradeType');
                } else if ($(this).attr('tradeType') == 2) { //赎回
                    window.location.href = site_url.buyAndRedemptionDetails_url + '?combRequestNo=' + $(this).attr('combRequestNo') + '&tradeType=' + $(this).attr('tradeType') + '&combinRedemRatio=' + $(this).attr('combinRedemRatio');
                } else if ($(this).attr('tradeType') == 3) {
                    window.location.href = site_url.buyAndRedemptionDetails_url + '?combRequestNo=' + $(this).attr('combRequestNo') + '&tradeType=' + $(this).attr('tradeType');
                }
            })

            // 
            /*$(window).scroll(function(event){
                var e = $(window).scrollTop();

                mui("#scroll1").scroll({
                    scrollY:false,
                })

                if(e>that.gV.navToTop){
                    $('.nav-wrapper').addClass('nav_fixed');
                    $('.scroll_mask').hide();
                } else{
                    mui(".mui-scroll-wrapper").scroll({
                        scrollY:false,
                    })
                }

            });*/



        }
    };
    data.init();
});