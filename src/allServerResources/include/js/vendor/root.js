/**
 * 通用配置地址. 
 * @author purpleZhao.
 * @version 2016-12-28.
 *
 **/
var env = 0;
var envOrigin = 0;


//因为后面需要单独做一套wap端的sso，因为wap的sso和pc的sso放到一天服务器，include只有一份，为了不和pc的root.js有冲突，所以wap的的sso登录涉及到的root.js
//在wap的sso单独的js中通过requre将root.js引入。此方法仅限在wap的sso文件中这么做，是没有办法的办法。其他文件依旧沿用原来的方式。
window.env = env;
/**
 * 设置环境变量变量：
 * 
 *要求要求要求要求要求------注意注意注意注意-------------------
 *涉及到服务器直接部署所有需要将环境变量配置到最顶部
 *只有当新增环境变量或者修改环境变量的现状时才需要通知运维人员，除此之外修改root不需要通知运维人员
 * 1. env默认为'0'，判断是本地开发/调试/测试/预生产/生产
 * 2. envOrigin = 0, //判断明泽还是财富 0-明泽  1-财富
 * 3. envType表示当前为移动端，为'wap'

 *要求var env = 0; var    envOrigin = 0;此条语句必须这样写，为了线上部署构建时监听 
 */
//var env = 0;  //环境变量，判断是本地开发0/调试1/测试2/预生产3/生产4
//var   envOrigin = 0; //判断明泽还是财富 0-明泽  1-财富  2-中岩  3-融泽  4-财富恒天  5-oauth,
/*********************************这里判断是否为app****************************************/
var pathname = window.location.href;

var appId = splitUrl()['appId']; //表示当前为app，必须传1
if (appId || getCookie('appId')) {
    //是，设置全局变量currentIsApp为true
    window.currentIsApp = true;
}
// 判断移动端设备
var u = navigator.userAgent,
    app = navigator.appVersion;
window.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

/*********************************这里判断是否为app end****************************************/




/*****************************各环境域名配置**************************************/
/*罗列现有服务器中所设置的所有域名
 *
 *
 */
