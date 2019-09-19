/*
* @page: 标普资产模型
* @Author: songxiaoyu
* @Date:   2019-09-03 15:25:21
* @Last Modified by:   songxiaoyu
* @description:
*/


require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayer.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

$(function() {

    var somePage = {
        $e: {
        },
        gV: {
        },
         //元素获取
         getElements: {
            tip:$(".sp_tip"),//普标提示区域
            expense : $('#expense'), //四象限消费型资产显示区块
            expenseli:$('#expense ul li'),
            safeguard : $("#safeguard"),////四象限保障型资产显示区块
            safeguardli : $("#safeguard ul li"),////四象限保障型资产显示区块
            appreciation : $("#appreciation"),//四象限增值型资产显示区块
            appreciationli : $("#appreciation ul li"),//四象限增值型资产显示区块
            hedging : $("#hedging"),////四象限保值型资产显示区块
            hedgingli : $("#hedging ul li"),////四象限保值型资产显示区块
        }, 
        init: function() {
            var that = this;
            that.getData();
            that.events();
        },
        getData: function() {
            var that = this;
            var obj = [{
                url: site_url.standardPoor_api,
                data: {},
                needLoading: true,
                callbackDone: function(json) {
                    var jsonData = json.data;
                    var consumption={
                        name:'consumption',
                        el:that.getElements.expenseli,
                        data:jsonData.consumptionProportion
                    }
                    that.getElements.expense.find('.sp_four_item_present span:nth-child(2)').html(jsonData.consumptionProportion + '%')
                    that.getElements.expense.find('.sp_four_item_price').html(jsonData.consumptionAssets != '0.00' ? ('￥' + jsonData.consumptionAssets) : ('<span class="price">￥0.00</span>'))
                    if(consumption.data != '0' && consumption.data) {
                        that.methods.Accounted(consumption)
                    }else{
                        // that.getElements.expense.addClass("expense_noData")  此版本暂不处理标红
                    }
                    var guarantee={
                        name:'guarantee',
                        el:that.getElements.safeguardli,
                        data:jsonData.guaranteeProportion
                    }
                    that.getElements.safeguard.find('.sp_four_item_present span:nth-child(2)').html(jsonData.guaranteeProportion + '%')
                    that.getElements.safeguard.find('.sp_four_item_price').html(jsonData.guaranteeAssets != '0.00' ? ('￥' +  jsonData.guaranteeAssets) : ('<span class="price">￥0.00</span>') )
                    if(guarantee.data != '0' && guarantee.data){
                        that.methods.Accounted(guarantee)
                    }else{
                        // that.getElements.safeguard.addClass("safeguard_noData")
                    }
                    var valueAdded={
                        name:'valueAdded',
                        el:that.getElements.appreciationli,
                        data:jsonData.valueAddedProportion
                    }
                    that.getElements.appreciation.find('.sp_four_item_present span:nth-child(2)').html(jsonData.valueAddedProportion + '%')
                    that.getElements.appreciation.find('.sp_four_item_price').html(jsonData.valueAddedAssets != '0.00' ? ('￥' + jsonData.valueAddedAssets) : ('<span class="price">￥0.00</span>') )
                    if(valueAdded.data != '0' && valueAdded.data){
                        that.methods.Accounted(valueAdded)
                    }else {
                        // that.getElements.appreciation.addClass("appreciation_noData")
                    }
                    var valuePreserving={
                        name:'valuePreserving',
                        el:that.getElements.hedgingli,
                        data:jsonData.valuePreservingProportion
                    }
                    that.getElements.hedging.find('.sp_four_item_present span:nth-child(2)').html(jsonData.valuePreservingProportion + '%')
                    that.getElements.hedging.find('.sp_four_item_price').html(jsonData.valuePreservingAssets != '0.00' ? ('￥' + jsonData.valuePreservingAssets) : ('<span class="price">￥0.00</span>') )
                    if(valuePreserving.data != '0' && valuePreserving.data){
                        that.methods.Accounted(valuePreserving)
                    }else {
                        // that.getElements.appreciation.addClass("hedging_noData")
                    }

                },
                callbackFail: function(json) {
                    tipAction(json.msg);
                }
            }];
            $.ajaxLoading(obj);
        },
        methods: {
            Accounted : function (data){
                for(var i =0; i < data.el.length; i++){
                    if(i < Math.round((data.data/100).toFixed(2)*10) -1 || i == Math.round((data.data/100).toFixed(2)*10) -1){
                        data.el.eq(i).attr("class","active")
                    }
                }
            }
        },
        events: function() {
           var that=this;
           //关闭文案
           mui("body").on('tap', '.sp_tip i', function() {
                somePage.getElements.tip.hide()
           })

           //进入详情
           mui("body").on('tap', '#expense', function() {
            if($(this).has(".price").length) return;
            window.location.href = site_url.payThemeCash_url;
          })

          mui("body").on('tap', '#appreciation', function() {
            if($(this).has(".price").length) return;
            window.location.href = site_url.smMyAsset_url;
          })
          mui("body").on('tap', '#hedging', function() {
            if($(this).has(".price").length) return;
            window.location.href = site_url.smMyAsset_url;
          })

           //进入配置页面
           mui("body").on('tap', '.sp_allo_btn1', function() {
            window.location.href=site_url.assetAllocation_url
          })
           
           var obj = [{
            url: site_url.hasAssetReport_api,
            data: {},
            //async: false,
            // needLogin:true,
            needDataEmpty: true,
            callbackDone: function(json) {
                var jsonData = json.data;
                if(jsonData.hasAssetReport == '1'){
                    $('.sp_allo_btn1').show()
                }else {
                    $('.sp_allo_btn1').hide()
                }
            },
            callbackFail: function(json) {
                tipAction(json.msg);
            }
        }];
        $.ajaxLoading(obj);

        },
    };
    somePage.init();
});