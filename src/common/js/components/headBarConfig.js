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
    },
    {
        pathName:"消息中心"
    },
    {
        pathName:"了解恒天" 
    },
    {
        pathName:"交易记录" 
    },
    {
        pathName:"收益明细" 
    },
    {
        pathName:"现金管理" 
    },{
        pathName:'交易规则'
    },{
        pathName:'财富学院早知道'
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
        $('.zhanweifu').css('display','none')
        $(window).scroll(function(){
            var tops=$(this).scrollTop();
            if(tops>50){//当window的scrolltop距离大于50时，
                $("#HeadBarConfigBox").animate({"background-image":"linear-gradient(to right,"+colors[0]+" 40%, "+colors[1]+" 60%)","color":"#fff"},'slow', 'ease-out')
                $("#HeadBarConfigBox a").css({"color":"#fff"});
            }else{
                ClearStyle()
            }
        });
        // 设置返回按钮和title的颜色
        var goBackColor = $("#HeadBarConfigBox a").attr('goBackColor');
        var titleColor = $("#HeadBarConfigBox span").attr('titleColor');
        if(goBackColor){
            $("#HeadBarConfigBox a").css({'color':goBackColor});
        }
        if(titleColor){
            $("#HeadBarConfigBox span").css({'color':titleColor});
        }
    }else{

    }
    //返回上一页
    $("#goBack").on("click",function(){
        if(document.referrer == ''){
            var u = navigator.userAgent, 
                app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
               //这个是安卓操作系统
               window.jsObj.backNative();
            }
            if (isIOS) {
        　　　　//这个是ios操作系统
                window.webkit.messageHandlers.backNative.postMessage('backNative');
            }
        }else{
            location.href="javascript:history.go(-1)";
        }
        
    })
    
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
    