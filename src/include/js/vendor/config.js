/**
 * 各链接配置
 * @author purpleZhao 2016-12-30
 */


/*如果想看在htjf-app里面非app用的页面而是wap迁移过来的页面，请将下面注释打开，*/
//私募接口
/*var privateApi = require('../../../common/js/components/config/privateApi.js');
//公募接口
var publicApi = require('../../../common/js/components/config/publicApi.js');
//
var jointApi = require('../../../common/js/components/config/jointApi.js');
// app里面私募掉公募接口
var crossApi = require('../../../common/js/components/config/crossInterface.js');*/





//引入项目公共的配置
require('../../../common/js/components/config/windowConfig.js');
//跳转链接
var goUrl = require('../../../common/js/components/config/goUrl.js');
// wap私募接口
var pefApi = require('../../../common/js/components/config/pefApi.js');
// wap公募接口
var pofApi = require('../../../common/js/components/config/pofApi.js');
// wap内容接口
var contentApi = require('../../../common/js/components/config/contentApi.js');
// wap账户相关
var accountApi = require('../../../common/js/components/config/accountApi.js');
// pc和wap共用文件
var webApi = require('../../../common/js/components/config/webApi.js');
// app相关
var appApi = require('../../../common/js/components/config/appApi.js')





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
},

//将各接口和跳转链接附到site_url上
goUrl.call(site_url);
pefApi.call(site_url);
pofApi.call(site_url);
accountApi.call(site_url);
contentApi.call(site_url);
webApi.call(site_url);
appApi.call(site_url);
//crossApi.call(site_url);

