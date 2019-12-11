/**
 * 无限滚动列表
 * @author chentiancheng  2019-12-3
 * className 模板替换的div classname  必填项
 * cutNumber 准备做tops的参数  后期优化
 */

module.exports = function( $el, pullupLoadingName, cutNumber, isBottomFlag) {
    var pullupLoadingNames = pullupLoadingName ? pullupLoadingName : ".contentWrapper"
    var $el = $el ? $el : $(".mui-table-view-cell");
    // 设置距离底部还剩300px时加载下一页
    console.log($el.length)
    if ( $el.length > 0) {
        $(document).scroll(function() {
            // window.screen.height  屏幕高度
            // $el.parent().parent().parent().height()     滚动容器高度
            // $el.parent().height()    滚动内容高度
            // Math.abs($el.offset().top-（window.screen.height - $el.parent().parent().parent().height()) // 滚动高度
            // 滚动高度 + 滚动容器高度 = 滚动内容高度
            var barTop = window.screen.height - $el.parent().parent().parent().height()
            var scrollTop = Math.abs($el.offset().top-barTop)
            var diff = $el.parent().height() - $el.parent().parent().parent().height() - scrollTop
            // 当滚动距离距离最底部还剩500时，加载下一页
            if(diff <= 500) { 
                if( ! $el.find('.mui-pull-caption-nomore').length ){
                    mui(pullupLoadingNames).pullRefresh().pullupLoading();
                }
            } 
        });
    }
    //点击下按钮，显示弹框
    /*var $classNames = $className ? $className : $(".contentWrap");
    var pullupLoadingNames = pullupLoadingName ? pullupLoadingName : ".contentWrapper"
    var tops = parseInt(cutNumber?cutNumber:-100); 
    if ( $classNames.length > 0) {
        $(document).scroll(function() {
            // 滚动距离 Math.abs($(classNames).offset().top - 64)
            // 容器高度 $(classNames).parent().parent().height()
            if ( $classNames.offset().top < tops) {

                if( ! $classNames.find('.mui-pull-caption-nomore').length ){
                    tops -= 800;
                    mui(pullupLoadingNames).pullRefresh().pullupLoading();
                }
                
            } 
        });
    }*/

}