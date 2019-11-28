/**
 * 交易明细页面 js
 * @author 蔡文琦  2019-11-20
 */

require('@pathIncludJs/base.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/headBarConfig.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function() {
	let somePage = {
		//获取页面元素
		$e: {
            lis: $(".wrap li"),
		},
		//全局变量
		gV: {
		},
		//页面初始化函数
		init: function() {
			var that = this;  
			this.events()
		},
		//获取数据函数
		getData: function(t) {
			var that = this
			// $.ajaxLoading(obj);
		},
		//注册事件
		events: function() {
            let that = this;
            // $.each(mui(".wrap li"),(e,i)=>{
            //     $(i).on("tap",function(){
            //         console.log(e)
            //     })
            // })
            // this.$e.lis[0].onclick = function(){
            //     console.log("点击了第一个li标签")
            //     window.location.href = site_url.journal_url
            // }
            // mui('body').on('tap','li',function(a){
            //     console.log(a)
            //     if(a.srcElement.childNodes[1].data == "私募交易明细"){
            //         // window.location.href =
            //     }else if(a.srcElement.childNodes[1].data == "公募自选交易明细"){
            //         // window.location.href =
            //     }else if(a.srcElement.childNodes[1].data == "公募组合交易明细"){
            //         // window.location.href =
            //     }else{
            //         // window.location.href =
            //     }
            // })
            mui("li").on('tap',(a)=>{
                console.log(a)
            })
            // mui(".wrap li").eq(0).on("tap",function(){
            //     console.log(111)
            // })
            // this.$e.lis[1].onclick = function(){
            //     console.log("点击了第二个li标签")
            //      window.location.href =
            // }
            // this.$e.lis[2].onclick = function(){
            //     console.log("点击了第三个li标签")
            //      window.location.href =
            // }
            // this.$e.lis[3].onclick = function(){
            //     console.log("点击了第三个li标签")
            //      window.location.href =
            // }
		}
	};
	somePage.init();
});