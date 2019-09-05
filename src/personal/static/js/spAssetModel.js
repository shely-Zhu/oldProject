/*
* @page: 标普资产模型
* @Author: songxiaoyu
* @Date:   2019-09-03 15:25:21
* @Last Modified by:   songxiaoyu
* @description:
*/


require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayer.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

$(function() {

    var somePage = {
        $e: {
        },
        gV: {
        },
         //元素获取
         getElements: {
            tip:$(".sp_tip"),//普标提示区域
            expense : $('#expense'), //四象限消费型资产显示区块
            safeguard : $("#safeguard"),////四象限保障型资产显示区块
            appreciation : $(".appreciation"),//四象限增值型资产显示区块
            hedging : $("#hedging"),////四象限保值型资产显示区块
        }, 
        init: function() {
            var that = this;
            that.getData();
            that.events();
        },
        getData: function() {
            var that = this;
            var obj = [{
                url: site_url.findcommunityActivities_api,
                data: {
                    hmac: "", //预留的加密信息
                    params: { //请求的参数信息
                        
                    }
                },
                //async: false,
                // needLogin:true,
                needDataEmpty: true,
                callbackDone: function(json) {
                    var jsonData = json.data;
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }];
            $.ajaxLoading(obj);
        },
        events: function() {
           var that=this;
           $(document).on('click','.sp_tip i',function(){
            somePage.getElements.tip.hide()
           })

        },
    };
    somePage.init();
});