/**
 * 私募产品首页
 * @author  zhangweipeng 2017-07-12
 */

//接口及静态资源路径
require('@pathIncludJs/vendor/config.js');
//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
//底层封装方法组件
require('@pathCommonJsCom/utils.js');
require('@pathCommonJsCom/app/ifApp.js');
//ajax封装
require('@pathCommonJs/ajaxLoading.js');
//ajax封装
require('@pathCommonJsCom/elasticLayer.js');
//黑色提示条的显示和隐藏
var tipAction = require('@pathCommonJsCom/tipAction.js');
//Base64封装加密或解密
var Base64 = require('@pathIncludJs/vendor/base64/base64.js');
// 手动出发登录
var manualTriggerLogin = require('@pathCommonJsCom/manualTriggerLogin.js');
//底部导航条
require('@pathCommonJsCom/bottomNav.js');
//弹框提示身份证即将到期
var idDate = require('@pathCommonJsCom/idDate.js');

var index = {
    isLogin: null, //1.登录 2.未登录
    num: 1, //判断第几次请求判断登录的接口
    init: function() {
        var that = this;
        
        //检查是否登录
        that.checkLogin(true);
        that.event();

    },
    checkLogin: function(param, callback) {
        var that = this;

        var obj = [{
            url: site_url.checkUserInfo_api,
            data: null,
            async: false,
            needLogin: true,
            dataType: 'jsonp',
            needCrossDomain: true,
            loginNotJump: param, // true,未登录，不需要跳转
            needDataEmpty: false,
            callbackDone: function() { // 已登录
                that.isLogin = 1;
                if (!that.mark) {
                    that.getUserInfo(); //检查用户风险测评状态
                }
                that.num++;
                (typeof(callback) == 'function') && callback();
            },
            callbackLoginFunc: function() { // 未登录，不跳转
                that.isLogin = 2;
                if (that.num == 1) {
                    that.getData();
                }
                that.num++;
            },
            callbackFail: function(data) {
                that.isLogin = null;
                tipAction(data.message);
            }
        }]
        $.ajaxLoading(obj);
    },
    getUserInfo: function() {
        var that = this;

        var userObj = [{
            url: site_url.user_api,
            data: {
                hmac: "", //预留的加密信息     
                params: { //请求的参数信息
                }
            },
            async: false,
            riskIsData: true,
            appRisk: true,
            needDataEmpty: false,
            needLogin: true,
            callbackDone: function(data, fnc) {
                
                var jsonData = data.data;
                // 弹框提示身份证即将到期
                if(!window.currentIsApp) {
                    idDate(false, window.location.href, jsonData.custType);
                }
                
                that.mark = true; //标志是否已经调用过用户信息，已调用过的情况下不再调用
                that.isRiskAppraisal = jsonData.isRiskAppraisal;
                that.investFavour = jsonData.investFavour; //投资偏好，风险等级
                that.custType = jsonData.custType; //用户类型
                that.riskFnc = fnc;
                if (jsonData.isCertification == "1") { //未做实名认证
                    that.isName = false;
                } else if (jsonData.isCertification == "2") { //已做实名认证
                    that.isName = true;
                    that.maskName = jsonData.maskName;
                    if (jsonData.certType == "0") { //身份证
                        that.idNum = true;
                        if (jsonData.maskCertNo.length == "15") {
                            jsonData.maskCertNo.substring(14, 15) % 2 == 0 ? that.gender = "女士" : that.gender = "先生";
                        } else if (jsonData.maskCertNo.length == "18") {
                            jsonData.maskCertNo.substring(16, 17) % 2 == 0 ? that.gender = "女士" : that.gender = "先生";
                    } else {
                        that.idNum = false;
                    }
                }
                that.getData();
            },
             
        }]
        $.ajaxLoading(userObj);
    },
    getData: function() {
        var that = this;

        var initObj = [{
            url: site_url.findBannerByPosition_api,
            data: {
                hmac: "", //预留的加密信息     
                params: { //请求的参数信息
                    adPosition: "appWapIndextop",
                    limitCount: "100",
                    groupType: "bannerCategory", //组类型（信息网站来源）【请参照备注】
                },
            },
            callbackDone: function(data) {
                var jsonData = data.data;
                if (!$.util.objIsEmpty(jsonData)) { //判断是否返回了数据---已返回

                    var tplm = $("#banner-template").html();
                    var template = Handlebars.compile(tplm);
                    $(".reset .mui-scroll").html(template(jsonData));
                }

            },
              
        }, {
            url: site_url.recommend_api,
            data: {
                hmac: "", //预留的加密信息     
                params: { //请求的参数信息
                    groupType: "HTFeature", //类型（参考备注）
                    curPage: "1", // 当前页码 
                    pageSize: "1000" //每页显示条数      
                },
            },
            callbackDone: function(data) {
                var jsonData = data.data;

                if (!$.util.objIsEmpty(jsonData.pageList)) { //判断是否返回了数据---已返回

                    var tplm = $("#highlight-template").html();
                    var template = Handlebars.compile(tplm);
                    $(".highlight .mui-scroll").html(template(jsonData.pageList));
                }
            },
              
        }, {
            url: site_url.recommend_api,
            data: {
                hmac: "", //预留的加密信息     
                params: { //请求的参数信息
                    groupType: "recommend", //类型（参考备注）
                    curPage: "1", // 当前页码 
                    pageSize: "1000" //每页显示条数      
                },
            },
            callbackDone: function(data) {
                var jsonData = data.data;

                if (!$.util.objIsEmpty(jsonData.pageList)) { //判断是否返回了数据---已返回
                    if (that.isLogin == "1") { //登录状态
                        jsonData.isLogin = true;
                        if (that.isRiskAppraisal == "1") { //未进行风险测评
                            $(".recommend .mui-scroll").addClass("unRisk");
                            jsonData.isRiskAppraisal = false;
                        } else if (that.isRiskAppraisal == "2") { //已进行风险测评
                            $(".recommend .mui-scroll").addClass("seeYou");
                            jsonData.isRiskAppraisal = true;
                            $.each(jsonData.pageList, function(i, el) {
                                if (el.pefType == "2") { //类固收
                                    el.isSolid = true;
                                    if (el.pefExpectedProfitMax == "0" || el.pefExpectedProfitMax == '') {
                                        el.noMax = true;
                                        //2019-01-31修改
                                        //判断el.pefExpectedProfitMin字段是否为空，排除el.pefExpectedProfitMin为0的情况
                                        if( !el.pefExpectedProfitMin && el.pefExpectedProfitMin !== 0){
                                            el.pefExpectedProfitMin = '--';
                                        }
                                    } else {
                                        if (Number(el.pefExpectedProfitMax) <= Number(el.pefExpectedProfitMin)){
                                            el.noMax = true; 
                                        }
                                        else{
                                            el.noMax = false;
                                        }
                                        
                                    }
                                } else if (el.pefType == "3") { //浮收
                                    el.isSolid = false;
                                    //2019-01-31修改
                                    //判断el.pefNetValue字段是否为空，排除el.pefNetValue为0的情况
                                    if( !el.pefNetValue && el.pefNetValue !== 0){
                                        el.pefNetValue = '--';
                                    }
                                    //判断el.pefNetValueDate字段是否为空，排除el.pefNetValueDate为0的情况
                                    if( !el.pefNetValueDate && el.pefNetValueDate !== 0){
                                        el.pefNetValueDate = '--';
                                    }
                                }
                            })
                        }
                    } else {
                        $(".recommend .mui-scroll").addClass("unLogin");
                        jsonData.isLogin = false;
                    }
                    var tplm = $("#recommend-template").html();
                    var template = Handlebars.compile(tplm);
                    $(".recommend .mui-scroll").html(template(jsonData));
                }
            },
              
        }, {
            url: site_url.recommend_api,
            data: {
                hmac: "", //预留的加密信息     
                params: { //请求的参数信息
                    groupType: "hotPef", //类型（参考备注）
                    curPage: "1", // 当前页码 
                    pageSize: "1000" //每页显示条数      
                },
            },
            callbackDone: function(data) {
                var jsonData = data.data;

                if (!$.util.objIsEmpty(jsonData.pageList)) { //判断是否返回了数据---已返回
                    if (that.isLogin == "1") { //登录状态
                        jsonData.isLogin = true;
                        if (that.isRiskAppraisal == "1") { //未进行风险测评
                            jsonData.isRiskAppraisal = false;
                        } else if (that.isRiskAppraisal == "2") { //已进行风险测评
                            jsonData.isRiskAppraisal = true;
                            $.each(jsonData.pageList, function(i, el) {
                                if (el.pefType == "2") { //类固收
                                    el.isSolid = true;
                                    if (el.pefExpectedProfitMax == "0" || el.pefExpectedProfitMax == '') {
                                        el.noMax = true;
                                        //2019-01-31修改
                                        //判断el.pefExpectedProfitMin字段是否为空，排除el.pefExpectedProfitMin为0的情况
                                        if( !el.pefExpectedProfitMin && el.pefExpectedProfitMin !== 0){
                                            el.pefExpectedProfitMin = '--';
                                        }
                                    } else {
                                        if (Number(el.pefExpectedProfitMax) <= Number(el.pefExpectedProfitMin)){
                                            el.noMax = true; 
                                        }
                                        else{
                                            el.noMax = false;
                                        }
                                    }
                                    
                                } else if (el.pefType == "3") { //浮收
                                    el.isSolid = false;
                                    //2019-01-31修改
                                    //判断el.pefNetValue字段是否为空，排除el.pefNetValue为0的情况
                                    if( !el.pefNetValue && el.pefNetValue !== 0){
                                        el.pefNetValue = '--';
                                    }
                                    //2019-01-31修改
                                    //判断el.pefNetValueDate字段是否为空，排除el.pefNetValueDate为0的情况
                                    if( !el.pefNetValueDate && el.pefNetValueDate !== 0){
                                        el.pefNetValueDate = '--';
                                    }
                                }
                            })
                        }
                    } else {
                        jsonData.isLogin = false;
                    }
                    var tplm = $("#hot-template").html();
                    var template = Handlebars.compile(tplm);
                    $(".hot .hotWrap").html(template(jsonData));
                }
            },
              
        }]
        $.ajaxLoading(initObj);

        if (that.isLogin == "1") { //已登录
            if (that.isRiskAppraisal == "2") { //已风测
                if (that.isName) { //是否实名认证
                    if (that.idNum) { //身份证
                        $(".user .userName").html('<span class="name">' + that.maskName + '</span> <span class="gender">' + that.gender + '</span>');
                    } else {
                        $(".user .userName").html('<span class="name">尊敬的' + that.maskName + '</span>');
                    }
                } else {
                    $(".user .userName").html('<span class="name">尊敬的客户</span>');
                }
            } else {
                $(".user .userName").html('<span class="ing">风测可见</span>');
            }
        } else {
            $(".user .userName").html('<span class="ing">登录可见</span>');
        }
    },
    judge: function(url) {
        var that = this;

        if (that.isLogin == "1") { //已登录
            if ($("#script_login").length != 0 && $("#script_login").attr("src").indexOf("appLogOut") != -1) { //此时表示APP也是未登录
                return false;
            } else {
                if (that.isRiskAppraisal == "2") { //已风测

                    //todo，跳转到专题页,
                    window.location.href = url;
                } else if (that.isRiskAppraisal == "1") { //未风测
                    if (window.currentIsApp) {
                        that.riskFnc();
                    } else {
                        //弹框提示
                        var riskObj = {
                            title: '风险测评',
                            p: '<p class="elastic_p">根据《证券期货投资者适当性管理办法》，我司需了解您的风险承受能力，为您提供明确的适当性匹配意见，请您填写完成风险测评问卷，测评确定您的风险承受能力，为您匹配选择合适的理财产品。</p>',
                            yesTxt: '立即测评',
                            celTxt: '暂不测评',
                            yesButtonPosition: 'right',
                            callback: function(t) {
                                if (url.indexOf("invest") != -1) {
                                    if (that.custType == "0" || that.custType == "2") { //机构
                                        window.location.href = site_url.questionnaireOrg_url + '&originUrl=' + new Base64().encode(window.location.href);
                                    } else if (that.custType == "1") { //个人
                                        window.location.href = site_url.questionnairePer_url + '&originUrl=' + new Base64().encode(window.location.href);
                                    }
                                } else {
                                    if (that.custType == "0" || that.custType == "2") { //机构
                                        window.location.href = site_url.questionnaireOrg_url + '&originUrl=' + new Base64().encode(url);
                                    } else if (that.custType == "1") { //个人
                                        window.location.href = site_url.questionnairePer_url + '&originUrl=' + new Base64().encode(url);
                                    }
                                }
                            }
                        }
                        $.elasticLayer(riskObj);
                    }
                }
            }
        } else {
            if (window.currentIsApp) {
                return false;
            } else {
                // 手动触发login 
                manualTriggerLogin.locationFunc();
            }
        }
    },
    event: function() {
        var that = this;

        mui("body").on("tap", ".gmBtn", function() {
            window.location.href = site_url.gmProduct_url;
        })
        mui("body").on("tap", ".reset .mui-control-item", function() { //为app时，需要判断isShare
            //that.checkLogin(false);
            window.location.href = $(this).attr("url");
            /*var url=$(this).attr("url");
            that.judge(url); //url,待确定*/
        });
        mui("body").on("tap", ".market .list", function() {
            that.checkLogin(false, function() {
                // jsonp请求需放在回掉函数中
                that.judge(site_url.prdPrvLists_url);
            });
        });
        // 视频直播
        mui("body").on("tap", ".market .movie", function() {
            if (window.currentIsApp) {
                window.location.href = site_url.videoPlay_url;
            } else {
                tipAction("为提升您的使用体验，本功能正在努力优化中，敬请期待");
            }
        });
        mui("body").on("tap", ".highlight .mui-control-item", function() {
            var $this = $(this);
            that.checkLogin(false, function() {
                var url = site_url.prdPrvLists_url + "?name=" + $this.attr("name");
                that.judge(url);
            });
        });
        mui("body").on("tap", ".likeBox .user", function() {
            that.checkLogin(false, function() {
                var url = site_url.prvRec_url + "?invest=" + that.investFavour;
                that.judge(url);
            });
        });
        mui("body").on("tap", ".recommend .mui-control-item", function() {
            var $this = $(this);
            that.checkLogin(false, function() {
                var url = site_url.productPrvDetail_url + "?fundCode=" + $this.attr("code");
                that.judge(url);
            });
        });
        mui("body").on("tap", ".hot .hotList", function() {
            var $this = $(this);
            that.checkLogin(false, function() {
                var url = site_url.productPrvDetail_url + "?fundCode=" + $this.attr("code");
                that.judge(url);
            });
        });
    }
}
index.init()