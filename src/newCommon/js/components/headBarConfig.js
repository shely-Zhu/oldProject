/**
 * 通用头部导航条
 * @author chentiancheng  2019-11-12
 */

/**
 * iconStype:icon的样式，也可以是文字。如果是icon传入对应的码例如：&#xe609;不穿显示客服热线的图标
 * serviceType：如果是1就显示，如果是0则不显示。主要控制右边图标的显示隐藏
 * 例如
 * @@include('@pathCommonViews/headBarConfig.html',{"pathName":"自选公募","bgColors":"#475A95,#475A95","showType":"1","serviceType":"1"})
 * 
 * 
 * 
 */
require('../../../include/js/vendor/zepto/fx.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var titleName = "";
//各个页面对应的头部名称
var pathTitle = [{
    pathName: "权益详情1",
    pathUrl: "eruda1"
},
{
    pathName: "权益详情2",
    pathUrl: "eruda2"
},
{
    pathName: "权益详情3",
    pathUrl: "eruda3"
},
{
    pathName: "登录日志查询",
    pathUrl: "eruda3"
}
]
$(function () {
    var $headBarConfigBox = $("#HeadBarConfigBox");
    //IOS会在所有连接上拼接是否为刘海屏的标识，同时会存在session中。
    if (splitUrl['isIphoneX'] || sessionStorage.getItem('isIphoneX')) {
        sessionStorage.setItem('isIphoneX', true);
        $(".HeadBarConfigBox").css('margin-top', '0.2rem');
    }
    //判断传入的值
    if ($("#HeadBarpathName").attr("data") == "@@pathName") {
        var Request = {}
        //把截取到的参数赋值
        Request = GetRequest();
        for (var i = 0; i < pathTitle.length; i++) {
            if (Request.pathUrl == pathTitle[i].pathUrl) {
                //判断pathUrl的名字是否一致，一致则赋值名字
                titleName = pathTitle[i].pathName
            }
        }
        $("#HeadBarpathName").text(titleName)
        $("#HeadBarpathName").show()
    } else {
        $("#HeadBarpathName").show()
    }
    // 判断是否为双行文本溢出
    if($headBarConfigBox.attr("linesNum") != 2) {
        $("#HeadBarpathName").addClass("singleLine")
    }
    //传人样式判断展示形式 
    if ($headBarConfigBox.attr('showType') == '1') {
        var colors = $headBarConfigBox.attr('bgColors').split(",")
        ClearStyle()
        $('.zhanweifu').css('display', 'none')
        //最新方案 headBar跟着页面一起滚动上去 先把这块滚动的注释掉。如果需要改回原方案 只需要吧这块放开 同时把headBar改为fixed即可

        $(window).scroll(function() {
            var tops = $(this).scrollTop();
            if (tops > 50) { //当window的scrolltop距离大于50时，
                $headBarConfigBox.animate({ "background-image": "linear-gradient(to right," + colors[0] + " 40%, " + colors[1] + " 60%)", "color": "#fff" }, 'slow', 'ease-out')
                $("#HeadBarConfigBox a").css({ "color": "#fff" });
            } else {
                ClearStyle()
            }
        });
        // 设置返回按钮和title的颜色
        var goBackColor = $("#HeadBarConfigBox a").attr('goBackColor');
        var titleColor = $("#HeadBarConfigBox span").attr('titleColor');
        if (goBackColor) {
            $("#HeadBarConfigBox a").css({ 'color': goBackColor });
        }
        if (titleColor) {
            $("#HeadBarConfigBox span").css({ 'color': titleColor });
        }
    } else {

    }
    //  判断客服热线是否展示
    if ($headBarConfigBox.attr('serviceType') == '1') { //如果图标显示
        if (!!$headBarConfigBox.attr('iconStype') && $headBarConfigBox.attr('iconStype') !== "@@iconStype") { //如果右上角图标有配显示配置的
            $("#customerService").show().html($headBarConfigBox.attr('iconStype'));
        } else { //负责显示默认的
            $("#customerService").show();
            //返回上一页
            //$("#customerService").on("click",function(){
            //		    	客服热线要跳转的链接
            //		        location.href= site_url.historyDetail_url;
            // })
        }
    }
    //返回上一页
    $("#goBack").on("click", function () {
        if (document.referrer == '') {
            // window.isAndroid是在root文件中定义的变量
            if (window.isAndroid) {
                //这个是安卓操作系统
                window.jsObj.backNative();
            }
            // window.isIOS是在root文件中定义的变量
            if (window.isIOS) {
                //这个是ios操作系统
                window.webkit.messageHandlers.backNative.postMessage('backNative');
            }
        } else {
            location.href = "javascript:history.go(-1)";
        }
    })
    //跳转客服页面
    $("#customerService").on("click", function () {
        window.location.href = site_url.onlineCustomerTransfer_url;
    })
})
//字符串截取
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串 
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//格式化样式
function ClearStyle() {
    $("#HeadBarConfigBox").css({ "background": "rgba(0,0,0,0)", "color": "#fff" });
    $("#HeadBarConfigBox a").css({ "color": "#fff" });
}