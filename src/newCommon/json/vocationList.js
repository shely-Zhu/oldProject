/**
 * 职业类型查询
 * @author zhangweipeng 2017-05-22
 */


require('../js/components/utils.js');
require('../js/ajaxLoading.js');
if( window.location.href.indexOf('realNameStepOne') != -1 || window.location.href.indexOf('bassMessage') != -1){
	var list = [];
	var obj = [{
		url: site_url.queryCrmDataDictionary_api,
		data: {
		    hmac:"", //预留的加密信息     
		    params:{//请求的参数信息
		        keyNo:"1020",//数据字典key
				sysName:"TA"//系统名称    
			} 
		},
		needLogin: true,
		async: false,
		callbackDone: function(json){
			//保存获取到的银行信息	
			var jsonData = json.data;
			if( !$.util.objIsEmpty( jsonData) ){
				$.each( jsonData, function(i, el){
					if(!(el.keyValue=="#")){
						list.push({
							value: el.keyValue,
							text: el.caption
						})
					}					
				})
			}
		},
		     	
	}];
	$.ajaxLoading(obj);
	module.exports = list;
}