/*产品亮点修改
 *根据地址栏中的src，展示图片
 *time 2018/5/31 zhangyanping
 */
//zepto模块
// require('@pathIncludJs/vendor/zepto/callback.js');
// require('@pathIncludJs/vendor/zepto/deferred.js');

var splitUrl = require('../../../common/js/components/splitUrl.js');

var prvPic={

	init:function(){

		var	src=splitUrl()['src'];

			var dom=document.getElementsByClassName('pic_img');
			    dom[0].setAttribute("src",src);
	
	}
}
prvPic.init()
