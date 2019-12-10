/**
 * 会员俱乐部-活动列表
 * @author  liuhongyu 2019 11-04
 * @Date:   2019-11-08
 * @Last Modified by:   peicongcong
 * @description:
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
$(function() {
    var activityDetails = {
            //元素类名
            $e: {
                goblck: $('header a'),
                actName: $('.actName'), //活动名称
                city: $('.city'), //活动城市
                startTimeOrendTime: $('.startTimeOrendTime'), //活动时间
                actIntroduce: $('.activityIntroduce'), //活动介绍
                tipContainer: $('.tipContainer'),
                bgimg: $('#bgimg')
            },
            gV: { // 全局变量
                actType: splitUrl['actType'], //活动类型1-线上2-线下
                actId: splitUrl['actId'], //活动ID
                custType: '', //客户类型0-机构1-个人
                custCode: '', //客户编号
                btnFlag: true,
            },

            //初始化
            init: function() {
                var that = this;
                that.events();
                that.getData();
                that.getUserInfo();
                $('body').append('<iframe src="activityShare://" id="activity_share" style="position:absolute;z-index:1000;height:0;width:0;"></iframe>');
            },

            //获取活动详情数据
            getData: function() {
                var that = this;
                var obj = [{ // 系统调仓记录列表
                    url: site_url.getDetailActivity_api,
                    data: {
                        actType: that.gV.actType, //活动类型
                        actId: that.gV.actId //活动id

                    },
                    //async: false,
                    needLogin: false,
                    needDataEmpty: true,
                    callbackDone: function(json) {
                        var data = json.data;
                        if (data.actStatus == 2) {
                            $('.activityBottomBox a').html('已结束');
                            $('.activityBottomBtnBox').hide();
                            $('.activityBottomBox').show();
                        } else if (data.signUpFlag) {
                            $('.activityBottomBox a').html('已报名');
                            $('.activityBottomBtnBox').hide();
                            $('.activityBottomBox').show();
                        }
                        //金服展示图片
                        that.$e.bgimg.attr("data-original", url);
                        //活动名称
                        that.$e.actName.text(data.actName);
                        //活动地点
                        if (data.actProvince) {
                            that.$e.city.text(data.actProvince);
                        } else {
                            that.$e.city.text(data.actCity);
                        }
                        //报名时间
                        that.$e.startTimeOrendTime.html(data.actStartDateStr + '-' + data.actEndDateStr);
                        //活动介绍
                        that.$e.actIntroduce.html($(data.actIntroduce));
                        $(".lazyload").lazyload()

                    },
                    callbackFail: function(json) {
                        console.log(json.message)
                        tipAction(json.message);
                    }
                }];
                $.ajaxLoading(obj);
            },
            //页面初始用户ajax请求
            getUserInfo: function() {
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
                        that.gV.custCode = jsonData.customerNo; //客户编号
                        that.gV.custType = jsonData.accountType; // 客户类型【0.机构 1.个人】 

                    },
                }];
                $.ajaxLoading(obj);
            },
            //立即报名
            signUp: function() {
                $('.activityBottomBtnBox').addClass('disabled');
                var that = this;
                var obj = [{ // 
                    url: site_url.activityApply_api,
                    data: {
                        type: that.gV.actType, //活动类型，1-线上 2-线下
                        custType: that.gV.custType, //客户类型 0 - 机构 1-个人
                        custCode: that.gV.custCode, //客户编号
                        activityId: that.gV.actId, //活动id
                        shareCustCode: that.gV.custCode, //分享客户编号

                    },
                    //async: false,
                    needDataEmpty: true,
                    callbackDone: function(data) {
                        $('.activityBottomBtnBox').removeClass('disabled');

                        if (data.status == "0000") {
                            successTitle = data.message;
                            if (that.gV.actType == 1) { //线上活动
                                if (data.data.actStyle == 4) {
                                    //是老带新
                                    if (data.data.brandPrizeVo.isHave == 0) {
                                        //没有奖品
                                        that.successNoConNewOpen(successTitle);
                                    } else if (data.data.brandPrizeVo.isHave == 1) {
                                        //有奖品
                                        if (data.data.brandPrizeVo.prizeType == 1) {
                                            //实物
                                            that.successSwConNewOpen(successTitle, data.data.brandPrizeVo.prizeName);
                                        } else if (data.data.brandPrizeVo.prizeType == 2) {
                                            //虚拟
                                            that.successDzConNewOpen(successTitle, data.data.brandPrizeVo.prizeName);
                                        }
                                    }
                                } else {
                                    //非老带新
                                    if (data.data.brandPrizeVo.isHave == 0) {
                                        //没有奖品
                                        that.successNoConOpen(successTitle);
                                    } else if (data.data.brandPrizeVo.isHave == 1) {
                                        //有奖品
                                        if (data.data.brandPrizeVo.prizeType == 1) {
                                            //实物
                                            that.successSwConOpen(successTitle, data.data.brandPrizeVo.prizeName);
                                        } else if (data.data.brandPrizeVo.prizeType == 2) {
                                            //虚拟
                                            that.successDzConOpen(successTitle, data.data.brandPrizeVo.prizeName);
                                        }
                                    }
                                }
                            } else if (that.gV.actType == 2) { //线下活动
                                that.successNoConOpen(successTitle);
                            }

                        }


                    },
                    callbackFail: function(data) {
                        $('.activityBottomBtnBox').removeClass('disabled');
                        if (data.status == "20003") {
                            //需要风测
                            var obj = {
                                title: '温馨提示', //如果不传，默认不显示标题
                                p: '<p>' + data.message + '</p>',
                                yesTxt: '风险测评',
                                celTxt: '取消',
                                hideCelButton: false,
                                zIndex: 100,
                                needYesHref: true, //是否需要把确定按钮改成a标签，默认false
                                yesHref: site_url.riskAppraisal_url, //确定按钮a链接的默认href
                                callback: function(t) {

                                },
                            };
                            $.elasticLayer(obj)
                        } else if (data.status == "20010") {
                            //需要进行合格投资者信息认证
                            var obj = {
                                title: '温馨提示', //如果不传，默认不显示标题
                                p: '<p>' + data.message + '</p>',
                                yesTxt: '合格投资者认证',
                                celTxt: '取消',
                                hideCelButton: false,
                                zIndex: 100,
                                needYesHref: true, //是否需要把确定按钮改成a标签，默认false
                                yesHref: site_url.qualifiedInvestor_url, //确定按钮a链接的默认href
                                callback: function(t) {

                                },
                            };
                            $.elasticLayer(obj)
                        } else if (data.status == "22011") {
                            //客户未成交
                            var obj = {
                                title: '温馨提示', //如果不传，默认不显示标题
                                p: '<p>' + data.message + '</p>',
                                yesTxt: '查看产品',
                                celTxt: '取消',
                                hideCelButton: false,
                                zIndex: 100,
                                needYesHref: true, //是否需要把确定按钮改成a标签，默认false
                                yesHref: site_url.wealthIndex_url, //确定按钮a链接的默认href
                                callback: function(t) {

                                },
                            };
                            $.elasticLayer(obj)
                        } else if (data.status == "20007") {
                            //去实名
                            var obj = {
                                title: '温馨提示', //如果不传，默认不显示标题
                                p: '<p>' + data.message + '</p>',
                                yesTxt: '实名认证',
                                celTxt: '取消',
                                hideCelButton: false,
                                zIndex: 100,
                                needYesHref: true, //是否需要把确定按钮改成a标签，默认false
                                yesHref: site_url.rewards_url, //确定按钮a链接的默认href
                                callback: function(t) {

                                },
                            };
                            $.elasticLayer(obj)
                        } else if (data.status == "10003") {
                            //重复报名--已报名
                            var obj = {
                                title: '不可重复报名', //如果不传，默认不显示标题
                                p: '<p>' + data.message + '</p>',
                                yesTxt: '我明白了',
                                hideCelButton: true,
                                zIndex: 100,
                                callback: function(t) {

                                },
                            };
                            $.elasticLayer(obj)
                        } else if (data.status == "20013") {
                            //老客户
                            that.oldToNewTip('您已经是恒天财富的老会员啦！');
                        } else if (data.status == "20014" || data.status == "20015") {
                            // 新客户，但没有邀请人 || 新客户，有邀请人且超过8个人
                            that.oldToNewTip('恭喜您注册成为恒天财富会员！');
                        } else if (data.status == "4009") {
                            //重复报名--已报名
                            var obj = {
                                title: '抱歉，服务器异常', //如果不传，默认不显示标题
                                p: '<p>请您稍后再试</p>',
                                yesTxt: '我明白了',
                                hideCelButton: true,
                                zIndex: 100,
                                callback: function(t) {

                                },
                            };
                            $.elasticLayer(obj)
                        } else {
                            var obj = {
                                title: '温馨提示', //如果不传，默认不显示标题
                                p: '<p>' + data.message + '</p>',
                                yesTxt: '我明白了',
                                hideCelButton: true,
                                zIndex: 100,
                                callback: function(t) {

                                },
                            };
                            $.elasticLayer(obj)
                        }
                    }
                }];
                $.ajaxLoading(obj);
            },
            //分享给好友
            shareInfo: function() {
                var that = this;
                var obj = [{
                    url: site_url.shareInfo_api,
                    data: {
                        actType: that.gV.actType, //活动类型
                        actId: that.gV.actId, //活动id
                        shareCustCode: that.gV.custCode, //分享客户编号
                    },
                    //async: false,
                    needDataEmpty: true,
                    callbackDone: function(json) {
                        var data = json.data;
                        $('#activity_share').attr('src', 'activityShare://' + data);

                    },
                    callbackFail: function(json) {
                        console.log(json.message)
                        tipAction(json.message);
                    }
                }];
                $.ajaxLoading(obj);
            },
            //老带新实物奖品弹框--prizeName奖品名称successTit成功提示
            successSwConNewOpen: function(successTit, prizeName) {
                if (successTit) {
                    $('#oldToNewPrizesw').find('.successTit').html(successTit);
                }
                $('#oldToNewPrizesw').find('.prizeName span').html(prizeName);
                $('#oldToNewPrizesw').show();
                $('.mask').show();
            },
            //老带新电子奖品弹框--prizeName奖品名称successTit成功提示
            successDzConNewOpen: function(successTit, prizeName) {
                if (successTit) {
                    $('#oldToNewPrizedz').find('.successTit').html(successTit);
                }
                $('#oldToNewPrizedz').find('.prizeName span').html(prizeName);
                $('#oldToNewPrizedz').show();
                $('.mask').show();
            },
            //老带新无奖品弹框--successTit成功提示
            successNoConNewOpen: function(successTit) {
                if (successTit) {
                    $('#oldToNewNoPrize').find('.successTit').html(successTit);
                }
                $('#oldToNewNoPrize').show();
                $('.mask').show();
            },
            //老带新提示弹框
            oldToNewTip: function(content) {
                $('#oldToNewTip').find('.prizeName').html(content);
                $('#oldToNewTip').show();
                $('.mask').show();
            },
            //非老带新实物奖品弹框--prizeName奖品名称successTit成功提示
            successSwConOpen: function(successTit, prizeName) {
                if (successTit) {
                    $('#notOldToNewPrizesw').find('.successTit').html(successTit);
                }
                $('#notOldToNewPrizesw').find('.prizeName span').html(prizeName);
                $('#notOldToNewPrizesw').show();
                $('.mask').show();
            },
            //非老带新电子奖品弹框--prizeName奖品名称successTit成功提示
            successDzConOpen: function(successTit, prizeName) {
                if (successTit) {
                    $('#notOldToNewPrizedz').find('.successTit').html(successTit);
                }
                $('#notOldToNewPrizedz').find('.prizeName span').html(prizeName);
                $('#notOldToNewPrizedz').show();
                $('.mask').show();
            },
            //非老带新无奖品弹框--successTit成功提示
            successNoConOpen: function(successTit) {
                if (successTit) {
                    $('#notOldToNewNoPrize').find('.successTit').html(successTit);
                }
                $('#notOldToNewNoPrize').show();
                $('.mask').show();
            },
            //操作事件
            events: function() {
                var that = this;
                //返回按钮事件
                mui('body').on('mdClick', '.goblack', function() {
                    window.location.href = site_url.activityList_url;
                },{
                    htmdEvt: 'activityDetails_0'
                });
                //立即报名方法
                mui('body').on('mdClick', '.activityBottomBtnBox', function() {
                    if (!$(this).hasClass('disabled')) {
                        that.signUp();
                    }
                },{
                    htmdEvt: 'activityDetails_1'
                });
                //弹框取消方法-两个按钮取消
                mui('body').on('mdClick', '.cancel', function() {
                    $(this).parents('.tipContainer').hide();
                    $('.mask').hide();
                },{
                    htmdEvt: 'activityDetails_2'
                });
                //弹框取消方法-一个按钮取消
                mui('body').on('mdClick', '.buttonOne', function() {
                    $(this).parents('.tipContainer').hide();
                    $('.mask').hide();
                },{
                    htmdEvt: 'activityDetails_3'
                });
                //关闭大弹框
                mui('body').on('mdClick', '.closeBtn', function() {
                    $(this).parent().hide();
                    $('.mask').hide();
                },{
                    htmdEvt: 'activityDetails_4'
                });
                //分享好友
                mui('body').on('mdClick', '.toShare', function() {
                    that.shareInfo();
                },{
                    htmdEvt: 'activityDetails_5'
                });
                //我知道了按钮
                mui('body').on('mdClick', '.knowBtn', function() {
                    $('#notOldToNewNoPrize').hide();
                    $('.mask').hide();
                },{
                    htmdEvt: 'activityDetails_6'
                });
            }
        }
        //调用初始化函数
    activityDetails.init();
})