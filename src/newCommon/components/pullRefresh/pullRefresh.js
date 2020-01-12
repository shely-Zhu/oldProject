/**
 * 上拉加载公用组件
 *
 * @author yangjinlai 20191129
 *
 *  给jQuery插件扩展上拉加载方法，使用Mui上拉加载组件
    外部调用方式：$.pullRefresh(obj);
 */

require('@pathCommonJsCom/utils.js');
var alwaysAjax = require('@pathCommonJs/components/alwaysAjax.js');
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
                     that.creatDom();

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
                     }
                     else {
                     	html += '</div></div>';
                     }

                     //插入到容器中
                     that.options.wrapper.append(html);

                     that.options.wrapper.find('.contentWrapper').height('100%');

                     // that.$list = that.options.wrapper.find('.list');
                 },

                //处理返回的数据
                 dealData: function( t, data, pageCurrent ){

                    var that = this;

                    //data为空时，显示暂无数据
                    if( $.util.objIsEmpty(data) && pageCurrent == 1){
                        // 暂无数据显示
                        $('.without.noData').show();
                    }
                    else{

                        if (data.length < that.options.pageSize) {
                            
                            // that.gV.isBottomFlag = true
                            
                            if ( pageCurrent == 1) { //第一页时
                                
                                if (data.length == 0) {
                                    
                                    // 暂无数据显示
                                    $('.without.noData').show();
                                    return false;
                                } else { 
                                    // 其他页，没有更多数据了
                                    t.endPullupToRefresh(true);
                                }
                            } else {
                                //其他页-没有更多数据
                                t.endPullupToRefresh(true);
                            }
                        } else { // 还有更多数据
                            t.endPullupToRefresh(false);
                        }

                        that.options.wrapper.find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                        
                        that.options.showTemplate && generateTemplate(data, that.options.wrapper.find('.mui-table-view-cell'), that.options.template)

                        //懒加载
                        $(".lazyload").lazyload()
                        
                        //无限滚动
                        that.alwaysAjax( that.options.wrapper.find('.mui-table-view-cell') )
                    }
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

                    //var tops = parseInt(-100);

                    //点击下按钮，显示弹框
                    // var classNames = className ? className : ".contentWrap"
                    // var pullupLoadingNames = pullupLoadingName ? pullupLoadingName : ".contentWrapper"
                    // var tops = parseInt(cutNumber?cutNumber:-100); 
                    // if ( $el.length > 0) {
                        
                        /*$(document).scroll(function() {
                            // 滚动距离 Math.abs($(classNames).offset().top - 64)
                            // 容器高度 $(classNames).parent().parent().height()
                            if ( $el.offset().top < tops) {

                                if( !that.options.wrapper.find('.mui-pull-caption-nomore').length ){
                                    tops -= 800;
                                    mui( that.options.wrapper.find('.contentWrapper')).pullRefresh().pullupLoading();
                                }
                                
                            } 
                        });*/
                    // }
                 },
                 failData: function(t, data, pageCurrent) {
                    if(data.status == 1000) {
                        t.endPullupToRefresh(true);
                        if(pageCurrent == 1) {
                            $(".noData").show()
                        }
                    } else {
                        tipAction(data.message)
                    }
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
                                        console.log( "失败", defData );

                                        //that.dealData( t, defData, pageCurrent);
                                        that.failData(t, defData, pageCurrent)
                                        
                                    })
                                    .done(function( defData, pageCurrent ) {
                                        //成功状态
                                       console.log( "成功", defData );

                                       //处理数据
                                       that.dealData( t, defData, pageCurrent);
                                    })

                                    //请求数据
                                    // var data = that.options.callback( this, def );

                 	                // that.gV.aThis = this;

                 	                // that.getData(this);

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
                 	    mui('.contentWrapper').pullRefresh().pullupLoading();

                 	    //隐藏loading，调试接口时需要去掉
                 	    //setTimeout(function(){
                 	    // $('.listLoading').hide();
                 	    //}, 2000);


                 	    //初始化后，为$id添加hasPullUp  class
                 	    that.options.wrapper.addClass('hasPullUp');
                 	});

                }

             }

             //初始化弹层
             var pullUp = new Pull(options);
             pullUp.init();

         }

     })


 })(Zepto, window, document);
