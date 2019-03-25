
/*
 * @page: 查询所有省信息接口,省市是一个接口
 * @接口地址:http://wiki.htmz.com/pages/viewpage.action?pageId=7018812#V7.19月份需求接口文档-8查询所有省信息
 * @Author: songxiaoyu
 * @Date:   2018-09-04 14:12:52
 * 
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-09-05 17:39:35
 * @description: 银行卡相关接口换为crm接口，省市分开
 */


/*********************************各地区名的配置数组*****************************/
require('../js/components/utils.js');
require('../js/ajaxLoading.js');
var pvnList = [];
if( window.location.href.indexOf('realNameStepOne') != -1){
	var obj = [{
		url: site_url.provinceList_api,
		data: {
		    hmac:"", //预留的加密信息     
		    params:{//请求的参数信息
		        
		    } 
		},
		needLogin: true,
		async: false,
		callbackDone: function(json){
			//保存获取到的银行信息	
			var jsonData = json.data;

			if( !$.util.objIsEmpty( jsonData) ){
				var list=[];
				var pageList = jsonData;
				
				$.each( pageList, function(i, el){
					var pvnObj={};
					pvnObj.name = el.regionName;
					pvnObj.id = el.code;
					list.push(pvnObj);
				})
			}
			$.each(list, function(i, el){
				pvnList.push({
					value: el.id,
					text: el.name,
				})
			})
		},
		callbackFail: function(json){
			
		}
	}];
	$.ajaxLoading(obj);
}
module.exports=pvnList;

