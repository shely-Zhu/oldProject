// 蔡文琦 2019-11-25 基金公司页面 js
/* 
update: chentiancheng  2020年1月11日21:00:56 
@非空判断

*/

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');



$(function () {
  var somePage = {
    $e: {
      noData: $('.noData'), //没有数据的结构
      listLoading: $('.listLoading'), //所有数据区域，第一次加载的loading结构
    },
    gV: { // 全局变量

    },
    init: function () {
      var that = this;
      that.event();
      that.getData();
    },
    getData: function (t) {
      var that = this;
      var obj = [{
        url: site_url.prfFundCompanyInfo_api,
        data: {
          fundComId: splitUrl['fundComId']
        },
        callbackDone: function (json) {

          json = json.data;
          console.log(json);
          var tplm = $("#dataLists").html();
          var template = Handlebars.compile(tplm);
          //对电话传真号码有多个做数据重构
          var faxNolist = [];
          var telephoneNoList = [];
          if(json.faxNo.split(",").length>1){
            for(var i = 0;i<json.faxNo.split(",").length;i++){
              var obj = {
                "faxNoListChild":json.faxNo.split(",")[i]
              }
              faxNolist.push(obj);
            }
          }else{
            faxNolist.push({"faxNoListChild":json.faxNo});
          }

          if(json.telephoneNo.split(",").length>1){
            for(var i = 0;i<json.telephoneNo.split(",").length;i++){
              var obj = {
                "telephoneNoListChild":json.telephoneNo.split(",")[i]
              }
              telephoneNoList.push(obj);
            }
          }else{
            telephoneNoList.push({"telephoneNoListChild":json.telephoneNo});
          }
          json.faxNolist = faxNolist;
          json.telephoneNoList = telephoneNoList;
          //判断当前股东列表无数据的情况时
          if(json.shareholderInfo.length==0){
            json.shareholderInfo={
              holdShares: "--",
              holdSharesRatio: "--",
              publishDate: "--",
              shareholderId: "--",
              shareholderName: "--"
            }
          }
          else{
            //有数据，但字段没有值时
            $.each( json.shareholderInfo, function(i, el){
               el.shareholderName = el.shareholderName ? el.shareholderName : '--';
               el.holdSharesRatio = el.holdSharesRatio ? el.holdSharesRatio : '--';
            })
          }
          //判断当前产品列表无数据的情况时
          if(json.scaleInfo.length==0){
            json.scaleInfo={
              fundCount: "--",
              fundNav: "--",
              fundTypeName: "--" 
            }
          }
          else{
            //有数据，但字段没有值时
            $.each( json.scaleInfo, function(i, el){
               el.fundTypeName = el.fundTypeName ? el.fundTypeName : '--';
               el.fundCount = el.fundCount ? el.fundCount : '--';
               el.fundNav = el.fundNav ? el.fundNav : '--';
            })
          }
          var html = template(json);
          $(".tplBox").html(html);

        },
        callbackNoData: function() {
          that.$e.noData.show();
        }
      }];
      $.ajaxLoading(obj);
    },
    event: function () {

    }
  }
  somePage.init();
})