/*
 * @Author: your name
 * @Date: 2019-11-26 14:42:56
 * @LastEditTime: 2019-11-30 15:43:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htjf-app\src\financial\static\js\publicPlacement\demandFinancing.js
 */
require('@pathCommonBase/base.js');
require('@pathCommonJsCom/tabScroll.js')
require('@pathCommonJs/ajaxLoading.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function(){
     var regulatory = {
         gv:{
              list:[],
              fundDetailList:[],
              noData: $('.noData'), //没有数据的结构
              listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
         },
         $e:{
            cashListConList:$("#cashListConList"), //模板列
            cashListCon:$("#cashListCon"), //模板容器
            fundValue:$(".topCon .fundValue")
         },
         queryFundTransferAssets:function(){
             var that = this;
             var obj =[{
                 url:site_url.queryFundTransferAssets_api,
                 needDataEmpty:true,
                 callbackDone:function(json){
                     var data = json.data;
                     if(json.status == '0000'){
                        that.$e.fundValue.html(data.enableAssetsStr)
                        that.gv.list = data.list
                        that.gv.list.forEach(function(item){
                            item.currentAmountStr = item.currentAmount.toFixed(2);
                            item.currentShareStr = item.currentShare.toFixed(2);
                            item.enableShareStr = item.enableShare.toFixed(2);
                            that.newfundDetails(item)
                        });
                        $(".listLoading").hide()
                        generateTemplate(that.gv.list, that.$e.cashListCon, that.$e.cashListConList);
                     }
                   
                 }
             }];
             $.ajaxLoading(obj);
         },
         newfundDetails:function(item){
            var that = this;
            var obj =[{
                url:site_url.newfundDetails_api,
                data: {
					"fundCode":item.fundCode
                },
                async: false, //true-异步  false-同步
				needDataEmpty: true,
                callbackDone:function(json){
                    var data = json.data;
                    if(json.status == '0000'){
                        item.annYldRat = data.annYldRat + '%'
                        item.fundType = data.fundType
                        that.gv.fundDetailList.push(data)
                    }
                }
            }];
            $.ajaxLoading(obj);
         },
         getData: function (fundCode) {
            var that = this;
            var obj = [{ // 公募总资产
                url: site_url.pofTotalAssets_api,
                data: {
                    
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function (json) {
                    if (json.status == '0000'){
                         //跳往持仓列表页
                         json.data.fundDetailList.forEach(function(item) {
                             if(item.fundCode == fundCode){
                                sessionStorage.setItem("publicFundDetail",JSON.stringify(item)) 
                                window.location.href=site_url.optionalPublicDetail_url;
                             }
                         })
                    }
                },
                callbackFail: function (data) {
                    console.log('加载失败');
                }
            }];
            $.ajaxLoading(obj);
        },
         webinit: function () {
            var that = this;
            $(".listLoading").show()
            that.queryFundTransferAssets()
            that.event()
         },
         event:function(){
            var that = this;
			mui("body").on('mdClick','.cashItem',function(e){
                var data = $(this).attr('data')
                var index = $(this).index();
                if(Number(data) > 0){
                    that.getData($(this).attr('fundCode'))
                }else{
                    //跳往基金详情页
                    window.location.href = site_url.pofPublicDetail_url + 
                    '?fundCode=' + $(this).attr('fundCode') + '&fundType=' + $(this).attr('fundType') + '&deviceId=' + splitUrl['deviceId']
                }
			}, {
				htmdEvt: 'demandFinancing_01'
			}) ;

         }
     }
     //调用函数
	regulatory.webinit();


})