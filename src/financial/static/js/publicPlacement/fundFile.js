require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
//var alwaysAjax = require('@pathCommonJs/components/alwaysAjax.js');
getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return '';
}
$(function () {
    var somePage = {
        //获取页面元素
        $e: {
            emptyBox: $('#emptyBox'), //没有数据默认显示区块
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            tplBox3Wrapper: $(".tplBox3Wrapper"),
            tplBox4Wrapper: $(".tplBox4Wrapper"),
            template3: $("#dataLists3"),
            template4: $("#dataLists4"),
        },
        //全局变量
        gV: {
            itemStyle1: {
                normal: {
                    color: {
                        colorStops: [{
                            offset: 0,
                            color: "#D8D8D8"
                        }, {
                            offset: 1,
                            color: "#D8D8D8"
                        }],
                        global: false,
                        type: "linear",
                        x: 0,
                        x2: 1,
                        y: 0,
                        y2: 1
                    }
                }
            },
            itemStyle2: {
                normal: {
                    color: {
                        colorStops: [{
                            offset: 0,
                            color: "#FBE2BD"
                        }, {
                            offset: 1,
                            color: "#D69549"
                        }],
                        global: false,
                        type: "linear",
                        x: 0,
                        x2: 1,
                        y: 0,
                        y2: 1
                    }
                }
            },
            pieData: [],
            pageCurrent3: 1,
            pageSize3: 10,
            pageCurrent4: 1,
            pageSize4: 10,
            tplBox3HasData: false,
            tplBox4HasData: false
        },
        //页面初始化函数
        init: function () {
            var that = this;
            that.events()
            that.$e.listLoading.show();
            that.getData()
            that.getData2()
            // that.getData3()
            // that.getData4()
        },
        initMui: function(type) {
            var that = this;
            var w = '.tplBox' + type
            var s = '.tplBox' + type + ' .contentWrapper'
            var height = windowHeight - $(".tabsBox").height() - $(".HeadBarConfigBox").height();
            if (!$('.tplBox'+type+' .list').hasClass('setHeight')) {
                $('.tplBox'+type+' .list').height(height).addClass('setHeight');
            }
            mui.init({
                pullRefresh: {
                    container: s,
                    up: {
                        contentrefresh: '拼命加载中',
                        contentnomore: '没有更多了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: function() {
                            //执行ajax请求
                            if(type == 3) {
                                that.getData3(this)
                            } else if (type == 4) {
                                that.getData4(this)
                            }
                        }
                    }
                }
            });
            //init后需要执行ready函数，才能够初始化出来
            mui.ready(function() {
                //隐藏当前的加载中loading
                if (!$('.tplBox'+type+' .list').hasClass('hasPullUp')) {
                    $('.tplBox'+type+' .list').find('.mui-pull-bottom-pocket').addClass('mui-hidden');
                }
                //显示loading
                that.$e.listLoading.show();
                //这一句初始化并第一次执行mui上拉加载的callback函数
                mui(s).pullRefresh().pullupLoading();
                //隐藏loading，调试接口时需要去掉
                //setTimeout(function(){
                that.$e.listLoading.hide();
                //}, 2000);
                //为$id添加hasPullUp  class
                $('.tplBox'+type+' .list').addClass('hasPullUp');
            });
        },
        drawCircle: function() {
            var that = this;
            var pieChart = echarts.init($('.circle')[0]);
            var optionData = []
            var pieData = that.gV.pieData
            pieData.forEach(function(n){
                optionData.push(n.name)
            })
            // 指定图表的配置项和数据
            option = {
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: optionData,
                    icon: "roundRect",
                    itemWidth: 10,  // 设置宽度
                    itemHeight: 10, // 设置高度
                    itemGap: 15,//设置间距
                    x: '60%',
                    y: '35%',
                    formatter: function (name) {
                        for (var i = 0; i < pieData.length; i++) {
                            if (name === pieData[i].name) {
                                return " {title|" + name + "}  {value|" + pieData[i].value + "%}"
                            }
                        }
                    },
                    textStyle: {
                        fontSize: 16,
                        rich: {
                            value: {
                                fontSize: 16,
                                fontWeight: 600
                            }
                        }
                    }
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['45%', '70%'],
                        center: ['30%', '47%'],
                        avoidLabelOverlap: false,
                        hoverAnimation: false,
                        label: {
                            normal: {
                                show: false, //去掉引导线
                                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                backgroundColor: '#eee',
                                borderColor: '#aaa',
                                borderWidth: 1,
                                borderRadius: 4,
                                rich: {
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 16,
                                        lineHeight: 33
                                    },
                                    per: {
                                        color: '#eee',
                                        backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: pieData
                    },
                    {
                        name: '',
                        type: 'pie',
                        hoverAnimation: false,
                        radius: ['40%', '46%'],
                        center: ['30%', '47%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },

                        data: pieData
                    }
                ]
            };
            // 绘制图表
            pieChart.setOption(option);
        },
        getData: function (t) {
            var that = this;
            var obj1 = [{ //基金基本概况查询
                url: site_url.prfFundBasicProfile_api,
                data: {
                    fundCode: splitUrl['fundCode'] ? splitUrl['fundCode'] : '000847'
                },
                callbackDone: function (json) {
                    json = json.data
                    that.$e.listLoading.hide();
                    var tplm = $("#dataLists1").html();
                    var template = Handlebars.compile(tplm);
                    json.assetValue = (json.assetValue / 100000000).toFixed(2)
                    var html = template(json);
                    $(".tplBox1").html(html);
                },
                callbackNoData:function(json){
                    that.$e.emptyBox.show();
                    that.$e.listLoading.hide();
                    $(".tplBox1").hide()
				},
				callbackFail:function(json){
                    that.$e.emptyBox.show();
                    that.$e.listLoading.hide();
                    $(".tplBox1").hide()
				},
            }];
            $.ajaxLoading(obj1);
        },
        getData2: function (t) {
            var that = this;
            var obj2 = [{ //基金投资组合信息查询
                url: site_url.prfFnvestmentPortfolio_api,
                data: {
                    fundCode: splitUrl['fundCode'] ? splitUrl['fundCode'] : '000847'
                },
                callbackDone: function (json) {

                    json = json.data
                    var pieData = []
                    json.assetAllocation.forEach(function(n, i){
                        var item
                        item = {
                            name: n.assetTypeName,
                            value: n.assetAllocationRatio,
                        }
                        if (i === 0) {
                            item = {
                                name: n.assetTypeName,
                                value: n.assetAllocationRatio,
                                itemStyle: that.gV.itemStyle1,
                            }
                        }
                        if (i === 1) {
                            item = {
                                name: n.assetTypeName,
                                value: n.assetAllocationRatio,
                                itemStyle: that.gV.itemStyle2,
                            }
                        }
                        pieData.push(item)
                        console.log(pieData)
                    })
                    that.gV.pieData = pieData;
                    that.gV.pieData.forEach(function (item,index) {
                        item.value = Number(item.value)
                    })

                    var tplm = $("#dataLists2").html();
                    var template = Handlebars.compile(tplm);
                    json.assetValue = (json.assetValue / 100000000).toFixed(2)
                    var html = template(json);
                    $(".tplBox2").html(html);
                },
                callbackNoData:function(json){
                    that.$e.emptyBox.show();
                    $(".tplBox2").hide()
				},
				callbackFail:function(json){
                    that.$e.emptyBox.show();
                    $(".tplBox2").hide()
				},
            }];
            $.ajaxLoading(obj2);
        },
        getData3: function (t) {
            var that = this;
            var obj3 = [{
                url: site_url.prfFundDividendList_api,
                data: {
                    fundCode: splitUrl['fundCode'],
                    pageCurrent: that.gV.pageCurrent3,
                    pageSize: that.gV.pageSize3
                },
                needLoading: false,
                callbackDone: function (json) {
                    var data = json.data.pageList || []
                    setTimeout(function() {
                        if (data.length < that.gV.pageSize3) {
                            if (that.gV.pageCurrent3 == 1) { //第一页时
                                if (data.length == 0) {
                                    // 暂无数据显示
                                    $(".tplBox3 list").hide()
                                    $('.tplBox3').html(that.$e.emptyBox.clone(false)).addClass('noCon');
                                    $('.tplBox3').find(".noData").show();
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
                        $('tplBox3 .list').find('.contentWrapper .mui-pull-bottom-pocket').removeClass('mui-hidden');
                        // 页面++
                        that.gV.pageCurrent3++;
                        // 将消息列表插入到页面上
                        generateTemplate(data, that.$e.tplBox3Wrapper, that.$e.template3);
                        that.alwaysAjax(that.$e.tplBox3Wrapper, $('.tplBox3 .contentWrapper'))
                    }, 200)
                    /*that.gV.tplBox3HasData = true
                    json = json.data.pageList
                    that.$e.listLoading.hide();
                    var tplm = $("#dataLists3").html();
                    var template = Handlebars.compile(tplm);
                    var html = template(json);
                    $(".tplBox3").html(html);*/
                },
                callbackNoData:function(json){
                    that.gV.tplBox3HasData = true
                    if(that.gV.pageCurrent3 == 1) {
                        $('.tplBox3').html(that.$e.emptyBox.clone(false)).addClass('noCon');
                        $('.tplBox3').find(".noData").show();
                        var height=$("body").height() - $(".HeadBarConfigBox").height() -  $(".tabsBox").height() -30
                        $('.tplBox3').height(height)
                        that.$e.listLoading.hide();
                        $(".tplBox3 .list").hide();
                        // $(".panel3").css("background", "none")
                    }
				},
				callbackFail:function(json){
                    that.gV.tplBox3HasData = true
                    if(that.gV.pageCurrent3 == 1) {
                        $('.tplBox3').html(that.$e.emptyBox.clone(false)).addClass('noCon');
                        $('.tplBox3').find(".noData").show();
                        that.$e.listLoading.hide();
                        $(".tplBox3 .list").hide()
                        // $(".panel3").css("background", "none")
                    }
				},
            }];
            $.ajaxLoading(obj3);
        },
        getData4: function (t) {
            var that = this;
            var obj4 = [{
                url: site_url.prfFundNoticeList_api,
                data: {
                    secuId: splitUrl['secuId'],
                    pageCurrent: that.gV.pageCurrent4,
                    pageSize: that.gV.pageSize4
                },
                needLoading: false,
                callbackDone: function (json) {
                    var data = json.data.pageList || []
                    setTimeout(function() {
                        if (data.length < that.gV.pageSize4) {
                            if (that.gV.pageCurrent4 == 1) { //第一页时
                                if (data.length == 0) {
                                    // 暂无数据显示
                                    $(".tplBox4 list").hide()
                                    $('.tplBox4').html(that.$e.emptyBox.clone(false)).addClass('noCon');
                                    $('.tplBox4').find(".noData").show();
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
                        $('tplBox4 .list').find('.contentWrapper .mui-pull-bottom-pocket').removeClass('mui-hidden');
                        // 页面++
                        that.gV.pageCurrent4++;
                        // 将消息列表插入到页面上
                        generateTemplate(data, that.$e.tplBox4Wrapper, that.$e.template4);
                        that.alwaysAjax(that.$e.tplBox4Wrapper, $('.tplBox4 .contentWrapper'))
                    }, 200)
                    /*that.gV.tplBox4HasData = true
                    json = json.data.pageList
                    that.$e.listLoading.hide();
                    var tplm = $("#dataLists4").html();
                    var template = Handlebars.compile(tplm);
                    var html = template(json);
                    $(".tplBox4").html(html);*/
                },
                callbackNoData:function(json){
                    that.gV.tplBox4HasData = true
                    if(that.gV.pageCurrent4 == 1) {
                        $('.tplBox4').html(that.$e.emptyBox.clone(false)).addClass('noCon');
                        $('.tplBox4').find(".noData").show();
                        that.$e.listLoading.hide();
                        $(".tplBox4 .list").hide()
                        $(".panel4").css("background", "none")
                    }
				},
				callbackFail:function(json){
                    that.gV.tplBox4HasData = true
                    if(that.gV.pageCurrent4 == 1) {
                        $('.tplBox4').html(that.$e.emptyBox.clone(false)).addClass('noCon');
                        $('.tplBox4').find(".noData").show();
                        that.$e.listLoading.hide();
                        $(".tplBox4 .list").hide();
                        $(".panel4").css("background", "none")
                    }
				},
            }];
            $.ajaxLoading(obj4);
        },
        alwaysAjax: function($el, pullupLoadingName) {
            if ( $el.length > 0) {
                $(document).scroll(function() {
                    // window.screen.height  屏幕高度
                    // $el.parent().parent().parent().height()     滚动容器高度
                    // $el.parent().height()    滚动内容高度
                    // Math.abs($el.offset().top-（window.screen.height - $el.parent().parent().parent().height()) // 滚动高度
                    // 滚动高度 + 滚动容器高度 = 滚动内容高度
                    var barTop = window.screen.height - $el.parent().parent().parent().height()
                    var scrollTop = Math.abs($el.offset().top-barTop)
                    var diff = $el.parent().height() - $el.parent().parent().parent().height() - scrollTop
                    // 当滚动距离距离最底部还剩500时，加载下一页
                    if(diff <= 500) { 
                        if( ! $el.find('.mui-pull-caption-nomore').length ){
                            if($el.parent().parent().parent().parent().hasClass("active")) {
                                mui(pullupLoadingName).pullRefresh().pullupLoading();
                            }
                        } 
                    } 
                });
            }
        },
        events: function () {
            var that = this;

            //tab点击切换
            mui("body").on('mdClick', '.tabs>li', function () {
                that.$e.emptyBox.hide();
                $(this).addClass('active').siblings().removeClass('active');
                $(".wrap>.panel").eq($(this).index()).addClass('active').siblings().removeClass('active');
                if ($(this).index() == 1) {
                    that.drawCircle()
                }
                if ($(this).index() == 2) {
                    if (that.gV.tplBox3HasData) {
                        return false;
                    } else {
                        that.initMui(3)   
                    }
                }
                if ($(this).index() == 3) {
                    if (that.gV.tplBox4HasData) {
                        return false;
                    } else {
                        that.initMui(4)   
                    }
                    //that.getData4()
                }
            }, {
				htmdEvt: 'fundFile_01'
			});
            //基金公告跳转
            mui("body").on('mdClick', '.tplBox4 .content', function () {
                var fileName=''
                var link = $(this).attr('linkRul')
                fileName=link.split("?")
                fileName=fileName[0].substring(fileName[0].lastIndexOf('.'))
                var typInfo = $(this).attr('typInfo')
				window.location.href = link + '&fileName=' + new Base64().encode(typInfo+fileName) 
            }, {
				htmdEvt: 'fundFile_02'
			})
        }
    };
    somePage.init();
});