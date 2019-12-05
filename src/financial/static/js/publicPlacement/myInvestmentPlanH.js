/*
 * @page: 我的定投计划
 * @Author: liliang
 * @Date:   2019-11-23
 * @Last Modified by:   
 * @description:
 */
require('@pathCommonBase/base.js');
//ajax调用
require('@pathCommonJs/ajaxLoading.js');
//下拉加载更多
// require('@pathCommonJs/scrollFullPage.js');
// 切换
require('@pathCommonJsCom/tabScroll.js');
require('@pathCommonJsCom/goTopMui.js');
require('@pathCommonJs/components/elasticLayer.js');
require('@pathCommonJs/components/elasticLayerTypeFive.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
$(function () {
    var somePage = {
        $e: {
            recordList: $('.contentWrap'), // 调仓记录
            investmentPlanTemp: $('#investmentPlan-template'), // 最新调仓模板
            listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构

        },
        gV: { // 全局变量
           dataList:[]
        },
        init: function () {
            var that = this;
            that.getData()
            that.events();
        },
      
        getData: function (t) {
            var that = this;
            $(".listLoading").hide();
            that.gV.dataList = JSON.parse(sessionStorage.getItem('stopList'));
            // 将列表插入到页面上
            generateTemplate(that.gV.dataList, that.$e.recordList, that.$e.investmentPlanTemp);
           
        },
        events: function () {
           
        },
    };
    somePage.init();

})