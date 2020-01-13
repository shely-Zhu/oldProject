/**
 * 调用埋点文件
 *
 * @author  yangjinlai 20191217
 */

//引入本项目所需的其他文件
var mdPathList = require('./evt/path/H5PathList.js');
var mdClickList = require('./evt/click/H5ClickList.js');
// var mdInfo = require('./evt/info/h5Info.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

//mdCallBack 是H5注册在window上的埋点回调函数，原生在接受到请求后会调用此callBack将数据以json的形式返回回来。
if (!window.mdCallBack){
	//防止重复注册回调函数 影响埋点
	window.mdCallBack = function(mdValue){
		//mdValue 原生的数据 json格式
		var pcParam = JSON.parse(mdValue);
	
		pcParam.cn = splitUrl['cn'] ? splitUrl['cn'] : '';
	
		var mdObj = {
			pf: 1, //pf参数，表示当前项目
			type: "app",  //pc/app/wap
			envMd: window.env, //当前环境变量
			mdPathList : mdPathList ,  //页面路径对应id配置，用于页面进入离开的埋点请求
			mdClickList: mdClickList,  //点击事件的id配置，用于点击事件时的埋点请求
			// mdInfo: mdInfo, //点击事件时，某些需要额外的参数是其他页面没有的，在这里单独获取并添加到evt的info里
			//除了埋点底层文件中配置的公用参数外，本项目埋点需要的其他参数，作为otherParam传过去，如没有可不传
			otherParams: pcParam
		}
		alert(JSON.stringify(mdObj));
		window._htmd && window._htmd(mdObj);
	};
}



//调用原生的函数 然后从 mdCallBack 回调中拿到原生的数据，合并H5的数据后发送到埋点服务器
if (window.isAndroid) {
	//这个是安卓操作系统
	window.jsObj.baseMd();
}
if (window.isIOS) { 
	//这个是ios操作系统
	window.webkit.messageHandlers.baseMd.postMessage("baseMd");
}