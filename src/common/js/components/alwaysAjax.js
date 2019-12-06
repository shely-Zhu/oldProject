/**
 * 无限滚动列表
 * @author chentiancheng  2019-12-3
 * className 模板替换的div classname  必填项
 * cutNumber 准备做tops的参数  后期优化
 */

module.exports = function(className, pullupLoadingName, cutNumber, isBottomFlag) {
    //点击下按钮，显示弹框
    var classNames = className ? className : ".contentWrap"
    var pullupLoadingNames = pullupLoadingName ? pullupLoadingName : ".contentWrapper"
    //var tops = parseInt(cutNumber?cutNumber:-100); 
    if ($(classNames).length > 0) {
        $(document).scroll(function() {
            // 滚动距离 Math.abs($(classNames).offset().top - 64)
            // 容器高度 $(classNames).parent().parent().height()
            // 当滑动距离距底部剩余200px时触发上拉加载事件
            var a = Math.abs($(classNames).offset().top - 64)
            var b = $(classNames).parent().parent().height()
            var diff = b - 200
            console.log(isBottomFlag)
            if(isBottomFlag == false) {
                console.log(a % b)
                if(a % b > diff && a % b < $(classNames).parent().parent().height()) {
                    mui(pullupLoadingNames).pullRefresh().pullupLoading();
                }
            }
            //if(Math.abs($(classNames).offset().top - 64) - $(classNames).parent().parent().height())
            //console.log($(classNames).parent().parent().height(), $(classNames).offset().top)
            /*if ($(classNames).offset().top < tops) {
                tops -= 800;
                
            } */  
        });
    }

}