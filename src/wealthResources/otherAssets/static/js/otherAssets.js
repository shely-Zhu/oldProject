/*
 * @page: 其他资产(定融定投)
 * @Author: peicc
 * @Date:   2019-11
 * @Last Modified by:   songxiaoyu
 * @description:
 * 2019-9-10 待确认资产添加
 */
require('@pathNewCommonJsCom/utils.js');
//ajax调用
require('@pathNewCommonJs/ajaxLoading.js');
//zepto模块--callback
require('@pathNewIncludJs/vendor/zepto/callback.js');
//zepto模块--deferred
require('@pathNewIncludJs/vendor/zepto/deferred.js');
//路径配置文件
require('@pathNewIncludJs/vendor/config.js');
//下拉加载更多
// require('@pathNewCommonJs/scrollFullPage.js');
// 切换
require('@pathNewCommonJsCom/tabScroll.js');
require('@pathNewCommonJsCom/goTopMui.js');
require('@pathNewCommonJs/components/elasticLayer.js');
require('@pathNewCommonJs/components/elasticLayerTypeFive.js');
require('@pathNewCommonJs/components/headBarConfig.js');
//黑色提示条的显示和隐藏
var tipAction = require('@pathNewCommonJsCom/tipAction.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


$(function() {
    var data = {
        getElements: {
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
            myAsset:$('.myAsset'),
            listTemp: $('#second-template'), // 列表
        },
        gV: { //一些设置
            tabIndex: 0, //tab切换，请求接口设置
            firstTime:true, // 第一次切换
            isGetData:[true,true],// 是否可以请求接口，只有上拉显示更多才可以请求接口
            stateIcon: [false,false], // 上拉加载
            ajaxArr: [{
                pageNo: 1,
                pageSize: 10,
            },{
                pageNo: 1,
                pageSize: 10,
            }], //存放每一个ajax请求的传参数据
            // 存放ajax请求地址  已持仓  待确认
            siteUrlArr: [site_url.queryAssetsDetailByPages_api, site_url.getJJSInTransitAssets_api],
            listToTop: '', // 滑动区域距离顶部距离
            navToTop: '', // 滑动nav距离顶部距离
            navHeight: '', // nav高度
            totalCount: $(".totalM"), //总资产
            jAlready: $(".j_already"), //已持仓
            jTobe: $(".j_tobe"), //待确认
            jjsTotalAssetMask: null,
            jjsHoldAssetMask: null,
            jjsInTransitAssetMask: null,
            canClick: false // 待确认资产按钮是否可点击 true 可点击 false 不可点击
        },
        html: '', //存放生成的html
        init: function() { //初始化函数

            var that = this;

            that.getData();

            that.getListData();

            //事件监听
            that.events();
        },
        pullUpDown: function() { //上拉加载
            var that = this;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var clientHeight = document.documentElement.clientHeight;
            var allHeight = document.body.scrollHeight;
            // console.log(scrollTop, clientHeight, allHeight); 
            if ((scrollTop + clientHeight > allHeight - 100) && that.gV.isGetData[that.gV.tabIndex]) { // 
                if( !that.gV.stateIcon[that.gV.tabIndex]) {
                    that.gV.stateIcon[that.gV.tabIndex] = true;
                    // 上拉显示加载中样式
                    that.dealLoading(2)
                    that.getListData();
                }
            }
        },
        getListData: function() { // 获取产品数据的公用ajax方法;
            var that = this;

            //获取产品列表
            var obj = [{
                url: that.gV.siteUrlArr[that.gV.tabIndex],
                data: that.gV.ajaxArr[that.gV.tabIndex],
                needLogin: true,
                needLoading: false,
                callbackDone: function(json) {
                    that.gV.canClick = true
                    var jsonData = json.data,
                        pageList = jsonData.pageList,
                        ele = '';
                        
                    that.dealLoading(0)

                    if (!$.util.objIsEmpty(pageList)) { // 数据不为空
                        // 返回数据小于请求条数，则提示用户没有更多了，否则提示用户上拉加载数据
                        if(pageList.length < that.gV.ajaxArr[that.gV.tabIndex].pageSize) {
                            that.dealLoading(3)
                            that.gV.stateIcon[that.gV.tabIndex] = true;
                        } else {
                            that.dealLoading(1)
                            that.gV.stateIcon[that.gV.tabIndex] = false;
                        }
                        // todo 判断是待确认还是已完成,pageNo变化
                        jsonData.already = that.gV.tabIndex == 0 ? 1 : 0;
                        ele = that.getElements.myAsset.find('ul').eq(that.gV.tabIndex).find(".ulCon");
                        
                        generateTemplate(jsonData, ele, that.getElements.listTemp);

                        that.gV.ajaxArr[that.gV.tabIndex].pageNo++;
                        // 返回数据小于请求条数，则提示用户没有更多了，否则提示用户上拉加载数据
                        if(pageList.length < that.gV.ajaxArr[that.gV.tabIndex].pageSize) {
                            that.dealLoading(3)
                        } else {
                            that.dealLoading(1)
                        }
                    } else {
                        // 当第一页数据为空时，则显示暂无数据，否则提示用户没有更多了
                        if(that.gV.ajaxArr[that.gV.tabIndex].pageNo == 1) {
                            ele = that.getElements.myAsset.find('ul').eq(that.gV.tabIndex);
                            ele.html($(".noData").clone(false));
                            ele.find(".noData").eq(0).show()
                        } else {
                            that.dealLoading(3)
                        }
                    }
                },
                callbackFail: function(json) {
                    // 请求失败隐藏上拉加载提示语
                    that.dealLoading(0)
                    that.gV.canClick = true
                },
                callbackNoData: function(json) {
                    that.gV.canClick = true
                    // 当第一页数据为空时，则显示暂无数据，否则提示用户没有更多了
                    if(that.gV.ajaxArr[that.gV.tabIndex].pageNo == 1) {
                        var ele = that.getElements.myAsset.find('ul').eq(that.gV.tabIndex);
                        ele.html($(".noData").clone(false));
                        ele.find(".noData").eq(0).show()
                    } else {
                        that.dealLoading(3)
                    }
                }
            }]
            $.ajaxLoading(obj);
        },
        getData: function() {
            var that = this;
            var obj = [{
                url: site_url.getJJSAssets_api, //查询总资产 从中拿到jjs的资产
                data: {},
                callbackDone: function(json) {
                    //拿到jjs资产并填充界面
                    that.gV.jjsHoldAssetMask = json.data.jjsHoldAssetMask;
                    that.gV.jjsInTransitAssetMask = json.data.jjsInTransitAssetMask;
                    that.gV.jjsTotalAssetMask = json.data.jjsTotalAssetMask;
                    that.gV.totalCount.html(json.data.jjsTotalAssetMask);
                    that.gV.jAlready.html('+' + json.data.jjsHoldAssetMask);
                    that.gV.jTobe.html(json.data.jjsInTransitAssetMask);
                },
            }];
            $.ajaxLoading(obj);
        },
        dealLoading: function(type) { // type 0 隐藏提示语 1 上拉显示更多 2 拼命加载中 3 没有更多了
            var that = this;
            var ele = that.getElements.myAsset.find('ul').eq(that.gV.tabIndex);
            if(type == 0) {
                ele.find(".mui-pull-bottom-pocket").removeClass("mui-visibility") 
                ele.find(".mui-pull-loading").addClass("mui-hidden")
                ele.find(".mui-pull-caption").html("上拉显示更多")
                that.gV.isGetData[that.gV.tabIndex] = false;
            } else if (type == 1) {
                ele.find(".mui-pull-bottom-pocket").addClass("mui-visibility")
                ele.find(".mui-pull-loading").removeClass("mui-hidden").addClass("mui-visibility")
                ele.find(".mui-pull-caption").html("上拉显示更多")
                that.gV.isGetData[that.gV.tabIndex] = true; // 只用这种状态可以请求接口
            } else if (type == 2) {
                ele.find(".mui-pull-bottom-pocket").addClass("mui-visibility")
                ele.find(".mui-pull-loading").removeClass("mui-hidden").addClass("mui-visibility")
                ele.find(".mui-pull-caption").html("拼命加载中")
                that.gV.isGetData[that.gV.tabIndex] = false;
            } else if (type == 3) {
                ele.find(".mui-pull-bottom-pocket").addClass("mui-visibility")
                ele.find(".mui-pull-loading").addClass("mui-hidden")
                ele.find(".mui-pull-caption").html("没有更多了")
                that.gV.isGetData[that.gV.tabIndex] = false;
            }
        },
        events: function() { //绑定事件
            var that = this;

            // 监听滚动，定位tab栏
            document.addEventListener('scroll', function() {
                that.pullUpDown();
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if(scrollTop >= $('.banner').height() - $('#HeadBarConfigBox').height() ) {
                    $('#tabBox').addClass('fixed');
                } else {
                    $('#tabBox').removeClass('fixed');
                }
            })
            // tab栏
            mui("body").on('tap', '#tabBox .tabTag', function(e) {
                if(that.gV.canClick) {
                    $(this).addClass('active').siblings().removeClass('active');

                    // 切换时滑动到顶部
                    $(window).scrollTop(0);

                    // 显示隐藏
                    that.gV.tabIndex = Number($(this).attr('num'));
                    that.getElements.myAsset.find('ul').eq(that.gV.tabIndex).show().siblings().hide();

                    if(that.gV.firstTime){
                        that.dealLoading(2)
                        that.getListData();
                        that.gV.firstTime = false;
                    }
                }
            },{
                'htmdEvt': 'otherAssets_0'
            })

            // 头部文案提示(金钱展示隐藏)
            mui("body").on('tap', '.j_icon', function(e) {
                data.gV.totalCount.html('****');
                data.gV.jAlready.html('****');
                data.gV.jTobe.html('****');
                $(this).addClass('eyecose');
            },{
                'htmdEvt': 'otherAssets_1'
            })
            mui("body").on('tap', '.eyecose', function(e) {
                data.gV.totalCount.html(data.gV.jjsTotalAssetMask);
                data.gV.jAlready.html('+' + data.gV.jjsHoldAssetMask);
                data.gV.jTobe.html(data.gV.jjsInTransitAssetMask);
                $(this).removeClass('eyecose');
            },{
                'htmdEvt': 'otherAssets_2'
            })
                //打开资产组成说明
            mui("body").on('tap', '.assetsBtn', function(e) {
                $('.mask').show();
                $('.tipContainer').show();
            },{
                'htmdEvt': 'otherAssets_3'
            })
                //关闭资产组成说明
            mui("body").on('tap', '.buttonOne', function(e) {
                $('.mask').hide();
                $('.tipContainer').hide();
            },{
                'htmdEvt': 'otherAssets_4'
            })
            
        }
    };
    data.init();
});