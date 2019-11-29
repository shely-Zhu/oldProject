/**
* 私募交易规则
* @author yanruiting 2019-11-29
*/
require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function(){
	let somePage = {
		//获取页面元素
		$e:{
			
		},
        gV: {
            redemptionOpenFrequency: decodeURI(decodeURI(splitUrl['redemptionOpenFrequency'])),
            imgUrl: splitUrl['imgUrl'],
        },
		//页面初始化函数
		init:function(){
            var that = this;
            that.gV.redemptionOpenFrequency?$("#redemptionOpenFrequency").html(that.gV.redemptionOpenFrequency):$("#redemptionOpenFrequency").html('暂无相关数据')     
            if(that.gV.imgUrl && that.gV.imgUrl!='') {
                $("#introImg").attr("src", that.gV.imgUrl)
            } else {
                $("#introImg").remove()
                $("#introImgCon").html("暂无相关数据")
            }
        },
	};
	somePage.init();
});