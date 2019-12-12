/**
 * 上拉加载公用组件
 *
 * @author yangjinlai 20191129
 *
 *  给jQuery插件扩展上拉加载方法，使用Mui上拉加载组件
    外部调用方式：$.pullRefresh(obj);
 */

require('@pathCommonJsCom/utils.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
require('@pathCommonJsCom/goTopMui.js');


 ;
 (function($, window, document, undefined) {

    $.extend($, {
        pullRefresh: function(options) {
            var Pull = function(opts) {
                this.$body = $('body'); //body元素
                //默认参数
                this.defaults = {
                    wrapper: $('.list'), //上拉加载的容器，不传默认为listWrap
                    goTopBtn: true, //是否需要回到顶部按钮，默认为true，显示
                    callback: function() {}, //上拉的回调函数，默认为空函数
                    pageSize: 10, //一页默认10条
                    pageCurrent: 1, //默认从第一页开始
                    template: $('#listTemplate'), //列表渲染使用的template
                    class: '', //额外添加的class
                    showTemplate: true, //默认使用组件里引用的generateTemplate方法渲染组件
                    ajaxArr: [], // tab请求路径数组
                    lazyClassArr: [] // 上拉加载容器类名数组
                }
                this.options = $.extend({}, this.defaults, opts)
            }
            Pull.prototype = {
                /*
                    初始化
                    进行弹层结构的生成并插入，绑定各事件等
                */
                init: function() {
                    var that = this;
                    //生成结构并插入
                    //that.creatDom();
                    //初始化mui
                    that.initMui();
                },
                /*
                    生成弹层的DOM结构，并插入到容器中
                    mui-table-view-cell 是 放置列表容器的地方
                */
                creatDom: function() {
                    var that = this;
                    var html = '<div class="contentWrapper">' + 
                     	'<div class="mui-table-view"><div class="mui-table-view-cell '+ that.options.class +'"></div>' ;
                    //判断是否需要显示回到顶部按钮
                    if( that.options.goTopBtn ){
                        //为true时显示
                     	html += '<div class="goTopBtn iconfont"></div></div></div>';
                    } else {
                     	html += '</div></div>';
                    }
                    //插入到容器中
                    that.options.wrapper.append(html);
                    that.options.wrapper.find('.contentWrapper').height('100%');
                 },
                //处理返回的数据
                dealData: function( t, data, pageCurrent, html, currentIndex, $id, highHeight ){
                    var that = this;
                    //that.listLength  是上面ajax 请求完数据  赋值的 长度 作为判断的依据
                    that.listLength = data.length;
                    if (that.listLength < that.options.pageSize) {
                        if (that.options.ajaxArr[currentIndex].pageCurrent == 1) {
                            //第一页时
                            if (that.listLength == 0) {
                                //没有数据
                                t.endPullupToRefresh(false);
                                $id.find('.list').html($('.without.noData').clone(false)).addClass('noCon');
                                $id.find('.noData').show();
                                //隐藏loading，调试接口时需要去掉
                                setTimeout(function() {
                                    $('.listLoading').hide();
                                }, 100);
                                t.endPullupToRefresh(true);
                                //获取当前展示的tab的索引
                                var index = $('#slider .tab-scroll-wrap .mui-active').index(),
                                    $list = $("#move_" + index + " .list");
                                $list.height(highHeight).addClass('noMove');
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
                    if (that.options.ajaxArr[currentIndex].pageCurrent == 1) {
                        //第一屏
                        $id.find('.contentWrapper .mui-table-view-cell').html(html);
                        for(var i = 0 ; i < that.options.lazyClassArr.length; i++) {
                            $("." + that.options.lazyClassArr[i]).lazyload()
                        }
                        that.alwaysAjax($('#' + $id.attr('id') + ' .mui-table-view-cell'))
                    } else {
                        $id.find('.contentWrapper .mui-table-view-cell').append(html);
                        for(var i = 0 ; i < that.options.lazyClassArr.length; i++) {
                            $("." + that.options.lazyClassArr[i]).lazyload()
                        }
                        that.alwaysAjax($('#' + $id.attr('id') + ' .mui-table-view-cell'))
                    }
                    //获取当前展示的tab的索引
                    var index = $('#slider .tab-scroll-wrap .mui-active').index(),
                        $list = $("#move_" + index + " .list");
                    if (!$list.hasClass('setHeight')) {
                        //判断当前ul高度
                        var ulHeight = $list.find(".mui-table-view").height();
                        if (ulHeight < that.htmlHeight) {
                            $list.height(highHeight).addClass('setHeight').addClass('noMove');
                        } else {
                            $list.height(highHeight).addClass('setHeight');
                        }
                    }
                    //隐藏loading
                    setTimeout(function() {
                        $(".listLoading").hide();
                    }, 100);
                },
                alwaysAjax: function( $el ){
                    var that = this;
                    // 滚动区域结构关系（由父到子） wrapper → contentWrapper → mui-table-view → mui-table-view-cell
                    $(document).scroll(function() {
                        // $(".mui-table-view").height()   // 滚动内容高度
                        // $(".wrapper").height()             // 滚动区域高度
                        // Math.abs($el.offset().top-(window.screen.height - $(".wrapper").height()))    // 滚动高度
                        // 滚动内容高度 = 滚动区域高度 + 滚动高度
                        var scrollTop = Math.abs($el.offset().top-(window.screen.height - that.options.wrapper.height()))
                        var diff = $el.parent().height() - that.options.wrapper.height() - scrollTop
                        // 设置距离底部还剩300px时加载下一页
                        if(diff <= 400) { 
                            if( !that.options.wrapper.find('.mui-pull-caption-nomore').length ){
                                mui( that.options.wrapper.find('.contentWrapper')).pullRefresh().pullupLoading();
                            }
                        }
                    })
                 },
                 //初始化mui
                 initMui: function(){
                    var that = this;
                 	mui.init({
                 		//上拉刷新配置
                 	    pullRefresh: {
                 	        container: that.options.wrapper.find('.contentWrapper'),
                 	        up: {
                 	            contentrefresh: '拼命加载中',
                 	            contentnomore: '没有更多了', 
                 	            callback: function() {
                                    var t = this;
                                    //声明一个deferred对象，用于接口里判断接口成功失败状态
                                    var def = $.Deferred();
                                    //发送请求
                                    that.options.callback(def);
                                    $.when(def)
                                    .fail(function( defData, pageCurrent ) {
                                        //失败状态
                                        that.failData( t, defData, pageCurrent); 
                                    })
                                    .done(function( defData, pageCurrent, html, currentIndex, $id, highHeight ) {
                                        //成功状态 处理数据
                                       that.dealData( t, defData, pageCurrent, html, currentIndex, $id, highHeight);
                                    })
                 	            }
                 	        }
                 	    }
                 	});
                 	//init后需要执行ready函数，才能够初始化出来
                 	mui.ready(function() {
                 	    //隐藏当前的加载中loading
                 	    if (!that.options.wrapper.hasClass('hasPullUp')) {
                 	        that.options.wrapper.find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                 	    }
                 	    //显示loading
                 	    $('.listLoading').show();
                 	    //这一句初始化并第一次执行mui上拉加载的callback函数
                        console.log(that.options.wrapper.find('.contentWrapper'))
                 	    mui(that.options.wrapper.children('.contentWrapper')).pullRefresh().pullupLoading();
                 	    //隐藏loading，调试接口时需要去掉
                 	    //setTimeout(function(){
                 	    $('.listLoading').hide();
                 	    //}, 2000);
                 	    //初始化后，为$id添加hasPullUp  class
                 	    that.options.wrapper.addClass('hasPullUp');
                 	});
                },
                failData(t, json) {
                    tipAction(json.message);
                    t.endPullupToRefresh(false);
                    $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                    //隐藏loading，调试接口时需要去掉
                    setTimeout(function() {
                        $(".listLoading").hide();
                    }, 100);
                },
            }
             //初始化弹层
            var pullUp = new Pull(options);
            pullUp.init();
        }
     })
})(Zepto, window, document);
