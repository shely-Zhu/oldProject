/*
 * @page: 老带新----注册成功恭喜页
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-07-26 13:41:46
 * @description: 恭喜页面
 */


require('../../../include/js/vendor/config.js');

//zepto模块 
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
var tipAction = require('../../../common/js/components/tipAction.js');
var splitUrl = require('../../../common/js/components/splitUrl.js')();

$(function() {
    var newRecom = {
        init: function() {
            var that = this;

            // 获取页面图片
            that.getData();

            // 设置去注册的链接
            that.events();
        },
        getData: function() {
            var that = this;

            var obj = [{ //获取图片
                url: site_url.findBannerByPosition_api,
                data: {
                    hmac: "", //预留的加密信息    
                    params: { //请求的参数信息 
                        adPosition: 'oldNewCongratulation', //类型（标志位）【请参照备注】 
                        limitCount: 3, //展示幅数    
                    }
                },
                needLogin: true,
                needDataEmpty: true,
                callbackDone: function(json) {
                	var phone = splitUrl['phone'].replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
                    $('.phone').html(phone);
                    $('.body').css({
                        'background-image': 'url("' + json.data[0].imgUrl + '")',
                    });
                    $('.content img').attr('src', json.data[1].imgUrl);
                    $('.btn_wrap img').attr('src', json.data[2].imgUrl);
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }];
            $.ajaxLoading(obj);
        },
        events: function() {
            var that = this;

            //点击返回登录
            mui("body").on('tap', '.btnButton', function() {
                window.location.href = site_url.login_html_url;
            })
        }
    }
    newRecom.init();
})