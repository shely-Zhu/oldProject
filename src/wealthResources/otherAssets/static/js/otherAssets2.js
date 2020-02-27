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
            navList: [ //导航
                { type: '持有资产', num: '0' },
                { type: '待确认资产', num: '1' },
            ],
            aP: {
                pageNo: 1,
                pageSize: 10,
            },
            current_index: 1, //tab切换
            list_template: '', //列表的模板，生成后存放在这里
            ajaxArr: [], //存放每一个ajax请求的传参数据
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
            stateIcon: false,
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
            console.log(scrollTop, clientHeight, allHeight); 
            if (scrollTop + clientHeight > allHeight - 10) {
                console.log(111, that.gV.stateIcon);
                if( !that.gV.stateIcon ) {
                    that.gV.stateIcon = true;
                    document.getElementById('loadBox').style.display = 'block';
                    that.getListData();

                }
            }
        },
        getListData: function() { // 获取产品数据的公用ajax方法;
            var that = this;

            //获取产品列表
            var obj = [{
                url: that.gV.siteUrlArr[that.gV.current_index],
                data: that.gV.ajaxArr[that.gV.current_index],
                needLogin: true,
                needLoading: false,
                callbackDone: function(json) {
                    var jsonData = json.data,
                        pageList = jsonData.pageList;
                        
                    that.gV.stateIcon = false;
                    document.getElementById('loadBox').style.display = 'none';

                    if (!$.util.objIsEmpty(pageList)) {
                        // todo 判断是待确认还是已完成
                        jsonData.already = false;
                        jsonData.tobe = true;
                        debugger;
                        generateTemplate(jsonData, that.getElements.myAsset, that.getElements.listTemp);
                    } else {
                        //没有数据
                        
                    }
                },
                callbackFail: function(json) {
                    
                },
                callbackNoData: function(json) {

                    
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

           

            // 头部文案提示(金钱展示隐藏)
            mui("body").on('tap', '.j_icon', function(e) {
                data.gV.totalCount.html('****');
                data.gV.jAlready.html('****');
                data.gV.jTobe.html('****');
                $(this).addClass('eyecose');
            })
            mui("body").on('tap', '.eyecose', function(e) {
                data.gV.totalCount.html(data.gV.jjsTotalAssetMask);
                data.gV.jAlready.html('+' + data.gV.jjsHoldAssetMask);
                data.gV.jTobe.html(data.gV.jjsInTransitAssetMask);
                $(this).removeClass('eyecose');
            })
                //打开资产组成说明
            mui("body").on('tap', '.assetsBtn', function(e) {
                $('.mask').show();
                $('.tipContainer').show();
            })
                //关闭资产组成说明
            mui("body").on('tap', '.buttonOne', function(e) {
                $('.mask').hide();
                $('.tipContainer').hide();
            })
        }
    };
    data.init();
});