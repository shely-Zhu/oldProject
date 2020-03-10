/**
 * 会员俱乐部-活动列表
 * @author  liuhongyu 2019 10-31
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var alwaysAjax = require('@pathCommonJs/components/alwaysAjax.js');
var moment = require('moment');
// require('@pathCommonJs/components/headBarConfig.js');

$(function() {
    var activityList = {
            //元素类名
            $e: {
                //列表类名
                recordList: $('.recordList'),
                //模板类名
                activityListTemp: $('#activityList-template'),
                adjustmentRecord: $('.adjustmentRecord'), // 调仓记录
                recordList: $('.recordList'), // 调仓记录
                adjustmentTemp: $('#adjustment-template'), // 最新调仓模板
                noData: $('.noData'), //没有数据的结构
                listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
                activityListDataBox: $('.activityListDataBox'), //有数据盒子
                activityListDataNoBox: $('.activityListDataNoBox'), //没有数据盒子
                activityNoListBox: $('.activityNoListBox')
            },
            gV: { // 全局变量
                groupCode: splitUrl['groupCode'], // 组合编号，从我的持仓进
                startPage: 1, //当前页码，默认为1
                pageSize: 10, //一页最大返回list个数
                listLength: 0,
                actName: $('.activitySearchInput input').val(), //活动名称
                actProvinceNO: $('#locationCity').attr('data-parentid'), //活动省份编号
                actCityName: $('#locationCity').attr('data-name'), //活动城市编号
                aThis: null,
            },
            //初始化
            init: function() {
                var that = this;
                // that.getCityListData();
                that.getCity();
                that.events();
                // $("img")
            },
            //初始化mui的上拉加载
            initMui: function() {
                var that = this;
                var topHeitgh = $('#activitySearch').height() + $(".tabCon").height();
                var height = windowHeight - topHeitgh;

                if (!$('.list').hasClass('setHeight')) {
                    $('.list').height(height).addClass('setHeight');
                }

                mui.init({
                    pullRefresh: {
                        container: '.contentWrapper',
                        up: {
                            //auto: false,
                            contentrefresh: '拼命加载中',
                            contentnomore: '暂无更多内容', //可选，请求完毕若没有更多数据时显示的提醒内容；
                            callback: function() {
                                that.gV.aThis = this;
                                that.getData(this);
                            }
                        }
                    }
                });
                //init后需要执行ready函数，才能够初始化出来
                mui.ready(function() {
                    //隐藏当前的加载中loading
                    if (!$('.activityListDataBox .list').hasClass('hasPullUp')) {
                        $('.activityListDataBox .list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                    }
                    //这一句初始化并第一次执行mui上拉加载的callback函数
                    mui('.contentWrapper').pullRefresh().pullupLoading();
                    //为$id添加hasPullUp  class
                    $('.activityListDataBox .list').addClass('hasPullUp');
                });
            },
            //有数据获取列表
            getData: function(t) {
                var that = this;
                // 获取搜索活动的状态值
                var actStatus = $(".tab.active").index()
                var obj = [{ // 系统调仓记录列表
                    url: site_url.getActivitiesList_api,
                    needLogin: false,
                    needLoading: false,
                    data: {
                        startPage: that.gV.startPage,
                        pageSize: that.gV.pageSize,
                        actName: $('.activitySearchInput input').val(),
                        actConductCity: that.gV.actCityName, //活动城市编号
                        actStatus: actStatus
                    },
                    needDataEmpty: true,
                    callbackDone: function(json) {
                        if (!json.data.activityVoPageInfo && that.gV.startPage == 1) {
                            var topHeitgh = $('#activitySearch').height() + $(".tabCon").height();
                            var height = windowHeight - topHeitgh;
                            $('.activityListDataNoBox').height(height);
                            t.endPullupToRefresh(true);
                            that.$e.activityListDataBox.hide();
                            that.$e.activityListDataNoBox.show();
                            // var noList=json.data.defaultRecommend;
                            // for(var i=0;i<noList.length;i++){

                            // }
                            $('.activityNoListBox2').html('');
                            var noList = [{
                                id: json.data.defaultRecommend.id,
                                actType: json.data.defaultRecommend.linkType,
                                actId: json.data.defaultRecommend.id,
                                actImgUrl: json.data.defaultRecommend.filePath,
                                // actName: json.data.defaultRecommend.title
                            }];
                            that.getNoData(noList);
                            return false;
                        }
                        if(json.data.activityVoPageInfo) {
                            var data = json.data.activityVoPageInfo.list
                        } else {
                            var data = []
                        }
                        that.$e.activityListDataBox.show();
                        that.$e.activityListDataNoBox.hide();
                        setTimeout(function() {
                            if (data.length < that.gV.pageSize) {
                                if (that.gV.startPage == 1) { //第一页时
                                    if (data.length == 0) {
                                        // 暂无数据显示
                                        var topHeitgh = $('#activitySearch').height() + $(".tabCon").height();
                            var height = windowHeight - topHeitgh;
                            $('.activityListDataNoBox').height(height);
                            t.endPullupToRefresh(true);
                            that.$e.activityListDataBox.hide();
                            that.$e.activityListDataNoBox.show();
                            that.getNoData();
                                        return false;

                                    } else { // 没有更多数据了
                                        t.endPullupToRefresh(true);
                                        $("#activityList .mui-pull-bottom-pocket").find(".mui-pull-loading").addClass("mui-hidden")
                                        $("#activityList .mui-pull-bottom-pocket").find(".mui-pull-caption").removeClass("mui-pull-caption-refresh").addClass('mui-pull-caption-nomore').html("没有更多了");
                                    }
                                } else {
                                    //其他页-没有更多数据
                                    t.endPullupToRefresh(true);
                                    $("#activityList .mui-pull-bottom-pocket").find(".mui-pull-loading").addClass("mui-hidden")
                                        $("#activityList .mui-pull-bottom-pocket").find(".mui-pull-caption").removeClass("mui-pull-caption-refresh").addClass('mui-pull-caption-nomore').html("没有更多了");
                                }
                            } else { // 还有更多数据
                                t.endPullupToRefresh(false);
                            }
                            // 页面++
                            that.gV.startPage++;
                            //去掉mui-pull-bottom-pocket的mui-hidden
                            $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                            var list = data;
                            for (var i = 0; i < list.length; i++) {
                                list[i].actStartDate = list[i].actStartDate ? moment(list[i].actStartDate).format('MM月DD日') : '';
                                list[i].actEndDate = list[i].actEndDate ? moment(list[i].actEndDate).format('MM月DD日') : '';
                                list[i].isLive = list[i].actForm == 0 ? true : false // 是否为直播形式
                                list[i].isPlayback = list[i].isPlayback == 1 ? true : false // 是否可回放观看
                            }
                            // 将列表插入到页面上
                            generateTemplate(list, that.$e.recordList, that.$e.activityListTemp)
                            alwaysAjax($(".recordList"), null, 2);
                            $(".lazyload").lazyload()
                        }, 200)

                    },
                    callbackNoData: function(json) {
                        if (!json.data.activityVoPageInfo && that.gV.startPage == 1) {
                            var topHeitgh = $('#activitySearch').height() + $(".tabCon").height();
                            var height = windowHeight - topHeitgh;
                            $('.activityListDataNoBox').height(height);
                            t.endPullupToRefresh(true);
                            that.$e.activityListDataBox.hide();
                            that.$e.activityListDataNoBox.show();
                            $('.activityNoListBox2').html('');
                            var noList = [{
                                id: json.data.defaultRecommend.id,
                                actType: json.data.defaultRecommend.linkType,
                                actId: json.data.defaultRecommend.id,
                                actImgUrl: json.data.defaultRecommend.filePath,
                                // actName: json.data.defaultRecommend.title
                            }];
                            that.getNoData(noList);
                        }
                    }
                }];
                $.ajaxLoading(obj);
            },
            //无数据获取列表
            getNoData: function(data) {
                var that = this;
                var topHeitgh = $('#activitySearch').height() + $(".tabCon").height();
                var noBox = $('.activityNoListBox').height();
                var height = windowHeight - topHeitgh - noBox;

                if ($('.activityNoList').hasClass('setHeight')) {
                    $('.activityNoList').height(height);
                }
                //隐藏当前的加载中loading
                if (!$('.activityListDataBox .list').hasClass('hasPullUp')) {
                    $('.activityListDataBox .list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                }
                //为$id添加hasPullUp  class
                $('.activityListDataBox .list').addClass('hasPullUp');
                setTimeout(function() {
                    //去掉mui-pull-bottom-pocket的mui-hidden
                    $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                    // 将列表插入到页面上
                    generateTemplate(data, $('.activityNoListBox2'), that.$e.activityListTemp)
                    $(".lazyload").lazyload()
                        // 第一个调仓记录默认展开
                    $('.recordList').find('ul').eq(0).find('.mui-collapse').addClass('mui-active');
                }, 200)
            },
            //将城市定位模板加载
            getCityListData: function() {
                //为$id添加hasPullUp  class
                $('.activityListDataBox .list').addClass('hasPullUp');
                setTimeout(function() {
                    //去掉mui-pull-bottom-pocket的mui-hidden
                    $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                    // 将列表插入到页面上
                    generateTemplate(data, $('.activityNoListBox2'), that.$e.activityListTemp)
                    $(".lazyload").lazyload()
                        // 第一个调仓记录默认展开
                    $('.recordList').find('ul').eq(0).find('.mui-collapse').addClass('mui-active');
                }, 200)
            },
            //将城市定位模板加载
            getCityListData: function() {
                var obj = [{
                    url: site_url.cityList_api,
                    needDataEmpty: true,
                    needLoading: true,
                    callbackDone: function(json) {
                        $('#loading').hide();
                        $('.netLoading').hide();
                        console.log(json);
                        var data = json.data;
                        var res = [];
                        var rightListArr = [{ name: '全' }, { name: '热' }];
                        var cityList = [];
                        var hotCity = [];
                        var allCity = [];
                        for (var j in data.cityMap) {
                            rightListArr.push({
                                name: j.toLocaleUpperCase(),
                            });
                            cityList.push({
                                name: j.toLocaleUpperCase(),
                                list: json.data.cityMap[j]
                            })


                        }
                        console.log(cityList)
                        res.push({
                            hotCityList: rightListArr,
                            hotCity: data.hotCityList,
                            cityList: cityList,
                            allCity: data.allCityMap
                        });
                        console.log(res);
                        // 将列表插入到页面上
                        generateTemplate(res, $('#cityListBox'), $('#cityList-template'));
                        //城市索引列表显示
                        $('#cityListBox').show();
                        //给城市索引列表添加高度
                        $('#list').height(windowHeight);
                        mui.init();
                        mui.ready(function() {
                            window.indexedList = new mui.IndexedList($('#list')[0]);
                        });
                    }
                }];
                $.ajaxLoading(obj);
            },
            getCity: function() {
                var that = this;
                var obj = [{
                    url: site_url.getCity_api,
                    needDataEmpty: true,
                    callbackDone: function(json) {
                        var data = json.data;
                        var code = data.cityCode;
                        var name = data.cityName;
                        var parentid = data.provinceCode;
                        $('#locationCity').text(name || '全国');
                        $('#locationCity').attr({
                            'data-name': name,
                            'data-parentid': parentid
                        });
                        that.gV.actCityName = name;
                        that.initMui();
                    }
                }];
                $.ajaxLoading(obj);
            },
            // 重置列表加载提示语
            resetLoadingHint: function() {
                $(".mui-pull>.mui-pull-loading").removeClass('mui-hidden');
                $(".mui-pull>.mui-pull-caption").removeClass('mui-pull-caption-nomore').addClass('mui-pull-caption-refresh').html("拼命加载中");
            },
            //操作事件
            events: function() {
                var that = this;
                //tab切换搜索
                mui('body').on('mdClick', '.tabCon>.tab', function() {
                    $(this).addClass("active").siblings().removeClass('active');
                    that.resetLoadingHint();
                    $('.recordList').html('');
                    that.gV.startPage = 1;
                    that.initMui();
                    mui('.contentWrapper').pullRefresh().scrollTo(0, 0, 100);
                }, {
                    htmdEvt: 'activityList_9'
                });
                //点击定位文字弹出定位选择
                mui('#activityDataBox').on('mdClick', '.activityCityBox', function() {
                    $('#activityDataBox').hide();
                    $('#cityListBox').html('');
                    $('#loading').show();
                    that.getCityListData();
                }, {
                    htmdEvt: 'activityList_0'
                });
                //点击定位选择效果
                mui('#cityListBox').on('mdClick', '.mui-indexed-list-item,.hotBox span', function() {
                    var txt = $(this).text();
                    var name = $(this).attr('data-name');
                    var parentId = $(this).attr('data-parentId');
                    $('#cityListBox').hide();
                    $('#activityDataBox').show();
                    $('#loading').show();
                    $('.recordList').html('');
                    $('#locationCity').text(txt);
                    $('#locationCity').attr({
                        'data-name': name,
                        'data-parentId': parentId
                    })
                    that.resetLoadingHint();
                    that.gV.actCityName = name;
                    that.gV.startPage = 1;
                    that.initMui();
                    var activitySearchInputWidth = document.documentElement.clientWidth - $('#activitySearch a').width() - $('.activityCityBox').width() - 30;
                    $('.activitySearchInput').width(activitySearchInputWidth);
                    mui('.contentWrapper').pullRefresh().scrollTo(0, 0, 100);
                }, {
                    htmdEvt: 'activityList_1'
                });
                //点击搜索选择头部返回效果
                mui('#activitySearch').on('mdClick', '.backBtn', function() {
                    if (document.referrer == '') {
                        var u = navigator.userAgent,
                            app = navigator.appVersion;
                        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
                        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                        if (isAndroid) {
                            //这个是安卓操作系统
                            window.jsObj.backNative();
                        }
                        if (isIOS) {
                            //这个是ios操作系统
                            window.webkit.messageHandlers.backNative.postMessage('backNative');
                        }
                    } else {
                        location.href = "javascript:history.go(-1)";
                    }
                    $('#cityListBox').hide();
                    $('#activityDataBox').show();
                    mui('.contentWrapper').pullRefresh().scrollTo(0, 0, 10);
                }, {
                    htmdEvt: 'activityList_2'
                });
                //点击选择城市头部返回效果
                mui('#activitySearch').on('mdClick', '.goBack', function() {
                    $('#cityListBox').hide();
                    $('#activityDataBox').show();
                },{
                    htmdEvt: 'activityList_8'
                })
                    //点击定位选择右侧索引效果
                mui('#cityListBox').on('mdClick', '.mui-indexed-list-bar a', function() {
                    var txt = $(this).text();
                    var len = $('.mui-table-view li').length;
                    var list = $('.mui-table-view li');
                    for (var i = 0; i < len; i++) {
                        if (list.eq(i).attr('data-group') == txt) {
                            list.removeClass('active');
                            list.eq(i).addClass('active');
                        }
                    }
                }, {
                    htmdEvt: 'activityList_3'
                });
                //点击活动列表跳转
                mui('body').on('mdClick', '.mui-card', function() {
                    var actType = $(this).children('a').attr('data-actType');
                    var actId = $(this).children('a').attr('data-actId');
                    window.location.href = site_url.activityDetails_url + '?actType=' + actType + '&' + 'actId=' + actId + '&isNeedLogin=0&appNewWebView=1';
                }, {
                    htmdEvt: 'activityList_4'
                });
                //搜索框输入触发查询数据
                var timer = 0
                mui('#activitySearch').on('keyup', '.activitySearchInput input', function() {
                    clearTimeout(timer)
                    timer = setTimeout(function(){
                        $('.recordList').html('');
                    that.resetLoadingHint();
                    that.gV.actName = $(this).val();
                    that.gV.startPage = 1;
                    // that.initMui()
                    // that.getData(that.gV.aThis);
                    mui('.contentWrapper').pullRefresh().scrollTo(0, 0, 100);
                    },300)
                    
                }, {
                    htmdEvt: 'activityList_5'
                });

                //清除搜索框触发查询数据
                mui('#activitySearch').on('mdClick', '.mui-icon-clear', function() {
                    $('.recordList').html('');
                    that.resetLoadingHint();
                    that.gV.startPage = 1;
                    that.initMui();
                    mui('.contentWrapper').pullRefresh().scrollTo(0, 0, 100);
                }, {
                    htmdEvt: 'activityList_6'
                });


                //点击搜索框触发选中
                $('.activitySearchInput *').on('mdClick', function() {
                    console.log(1);
                    $('.activitySearchInput').children('input').focus();
                }, {
                    htmdEvt: 'activityList_7'
                });
            }
        }
        //调用初始化函数
    activityList.init();
})