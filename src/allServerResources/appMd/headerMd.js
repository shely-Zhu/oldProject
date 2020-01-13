
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


//金服埋点需要的除底层文件中写的其他参数
var pcParam = {
	cn: '', //客户编号（sso接口返回，前端保存到cookie中）
}

pcParam.cn = splitUrl['cn'] ? splitUrl['cn'] : '';

if(window.location.href.indexOf('/homePage/views/fortuneCollege/wealthResearch.html') != -1){ // 财富研究
    if (window.isAndroid && window.jsObj) {
        //这个是安卓操作系统
        var md =  window.jsObj.baseMd();
        md && $.extend({}, pcParam, md);
    }
    if (window.isIOS && window.webkit) {
        //这个是ios操作系统
        var md = window.webkit.messageHandlers.baseMd.postMessage("baseMd" )
        md && $.extend({}, pcParam, md);
    }
}

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


window._htmd && window._htmd(mdObj);

