/**
 * 交易明细页面 js
 * @author 蔡文琦  2019-11-20
 */

require('@pathIncludJs/base.js');
require('@pathCommonJs/ajaxLoading.js');
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
			that.events()
		},
		//注册事件
		events: function() {
            let that = this;
            mui("body").on('tap','.wrap li',function(e){
                  var numAtr = $(this).attr('num');
                  if(numAtr == 1){
                        window.location.href=site_url.privateDetailList_url
                  }else if(numAtr == 2){
                        window.location.href=site_url.transactionRecords_url
                  }else if(numAtr == 3){
                        window.location.href=site_url.publicTransactionDetails_url
                  }else if(numAtr == 4){
                        window.location.href=site_url.transactionList_url
                  }           
            })
		}
	};
	somePage.init();
});