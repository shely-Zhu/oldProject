/**
 * 通用头部导航条
 * @author chentiancheng  2019-11-12
 */
require('../../../include/js/vendor/zepto/fx.js');
var titleName="";
//各个页面对应的头部名称
var pathTitle=[
    {
        pathName:"权益详情1",
        pathUrl:"eruda1" 
    },
    {
        pathName:"权益详情2",
        pathUrl:"eruda2" 
    },
    {
        pathName:"权益详情3",
        pathUrl:"eruda3" 
    },
    {
        pathName:"登录日志查询",
        pathUrl:"eruda3" 
    }
]
$(function(){
    //判断传入的值
    if($("#HeadBarpathName").attr("data")=="@@pathName"){
        var Request ={}
        //把截取到的参数赋值
        Request = GetRequest();  
       for(var i=0;i<pathTitle.length;i++){
           if(Request.pathUrl==pathTitle[i].pathUrl){
               //判断pathUrl的名字是否一致，一致则赋值名字
                 titleName=pathTitle[i].pathName  
           }
       }
       $("#HeadBarpathName").text(titleName) 
       $("#HeadBarpathName").show()
    }else{
        $("#HeadBarpathName").show()
    }
    //传人样式判断展示形式 
    if($("#HeadBarConfigBox").attr('showType')=='1'){
        var colors=$("#HeadBarConfigBox").attr('bgColors').split(",")
         ClearStyle()
        $(window).scroll(function(){
            var tops=$(this).scrollTop();
            if(tops>50){//当window的scrolltop距离大于1时，go to top按钮淡出，反之淡入
                $("#HeadBarConfigBox").animate({"background-image":"linear-gradient(to right,"+colors[0]+" 40%, "+colors[1]+" 60%)","color":"#fff"},'slow', 'ease-out')
                $("#HeadBarConfigBox a").css({"color":"#fff"});
            }else{
                ClearStyle()
            }
        });
    }else{

    }

    
})
//字符串截取
function GetRequest() { 
    var url = location.search; //获取url中"?"符后的字串 
    var theRequest = new Object(); 
    if (url.indexOf("?") != -1) { 
    var str = url.substr(1); 
    strs = str.split("&"); 
    for(var i = 0; i < strs.length; i ++) { 
    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
    } 
    } 
    return theRequest; 
    }
//格式化样式
function ClearStyle(){
    $("#HeadBarConfigBox").css({"background":"none","color":"#fff"});
    $("#HeadBarConfigBox a").css({"color":"#fff"});
}    
    