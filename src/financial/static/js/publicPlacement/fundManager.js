/*
 * @page:产品档案
 * @Author: wangjiajia
 */
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
//获取地址栏参数
getQueryString = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return '';
}
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
    getData: function (t) {
      var that = this;
      var obj = [{
        url: site_url.prfFundManagerInfo_api,
        data: {
          fundCode: getQueryString('fundCode')
        },
        callbackDone: function (json) {

          json = json.data.pageList
          console.log(json)

          var tplm = $("#dataLists").html();
          var template = Handlebars.compile(tplm);
          var html = template(json);
          $(".tplBox").html(html);

        },
      }];
      $.ajaxLoading(obj);
    },
    event: function () {

    }
  }
  somePage.init()
})