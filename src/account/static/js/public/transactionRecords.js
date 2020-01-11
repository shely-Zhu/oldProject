/**
* 自选公募-交易记录
* @author yanruiting 2019-11-19
*/

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var alwaysAjax = require('@pathCommonJs/components/alwaysAjax.js');
var setCookie = require('@pathNewCommonJsCom/setCookie.js');
var getCookie = require('@pathNewCommonJsCom/getCookie.js');

$(function () {
    var somePage = {
        //获取页面元素
        $e: {
            recordSearchTitleBoxId: $("#recordSearchWrapper"), // 筛选标签容器
            searchTitleListTemplateId: $('#searchTitleList-template'),//筛选标签模板Id
            recordSearchDetailBoxId: $("#recordSearchDetail"), // 筛选详细内容容器
            searchDetailListTemplateId: $('#searchDetailList-template'),//筛选详细内容模板Id
            recordListWraperBoxId: $(".mui-table-view-cell"), // 交易列表容器
            recordListTemplateId: $('#recordList-template'),//交易列表模板Id
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
        },
        //全局变量
        gV: {
            pageNum: 1, //当前页码，默认为1
            pageSize: 20,
            mask: null,
            searchTitleList: [{
                title: '全部',
                titleId: 0
            }, {
                title: '状态',
                titleId: 1
            }, {
                title: '时间',
                titleId: 2
            }, {
                title: '银行卡',
                titleId: 3
            }],
            // searchType 1 全部 2 状态 3 时间 4 银行卡
            searchDetailList: [[{ title: '全部', detailId: 1, searchType: 1, data: "" }, { title: '买入', detailId: 2, searchType: 1, data: 0 }, { title: '定投', detailId: 3, searchType: 1, data: 2 }, { title: '分红', detailId: 4, searchType: 1, data: 3 }, { title: '卖出', detailId: 5, searchType: 1, data: 1 }],
            [{ title: '全部', detailId: 1, searchType: 2, data: "" }, { title: '成功', detailId: 2, searchType: 2, data: 1 }, { title: '失败', detailId: 3, searchType: 2, data: 0 }, { title: '待确认', detailId: 4, searchType: 2, data: 2 }, { title: '已撤单', detailId: 5, searchType: 2, data: 3 }],
            [{ title: '全部', detailId: 0, searchType: 3, data: "" }, { title: '近一个月', detailId: 1, searchType: 3, data: 1 }, { title: '近三个月', detailId: 2, searchType: 3, data: 2 }, { title: '近半年', detailId: 3, searchType: 3, data: 3 }, { title: '近一年', detailId: 4, searchType: 3, data: 4 }, { title: '近三年', detailId: 5, searchType: 3, data: 5 }],
            ],
            selectedAll: 0, // 代表选中的类型id值  
            selectedstatus: 0, // 状态
            selectedTime: 0, // 时间
            selectedBankCard: 0, // 银行卡
            ajaxdata: {
                applyType: '',  //0：购买 1：赎回  2：定投,3:分红
                tradeApplyStatus: '',//(0:失败，1：成功，2：待确认，3：已撤单)
                timeNode: '',// * 1：近一个月 2：近三个月 3：近半年 4：近1年 5：近3年
                tradeAcc: '',//交易账号(从银行卡列表取)

            }
        },
        //页面初始化函数
        init: function () {
            var that = this;
            this.initMask();
            // 判断transactionRecordsAjaxData是否有值
            if (!getCookie("transactionRecordsAjaxData")) {
                // 在跳转的本页面 会让上一个页面做清空transactionRecordsAjaxData的操作
                this.initMui(that.gV.ajaxdata);
            } else {
                //返回按钮不会清空transactionRecordsAjaxData的值
                var transactionRecordsAjaxDataCookie = getCookie("transactionRecordsAjaxData")
                var baseTransactionRecordsAjaxDataCookie = new Base64().decode(transactionRecordsAjaxDataCookie)
                that.gV.ajaxdata = JSON.parse(baseTransactionRecordsAjaxDataCookie);

                var transactionRecordsShowDataCookie = getCookie("transactionRecordsShowData")
                var baseTransactionRecordsShowDataCookie = new Base64().decode(transactionRecordsShowDataCookie)
                // 赋值选中状态
                that.gV.selectedAll = baseTransactionRecordsShowDataCookie.split(',')[0]
                that.gV.selectedstatus = baseTransactionRecordsShowDataCookie.split(',')[1]
                that.gV.selectedTime = baseTransactionRecordsShowDataCookie.split(',')[2]
                that.gV.selectedBankCard = baseTransactionRecordsShowDataCookie.split(',')[3]
                console.log(baseTransactionRecordsShowDataCookie.split(',')[4])
                // 回显选中的汉字
                that.gV.searchTitleList[0].title = baseTransactionRecordsShowDataCookie.split(',')[4]
                that.gV.searchTitleList[1].title = baseTransactionRecordsShowDataCookie.split(',')[5]
                that.gV.searchTitleList[2].title = baseTransactionRecordsShowDataCookie.split(',')[6]
                // 自己清空它
                setCookie("transactionRecordsAjaxData","", -1);
                setCookie("transactionRecordsShowData","", -1);
                this.initMui(that.gV.ajaxdata);
            }

            this.setSearchTitle()
            //获取银行卡列表
            this.bankList()
            this.events()
        },
        setSearchTitle: function() {
            var that = this;
            generateTemplate(that.gV.searchTitleList, that.$e.recordSearchTitleBoxId, that.$e.searchTitleListTemplateId);
        },
        // 初始化mui上的遮罩层
        initMask: function() {
            this.gV.mask = mui.createMask(function () {
                $('.searchItem').removeClass('searchItemActive');
                $("#recordSearchDetail").css("display", "none")
            });
        },
        //初始化mui的上拉加载
        initMui: function (da) {
            var that = this;
            var height = windowHeight - $(".HeadBarConfigBox").height() - $("#recordSearch").height() - 8;
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
            }
            mui.init({
                pullRefresh: {
                    container: '.contentWrapper',
                    up: {
                        contentrefresh: '拼命加载中',
                        contentnomore: '暂无更多内容', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: function () {
                            that.getRecordsData(this, da);
                        }
                    }
                }
            });

            //init后需要执行ready函数，才能够初始化出来
            mui.ready(function () {
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
        getRecordsData: function(t, da) {
            var that = this;
            var propdata = {}
            propdata.applyType = da.applyType
            propdata.tradeApplyStatus = da.tradeApplyStatus
            propdata.timeNode = da.timeNode
            propdata.tradeAcc = da.tradeAcc
            propdata.pageNum = that.gV.pageNum
            propdata.pageSize = that.gV.pageSize
            var obj = [{
                url: site_url.tradeList_api,
                data: propdata,
                needDataEmpty: true,
                needLoading: false,
                callbackDone: function (json) {
                    var data;
                    if (!json.data.pageList || json.data.pageList.length == 0) { // 没有记录不展示
                        $('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                        $('.list').addClass('noMove');
                        that.gV.pageNum = 1
                        t.endPullupToRefresh(true);
                        that.$e.listLoading.hide();
                        that.$e.noData.show();
                        return false;
                    } else {
                        json.data.pageList.map(function (e) {
                            if (e.applyType == 0) {
                                e.payin = true
                            } else if (e.applyType == 1) {
                                e.payout = true
                            } else if (e.applyType == 2) {
                                e.payfix = true
                            } else if (e.applyType == 3) {
                                e.payred = true
                            }

                            if (e.tradeApplyStatus == 0) {
                                e.tradeApplyStatusName = '交易失败'
                            } else if (e.tradeApplyStatus == 1) {
                                e.tradeApplyStatusName = '交易成功'
                            } else if (e.tradeApplyStatus == 2) {
                                e.tradeApplyStatusName = '待确认'
                            } else if (e.tradeApplyStatus == 3) {
                                e.tradeApplyStatusName = '已撤单'
                            }else if(e.tradeApplyStatus == 5){
                                e.tradeApplyStatusName = '待确认'
                            }

                            e.sta = e.tradeApplyStatus == 1 ? 1 : 0;

                            e.paystatus = e.applyType == 0 || e.applyType == 2 ? 1 : 0;
                        })
                        data = json.data.pageList;
                    }
                    that.$e.listLoading.hide();
                    setTimeout(function () {
                        if (data.length < that.gV.pageSize) {
                            if (that.gV.pageNum == 1) { //第一页时
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

                        $('.list').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');

                        // 页面++
                        that.gV.pageNum++;
                        // 将交易记录列表插入到页面上
                        generateTemplate(data, that.$e.recordListWraperBoxId, that.$e.recordListTemplateId);
                        // alwaysAjax($('#list .mui-table-view-cell'), "#list .contentWrapper", 2);
                    }, 200)
                },
                callbackFail: function (json) {

                    $('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                    $('.list').addClass('noMove');
                    that.gV.pageNum = 1
                    t.endPullupToRefresh(true);
                    that.$e.listLoading.hide();
                    tipAction(json.message);

                },
                callbackNoData: function (json) {
                    $('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                    $('.list').addClass('noMove');
                    that.gV.pageNum = 1
                    t.endPullupToRefresh(true);
                    that.$e.listLoading.hide();
                    that.$e.noData.show();

                },

            }];
            $.ajaxLoading(obj);
        },
        bankList: function () {
            var that = this;
            var param = {
                useEnv: 1
            };

            //发送ajax请求
            var obj = [{
                url: site_url.normalPofList_api,
                data: param,
                needLogin: true,//需要判断是否登陆
                //needDataEmpty: false,//不需要判断data是否为空
                callbackDone: function (json) {  //成功后执行的函数

                    if (json.data.pageList.length) {
                        var arr = [{ title: '全部', detailId: 1, searchType: 4, data: "" }]
                        json.data.pageList.map(function (e, i) {
                            var obj = {}
                            obj.title = e.bankName + '-' + e.bankAccountMask.substr(-4)
                            obj.detailId = i + 2
                            obj.searchType = 4
                            obj.data = e.tradeAcco
                            arr.push(obj)
                        })
                        that.gV.searchDetailList.push(arr)
                    }




                }
            }];
            $.ajaxLoading(obj);

        },
        events: function() {
            var that = this;
            // 筛选分类的点击事件
            alwaysAjax();
            mui("body").on('mdClick', '.searchItem', function () {
                if ($(this).is('.searchItemActive')) {
                    $(this).removeClass("searchItemActive").siblings('.searchItem').removeClass('searchItemActive');
                    that.$e.recordSearchDetailBoxId.css("display", "none")
                    that.gV.mask.close()
                } else {
                    var titleId = $(this).attr("titleId")
                    that.$e.recordSearchDetailBoxId.html("")
                    generateTemplate(that.gV.searchDetailList[titleId], that.$e.recordSearchDetailBoxId, that.$e.searchDetailListTemplateId)
                    $(this).addClass("searchItemActive").siblings('.searchItem').removeClass('searchItemActive');
                    that.$e.recordSearchDetailBoxId.css("display", "block")
                    switch (titleId) {
                        case '0': that.$e.recordSearchDetailBoxId.find(".detailItem").eq(that.gV.selectedAll).addClass("detailActive").siblings('.detailItem').removeClass('detailActive'); break;
                        case '1': that.$e.recordSearchDetailBoxId.find(".detailItem").eq(that.gV.selectedstatus).addClass("detailActive").siblings('.detailItem').removeClass('detailActive'); break;
                        case '2': that.$e.recordSearchDetailBoxId.find(".detailItem").eq(that.gV.selectedTime).addClass("detailActive").siblings('.detailItem').removeClass('detailActive'); break;
                        case '3': that.$e.recordSearchDetailBoxId.find(".detailItem").eq(that.gV.selectedBankCard).addClass("detailActive").siblings('.detailItem').removeClass('detailActive'); break;
                    }
                    that.gV.mask.show()
                }
            },{
                'htmdEvt': 'transactionRecords_0'
            })
            // 筛选列表内容的点击事件
            mui("body").on('mdClick', '.detailItem', function () {

                var detailId = $(this).attr("detailId")
                var searchType = $(this).attr("searchType")
                var data = $(this).attr("data")
                if (!$(this).is('.detailActive')) {
                    $(this).addClass("detailActive").siblings('.detailItem').removeClass('detailActive');
                    switch (searchType) {
                        case '1': that.gV.selectedAll = detailId - 1; that.gV.ajaxdata.applyType = data;
                            // 赋值回显
                            $('#recordSearchWrapper .searchItem').eq(0).children('span').text($(this).text().trim())
                            break;
                        case '2': that.gV.selectedstatus = detailId - 1; that.gV.ajaxdata.tradeApplyStatus = data;
                            $('#recordSearchWrapper .searchItem').eq(1).children('span').text($(this).text().trim())
                            break;
                        case '3': that.gV.selectedTime = detailId; that.gV.ajaxdata.timeNode = data;
                            $('#recordSearchWrapper .searchItem').eq(2).children('span').text($(this).text().trim())
                            break;
                        case '4': that.gV.selectedBankCard = detailId - 1; that.gV.ajaxdata.tradeAcc = data;
                            // $('#recordSearchWrapper .searchItem').eq(3).children('span').text($(this).text().trim()) 
                            break;
                    }
                    $('.searchItem').removeClass("searchItemActive")
                    that.$e.recordSearchDetailBoxId.css("display", "none")
                    that.gV.mask.close()
                } else {
                    that.$e.recordSearchDetailBoxId.css("display", "none")
                    that.gV.mask.close()
                }
                that.$e.recordListWraperBoxId.find('.recordItem').remove()
                that.$e.noData.hide();

                // 再次重置上拉加载
                mui('.contentWrapper').pullRefresh().refresh(true);
                that.gV.pageNum = 1
                //清空列表
                $('#recordListWraper').find('div').remove()
                $('.list').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                //重新初始化
                that.initMui(that.gV.ajaxdata);
                mui('.contentWrapper').pullRefresh().scrollTo(0, 0, 0)
            },{
                'htmdEvt': 'transactionRecords_1'
            })


            //点击列表跳转
            mui('body').on('mdClick', '.recordItem', function () {
                var applyId = $(this).attr('data-applyId');
                var fundCombination = $(this).attr('data-fundCombination');
                var fundCode = $(this).attr('data-fundCode');
                var fundType = $(this).attr('data-fundType');
                var fundBusinCode = $(this).attr('data-fundBusinCode');
                var allotType = $(this).attr('data-allotType');
                var Fixbusinflag = $(this).attr('data-Fixbusinflag');
                var scheduledProtocolId = $(this).attr('data-scheduledProtocolId');
                //分红需要传的
                var shares = $(this).attr('data-shares')
                var fundName = $(this).attr('data-fundName')
                var applyDate = $(this).attr('data-applyDate')
                var autoBuyDesc = $(this).attr('data-autoBuyDesc')
                // pathdata 是 每个详情页 都需要传的参数
                var pathdata = site_url.publicTradeDetail_url + '?applyId=' + applyId + '&fundCombination=' + fundCombination
                + '&fundCode=' + fundCode + '&fundBusinCode=' + fundBusinCode + '&allotType=' + allotType
                + '&Fixbusinflag=' + Fixbusinflag + '&fundType='+ fundType
                // allotType == 3  是分红
                if (allotType == 3) {
                    window.location.href = pathdata + '&shares=' + shares + '&fundName=' + new Base64().encode(fundName)
                        + '&applyDate=' + applyDate + '&autoBuyDesc=' + new Base64().encode(autoBuyDesc);
                } else {
                    window.location.href = pathdata + '&scheduledProtocolId=' + scheduledProtocolId;
                    
                }
                // 存 setCookie 是详情页返回时  要保留 筛选条件的动作  transactionRecordsAjaxData  是ajax参数  transactionRecordsShowData 是回显
                var transactionRecordsAjaxData = JSON.stringify(that.gV.ajaxdata)
                var transactionRecordsShowData = JSON.stringify(that.gV.selectedAll) + ','
                        + JSON.stringify(that.gV.selectedstatus) + ',' + that.gV.selectedTime + ','
                        + JSON.stringify(that.gV.selectedBankCard) + ',' + $('#recordSearchWrapper .searchItem').eq(0).children('span').text() +
                        ',' + $('#recordSearchWrapper .searchItem').eq(1).children('span').text() + ',' + $('#recordSearchWrapper .searchItem').eq(2).children('span').text()
                setCookie("transactionRecordsAjaxData", new Base64().encode(transactionRecordsAjaxData));
                setCookie("transactionRecordsShowData", new Base64().encode(transactionRecordsShowData));

            },{
                'htmdEvt': 'transactionRecords_2'
            });
        }
    };
    somePage.init();
});