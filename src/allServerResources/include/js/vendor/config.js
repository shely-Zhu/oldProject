/**
 * 各链接配置
 * @author purpleZhao 2016-12-30
 */



//引入项目公共的配置
require('@pathCommonJsCom/config/windowConfig.js');
//跳转链接
var goUrl = require('@pathCommonJsCom/config/goUrl.js');
// wap接口
var wapApi = require('@pathCommonJsCom/config/wapApi.js')
// pc和wap共用文件
var webApi = require('@pathCommonJsCom/config/webApi.js');



//声明site_url
window.site_url = {

	//这里是非公募，非私募，非joint，非跳转的接口和跳转链接配置
	//积分商城登录
  	authorization_api : http_url.oauth_url + '/authorization',
  	//积分商城确认登录
  	confirmLogin_api : http_url.oauth_url + '/confirmLogin',
  	//我的账户退出成功跳转链接
  	goMyAccount_url : http_url.htjf_url+'/getAuthURL.action?redirect_uri:'+http_url.htjf_url+'/apis/wx/user/toMyAccount.action',
  	//产品查询
	productSearch_api : 'http://jjs.chtwm.com/prdtq.do',
};

//将各接口和跳转链接附到site_url上
goUrl.call(site_url);
webApi.call(site_url);
wapApi.call(site_url);

