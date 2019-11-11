/**
* 登录日志查询
* @author 蔡文琦  2019-11-11
*/
require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js'); 
require('@pathIncludJs/vendor/zepto/deferred.js'); 

require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
$(function(){
	let somePage = {
		//获取页面元素
		$e:{
			listWrap:$(".list-wrap"),
			isLogin:$(".isLogin")
		},
		//全局变量
		gV:{},
		//页面初始化函数
		init:function(){
			//启用事件处理
			this.events()
			var that = this;
//			this.$e.listWrap.html("dsadsadsa")
			$.each(this.$e.isLogin, (index,item)=> {
				if($(item).html()=="退出"){
					$(item).css({color:"red"})
					console.log($(item))
				}
			});
		},
		//初始化mui的上拉加载
		initMui: function(){
			var that = this;

            var height = windowHeight;
            if (!this.$e.listWrap.hasClass('setHeight')) {
               this.$e.listWrap.height(height).addClass('setHeight');
            }

            mui.init({
                pullRefresh: {
                    container: '.mui-table-view',
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
                if (!this.$e.listWrap.hasClass('hasPullUp')) {
                    this.$e.listWrap.find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                }

                //显示loading
                that.$e.listLoading.show();

                //这一句初始化并第一次执行mui上拉加载的callback函数
                mui('.contentWrapper').pullRefresh().pullupLoading();

                //隐藏loading，调试接口时需要去掉
                //setTimeout(function(){
                that.$e.listLoading.hide();
                //}, 2000);


                //为$id添加hasPullUp  class
                $('.list').addClass('hasPullUp');
            });
		},
		//获取数据函数
		getData: function(t){},
		//注册事件
		events: function(){
			let that = this;
			$('.iconfont').on('tap', function(el) {
				console.log("1111111")
			})
		}
	};
	somePage.init();
});
