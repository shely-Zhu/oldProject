/*
 * @page: 其他资产(定融定投)
 * @Author: peicc
 * @Date:   2019-11
 * @Last Modified by:   songxiaoyu
 * @description:
 * 2019-9-10 待确认资产添加
 */
require('@pathNewCommonJsCom/utils.js');
//ajax调用
require('@pathNewCommonJs/ajaxLoading.js');
//zepto模块--callback
require('@pathNewIncludJs/vendor/zepto/callback.js');
//zepto模块--deferred
require('@pathNewIncludJs/vendor/zepto/deferred.js');
//路径配置文件
require('@pathNewIncludJs/vendor/config.js');
//下拉加载更多
// require('@pathNewCommonJs/scrollFullPage.js');
// 切换
require('@pathNewCommonJsCom/tabScroll.js');
require('@pathNewCommonJsCom/goTopMui.js');
require('@pathNewCommonJs/components/elasticLayer.js');
require('@pathNewCommonJs/components/elasticLayerTypeFive.js');
require('@pathNewCommonJs/components/headBarConfig.js');
//黑色提示条的显示和隐藏
var tipAction = require('@pathNewCommonJsCom/tipAction.js');


$(function() {
    var data = {
        getElements: {
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
        },
        gV: { //一些设置
            navList: [ //导航
                { type: '持有资产', num: '0' },
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
            navHeight: '', // nav高度
            totalCount: $(".totalM"), //总资产
            jAlready: $(".j_already"), //已持仓
            jTobe: $(".j_tobe"), //待确认
            jjsTotalAssetMask: null,
            jjsHoldAssetMask: null,
            jjsInTransitAssetMask: null

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
                    pageNo: that.gV.aP.pageNo, //当前第几页(默认为1) 非必填项, 默认设置成第一页
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
                        //但需要重置html的overflow

                        //var index = $('#slider .tab-scroll-wrap .mui-active').index();

                        // if( $("#move_"+that.gV.current_index+" .noData").length ){
                        //     //已经暂无数据了
                        //     $('html').addClass('hidden');
                        // }
                        // else{
                        //     $('html').removeClass('hidden');
                        // }
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
                that.gV.navHeight = that.gV.listToTop - that.gV.navToTop;
                that.height = windowHeight - that.gV.listToTop;

                that.htmlHeight = $('html').height() - $('.nav-wrapper').height();


                console.log('距顶部距离：' + that.gV.listToTop);

                //that.highHeight = windowHeight-that.gV.navHeight;

                that.highHeight = $('html').height() - that.gV.listToTop;
            }

            // if (!$('.list').hasClass('setHeight')) {

            //     $('.list').each( function( i, el){

            //         //判断当前ul高度
            //         var ulHeight = $(el).find(".mui-table-view").height();

            //         if( ulHeight < that.highHeight){
            //             $(el).height(that.highHeight).addClass('setHeight').addClass('noMove');
            //         }
            //         else{
            //             $(el).height(that.htmlHeight).addClass('setHeight');
            //         }

            //     })
            // }

            // 为实现滚动区域滚动到顶部，定位，添加遮罩层
            $('.scroll_mask').css('top', that.gV.listToTop)
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



                // mui(s).pullRefresh().disablePullupToRefresh()
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
                needLoading: false,
                callbackDone: function(json) {
                    try {
                        var jsonData = json.data,
                        pageList === jsonData.pageList;
                    } catch(err){
                        tipAction("1" + err.stack);
                    }
                    
                    if (!$.util.objIsEmpty(pageList)) {
                        try {
                            jsonData.already = that.gV.current_index == 0 ? 1 : 0;
                            jsonData.tobe = that.gV.current_index == 1 ? 1 : 0;
                            //待确认资产的到账状态 0未到账 1确认中 2部分到账 3足额到账 4超额到账 (3 4用黄色背景 其他情况用灰蓝色)
                            jsonData.accountStatus34 = ((jsonData.accountStatus == 3) || (jsonData.accountStatus == 4)) ? true : false; //其他资产未到账
                            var list_html = that.gV.list_template(jsonData);
                        } catch(err){
                            tipAction("2" + err.stack);
                        }

                        try {
                            //设置这两参数，在initMui()中使用
                            //判断是否显示没有更多了等逻辑，以及插入新数据
                            that.listLength = pageList.length;
                            that.html = list_html;
                            //重设当前页码
                            if (!$.util.objIsEmpty(pageList)) {
                                //设置每个ajax传参数据中的当前页码
                                that.gV.ajaxArr[that.gV.current_index].pageNo++;
                            }
                        } catch(err){
                            tipAction("3" + err.stack);
                        }
                    } else {
                        //没有数据
                        that.listLength = 0;
                        that.html = '';
                    }

                    //有数据
                    setTimeout(function() {

                        if (that.listLength < that.gV.aP.pageSize) {

                            if (that.gV.ajaxArr[that.gV.current_index].pageNo == 1) {
                                //第一页时
                                if (that.listLength == 0) {
                                    //没有数据
                                    $id.find('.list').html(that.getElements.noData.clone(false)).addClass('noCon');
                                    $id.find('.noData').show();

                                    //隐藏loading，调试接口时需要去掉
                                    setTimeout(function() {
                                        that.getElements.listLoading.hide();
                                    }, 100);
                                    t.endPullupToRefresh(true);

                                    //获取当前展示的tab的索引
                                    var index = $('#slider .tab-scroll-wrap .mui-active').index(),
                                        $list = $("#move_" + index + " .list");

                                    $list.height(that.highHeight).addClass('noMove');

                                    // if( $("#move_"+index+" .noData").length ){
                                    //     //已经暂无数据了
                                    //     $('html').addClass('hidden');
                                    // }
                                    // else{
                                    //     $('html').removeClass('hidden');
                                    // }

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

                        try {
                            $id.find('.contentWrapper .mui-pull-bottom-pocket').removeClass('mui-hidden');

                            if (that.gV.ajaxArr[that.gV.current_index].pageNo == 1) {
                                //第一屏
                                $id.find('.contentWrapper .mui-table-view-cell').html(that.html);
                            } else {
                                $id.find('.contentWrapper .mui-table-view-cell').append(that.html);
                            }
                        } catch(err){
                            tipAction("4" + err.stack);
                        }
                        
                        try {
                            //获取当前展示的tab的索引
                            var index = $('#slider .tab-scroll-wrap .mui-active').index(),
                                $list = $("#move_" + index + " .list");

                            if (!$list.hasClass('setHeight')) {

                                //$('.list').each( function( i, el){

                                //判断当前ul高度
                                var ulHeight = $list.find(".mui-table-view").height();

                                if (ulHeight < that.htmlHeight) {

                                    $list.height(that.highHeight).addClass('setHeight').addClass('noMove');
                                } else {
                                    $list.height(that.htmlHeight).addClass('setHeight');
                                }

                                //})
                            }
                        } catch(err){
                            tipAction("5" + err.stack);
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

                    //获取当前展示的tab的索引
                    // var index = $('#slider .tab-scroll-wrap .mui-active').index(),
                    //     $list = $("#move_"+index+" .list");

                    // $list.addClass('noMove');

                    //return false;
                },
                callbackNoData: function(json) {

                    //没有数据
                    $id.find('.mui-scroll .list').html(that.getElements.noData.clone(false)).addClass('noCon');
                    $id.find('.noData').show();

                    setTimeout(function() {
                        that.getElements.listLoading.hide();
                    }, 100);

                    //获取当前展示的tab的索引
                    var index = $('#slider .tab-scroll-wrap .mui-active').index(),
                        $list = $("#move_" + index + " .list");

                    $list.addClass('noMove');


                    //如果是其他资产页面
                    //if( window.location.href.indexOf('/wealthResources/otherAssets/views/jjsAssets.html') != -1){

                    //获取当前展示的tab的索引
                    //var index = $('#slider .tab-scroll-wrap .mui-active').index();

                    // if( $("#move_"+index+" .noData").length ){
                    //     //已经暂无数据了
                    //     $('html').addClass('hidden');
                    // }
                    // else{
                    //     $('html').removeClass('hidden');
                    // }
                    //}
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
                    that.gV.jjsHoldAssetMask = json.data.jjsHoldAssetMask;
                    that.gV.jjsInTransitAssetMask = json.data.jjsInTransitAssetMask;
                    that.gV.jjsTotalAssetMask = json.data.jjsTotalAssetMask;
                    that.gV.totalCount.html(json.data.jjsTotalAssetMask);
                    that.gV.jAlready.html('+' + json.data.jjsHoldAssetMask);
                    that.gV.jTobe.html(json.data.jjsInTransitAssetMask);
                },
            }];
            $.ajaxLoading(obj);
        },
        events: function() { //绑定事件
            var that = this;

            // 下拉
            mui("body")[0].addEventListener("swipedown", function(e) {

                //获取当前展示的tab的索引
                var index = $('#slider .tab-scroll-wrap .mui-active').index();

                if ($("#move_" + index + " .noData").length) {
                    //已经暂无数据了
                    $('body').css('transform', 'translate3d(0px, 0px, 0px) translateZ(0px)');

                    $('#slider .mui-slider-item').each(function(i, el) {
                        if (i != index) {
                            $(el).find('.goTopBtn').trigger('tap');
                        }
                    })
                }
            });


            //监听滚动事件，做下拉判断
            var move = true;

            document.querySelector('#slider').addEventListener('scroll', function(e, event) {

                //获取当前展示的tab的索引
                var index = $('#slider .tab-scroll-wrap .mui-active').index();
                var transformUl = $("#move_" + index + " .mui-table-view").css('transform');
                var t = $('.nav-wrapper')[0].getBoundingClientRect().top;


                //move为true，
                if (move && e.detail.lastY < 0) {

                    if ($("#move_" + index + " .list").hasClass('noMove')) {
                        return false
                    }

                    $('body').css('transform', transformUl);

                    var t = $('.nav-wrapper')[0].getBoundingClientRect().top;

                    if (t <= 10) {
                        $('.nav-wrapper').addClass('nav_fixed');
                        $('body').css('transform', 'translate3d(0px, -238px, 0px) translateZ(0px)');
                        move = false;
                    }

                } else if (!move && (e.detail.lastY > -30 && e.detail.lastY != 0)) { // 等于0是tab切换
                    $('.nav-wrapper').removeClass('nav_fixed');
                }

                if (e.detail.lastY == 0) {
                    //下拉
                    if (transformUl) {
                        var trans = transformUl.substring(transformUl.indexOf(','));

                        var transformNum = trans.substring(2, trans.indexOf('px'));

                        if (Number(transformNum) > -238) {
                            // 切换tab

                            $('body').css('transform', transformUl);

                            $('#slider .mui-slider-item').each(function(i, el) {
                                if (i != index) {
                                    $(el).find('.goTopBtn').trigger('tap');
                                }
                            })

                            move = true;
                        }
                    }
                }
            })

            // 头部文案提示(金钱展示隐藏)
            mui("body").on('tap', '.j_icon', function(e) {
                data.gV.totalCount.html('****');
                data.gV.jAlready.html('****');
                data.gV.jTobe.html('****');
                $(this).addClass('eyecose');
            })
            mui("body").on('tap', '.eyecose', function(e) {
                    data.gV.totalCount.html(data.gV.jjsTotalAssetMask);
                    data.gV.jAlready.html('+' + data.gV.jjsHoldAssetMask);
                    data.gV.jTobe.html(data.gV.jjsInTransitAssetMask);
                    $(this).removeClass('eyecose');
                })
                //打开资产组成说明
            mui("body").on('tap', '.assetsBtn', function(e) {
                    $('.mask').show();
                    $('.tipContainer').show();
                })
                //关闭资产组成说明
            mui("body").on('tap', '.buttonOne', function(e) {
                $('.mask').hide();
                $('.tipContainer').hide();
            })
        }
    };
    data.init();
});