// var mock_server = "http://172.16.191.168:8089", //前端本地开发时，接口调用的地址
var mock_server = "http://localIp:8088", //前端本地开发时，接口调用的地址

    /*股份www.chtwm.com所对应所有环境的域名*/
    chtwm_local = "https://wap.chtwmlocal.com",
    chtwm_test = "https://wap.chtwmtest.com",
    chtwm_haomaojf = "https://wap.haomalljf.com",
    chtwm_online = "https://wap.chtwm.com",

    /*二级域名股份wm.chtwm.com所对应所有环境的域名*/
    wm_haomaojf = "https://wm.haomalljf.com",
    wm_online = "https://wm.chtwm.com",

    /*明泽www.chtfund.com所对应所有环境的域名*/
    chtfund_local = "https://wap.htjf4.com",
    chtfund_test = "https://wap.chtfundtest.com",
    chtfund_haomaojf = "https://wap.haomaojf.com",
    chtfund_online = "https://wap.chtfund.com",

    /*中岩http://wap.rongzeasset.com所对应所有环境的域名*/
    cathayrock_local = "http://wap.cathayrocklocal.com",
    cathayrock_test = "http://wap.cathayrocktest.com",
    cathayrock_haomaojf = "http://wapcathayrock.haomalljf.com",
    cathayrock_online = "http://wap.cathayrock.com",

    /*融泽http://wap.cathayrocklocal.com所对应所有环境的域名*/
    rongzeasset_local = "http://wap.rongzeassetlocal.com",
    rongzeasset_test = "http://wap.rongzeassettest.com",
    rongzeasset_haomaojf = "http://waprongzeasset.haomalljf.com",
    rongzeasset_online = "http://wap.rongzeasset.com",

    /*积分商城授权登录www.oauth.com所对应所有环境的域名---oauth域名*/
    oauth_local_test = "https://oauth2.chtwmtest.com",
    oauth_haomaojf = "https://oauth2.haomalljf.com",
    oauth_online = "https://oauth2.chtwm.com",

    /*app私募https://apps.chtfund.com所对应所有环境的域名*/
    apps_local = "https://apps.htjf4.com",
    apps_test = "https://apps.chtfundtest.com",
    apps_haomaojf = "https://apps.haomaojf.com",
    apps_online = "https://apps.chtfund.com",

    /*app公募https://pofapp.chtfund.com所对应所有环境的域名*/
    pofapp_url = "https:/pofapp.htjf4.com",
    pofapp_test = "https://pofapp.chtfundtest.com",
    pofapp_haomaojf = "https://pofapp.haomaojf.com",
    pofapp_online = "https://pofapp.chtfund.com",

    // app改版后h5的域名地址 静态资源所在服务器
    h5_local = "https:/h5.htjf4.com",
    h5_test = "https://h5.chtfuntest.com",
    h5_haomaojf = "https://h5.haomaojf.com",
    h5_online = "https://h5.chtfund.com",


    // sso登录域名
    sso_local = "https://sso.chtwmlocal.com",
    sso_test = "https://sso.chtwmtest.com",
    sso_haomaojf = "https://sso.haomalljf.com",
    sso_online = "https://sso.chtwm.com",


    // 在线客服  
    onlineCustomer_test = "http://172.16.196.43:9080",
    onlineCustomer_haomaojf = "http://zxkf.haomalljf.com",
    onlineCustomer_online = "http://zxkf.chtwm.com",

    // 营销活动
    recommend_test = "https://172.16.162.190:8011",
    // recommend_haomaojf = "https://wx.uata.haomalljf.com/api/brand/index.html?activityId=qwJ0pXBGtwHBxJaeUOAq%2Bw%3D%3D&channel=3",
    recommend_haomaojf = 'http://wx.chtwm.com/api/brand/index.html?activityId=pWhA5xJTKF4Zfst%2B9ycHqQ%3D%3D&channel=3';
    recommend_online = 'http://wx.chtwm.com/api/brand/index.html?activityId=pWhA5xJTKF4Zfst%2B9ycHqQ%3D%3D&channel=3';
    // recommend_online = "https://wx.chtwm.com/api/brand/index.html?activityId=pWhA5xJTKF4Zfst%2B9ycHqQ%3D%3D&channel=3";


//这是app时，存储本地cookie时的domain
var d_url_local = '.htjf4.com',
    d_url_test = '.chtfundtest.com',
    d_url_haomaojf = '.haomaojf.com',
    d_url_online = '.chtfund.com';

/*************************************************************************************/
/**
 * 设置存放域名的变量
 *  
 * 1. originFund_public 存放公募域名
 * 2. originFund_private 存放私募域名
 * 3. oauth_url 存放oauth2域名
 */
var originFund_public = '', //公募
    originFund_private = '', //私募
    oauth_url = '', //oauth2域名
    d_url = ''; //app时，存储到本地cookie的domain
/************************************************************************************/

/***********************跳转链接 域名配置*****************************/
/**
 * 说明：
 *
 * go_url里放置跳转链接域名的配置
 * 目前跳转都不使用域名，因此这里只配置了no_url，且为空
 * 
 */
window.go_url = {
        no_url: '',
        oauth_url: '', // oauth跳转域名
        apps_url: '', //app私募跳转域名
        pofapp_url: '', //app私募跳转域名
        wap_url: '', //wap跳转域名
        cft_url: '', // 股份(财富)域名
        wm_url: '', // 股份(财富)二级页面跳转域名
        rock_url: '', //中岩域名
        sso_url: '',
        marketCampaign_url: '',  // 营销活动

    }
    /***********************跳转链接 域名配置 end*****************************/

/*
 * 针对不同环境设置不同域名
 * 
 * 说明：
 * 根据env变量来判断不同环境
 * 根据currentIsApp判断是wap还是app
 *
 * wap公私募域名相同，但app的公私募域名不同，
 * 因此为了使不同环境保持一致性，每个情况下都将公私募域名分开配置
 * 但在wap中两个域名是相同的
 *
 */

//env=0  -------  前端本地开发
//此时无论app还是wap，域名都是一样的
// if (env == 0) {
//     originFund_public = mock_server; //前端本地开发时，公募模拟数据请求地址
//     originFund_private = mock_server; //前端本地开发时，私募模拟数据请求地址
//     oauth_url = oauth_local_test; //oauth_url授权登陆  本地不配置接口，直接使用测试环境的

