/*
 * @page: 财商教育推广页
 * @Author: songxiaoyu
 * @Date:   2018-05-08 14:25:24
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-05-08 16:33:22
 * @description:
 */

require('../../../include/js/vendor/config.js');
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
var tipAction = require('../../../common/js/components/tipAction.js'),
    Slider = require('../../../common/js/components/sliderMui.js'); // 轮播

$(function() {
    var guidePage = {
        ele: {
            joinBtn: $('.join_btn'), // 开启宝宝专属计划
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
                        adPosition: "appFQPromotion", //类型（标志位）【请参照备注】 
                        limitCount: "3", //展示幅数    
                    }
                },
                // async: false,
                // needLogin:true,
                needDataEmpty: true,
                callbackDone: function(json) {
                    var imgArr = [];
                    $.each(json.data, function(i, el) {
                        imgArr.push({ imgUrl: el.imgUrl, linkUrl: "javascript:;" });
                    })
                    // banner轮播，不自动播放,不显示轮播点，不循环播放
                    Slider($('.landing_img'), imgArr, 0, false, true);

                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }];
            $.ajaxLoading(obj);
        },
        // 请求初始化财商教育记录接口，跳转创建成长计划页面
        getInitEducation: function() {
            var that = this;
            var obj = [{
                url: site_url.initApi,
                data: {
                    hmac: "",
                    params: {}
                },
                // async: false, 
                needLogin: true,
                needDataEmpty: false,
                callbackDone: function(json) {
                    window.location.href = site_url.createPlanUrl;
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
             *开启宝宝专属计划
             *1.请求初始化财商教育接口
             *2.跳转创建成长计划页面
             */
            that.ele.joinBtn.on("click", function() {
                that.getInitEducation();
            });
        },
    };
    guidePage.init();
});