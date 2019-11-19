//  已报名活动
// @author caoqiahi 2019-11-18 



require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayer.js');
require('@pathCommonJs/components/elasticLayerTypeTwo.js');
require('@pathCommonJs/components/headBarConfig.js');

require('@pathCommonJs/components/tabScroll.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


$(function(){
	var dataEn = {
		$e:{
			noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            activityListTemp:$('#activityList-template'),//公共推荐活动模板类名
		},
		gV:{
			ListData: [
                [],
                []
            ], // 有活动的数据
		},
		init: function() {
            var that = this;
            // that.getData();
            that.events();
        },
		events:function(){
			var that = this

			// tab 切换
            mui("body").on('tap', '.choice .mui-col-xs-6', function(e) {
                var i = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');

                // 切换图表
                if (that.gV.ListData[i].length != 0) {
                    $('.HasData').css({"display": "block"})
                    $('.NoData').css({"display": "none"});
                } else {
                    $('.HasData').css({ "display":"none"})
                    $('.NoData').css({"display": "block"});
                    
                }
            })
		}

	}
	dataEn.init()
})