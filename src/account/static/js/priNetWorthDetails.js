/**
 * 私募资产净值明细 js
 * @author 蔡文琦  2019-11-22
 */


require('@pathCommonBase/base.js');

require('@pathCommonJs/ajaxLoading.js');

var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
require('@pathCommonCom/pullRefresh/pullRefresh.js');

$(function() {

    var somePage = {
        $e: {
            adjustmentRecord: $('.adjustmentRecord'), // 调仓记录
            recordList: $('.contentWrap'), // 调仓记录
            adjustmentTemp: $('#adjustment-template'), // 最新调仓模板
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
        },
        gV: { // 全局变量
            pageCurrent: 1, //当前页码，默认为1
            pageSize: 20,
            listLength: 0,
            projectId: splitUrl['projectId'],
        },
        init: function() {
            var that = this;
            that.initMui();
            //that.getData()
            // that.events();
        },
        //初始化mui的上拉加载
        initMui: function() {
            var that = this;

            var height = windowHeight - $(".title").height() - $(".HeadBarConfigBox").height();
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
            }
            $.pullRefresh({
                wrapper: $('.list'),
                class: 'listItem',
                template: that.$e.adjustmentTemp, 
                pageSize: that.gV.pageSize,
                callback: function(def, t){
                    var obj = [{
                        url: site_url.queryHistoryNetValue_api,
                        data: {
                            "pageNo": that.gV.pageCurrent, //非必须，默认为1
                            "pageSize": that.gV.pageSize,//非必须，默认为10
                            "projectId":that.gV.projectId,//项目编号
                            "profitRange":4,//0:近1月 1:近3月 2:近6个月 3:近1年4：成立至今
                        },                        
                        needDataEmpty: true,
                        callbackDone: function(json) {     
                            var data = json.data.pageList;
                            if(that.gV.pageCurrent == 1 && data.length == 0) {
                                $(".list").css("display", "none")
                                that.$e.noData.show()
                            } else {
                                def && def.resolve( data, that.gV.pageCurrent);
                                that.gV.pageCurrent++;
                            }
                        },
                        callbackNoData: function( json ){  
                            if(that.gV.pageCurrent == 1) {
                                $(".list").css("display", "none")
                            }
                            def && def.reject( json, that.gV.pageCurrent );
                        },
                        callbackFail: function(json) {
                            def && def.reject( json, that.gV.pageCurrent );
                        },
                    }];
                    $.ajaxLoading(obj); 
                }
            })
        },
        //注册事件
		events: function() {
			//alwaysAjax($('.contentWrap'))
		}
    };
    somePage.init();
});