/**
 * 无限滚动列表
 * @author chentiancheng  2019-12-3
 * className 模板替换的div classname  必填项
 * cutNumber 准备做tops的参数  后期优化
 */

module.exports = function(className,cutNumber){
    //点击下按钮，显示弹框  
    var tops=-100;
     $(document).scroll(function() {
            if($(className).offset().top<tops){
                tops-=800;
                mui('.contentWrapper').pullRefresh().pullupLoading();
            }
        });
}
