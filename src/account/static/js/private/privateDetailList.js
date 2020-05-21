//  私募交易详情-待确认交易，已确认交易
// @author peicongcong 2019-12-02
// update chentiancheng 2020-01-08 11:57 

require('@pathCommonBase/base.js');
require('@pathCommonJsCom/utils.js');
//ajax调用
require('@pathCommonJs/ajaxLoading.js');
//下拉加载更多
// require('@pathCommonJs/scrollFullPage.js');
// 切换
require('@pathCommonJsCom/tabScroll.js');
require('@pathCommonJsCom/goTopMui.js');
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js');

//黑色提示条的显示和隐藏
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var transcationTem = require('@pathCommonJsCom/account/transcationTem.js');
var alwaysAjax = require('@pathCommonJs/components/alwaysAjax.js');
var setCookie = require('@pathNewCommonJsCom/setCookie.js');
var privateAuthenticationProcess = require('@pathCommonCom/authenticationProcess/privateAuthenticationProcess.js');

$(function() {
    var data = {
        getElements: {
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
        },
        gV: { //一些设置
            navList: [ //导航
                { type: '待确认交易', num: '0' },
                { type: '已完成交易', num: '1' },
            ],
            aP: {
                pageCurrent: 1,
                pageSize: 10,
                fundCode: splitUrl['fundCode'],
                tradeNo: splitUrl['tradeNo'],
            },
            current_index: 0, //左右滑动区域的索引
            list_template: '', //列表的模板，生成后存放在这里
            ajaxArr: [], //存放每一个ajax请求的传参数据
            // 存放ajax请求地址  已持仓  待确认
            siteUrlArr: [site_url.getTradeList_api, site_url.getTradeList_api],
            listToTop: '', // 滑动区域距离顶部距离
            navToTop: '', // 滑动nav距离顶部距离
            navHeight: '', // nav高度
        },
        html: '', //存放生成的html
        init: function() { //初始化函数

            var that = this;


            //事件监听
            that.events();
            //拼模板，初始化左右滑动mui组件
            that.beforeFunc();

            //初始化第一屏区域的上拉加载
            that.initMui($('#scroll1'));
            setCookie('isconfirm', 0);
        },

        beforeFunc: function() { //拼模板，初始化左右滑动mui组件
            var that = this,
                contentArr = []; //传给tabScroll组件的contentList参数的数组

            // list内容模板
            var source = $('#trans-template').html(), //获取 整个模板的html
                template = Handlebars.compile(source), //转换成方法
                list_html = template(); //方法执行

            //将生成的模板内容存到that.list_template上
            that.gV.list_template = template;



            // 外容器优先加载
            var wrap_source = $('#first-template').html(),
                wrap_template = Handlebars.compile(wrap_source),
                wrap_html = wrap_template({ content: list_html }); //模板生成
            $.each(that.gV.navList, function(i, el) {

                that.gV.ajaxArr[i] = {
                    isConfirm: el.num, //请求类型
                    confirmType: null, //业务类型
                    pageNum: that.gV.aP.pageCurrent, //当前第几页(默认为1) 非必填项, 默认设置成第一页
                    pageSize: that.gV.aP.pageSize, //每页显示几条数据(默认10) 非必填项， 默认设置成20
                }
                contentArr.push({
                    id: i,
                    content: wrap_html
                })

            })

            var obj = {
                wrapper: $('.myAsset'), //存放整个组件的区域
                needNavAction: false,
                //needBlock: true,
                navList: that.gV.navList, //导航
                contentLength: that.gV.navList.length, //左右滑动的区域个数，即导航数组长度
                contentList: contentArr, //此时只有框架，实际列表内容还未请求
                callback: function(t) { //t返回的是 id 为 scroll1 / scroll2 这样的切换后当前区域中的节点
                    //data-scroll属性即当前左右切换区域的索引
                    var index = t.attr('data-scroll');

                    //展示隐藏筛选按钮
                    if (index == 1) {
                        //已确认
                        $('.hopper').show();
                        setCookie('isconfirm', 1);
                    } else {
                        $('.hopper').hide();
                        setCookie('isconfirm', 0);
                    }
                    //data-scroll属性即当前左右切换区域的索引
                    that.gV.current_index = index;

                    //判断当前区域是否已经初始化出来上拉加载
                    if (t.hasClass('hasPullUp')) {
                        //有这个class，表示已经初始化，不再执行下一步
                        //但需要重置html的overflow

                        //var index = $('#slider .tab-scroll-wrap .mui-active').index();

                        // if( $("#move_"+that.gV.current_index+" .noData").length ){
                        //     //已经暂无数据了
                        //     $('html').addClass('hidden');
                        // }
                        // else{
                        //     $('html').removeClass('hidden');
                        // }
                        return false;
                    }

                    //没有hasPullUp class，表示没有初始化，调用initMui，进行初始化
                    //并请求第一次数据
                    that.initMui(t);
                }
            }
            $.tabScroll(obj);

            //此时所有切换区域的内容都是空的
            //设置切换区域的高度
            //计算节点高度并设置
            if (!that.height) {

                that.gV.listToTop = document.getElementById('scroll1').getBoundingClientRect().top;
                that.gV.navToTop = document.getElementById('slider').getBoundingClientRect().top;
                that.gV.navHeight = that.gV.listToTop - that.gV.navToTop;
                that.htmlHeight = windowHeight - that.gV.listToTop;

                that.htmlHeight = windowHeight - $('.nav-wrapper').height();


                console.log('距顶部距离：' + that.gV.listToTop);

                //that.highHeight = windowHeight-that.gV.navHeight;

                // that.highHeight = $('html').height() - that.gV.listToTop;
                that.highHeight = windowHeight - that.gV.listToTop;
            }



            // 为实现滚动区域滚动到顶部，定位，添加遮罩层
            $('.scroll_mask').css('top', that.gV.listToTop);
        },

        initMui: function($id) { //$id   就是滑动区域的 id 节点
            var that = this;
            w = $id.attr('id'), //获取节点的 id
                s = '#' + w + ' .contentWrapper'; //id 拼接 查出content区域
            console.log('#' + w + ' .mui-table-view-cell')
            mui.init({
                pullRefresh: {
                    container: s,
                    up: {
                        contentrefresh: '拼命加载中',
                        contentnomore: '暂无更多内容', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: function() {
                            //执行ajax请求
                            that.getData($id, this, 'more');

                        }
                    }
                }
            });

            mui.ready(function() { //init后需要执行ready函数，才能够初始化出来

                //隐藏当前的加载中loading
                if (!$id.hasClass('hasPullUp')) {
                    $id.find('.mui-pull-bottom-pocket').addClass('mui-hidden'); //上拉显示更多
                }

                mui(".mui-slider").slider(); //就是左右切换 可以滑动的  初始化

                //显示loading
                that.getElements.listLoading.show();

                //这一句初始化并第一次执行mui上拉加载的callback函数
                mui(s).pullRefresh().pullupLoading();

                //为$id添加hasPullUp  class
                $($id).addClass('hasPullUp');



                // mui(s).pullRefresh().disablePullupToRefresh()
            });

            // mui('.mui-slider').slider().stopped = true;
        },
        getData: function($id, t) { // 获取产品数据的公用ajax方法;$id为各区域的 scroll+num id
            var that = this;
            //获取产品列表
            var obj = [{
                url: that.gV.siteUrlArr[that.gV.current_index], //调用第几个接口
                data: that.gV.ajaxArr[that.gV.current_index], //传调用参数
                needLogin: true,
                needLoading: false,
                callbackDone: function(json) {
                    console.log(json.data)
                    var jsonData = json.data.pageList,
                        pageList = jsonData;
                    if (!$.util.objIsEmpty(pageList)) {

                        jsonData.tobe = that.gV.current_index == 0 ? 0 : 1;

                        var list_html = that.gV.list_template(jsonData); //  把内容  放到  模板里
                        //设置这两参数，在initMui()中使用
                        //判断是否显示没有更多了等逻辑，以及插入新数据
                        that.listLength = pageList.length;
                        that.html = list_html;
                        //重设当前页码
                        if (!$.util.objIsEmpty(pageList)) {
                            //设置每个ajax传参数据中的当前页码
                            that.gV.ajaxArr[that.gV.current_index].pageNum++;
                        }
                    } else {
                        //没有数据
                        that.listLength = 0;
                        that.html = '';
                    }

                    //有数据
                    setTimeout(function() {
                        //that.listLength  是上面ajax 请求完数据  赋值的 长度 作为判断的依据
                        //that.gV.aP.pageSize  是  gV  里面设置的 
                        if (that.listLength < that.gV.aP.pageSize) {

                            if (that.gV.ajaxArr[that.gV.current_index].pageNum == 1) {
                                //第一页时
                                if (that.listLength == 0) {
                                    //没有数据
                                    $id.find('.mui-scroll .mui-table-view-cell').html(that.getElements.noData.clone(false)).addClass('noCon');
                                    $id.find('.noData').show();

                                    //隐藏loading，调试接口时需要去掉
                                    setTimeout(function() {
                                        that.getElements.listLoading.hide();
                                    }, 100);
                                    t.endPullupToRefresh(true);

                                    //获取当前展示的tab的索引     
                                    var index = $('#slider .tab-scroll-wrap .mui-active').index(),
                                        $list = $("#move_" + index + " .list");
                                    $list.height(that.highHeight).addClass('noMove');
                                    // $list.addClass('noMove');

                                    // if( $("#move_"+index+" .noData").length ){
                                    //     //已经暂无数据了
                                    //     $('html').addClass('hidden');
                                    // }
                                    // else{
                                    //     $('html').removeClass('hidden');
                                    // }

                                    return false;
                                } else {
                                    //有数据，没有更多了
                                    t.endPullupToRefresh(true);
                                }
                            } else {
                                //其他页，没有更多了
                                t.endPullupToRefresh(true);
                            }
                        } else {
                            t.endPullupToRefresh(false);
                        }

                        $id.find('.contentWrapper .mui-pull-bottom-pocket').removeClass('mui-hidden');
                        if (that.gV.ajaxArr[that.gV.current_index].pageNum == 1) {
                            //第一屏
                            $id.find('.contentWrapper .mui-table-view-cell').html(that.html);
                        } else {
                            $id.find('.contentWrapper .mui-table-view-cell').append(that.html);
                        }

                        //获取当前展示的tab的索引
                        var index = $('#slider .tab-scroll-wrap .mui-active').index(),
                            $list = $("#move_" + index + " .list");
                        if (!$list.hasClass('setHeight')) {

                            //$('.list').each( function( i, el){

                            //判断当前ul高度
                            var ulHeight = $list.find(".mui-table-view").height();
                            if (ulHeight < that.htmlHeight) {

                                $list.height(that.highHeight).addClass('setHeight').addClass('noMove');
                                // $list.addClass('setHeight').addClass('noMove');
                            } else {
                                $list.height(that.highHeight).addClass('setHeight');
                                // $list.addClass('setHeight');
                            }

                            //})
                        }

                        //隐藏loading
                        setTimeout(function() {
                            that.getElements.listLoading.hide();
                        }, 100);
                        transcationTem(jsonData, $id.find('.list li'), $('#trans-template'));
                            //无缝滚动
                        alwaysAjax($id.find('.mui-table-view-cell'), $id.find(".contentWrapper"), 2);
                    }, 200)



                },
                callbackFail: function(json) {
                    //请求失败，
                    //隐藏loading
                    //that.getElements.listLoading.hide();
                    //显示错误提示
                    tipAction(json.message);

                    t.endPullupToRefresh(false);
                    $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');

                    //隐藏loading，调试接口时需要去掉
                    setTimeout(function() {
                        that.getElements.listLoading.hide();
                    }, 100);

                    //获取当前展示的tab的索引
                    // var index = $('#slider .tab-scroll-wrap .mui-active').index(),
                    //     $list = $("#move_"+index+" .list");

                    // $list.addClass('noMove');

                    //return false;
                },
                callbackNoData: function(json) {
                    t.endPullupToRefresh(false);

                    //没有数据
                    if (that.gV.ajaxArr[that.gV.current_index].pageNum == 1) {
                        $id.find('.mui-scroll .mui-table-view-cell').html(that.getElements.noData.clone(false)).addClass('noCon');
                        //$id.find('.mui-scroll .list').html(that.getElements.noData.clone(false)).addClass('noCon');
                        $id.find('.noData').show();
                    }

                    setTimeout(function() {
                        that.getElements.listLoading.hide();
                    }, 100);

                    //获取当前展示的tab的索引
                    var index = $('#slider .tab-scroll-wrap .mui-active').index(),
                        $list = $("#move_" + index + " .list");

                    $list.height(that.highHeight).addClass('noMove');


                    //如果是其他资产页面
                    //if( window.location.href.indexOf('/wealthResources/otherAssets/views/jjsAssets.html') != -1){

                    //获取当前展示的tab的索引
                    //var index = $('#slider .tab-scroll-wrap .mui-active').index();

                    // if( $("#move_"+index+" .noData").length ){
                    //     //已经暂无数据了
                    //     $('html').addClass('hidden');
                    // }
                    // else{
                    //     $('html').removeClass('hidden');
                    // }
                    //}
                }
            }]
            $.ajaxLoading(obj);
        },
        events: function() { //绑定事件
            var that = this;

            mui("body").on('mdClick', '.hopper', function(e) {
                    $('.mask').show();
                    $('.hopperCon').show();
                }, {
                    'htmdEvt': 'privateDetailList_0'
                })
                //点击筛选数据
            mui("body").on('mdClick', '.hopperCon li', function(e) {
                    $(this).addClass('active').siblings('li').removeClass('active');
                    $('.mask').hide();
                    $('.hopperCon').hide();

                    mui('#scroll2 .contentWrapper').pullRefresh().refresh(true);

                    // 重置上拉加载
                    that.gV.ajaxArr[1].pageNum = 1;
                    that.gV.ajaxArr[1].confirmType = $(this).attr('data');
                    // that.getElements.contentWrap.html('');
                    $('#scroll2 .contentWrapper li').html('');
                    //重新初始化
                    that.initMui($('#scroll2'));
                    // 初始化加载提示内容
                    $(".mui-pull>.mui-pull-loading").removeClass('mui-hidden');
                $(".mui-pull>.mui-pull-caption").removeClass('mui-pull-caption-nomore').addClass('mui-pull-caption-refresh').html("拼命加载中");
                    mui('#scroll2 .contentWrapper').pullRefresh().scrollTo(0, 0, 0);
                }, {
                    'htmdEvt': 'privateDetailList_1'
                })
                // 点击遮罩隐藏
            mui("body").on('mdClick', '.mask', function(e) {
                    $('.mask').hide();
                    $('.hopperCon').hide();
                }, {
                    'htmdEvt': 'privateDetailList_2'
                })
                //取消受让、取消预约、取消转让
            mui("body").on('mdClick', '.cancelBtn', function(e) {
                    event.stopPropagation();
                    var cancelBtn = $(this);
                    var type = $(this).attr('data-type');
                    var id = $(this).attr('data-id');
                    var reserveId = $(this).attr('data-reserveid');
                    var proId = $(this).attr('data-projectid');
                    if (type == 'assign') { //转让
                        var obj = {
                            p: '<p>您确定要取消转让申请吗？</p>',
                            yesTxt: '确认',
                            celTxt: '取消',
                            hideCelButton: false,
                            zIndex: 100,
                            yesButtonPosition: 'left',
                            htmdEvtYes: 'privateDetailList_8',
                            htmdEvtCel: 'privateDetailList_9',
                            callback: function(t) {

                            },
                        };
                        $.elasticLayer(obj);

                        // that.openTipCon('assign', '您确定要取消转让申请吗？', id);

                    } else if (type == 'assignee') {
                        var obj = {
                            p: '<p>您确定要取消受让申请吗？</p>',
                            yesTxt: '确认',
                            celTxt: '取消',
                            hideCelButton: false,
                            zIndex: 100,
                            htmdEvtYes: 'privateDetailList_10',
                            htmdEvtCel: 'privateDetailList_11',
                            callback: function(t) {

                            },
                        };
                        $.elasticLayer(obj);
                    } else if (type == 'appointment') {
                        var obj = {
                            p: '<p>您确定要取消预约吗？</p>',
                            yesTxt: '确认',
                            celTxt: '取消',
                            hideCelButton: false,
                            zIndex: 100,
                            htmdEvtYes: 'privateDetailList_12',
                            htmdEvtCel: 'privateDetailList_13',
                            callback: function(t) {
                                var obj = [{
                                    url: site_url.fundReserveCancel_api,
                                    contentTypeSearch: true,
                                    data: {
                                        "projectId": proId,
                                        "reserveId": reserveId,
                                    },
                                    callbackDone: function(json) {
                                        var data;
                                        if (json.status == '0000') {
                                            // 取消预约成功后删除该条交易
                                            cancelBtn.parent().parent().remove();
                                        }
                                    },
                                    callbackNoData: function() {

                                    }

                                }];
                                $.ajaxLoading(obj);
                            },
                        };
                        $.elasticLayer(obj);
                    }


                }, {
                    'htmdEvt': 'privateDetailList_3'
                })
                //点击状态文字出现弹框
            mui("body").on('mdClick', '.openTip', function(e) {
                    event.stopPropagation();
                    $('#tipConOne').show();
                    var conText = $(this).siblings('.tipContent').html();
                    var obj = {
                        p: '<p>' + conText + '</p>',
                        yesTxt: '我明白了',
                        hideCelButton: true,
                        zIndex: 100,
                        htmdEvtYes: 'privateDetailList_14',
                        callback: function(t) {

                        },
                    };
                    $.elasticLayer(obj);

                }, {
                    'htmdEvt': 'privateDetailList_5'
                })
                //功能按钮
            var clickEvent = '';
            mui("body").on('mdClick', '.toDetail', function(e) {
                    event.stopPropagation();
                    var type = $(this).attr('type'); //按钮类型
                    var reserveId = $(this).attr('data-reserveid'); //预约id
                    var proId = $(this).attr('data-projectid'); //项目id
                    var isElec = $(this).attr('data-type'); //是否是电子合同
                    var isAllowAppend = $(this).attr('data-firstorappend'); //是否首次追加
                    var projectName = $(this).attr('data-projectname'); //项目名称
                    var isQualified = $(this).attr('data-isqualified'); //是否满足合格投资者
                    var isPubToPri = $(this).attr('data-ispubtopri'); //是否公转私
                    if(type == 'toConfirm') {
                        var params = {
                            type: 1,
                            projectId: proId,
                            isPubToPri: isPubToPri,
                            htmdEvt: "privateDetailList",
                            reserveId: reserveId,
                            projectName: projectName,
                            isAllowAppend: isAllowAppend,
                            isElecContract: isElec
                        }
                        privateAuthenticationProcess(params);
                    } else if (type == 'toCertif') { //去合格投资者认证
                        if (isElec == 0) {
                            //非电子合同
                            window.location.href = site_url.notElecSecondStep_url + '?isQualified=' + isQualified + '&projectName=' + projectName + '&projectId=' + proId;
                        } else if (isElec == 1) {
                            //电子合同跳转
                            window.location.href = site_url.elecSecondStep_url + '?reserveId=' + reserveId + '&projectId=' + proId + '&projectName=' + projectName + '&isAllowAppend=' + isAllowAppend + '&isPubToPri=' + isPubToPri;
                        }
                    } else if (type == 'toSign') { //去签合同
                        window.location.href = site_url.elecThirdStep_url + '?reserveId=' + reserveId + '&projectId=' + proId + '&projectName=' + projectName + '&isAllowAppend=' + isAllowAppend + '&isPubToPri=' + isPubToPri;
                    } else if (type == 'toSee') { //查看合同
                        window.location.href = site_url.seeSign_url + '?reserveId=' + reserveId;
                    } else if (type == 'toUploadM') { //去上传汇款凭证
                        window.location.href = site_url.elecFourthStep_url + '?reserveId=' + reserveId + '&projectId=' + proId + '&projectName=' + projectName + '&isAllowAppend=' + isAllowAppend + '&isPubToPri=' + isPubToPri;
                    } else if (type == 'toView') { //详情
                        window.location.href = site_url.privatePlacementDetail_url + '?projectId=' + proId;
                    } else if (type == 'toVideo') { //视频双录
                        // 视频双录 by zhubingshuai
                        var obj = [{
                            url: site_url.getCheckInterviewRisk, //调用第几个接口
                            data: {
                                projectId: proId, //活动类型
                            }, //传调用参数
                            needLogin: true,
                            needLoading: false,
                            callbackDone: function(json) {
                                if (json.status == '0000') {
                                    window.location.href = site_url.realVideoTranscribe_url + '?type=toBeConfirmed&projectId=' + proId + '&reserveId=' + reserveId;
                                }
                            },
                            callbackFail: function(json) {
                                var message = json.message, messageArr = [];                                
                                if (json.status == '4000') {
                                    if (message.indexOf('|') != -1) {
                                        messageArr = message.split("|")
                                        var obj = {
                                            title: messageArr[1], //如果不传，默认不显示标题
                                            p: '<p>' + messageArr[0] + '</p>',
                                            yesTxt: '我知道了',
                                            hideCelButton: true,
                                            zIndex: 100,
                                            htmdEvtYes: 'privateDetailList_10',
                                            callback: function(t) {},
                                        };
                                        $.elasticLayer(obj);
                                    }
                                }
                            },
                            callbackNoData: function(json) {}
                        }]
                        $.ajaxLoading(obj);
                    } else if (type == 'toDown') { //下载电子合同

                    } else if (type == 'reAppointment') { //重新预约

                    }


                }, {
                    'htmdEvt': 'privateDetailList_6'
                })
                // 点击每一条进入详情
            mui("body").on('mdClick', '.transList', function(e) {
                var proId = $(this).attr('data-projectid');
                window.location.href = site_url.privatePlacementDetail_url + '?projectId=' + proId;
            }, {
                'htmdEvt': 'privateDetailList_7'
            })
        }
    };
    data.init();
});