/*
 * @page:产品档案
 * @Author: wangjiajia
 * chentiancheng
 * 2020年1月11日21:02:34
 */
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');

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
      that.event();
      that.getData();
    },
    getData: function (t) {
      var that = this;
      var obj = [{
        url: site_url.prfFundManagerInfo_api,
        data: {
          fundCode: splitUrl['fundCode']
          // fundCode:"000847"
        },
        callbackDone: function (json) {

          json = json.data.pageList;
          console.log(json);

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
  somePage.init();
})