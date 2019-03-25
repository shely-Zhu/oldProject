/**
 * 支行列表查询结果
 * @author yangjinlai 2017-02-15
 */


require('../js/components/utils.js');
require('../js/ajaxLoading.js');

module.exports = function (){
	
	var list = [];
	if( window.location.href.indexOf('realNameStepOne') != -1){
		var obj = [{
			url: site_url.branchInfoList_api,
			data: {
			    hmac:"", //预留的加密信息     
			    params:{//请求的参数信息
			        regionId: $('.provinceCitySelect').find('[check=provinceCitySelect]').attr('num'), // 省份(必须)			      
			        headBankNo: $('.bankSelect').find('[check=bankSelect]').attr('num'), // 银行编号(必须)    
			        branchName: $.trim($('.branchSearchInput').val())  ,  //关键字 ，非必填
				} 
			},
			needLogin: true,
			needDataEmpty: true,
			callbackDone: function(json){
				//将支行列表插入页面
				var html = '<ul class="mui-table-view">';
				var jsonData = json.data;
				if( !$.util.objIsEmpty( jsonData.bankNameInfoList) ){
					var pageList = jsonData.bankNameInfoList;
					$.each( pageList , function(i,el){
						html += '<li class="mui-table-view-cell" branchNo="'+el.branchBankNo+'" bankIdNo="'+el.headBankNo+'">' + el.branchBankName + '</li>';
					}) 
					html += '</ul>';
					$('.branchSearchArea .branchBody .without').hide();
					$('.branchSearchArea .branchBody .haveData').html('').show().append(html);
				}else{
					//没有数据
					$('.branchSearchArea .branchBody .haveData').html('').hide();
					$('.branchSearchArea .branchBody .without').show();
				}
				
				//$('.branchSearchArea').show();
			},
			callbackFail: function(json){
				//失败
				$('.againEnter').show().find('.tipWrapper').html(json.msg);
				setTimeout(function(){
		            $('.againEnter').hide();
		        }, 2000);
			},
			callbackNoData: function(json){
				//没有数据
				$('.branchSearchArea .branchBody .haveData').html('').hide();
				$('.branchSearchArea .branchBody .without').show();
			}
		}];
		$.ajaxLoading(obj);
	}
	
}
