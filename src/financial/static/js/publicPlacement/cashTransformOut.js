/**  
* @Page:  现金管理 -- 转出
* @Author: yangjinlai
* @Date:   2019-11-25
* 
*/

require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');

require('@pathCommonJs/components/headBarConfig.js');

require('@pathCommonCom/elasticLayer/transOutRule/transOutRule.js');


$(function () {

	var regulatory = {


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

			/** 下面三个事件： 银行卡列表出现/隐藏 **/
			$('body').on('tap','.onright-left',function(){
				$('.popup').css('display','block')
			}) 

			$('body').on('tap','.popup-close',function(){
				$('.popup').css('display','none')
			}) 

			$('body').on('tap','.popup-mask',function(){
				$('.popup').css('display','none')
			}) 


			//点击转出规则
			$('body').on('tap','.explain .right',function(){
				$('.elasticLayer.transOutRule').show()
			}) 
		},

		

	};
	//调用函数
	regulatory.webinit();

})
