
var splitUrl = require('../../../common/js/components/splitUrl.js'); 


//判断url上的hasAuth
var arr = splitUrl();
var hasAuth = arr['hasAuth'];
if( hasAuth == 'true'){
	//跳转到积分商城
	window.location.href = arr['redirectUrl'] + '?openid=' + arr['openid'];
}