/**
* 交易规则 
* @author zhangyanping 2019-11-25
*/

require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');

require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/headBarConfig.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js');
//获取地址栏参数
getQueryString = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return '';
}
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
          fundCode: getQueryString('fundCode')
        },
        callbackDone: function (json) {
          json = json.data
          var tplm = $("#dataLists").html();
          var template = Handlebars.compile(tplm);
          json.fundPurchaseFeeRate.detailList.forEach(n => {
            n.status = n.feeCalcMed === "2" ? 1 : 0
          });
          json.fundRedeemFeeRate.detailList.forEach(n => {
            n.status = n.feeCalcMed === "2" ? 1 : 0
          });
          json.tradeLimitList.forEach(n => {
            if (n.fundBusinCode === "022") {
              json.tradeLimitList = [n]
            }
          });
          var html = template(json);
          console.log(json);

          $(".tplBox").html(html);

        },
        callbackFail: function (json) {
          tipAction(json.msg);
        }
      }]
      $.ajaxLoading(obj);
    },
    events: function () {
      var that = this;

    },


  }
  /*调用*/
  regard.init()
})


