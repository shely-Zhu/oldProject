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


$(function () {

	var regulatory = {

		getElements: {
			accountName: $('#accountName'),  //公共账户名称
			name: $('#name'),  //公募账户名
			number: $('#number'),  //账号
			linenum: $('#linenum'), //行号
			openingBank: $("#openingBank"),  //开户行
			topc: $('#topc'),       //提示信息
		},

		webinit: function () {
			var that = this;

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

			var list = [{
				value: '110000',
				text: '每周',
				children: [{
					value: "110101",
					text: "周一"
				}, {
					value: "110102",
					text: "周二"
				},{
					value: "110103",
					text: "周三"
				}, {
					value: "110104",
					text: "周四"
				}, {
					value: "110105",
					text: "周五"
				},{
					value: "110106",
					text: "周六"
				}, {
					value: "110107",
					text: "周日"
				}]
			}, {
				value: '120000',
				text: '每二周',
				children: [{
					value: "120101",
					text: "周一"
				}, {
					value: "120102",
					text: "周二"
				}, {
					value: "120103",
					text: "周三"
				},{
					value: "120104",
					text: "周四"
				}, {
					value: "120105",
					text: "周五"
				}, {
					value: "120106",
					text: "周六"
				}, {
					value: "120107",
					text: "周日"
				}]
			}, {
				value: '130000',
				text: '每月',
				children: [{
					value: "130101",
					text: "1日"
				}, {
					value: "130102",
					text: "2日"
				}, {
					value: "130103",
					text: "3日"
				},{
					value: "130104",
					text: "4日"
				}, {
					value: "130105",
					text: "5日"
				}, {
					value: "130106",
					text: "6日"
				}, {
					value: "130107",
					text: "7日"
				},{
					value: "130108",
					text: "8日"
				}, {
					value: "130109",
					text: "9日"
				}, {
					value: "130110",
					text: "10日"
				},{
					value: "130111",
					text: "11日"
				}, {
					value: "130112",
					text: "12日"
				}, {
					value: "130113",
					text: "13日"
				}, {
					value: "13014",
					text: "14日"
				},{
					value: "130115",
					text: "15日"
				}, {
					value: "130116",
					text: "16日"
				}, {
					value: "130117",
					text: "17日"
				},{
					value: "130118",
					text: "18日"
				}, {
					value: "130119",
					text: "19日"
				}, {
					value: "130120",
					text: "20日"
				}, {
					value: "130121",
					text: "21日"
				},{
					value: "130122",
					text: "22日"
				}, {
					value: "130123",
					text: "23日"
				}, {
					value: "130124",
					text: "24日"
				},{
					value: "130125",
					text: "25日"
				}, {
					value: "130126",
					text: "26日"
				}, {
					value: "130127",
					text: "27日"
				}, {
					value: "130128",
					text: "28日"
				},{
					value: "130129",
					text: "29日"
				}, {
					value: "130130",
					text: "30日"
				}, {
					value: "130131",
					text: "31日"
				}]
			}, {
				value: '140000',
				text: '每日',
			}]


			// 周期选择
			$('body').on('tap','#starttime',function(){
				popPicker(2, list, $('#cycle'));
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
