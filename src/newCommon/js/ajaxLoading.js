/**
 * ajax请求的封装
 * @author  yangjinlai
 *
 * 参数说明：
 * 1. obj是传进来的ajax发送请求的配置，是一个数组，里面每一条数据都是一个对象，对应一个ajax请求，
 *      数组里有几个对象，就会发几个请求
 *    obj格式：
 *    var obj = [
     *    {
     *      url: site_url.banner_url,
            data: {
                ……
            },
            callbackDone: function(){},
            callbackFail: function(){},
            ……
     *    },
     *    {
     *      url: site_url.banner_url,
            data: {
                ……
            },
            callbackDone: function(){},
            ……
     *    },
     *    ……
 *    ]
 * 2. headAjax标识是否是头部的接口，传true意思为头部，不传或者传其他值表示不是头部接口
 *    accountLeft标识是否是我的资产-左树的接口，true-是，false或不传-不是
 *    在判断整个页面的ajax初始化请求是否完成时，会根据headAjax和accountLeft判断是否有头部/左树接口
 *
 *
 * obj中，每一条数据(ajax请求)的默认参数说明：
 *  url: '', //接口地址
    data: {}, //需要传给接口的数据
    type: 'POST', //post/get
    dataType: 'JSON',
    async: true, //true-异步  false-同步
    needLogin: false, //发送请求时，需要判断登录是否过期  true-需要，false-不需要，默认false
    needCrossDomain: false,  //true-跨域, false-不跨域，默认false
    needDataEmpty: true, //需要判断data是否为空  true-需要  false-不需要，默认true
    needLoading: false, //不需要显示loading遮罩  true-需要，false-不需要，默认false

    callbackDone: function(){},
    //接口成功的回调函数（如果needDataEmpty=true，则需要判断data.data是否为空，如果为空，不调用
    callbackDone，而调用callbackNoData）

    callbackFail: function(){},
    //请求失败，或接口成功但data.status=1时的回调函数

    callbackNoData: function(){}
    //接口成功，但data.data没有数据时的回调函数（此时needDataEmpty=true）


 *
 * 3个函数：
 * 1. ajaxFunc  发送请求
 * 2. sendAjax  循环obj 调用ajaxFunc，发送每一次的请求
 * 3. isEmpty 判断data.data是否为空
 *
 *
 * 本插件使用方式：
 * $.ajaxLoading(obj);
 *
 * 修改：7/18，添加app交互判断登录状态的处理
 *
 * 2018-09-25 私募首页登录状态判断的接口等，因wap做单点登录，需改成sso的checkuserinfo;
 *             app没有做，需用之前的isLogin接口，所以将app域名下，checkuserinfo请求改成isLogin
 *
 */


require('./components/utils.js');
//黑色提示条的显示和隐藏
require('@pathCommonCom/tipAction/tipAction.js');
var Base64 = require('../../include/js/vendor/base64/base64.js');
var manualTriggerLogin = require('./components/manualTriggerLogin.js');
var splitUrl = require('./components/splitUrl.js')();

//如果是app，判断登录状态
//var appIsLogin = require("./components/app/needLogin.js");



