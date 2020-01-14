/**
* 交易规则 
* @author zhangyanping 2019-11-25
*/

require('@pathCommonBase/base.js');

require('@pathCommonJs/ajaxLoading.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

$(function () {
  var fundCode
  var regard = {

    init: function () {
      var that = this;

      //页面初始化
      that.getData();
      that.events();

    },
    getData: function () {

      var that = this;

      //请求页面数据
      var obj = [{
        url: site_url.newfundDetails_api,
        data: {
          fundCode: splitUrl['fundCode']
        },
        callbackDone: function (json) {
          json = json.data;
          var tplm = $("#dataLists").html();
          var template = Handlebars.compile(tplm);
          json.fundPurchaseFeeRate.detailList.forEach(function(n){
            n.status = n.feeCalcMed === "2" ? 1 : 0;
          });
          json.fundRedeemFeeRate.detailList.forEach(function(n){
            n.status = n.feeCalcMed === "2" ? 1 : 0;
          });
          json.tradeLimitList.forEach(function(n){
            if (n.fundBusinCode === "022") {
              json.tradeLimitList = [n];
            }
          });
          var html = template(json);
          console.log(json);

          $(".tplBox").html(html);

        },
        callbackFail: function (json) {
          tipAction(json.message);
        }
      }]
      $.ajaxLoading(obj);
    },
    events: function () {
      var that = this;

    },


  }
  /*调用*/
  regard.init();
})


