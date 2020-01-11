/*
 * @page: 基金诊断搜索
 * @Author: songxiaoyu
 * @Date:   2019-08-09 11:54:51
 * @Last Modified by:   songxiaoyu
 * @description:
 */
require('@pathCommonBase/base.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/ajaxLoading.js');
// require('@pathCommonJs/components/elasticLayer.js');
// require('@pathCommonJs/components/headBarConfig.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var alwaysAjax = require('@pathCommonJs/components/alwaysAjax.js');
// 切换
require('@pathCommonJsCom/goTopMui.js');

$(function() {
    var hotDiagnosis = {
        $e: {
            hotFundList: $('.hotFundList .list_li'), // 搜索列表
            resultWrap: $('.resultWrap'), // 搜索结果
            fundListTemp: $('#fundList-template'), // 基金区域
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            noData: $('.noData'), //没有数据的结构
        },
        gV: {
            pageCurrent: 1, //当前页码，默认为1
            pageSize: 10,
            search: false, // 搜索
            key:'',
        },
        init: function() {
            var that = this;
            that.$e.listLoading.hide()
            that.beforeFunc();
            that.events();
        },
        beforeFunc: function(t) {
            var that = this;

            //设置切换区域的高度
            //计算节点高度并设置
            var height = windowHeight - $('.fixedWrap').height();

            if (!$('.list .contentWrapper').hasClass('setHeight')) {
                $('.list, .contentWrapper').height(height).addClass('setHeight');
            }
        },
        // 初始化mui的上拉加载
        initMui: function() {
            var that = this;
            mui.init({
                pullRefresh: {
                    container: '.contentWrapper',
                    up: {
                        //auto: false,
                        contentrefresh: '拼命加载中',
                        contentnomore: '没有更多了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: function() {
                            that.getData(that.gV.key, this);
                        }
                    }
                }
            });
        },
        // 获取搜索数据
        getData: function(key, t) {
            var that = this;

            var obj = [{
                url: site_url.query_api, //搜索接口
                data: {
                    "pageCurrent": that.gV.pageCurrent,
                    "pageSize": 10,
                    "publicFundsKeyWords": key, ////产品检索关键字（简称、代码）非必填项   

                },
                needLoading: false,
                // needDataEmpty: false,
                callbackDone: function(json) {
                    var dataList;

                    if (json.data.totalCount == 0) { // 没有记录不展示
                        $(".list").css("display", "none");
                        that.$e.noData.show();
                        return false;
                    } else {
                        that.$e.noData.hide();
                        $('.list').show();
                        that.$e.resultWrap.find('.total').html(json.data.totalCount);
                        that.$e.resultWrap.find('.word').html(key);
                        dataList = json.data.pageList;
                        that.$e.resultWrap.show()
                    }


                    setTimeout(function() {

                        if (dataList.length < that.gV.pageSize) {

                            if (that.gV.pageCurrent == 1) { //第一页时

                                if (dataList.length == 0) {
                                    // 暂无数据显示
                                    $(".list").css("display", "none");
                                    that.$e.noData.show();

                                    t.endPullupToRefresh(false);

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
                        that.gV.pageCurrent++;


                        if( $('.list').hasClass('refresh') ){
                            //当前为重新搜索，模板结构需要html进去
                            generateTemplate(dataList, that.$e.hotFundList, that.$e.fundListTemp,true);
                            alwaysAjax($('.mui-table-view-cell'));
                            //去掉list的refresh class
                            $('.list').removeClass('refresh');

                            //隐藏回到顶部按钮
                            // $('.goTopBtn').hide();

                        }else{
                            //非重新搜索，即上拉发起的请求，结果append进去
                            $('.branchBody').find('.contentWrapper .mui-table-view-cell .mui-card').append(that.html);  

                            generateTemplate(dataList, that.$e.hotFundList, that.$e.fundListTemp);
                            alwaysAjax($('.mui-table-view-cell'));
                        }

                        //去掉mui-pull-bottom-pocket的mui-hidden
                        $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                        // 将列表插入到页面上

                        that.highlightFunc(key);

                        that.$e.listLoading.hide();

                    }, 200)

                },
                callbackNoData:function(){
                    that.$e.resultWrap.find('.total').html(0);
                    that.$e.listLoading.hide()
                    t.endPullupToRefresh(true);

                    $(".list").css("display", "none");
                    that.$e.noData.show()    
                    //隐藏回到顶部按钮
                    $('.goTopBtn').hide();

                }
            }]
            $.ajaxLoading(obj);
        },
        // 防抖
        debounce: function(fn, wait) {
            var timeout = null;
            var that = this;
            that.gV.search = true;

            return function() {
                if (timeout !== null) clearTimeout(timeout);

                timeout = setTimeout(fn, wait,that);
            }
        },
        // 页面是否初始化过
        judgePage: function(that) {
            var key = $.util.regList.removeAllSpace($(".branchSearchInput").val());
            that.$e.resultWrap.find('.total').html('--');
            that.$e.resultWrap.find('.word').html(key);

            that.gV.key = key;

            if (that.gV.key) {
                that.$e.listLoading.show();

                if (!$('.list').hasClass('hasPullUp')) { // 未初始化过

                    that.initMui();

                    //初始化后，隐藏上拉文字
                    // $('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');

                    //请求第一次数据
                    mui('.contentWrapper').pullRefresh().pullupLoading();

                    $('.list').addClass('hasPullUp');
                } else {
                    //已初始化，
                    //refresh表示当前为搜索新数据，该class会在数据插入页面后去掉
                    $('.list').show().addClass('refresh');

                    //清空当前页面
                    that.$e.hotFundList.html('');

                    //重设当前页码为1
                    that.gV.pageCurrent = 1;

                    

                    // 滚动区域回到顶部
                    mui('.contentWrapper').pullRefresh().scrollTo(0, 0, 0);
                    // $('.contentWrapper ul') && ($('.contentWrapper ul')[0].style.webkitTransform = "translate3d(0px, 0px, 0px) translateZ(0px)");
                    // $('.contentWrapper ul') && ($('.contentWrapper ul')[0].style.webkitTransform = '2500ms');

                    //清空页面后重置上拉加载，使回到顶部
                    // mui('.contentWrapper').pullRefresh().refresh(true);

                    //上拉，发送ajax请求
                    mui('.contentWrapper').pullRefresh().pullupLoading();

                    //隐藏上拉文字
                    $('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');

                    // //重设当前页码为1
                    // that.gV.pageCurrent = 1;

                    // //上拉，发送ajax请求
                    // mui('.contentWrapper').pullRefresh().pullupLoading();
                }
            } else {
                //当数据清空时
                that.$e.hotFundList.html('');
            }
        },
        // 将搜索到的数据标红
        highlightFunc:function(key){
            var array = key.split('');
            var allName = $('.fontBold'); // 获取所有的基金名称和代码

            for(var i = 0;i<allName.length;i++){
                for(var j = 0;j<array.length;j++){
                    // 创建表达式
                    var reg = new RegExp("(" + array[j].replace(/,/, "|") + ")", "g")
                    
                    allName[i].innerHTML =allName[i].innerHTML.replace(reg,"<font color='#ff6905'>$1</font>");
                }
            }
        },
        events: function () {
            var that = this;

            // 搜索框
            var $searchInput = document.getElementById("searchInput");
            
            $searchInput.oninput = that.debounce(that.judgePage, 600); 


            // 搜索取消按钮
            mui("body").on("mdClick", ".mui-icon-clear", function (event) {
                that.$e.resultWrap.hide();
                that.$e.hotFundList.html('');
                that.$e.resultWrap.find('.total').html('--');
                that.$e.resultWrap.find('.word').html('');
            },{
                'htmdEvt': 'diagnosisSearch_01'
            })
            
            //为li标签点击事件委托
            mui("body").on("mdClick", ".mui-row", function (event) {
                if (event.target) {
                    var fundCode = $($(this).find('.lightColor')[0]).attr("fundCode");
                    $("#searchInput").val("");

                    window.location.href = site_url.diagnosisDetail_url+'?fundCode='+fundCode;
                }
                
            },{
                'htmdEvt': 'diagnosisSearch_02'
            });
        }
    };
    hotDiagnosis.init();
});