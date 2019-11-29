/**
 * 上拉加载公用组件
 *
 * @author yangjinlai 20191129
 *
 *  给jQuery插件扩展上拉加载方法，使用Mui上拉加载组件
    外部调用方式：$.elasticLayer(obj);
 */

 ;
 (function($, window, document, undefined) {

     $.extend($, {

         pullRefresh: function(options) {

             


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

                     that.yesEvent();
                 },


                 /*
                     生成弹层的DOM结构，并插入到容器中
                  */
                 creatDom: function() {
                     var that = this;

                     var html = '<div class="list"><div class="contentWrapper">' + 
                     	'<ul class="mui-table-view"><li class="mui-table-view-cell"></li>' ;

                     //判断是否需要显示回到顶部按钮
                     if( that.options.goTopBtn ){
                     	//为true时显示
                     	html += '<div class="goTopBtn iconfont"></div></ul></div></div>';
                     }
                     else {
                     	html += '</ul></div></div>';
                     }

                     //插入到容器中
                     that.options.wrapper.append(html);

                     that.$list = that.options.wrapper.find('.list');
                 },

                 //初始化mui
                 initMui: function(){

                 	mui.init({
                 		//上拉刷新配置
                 	    pullRefresh: {
                 	        container: that.options.wrapper.find('.contentWrapper'),
                 	        up: {
                 	            contentrefresh: '拼命加载中',
                 	            contentnomore: '没有更多了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                 	            callback: function() {

                 	                that.gV.aThis = this;
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
                 	    //setTimeout(function(){
                 	    that.getElements.listLoading.hide();
                 	    //}, 2000);


                 	    //为$id添加hasPullUp  class
                 	    $('.list').addClass('hasPullUp');
                 	});

                }

             }




             //初始化弹层
             var layer = new Layer(options);
             layer.init();

         }



     })


 })(Zepto, window, document);






module.exports = function(){

	var Pull = function(opts) {

	    this.$body = $('body'); //body元素

	    //默认参数
	    this.defaults = {

	    	wrapper: 'pullWrapper',  //不指定默认生成在 class为pullWrapper的节点里  

	        // id: 'elasticLayer', //弹层的唯一id 不传默认为elasticLayer，如果多个弹层的话要传，否则区分不了
	        // title: '尊敬的用户', //如果不传默认为'尊敬的用户'
	        // p: '',
	        // yesTxt: '确定', //确定按钮的文案，不传默认为确定
	        // celTxt: '取消', //返回按钮的文案，不传默认为返回
	        // zIndex: 10000000, //该弹层的z-index，因为不知道有几个弹层和弹层顺序，不传默认为100
	        // yesButtonPosition: 'right', //确定按钮在左边还是在右边，不传的话，默认为'left'，在左边，如果在右边，传'right'
	        // callbackCel: $.noop, //取消按钮的回调函数，默认为空
	        // callback: $.noop, //确定按钮的回调函数，默认为空(jQuery的空函数，仅仅想要传递一个空函数的时候可以使用)
	        // iconTxt: '', //icon的值
	        // iconType: 'green', //icon的颜色
	        // needYesHref: false, //是否需要把确定按钮改成a标签，默认false
	        // needCelHref: false, //是否需要把取消按钮改成a标签，默认false
	        // yesHref: 'javascript:;', //确定按钮a链接的默认href
	        // celHref: 'javascript:;', //取消按钮a链接的默认href
	    }

	    this.options = $.extend({}, this.defaults, opts)
	}

	//返回一个mui  上拉加载对象


	return pull
	
}
 
