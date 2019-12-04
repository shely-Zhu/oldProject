/**
 * 无限滚动列表
 * @author chentiancheng  2019-12-3
 * className 模板替换的div classname  必填项
 * cutNumber 准备做tops的参数  后期优化
 * pullupLoadingNames
 */

module.exports = function(className, pullupLoadingName, cutNumber) {
    //点击下按钮，显示弹框
    var classNames = className ? className : ".contentWrap"
    var pullupLoadingNames = pullupLoadingName ? pullupLoadingName : ".contentWrapper"
    var tops = -100; 
    if ($(classNames).length > 0) {
        $(document).scroll(function() {
            if ($(classNames).offset().top < tops) {
                tops -= 800;
                mui(pullupLoadingNames).pullRefresh().pullupLoading();
            }   
        });
    }

}