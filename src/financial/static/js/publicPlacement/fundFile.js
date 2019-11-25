
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
            _this.$panels.eq($(this).index()).addClass('active')
                                                            .siblings().removeClass('active')
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