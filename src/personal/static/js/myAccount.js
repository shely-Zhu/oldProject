//ajax调用
require('../../../common/js/components/utils.js');

//ajax调用
require('../../../common/js/ajaxLoading.js');
//zepto模块--callback
require('../../../include/js/vendor/zepto/callback.js');
//zepto模块--deferred
require('../../../include/js/vendor/zepto/deferred.js');
//路径配置文件
require('../../../include/js/vendor/config.js');
require('../../../common/js/components/elasticLayer.js');
require('../../../common/js/components/bottomNav.js');
//立即绑定/暂不绑定弹层
require('../../../common/js/components/accountOrBind.js');
//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');
var Base64 = require('../../../include/js/vendor/base64/base64.js');
//弹框提示身份证即将到期
var idDate = require('../../../common/js/components/idDate.js');

$(function() {

    var myAccount = {

        //path: window.location.href,
        invest: ['', '保守型', '稳健型', '平衡型', '成长型', '进取型'],
        isRiskAppraisal: "", // 是否已风险测评【1.否 2.是】
        custType: "", // 客户类型【0.机构 1.个人】 
        isApply: false, // 是否做过投资者分类申请
        isQueryApi: false, //是否请求过querey接口，为保证效率，页面初始话时异步请求接口
        getElements: {
            btn: $(".exit"), //退出按钮 
            errorTip: $(".againEnter"), //服务器返回错误校验的错误提示DOM
            planner: $(".planner"), //理财师
            investType: $('.investType'), //投资者分类认证
            realName: $(".realName"), //实名认证
            bankcard: $(".bankcard"), //我的银行卡
            riskBtn: $(".risk_title"), // 风险测评按钮
        },

        init: function() {
            var that = this;
            
            //页面初始化
            that.getData();
            // 请求投资者分类
            that.queryClassification();
            //绑定事件
            that.events();
        },

        //页面初始ajax请求
        getData: function() {
            var that = this;

            var obj = [{
                url: site_url.user_api,
                data: {
                    hmac: "", //预留的加密信息     
                    params: {
                        //uuid: sessionStorage.getItem('uuid') //'EE7CA9386715CBF3BAB30CD479697D72' //sessionStorage.getItem('uuid') //客户Id,打开登录页面链接带过来的参数uuid
                    }
                },
                needLogin: true,
                // async: false, //同步
                needDataEmpty: false, //需要判断data是否为空
                callbackDone: function(json) {

                    var jsonData = json.data;
                    //弹框提示身份证即将到期
                    idDate(false,window.location.href,jsonData.custType);
                    
                    that.isRiskAppraisal = jsonData.isRiskAppraisal; // 是否已风险测评【1.否 2.是】 
                    that.custType = jsonData.custType; // 客户类型【0.机构 1.个人】 
                    //设置用户名
                    $('.name .nameSec').html(jsonData.maskName);

                    //投资者分类认证链接跳转--未实名认证，不展示
                    that.getElements.investType.on("click", function() {
                        // 处理页面跳转
                        that.dealClassification(jsonData.investorClassify);
                    })

                    if (!jsonData.clientId) {
                        //未开户，显示立即开户
                        $('.openAccountBtn').show();
                        that.getElements.planner.on("click", function() {
                            if (envOrigin == 1) {
                                //出现弹框  4.0改版后直接跳转，不提示
                                window.location.href = site_url.plannerSearch_url;
                            } else {
                                window.location.href = site_url.cft_plannerSearch_url;
                            }
                        })
                        //我的积分显示成整行
                        $('.information .integral').css('width', '100%').find('.integralIcon').show();
                    } else { //公募已开户，代表合并
                        $(".final").removeClass("isBor");
                        $('.jianGuanMsg').show();
                        //显示我的银行卡
                        $('.bankcard').show();

                        that.getElements.planner.on("click", function() {
                            if (envOrigin == 1) {
                                // window.location.href=site_url.htcf_accountMerge_url;
                                window.location.href = site_url.plannerSearch_url + "?src=merge";
                            } else {
                                window.location.href = site_url.cft_plannerSearch_url + "?src=merge";
                            }
                        });
                    }

                    //todo 这里需要判断实名认证的状态，来判断要显示的页面或模块
                    //判断实名认证的情况
                    if (json.data.isCertification == "1") {
                        //未认证
                        that.goRealNameUrl = site_url.realNameStepOne_url + '?originUrl=' + new Base64().encode(window.location.href);

                        $('.realName a').find('.result').html('立即认证').show();
                        that.getElements.realName.on("click", function() {
                            if (envOrigin == 1) {
                                window.location.href = site_url.htcf_accountMerge_url;
                            } else {
                                $('.realName a').attr('href', that.goRealNameUrl);
                            }
                        })
                        //点击logo和姓名，去实名认证
                        $('.banner .icon .iconfont, .banner .name').on('click', function() {
                            if (envOrigin == 1) {
                                window.location.href = site_url.htcf_accountMerge_url;
                            } else {
                                window.location.href = that.goRealNameUrl;
                            }
                        })
                        // 移除投资者分类入口
                        $('.investDiv').remove();
                    } else if (json.data.isCertification == "2") {
                        // 已实名认证
                        if (json.data.custType == 0) {
                            //机构
                            that.custType = 0;
                            that.goRealNameUrl = site_url.orgBass_url;
                        } else if (json.data.custType == 1) {
                            //个人
                            that.custType = 1;
                            that.goRealNameUrl = site_url.perBass_url;
                            // 显示推荐有礼入口
                            $('.recommend_wrap').show();
                        } else if (json.data.custType == 2) {
                            //产品
                            that.custType = 2;
                            that.goRealNameUrl = site_url.pdBass_url;
                        }
                        var resultUrl = site_url.realNameResult_url + '?fontName=' + encodeURIComponent(encodeURIComponent(json.data.maskName.replace(/\*/g, '\\u002a'))) + '&maskCertNo=' + encodeURIComponent(json.data.maskCertNo.replace(/\*/g, '\\u002a')) + '&certType=' + encodeURIComponent(encodeURIComponent(json.data.certTypeDesc));
                        $('.realName a').attr('href', resultUrl).find('.result').html('已认证').show();
                        //点击logo和姓名，去实名认证
                        $('.banner .icon .iconfont, .banner .name').on('click', function() {
                            window.location.href = that.goRealNameUrl;
                        })
                        //$('.items .real').html('已认证').addClass('non').parent().attr('href', resultUrl);
                    }
                },
            }];
            $.ajaxLoading(obj);
        },
        queryClassification: function() {
            var that = this;
            var obj = [{ // 请求投资者分类查询接口
                url: site_url.queryClassification_api,
                data: {
                    hmac: "", //预留的加密信息     
                    params: {}
                },
                needLogin: true,
                // async: false, //同步
                needDataEmpty: false, //需要判断data是否为空
                callbackDone: function(json) {
                    var data = json.data,
                        auditStatus = data.auditStatus; //审核状态 ,空，未做过,0：审核中 1：审核通过 2：审核驳回 3：已撤销

                    // 状态为空时,isApply为false;
                    that.isApply = !!String(auditStatus);
                    // 已请求过qureyClassification接口
                    that.isQueryApi = true;
                },
            }];
            $.ajaxLoading(obj);

        },
        /**
         * [dealClassification 投资者分类逻辑处理，判断是跳到初始页面还是结果页]
         * @author songxiaoyu 2018-07-06
         * @return {[type]} [跳转页面链接]
         */
        dealClassification: function(investorClassify) {
            var that = this,
                jumpUrl = '';
            if (!investorClassify) { // 没有投资者分类,
                var a = '';
                var jumpFunc = function() {
                    if (that.isQueryApi) { //接口请求完成，已经有审核状态结果
                        // 有审核状态,跳转结果页;没有审核状态，跳转初始话页面
                        clearInterval(a);
                        jumpUrl = that.isApply ? site_url.certificationResult_url : site_url.classification_url;
                        window.location.href = jumpUrl;
                    }
                };
                a = setInterval(jumpFunc, 300);
                // 先执行一次；
                jumpFunc();
            } else { // 有投资者分类，进结果页
                window.location.href = site_url.certificationResult_url;
            }
        },
        /*
            绑定事件
         */
        events: function() {
            var that = this;

            //点击公募开户
            $('.openAccountBtn .button').on('click', function() {
                if (envOrigin == 1) {
                    //出现弹框  4.0改版后直接跳转，不提示
                    window.location.href = site_url.htcf_accountMerge_url;
                } else {
                    if (that.custType == 0 || that.custType == 2) {
                        //机构
                        $('.elasticLayerThree').hide();
                        var obj = {
                            p: '<p>机构账号暂不支持公募在线开户购买，请联系理财师</p>'
                        }
                        $.elasticLayerTypeTwo(obj);
                    } else {
                        //个人
                        window.location.href = site_url.realNameStepOne_url + '?originUrl=' + new Base64().encode(window.location.href);
                    }
                }
            })

            //点击一键绑定
            $('.openBind .button').on('click', function() {
                if (envOrigin == 1) {
                    //出现弹框  4.0改版后直接跳转，不提示
                    window.location.href = site_url.htcf_accountMerge_url;
                } else {
                    if (that.custType == 0 || that.custType == 2) {
                        //机构
                        $('.elasticLayerThree').hide();
                        var obj = {
                            p: '<p>机构账号暂不支持公募在线开户购买，请联系理财师</p>'
                        }
                        $.elasticLayerTypeTwo(obj);
                    } else {
                        //个人
                        $('.bindNow').show();
                    }
                }
            })

            // 点击风险测评按钮
            that.getElements.riskBtn.on('click', function() {
                that.riskBtnEvent(); // 点击风测的逻辑
            })
        },

        // 点击风测的逻辑
        riskBtnEvent: function() {
            var that = this,
                smUrl;
            //是否风险测评
            if (that.isRiskAppraisal == 1) { //未风险测评

                if (that.custType == 0 || that.custType == 2) {
                    //机构
                    smUrl = site_url.questionnaireOrg_url + '&originUrl=' + new Base64().encode(site_url.mine_url);
                } else {
                    //个人
                    smUrl = site_url.questionnairePer_url + '&originUrl=' + new Base64().encode(site_url.mine_url);
                }
            } else {
                //已风险测评
                //$('.siMuRisk .result').html( that.invest[jsonData.investFavour] );
                //that.smUrl =  site_url.riskResult_url + '?src=pra';

                if (that.custType == 0 || that.custType == 2) {
                    //机构
                    smUrl = site_url.riskResult_url + '?src=org';
                } else {
                    //个人
                    smUrl = site_url.riskResult_url + '?src=per';
                }

            };
            window.location.href = smUrl;
        },


    }

    /*调用*/
    myAccount.init();

})