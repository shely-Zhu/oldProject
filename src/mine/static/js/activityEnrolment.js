//  已报名活动
// @author caoqihai 2019-11-18 


require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJsCom/goTopMui.js');
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js'); 
require('@pathCommonJs/components/tabScroll.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


var moment = require('moment');

$(function() {
    var dataEn = {
        $e: {
            noData: $('.noData'), //没有数据的结构
            NoData: $('.NoData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            ListSlot: $('.listHasData0'), //插入已报名活动位置
            ListSlot1: $('.listHasData1'), //插入已报名活动位置
            listTemp: $('#activityEn-template'), //已报名活动模板类名  
            moreSlot: $('.moreul'),
            moreTemp: $('#more-template'), //已报名活动模板类名     

        },
        gV: {
            ListData: [], // 有活动的数据
            search: false, // 搜索
            // 存放ajax请求地址  已进行  已结束
            ajaxArr: [], //存放每一个ajax请求的传参数据
            custCode: '',

        },
        init: function() {
            var that = this;
            that.getUserInfo();
            that.getData(site_url.getApplyActivity_api, {
                actStatus: 1
            }, 0);
            that.getData(site_url.getApplyActivity_api, {
                actStatus: 2
            }, 1);
            that.events();
        },
        //时间转换
        getMyDate: function(str) {
            var that = this
            var oDate = new Date(str),
                oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth() + 1,
                oDay = oDate.getDate(),
                oHour = oDate.getHours(),
                oMin = oDate.getMinutes(),
                oSen = oDate.getSeconds(),
                oTime = oYear + '-' + that.addZero(oMonth) + '-' + that.addZero(oDay) + ' ' + that.addZero(oHour) + ':' +
                that.addZero(oMin) + ':' + that.addZero(oSen);
            return oTime;
        },
        //补零操作
        addZero: function(num) {
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        },
        //获取用户信息
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

                },
            }];
            $.ajaxLoading(obj);
        },
        getData: function(ur, dat, num) {
            var that = this
            var obj = [{
                url: ur,
                data: dat,
                needDataEmpty: true,
                needLogin: true, //需要判断是否登陆
                contentTypeSearch: true,
                callbackDone: function(json) {
                    var dataList;
                    if (num == 0) {

                        //给推荐活动赋值
                        morelist = json.data.defaultRecommend
                            //判断是否有报名时间
                        if (morelist && morelist.actStartDate) {
                            morelist.timeflag = true;
                            morelist.actStartDate = morelist.actStartDate ? moment(morelist.actStartDate).format('MM月至DD日') : '';
                            morelist.actEndDate = morelist.actEndDate ? moment(morelist.actEndDate).format('MM月至DD日') : '';
                        }
                        setTimeout(function() {
                            $(".more").show()
                            generateTemplate(morelist, that.$e.moreSlot, that.$e.moreTemp);
                        }, 200)
                    }

                    // 待定 
                    if (json.data.activityVOPageInfo.list.length == 0) { // 没有记录不展示
                        if (num == 0) {
                            // $('.NoData').show();
                            $('.listHasData0 .NoDataMore').show();
                            
                            return false;
                        } else {
                            // $('.NoData').show();
                            $('.listHasData1 .NoDataMore').show();
                            return false;
                        }

                    } else {
                        /*json.data.activityVOPageInfo.list.map(function(e) {
                            e.enterTime = that.getMyDate(parseInt(e.enterTime))
                            e.arriveTime = that.getMyDate(parseInt(e.arriveTime))
                                // 判断是否有图片
                            e.imgurl = e.htjfGeneralizeImgUrl == '' ? 0 : 1;
                            //判断是否显示分享   线上并且是 进行中的
                            e.shareflag = e.actType == 1 && num == 0 ? 1 : 0;
                            //判断是 线上还是线下
                            e.actTypestatus = e.actType == 1 ? 1 : 0
                        })*/
                        var list = json.data.activityVOPageInfo.list;
                        for(var i = 0 ; i < list.length; i++) {
                            list[i].enterTime = that.getMyDate(parseInt(list[i].enterTime))
                            list[i].arriveTime = that.getMyDate(parseInt(list[i].arriveTime))
                                // 判断是否有图片
                            list[i].imgurl = list[i].htjfGeneralizeImgUrl == '' ? 0 : 1;
                            //判断是否显示分享   线上并且是 进行中的
                            list[i].shareflag = list[i].actType == 1 && num == 0 ? 1 : 0;
                            //判断是 线上还是线下
                            list[i].actTypestatus = list[i].actType == 1? 1 : 0 
                        }
                        dataList = list;
                    }


                    setTimeout(function() {
                        // 将列表插入到页面上
                        
                        if (num == 0) {
                            generateTemplate(dataList, that.$e.ListSlot, that.$e.listTemp);
                            $(".lazyload").lazyload()
                        } else {
                            generateTemplate(dataList, that.$e.ListSlot1, that.$e.listTemp);
                            $(".lazyload").lazyload()
                        }


                    }, 200)

                },
                callbackNoData: function() {
                    if (num == 0) {
                        $('.listHasData0 .NoDataMore').show();
                        // $('.NoData').show();

                        return false;
                    } else {
                        $('.listHasData1 .NoDataMore').show();
                        // $('.NoData').show();
                        return false;
                    }

                }
            }]
            $.ajaxLoading(obj);
        },


        //分享给好友
        shareInfo: function(actId, actType, title, iconimg) {
            var that = this;
            var obj = [{
                url: site_url.shareInfo_api,
                data: {
                    actType: actType, //活动类型
                    actId: actId, //活动id
                    shareCustCode: that.gV.custCode, //分享客户编号
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    $(".netLoading").hide()
                    var data = json.data;
                    var wxShare = {
                            type: 'auto',
                            businessType: 'activityShare', //业务类型
                            title: title,
                            des: '新老朋友，共享精彩',
                            link: data,
                            img: iconimg,
                        }
                        // window.isAndroid是在root文件中定义的变量
                    if (window.isAndroid) {
                        //这个是安卓操作系统
                        window.jsObj.wxShare(JSON.stringify(wxShare));
                    }
                    // window.isIOS是在root文件中定义的变量
                    if (window.isIOS) {
                        //这个是ios操作系统
                        window.webkit.messageHandlers.wxShare.postMessage(JSON.stringify(wxShare));
                    }
                },
            }];
            $.ajaxLoading(obj);
        },
        events: function() {
            var that = this

            // tab 切换
            mui("body").on('tap', '.choice .mui-col-xs-6', function(e) {
                var i = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                window.scroll(0, 0)
                if (i == 0) {
                    $('.listHasData0').show()
                    $('.listHasData1').hide()
                } else {
                    $('.listHasData0').hide()
                    $('.listHasData1').show()
                }
            }, {
                'htmdEvt': 'activityEnrolment_01'
            })

            //分享好友
            mui('body').on('mdClick', '.timeBtn', function(e) {
                var event=e||window.event
                event.preventDefault();
                event.stopPropagation();  
                var actId = $(this).attr('data-actId');
                var actType = $(this).attr('data-actType');
                var title = $(this).attr('data-actName');
                var iconimg = $(this).attr('data-htjfGeneralizeImgUrl');
                that.shareInfo(actId, actType, title, iconimg);
            }, {
                'htmdEvt': 'activityEnrolment_02'
            });
            //点击活动列表跳转
            mui('body').on('mdClick', '.clickli', function(e) {
                var actType = $(this).attr('data-actType');
                var actId = $(this).attr('data-actId');
                if(!actType){//如果值为空，则无法跳转
                	return false;
                }
                window.location.href = site_url.activityDetails_url + '?actType=' + actType + '&' + 'actId=' + actId+'&isNeedLogin=1';
            }, {
                htmdEvt: 'activityEnrolment_03'
            });
            //更多跳转
        }

    }
    dataEn.init()
})