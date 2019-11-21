//  自选公募-交易记录
// @author caoqiahi 2019-11-20 



require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayer.js');
require('@pathCommonJs/components/elasticLayerTypeTwo.js');
require('@pathCommonJs/components/headBarConfig.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


$(function(){
    var trandata = {
        $e: {

        },
        gV: { // 全局变量

        },
        init: function() {
            var that = this;
            mui('.mui-off-canvas-wrap').offCanvas('show');
            //that.getData()
            that.events();
        },
        events:function(){
			var that = this

			// 头部点击展示下拉
            mui("body").on('tap', '.nav .mui-col-xs-3', function(e) {
                var i = $(this).index();
                if($('.whole'+i).css('display') == 'none'){
                    $('.whole'+i).css('display','block').siblings().css('display','none')
                    $('.down').css('display','inline-block')
                    $('.up').css('display','none')
                    $(this).find('.down').css('display','none').siblings('.up').css('display','inline-block')
                }else{
                    $('.whole'+i).css('display','none')
                    $(this).find('.down').css('display','inline-block').siblings('.up').css('display','none')
                }

            })

            // 下拉透明部分点击  影藏
            mui("body").on('tap', '.other', function(e) {
                $('.whole0 , .whole1 , .whole2 , .whole3').css('display','none')
                $('.down').css('display','inline-block')
                $('.up').css('display','none')
            })

            // 下拉列表点击获取 相应的  值
            mui("body").on('tap', '.whole>div>ul>li', function(i , item) {
                console.log($(this).find('.con>div').text())
                $('.whole0 , .whole1 , .whole2 , .whole3').css('display','none')
                $('.down').css('display','inline-block')
                $('.up').css('display','none')
            })


		}
    }
    trandata.init();
})