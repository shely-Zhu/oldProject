/**
 * mui 回到顶部
 */

//初始化上拉下拉事件监听
mui.init({
    gestureConfig: {
        swipeup: true, //默认为true
        swipedown: true,
    }
});


//监听按钮的点击动作
mui("body").on('tap', '.goTopBtn', function() {

    if ($(this).siblings('.form-wrap').length) {
        //基金公告页面
        $(this).siblings('.form-wrap')[0].style.webkitTransform = "translate3d(0px, 0px, 0px) translateZ(0px)";
        $(this).siblings('.form-wrap')[0].style.webkitTransform = '2500ms';
    } else if ($(this).siblings('.contentWrap').length) {
        $(this).siblings('.contentWrap')[0].style.webkitTransform = "translate3d(0px, 0px, 0px) translateZ(0px)";
        $(this).siblings('.contentWrap')[0].style.webkitTransform = '2500ms';
    } else if ($(this).siblings('.contentWrapper').length) {
        $(this).siblings('.contentWrapper')[0].style.webkitTransform = "translate3d(0px, 0px, 0px) translateZ(0px)";
        $(this).siblings('.contentWrapper')[0].style.webkitTransform = '2500ms';
    }else {
        $(this).siblings('.mui-table-view')[0].style.webkitTransform = "translate3d(0px, 0px, 0px) translateZ(0px)";
        $(this).siblings('.mui-table-view')[0].style.webkitTransform = '2500ms';
    }

    $(this).hide();
});