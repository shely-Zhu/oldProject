/**
 * 判断app状态，隐藏元素
 * @author yangjinlai 2017-07-18
 */



if( window.envOrigin == 1 ){

	//如果当前是财富，需要隐藏部分元素
	var url = window.location.href;

	if(  url.indexOf("myAsset.htm") != -1 ){
		$(".chtwm-asset").show();
	}
	if( url.indexOf("payThemeCash.htm") != -1 ){
		$(".chtwm-pay").show();
	}
	if( url.indexOf("orderDetail.htm") != -1 ){
		$(".chtwm-pay").show();
	}
	if( url.indexOf("tradeDetail.htm") != -1 ){
		$(".chtwm-pay").show();
	}
	if( url.indexOf("detailLists.htm") != -1 ){
		$(".chtwm-pay").show();
	}
	if( url.indexOf("payMX.htm") != -1 ){
		$(".chtwm-pay").show();
	}
}
