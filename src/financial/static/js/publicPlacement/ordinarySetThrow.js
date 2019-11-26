/**  
* @Page:  普通基金产品详情页_定投
* @Author: caoqihai  
* @Date:   2019-11-23
* 
*/

require('@pathIncludJs/vendor/config.js');

require('@pathIncludJs/vendor/mui/mui.picker.min.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');

require('@pathCommonJs/components/headBarConfig.js');

//黑色提示条
var tipAction = require('@pathCommonJs/components/tipAction.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayer.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js');
//引入复制功能
// var Clipboard = require('clipboard');
//引入下拉列表选择器
var popPicker = require('@pathCommonJsCom/popPicker.js');

var provinceList = require('../../../../common/json/cycle.js');


$(function () {

	var regulatory = {

		getElements: {
			accountName: $('#accountName'),  //公共账户名称
			name: $('#name'),  //公募账户名
			number: $('#number'),  //账号
			linenum: $('#linenum'), //行号
			openingBank: $("#openingBank"),  //开户行
			topc: $('#topc'),       //提示信息
			fundName:$(".title .fundName") , //基金名称
			fundCode:$(".title .fundCode") , //基金代码
		},
		gV:{
			scheduledProtocolId:splitUrl['scheduledProtocolId'] ? splitUrl['scheduledProtocolId'] : null,
		},
		webinit: function () {
			var that = this;
			this.getElements.fundName.html(this.gV.fundName)
			this.getElements.fundCode.html(this.gV.fundCode)
			//
			that.events();

		},

        /*
            绑定事件
         */
		events: function () {
			var that = this;

			//开始时间
			// document.getElementById('starttime').addEventListener('tap', function () {
			// 	option = { "type": "date", "beginYear": "1980", "endYear": "2030" };
			// 	var picker = new mui.DtPicker(option);
			// 	picker.show(function (rs) {
			// 		console.log(rs.text)
			// 		// document.getElementById('starttime').innerHTML = rs.text;
			// 	});
			// }, false);



			// 周期选择
			$('body').on('tap','#starttime',function(){
				popPicker(2, provinceList, $('#cycle'));
			}) 

			// 银行卡 弹出
			$('body').on('tap','.onright-left',function(){
				$('.popup').css('display','block')
			}) 

			// 银行卡 隐藏
			$('body').on('tap','.popup-close',function(){
				$('.popup').css('display','none')
			}) 

			$('body').on('tap','.popup-mask',function(){
				$('.popup').css('display','none')
			}) 

		},

		

	};
	//调用函数
	regulatory.webinit();

})
