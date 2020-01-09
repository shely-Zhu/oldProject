/*
 * 我的奖励
 * @author zhangyanping 2019-11-12
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');

require('@pathCommonCom/pullRefresh/pullRefresh.js');

$(function() {

    var reward = {
        $e: {
            adjustmentRecord: $('.adjustmentRecord'), // 调仓记录
            recordList: $('.recordList'), // 调仓记录
            rewardTemp: $('#reward-template'), // 最新调仓模板
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //
            closeBtn: $('.closeBtn'), //关闭按钮
            tipBox: $('.tipBox'), //弹层
            viewDetails: $('.viewDetails'), //查看详情按钮
            firstli: $('.firstli'),
            secondli: $('.secondli'),
            thirdli: $('.thirdli'),
            fourli: $('.fourli'),
            fiveli: $('.fiveli'),
            secondliNum: $('.secondliNum'),
            secondliPwd: $('.secondliPwd'),

        },
        gV: { // 全局变量

            pageCurrent: 1, //当前页码，默认为1
            pageSize: 10,
            listLength: 0,
        },
        init: function() {
            var that = this;
            that.initMui(".list", ".contentWrapper");
            that.events();
        },
        dealTime: function(data) {
            $.each(data, function(a, b) {
                if (b.articleTimeStr && b.articleTimeStr != '') {
                    b.articleTimeStr = b.articleTimeStr.split(" ")[0].split("-")[1] + "." + b.articleTimeStr.split(" ")[0].split("-")[2]
                } else {
                    b.articleTimeStr = ""
                }
            })
            return data;
        },
        //初始化mui的上拉加载
        initMui: function(listClassName, wrapperName) {
            var that = this;
            that.gV.wrapperName = wrapperName;

            var height = windowHeight - $(".HeadBarConfigBox").height();

            if (!$(listClassName).hasClass('setHeight')) {

                $(listClassName).height(height).addClass('setHeight');
            }

            $.pullRefresh({
                wrapper: $('.list'),
                class: 'recordList',
                template: that.$e.rewardTemp,
                callback: function(def, t) {
                    var obj = [{
                        url: site_url.getPrizeInfo_api,
                        contentTypeSearch: true,
                        data: {
                            "pageNum": that.gV.pageCurrent,
                            "pageSize": that.gV.pageSize
                        },
                        needDataEmpty: true,
                        needLoading: false,
                        callbackDone: function(json) {
                            var data = json.data.list;
                            if (that.gV.pageCurrent == 1 && data.length == 0) {
                                $(".list").css("display", "none");
                                $('.without.noData').show();
                                // $('.contentHeader').hide();
                            } else {
                                $(".contentHeader").show()
                                $.each(json.data.list, function(i, el) {

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

                                if (data.list && data.list.length) {
                                    data = that.dealTime(data.list);
                                }

                                // 页面++
                                that.gV.pageCurrent++;

                                def && def.resolve(data, that.gV.pageCurrent);
                            }

                        },
                        callbackNoData: function(json) {
                            if (that.gV.pageCurrent == 1) {
                                $(".list").css("display", "none")
                            }

                            def && def.reject(json, that.gV.pageCurrent);
                        },
                        callbackFail: function(json) {

                            def && def.reject(json, that.gV.pageCurrent);
                        },
                    }];
                    $.ajaxLoading(obj);
                }
            })
        },

        events: function() {
            var that = this;

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
                        var firstliText = $this.siblings(".rewardName").html(), //奖励名称
                            startTime = $this.siblings(".rewardTime").attr("start-data"), //使用期限起始时间
                            endTime = $this.siblings(".rewardTime").attr("end-data"), //结束时间
                            memo = $this.attr("data-memo"), //奖品描述
                            createTime = $this.siblings(".rewardTime").attr("create-data"); //奖励时间

                        //给html标签赋值
                        that.$e.firstli.html(firstliText); //奖励名称
                        that.$e.secondliNum.find("span").eq(1).html(data.prizeCode); //卡号
                        that.$e.secondliPwd.find("span").eq(1).html(data.prizeCodePwd); //密码
                        that.$e.thirdli.find("span").eq(0).html(startTime); //使用期限起始时间
                        that.$e.thirdli.find("span").eq(1).html(endTime); //结束时间
                        that.$e.fourli.find("p").eq(1).html(memo); //奖品描述
                        that.$e.fiveli.find("p").eq(1).html(createTime); //奖励时间

                        that.$e.tipBox.show(); //弹层出现

                    },

                }];
                $.ajaxLoading(obj);

            }, {
                'htmdEvt': 'rewards_01'
            });

            //返回上一页
            mui("body").on('tap', '.closeBtn', function() {
                that.$e.tipBox.hide(); //弹层隐藏
            })
        }
    };
    reward.init();

});