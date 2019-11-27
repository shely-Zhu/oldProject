//  私募基金产品详情
//  @author zhangyanping 2019-11-25

require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js'); 
require('@pathIncludJs/vendor/zepto/deferred.js'); 

require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');

require('@pathCommonJsCom/headBarConfig.js');

//黑色提示条的显示和隐藏
// var tipAction = require('@pathCommonJsCom/tipAction.js');

// var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
// var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


$(function(){
    var  privatePlacementDetail = {
        //获取页面元素
        $e:{
            
        },
        //页面初始化函数
        init:function(){
            var that=this;
            that.events()
        },
        events: function(){
            var that = this;
            //tab点击切换
            mui("body").on('tap', '.tabs>li' , function(){
                $(this).addClass('active').siblings().removeClass('active');
                $(".wrap>.panel").eq($(this).index()).addClass('active').siblings().removeClass('active');
            })
        }
    };
    privatePlacementDetail.init();
});