//     //明泽页面跳转域名
//     //go_url.wap_url = mock_server;
//     go_url.sso_url = mock_server;
//     go_url.apps_url = apps_test; //app没有本地开发环境，所以暂时引入测试域名，开发的时候只要保证域名跳转正确即可
//     go_url.pofapp_url = pofapp_test; //app没有本地开发环境，所以暂时引入测试域名，开发的时候只要保证域名跳转正确即可
//     go_url.oauth_url = oauth_local_test; //oauth_url授权登陆  本地不配置接口，直接使用测试环境的
//     go_url.onlineCustomer_url = onlineCustomer_test; // 在线客服
// }

if (!window.currentIsApp) {
    //此时为wap，不是app

    //env=1 ---------  wap的前后端调试环境
    if (env == 1 || env == 5) {
        go_url.cft_url = chtwm_local; // 财富域名
        go_url.oauth_url = oauth_local_test; // 跳转地址需要
        go_url.onlineCustomer_url = onlineCustomer_test; // 在线客服
        go_url.marketCampaign_url = recommend_test;  // 营销活动
        go_url.h5_url = h5_test;   // h5 静态资源


        if (envOrigin == 0) {
            //明泽
            originFund_public = chtfund_local;
            originFund_private = chtfund_local;

            //明泽页面跳转域名
            go_url.wap_url = chtfund_local;
            go_url.apps_url = apps_test; //app没有联调环境，所以暂时引入测试域名，开发的时候只要保证域名跳转正确即可
            go_url.pofapp_url = pofapp_test; //app没有联调环境，所以暂时引入测试域名，开发的时候只要保证域名跳转正确即可

            // sso
            go_url.sso_url = sso_local;

            //财富域名
        } else if (envOrigin == 1) {
            //财富
            originFund_public = chtwm_local;
            originFund_private = chtwm_local;

            // 财富页面跳转域名
            go_url.wm_url = wm_haomaojf;
            go_url.wap_url = chtfund_local;
            go_url.rock_url = cathayrock_local;

            // sso
            go_url.sso_url = sso_local;
        } else if (envOrigin == 2) {
            //中岩
            originFund_public = cathayrock_local;
            originFund_private = cathayrock_local;
        } else if (envOrigin == 3) {
            //融泽
            originFund_public = rongzeasset_local;
            originFund_private = rongzeasset_local;
        }
    }

    //env=2 ---------  wap的测试环境
    if (env == 2) {
        go_url.cft_url = chtwm_test; //恒天财富的域名
        go_url.oauth_url = oauth_local_test; // oauth域名
        go_url.onlineCustomer_url = onlineCustomer_test; // 在线客服
        go_url.marketCampaign_url = recommend_test;  // 营销活动
        go_url.h5_url = h5_test;   // h5 静态资源



        if (envOrigin == 0) {
            //明泽
            originFund_public = chtfund_test;
            originFund_private = chtfund_test;

            //明泽页面跳转域名
            go_url.wap_url = chtfund_test;
            go_url.apps_url = apps_test;
            go_url.pofapp_url = pofapp_test;

            // sso
            go_url.sso_url = sso_test;
        } else if (envOrigin == 1) {
            //财富
            originFund_public = chtwm_test;
            originFund_private = chtwm_test;

            // 财富页面跳转域名
            go_url.wm_url = wm_haomaojf;
            go_url.wap_url = chtfund_test;
            go_url.rock_url = cathayrock_test;

            // sso
            go_url.sso_url = sso_test;


        } else if (envOrigin == 2) {
            //中岩
            originFund_public = cathayrock_test;
            originFund_private = cathayrock_test;
        } else if (envOrigin == 3) {
            //融泽
            originFund_public = rongzeasset_test;
            originFund_private = rongzeasset_test;
        }
    }

    //env=3 ---------  wap的预发布环境
    if (env == 3) {
        go_url.cft_url = chtwm_haomaojf; //恒天财富的域名
        go_url.oauth_url = oauth_haomaojf;
        go_url.onlineCustomer_url = onlineCustomer_haomaojf; // 在线客服
        go_url.marketCampaign_url = recommend_haomaojf;  // 营销活动
        go_url.h5_url = h5_haomaojf;   // h5 静态资源

        if (envOrigin == 0) {
            //明泽
            originFund_public = chtfund_haomaojf;
            originFund_private = chtfund_haomaojf;

            //明泽页面跳转域名
            go_url.wap_url = chtfund_haomaojf;
            go_url.apps_url = apps_haomaojf;
            go_url.pofapp_url = pofapp_haomaojf;

            //财富域名

            // sso
            go_url.sso_url = sso_haomaojf;

        } else if (envOrigin == 1) {
            //财富
            originFund_public = chtwm_haomaojf;
            originFund_private = chtwm_haomaojf;

            // 财富页面跳转域名
            go_url.wm_url = wm_haomaojf;
            go_url.wap_url = chtfund_haomaojf;
            go_url.rock_url = cathayrock_haomaojf;
            // sso
            go_url.sso_url = sso_haomaojf;

        } else if (envOrigin == 2) {
            //中岩
            originFund_public = cathayrock_haomaojf;
            originFund_private = cathayrock_haomaojf;
        } else if (envOrigin == 3) {
            //融泽
            originFund_public = rongzeasset_haomaojf;
            originFund_private = rongzeasset_haomaojf;
        }
    }

    //env=4 ---------  生产环境
    if (env == 4) {
        go_url.cft_url = chtwm_online; //恒天财富的域名
        go_url.oauth_url = oauth_online; // oauth域名
        go_url.onlineCustomer_url = onlineCustomer_online; // 在线客服
        go_url.marketCampaign_url = recommend_online;  // 营销活动
        go_url.h5_url = h5_online;   // h5 静态资源

        if (envOrigin == 0) {
            //明泽
            originFund_public = chtfund_online;
            originFund_private = chtfund_online;

            //明泽页面跳转域名
            go_url.wap_url = chtfund_online;
            go_url.apps_url = apps_online;
            go_url.pofapp_url = pofapp_online;
            // sso
            go_url.sso_url = sso_online;
        } else if (envOrigin == 1) {
            //财富
            originFund_public = chtwm_online;
            originFund_private = chtwm_online;

            //财富页面跳转域名
            go_url.wm_url = wm_online;
            go_url.wap_url = chtfund_online;
            go_url.rock_url = cathayrock_online;
        } else if (envOrigin == 2) {
            //中岩
            originFund_public = cathayrock_online;
            originFund_private = cathayrock_online;
        } else if (envOrigin == 3) {
            //融泽
            originFund_public = rongzeasset_online;
            originFund_private = rongzeasset_online;
        }
    }
} else {
    //此时是app

    //env=1不存在 ---------  app中h5没有联调环境，只能上测试和app进行联调
    if (env == 1) {
        go_url.oauth_url = oauth_local_test;
        d_url = d_url_local;
        go_url.marketCampaign_url = recommend_test;  // 营销活动
        go_url.onlineCustomer_url = onlineCustomer_test; // 在线客服
        go_url.h5_url = h5_test;   // h5 静态资源

        if (envOrigin == 0) {
            //明泽
            originFund_public = pofapp_url; //app服务器中的公募域名
            originFund_private = apps_local; //app服务器中的私募域名
        } else {
            //财富
            originFund_public = chtwm_local;
            originFund_private = chtwm_local;
        }
    }

    //env=2 ---------  app中h5的测试环境
    if (env == 2) {
        go_url.oauth_url = oauth_local_test;
        d_url = d_url_test;
        go_url.marketCampaign_url = recommend_test;  // 营销活动
        go_url.onlineCustomer_url = onlineCustomer_test; // 在线客服
        go_url.h5_url = h5_test;   // h5 静态资源

        if (envOrigin == 0) {
            //明泽
            originFund_public = pofapp_test; //app服务器中的公募域名
            originFund_private = apps_test; //app服务器中的私募域名
        } else {
            //财富
            originFund_public = chtwm_test;
            originFund_private = chtwm_test;
        }
    }

    //env=3 ---------  预发布环境
    if (env == 3) {
        go_url.oauth_url = oauth_haomaojf;
        d_url = d_url_haomaojf;
        go_url.marketCampaign_url = recommend_haomaojf;  // 营销活动
        go_url.onlineCustomer_url = onlineCustomer_haomaojf; // 在线客服
        go_url.h5_url = h5_haomaojf;   // h5 静态资源

        if (envOrigin == 0) {
            //明泽
            originFund_public = pofapp_haomaojf;
            originFund_private = apps_haomaojf;
        } else {
            //财富
            originFund_public = chtwm_haomaojf;
            originFund_private = chtwm_haomaojf;
        }

    }

    //env=4 ---------  生产环境
    if (env == 4) {
        go_url.oauth_url = oauth_online;
        d_url = d_url_online;
        go_url.marketCampaign_url = recommend_online;  // 营销活动
        go_url.onlineCustomer_url = onlineCustomer_online; // 在线客服
        go_url.h5_url = h5_online;   // h5 静态资源

        if (envOrigin == 0) {
            //明泽
            originFund_public = pofapp_online;
            originFund_private = apps_online;
        } else {
            //财富
            originFund_public = chtwm_online;
            originFund_private = chtwm_online;
        }

    }
}
/*****************************各环境域名配置   end**************************************/