(function($) {

    $.extend($, {

        ajaxLoading: function(param) {

            //请求次数 页面每次发一个ajax请求，次数+1，当次数为0的时候再隐藏遮罩层
            //逻辑错误 本期废弃掉 后期优化的时候可以将涉及此逻辑的地方干掉
            var requestCount = 0;
            var needLoading = true;
            var timerStart = false;//30秒的定时器是否开启 为了防止特殊情况接口时间太长 开启一个30秒的定时器 30秒后允许点击headBar

            //默认配置
            var defaults = {
                url: '',
                data: {},
                type: 'POST',
                dataType: 'json',
                async: true, //true-异步  false-同步
                contentTypeSearch: false, //false: application/json,入参data为json字符串  , true:  application/x-www-form-urlencoded ，入参data为json对象
                //因wap中部分页面黑名单接口没有加needLogin=true参数，导致股份首次跳明泽时，
                //（明泽首次跳转股份也可能有此问题）
                //因本地没有cookie，接口会返回code为CF0004，又没有设置此参数，不判断是否CF0004，
                //只会提示msg而不跳转sso（此处跳转到sso是为了写cookie，并不会打开登录页面），
                //导致页面上出现“请重新登录”的黑条提示，然后如果后面有其他配置了needLogin=true的接口，
                //才会判断CF0004，去sso写cookie，页面可以正常打开
                //
                //因只有黑名单接口才会返回CF0004，凡是CF0004时就要跳转登录页（问过贺龙）
                //这里将needLogin改为true，让所有接口都会去判断code是否等于CF0004
                //yangjinlai 2018-10-12
                needLogin: true, //需要判断登录是否过期
                needCrossDomain: false, //true-跨域, false-不跨域
                needDataEmpty: true, //需要判断data是否为空
                needLoading: true, //需要显示loading遮罩
                callbackDone: function() {},
                callbackFail: null,
                callbackNoData: function() {},
                //formData
                formData: false, //判断是否需要使用formData上传
                loginNotJump: false, //判断40007后是否需要跳转到登录页面，true--不跳转, false---跳转
                callbackLoginFunc: function() {}, //如果未登录不需要跳转，执行此函数
                appRisk: false, //当需要与app交互时
            };

            //合并配置
            var obj = [];
            $.each(param, function(i, el) {
                obj.push($.extend({}, defaults, el));
            })
            //发送ajax请求
            var ajaxFunc = function(obj) {

                var ajax = $.Deferred(); //声明一个deferred对象
                //设置ajax请求的contentType  data数据添加JSON.stringify
                var contentType = 'application/json; charset=UTF-8',
                    data = JSON.stringify(obj.data);

                if(obj.contentTypeSearch){
                    contentType='application/x-www-form-urlencoded; charset=UTF-8';
                    data=obj.data;
                }

                if (obj.needCrossDomain) {
                    var ajaxJson = {};
                    // 跨域请求sso checkuserinfo接口
                    if (window.currentIsApp) {
                        // app没有单点登录，故请求当前域名下的login接口
                        ajaxJson = {
                            url: site_url.checkLogin_api,
                            data: {
                            },
                            contentType: contentType,
                            type: obj.type,
                            dataType: 'json',
                            async: false,
                        };
                    } else {
                        // wap 使用jsonp请求接口
                        ajaxJson = {
                            url: obj.url,
                            data: data,
                            contentType: contentType,
                            type: obj.type,
                            dataType: obj.dataType,
                            //跨域需要以下配置
                            jsonp: "callback",
                            crossDomain: true,
                            //这段代码不能注释，否则跨域时cookie带不过去
                            xhrFields: {
                                withCredentials: env != 0 ? true : false
                            },
                            headers: {
                                "X-Requested-With": 'XMLHttpRequest',
                            },
                        };
                        if (env == 0) {
                            //如果是本地开发则使用模拟数据，不需要添加headers
                            delete ajaxJson["headers"];
                        };
                    }

                    ajax = $.ajax(ajaxJson);
                } else {
                    //不使用formData格式上传
                    var ajaxJson = {
                        url: obj.url,
                        data: data,
                        contentType: contentType,
                        type: obj.type,
                        dataType: obj.dataType,
                        async: obj.async,
                    };

                    ajax = $.ajax(ajaxJson);
                }


                ajax.done(function(data) {
                    if (obj.needLogin) { // 需要登录
                        if (obj.loginNotJump && data.status == '4007') { //如果未登录，且不需要跳转,sso接口未登录code也是cf0004,需要通过islogin判断
                            //未登录状态下，不跳转页面，执行对应函数
                            obj.callbackLoginFunc(data);
                            return false;

                        } else { //未登录，需要跳转

                            //微信判断登录状态 
                            if (data.code == 'WF0010') {
                                tipAction(data.message, function() {
                                    //跳转到微信授权登陆页
                                    window.location.href = go_url.wx_login_url + window.location.origin + window.location.pathname;
                                })
                                return false;
                            } else if (obj.dataType == 'jsonp' && data.status == '4007') {
                                $('.netLoading').hide();
                                // sso接口未登录，需跳转
                                manualTriggerLogin.locationFunc(data);
                                //防止window.location.href在执行完请求里的所有代码之后再跳转
                                throw 'jump login';
                                return false;
                            } else if (data.status == '4007') {
                                $('.netLoading').hide();
                                // 其他黑名单接口未登录，跳转data.data
                                manualTriggerLogin.locationFunc(data);
                                //防止window.location.href在执行完请求里的所有代码之后再跳转
                                throw 'jump login';
                                return false;
                                // tipAction('请在APP端登录')
                            }
                        }
                    }


                    if (data.status != '0000' && data.status != '4007' && data.status != '1000') {
                        //数据请求失败的情况
                        if (!data.message) {
                            data.message = '系统开小差啦，请联系客服 400-8980-618';
                        }


                        obj.callbackFail ? obj.callbackFail(data) : tipAction(data.message);

                        return false;
                    }

                    //数据请求成功的情况
                    var json = data.data;

                    if (obj.needDataEmpty && data.status == '1000') { // 返回1000代表没有数据，走callbackNodata
                        //需要判断数据是否为空
                        // if ($.util.objIsEmpty(json)) {
                            //数据为空，如果有传callbackNoData，执行
                            obj.callbackNoData( data );
                            return false;
                        // }
                    }

                    //数据请求成功且不为空，执行成功的回调函数
                    if (window.currentIsApp && obj.appRisk) {
                        obj.callbackDone(data, function() {
                            //这里传递这句话，做为回调函数，保存起来，页面上需要用到的时候使用
                            $('#script_risk').attr('src', 'appHref://appRisk');
                        });
                    } else {
                        obj.callbackDone(data);

                    }
                })


                //ajax错误的情况
                ajax.fail(function(data, result, message) {

                    obj.callbackFail ? obj.callbackFail(data) : tipAction("接口请求失败");
                })

                return ajax;
            }


            //循环调用ajaxFunc，
            //发送ajax请求前后的各种逻辑，
            //判断页面初始化请求是否全部成功
            var sendAjax = function() {

                var dtd = $.Deferred(); // 新建一个deferred对象

                var length = obj.length, //当前ajax请求的数量
                    arr = 0; //存放已成功的请求数量

                //循环obj数组
                $.each(obj, function(i, el) {
                    //发送请求前，先判断是否需要显示遮罩
                    needLoading = el.needLoading;
                    if (needLoading) {
                        //每次请求都把请求次数+1
                        requestCount ++;
                        console.log('start: ' + el.url + '----' + requestCount);
                        //needLoading为true时，显示$('#loading')遮罩
                        if ('none' == $('.listLoading').css('display')){
                            //排除一进页面就发送请求的情况，这种情况只显示页面的遮罩层即可，否则两种loading框切换会很丑
                            $('.netLoading').show();
                        }
                    }

                    if (!timerStart){
                        timerStart = true;
                        setTimeout(function() {
                            //如果30秒后loading框还存在 就把弹层的z-index变低 允许headBar可点击。
                            timerStart = false;
                            $('.netLoading').css('z-index', '99999');
                            $('.listLoading').hide();
                        }, 15000)
                    }

                    //调用ajaxFunc，发送ajax请求
                    var ar = ajaxFunc(el);

                    //ajax请求之后的处理
                    ar.fail(function() {
                            //ajax请求不成功的时候
                            console.log('失败了');
                            //手动将dtd置为reject
                            dtd.reject();
                            //标识请求未成功
                            //window.ajaxLoadingFalse = true;
                        })
                        .done(function() {
                            //ajax请求成功，arr+1
                            arr += 1;

                            if (length == arr) { //如果所有接口都已发送完毕

                                dtd.resolve();
                            }
                        })
                })

                //监听dtd的状态，进行遮罩loadiing处理
                $.when(dtd)
                    .fail(function() {
                        //失败状态
                        console.log('失败了');
                        $('.listLoading').hide();
                        if (needLoading) {
                            requestCount -= 1;
                            console.log('fail: ' + param.url + "----" + requestCount);
                            // if (requestCount == 0){
                                $('.netLoading').hide();//数据请求成功 遮罩隐藏
                            // }
                        }
                        

                        setTimeout(function() { //过10秒钟，隐藏遮罩
                            $('.netLoading').hide();
                            $('.listLoading').hide();
                        }, 15000)

                    })
                    .done(function() {
                        //成功状态
                        console.log('ajax请求全部成功')
                        $('.listLoading').hide();
                        if (needLoading) {
                            requestCount -= 1;
                            console.log('done: ' + param.url + "----" + requestCount);
                        }
                        // if (requestCount == 0){
                            $('.netLoading').hide();//数据请求成功 遮罩隐藏
                        // }
                    })
            }

            //调用sendAjax，发送请求
            sendAjax();
        },
    })

})(Zepto);