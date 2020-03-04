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
                isNeedLogin: false,
                idnoCheckflag:false,//实名认证
            },

            //初始化
            init: function() {
                var that = this;

                //处理7p 8p页面初始底部白条
                var wHeight = window.screen.height;
                if( $('html').height() < wHeight ){
                    $('html').height( wHeight );
                }

                that.events();
                if (splitUrl['isNeedLogin'] == 0) {
                    that.gV.isNeedLogin = false;
                } else {
                    that.gV.isNeedLogin = true;
                }
                that.getData();
            },
            //获取活动详情数据
            getData: function() {
                var that = this;
                var obj = [{ // 系统调仓记录列表
                    url: site_url.getDetailActivity_api,
                    data: {
                        actType: that.gV.actType, //活动类型
                        actId: that.gV.actId, //活动id
                        isNeedLogin: splitUrl['isNeedLogin']
                    },
                    //async: false,
                    needLogin: that.gV.isNeedLogin,
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
                        if(!data.htjfGeneralizeImgUrl || data.htjfGeneralizeImgUrl === null || data.htjfGeneralizeImgUrl === "") {
                            that.$e.bgimg.attr("data-original", "/common/img/noDataImg.png");
                        } else{
                            that.$e.bgimg.attr("data-original", data.domainIP + data.htjfGeneralizeImgUrlPrex + data.htjfGeneralizeImgUrl);
                        };
                        //活动名称
                        //v4.3.0
                        //判断城市为空的时候不展示城市
                        if(data.actCity){
                            that.$e.actName.text(data.actName);
                            //活动地点
                            if (data.actProvince) {
                                that.$e.city.text(data.actProvince);
                                //判断市
                                if(data.actProvince!==data.actCity){
                                    that.$e.city.text(data.actProvince+data.actCity);  
                                }
                            } 
                            else {
                                that.$e.city.text(data.actCity);
                            }
                        }else{
                            //没有城市的时候整个不展示
                            $('.city').parent().hide()
                        }
                        
                        //报名时间
                        //判断直播时间
                        if(data.actForm==0){
                            $(".online").find(".startTimeOrendTime").html(data.actPlayStartTim + '-' + data.actPlayEndTime);
                        }else{
                            $(".notOnline").find(".startTimeOrendTime").html(data.actStartDateStr + '-' + data.actEndDateStr);
                        }
                        //是否回放视频
                        if(data.isPlayback){
                            $(".livePlayback").css("display","block")
                        }
                        if(data.signUpFlag&&data.successPage){
                            var yesText;
                            if(data.actForm==0){
                                yesText='进入直播间'
                            }else{
                                yesText='确定'
                            }

                            //需要风测
                            var obj = {
                                title: '温馨提示', //如果不传，默认不显示标题
                                p: '<p>' + "您已报名参加本活动" + '</p>',
                                yesTxt: yesText,
                                hideCelButton: true,
                                zIndex: 100,
                                needYesHref: true, //是否需要把确定按钮改成a标签，默认false
                                yesHref: site_url.thirdpartyLinks_url+"?jumpLinks="+data.successPage+"&type='activityDetails'", //跳转到绑定理财师页面
                                htmdEvtYes:'activityDetails_8',  // 埋点确定按钮属性
                                callback: function(t) {

                                },
                            };
                            $.elasticLayer(obj)
                        }
                        
                        //活动介绍
                        that.$e.actIntroduce.html(data.actIntroduce);
                        $(".lazyload").lazyload()

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
                        params: {}
                    },
                    needLogin: true,
                    // async: false, //同步
                    needDataEmpty: false, //需要判断data是否为空
                    callbackDone: function(json) {
                        var jsonData = json.data;
                        that.gV.custCode = jsonData.customerNo; //客户编号
                        that.gV.custType = jsonData.accountType; // 客户类型【0.机构 1.个人】 
                        that.gV.idnoCheckflag = jsonData.idnoCheckflag==1?false:true; // 是否实名认证
                        that.queryFinan();

                    },
                }];
                $.ajaxLoading(obj);
            },
            queryFinan:function(){
            	var that = this;
            	var obj = [{ // 系统调仓记录列表
            	    url: site_url.queryFinancialer_api,
            	    data: {
            	        "pageNum": 1, //非必须，默认为1
            	        "pageSize": 10 //非必须，默认为10
            	    },
            	    needDataEmpty: false,
            	    callbackDone: function(json) {
						if (json.status != "0000") {
							//需要风测
                            var obj = {
                                title: '温馨提示', //如果不传，默认不显示标题
                                p: '<p>' + "为了能时刻给您提供更优质的服务，请您绑定理财师后再报名活动" + '</p>',
                                yesTxt: '去绑定',
                                celTxt: '取消',
                                hideCelButton: false,
                                zIndex: 100,
                                needYesHref: true, //是否需要把确定按钮改成a标签，默认false
                                yesHref: site_url.addFinancialer_url, //跳转到绑定理财师页面
                                htmdEvtYes:'activityDetails_8',  // 埋点确定按钮属性
                                htmdEvtCel:'activityDetails_9',  // 埋点取消按钮属性
                                callback: function(t) {

                                },
                            };
                            $.elasticLayer(obj)
						}else{
							that.signUp();
						}
            	    }
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
                        // shareCustCode: that.gV.custCode, //分享客户编号
                    },
                    //async: false,
                    needDataEmpty: true,
                    callbackDone: function(data) {
                        $('.activityBottomBtnBox').removeClass('disabled');
                        if (data.status == "0000") {
                            $('.activityBottomBox a').html('已报名');
                            $('.activityBottomBtnBox').hide();
                            $('.activityBottomBox').show();
                            successTitle = data.message;
                            if (that.gV.actType == 1) { //线上活动
                                if (data.data.actStyle == 4) {
                                    //是老带新
                                    if (data.data.brandPrizeVo.isHave == 0) {
                                        //没有奖品
                                        that.successNoConNewOpen(successTitle,data.data.url,data.data.actForm);
                                    } else if (data.data.brandPrizeVo.isHave == 1) {
                                        //有奖品
                                        if (data.data.brandPrizeVo.prizeType == 1) {
                                            //实物
                                            that.successSwConNewOpen(successTitle, data.data.brandPrizeVo.prizeName,data.data.url,data.data.actForm);
                                        } else if (data.data.brandPrizeVo.prizeType == 2) {
                                            //虚拟
                                            that.successDzConNewOpen(successTitle, data.data.brandPrizeVo.prizeName,data.data.url,data.data.actForm);
                                        }
                                    }
                                } else {
                                    //非老带新
                                    if (data.data.brandPrizeVo.isHave == 0) {
                                        //没有奖品
                                        that.successNoConOpen(successTitle,data.data.url,data.data.actForm);
                                    } else if (data.data.brandPrizeVo.isHave == 1) {
                                        //有奖品
                                        if (data.data.brandPrizeVo.prizeType == 1) {
                                            //实物
                                            that.successSwConOpen(successTitle, data.data.brandPrizeVo.prizeName,data.data.url,data.data.actForm);
                                        } else if (data.data.brandPrizeVo.prizeType == 2) {
                                            //虚拟
                                            that.successDzConOpen(successTitle, data.data.brandPrizeVo.prizeName,data.data.url,data.data.actForm);
                                        }
                                    }
                                }
                            } else if (that.gV.actType == 2) { //线下活动
                                that.successNoConOpen(successTitle);
                            }

                        }
                        mui('body').on('mdClick', '.toLink', function() {
                            window.location.href=site_url.thirdpartyLinks_url+"?jumpLinks="+$(this).attr('url')+"&type='activityDetails'"
                        }, {
                            htmdEvt: 'activityDetails_3'
                        });

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
                                yesHref: site_url.riskAppraisal_url+"?type=private", //确定按钮a链接的默认href
                                htmdEvtYes:'activityDetails_10',  // 埋点确定按钮属性
                                htmdEvtCel:'activityDetails_11',  // 埋点取消按钮属性
                                callback: function(t) {

                                },
                            };
                            $.elasticLayer(obj)
                        } else if (data.status == "20010") {
                            if(!that.gV.idnoCheckflag){
                                //需要进行合格投资者信息认证
                                var obj = {
                                    title: '温馨提示', //如果不传，默认不显示标题
                                    p: '<p>' + data.message + '</p>',
                                    yesTxt: '合格投资者认证',
                                    celTxt: '取消',
                                    hideCelButton: false,
                                    zIndex: 100,
                                    needYesHref: true, //是否需要把确定按钮改成a标签，默认false
                                    yesHref: site_url.qualifiedInvestor_url+"?type=private", //确定按钮a链接的默认href 产品确认跳私募
                                    htmdEvtYes:'activityDetails_12',  // 埋点确定按钮属性
                                    htmdEvtCel:'activityDetails_13',  // 埋点取消按钮属性
                                    callback: function(t) {

                                    },
                                };
                                $.elasticLayer(obj)
                            }else{
                               //去实名
                                var obj = {
                                    title: '温馨提示', //如果不传，默认不显示标题
                                    p: '<p>' + data.message + '</p>',
                                    yesTxt: '实名认证',
                                    celTxt: '取消',
                                    hideCelButton: false,
                                    zIndex: 100,
                                    needYesHref: true, //是否需要把确定按钮改成a标签，默认false
                                    yesHref: site_url.realIdcard_url, //确定按钮a链接的默认href  身份证上传
                                    htmdEvtYes:'activityDetails_14',  // 埋点确定按钮属性
                                    htmdEvtCel:'activityDetails_15',  // 埋点取消按钮属性
                                    callback: function(t) {

                                    },
                                };
                                $.elasticLayer(obj) 
                            }
                            
                        } else if (data.status == "20005") {
                            //需要进行合格投资者信息认证
                            var obj = {
                                title: '温馨提示', //如果不传，默认不显示标题
                                p: '<p>您的风险承受能力为 '+data.data.personRiskGrade+'。</br>'+
                                    '本次活动推荐产品的等级为 '+data.data.productRisk+'</br></br>'+
                                    '本次活动推荐产品与您的风险承受能力不匹配，应进行充分的风险评估，再做出投资决定，当您的风险承担能力或财务状况发生重大变化时，请您重新进行测评。</p>',
                                yesTxt: '重新测评',
                                celTxt: '取消报名',
                                hideCelButton: false,
                                zIndex: 100,
                                needYesHref: true, //是否需要把确定按钮改成a标签，默认false
                                yesHref:  site_url.riskAppraisal_url+"?type=private", //
                                htmdEvtYes:'activityDetails_16',  // 埋点确定按钮属性
                                htmdEvtCel:'activityDetails_17',  // 埋点取消按钮属性
                                callback: function(t) {

                                },
                            };
                            $.elasticLayer(obj)
                        }
                         else if (data.status == "20011"||data.status == "20016") {
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
                                htmdEvtYes:'activityDetails_18',  // 埋点确定按钮属性
                                htmdEvtCel:'activityDetails_19',  // 埋点取消按钮属性
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
                                yesHref: site_url.realIdcard_url, //确定按钮a链接的默认href  身份证上传
                                htmdEvtYes:'activityDetails_20',  // 埋点确定按钮属性
                                htmdEvtCel:'activityDetails_21',  // 埋点取消按钮属性
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
                                htmdEvtYes:'activityDetails_22',  // 埋点确定按钮属性
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
                                htmdEvtYes:'activityDetails_23',  // 埋点确定按钮属性
                                callback: function(t) {

                                },
                            };
                            $.elasticLayer(obj)
                        } else {

                            if (!!data.message) {
                                var obj = {
                                    title: '温馨提示', //如果不传，默认不显示标题
                                    p: '<p>' + data.message + '</p>',
                                    yesTxt: '我明白了',
                                    hideCelButton: true,
                                    zIndex: 100,
                                    htmdEvtYes:'activityDetails_24',  // 埋点确定按钮属性
                                    callback: function(t) {

                                    },
                                };
                                $.elasticLayer(obj)
                            }
                            else{
                                tipAction( '系统开小差啦，请联系客服 400-8980-618' );
                            }



                            
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
                        var wxShare = {
                                type: 'auto',
                                businessType: 'activityShare', //业务类型
                                title: that.$e.actName.text(),
                                des: '邀请好友，分享精彩',
                                link: data,
                                img: that.$e.bgimg.attr("data-original"),
                            }
                            // window.isAndroid是在root文件中定义的变量
                        // if (window.currentIsApp) {
                            if (window.isAndroid) {
                                //这个是安卓操作系统
                                window.jsObj.wxShare(JSON.stringify(wxShare));
                            }
                            // window.isIOS是在root文件中定义的变量
                            if (window.isIOS) {
                                //这个是ios操作系统
                                window.webkit.messageHandlers.wxShare.postMessage(JSON.stringify(wxShare));

                            }
                        // }

                    }
                }];
                $.ajaxLoading(obj);
            },
            //老带新实物奖品弹框--prizeName奖品名称successTit成功提示
            successSwConNewOpen: function(successTit, prizeName,url,actForm) {
                if(url){
                    //有url
                    $('#oldToNewPrizesw').find(".hideBox").removeClass()
                    $('#oldToNewPrizesw').find(".hideBtn").hide()
                    $('#oldToNewPrizesw').find(".toLink").attr('url',url)
                    //直播
                    if(actForm==0){
                        $('#oldToNewPrizesw').find(".toLink").html('进入直播间')
                    }
                }
                if (successTit) {
                    $('#oldToNewPrizesw').find('.successTit').html(successTit);
                }
                $('#oldToNewPrizesw').find('.prizeName span').html(prizeName);
                $('#oldToNewPrizesw').show();
                $('.mask').show();
            },
            //老带新电子奖品弹框--prizeName奖品名称successTit成功提示
            successDzConNewOpen: function(successTit, prizeName,url,actForm) {
                if(url){
                    //有url
                    $('#oldToNewPrizedz').find(".hideBox").removeClass()
                    $('#oldToNewPrizedz').find(".hideBtn").hide()
                    $('#oldToNewPrizedz').find(".toLink").attr('url',url)
                    //直播
                    if(actForm==0){
                        $('#oldToNewPrizedz').find(".toLink").html('进入直播间')
                    }
                }
                if (successTit) {
                    $('#oldToNewPrizedz').find('.successTit').html(successTit);
                }
                $('#oldToNewPrizedz').find('.prizeName span').html(prizeName);
                $('#oldToNewPrizedz').show();
                $('.mask').show();
            },
            //老带新无奖品弹框--successTit成功提示
            successNoConNewOpen: function(successTit,url,actForm) {
                if(url){
                    //有url
                    $('#oldToNewNoPrize').find(".hideBox").removeClass()
                    $('#oldToNewNoPrize').find(".hideBtn").hide()
                    $('#oldToNewNoPrize').find(".toLink").attr('url',url)
                    //直播
                    if(actForm==0){
                        $('#oldToNewNoPrize').find(".toLink").html('进入直播间')
                    }
                }
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
            successSwConOpen: function(successTit, prizeName,url,actForm) {
                if(url){
                    //有url
                    $('#notOldToNewPrizesw').find(".hideBox").removeClass()
                    $('#notOldToNewPrizesw').find(".hideBtn").hide()
                    $('#notOldToNewPrizesw').find(".toLink").attr('url',url)
                    //直播
                    if(actForm==0){
                        $('#notOldToNewPrizesw').find(".toLink").html('进入直播间')
                    }
                }
                if (successTit) {
                    $('#notOldToNewPrizesw').find('.successTit').html(successTit);
                }
                $('#notOldToNewPrizesw').find('.prizeName span').html(prizeName);
                $('#notOldToNewPrizesw').show();
                $('.mask').show();
            },
            //非老带新电子奖品弹框--prizeName奖品名称successTit成功提示
            successDzConOpen: function(successTit, prizeName,url,actForm) {
                if(url){
                    //有url
                    $('#notOldToNewPrizedz').find(".hideBox").removeClass()
                    $('#notOldToNewPrizedz').find(".hideBtn").hide()
                    $('#notOldToNewPrizedz').find(".toLink").attr('url',url)
                    //直播
                    if(actForm==0){
                        $('#notOldToNewPrizedz').find(".toLink").html('进入直播间')
                    }
                }
                if (successTit) {
                    $('#notOldToNewPrizedz').find('.successTit').html(successTit);
                }
                $('#notOldToNewPrizedz').find('.prizeName span').html(prizeName);
                $('#notOldToNewPrizedz').show();
                $('.mask').show();
            },
            //非老带新无奖品弹框--successTit成功提示
            successNoConOpen: function(successTit,url,actForm) {
                if(url){
                    //有url
                    $('#notOldToNewNoPrize').find(".hideBox").removeClass()
                    $('#notOldToNewNoPrize').find(".hideBtn").hide()
                    $('#notOldToNewNoPrize').find(".toLink").attr('url',url)
                    //直播
                    if(actForm==0){
                        $('#notOldToNewNoPrize').find(".toLink").html('进入直播间')
                    }
                }
                if (successTit) {
                    $('#notOldToNewNoPrize').find('.successTit').html(successTit);
                }
                $('#notOldToNewNoPrize').show();
                $('.mask').show();
            },
            // //老带新并且是否有无直播地址
            // oldToNewOnlineOpen(successTit){
            //     if (successTit) {
            //         $('#oldToNewOnline').find('.successTit').html(successTit);
            //     }
            //     $('#oldToNewOnline').show();
            //     $('.mask').show();
            // },
            //操作事件
            events: function() {
                var that = this;
                //返回按钮事件
                mui('body').on('mdClick', '.goblack', function() {
                    window.location.href = site_url.activityList_url;
                }, {
                    htmdEvt: 'activityDetails_0'
                });
                //立即报名方法
                mui('body').on('mdClick', '.activityBottomBtnBox', function() {
                    if (!$(this).hasClass('disabled')) {
                        that.getUserInfo();
                    }
                }, {
                    htmdEvt: 'activityDetails_1'
                });
                //弹框取消方法-两个按钮取消
                mui('body').on('mdClick', '.cancel', function() {
                    $(this).parents('.tipContainer').hide();
                    $('.mask').hide();
                }, {
                    htmdEvt: 'activityDetails_2'
                });
                //弹框取消方法-一个按钮取消
                mui('body').on('mdClick', '.buttonOne', function() {
                    $(this).parents('.tipContainer').hide();
                    $('.mask').hide();
                }, {
                    htmdEvt: 'activityDetails_3'
                });
                //关闭大弹框
                mui('body').on('mdClick', '.closeBtn', function() {
                    $(this).parent().hide();
                    $('.mask').hide();
                }, {
                    htmdEvt: 'activityDetails_4'
                });
                //分享好友
                mui('body').on('mdClick', '.toShare', function() {
                    that.shareInfo();
                }, {
                    htmdEvt: 'activityDetails_5'
                });
                //我知道了按钮
                mui('body').on('mdClick', '.knowBtn', function() {
                    $('#notOldToNewNoPrize').hide();
                    $('.mask').hide();
                }, {
                    htmdEvt: 'activityDetails_6'
                });
                // 点击查看奖励跳转到我的奖励页面
                mui('body').on('mdClick','.rewards',function(){
                    window.location.href = site_url.rewards_url;
                },{
                    htmdEvt: 'activityDetails_7'
                })
            }
        }
        //调用初始化函数
    activityDetails.init();
})