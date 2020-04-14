//h5info 信息

//获取地址栏参数
getQueryString = function(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return '';
};

h5Info = function(href, type, htmdEvt, eTarget){
	var h5_info,
		$e = $(eTarget);

	// 点击事件自定义埋点info
	if(type == "click"){
		if( !eTarget ){
			return false;
		}
		// 财富流向早知道文章点击
		if( href.indexOf('/homePage/views/fortuneCollege/fortuneFlowKnown.html') != -1){
			if( htmdEvt == 'fortune_09'){
				// 外链
				if ($e.attr("externalUrl")) {
					h5_info = $e.attr("externalUrl");
				// 内置模板
				} else {
					h5_info = "/allServerResources/model/views/articleTemplate.html?id=" + $e.attr("id") + '&articleBelong=5';
				}
			}
		// 财富讲堂列表页文章点击
		} else if( href.indexOf('/homePage/views/fortuneCollege/fortuneClassroom.html') != -1){
			// 大咖直播及知识讲堂文章
			if( htmdEvt == 'fortune_10' || htmdEvt == 'fortune_11'){
				// 外链
				if ($e.attr("externalUrl")) {
					h5_info = $e.attr("externalUrl");
				// 内置模板
				} else {
					h5_info = "/allServerResources/model/views/articleTemplate.html?id=" + $e.attr("id") + '&articleBelong=' + $e.attr("articleBelong");
				}
			}
		// 财富学院首页
		} else if( href.indexOf('/homePage/views/fortuneCollege/fortuneCollegeList.html') != -1){
			// banner文章跳转 文章id_文章名称
			if( htmdEvt == 'fortune_14'){
				// 外链
				if ($e.attr("externalUrl")) {
					h5_info = $e.attr("externalUrl");
				// 内置模板
				} else {
					h5_info = $e.attr("href");
				}
			// 财富翻译官
			} else if( htmdEvt == 'fortune_13'){
				h5_info = $e.attr("externalUrl");
			// 财富流向早知道及财富研究
			} else if( htmdEvt == 'fortune_02' || htmdEvt == 'fortune_07'){
				// 外链
				if ($e.attr("externalUrl")) {
					h5_info = $e.attr("externalUrl");
				// 内置模板
				} else {
					h5_info = "/allServerResources/model/views/articleTemplate.html?id=" + $e.attr("id") + '&articleBelong=' + $e.attr("articleBelong");
				}
			}
		//财富研究列表页文章点击
		} else if( href.indexOf('/homePage/views/fortuneCollege/fortuneClassroom.html') != -1){
			if( htmdEvt == 'wealthResearch_01'){
				// 外链
				if ($e.attr("externalUrl")) {
					h5_info = $e.attr("externalUrl");
				// 内置模板
				} else {
					h5_info = "/allServerResources/model/views/articleTemplate.html?id=" + $e.attr("id") + '&articleBelong=' + $e.attr("articleBelong");
				}
			}
		}
	} else {// 非点击情况（页面加载和退出）自定义埋点info
		// 私募资产详情 项目id_项目名称
		if( href.indexOf('/account/views/private/privateDetail.html') != -1 ){
			h5_info = getQueryString("projectId") + '_' + ( document.querySelector('#HeadBarpathName') ? document.querySelector('#HeadBarpathName').innerHTML : '' );
		// 私募产品详情 项目id_项目名称
		} else if ( href.indexOf('/financial/views/privatePlacement/privatePlacementDetail.html') != -1 ){
			h5_info = getQueryString("projectId") + '_' + ( document.querySelector('.productNameTip') ? document.querySelector('.productNameTip').innerHTML : '' );
		// 现金宝详情 基金编号_基金名称
		} else if ( href.indexOf('/account/views/public/superStreasureDetail.html') != -1 ){
			h5_info = getQueryString("fundCode") + '_' + ( document.querySelector('#HeadBarpathName') ? document.querySelector('#HeadBarpathName').innerHTML : '' );
		// 公募持仓基金详情 基金编号_基金名称
		} else if ( href.indexOf('/account/views/public/optionalPublicDetail.html') != -1 ){
			h5_info = getQueryString("fundCode") + '_' + ( document.querySelector('#HeadBarpathName') ? document.querySelector('#HeadBarpathName').innerHTML : '' );
		// 公募产品详情 基金编号_基金名称
		} else if ( href.indexOf('/financial/views/publicPlacement/publicDetail.html') != -1 ){
			h5_info = getQueryString("fundCode") + '_' + ( document.querySelector('#HeadBarpathName').children[0] ? document.querySelector('#HeadBarpathName').children[0].innerHTML : '' );
		// 会员活动详情 活动id_活动名称
		} else if ( href.indexOf('/life/views/memberClub/activityDetails.html') != -1 ){
			h5_info = getQueryString("actId") + '_' + ( document.querySelector('.actName') ? document.querySelector('.actName').innerHTML : '' );
		}
	}

	h5_info = (h5_info ? h5_info : '');

	return h5_info;
}


module.exports = h5Info;