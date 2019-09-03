//h5info 信息
	
//获取地址栏参数
getQueryString = function(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return '';
};

h5Info = function(href,htmdEvt,type){
	var h5_info;

	if(type == "click"){
		// 私募首页首页精密推荐
		if( href.indexOf('/productPrivate/views/prvIndex.html') != -1){
			if($(document.querySelector('[htmdEvt='+htmdEvt+']')).attr('htmdEvt') == 'privateIndex_supermarket'){
				h5_info = '私募超市'
			}
			else if($(document.querySelector('[htmdEvt='+htmdEvt+']')).attr('htmdEvt') == 'privateIndex_recommend'){
				var title =document.querySelector('[htmdEvt='+htmdEvt+'] .title') ? document.querySelector('[htmdEvt='+htmdEvt+'] .title').innerHTML : '';
				var recName = document.querySelector('[htmdEvt='+htmdEvt+'] .recName') ? document.querySelector('[htmdEvt='+htmdEvt+'] .recName').innerHTML : '';

				h5_info = title.trim() + '_' + recName.trim();
			}
			else if($(document.querySelector('[htmdEvt='+htmdEvt+']')).attr('htmdEvt') == 'privateIndex_guessLike'){
				h5_info = '猜你喜欢'
			}
			else if ($(document.querySelector('[htmdEvt='+htmdEvt+']')).attr('htmdEvt') == 'privateIndex_hotSpot'){
				var title =document.querySelector('[htmdEvt='+htmdEvt+'] .hotName') ? document.querySelector('[htmdEvt='+htmdEvt+'] .hotName').innerHTML : '';
				h5_info = '热门' + title;
			}
			else if ($(document.querySelector('[htmdEvt='+htmdEvt+']')).attr('htmdEvt') == 'privateIndex_feature'){
				h5_info = '恒天特色';
			}
			
		}
		if( href.indexOf('/productPrivate/views/prdPrvLists.html') != -1){
			var title =document.querySelector('.mui-active')? document.querySelector('.mui-active').innerHTML : '';
			var recName = document.querySelector('[htmdEvt='+htmdEvt+'] .card-head') ? document.querySelector('[htmdEvt='+htmdEvt+'] .card-head').innerHTML : '';

			h5_info =  title.trim() + '_' + recName.trim();
		}
	}
	
	//如果是私募产品详情页
	if( href.indexOf('/productPrivate/views/prdPrvDetails.html') != -1 ){
		//重设evt.info属性hr
		h5_info = getQueryString("fundCode") + '_' + ( document.querySelector('.fundName') ? document.querySelector('.fundName').innerHTML : '' );
	}
	//如果是公募产品详情页
	else if(  href.indexOf('/productPublic/views/productDetail.html') != -1 ){
		//重设evt.info属性
		var inn = ( document.querySelector('.title .name') ? document.querySelector('.title .name').innerHTML : '' );	    		
		if( inn ){
			inn = inn.substring(0, inn.indexOf('<'));
		}
		h5_info = getQueryString("fundCode") + '_' + inn;
	}
	//如果是现金宝详情页
	else if( href.indexOf('/cashTreasure/views/totalAssets.html') != -1 ){
		//重设evt.info属性
		h5_info = getQueryString("fundCode") + '_' + (document.title ? document.title : '' );
	}
	//如果是注册页面
	else if( href.indexOf('/user/views/register.html') != -1 ){
		var redirectUrl = (getQueryString("redirectUrl") ? getQueryString("redirectUrl") : '');
		var trackModule = (getQueryString("trackModule") ? getQueryString("trackModule") : '');
		h5_info = redirectUrl + '_' + trackModule;
	}

	h5_info = (h5_info ? h5_info : '');  

	return h5_info;
}


module.exports = h5Info;