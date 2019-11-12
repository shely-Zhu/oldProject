//  会员权益成长值记录
// @author caoqiahi 2019-11-11 

var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function(){
    var regulatory = {
        $e:{
            hotFundList: $('.content .li'), // 列表
            fundListTemp: $('#fundList-template'), // 模板赋值
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            noData: $('.noData'), //没有数据的结构
        },
        gV: {
            pageCurrent: 1, //当前页码，默认为1
            pageSize: 10,
            search: false, // 搜索
        },
        init:function(){
            var that = this;
            
            mui("#mui-progressbar").progressbar({progress:20}).show();

            that.beforeFunc();
            that.initMui(); // 兼容下面函数调用

			//
			// that.events();

        },
        beforeFunc: function(t) {
            var that = this;
            //设置切换区域的高度
            //计算节点高度并设置
            var height = window.innerHeight - $('.banner').height();
            console.log($('.content').hasClass('setHeight'))

            if (!$('.content').hasClass('setHeight')) {
                $('.content').height(height).addClass('setHeight');
            }
        },
        //初始化mui的上拉加载
        initMui: function() {
            var that = this
            
            mui.init({
                pullRefresh: {
                    container: '.content',
                    up: {
                        //auto: false,
                        contentrefresh: '拼命加载中',
                        contentnomore: '没有更多了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: function() {

                            // 热门诊断
                            that.getData(this);
                        }
                    }
                }
            });

            mui.ready(function() { //init后需要执行ready函数，才能够初始化出来

                //隐藏当前的加载中loading
                if (!$('.content').hasClass('hasPullUp')) {
                    $('.mui-pull-bottom-pocket').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                }

                //显示loading
                that.$e.listLoading.show();

                //这一句初始化并第一次执行mui上拉加载的callback函数
                mui('.content').pullRefresh().pullupLoading();

                //隐藏loading，调试接口时需要去掉
                //setTimeout(function(){
                that.$e.listLoading.hide();
                //}, 2000);


                //为$id添加hasPullUp  class
                $('.content').addClass('hasPullUp');
            });
        },
            //数据初始化
		getData:function(){
            

	       


		},
    }
    //调用函数
	regulatory.init();
})