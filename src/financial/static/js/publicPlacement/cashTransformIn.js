/**  
* @Page:  现金管理 -- 转入
* @Author: yangjinlai
* @Date:   2019-11-25
* 
*/

require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJsCom/tabScroll.js')
require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonCom/elasticLayer/transOutRule/transOutRule.js');
//黑色提示条
var tipAction = require('@pathCommonJs/components/tipAction.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js');


$(function () {

	var regulatory = {


		webinit: function () {
			var that = this;

			//
			that.getData();
			that.events();


		},
		getData: function () {
			var that = this;

			//请求页面数据
			var obj = [{
				url: site_url.pofCashToBuy_api,
				data: {
					fundCode: "003075"
				},
				callbackDone: function (json) {
					console.log(json);

					// var tplm = $("#dataLists").html();
					// var template = Handlebars.compile(tplm);
					// var html = template(json.data.pageList);
					// $("#cashListCon").html(html);

				},
				callbackFail: function (json) {
					tipAction(json.msg);
				}
			}]
			$.ajaxLoading(obj);
		},
		/*
				绑定事件
		 */
		events: function () {
			var that = this;

			/** 下面三个事件： 银行卡列表出现/隐藏 **/
			$('body').on('tap', '.onright-left', function () {
				$('.popup').css('display', 'block')
			})

			$('body').on('tap', '.popup-close', function () {
				$('.popup').css('display', 'none')
			})

			$('body').on('tap', '.popup-mask', function () {
				$('.popup').css('display', 'none')
			})


			//点击转出规则
			$('body').on('tap', '.explain .right', function () {
				$('.elasticLayer.transOutRule').show()
			})
		},



	};
	//调用函数
	regulatory.webinit();

})
