//  已报名活动
// @author caoqihai 2019-11-18 



require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayer.js');
require('@pathCommonJs/components/elasticLayerTypeTwo.js');
require('@pathCommonJs/components/headBarConfig.js');

require('@pathCommonJs/components/tabScroll.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


var moment = require('moment');

$(function () {
    var dataEn = {
        $e: {
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            ListSlot: $('.listHasData0'),//插入已报名活动位置
            ListSlot1: $('.listHasData1'),//插入已报名活动位置
            listTemp: $('#activityEn-template'),//已报名活动模板类名  
            moreSlot:$('.moreul'),
            moreTemp: $('#more-template'),//已报名活动模板类名     

        },
        gV: {
            ListData: [
            ], // 有活动的数据
            search: false, // 搜索
            // 存放ajax请求地址  已进行  已结束
            ajaxArr: [], //存放每一个ajax请求的传参数据
            custCode: 293807
        },
        init: function () {
            var that = this;
            // that.getUserInfo();
            that.getData(site_url.getApplyActivity_api, {
                custNo: that.gV.custCode,
                actStatus: 1
            }, 0);
            that.getData(site_url.getApplyActivity_api, {
                custNo: that.gV.custCode,
                actStatus: 2
            }, 1);
            that.events();
        },
        //时间转换
        getMyDate: function (str) {
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
        addZero: function (num) {
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        },
        //获取用户信息
        //页面初始用户ajax请求
        getUserInfo: function () {
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
                callbackDone: function (json) {
                    var jsonData = json.data;
                    that.gV.custCode = jsonData.customerNo; //客户编号

                },
            }];
            $.ajaxLoading(obj);
        },
        getData: function (ur, dat, num) {
            var that = this


            var obj = [{
                url: ur,
                data: dat,
                needDataEmpty: false,
                needLogin: true,//需要判断是否登陆
                contentTypeSearch: true,
                callbackDone: function (json) {
                    var dataList;
                    // 待定 
                    if ($.util.isNull(json.data.activityVOPageInfo.list)) { // 没有记录不展示
                        if (num == 0) {
                            $('.listHasData0 .noData').show();
                            return false;
                        } else {
                            $('.listHasData1 .noData').show();
                            return false;
                        }

                    } else {
                        json.data.activityVOPageInfo.list.map(function (e) {
                            e.enterTime = that.getMyDate(parseInt(e.enterTime))
                            e.arriveTime = that.getMyDate(parseInt(e.arriveTime))
                            // 判断是否有图片
                            e.imgurl = e.htjfGeneralizeImgUrl == '' ? 0 : 1;
                            //判断是否显示分享   线上并且是 进行中的
                            e.shareflag = e.actType == 1 && num == 0 ? 1 : 0;
                            //判断是 线上还是线下
                            e.actTypestatus = e.actType == 1 ? 1 : 0
                        })
                        dataList = json.data.activityVOPageInfo.list;
                    }
                    if(num == 0){
                        
                        //给推荐活动赋值
                    morelist = json.data.defaultRecommend
                    //判断是否有报名时间
                    if(morelist.actStartDate){
                        morelist.timeflag = true;
                        morelist.actStartDate=morelist.actStartDate?moment(morelist.actStartDate).format('MM月至DD日'):'';
                        morelist.actEndDate=morelist.actEndDate?moment(morelist.actEndDate).format('MM月至DD日'):'';
                    }
                    setTimeout(function () {
                    generateTemplate(morelist, that.$e.moreSlot, that.$e.moreTemp);
                }, 200)
                    }
                    
                    setTimeout(function () {
                        // 将列表插入到页面上
                        if (num == 0) {
                            generateTemplate(dataList, that.$e.ListSlot, that.$e.listTemp);
                        } else {
                            generateTemplate(dataList, that.$e.ListSlot1, that.$e.listTemp);
                        }
                        

                    }, 200)

                },
                callbackFail: function (json) {
                    tipAction(json.msg);
                },
                callbackNoData: function () {
                    if (num == 0) {
                        $('.listHasData0 .noData').show();
                        return false;
                    } else {
                        $('.listHasData1 .noData').show();
                        return false;
                    }

                }
            }]
            $.ajaxLoading(obj);
        },


        //分享给好友
        shareInfo: function (actId, actType) {
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
                callbackDone: function (json) {
                    var data = json.data;
                    $('#activity_share').attr('src', 'activityShare://' + data);

                },
                callbackFail: function (json) {
                    console.log(json.message)
                    tipAction(json.message);
                }
            }];
            $.ajaxLoading(obj);
        },
        events: function () {
            var that = this

            // tab 切换
            mui("body").on('tap', '.choice .mui-col-xs-6', function (e) {
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
            })

            //分享好友
            mui('body').on('tap', '.timeBtn', function () {
                var actId = $(this).attr('data-actId');
                var actType = $(this).attr('data-actType');
                that.shareInfo(actId, actType);
            });
        }

    }
    dataEn.init()
})