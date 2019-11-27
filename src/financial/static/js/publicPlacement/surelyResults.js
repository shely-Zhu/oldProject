/**
* 定投结果 
* @author wangjiajia 2019-11-23
*/
require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
$(function () {
  var somePage = {
    $e: {

    },
    gV: { // 全局变量

    },
    init: function () {
      var that = this;
      that.event()
      that.getData()
    },
    getData: function () {
      var that = this;

      //请求页面数据
      var obj = [{
        url: site_url.pofCashDetail_api,
        data: {
          allotNo: 9
        },
        callbackDone: function (json) {
          console.log(json);

          // var tplm = $("#dataLists").html();
          // var template = Handlebars.compile(tplm);
          // var html = template(json.data.pageList);
          // $("#cashListCon").html(html);

        },
        callbackFail: function (json) {
          tipAction(json.msg);
        }
      }]
      $.ajaxLoading(obj);

    },
    event: function () {
      var a = 1;
      if (a == 2) {
        $(".resultTop").hide()
        $(".resultTopTwo").show()
        $(".changeNone").removeClass("changeNone")
      }
    }
  }
  somePage.init()
})