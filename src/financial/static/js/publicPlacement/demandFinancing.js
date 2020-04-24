/*
 * @Author: your name
 * @Date: 2019-11-26 14:42:56
 * @LastEditTime : 2019-12-26 15:15:18
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htjf-app\src\financial\static\js\publicPlacement\demandFinancing.js
 * updater chentiancheng
 * 2020年4月24日11:20:39
 * 删除fundType入参
 */
require('@pathCommonBase/base.js');
require('@pathCommonJsCom/tabScroll.js');
require('@pathCommonJs/ajaxLoading.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

// var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function(){
     var regulatory = {
         gv:{
              list:[],
              fundDetailList:[],
              noData: $('.noData'), //没有数据的结构
              listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
              newfundDetailsDataList:"",  //七日年化查询数据集合
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
                     var annYldRatDataList;
                     if(json.status == '0000'){
                        that.$e.fundValue.html(data.enableAssetsStr);
                        that.gv.list = data.list;
                        fundCodeList=[];
                        that.gv.list.forEach(function(item){
                            item.currentAmountStr = item.currentAmount.toFixed(2);
                            item.currentShareStr = item.currentShare.toFixed(2);
                            item.enableShareStr = item.enableShare.toFixed(2);
                            fundCodeList.push(item.fundCode);
                        });
                        if(fundCodeList.length>0){
                            that.newfundDetails(fundCodeList);
                        }
                        that.gv.list.forEach(function(item){
                            var _fundCode = item.fundCode;
                            that.gv.newfundDetailsDataList.forEach(function(itemlist){
                                   if(itemlist.trdCode == _fundCode){
                                      item.annYldRat = itemlist.annYldRat;
                                   }
                            })
                        })
                        $(".listLoading").hide()
                        generateTemplate(that.gv.list, that.$e.cashListCon, that.$e.cashListConList);
                     }
                   
                 }
             }];
             $.ajaxLoading(obj);
         },
         newfundDetails:function(itemList){
            var that = this;
            var obj =[{
                url:site_url.newfundDetailList_api,
                data:itemList,
                async: false, //true-异步  false-同步
				needDataEmpty: true,
                callbackDone:function(json){
                    var data = json.data;
                    if(json.status == '0000'){
                        that.gv.newfundDetailsDataList = json.data;
                    }
                }
            }];
            $.ajaxLoading(obj);
         },

        
         webinit: function () {
            var that = this;
            $(".listLoading").show();
            that.queryFundTransferAssets();
            that.event();
         },
         event:function(){
            var that = this;
			mui("body").on('mdClick','.cashItem',function(e){
                var data = $(this).attr('data');
                var cash = $(this).attr("cash");
                var index = $(this).index();
                if(cash == "false"){
                     //跳往基金详情页
                       window.location.href = site_url.pofPublicDetail_url + 
                      '?fundCode=' + $(this).attr('fundCode') + '&deviceId=' + splitUrl['deviceId'];
                }else if(cash == "true"){
                    //超宝详情
                    window.location.href=site_url.superStreasureDetail_url + '?fundCode=' + $(this).attr('fundCode');
                }
               // if(Number(data) > 0){
                 //   that.getData($(this).attr('fundCode'))
                //}else{
                    //跳往基金详情页
                  //  window.location.href = site_url.pofPublicDetail_url + 
                   // '?fundCode=' + $(this).attr('fundCode') + '&fundType=' + $(this).attr('fundType') + '&deviceId=' + splitUrl['deviceId']
               // }
			}, {
				htmdEvt: 'demandFinancing_01'
			}) ;

         }
     }
     //调用函数
	regulatory.webinit();


})