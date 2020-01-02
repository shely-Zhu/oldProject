/**
 * 判断app状态，隐藏元素
 * @author yangjinlai 2017-07-18
 */



if( window.currentIsApp ){

	//如果当前是app，需要隐藏部分元素
	var url = window.location.href;

	if(  url.indexOf("productPrivate") != -1 ){
		$(".publicOrPrivate").hide();
		$(".mui-btn.bg").remove();
		$(".mui-btn.over").remove();
		$(".bottomNav").hide();
		$('.productName').hide();
		$('.mui-btn.reservation').remove();
	}

	if( url.indexOf("productPublic") != -1 ){
		$(".publicOrPrivate").hide();
		$(".buyNowBtn").hide();
	}
	if( url.indexOf("publicList") != -1 ){
		$(".bottomNav").hide();
	}

	if(url.indexOf('club') != -1){
		$('.app.flexbox').hide();
	}
}

