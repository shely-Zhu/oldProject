/*
 * @page: 已确认交易、待确认交易
 * @Author: peicongcong
 * @Date:   2019-11-19
 * @Last Modified by:   
 * @description:
 */

require('@pathCommonBase/base.js');

//ajax调用
require('@pathCommonJs/ajaxLoading.js');

require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js');



//下拉加载更多
// require('@pathCommonJs/scrollFullPage.js');
// 切换

require('@pathCommonJsCom/goTopMui.js');

//黑色提示条的显示和隐藏
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var transcationTem = require('@pathCommonJsCom/account/transcationTem.js');

// var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

var alwaysAjax = require('@pathCommonJs/components/alwaysAjax.js');
// 按钮变量
var operationNoStr = '';
var operationNoList = '';
$(function() {
    var data = {
        getElements: {
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            transTemp: $('#trans-template'), //模板
            contentWrap: $('.contentWrapper li'), //内容区域
        },
        gV: { //一些设置
            aP: {
                pageNum: 1,
                pageSize: 10,
            },
            aThis: null,
            list_template: '', //列表的模板，生成后存放在这里
            listToTop: '', // 滑动区域距离顶部距离
            navToTop: '', // 滑动nav距离顶部距离
            type: 0, //是否确认
            businessType: $('.hopperCon li.active').attr('data'),
            isConfirm: splitUrl['type']
        },
        html: '', //存放生成的html
        init: function() { //初始化函数

            var that = this;
            //初始化第一屏区域的上拉加载
            that.initMui();
            // 如果是已确认交易展示筛选漏斗


            //事件监听
            that.events();
        },
        //初始化mui的上拉加载
        initMui: function() {
            console.log("参数值", splitUrl['type'])
            var that = this;
            var height = windowHeight - $(".topTitle").height();
            if (!$('.list').hasClass('setHeight')) {
                $('.list').height(height).addClass('setHeight');
                $('.warp').height(height);
            }
            //地址栏里confirmed代表已确认  toBeConfirmed代表待确认
            if (splitUrl['type'] == 'confirmed') {
                $('.hopper').show();
                $('#HeadBarpathName').attr("data", '已完成交易').html('已完成交易');
                that.gV.type = 1;
            } else if (splitUrl['type'] == 'toBeConfirmed') {
                $('.hopper').hide();
                $('#HeadBarpathName').attr("data", '待确认交易').html('待确认交易');
                that.gV.type = 0;
            }
            mui.init({
                pullRefresh: {
                    container: '.contentWrapper',
                    up: {
                        //auto: false,
                        contentrefresh: '拼命加载中',
                        contentnomore: '暂无更多内容', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: function() {
                            //执行ajax请求
                            that.gV.aThis = this;
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
                that.getElements.listLoading.show();
                //这一句初始化并第一次执行mui上拉加载的callback函数
                mui('.contentWrapper').pullRefresh().pullupLoading();
                //为$id添加hasPullUp  class
                $('.list').addClass('hasPullUp');
            });
        },
        getData: function(t, type) {
            var that = this;
            var obj = [{
                url: site_url.getTradeList_api,
                data: {
                    "pageNum": that.gV.aP.pageNum, //非必须，默认为1
                    "pageSize": "10", //非必须，默认为10
                    "isConfirm": that.gV.type,
                    "confirmType": that.gV.businessType,
                },
                needLoading: false,
                callbackDone: function(json) {
                    var data;
                    if (json.data.pageList && json.data.pageList.length == 0 && that.gV.aP.pageNum == 1) { // 没有记录不展示
                        $(".list").hide()
                        that.getElements.noData.show();
                        that.getElements.listLoading.hide();
                        return false;
                    } else {
                        data = json.data.pageList;
                    }
                    setTimeout(function() {
                        if (data.length < that.gV.aP.pageSize) {

                            if (that.gV.aP.pageNum == 1) { //第一页时
                                if (data.length == 0) {
                                    // 暂无数据显示
                                    that.getElements.noData.show();
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
                        that.gV.aP.pageNum++;
                        //去掉mui-pull-bottom-pocket的mui-hidden
                        $('.contentWrapper').find('.mui-pull-bottom-pocket').removeClass('mui-hidden');
                        // 将列表插入到页面上
                        that.initTemp(data, that.getElements.contentWrap, that.getElements.transTemp, type)
                    }, 300)
                },
                callbackNoData: function() {
                    if (that.gV.aP.pageNum == 1) {
                        that.getElements.noData.show();
                    }

                }

            }];
            $.ajaxLoading(obj);
        },
        events: function() { //绑定事件
            var that = this;
            alwaysAjax($('.contentWrapper'));
            mui("body").on('mdClick', '.hopper', function(e) {
                    $('.mask').show();
                    $('.hopperCon').show();

                }, {
                    'htmdEvt': 'tobeConfirmTransaction_0'
                })
                //点击筛选数据
            mui("body").on('mdClick', '.hopperCon li', function(e) {
                    $('.list').show();
                    that.getElements.noData.hide();
                    $(this).addClass('active').siblings('li').removeClass('active');
                    $('.mask').hide();
                    $('.hopperCon').hide();
                    that.gV.businessType = $(this).attr('data');
                    // 重置上拉加载
                    that.gV.aP.pageNum = 1;
                    that.getElements.contentWrap.html('');
                    //重新初始化
                    that.getData(that.gV.aThis);
                    $('.goTopBtn').hide();
                    $('.contentWrap')[0].style.webkitTransform = "translate3d(0px, 0px, 0px) translateZ(0px)";
                    $('.contentWrap')[0].style.webkitTransform = '2500ms';
                }, {
                    'htmdEvt': 'tobeConfirmTransaction_1'
                })
                // 点击遮罩隐藏
            mui("body").on('mdClick', '.mask', function(e) {
                $('.mask').hide();
                $('.hopperCon').hide();
            }, {
                'htmdEvt': 'tobeConfirmTransaction_2'
            })


            //取消受让、取消预约、取消转让
            mui("body").on('mdClick', '.cancelBtn', function(e) {
                    event.stopPropagation();
                    var type = $(this).attr('data-type');
                    var reserveId = $(this).attr('data-reserveid');
                    var proId = $(this).attr('data-projectid');
                    if (type == 'assign') { //转让
                        var obj = {
                            p: '<p>您确定要取消转让申请吗？</p>',
                            yesTxt: '确认',
                            celTxt: '取消',
                            hideCelButton: false,
                            zIndex: 100,
                            callback: function(t) {

                            }
                        };
                        $.elasticLayer(obj)


                    } else if (type == 'assignee') {
                        var obj = {
                            p: '<p>您确定要取消受让申请吗？</p>',
                            yesTxt: '确认',
                            celTxt: '取消',
                            hideCelButton: false,
                            zIndex: 100,
                            callback: function(t) {

                            },
                        };
                        $.elasticLayer(obj)
                    } else if (type == 'appointment') {
                        var obj = {
                            p: '<p>您确定要取消预约吗？</p>',
                            yesTxt: '确认',
                            celTxt: '取消',
                            hideCelButton: false,
                            zIndex: 100,
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
                                            // 重置上拉加载
                                            mui('.contentWrapper').pullRefresh().refresh(true);
                                            that.gV.aP.pageNum = 1;
                                            that.getElements.contentWrap.html('');
                                            //重新初始化
                                            that.getElements.listLoading.show();
                                            that.getData(that.gV.aThis);
                                            mui('.contentWrapper').pullRefresh().scrollTo(0, 0, 0);
                                        }
                                    },
                                    callbackNoData: function() {

                                    }

                                }];
                                $.ajaxLoading(obj);
                            },
                        };
                        $.elasticLayer(obj)
                    }


                }, {
                    'htmdEvt': 'tobeConfirmTransaction_3'
                })
                //点击状态文字出现弹框
            mui("body").on('mdClick', '.openTip', function(e) {
                    event.stopPropagation();
                    $('.mask').show();
                    var conText = $(this).siblings('.tipContent').html();
                    var obj = {
                        p: '<p>' + conText + '</p>',
                        yesTxt: '我明白了',
                        hideCelButton: true,
                        zIndex: 100,
                        callback: function(t) {

                        },
                    };
                    $.elasticLayer(obj);

                }, {
                    'htmdEvt': 'tobeConfirmTransaction_4'
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
                    if (type == 'toCertif') { //去合格投资者认证
                        if (isElec == 0) {
                            //非电子合同
                            window.location.href = site_url.notElecSecondStep_url + '?isQualified=' + isQualified + '&projectName=' + projectName+'&projectId=' + proId;
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
                        window.location.href = site_url.privatePlacementDetail_url + '?projectId=' + proId
                    } else if (type == 'toVideo') { //视频双录
                        window.location.href = site_url.realVideoTranscribe_url + '?type=toBeConfirmed';
                    } else if (type == 'reAppointment') { //重新预约

                    }

                }, {
                    'htmdEvt': 'tobeConfirmTransaction_5'
                })
                // 点击每一条进入详情
            mui("body").on('mdClick', '.transList', function(e) {
                var proId = $(this).attr('data-projectid');
                window.location.href = site_url.privatePlacementDetail_url + '?projectId=' + proId
            }, {
                'htmdEvt': 'tobeConfirmTransaction_6'
            })
        },
        initTemp:function(data, $ele, $id, type) {
            var that=this;
            var $ele = $ele || $('.contentWrap'),
                $id = $id || $('#trans-template');
            console.log("外页参数值", that.gV.isConfirm)
            if (that.gV.isConfirm == 'confirmed') {
                console.log(sessionStorage.getItem("isconfirm"))
                //window.sessionStorage.setItem('isconfirm', 1);
                sessionStorage.setItem("isconfirm", '1');
            } else if (that.gV.isConfirm == 'toBeConfirmed') {
                //window.sessionStorage.setItem('isconfirm', 0);
                console.log(sessionStorage.getItem("isconfirm"))
                sessionStorage.setItem("isconfirm", '0');
            }
            for (var i = 0; i < data.length; i++) {
                // 是否确认交易isConfirm 1-确认 0-未确认
                data[i].isConfirmTrans = (that.gV.isConfirm == 'confirmed') ? 1 : 0; //已确认
                data[i].notConfirmTrans = (that.gV.isConfirm == 'toBeConfirmed') ? 1 : 0; //未确认
                // 申购/认购
                data[i].businessType01 = (data[i].businessType == 0 || data[i].businessType == 1) ? 1 : 0;
                data[i].businessType0 = data[i].businessType == 0 && (data[i].leftTopStatus == 5) ? 1 : 0; //认购
                data[i].businessType1 = data[i].businessType == 1 && (data[i].leftTopStatus == 5) ? 1 : 0; //申购
                data[i].businessTypeSucc = data[i].leftTopStatus == 5 ? 1 : 0; //申购
                //待确认的预约

                // 按钮的字段
                operationNoStr = data[i].operationNo;
                if (operationNoStr) {
                    operationNoList = operationNoStr.split(',');
                }
                if (operationNoList && operationNoList.length > 0) {
                    for (var j = 0; j < operationNoList.length; j++) {
                        if (operationNoList[j] == '1') {
                            data[i].appointmentToAuthentication = true; //展示合格投资者认证
                        }
                        if (operationNoList[j] == '2') {
                            data[i].appointmentCancel = true; //展示取消预约按钮
                        }
                        if (operationNoList[j] == '3') {
                            data[i].reAppointment = true; //展示重新预约按钮
                        }
                        if (operationNoList[j] == '4' || operationNoList[j] == '9') {
                            data[i].appointmentToSign = true; //展示去签署合同
                        }
                        if (operationNoList[j] == '5' || operationNoList[j] == '10') {
                            data[i].appointmentToSee = true; //展示查看合同
                        }
                        if (operationNoList[j] == '8' || operationNoList[j] == '7' || operationNoList[j] == '12') {
                            data[i].appointmentToUpload = true; //展示上传汇款凭证
                        }
                        if (operationNoList[j] == '13') {
                            data[i].assignVideo = true; //展示视频双录按钮
                        }
                        if (operationNoList[j] == '21') {
                            data[i].assignCancel = true; //展示取消转让按钮
                        }
                        if (operationNoList[j] == '31') {
                            data[i].assigneeCancel = true; //展示取消受让按钮
                        }
                        if (operationNoList[j] == '22') {
                            data[i].assignObj = true; //展示选择受让方
                        }
                        if (operationNoList[j] == '23') {
                            data[i].assignToVideo = true; //展示转让视频双录按钮
                        }
                        if (operationNoList[j] == '32') {
                            data[i].assigneeToVideo = true; //展示受让视频双录按钮
                        }
                    }
                }


                data[i].appointmentSuccess = data[i].leftBottomStatus == 18 ? 1 : 0; //合同审核成功
                data[i].appointmentFailed = data[i].leftBottomStatus == 19 ? 1 : 0; //合同审核失败
                //赎回
                data[i].businessTypeRedeem = (data[i].businessType == 2) || (data[i].businessType == 9) || (data[i].businessType == 8) ? 1 : 0;
                //分红
                data[i].businessTypeBonus = data[i].businessType == 7 ? 1 : 0;
                //已完成的预约
                data[i].businessTypeOrder = (data[i].businessType == 0 || data[i].businessType == 1) && (data[i].leftTopStatus == '21' || data[i].leftTopStatus == '22' || data[i].leftTopStatus == '23') ? 1 : 0;
                //转让
                data[i].businessType3 = data[i].businessType == 3 ? 1 : 0;
                //受让
                data[i].businessType4 = data[i].businessType == 4 ? 1 : 0;
                //是否签约中 展示转受让双录状态
                data[i].signing = (data[i].assignSubStatus == '05') || (data[i].assigneeSubStatus == '03') ? 1 : 0;
                data[i].redeemDate = data[i].redeemDate?data[i].redeemDate:'--'

            }
            that.generateTemplate(data, $ele, $id, type);
            
    },
    generateTemplate:function(data, $ele, $id,clear) {
        // 模板
        var that = this,
            source = $id.html(),
            template = Handlebars.compile(source),
            html = template(data);
    
        if(clear){
            $ele.html(html);
        }else{
            $ele.append(html);
    
        }
    }
    };
    data.init();
});