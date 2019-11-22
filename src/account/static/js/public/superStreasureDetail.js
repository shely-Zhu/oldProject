/**
* 自选公募-超宝详情
* @author wangjiajia 2019-11-20
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


$(function() {

    var privateDetail = {
        data: {
			
        },
        init:function(){
            var that = this;
            //事件绑定
			that.event();	
        },
        event:function(){
            //选项卡切换
            $(document).on('click', '.lineDraw .time', function(e) {
                $('.lineDraw .time').removeClass('active');
                $(this).addClass('active');
            })
        }

    }
  
    privateDetail.init()
})