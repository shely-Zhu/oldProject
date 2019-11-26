//  已报名活动
// @author caoqihai 2019-11-18 



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
            ListSlot:$('.listHasData0'),//插入已报名活动位置
            ListSlot1:$('.listHasData1'),//插入已报名活动位置
            listTemp:$('#activityEn-template'),//已报名活动模板类名          
            morelistTemp:$('#activityList-template'),//已报名活动模板类名          
		},
		gV:{
			ListData: [
            ], // 有活动的数据
            search: false, // 搜索
            // 存放ajax请求地址  已进行  已结束
            ajaxArr: [], //存放每一个ajax请求的传参数据
		},
		init: function() {
            var that = this;
            that.getData(site_url.queryGrowthDetailList_api,{},0);
            that.getData(site_url.getJJSInTransitAssets_api,{},1);
            that.events();
        },
        getData:function(ur,dat,num){
            var that = this


            var obj = [{
                url: ur, 
                data: dat,
                needDataEmpty: false,
                callbackDone: function(json) {
                    var dataList;
                    console.log(json.data)
                    // 待定 
                    if (!$.util.isNull(json.data.pageList)) { // 没有记录不展示
                        if(num == 0){
                            $('.listHasData0 .noData').show();
                            return false;
                        }else{
                            $('.listHasData1 .noData').show();
                            return false;
                        }
                        
                    } else {
                        dataList = json.data.pageList;
                    }
                    setTimeout(function() {
                        // 将列表插入到页面上
                        if(ur == site_url.queryGrowthDetailList_api){
                            generateTemplate(dataList, that.$e.ListSlot, that.$e.listTemp);
                        }else{
                            generateTemplate(dataList, that.$e.ListSlot1, that.$e.listTemp);
                        }
                        
                    }, 200)

                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                },
                callbackNoData: function() {
                    console.log(111)
                    if(num == 0){
                        $('.listHasData0 .noData').show();
                        return false;
                    }else{
                        $('.listHasData1 .noData').show();
                        return false;
                    }

                }
            }]
            $.ajaxLoading(obj);
        },
		events:function(){
			var that = this

			// tab 切换
            mui("body").on('tap', '.choice .mui-col-xs-6', function(e) {
                var i = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                window.scroll(0,0)
                if(i == 0){
                    $('.listHasData0').show()
                    $('.listHasData1').hide()
                }else{
                    $('.listHasData0').hide()
                    $('.listHasData1').show()
                }
            })
		}

	}
	dataEn.init()
})