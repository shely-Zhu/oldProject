/*产品亮点修改
 *根据地址栏中的src，展示图片
 *time 2018/5/31 zhangyanping
 */

var splitUrl = require('@pathCommonJsCom/splitUrl.js');

var prvPic={

	init:function(){

		var	src=splitUrl()['src'];

			$("img").attr("src",src);
	
	},
}
prvPic.init()
