/**
 * 我的定投_定投详情 js
 * @author 蔡文琦  2019-11-23
 */



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
//获取地址栏参数
getQueryString = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return '';
}
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
      var scheduledProtocolId = location
      //请求页面数据
      var obj = [{
        url: site_url.pofFixedDetail_api,
        data: {
          scheduledProtocolId: getQueryString('scheduledProtocolId')
        },
        callbackDone: function (json) {
          console.log(json);

          json = json.data
          $('.fundName').html(json.fundName);
          $('.balanceMask').html(json.balanceMask);
          $('.totalTradeTimes').html(json.totalTradeTimes);
          $('.totalCfmBalaMask').html(json.totalCfmBalaMask);
          $('.nextFixrequestDateMask').html(json.nextFixrequestDateMask);
          $('.fixedPeriodMask').html(json.fixedPeriodMask);
          $('.capitalModeDesc').html(json.capitalModeDesc);
          $('.bankName').html(json.bankName);
          $('.bankAccountMask').html(json.bankAccountMask);
          $('.signDate').html(json.signDateMask);
          $('.bankNo').html(json.bankNo);
          $('.bankThumbnailUrl').attr('src', json.bankThumbnailUrl);
          $('.totalCfmShareMask').html(json.totalCfmShareMask);
          $('.serviceCharge').html('含手续费' + json.serviceCharge + '元');
          var fixState, str
          switch (json.fixState) {
            case 'A':
              fixState = "进行中"
              str = '<div>终止</div> <div class="cen ">暂停</div> <div class="active ">修改</div>'
              break;

            case 'H':
              fixState = "已终止"
              str = ""
              break;

            case 'P':
              fixState = "暂停"
              str = '<div >终止</div> <div class="active ">续保</div>';
              break;
            case 'D':
              fixState = "删除"
              break;
            case 'F':
              fixState = "签约失败"
              break;

            default:
              break;
          }
          $('.fixState').html(fixState);
          $('.footer').html(str);
          var tplm = $("#dataLists").html();
          var template = Handlebars.compile(tplm);
          var tradeRecord = json.tradeRecord
          tradeRecord.forEach(n => {
            n.tradeTime = n.tradeTime.split(" ")[0]
            n.status = n.status === "1" ? 1 : 0
          });
          var html = template(tradeRecord);
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