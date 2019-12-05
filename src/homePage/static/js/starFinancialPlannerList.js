/**
 * 会员俱乐部-活动列表
 * @author  liuhongyu 2019 10-31
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var alwaysAjax = require('@pathCommonJs/components/alwaysAjax.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function(){
    var activityList={
        //元素类名
        $e:{
            //列表类名
            recordList:$('.recordList'),
            //模板类名
            activityListDataBox:$('.activityListDataBox'),//有数据盒子
            activityListDataNoBox:$('.activityListDataNoBox'),//没有数据盒子
            //插入列表模板ID
            starFinancialPlannerListTemplateId:$('#starFinancialPlannerList-template'),
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
        },
        gV: { // 全局变量
            groupCode: splitUrl['groupCode'], // 组合编号，从我的持仓进
            startPage: 1, //当前页码，默认为1
            pageSize: 10,//一页最大返回list个数
            listLength: 0,
            actName:$('.activitySearchInput input').val(), //活动名称
            actProvinceNO:$('#locationCity').attr('data-parentid'), //活动省份编号
            actCityNO:$('#locationCity').attr('data-code'), //活动城市编号
        },  
        //初始化
        init:function(){
            var that = this;
            // that.getCityListData();
            $('.activityNoList').css({
                'margin-top':'.3rem'
            });
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
            that.$e.listLoading.show();
            var obj = [{ // 系统调仓记录列表
                url: site_url.queryFinancialer_api,
                // url:'http://172.16.187.164:8081/web/marketing/activity/getActivitiesList',
                data: {
                    code:$('.mui-input-clear').val(),   
                    cityName:$('#locationCity').html(),
                    "pageNum": that.gV.startPage, //非必须，默认为1
                    "pageSize":that.gV.pageSize//非必须，默认为10
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    console.log('我是内容',json);
                    var data=json.data.financialerList;
                    console.log(data)
                    if(json.data.matchedFinancialer=='0'){
                        t.endPullupToRefresh(true);
                        that.$e.activityListDataBox.hide();
                        that.$e.activityListDataNoBox.show();
                        //that.getNoData();
                        that.getRecommend(data)
                        return false;
                    }
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
                        
                        // 将列表插入到页面上
                        generateTemplate(data,that.$e.recordList,that.$e.starFinancialPlannerListTemplateId)
                        that.$e.listLoading.hide();
                        $(".lazyload").lazyload()
                        
                    }, 200)

                },
                callbackFail: function(json) {
                    
                },
                callbackNoData: function(json){
                    that.$e.listLoading.hide();
                }
            }];
            $.ajaxLoading(obj);
        },
        //推荐列表
        getRecommend:function(data){
            var that = this;
            var topHeitgh=$('#activitySearch').height();
            var noBox=$('.activityNoListBox').height();
            var noListM=parseInt(that.getStyle($('.activityNoList')[0],'marginTop'));

            console.log(noListM);
            var height = windowHeight-topHeitgh-noBox-noListM;
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
                generateTemplate(data,$('.activityNoListBox2'),$('#starFinancialPlannerList-template'),true)
                // 第一个调仓记录默认展开
                $('.recordList').find('ul').eq(0).find('.mui-collapse').addClass('mui-active');
            }, 200)
            
        },
        //无数据获取列表
        getNoData:function(data){
            var that = this;
            var topHeitgh=$('#activitySearch').height();
            var noBox=$('.activityNoListBox').height();
            var noListM=parseInt(that.getStyle($('.activityNoList')[0],'marginTop'));

            console.log(noListM);
            var height = windowHeight-topHeitgh-noBox-noListM;
            console.log(height);
            var obj = [{ // 系统调仓记录列表
                url: site_url.queryFinancialer_api,
                // url:'http://172.16.187.164:8081/web/marketing/activity/getActivitiesList',
                data: {
                    code:$('.mui-input-clear').val(),   
                    cityName:$('#locationCity').html(),
                    "pageNum": that.gV.startPage, //非必须，默认为1
                    "pageSize":that.gV.pageSize//非必须，默认为10
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    console.log(json);
                    var data=json.data.financialerList;
                    setTimeout(function() {
                        
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
                            generateTemplate(data,$('.activityNoListBox2'),$('#starFinancialPlannerList-template'))
                            // 第一个调仓记录默认展开
                            $('.recordList').find('ul').eq(0).find('.mui-collapse').addClass('mui-active');
                        }, 200)
                        
                    }, 200)

                },
                callbackFail: function(json) {
                    
                },
                callbackNoData: function(json){
                    
                }
            }];
            $.ajaxLoading(obj);
            
        },
        getStyle(obj,attr){   
            if(obj.currentStyle){   
                return obj.currentStyle[attr];   
            }   
            else{   
                return document.defaultView.getComputedStyle(obj,null)[attr];   
            }   
        },     
        //将城市定位模板加载
        getCityListData:function(){

            var obj=[{
                url: site_url.cityListStar_api,
                // url:'http://172.16.187.164:8081/web/marketing/activity/cityList',
                //async: false,
                needDataEmpty: true,
                contentTypeSearch: false, //false: application/json,入参data为json字符串  , true:  application/x-www-form-urlencoded ，入参data为json对象
                callbackDone: function(json) {
                    console.log('我是内容',json)
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
                    res.push({
                        namea:'明星理财师',
                        hotCityList:rightListArr,
                        hotCity:data.hotCityList,
                        cityList:cityList
                    });
                    console.log('我是res',res);
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
                //url:'http://172.16.187.164:8081/web/marketing/frontend/getCity',
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data=json.data;
                    var code=data.cityCode;
                    var name=data.cityName;
                    if(name.split('').reverse().join('').charAt(0)=='市'){
                        name=name.substring(0,name.length-1)
                    }
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
            mui('#activityDataBox').on('tap','.activityCityBox',function(){
                $('#activityDataBox').hide();
                $('#cityListBox').html('');
                $('#loading').show();
                that.getCityListData();
            });
            //点击定位选择效果
            mui('#cityListBox').on('tap','.mui-indexed-list-item,.hotBox span',function(){
                $(this).attr('htmdEvt','starFinancia_city')
                var txt=$(this).text();
                var code=$(this).attr('data-code');
                var parentId=$(this).attr('data-parentId');
                $('#activityDataBox').show();
                $('#cityListBox').hide();
                $('#loading').show();
                $('.recordList').html(''); 
                if(txt.split('').reverse().join('').charAt(0)=='市'){
                    txt=txt.substring(0,txt.length-1)
                }           
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
            });
            //点击定位选择头部返回效果
            mui('#cityListBox').on('tap','.goBack',function(){
                $(this).attr('htmdEvt','starFinancia_goBack')
                $('#cityListBox').hide();
                $('#activityDataBox').show();
                mui('.contentWrapper').pullRefresh().scrollTo(0, 0, 10);         
            });
            //点击定位选择右侧索引效果
            mui('#cityListBox').on('tap','.mui-indexed-list-bar a',function(){
                $(this).attr('htmdEvt','starFinancia_index')
                var txt=$(this).text();
                var len=$('.mui-table-view li').length;
                var list=$('.mui-table-view li');
                for(var i=0;i<len;i++){
                    if(list.eq(i).attr('data-group')==txt){
                        list.removeClass('active');
                        list.eq(i).addClass('active');
                    }
                }
            });
            //点击活动列表跳转
            mui('body').on('tap','.mui-card',function(){
                $(this).attr('htmdEvt','starFinancia_list')
                var actType=$(this).children('a').attr('data-actType');
                var actId=$(this).children('a').attr('data-actId');
                window.location.href=site_url.activityDetails_url+'?actType='+actType+'&'+'actId='+actId;
            });
            //搜索框输入触发查询数据
            mui('#activitySearch').on('keyup','.activitySearchInput input',function(){
                $(this).attr('htmdEvt','starFinancia_search')
                $('.recordList').html('');
                // $('#loading').show();
                that.gV.startPage=1;
                console.log($('.mui-input-clear').val())
                that.initMui();
                mui('.contentWrapper').pullRefresh().scrollTo(0, 0, 100); 
            });

            //清除搜索框触发查询数据
            mui('#activitySearch').on('tap','.mui-icon-clear',function(){
                $(this).attr('htmdEvt','starFinancia_del')
                $('.recordList').html('');
                // $('#loading').show();
                that.gV.startPage=1;
                that.initMui();
                mui('.contentWrapper').pullRefresh().scrollTo(0, 0, 100); 
            });
            
            // mui("body").on('tap', '.goTopBtn', function () {
            //     // $('.mui-scrollbar-indicator')[0].style.webkitTransform = "translate3d(0px, 0px, 0px) translateZ(0px)";
            //     // $('.mui-scrollbar-indicator')[0].style.webkitTransform = '2500ms';
            //     //其他页面
            //     $('#activityDataList')[0].style.webkitTransform = "translate3d(0px, 0px, 0px) translateZ(0px)";
            //     $('#activityDataList')[0].style.webkitTransform = '2500ms';
            // }); 
            
                       
            //点击搜索框触发选中
            $('.activitySearchInput *').on('tap',function(){
                console.log(1);
                $(this).attr('htmdEvt','starFinancia_SearchInput')
                $('.activitySearchInput').children('input').focus();
            });
            //返回上一页
            $("#goBack").on("click",function(){
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
                
            })
            //无缝滚动
            alwaysAjax(".recordList")
        }
    }
    //调用初始化函数
    activityList.init();
})