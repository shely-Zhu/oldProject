/*
 * 我的奖励
 * @author zhangyanping 2019-11-12
*/

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');

var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var alwaysAjax = require('@pathCommonJs/components/alwaysAjax.js');

$(function() {

    var reward = {
        $e: {
            adjustmentRecord: $('.adjustmentRecord'), // 调仓记录
            recordList: $('.recordList'), // 调仓记录
            rewardTemp: $('#reward-template'), // 最新调仓模板
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //
            closeBtn: $('.closeBtn'),//关闭按钮
            tipBox:$('.tipBox'),//弹层
            viewDetails:$('.viewDetails'),//查看详情按钮
            firstli:$('.firstli'),
            secondli:$('.secondli'),
            thirdli:$('.thirdli'),
            fourli:$('.fourli'),
            fiveli:$('.fiveli'),
            secondliNum:$('.secondliNum'),
            secondliPwd:$('.secondliPwd'),



        },
        gV: { // 全局变量

            pageCurrent: 1, //当前页码，默认为1
            pageSize: 10,
            listLength: 0,
        },
        init: function() {
            var that = this;
            that.initMui();
            that.events();
        },
        //初始化mui的上拉加载
        initMui: function() {
            var that = this;

            var height = windowHeight;
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
            }
            mui.init({
                pullRefresh: {
                    container: '.rewardWrapper',
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
                if (!$('.list').hasClass('hasPullUp')) {
                    $('.list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                }

                //显示loading
                that.$e.listLoading.show();

                //这一句初始化并第一次执行mui上拉加载的callback函数
                mui('.rewardWrapper').pullRefresh().pullupLoading();

                //隐藏loading，调试接口时需要去掉
                //setTimeout(function(){
                that.$e.listLoading.hide();
                //}, 2000);

                //为$id添加hasPullUp  class
                $('.list').addClass('hasPullUp');
            });
        },
        getData: function(t) {
            var that = this;

            var obj = [{ // 月度报告列表
                url: site_url.getPrizeInfo_api,
                data: {
                    "pageNum": that.gV.pageCurrent,
                    "pageSize": that.gV.pageSize
                },
                //async: false,
                contentTypeSearch: true, //
                needDataEmpty: true,
                callbackDone: function(json) {
                    var data;

                    //console.log(JSON.stringify(json.data.list.length));

                    if (json.data.list.length == 0) { // 没有记录不展示
                        that.$e.noData.show();
                        $('.reward').hide();
                        return false;
                    } else {
                        data = json.data.list;
                    }

                    setTimeout(function() {

                        if (data.length < that.gV.pageSize) {

                            if (that.gV.pageCurrent == 1) { //第一页时

                                if (data.length == 0) {
                                    // 暂无数据显示
                                    $('.reward').hide();
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
                        that.gV.pageCurrent++;

                        $.each(data, function(i, el) {

                            if (el.isAvailable == "0") {
                                el.AvailableValue = true; //有效

                                el.xnParentClass = "virtual";
                                el.xnChildClass = "virRewardDetail";

                            } else if (el.isAvailable == "1") {

                                el.AvailableValue = false; //无效
                                el.imgvalue = true; //显示无效图片

                                el.xnParentClass = "invalid";
                                el.xnChildClass = "invalidRewardDetail";

                            }
                            if (el.prizeType == "1") { //实物奖品
                                el.prizeValue = true;
                            } else if (el.prizeType == "2") { //虚拟奖品
                                el.prizeValue = false;
                            }
                        });
                        /*console.log(JSON.stringify(data));*/


                        //去掉mui-pull-bottom-pocket的mui-hidden
                        $('.rewardWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                        // 将列表插入到页面上
                        generateTemplate(data, that.$e.recordList, that.$e.rewardTemp);

                        // 第一个调仓记录默认展开
                        //$('.recordList').find('ul').eq(0).find('.mui-collapse').addClass('mui-active');

                    }, 200)

                },
                callbackFail: function(json){  //失败后执行的函数

                    tipAction(json.message);

                },
                callbackNoData:function(json){
                    var that = this;
                        that.$e.noData.show();
                        $('.reward').hide();
                }

            }];
            $.ajaxLoading(obj);
        },
        events: function() {
            var that = this;


            //console.log(JSON.stringify($(".viewDetails").html()));
            mui("body").on('mdClick', '.viewDetails', function() {
                var $this = $(this);
                var prizeDetailId = $this.attr("data-id");

                console.log(JSON.stringify(prizeDetailId));

                var obj = [{
                    url: site_url.getPrizeDetail_api,
                    data: {
                        "prizeDetailId": prizeDetailId,
                    },
                    //async: false,
                    needDataEmpty: true,
                    contentTypeSearch: true,
                    callbackDone: function(json) {
                        var data = json.data;
                        console.log(JSON.stringify(json.data));
                        //获取需要的值
                        var firstliText = $this.siblings(".rewardName").html(),//奖励名称
                            startTime = $this.siblings(".rewardTime").attr("start-data"),//使用期限起始时间
                            endTime = $this.siblings(".rewardTime").attr("end-data"),//结束时间
                            memo = $this.attr("data-memo"),//奖品描述
                            createTime = $this.siblings(".rewardTime").attr("create-data");//奖励时间

                        //给html标签赋值
                        that.$e.firstli.html(firstliText);//奖励名称
                        that.$e.secondliNum.find("span").eq(1).html(data.prizeCode);//卡号
                        that.$e.secondliPwd.find("span").eq(1).html(data.prizeCodePwd);//密码
                        that.$e.thirdli.find("span").eq(0).html(startTime);//使用期限起始时间
                        that.$e.thirdli.find("span").eq(1).html(endTime);//结束时间
                        that.$e.fourli.find("p").eq(1).html(memo);//奖品描述
                        that.$e.fiveli.find("p").eq(1).html(createTime);//奖励时间

                        that.$e.tipBox.show();//弹层出现

                    },

                }];
                $.ajaxLoading(obj);

            },{
                'htmdEvt': 'rewards_01'
            });

            //返回上一页
            mui("body").on('tap', '.closeBtn', function() {
                that.$e.tipBox.hide();//弹层隐藏
            })

            alwaysAjax($(".recordList"),".rewardWrapper");

        },
    };
    reward.init();

});





