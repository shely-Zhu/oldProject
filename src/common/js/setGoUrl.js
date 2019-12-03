
/**
 * 用法：onclick="setGoUrl(site_url.journal_url, '')"
 *
 * url -- 跳转过去的url
 *
 * htmdEvt -- 这个a链接埋点对应的属性值
 *
 * @author  yangjinlai 20191203
 */

window.setGoUrl = function( url, htmdEvt ){

	mui('body').on('mdClick', function(){
		window.locatin.href = url;
	}, {
		htmdEvt : htmdEvt
	})
} 