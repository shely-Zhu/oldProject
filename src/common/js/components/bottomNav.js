/**
 * 底部导航js
 * @author yangjinlai 2017-04-06
 * 
 */

 //ajax调用
 require('../../../common/js/ajaxLoading.js'); 
 //zepto模块--callback
 require('../../../include/js/vendor/zepto/callback.js'); 
 //zepto模块--deferred
 require('../../../include/js/vendor/zepto/deferred.js'); 
//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');
//弹框
require('../../../common/js/components/elasticLayer.js');
var Base64=require('../../../include/js/vendor/base64/base64.js');

 //判断当前页面，导航添加选中颜色
 var url = window.location.href;
 if(envOrigin == 1 ){
 	$(".indexPage").on("click",function(){
 		window.location.href="/mobilePage/views/homePage.html"
 	});
 }else{
 	$(".indexPage").on("click",function(){
 		window.location.href=site_url.cft_index_url;
 	});
 }
 if( url.indexOf('index/views/index.html') != -1 || url.indexOf('mobilePage/views/homePage.html') != -1){
     //首页
     document.querySelectorAll('.bottomNavBtn')[0].style.color = '#f4cf5c';
 }

 if( url.indexOf('productPublic/views/publicList.html') != -1 
 	|| url.indexOf('productPrivate/views/prdPrvLists.html') != -1 || url.indexOf('productPrivate/views/prvIndex.html') != -1 ){
     //产品
     document.querySelectorAll('.bottomNavBtn')[1].style.color = '#f4cf5c';
 }

 if( url.indexOf('personal/views/myAsset.html') != -1 ||
     url.indexOf('pay/views/payThemeCash.html') != -1 || 
     url.indexOf('/personal/views/pledge.html') != -1){
     //交易
     document.querySelectorAll('.bottomNavBtn')[2].style.color = '#f4cf5c';
 }

 if( url.indexOf('personal/views/accountMerge.html') != -1 ){
     //我的
     document.querySelectorAll('.bottomNavBtn')[3].style.color = '#f4cf5c';
 }
$(".productUrl").on("click",function(){
	if(envOrigin==1){//财富
		window.location.href = site_url.htcf_prvIndex_url;
	}else{
		window.location.href=site_url.prvIndex_url;
	}
})
var clickBottom = false; 
$('.bottomNav .bottomEleAsset, .bottomNav .bottomEleMine').on('click', function(e){

	if( clickBottom ){
		//不重复发送请求
		return false;
	}

	clickBottom = true;

	//点击的是我的/交易，需要判断登录状态
	var obj = [{
		url: site_url.user_api,
		data: {    
			hmac:"", //预留的加密信息     
			params:{//请求的参数信息 
		    }
		},
		needLogin: true,
		needDataEmpty: false,
		//needLoading: true,
		callbackDone: function(json){

			clickBottom = false;

			if( $(e.target).hasClass('bottomEleAsset') || $(e.target).parents('.bottomEleAsset').length ){
				window.location.href = site_url.smMyAsset_url;
			}
			else if ( $(e.target).hasClass('bottomEleMine') || $(e.target).parents('.bottomEleMine').length ){
				//点击的是我的
				window.location.href = site_url.mine_url;
			}

		},
		callbackFail: function(json){
			clickBottom = false;
			tipAction( json.msg );
		}
	}]
	$.ajaxLoading(obj);

})