/**
 * author chentiancheng
 * 2020年4月24日15:05:16
 * 
 * 页面描述“
 * 返回逻辑
 * 
 *  */

module.exports = function() {

    if (document.referrer == '') {
        // window.isAndroid是在root文件中定义的变量
        if (window.isAndroid) {
            //这个是安卓操作系统
            window.jsObj.backNative();
        }
        // window.isIOS是在root文件中定义的变量
        if (window.isIOS) {
            //这个是ios操作系统
            // window.webkit.messageHandlers.backNative.postMessage(JSON.stringify({ "type": "backNative" }));
            window.webkit.messageHandlers.backNative.postMessage("backNative" );
        }
    } else {
        // 自选公募持仓列表页点击返回按钮 返回至账户首页
        if (window.location.href.indexOf('/account/views/publicAssets.html') != -1) {
            location.href = site_url.accountIndex_url
        // 定投详情点击返回，返回至我的定投计划列表页
        } else if (window.location.href.indexOf('/financial/views/publicPlacement/castSurelyDetails.html') != -1) {
            location.href = site_url.myInvestmentPlan_url
        // 现金管理持仓列表（现金管理产品列表）点击返回按钮 返回至入口 ：首页/理财（icon）,现只实现了跳转理财首页
        } else if (window.location.href.indexOf('/financial/views/publicPlacement/cashManagement.html') != -1) {
            location.href = site_url.wealthIndex_url
        // 定投计划列表页点击返回，返回到 首页/理财（icon）现只实现了跳转理财首页
        } else if (window.location.href.indexOf('/financial/views/publicPlacement/myInvestmentPlan.html') != -1) {
            location.href = site_url.wealthIndex_url
        }else if(window.location.href.indexOf('/mine/views/fundDiagnosis/fundAccountDiagnosis.html') != -1){
           //  console.log("基金账户诊断页面")
             if (window.isAndroid) {
                //这个是安卓操作系统
                window.jsObj.backNative();
            }
            // window.isIOS是在root文件中定义的变量
            if (window.isIOS) {
                //这个是ios操作系统
                // window.webkit.messageHandlers.backNative.postMessage(JSON.stringify({ "type": "backNative" }));
                window.webkit.messageHandlers.backNative.postMessage("backNative" );
            }
        }else {
            location.href = "javascript:history.go(-1)";
        }
    }



}