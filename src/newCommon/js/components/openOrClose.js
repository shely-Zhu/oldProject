/**
 * 展开收起动作 js
 *
 * @author  yangjinlai
 *
 * DOM结构：
 * <div class="actionWrap">  -----展开收取的列表
 * 		<div class="actioinList"></div>  ----列表，可以多条
 * 		……
 * </div>
 * <div class="iconfont actionBtn"></div>  ----展开收起按钮
 *
 * 不论页面打开时默认展示多少条，点击展开时都可以完全展开，收起时可以收起到最开始的状态，
 * 不受默认显示条数的限制
 */

//zepto模块--callback
require('../../../include/js/vendor/zepto/fx.js');

var actionBtn = function($this) {

    var $actionWrap = $this.siblings('.actionWrap'),
        $list = $actionWrap.find('.actionList');

    if (!$actionWrap.attr('height') && !$actionWrap.attr('h')) {

        //第一次点击，获取未展开前容器的高度
        $actionWrap.attr('height', $this[0].getBoundingClientRect().top - $actionWrap[0].getBoundingClientRect().top);

        $actionWrap.find('.hide').show();

        var h = 0;

        $.each($list, function(i, el) {

            //计算子元素的高度
            h += $(el).height();
        })

        $actionWrap.attr('h', h);
    }

    if ($this.hasClass('active')) {
        //有active class时，说明是打开状态，需要隐藏
        $actionWrap.animate({
            height: $actionWrap.attr('height') + 'px'
        }, 'slow', 'ease-out', function() {
            $this.removeClass('active');
        })
    } else {
        //隐藏状态，需要打开
        //$actionWrap.find('.hide').show();

        $actionWrap.animate({
            height: $actionWrap.attr('h') + 'px'
        }, 'slow', 'ease-out', function() {
            $this.addClass('active');
        })
    }
};

//绑定点击事件
mui("body").on('tap', '.actionBtn', function() {
    actionBtn($(this));
})

mui("body").on('tap', '.actionList', function() {
    var $actionWrap = $(this).parents('.actionWrap'),
        $actionBtn = $actionWrap.siblings('.actionBtn');

    // 当列表展开时，选中元素移到第一位，并收起列表
    if ($actionBtn.hasClass('active')) {
        $actionWrap.prepend($(this)).animate({
            height: $actionWrap.attr('height') + 'px'
        }, 'slow', 'ease-out', function() {
            $actionBtn.removeClass('active');
        })
    }
})

