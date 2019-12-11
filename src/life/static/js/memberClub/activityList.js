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
require('@pathCommonJs/components/headBarConfig.js');

$(function(){
    var activityList={
        //元素类名
        $e:{
            //列表类名
            recordList:$('.recordList'),
            //模板类名
            activityListTemp:$('#activityList-template'),
            adjustmentRecord: $('.adjustmentRecord'), // 调仓记录
            recordList: $('.recordList'), // 调仓记录
            adjustmentTemp: $('#adjustment-template'), // 最新调仓模板
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            activityListDataBox:$('.activityListDataBox'),//有数据盒子
            activityListDataNoBox:$('.activityListDataNoBox'),//没有数据盒子
            actName:$('#activitySearch .mui-input-clear').val(),
            activityNoListBox:$('.activityNoListBox')
        },
        gV: { // 全局变量
            groupCode: splitUrl['groupCode'], // 组合编号，从我的持仓进
            startPage: 1, //当前页码，默认为1
            pageSize: 3,//一页最大返回list个数
            listLength: 0,
            actName:$('.activitySearchInput input').val(), //活动名称
            actProvinceNO:$('#locationCity').attr('data-parentid'), //活动省份编号
            actCityNO:$('#locationCity').attr('data-code'), //活动城市编号
        },  
        //初始化
        init:function(){
            var that = this;
            // that.getCityListData();
            that.getCity();
            that.events();  
        },
        //初始化mui的上拉加载
        initMui: function() {
            var that = this;
            var topHeitgh=$('#activitySearch').height();
            var height = windowHeight-topHeitgh;
            
            if (!$('.activityList').hasClass('setHeight')) {
                $('.activityList').height(height).addClass('setHeight');
            }
            
            mui.init({
                pullRefresh: {
                    container: '.contentWrapper',
                    up: {
                        //auto: false,
                        contentrefresh: '拼命加载中',
                        contentnomore: '暂无更多内容', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: function() {
                            that.getData(this);
                        }
                    }
                }
            });
            //init后需要执行ready函数，才能够初始化出来
            mui.ready(function() {
                //隐藏当前的加载中loading
                if (!$('.activityList').hasClass('hasPullUp')) {
                    $('.activityList').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                }
                //这一句初始化并第一次执行mui上拉加载的callback函数
                mui('.contentWrapper').pullRefresh().pullupLoading();
                //为$id添加hasPullUp  class
                $('.activityList').addClass('hasPullUp');
            });
        },
        //有数据获取列表
        getData: function(t) {
            var that = this;
            
            var obj = [{ // 系统调仓记录列表
                url: site_url.getActivitiesList_api,
                needLogin: false,
                needLoading: false,
                // url:'http://172.16.187.164:8081/web/marketing/activity/getActivitiesList',
                data: {
                        // "combCode": that.gV.groupCode, //组合代码 
                        // "pageCurrent": that.gV.pageCurrent, //非必须，默认为1
                        // "pageSize": "10" //非必须，默认为10
                        startPage:that.gV.startPage,
                        pageSize:that.gV.pageSize,
                        actName:$('#activitySearch .mui-input-clear').val(),
                        // actConductProvinceNo:$('#locationCity').attr('data-parentid'),//活动省份编号
                        actConductCityNo:$('#locationCity').attr('data-code'), //活动城市编号
                    
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    
                    console.log(json.data);
                    if(!json.data.activityVoPageInfo){
                        t.endPullupToRefresh(true);
                        that.$e.activityListDataBox.hide();
                        that.$e.activityListDataNoBox.show();
                        // var noList=json.data.defaultRecommend;
                        // for(var i=0;i<noList.length;i++){

                        // }
                        $('.activityNoListBox2').html('');
                        var noList=[{
                            id:json.data.defaultRecommend.id,
                            actType:json.data.defaultRecommend.linkType,
                            actId:json.data.defaultRecommend.id,
                            actImgUrl:json.data.defaultRecommend.filePath,
                            actName:json.data.defaultRecommend.title
                        }];
                        that.getNoData(noList);
                        return false;
                    }
                    var data = json.data.activityVoPageInfo.list;
                    that.$e.activityListDataBox.show();
                    that.$e.activityListDataNoBox.hide();
                    setTimeout(function() {
                        if (data.length < that.gV.pageSize) {
                            t.endPullupToRefresh(true);
                        } else { // 还有更多数据
                            mui('.contentWrapper').pullRefresh().refresh(true);
                            t.endPullupToRefresh(false);
                        }
                        // 页面++
                        that.gV.startPage++;
                        //去掉mui-pull-bottom-pocket的mui-hidden
                        $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                        var list=data;
                        for(var i=0;i<list.length;i++){
                            list[i].actStartDate=list[i].actStartDate?moment(list[i].actStartDate).format('MM月至DD日'):'';
                            list[i].actEndDate=list[i].actEndDate?moment(list[i].actEndDate).format('MM月至DD日'):'';
                        }
                        // 将列表插入到页面上
                        generateTemplate(list,that.$e.recordList,that.$e.activityListTemp)
                        alwaysAjax($(".recordList"));
                        $(".lazyload").lazyload()
                    }, 200)

                },
                callbackFail: function(json) {
                    console.log(json.message)
                    tipAction(json.message);
                },
                callbackNoData: function(json){
                    t.endPullupToRefresh(true);
                    that.$e.activityListDataBox.hide();
                    that.$e.activityListDataNoBox.show();
                    that.getNoData();
                }
            }];
            $.ajaxLoading(obj);
        },
        //无数据获取列表
        getNoData:function(data){
            var that = this;
            var topHeitgh=$('#activitySearch').height();
            var noBox=$('.activityNoListBox').height();
            var height = windowHeight-topHeitgh-noBox;
            
            if ($('.activityNoList').hasClass('setHeight')) {
                $('.activityNoList').height(height);
            }
            //隐藏当前的加载中loading
            if (!$('.activityList').hasClass('hasPullUp')) {
                $('.activityList').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
            }
            //为$id添加hasPullUp  class
            $('.activityList').addClass('hasPullUp');
            setTimeout(function() {
                //去掉mui-pull-bottom-pocket的mui-hidden
                $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                // 将列表插入到页面上
                generateTemplate(data,$('.activityNoListBox2'),that.$e.activityListTemp)
                // 第一个调仓记录默认展开
                $('.recordList').find('ul').eq(0).find('.mui-collapse').addClass('mui-active');
            }, 200)
        },
        //将城市定位模板加载
        getCityListData:function(){

            var obj=[{
                url: site_url.cityList_api,
                // url:'http://172.16.187.164:8081/web/marketing/activity/cityList',
                //async: false,
                needDataEmpty: true,
               	needLoading:true,
                callbackDone: function(json) {
                    $('#loading').hide();
                    console.log(json);
                    var data=json.data;
                    var res=[];
                    var rightListArr=[{name:'热'}];
                    var cityList=[];
                    var hotCity=[];
                    for(var j in data.cityMap){
                        rightListArr.push({
                            name:j.toLocaleUpperCase(),
                        });
                        cityList.push({
                            name:j.toLocaleUpperCase(),
                            list:json.data.cityMap[j]
                        })
                        
                        
                    }
                    console.log(cityList)
                    res.push({
                        hotCityList:rightListArr,
                        hotCity:data.hotCityList,
                        cityList:cityList
                    });
                    console.log(res);
                    // 将列表插入到页面上
                    generateTemplate(res,$('#cityListBox'),$('#cityList-template'));
                    //城市索引列表显示
                    $('#cityListBox').show();
                    //给城市索引列表添加高度
                    $('#list').height(windowHeight);
                    mui.init();
                    mui.ready(function() {
                        window.indexedList = new mui.IndexedList($('#list')[0]);   
                    });                    
                },
                callbackFail: function(json) {
                    console.log(json.message)
                    tipAction(json.message);
                }
            }];                        
            $.ajaxLoading(obj);                        
        },
        getCity:function(){
            var that=this;
            var obj=[{
                url: site_url.getCity_api,
                // url:'http://172.16.187.164:8081/web/marketing/frontend/getCity',
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data=json.data;
                    var code=data.cityCode;
                    var name=data.cityName;
                    var parentid=data.provinceCode;
                    $('#locationCity').text(name);
                    $('#locationCity').attr({
                        'data-code':code,
                        'data-parentid':parentid
                    });
                    that.initMui();
                },
                callbackFail: function(json) {
                    console.log(json.message)
                    tipAction(json.message);
                }
            }];                        
            $.ajaxLoading(obj);
        },
        //操作事件
        events:function(){
            var that=this;
            //点击定位文字弹出定位选择
            mui('#activityDataBox').on('mdClick','.activityCityBox',function(){
                $('#activityDataBox').hide();
                $('#cityListBox').html('');
                $('#loading').show();
                that.getCityListData();
            },{
                htmdEvt: 'activityList_0'
            });
            //点击定位选择效果
            mui('#cityListBox').on('mdClick','.mui-indexed-list-item,.hotBox span',function(){
                var txt=$(this).text();
                var code=$(this).attr('data-code');
                var parentId=$(this).attr('data-parentId');
                $('#activityDataBox').show();
                $('#cityListBox').hide();
                $('#loading').show();
                $('.recordList').html('');                
                $('#locationCity').text(txt);
                $('#locationCity').attr({
                    'data-code':code,
                    'data-parentId':parentId
                })
                that.gV.startPage=1;
                that.initMui();
                var activitySearchInputWidth=document.documentElement.clientWidth-$('#activitySearch a').width()-$('.activityCityBox').width()-30;
                $('.activitySearchInput').width(activitySearchInputWidth);   
                mui('.contentWrapper').pullRefresh().scrollTo(0, 0, 100);              
            },{
                htmdEvt: 'activityList_1'
            });
            //点击搜索选择头部返回效果
            mui('#activitySearch').on('mdClick','.backBtn',function(){
            	if(document.referrer == ''){
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
		        }else{
		            location.href="javascript:history.go(-1)";
		        } 
                $('#cityListBox').hide();
                $('#activityDataBox').show();
                mui('.contentWrapper').pullRefresh().scrollTo(0, 0, 10);         
            },{
                htmdEvt: 'activityList_2'
            });
            //点击选择城市头部返回效果
            mui('#activitySearch').on('mdClick','.goBack',function(){
            	$('#cityListBox').hide();
                $('#activityDataBox').show();
            })
            //点击定位选择右侧索引效果
            mui('#cityListBox').on('mdClick','.mui-indexed-list-bar a',function(){
                var txt=$(this).text();
                var len=$('.mui-table-view li').length;
                var list=$('.mui-table-view li');
                for(var i=0;i<len;i++){
                    if(list.eq(i).attr('data-group')==txt){
                        list.removeClass('active');
                        list.eq(i).addClass('active');
                    }
                }
            },{
                htmdEvt: 'activityList_3'
            });
            //点击活动列表跳转
            mui('body').on('mdClick','.mui-card',function(){
                var actType=$(this).children('a').attr('data-actType');
                var actId=$(this).children('a').attr('data-actId');
                window.location.href=site_url.activityDetails_url+'?actType='+actType+'&'+'actId='+actId + '&isNeedLogin=0';
            },{
                htmdEvt: 'activityList_4'
            });
            //搜索框输入触发查询数据
            mui('#activitySearch').on('keyup','.activitySearchInput input',function(){
                $('.recordList').html('');
                // $('#loading').show();
                that.gV.startPage=1;
                that.initMui();
                mui('.contentWrapper').pullRefresh().scrollTo(0, 0, 100); 
            },{
                htmdEvt: 'activityList_5'
            });

            //清除搜索框触发查询数据
            mui('#activitySearch').on('mdClick','.mui-icon-clear',function(){
                $('.recordList').html('');
                // $('#loading').show();
                that.gV.startPage=1;
                that.initMui();
                mui('.contentWrapper').pullRefresh().scrollTo(0, 0, 100); 
            },{
                htmdEvt: 'activityList_6'
            });
            
            // mui("body").on('mdClick', '.goTopBtn', function () {
            //     // $('.mui-scrollbar-indicator')[0].style.webkitTransform = "translate3d(0px, 0px, 0px) translateZ(0px)";
            //     // $('.mui-scrollbar-indicator')[0].style.webkitTransform = '2500ms';
            //     //其他页面
            //     $('#activityDataList')[0].style.webkitTransform = "translate3d(0px, 0px, 0px) translateZ(0px)";
            //     $('#activityDataList')[0].style.webkitTransform = '2500ms';
            // }); 
            
                       
            //点击搜索框触发选中
            $('.activitySearchInput *').on('mdClick',function(){
                console.log(1);
                $('.activitySearchInput').children('input').focus();
            },{
                htmdEvt: 'activityList_7'
            });
        }
    }
    //调用初始化函数
    activityList.init();
})