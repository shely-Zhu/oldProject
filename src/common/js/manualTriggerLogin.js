/*
 * @page: 手动触发登录
 * @Author: songxiaoyu
 * @Date:   2018-08-30 10:33:43
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-10-09 16:40:14
 * @description:请求login_html_url接口，分2种情况，
 *     1.类似注册页面，是拦截到的登录，将地址中的redirectUrl传回
 *     2.类似私募产品页面 ，页面未登录，手动触发登录，将当前地址，window.locatin.href传到redirectUrl
 *     3.类似老带新页面的注册成功后，直接跳转登录页面，没有参数，默认跳回首页，redirectUrl值为undefinded,后台自动跳回当前域名首页
 */
var splitUrl = require('./splitUrl.js');

var manualTriggerLogin = {
    // 1.
    splitFunc: function() {
        if (splitUrl()['redirectUrl']) {
            // 1
            window.location.href = site_url.login_html_url + '?redirectUrl=' + splitUrl()['redirectUrl'];

        } else {
            // 3.如果没有来源，默认跳转我的页面
            window.location.href = site_url.login_html_url + '?redirectUrl=' + encodeURI(encodeURI(site_url.mine_url));
        }
        //防止window.location.href在执行完请求里的所有代码之后再跳转
        throw 'jump login';
        return false;
    },
    locationFunc: function(data) {
        if (data && typeof(data.data) == 'string' && (data.data!='')) {
            // 调用黑名单接口，直接跳转data.data
            window.location.href = data.data;
        } else {
            // 2.类似私募产品页面 ，页面未登录，手动触发登录，将当前地址，window.locatin.href传到redirectUrl
            window.location.href = site_url.login_html_url + '?redirectUrl=' + encodeURI(encodeURI(window.location.href));
        }

        //防止window.location.href在执行完请求里的所有代码之后再跳转
        throw 'jump login';
        return false;
    }
};

module.exports = manualTriggerLogin;