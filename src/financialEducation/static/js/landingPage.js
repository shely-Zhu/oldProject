/*
 * @page: 财商教育落地页
 * @Author: songxiaoyu
 * @Date:   2018-05-07 14:11:34
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-05-08 16:12:52
 * @description: 落地页配置链接时需配置参数（registArea）区分大区，（sourceFrom）注册来源
 */
require('../../../include/js/vendor/config.js');
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
var tipAction = require('../../../common/js/components/tipAction.js');

$(function() {
    var landingPage = {
        ele: {
            joinBtn: $('.join_btn'), // 一键加入
        },
        init: function() {
            var that = this;
            that.getImgData();
            that.events();
        },
        // 获取图片接口
        getImgData: function() {
            var that = this;

            var obj = [{
                url: site_url.findBannerByPosition_api,
                data: {
                    hmac: "", //预留的加密信息
                    params: { //请求的参数信息
                        adPosition: "appFQHome", //类型（标志位）【请参照备注】 
                        limitCount: "1", //展示幅数    
                    }
                },
                //async: false,
                // needLogin:true,
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data = json.data[0];
                    $('.container .landing_img').attr('src', data.imgUrl)

                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }];
            $.ajaxLoading(obj);
        },
        // 请求是否展示推广页接口，决定跳转路径
        getIfPromotion: function() {
            var that = this;

            var obj = [{
                url: site_url.ifShowPromotionApi,
                data: {
                    hmac: "", //预留的加密信息
                    params: { //请求的参数信息
                    }
                },
                async: false, 
                needLogin:true,
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data = json.data;
                    if(data.toShow == 1){ // 跳转推广页
                        window.location.href = site_url.guidePageUrl;
                    } else{  // 跳转成长计划详情页
                        window.location.href = site_url.growthPlanUrl;
                    }
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }];
            $.ajaxLoading(obj);
        },
        events: function() {
            var that = this;
            /*
             *一键加入按钮
             *1.已登录，已参加财商教育,（根据接口返回）跳转计划详情页
             *2.已登录，未参加财商教育，跳转推广页
             *3.未登录，跳转登录页
             */
            that.ele.joinBtn.on("click", function() {
                that.getIfPromotion();
            });
        },
    };
    landingPage.init();
});