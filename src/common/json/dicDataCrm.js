/**
 * 多金字典查询
 * @author zhangweipeng 2017-05-22
 */


require('../js/components/utils.js');
require('../js/ajaxLoading.js');

module.exports=function(dicNo,num,namelist){
	if( window.location.href.indexOf('realNameStepOne') != -1 || window.location.href.indexOf('bassMessage') != -1){
		var obj = [{
			url: site_url.queryCrmDataDictionary_api,
			data: {
			    hmac:"", //预留的加密信息     
			    params:{//请求的参数信息
			        dicNo:dicNo,//数据字典编码
					// keyNo:"",//crm字典key（非必填）
					// djKeyNo:"",//多金字典key（非必填）
					// gmKeyNo:""//公募字典key（非必填）    
				} 
			},
			needLogin: true,
			async: false,
			callbackDone: function(json){
				//保存获取到的银行信息	
				var jsonData = json.data;
				if( !$.util.objIsEmpty( jsonData) ){
					$.each( jsonData, function(i, el){
						if(num==el.keyNo){ //主要针对有选中状态的弹出层
							if(dicNo=="1017"){
								namelist.push({
									value: el.keyNo,
									text: el.keyValue,
									select:true,
									sonDicNo:el.sonDicNo
								})	
							}else{
								namelist.push({
									value: el.keyNo,
									text: el.keyValue,
									select:true,
								})	
							}
						}else{
							if(dicNo=="1017"){
								namelist.push({
									value: el.keyNo,
									text: el.keyValue,
									sonDicNo:el.sonDicNo,
								})	
							}else{
								namelist.push({
									value: el.keyNo,
									text: el.keyValue,
								})	
							}	
						}
					})
				}		
				return namelist
			},
		}];
		$.ajaxLoading(obj);
	}
}