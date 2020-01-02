
/**
 * 用法：onclick="setGoUrl(site_url.journal_url, '')"
 *
 * url -- 跳转过去的url
 *
 * htmdEvt -- 这个a链接埋点对应的属性值
 *
 * @author  yangjinlai 20191203
 */

window.setGoUrl = function(url, htmdEvt ){

	//发送埋点请求
	window._submitMd && window._submitMd( 3, htmdEvt );

	window.location.href = url;

	// mui('body').on('mdClick', that,  function(){
	// 	window.location.href = url;
	// }, {
	// 	htmdEvt : htmdEvt
	// })
} 