/**  
* @Page:  购买触发提示
* @Author: caoqihai  
* @Date:   2019-11-30
* 
*/


$(function () {

	var regulatory = {

		getElements: {

		},
		gV: {


		},
		webinit: function () {
			var that = this;

			that.events();

		},

		/*
				绑定事件
		 */
		events: function () {

            var  maskheight =  window.innerHeight - $('.tips-content').height();

            $('.tips-mask').height(maskheight)

			// 弹窗 隐藏
			$('body').on('tap', '.icontips-close', function () {
				$('.tips').css('display', 'none')
			})

			$('body').on('tap', '.tips-mask', function () {
				$('.tips').css('display', 'none')
			})

		},


	};
	//调用函数
	regulatory.webinit();

})
