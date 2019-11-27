require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJsCom/tabScroll.js')
require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/headBarConfig.js');
//黑色提示条
var tipAction = require('@pathCommonJs/components/tipAction.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js');

$(function () {

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
        url: site_url.pofGetAssetsCashList_api,
        data: {
        },
        callbackDone: function (json) {
          var tplm = $("#dataLists").html();
          var template = Handlebars.compile(tplm);
          var html = template(json.data.pageList);
          $("#cashListCon").html(html);

        },
        callbackFail: function (json) {
          tipAction(json.msg);
        }
      }]
      $.ajaxLoading(obj);

      var obj1 = [{
        url: site_url.pofGetTotalAssetsCash_api,
        data: {
        },
        callbackDone: function (json) {
          json = json.data
          $('.fundValue').html(json.totalMoney);
          $('.profitValue').html(json.income);
          $('.profitValue').html(json.addupIncome);
        },
        callbackFail: function (json) {
          tipAction(json.msg);
        }
      }]
      $.ajaxLoading(obj1);

    },
    events: function () {
      var that = this;

      mui("body").on("tap", ".fundIn", function () {
        window.location.href = site_url.pofCashTransformIn_url;
      });
      mui("body").on("tap", ".fundOut", function () {
        window.location.href = site_url.pofCashTransformOut_url;
      });

      // // 跳转详情页
      // mui("body").on("tap", ".hd_to_detail", function (e) {
      //   var fundCode = $($(this).find('.lightColor')[0]).html();
      //   window.location.href = site_url.diagnosisDetail_url + '?fundCode=' + fundCode;
      // });

      // // 获取专属报告
      // mui("body").on("tap", ".btnBottom", function () {
      //   that.getReport();
      // });
    },

  }

  /*调用*/
  regard.init();

})