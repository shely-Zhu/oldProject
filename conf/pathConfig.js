/**
 * 使命计划需求相关文件目录名，用于项目打包时区分处理
 *
 * @author yangjinlai 20191209
 */


module.exports = {

	//项目公用文件夹路径
 	commonPathVar: {
 		'@pathCommonCom': '/common/components', //include文件夹
 		'@pathCommonBase': '/common/base', //include文件夹
 		'@pathInclude': '/include', //include文件夹
 		'@pathIncludJs': '/include/js', //include文件夹
 		'@pathCommonJs': '/common/js', //common/js
 		'@pathCommonJsCom': '/common/js/components', //common/js/components
 		'@pathCommonJsComBus': '/common/js/components/businessUtil', // components/businessUtil
 		'@pathCommonLess': '/common/less', //common/less
 		'@pathCommonLessCom': '/common/less/components', // common/less/components
 		'@pathCommonViews': '/common/views', //common/views
 		//以下两个只是在js中用的，为zepto需要单独引入的库
 		'@callback': '/include/js/vendor/zepto/callback.js',
 		'@deferred': '/include/js/vendor/zepto/deferred.js',
 	},


 	//老路径和新路径的对应
 	newPathVar: {
 		//使命计划相关文件路径，webpack打包使用
 		'@pathNewCommonCom': '/newCommon/components', //include文件夹
 		'@pathNewCommonBase': '/newCommon/base', //include文件夹
 		'@pathNewInclude': '/allServerResources/include', //newInclude文件夹
 		'@pathNewIncludJs': '/allServerResources/include/js', //newInclude文件夹
 		'@pathNewCommonJs': '/newCommon/js', //newCommon/js
 		'@pathNewCommonJsCom': '/newCommon/js/components', //newCommon/js/components
 		'@pathNewCommonJsComBus': '/newCommon/js/components/businessUtil', // components/businessUtil
 		'@pathNewCommonLess': '/newCommon/less', //newCommon/less
 		'@pathNewCommonLessCom': '/newCommon/less/components', // newCommon/less/components
 		'@pathNewCommonViews': '/newCommon/views', //newCommon/views
 		//以下两个只是在js中用的，为zepto需要单独引入的库
 		'@newCallback': '/allServerResources/include/js/vendor/zepto/callback.js',
 		'@newDeferred': '/allServerResources/include/js/vendor/zepto/deferred.js',
 	},

 	//使命计划文件目录
	smjhArr: [ 'newCommon', 
 				'account', 
 				'life', 
 				'mine', 
 				'homePage', 
 				'financial', 
 				'allServerResources']
}



 