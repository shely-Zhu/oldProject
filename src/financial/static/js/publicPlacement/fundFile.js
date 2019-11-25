require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
// tab组件
var Tabs = (function(){
    function Tab ($container) {
        this.$ct = $container
        this.init()
    }
    Tab.prototype.init = function () {
        this.$tabs = this.$ct.find('.tabs>li')
        this.$panels = this.$ct.find('.wrap>.panel')
        this.$tabs.first().addClass('active')
        this.$panels.first().addClass('active')
        this.bind()
    }
    Tab.prototype.bind = function () {
        var _this = this
        _this.$tabs.on('click',function () {
            $(this).addClass('active').siblings().removeClass('active')
            _this.$panels.eq($(this).index()).addClass('active').siblings().removeClass('active')
        })
    }
    return {
        init : function ($container) {
            $container.each(function(index,node){
                new Tab($(node))
            })
        }
    }
})()
Tabs.init($('.content'))