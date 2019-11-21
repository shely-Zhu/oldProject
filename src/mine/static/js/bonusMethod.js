/**
 * 修改分红方式页面 js
 * @author 蔡文琦  2019-11-20
 */
require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');

require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/components/elasticLayer.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function() {
	let somePage = {
		//获取页面元素
		$e: {
			typeOne:$('.type_one'),
			typeTwo:$('.type_two'),
			bonusType:$('.bonusType'),
			duigou:$('.duigou'),
		},
		//全局变量
		gV: {
			flag:1,
			bonusType:"红利再投资",
		},
		//页面初始化函数
		init: function() {
			var that = this;
			if(this.gV.flag == 1){
				console.log("1111")
				this.$e.duigou.eq(0).css('display','block');
				this.$e.duigou.eq(1).css('display','none');
				this.$e.bonusType.eq(0).text("现金分红(当前分红方式)");
				this.$e.bonusType.eq(1).text("红利再投资");
				this.gV.bonusType = "红利再投资";
			}else{
				this.$e.duigou.eq(0).css('display','none');
				this.$e.duigou.eq(1).css('display','block');
				this.$e.bonusType.eq(0).text("现金分红");
				this.$e.bonusType.eq(1).text("红利再投资(当前分红方式)");
				this.gV.bonusType = "现金分红";
			}
			this.events()
			this.initMui()
		},
		//初始化mui的上拉加载
		initMui: function() {
			var that = this;

			// mui.init({
			// 	pullRefresh: {
			// 		container: '.contentWrapper',
			// 		up: {
			// 			//auto: false,
			// 			contentrefresh: '拼命加载中',
			// 			contentnomore: '没有更多了', //可选，请求完毕若没有更多数据时显示的提醒内容；
			// 			callback: function() {
			// 				//执行ajax请求
			// 				that.getData(this);
			// 			}
			// 		}
			// 	}
			// });

			//init后需要执行ready函数，才能够初始化出来
			// mui.ready(function() {

			// 	//隐藏当前的加载中loading
			// 	if(!$('.list').hasClass('hasPullUp')) {
			// 		$('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
			// 	}

			// 	//显示loading
			// 	that.$e.listLoading.show();

			// 	//这一句初始化并第一次执行mui上拉加载的callback函数
			// 	mui('.contentWrapper').pullRefresh().pullupLoading();

			// 	//隐藏loading，调试接口时需要去掉
			// 	//setTimeout(function(){
			// 	that.$e.listLoading.hide();
			// 	//}, 2000);

			// 	//为$id添加hasPullUp  class
			// 	$('.list').addClass('hasPullUp');
			// });
		},
		//获取数据函数
		getData: function(t) {
			var that = this
			// $.ajaxLoading(obj);
		},
		changeBonusType:function(t){
			console.log(somePage.gV.flag)

			somePage.init()
			// t.init();
			console.log("aaaa");
			// this.gV.flag = !this.gV.flag;
		},
		//注册事件
		events: function() {
			let that = this;
			mui('body').on("tap",".type_one",function(e){
				that.gV.flag = 1;
				$.elasticLayer({
					id: "tip",
                    title: '',
					p: '<p>' + '修改分红方式为“<span>'+ that.gV.bonusType +'</span>”<br>分红方式确认前将不能再次修改</p>',
					yesTxt: '确定', 
					celTxt: '取消',
					zIndex: 100,
					callback:that.changeBonusType
				});
			})
			mui('body').on("tap",".type_two",function(e){
				that.gV.flag = 2;
				$.elasticLayer({
					id: "tip",
                    title: '',
					p: '<p>' + '修改分红方式为“<span>'+ that.gV.bonusType +'</span>”<br>分红方式确认前将不能再次修改</p>',
					yesTxt: '确定', 
					celTxt: '取消',
					zIndex: 100,
					callback:that.changeBonusType
				});
			})
		}
	};
	somePage.init();
});
