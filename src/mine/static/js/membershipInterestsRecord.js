//  会员权益成长值记录
// @author caoqihai 2019-11-11 

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayer.js');
require('@pathCommonJs/components/elasticLayerTypeTwo.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
require('@pathCommonCom/pullRefresh/pullRefresh.js');

$(function(){
    var regulatory = {
        $e:{
            hotFundList: $('.content .li'), // 列表
            fundListTemp: $('#List-template'), // 模板赋值
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            noData: $('.noData'), //没有数据的结构
        },
        gV: {
            pageNo: 1, //当前页码，默认为1
            pageSize: 10,
            search: false, // 搜索
        },
        init:function(){
            var that = this;
            

            that.beforeFunc();
            that.initMui(); // 兼容下面函数调用

            that.getDataNum();

			//
			that.events();

        },
        beforeFunc: function(t) {
            var that = this;
            //设置切换区域的高度
            //计算节点高度并设置
            var height = window.innerHeight - $('.banner').height();

            if (!$('.content').hasClass('setHeight')) {
                $('.content').height(height).addClass('setHeight');
            }
        },
        //初始化mui的上拉加载
        initMui: function() {
            var that = this
            var height = windowHeight - $(".HeadBarConfigBox").height() - $(".bannerposi").height();
            if (!$('.li').hasClass('setHeight')) {
                $('.li').height(height).addClass('setHeight');
            }
            $.pullRefresh({
                wrapper: $('.li'),
                class: 'listItem',
                template: that.$e.fundListTemp, 
                pageSize: that.gV.pageSize,
                callback: function(def, t){
                    var obj = [{
                        url: site_url.queryGrowthDetailList_api, //成长值流水
                        data: {
                            "pageNo": that.gV.pageNo,
                            "pageSize": that.gV.pageSize,
                        },                        
                        needDataEmpty: false,
                        needLoading: false,
                        callbackDone: function(json) {    
                            var data = json.data.pageList?json.data.pageList:[];
                            if(that.gV.pageNo == 1 && data.length == 0) {
                                $(".li").css("display", "none")
                                that.$e.noData.show()
                            } else {
                                def && def.resolve( data, that.gV.pageNo);
                                that.gV.pageNo++;
                            }
                        },
                        callbackNoData: function( json ){  
                         
                            if(that.gV.pageNo == 1) {
                                $(".li").css("display", "none")

                            }
                            def && def.reject( json, that.gV.pageNo );
                        },
                        callbackFail: function(json) {
                            def && def.reject( json, that.gV.pageNo );
                        },
                    }];
                    $.ajaxLoading(obj); 
                }
            })
            /*mui.init({
                pullRefresh: {
                    container: '.content',
                    up: {
                        //auto: false,
                        contentrefresh: '拼命加载中',
                        contentnomore: '暂无更多数据', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: function() {
                            
                            // 热门诊断
                            that.getData(this);
                        }
                    }
                }
            });

            mui.ready(function() { //init后需要执行ready函数，才能够初始化出来

                //隐藏当前的加载中loading
                if (!$('.content').hasClass('hasPullUp')) {
                    $('.mui-pull-bottom-pocket').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                }

                //显示loading
                that.$e.listLoading.show();

                //这一句初始化并第一次执行mui上拉加载的callback函数
                mui('.content').pullRefresh().pullupLoading();

                //隐藏loading，调试接口时需要去掉
                //setTimeout(function(){
                that.$e.listLoading.hide();
                //}, 2000);


                //为$id添加hasPullUp  class
                $('.content').addClass('hasPullUp');
            });*/
        },
        getDataNum:function () {
            var that = this;

            var obj = [{ //成长值查询
			    url: site_url.queryGrowthValue_api,
			    data: {},
			    needLogin:true, //需要判断是否登陆
			    //needDataEmpty: false, //不需要判断data是否为空
			    async: false,
			    callbackDone: function(json){  //成功后执行的函数

			    	var num = json.data.growthValue;
                    var num1 = json.data.levelUpValue;
                    var promotionname = '满级'
                    $('.positwoleft').html(num);
                    $('.promotionvalue').html(num1);
                    if(!json.data.levelUpValue){
                        $('.promotionname').html(promotionname);
                    }
                    mui("#mui-progressbar").progressbar({progress:json.data.percent}).show();
			    },
			    callbackNoData: function( json ){
			    	//数据为空
			    	
			    }
			}];


			$.ajaxLoading(obj);
        },
            //数据初始化
		/*getData:function(t){
            
            var that = this

            mui('.content').pullRefresh().pullupLoading();
	       
            
            var obj = [{
                url: site_url.queryGrowthDetailList_api, //成长值流水
                data: {
                    "pageNo": that.gV.pageNo,
                    "pageSize": 10,

                },
                needDataEmpty: false,
                callbackDone: function(json) {
                    var dataList;

                    // 待定
                    if (json.data.totalCount == 0) { // 没有记录不展示
                        that.$e.noData.show();
                        return false;
                    } else {
                        dataList = json.data.pageList;
                    }

                    setTimeout(function() {

                        if (dataList.length < that.gV.pageSize) {

                            if (that.gV.pageCurrent == 1) { //第一页时

                                if (dataList.length == 0) {
                                    // 暂无数据显示
                                    that.$e.noData.show();
                                    return false;

                                } else { // 没有更多数据了
                                    t.endPullupToRefresh(true);
                                }
                            } else {
                                //其他页-没有更多数据
                                t.endPullupToRefresh(true);
                            }
                        } else { // 还有更多数据
                            t.endPullupToRefresh(false);
                        }

                        // 页面++
                        that.gV.pageNo++;

                        //去掉mui-pull-bottom-pocket的mui-hidden
                        $('.content').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                        // 将列表插入到页面上
                        generateTemplate(dataList, that.$e.hotFundList, that.$e.fundListTemp);
                        //无缝滚动
                        alwaysAjax($('.li'),".content",100);
                    }, 200)

                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                },
                callbackNoData:function(json){
                    $('.content').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                    t.endPullupToRefresh(true);
                    that.$e.listLoading.hide();
                    that.$e.noData.show();
                    
                }
            }]
            $.ajaxLoading(obj);

        },*/
        events: function(targetUrl) {
			var that = this;



	         mui("body").on('mdClick','.posioneright', function(){
                    // 13成长值规则说明
                    window.location.href = site_url.articleTemplate_url+ '?articleBelong=13';
                }, {
                    'htmdEvt': 'adolesceRecord_01'
                });
            
		}
    }
    //调用函数
	regulatory.init();
})