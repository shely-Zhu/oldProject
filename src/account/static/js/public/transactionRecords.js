/**
* 自选公募-交易记录
* @author yanruiting 2019-11-19
*/
require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function(){
	let somePage = {
		//获取页面元素
		$e:{
			recordSearchTitleBoxId: $("#recordSearchWrapper"), // 筛选标签容器
            searchTitleListTemplateId:$('#searchTitleList-template'),//筛选标签模板Id
            recordSearchDetailBoxId: $("#recordSearchDetail"), // 筛选详细内容容器
            searchDetailListTemplateId:$('#searchDetailList-template'),//筛选详细内容模板Id
            recordListWraperBoxId: $("#recordListWraper"), // 交易列表容器
            recordListTemplateId:$('#recordList-template'),//交易列表模板Id
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
		},
		//全局变量
		gV:{
            pageCurrent: 1, //当前页码，默认为1
            pageSize: 10,
			mask: null,
			searchTitleList: [{
				title: '全部',
				titleId: 0
			},{
				title: '状态',
				titleId: 1
			},{
				title: '时间',
				titleId: 2
			},{
				title: '银行卡',
				titleId: 3
			}],
			// searchType 1 全部 2 状态 3 时间 4 银行卡
			searchDetailList: [[{title: '全部', detailId: 1, searchType: 1}, {title: '买入', detailId: 2,searchType: 1}, {title: '定投', detailId: 3, searchType: 1}, {title: '分红', detailId: 4, searchType: 1}, {title: '卖出', detailId: 5, searchType: 1}],
							   [{title: '全部', detailId: 1, searchType: 2}, {title: '成功', detailId: 2, searchType: 2}, {title: '失败', detailId: 3, searchType: 2}, {title: '待确认', detailId: 4, searchType: 2}, {title: '已撤单', detailId: 5, searchType: 2}],
							   [{title: '全部', detailId: 1, searchType: 3}, {title: '近一个月', detailId: 2, searchType: 3}, {title: '近三个月', detailId: 3, searchType: 3}, {title: '近半年', detailId: 4, searchType: 3}, {title: '近一年', detailId: 5, searchType: 3}, {title: '近三年', detailId: 6, searchType: 3}],
							   [{title: '全部', detailId: 1, searchType: 4}, {title: '华夏银行 - 0622', detailId: 2, searchType: 4}, {title: '中国招商银行 - 3568', detailId: 3, searchType: 4}, {title: '贵州银行 - 5555', detailId: 4, searchType: 4}]],
			selectedAll: 0, // 代表选中的类型id值
			selectedstatus: 0, // 状态
			selectedTime: 0, // 时间
			selectedBankCard: 0 // 银行卡
		},
		//页面初始化函数
		init:function(){
            var that=this;
            this.initMask();
            this.initMui();
            this.setSearchTitle()
            this.events()        
        },
        setSearchTitle() {
        	var that = this;
        	generateTemplate(that.gV.searchTitleList, that.$e.recordSearchTitleBoxId, that.$e.searchTitleListTemplateId);
        },
        // 初始化mui上的遮罩层
        initMask() {
			this.gV.mask = mui.createMask(function(){
				$("#recordSearchDetail").css("display", "none")
			});
        },
        //初始化mui的上拉加载
        initMui: function() {
            var that = this;
            var height = windowHeight - $(".HeadBarConfigBox").height() - $("#recordSearch").height()-8;
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
            }
            mui.init({
                pullRefresh: {
                    container: '.contentWrapper',
                    up: {
                        contentrefresh: '拼命加载中',
                        contentnomore: '没有更多了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: function() {
                            that.getRecordsData(this);
                        }
                    }
                }
            });

            //init后需要执行ready函数，才能够初始化出来
            mui.ready(function() {
                if (!$('.list').hasClass('hasPullUp')) {
                    $('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                }
                that.$e.listLoading.show();
                mui('.contentWrapper').pullRefresh().pullupLoading();
                that.$e.listLoading.hide();
                $('.list').addClass('hasPullUp');
            });
        },
        // 查询交易记录列表
        getRecordsData(t) {
        	var that=this;
            var obj=[{
                url: site_url.dealDetailList_api,
                data:{},
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data;
                    if (json.data.pageItems.totalCount == 0) { // 没有记录不展示
                        that.$e.noData.show();
                        return false;
                    } else {
                        data = json.data.pageList;
                    }
                    data = json.data.pageList
                    setTimeout(function() {
                        if (data.length < that.gV.pageSize) {
                            if (that.gV.pageCurrent == 1) { //第一页时
                                if (data.length == 0) {
                                    that.$e.noData.show();
                                    return false;
                                } else {
                                    t.endPullupToRefresh(true);
                                }
                            } else {
                                t.endPullupToRefresh(true);
                            }
                        } else {
                            t.endPullupToRefresh(false);
                        }

                        // 页面++
                        that.gV.pageCurrent++;
                        // 将交易记录列表插入到页面上
                        generateTemplate(data,that.$e.recordListWraperBoxId,that.$e.recordListTemplateId);

                    }, 200)             
                },
                callbackFail: function(json) {
                    tipAction(json.message);
                }
            }];                        
            $.ajaxLoading(obj);
        },
        events() {
        	var that = this;
        	// 筛选分类的点击事件
            mui("body").on('tap', '.searchItem' , function(){
                if($(this).is('.searchItemActive')) {
                	$(this).removeClass("searchItemActive").siblings('.searchItem').removeClass('searchItemActive');
                	that.$e.recordSearchDetailBoxId.css("display", "none")
                	that.gV.mask.close()
                } else {
                	var titleId = $(this).attr("titleId")
                	that.$e.recordSearchDetailBoxId.html("")
                	generateTemplate(that.gV.searchDetailList[titleId],that.$e.recordSearchDetailBoxId,that.$e.searchDetailListTemplateId)
                	$(this).addClass("searchItemActive").siblings('.searchItem').removeClass('searchItemActive');
                	that.$e.recordSearchDetailBoxId.css("display", "block")
                	switch(titleId) {
                		case '0': that.$e.recordSearchDetailBoxId.find(".detailItem").eq(that.gV.selectedAll).addClass("detailActive").siblings('.detailItem').removeClass('detailActive');break;
                		case '1': that.$e.recordSearchDetailBoxId.find(".detailItem").eq(that.gV.selectedstatus).addClass("detailActive").siblings('.detailItem').removeClass('detailActive');break;
                		case '2': that.$e.recordSearchDetailBoxId.find(".detailItem").eq(that.gV.selectedTime).addClass("detailActive").siblings('.detailItem').removeClass('detailActive');break;
                		case '3': that.$e.recordSearchDetailBoxId.find(".detailItem").eq(that.gV.selectedBankCard).addClass("detailActive").siblings('.detailItem').removeClass('detailActive');break;
                	}
                	that.gV.mask.show()
                }
            })
        	// 筛选列表内容的点击事件
            mui("body").on('tap', '.detailItem' , function(){
            	var detailId = $(this).attr("detailId")
            	var searchType = $(this).attr("searchType")
                if(!$(this).is('.detailActive')) {
                	$(this).addClass("detailActive").siblings('.detailItem').removeClass('detailActive');
                	switch(searchType) {
                		case '1': that.gV.selectedAll = detailId - 1;break;
                		case '2': that.gV.selectedstatus = detailId - 1;break;
                		case '3': that.gV.selectedTime = detailId - 1;break;
						case '4': that.gV.selectedBankCard = detailId - 1;break;
                	}
                	$('.searchItem').removeClass("searchItemActive")
                	that.$e.recordSearchDetailBoxId.css("display", "none")
                	that.gV.mask.close()
                } else {
                	that.$e.recordSearchDetailBoxId.css("display", "none")
                	that.gV.mask.close()
                }
            })
        }
	};
	somePage.init();
});