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
var popPicker = require('@pathCommonJsCom/popPicker.js');
var provinceList = require('../../../../common/json/provinceList.js');


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
			document.getElementById('starttime').addEventListener('tap', function () {
				option = { "type": "date", "beginYear": "1980", "endYear": "2030" };
				var picker = new mui.DtPicker(option);
				picker.show(function (rs) {
					console.log(rs.text)
					// document.getElementById('starttime').innerHTML = rs.text;
				});
			}, false);


			//选择银行卡
			document.getElementById('bank').addEventListener('tap', function () {
				popPicker(1, provinceList, $('.onright .onright-left-one i'))
			}, false);

			// $('body').on('tap','.mui-poppicker-btn-cancel',function(){
			// 	$('.mui-poppicker').css('display','none')
			// }) 

		},

		

	};
	//调用函数
	regulatory.webinit();

})
