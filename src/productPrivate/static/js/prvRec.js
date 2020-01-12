/**
 * 私募产品推荐
 * @author  zhangweipeng 2017-03-08
 */

require('../../../include/js/vendor/config.js');
//zepto模块
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
//黑色提示条的显示和隐藏
var tipAction = require('../../../common/js/components/tipAction.js');
require('../../../common/js/components/goTopMui.js');
var splitUrl = require('../../../common/js/components/splitUrl.js');
require('../../../common/js/userCheck.js');
var prvRec = {
    page: 1, //当前页
    getElements: {
        noData: $('.noData'), //没有数据的结构
        listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
    },
    init: function() {
        var that = this;
        //检查是否登录及风险测评
        $.userCheck(true, function() {

            
        });
        that.beforeFunc();
        that.initMui();
        that.events();
    },
    beforeFunc: function() {
        var that = this;

        //设置切换区域的高度
        //计算节点高度并设置
        //if( !that.height ){
        var height = windowHeight - $('.like').height();
        if (!$('.list .contentWrapper').hasClass('setHeight')) {
            $('.list .contentWrapper').height(height).addClass('setHeight');
        }
    },


    getData: function(t) {
        var that = this;

        //重设ajaxFail
        that.ajaxFail = false;

        var obj = [{
                url: site_url.user_api,
                data: {
                },
                needDataEmpty: false,
                callbackDone: function(data) {
                    var jsonData = data.data;
                    if (jsonData.idnoCheckflag == "1") { //是否实名认证
                        that.name = jsonData.name;
                        if(jsonData.sex == "" || jsonData.sex == null) {
                            $(".user .userName").html('<span class="name">' + that.name + '</span>');
                        } else{
                            jsonData.sex == 0 ? that.gender = "女士" : that.gender = "先生";
                            $(".user .userName").html('<span class="name">' + that.name + '</span> <span class="gender">' + that.gender + '</span>');
                        }
                    } else {
                        $(".user .userName").html('<span class="name">尊敬的客户</span>');
                    }
                },
                callbackFail: function(data) {
                    tipAction(data.message);
                }
            },
            {
                url: site_url.recommend_api, //私募产品列表
                data: {
                    groupType: "wouldlike_" + splitUrl()["invest"], //类型（参考备注）
                    pageNum: "1", // 当前页码 
                    pageSize: "10" //每页显示条数      
                },
                needDataEmpty: false,
                needLogin: true,
                callbackDone: function(json) {

                    that.jsonData = json.data;

                    if (!$.util.objIsEmpty(that.jsonData.list)) {
                        //有数据，拼模板

                        $.each(that.jsonData.list, function(i, el) {

                            if (el.pefType == "2") {
                                if (el.pefExpectedProfitMax == "0" || el.pefExpectedProfitMax == '') {
                                    el.noMax = true;
                                    //2019-01-31修改
                                    //判断el.pefExpectedProfitMin字段是否为空，排除el.pefExpectedProfitMin为0的情况
                                    if( !el.pefExpectedProfitMin && el.pefExpectedProfitMin !== 0){
                                        el.pefExpectedProfitMin = '--';
                                    }
                                } else {
                                    el.noMax = false;
                                }
                                el.solid = true; //类固收
                                el.netValue = false;
                            } else if (el.pefType == "3") {
                                el.solid = false; //浮收
                                el.netValue = true;
                                //2019-01-31修改
                                //判断el.pefNetValue字段是否为空，排除el.pefNetValue为0的情况
                                if( !el.pefNetValue && el.pefNetValue !== 0){
                                    el.pefNetValue = '--';
                                }
                                //判断el.pefNetValueDate字段是否为空，排除el.pefNetValueDate为0的情况
                                if( !el.pefNetValueDate && el.pefNetValueDate !== 0){
                                    el.pefNetValueDate = '--';
                                }
                            }
                            /*if(el.netValueDate){
                            	el.netValueDate=el.netValueDate.substr(el.netValueDate.indexOf("-")+1,);
                            }*/
                        })
                        var tplm = $("#productList-template").html(),
                            template = Handlebars.compile(tplm);

                        that.html = template(that.jsonData.list);

                        setTimeout(function() {

                            if (that.jsonData.list.length < 10) {
                                t.endPullupToRefresh(true);

                            } else {
                                t.endPullupToRefresh(false);
                            }

                            that.page++;

                            if ($('.list').hasClass('refresh')) {
                                //当前为重新搜索，模板结构需要html进去
                                $('.branchBody').find('.contentWrapper .mui-table-view-cell').html(that.html);

                                //去掉list的refresh class
                                $('.list').removeClass('refresh');

                                //隐藏回到顶部按钮
                                $('.goTopBtn').hide();

                            } else {
                                //非重新搜索，即上拉发起的请求，结果append进去
                                $('.branchBody').find('.contentWrapper .mui-table-view-cell').append(that.html);

                            }

                            //$('.branchBody').find('.contentWrapper .mui-table-view-cell').html(that.html);	
                            $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');

                        }, 200)

                    } else {
                        //没有数据

                        if (that.page == 1) {
                            //第一页时
                            $('.branchBody .mui-table-view-cell').html(that.getElements.noData);
                            $('.branchBody').find('.noData').show();
                            //t.disablePullupToRefresh();
                            //此处不能使用disablePullupToRefresh，会导致上拉失去作用
                            t.endPullupToRefresh(true);

                            //隐藏回到顶部按钮
                            $('.goTopBtn').hide();

                        } else {
                            //其他页
                            t.endPullupToRefresh(true);
                            $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                        }
                    }

                    //去掉loading
                    setTimeout(function() {
                        that.getElements.listLoading.hide();
                    }, 200);
                },
                     
            }
        ]
        $.ajaxLoading(obj);
    },

    //初始化mui的上拉加载
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
                        //执行ajax请求
                        that.getData(this);
                    }
                }
            }
        });
        //init后需要执行ready函数，才能够初始化出来
        mui.ready(function() {

            //隐藏当前的加载中loading
            if (!$(".list").hasClass('hasPullUp')) {
                $(".list").find('.mui-pull-bottom-pocket').addClass('mui-hidden');
            }

            //显示loading
            that.getElements.listLoading.show();

            //这一句初始化并第一次执行mui上拉加载的callback函数
            mui(".contentWrapper").pullRefresh().pullupLoading();

            //隐藏loading，调试接口时需要去掉
            setTimeout(function() {
                that.getElements.listLoading.hide();
            }, 200);


            //为$id添加hasPullUp  class
            $(".list").addClass('hasPullUp');
        });
    },

    events: function() {
        var that = this;
        mui(".contentWrapper").on("tap", ".mui-card", function() {
            window.location.href = $(this).attr("href");
        })
    }
}
prvRec.init();