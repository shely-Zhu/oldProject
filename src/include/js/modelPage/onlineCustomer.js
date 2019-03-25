/*
 * @page: 在线客服转场页面
 * @Author: songxiaoyu
 * @Date:   2018-11-12 11:40:30
 * 
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-11-15 15:11:26
 * @description:
 */


require('../vendor/config.js');
require('../vendor/zepto/callback.js');
require('../vendor/zepto/deferred.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
var tipAction = require('../../../common/js/components/tipAction.js');

$(function() {

    var somePage = {
        getElements: {},
        init: function() {
            var that = this;
            that.getData();
            that.events();
        },
        getData: function() {
            var that = this;

            var obj = [{
                url: site_url.getToken_api,
                data: {
                },
                needDataEmpty:false,
                callbackDone: function(json) {
                    var token = json.data;
                    // 跳转第三方客服地址
                    window.location.href = site_url.onlineCustomer_url + '&token=' + token;
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }];
            $.ajaxLoading(obj);
        },
        events: function() {

        },
    };
    somePage.init();
});