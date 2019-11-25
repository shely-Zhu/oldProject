/*
 * @page: 我的定投计划
 * @Author: liliang
 * @Date:   2019-11-23
 * @Last Modified by:   
 * @description:
 */
require('@pathCommonJsCom/utils.js');
//ajax调用
require('@pathCommonJs/ajaxLoading.js');
//zepto模块--callback
require('@pathIncludJs/vendor/zepto/callback.js');
//zepto模块--deferred
require('@pathIncludJs/vendor/zepto/deferred.js');
//路径配置文件
require('@pathIncludJs/vendor/config.js');
//下拉加载更多
// require('@pathCommonJs/scrollFullPage.js');
// 切换
require('@pathCommonJsCom/tabScroll.js');
require('@pathCommonJsCom/goTopMui.js');
require('@pathCommonJs/components/elasticLayer.js');
require('@pathCommonJs/components/elasticLayerTypeFive.js');
require('@pathCommonJs/components/headBarConfig.js');
//黑色提示条的显示和隐藏
var tipAction = require('@pathCommonJsCom/tipAction.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
$(function(){
    //url上参数
    var arg = splitUrl();
    var argType = arg['type'];
    var argId = arg['id']; //上一步带过来的资产配置id
    var empNo = arg['empNo'];
    var somePage = {
        $e: {},
        gV: {},
        data: {
            listTable1: {
                columns: [{
                        title: "资产分类",
                        key: "zcfl",
                        hasrowspan: true
                    },
                    {
                        title: "投资比例",
                        key: "tzbl",
                        hasrowspan: true
                    },
                    {
                        title: "投资金额（万元）",
                        key: "tzje",
                        hasrowspan: true
                    },
                    {
                        title: "资产类别",
                        key: "zclb",
                        hasrowspan: true
                    },
                    {
                        title: "产品类型",
                        key: "cplx",
                        hasrowspan: true
                    },
                    {
                        title: "产品类别",
                        key: "cplb",
                        hasrowspan: true
                    },
                    {
                        title: "配置比例",
                        key: "pzbl"
                    }
                ],
                dataList: [] //tbody具体数据
            },
            listTable2: {
                columns: [{
                        title: "资产分类",
                        key: "zcfl",
                        hasrowspan: true
                    },
                    {
                        title: "投资比例",
                        key: "tzbl",
                        hasrowspan: true
                    },
                    {
                        title: "投资金额（万美元）",
                        key: "tzje",
                        hasrowspan: true
                    },
                    {
                        title: "资产类别",
                        key: "zclb",
                        hasrowspan: true
                    },
                    {
                        title: "产品类型",
                        key: "cplx",
                        hasrowspan: true
                    },
                    {
                        title: "产品类别",
                        key: "cplb",
                        hasrowspan: true
                    },
                    {
                        title: "配置比例",
                        key: "pzbl"
                    }
                ],
                dataList: [] //tbody具体数据
            },
            columns: [], //表头原始参数
            columns2: [], //表头原始参数
            newArr: [
                []
            ], //表头
            newArr2: [
                []
            ], //表头
            maxHeight: 1, //表头总共占的行数
            maxHeight2: 1, //表头总共占的行数
            colKeyList: [], //所有的key
            colKeyList2: [], //所有的key
            dataList: [], //tbody具体数据
            dataList2: [], //tbody具体数据
            needRowSpan: [], //tbody需要跨行的key
            needRowSpan2: [], //tbody需要跨行的key
            span: {}, //所跨的行数
            span2: {}, //所跨的行数
            echartsData: {
                descArr: {
                    lifeTermDic: null, //生命周期
                    riskTypeDic: null, //风险偏好
                    assetClassifyDic: null, //资产分类
                    assetTypeDic: null, //资产类别
                },
                title: ""
            },

        },
        getElements: {
           
        },
        init: function() {
            var that = this;
            that.getData();
        },
        getData: function() {
            var that = this;
            var obj = [{
                url: site_url.protocolList_api,
                data: {
                    pageSize: 10,
                    pageCurrent:1
                    
                },
                needDataEmpty: true,
                needLoading: true,
                callbackDone: function(json) {
                    var jsonData = json.data;
                   
                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }];
            $.ajaxLoading(obj);
        },

      
    
        events: function() {}
    };
    somePage.init();
})