/*****************************  各环境接口格式配置**************************************/

/**
 * 说明：
 *
 * 不同环境下的接口api的路径格式，只有一个区别：
 * 前端本地开发即env=0时，公募接口没有pof
 * env=其他数字时，wap的公募接口有pof，app的公募接口没有pof
 * 因此先声明一个http_url，其中的api_url是公募接口的路径，默认为空
 * 然后根据env的不同，分别设置不同的http_url.api_url
 */

window.http_url = {
    wapApi_url: '/wap', // wap接口
    web_url: '/web', // 账户接口
    app_url: '/app', // App接口,
    webPof_url: '/web/pof', //私募理财

    pof_url: '/wap/pof', //公募接口-----老版本兼容，禁用,使用wapApi_url替换
    pef_url: '/wap/pef', //私募接口-----老版本兼容，禁用,使用wapApi_url替换
    content_url: '/wap/content', // 内容接口-----老版本兼容，禁用,使用wapApi_url替换
    account_url: '/wap/account', // 账户接口-----老版本兼容，禁用,使用wapApi_url替换
}





/*****************************各环境接口格式配置  end**************************************/





/*********************************这里判断是否为app并设置cookie****************************************/
if (window.currentIsApp) {
    //是app

    //设置cookie
    document.cookie = "appId=1";

    //在页面上添加一个a链接，用于未登录时的状态修改
    $('body').append('<iframe src="appHref://" id="script_login" style="position:absolute;z-index:1000;height:0;width:0;"></iframe>');
    $('body').append('<iframe src="appHref://" id="script_risk" style="position:absolute;z-index:1000;height:0;width:0;"></iframe>');
}

/*********************************判断是否为app并设置cookie  end****************************************/


//因为root.js不使用webpack配置，需要将splitUrl方法写在这里
function splitUrl() {
    var arg = [],
        url = [],
        path = window.location.href;



    //如果path中没有?，获取url会报错，所以要先判断一下
    if (path.indexOf('?') != -1) {
        //有?的情况
        var s = path.substring(path.indexOf('?') + 1);

        var ss = s.split('&');

        for (var i = 0; i < ss.length; i++) {

            var index = ss[i].indexOf('=');

            if (index != -1) {

                if (!arg[ss[i].substring(0, index)]) {
                    //地址栏url上可能有经过base64加密的参数，此处不处理
                    arg[ss[i].substring(0, index)] = ss[i].substring(index + 1);
                }
            }
        }
    }
    return arg;
}


function getCookie(name) {
    var c = document.cookie.replace(/\s/g, '');
    var b = c.split(';');
    for (var i = 0; i < b.length; i++) {
        var s = b[i].split('=');
        if (s[0] == name) {
            return s[1];
        }
    }
    return '';
}

function Base64() {

    // private property  
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding  
    this.encode = function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding  
    this.decode = function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding  
    _utf8_encode = function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding  
    _utf8_decode = function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}