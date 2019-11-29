/**
 * 我的定投_定投详情 js
 * @author 蔡文琦  2019-11-23
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
var payPass = require('@pathCommonJsCom/payPassword.js');
//黑色提示条
var tipAction = require('@pathCommonJs/components/tipAction.js');
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


    },
    gV: {
      json: {},
      copyJson: {} //复制一份值做暂停和终止续投
    },
    getData: function () {

      var that = this;
      var scheduledProtocolId = getQueryString('scheduledProtocolId')
      //请求页面数据
      var obj = [{
        url: site_url.pofFixedDetail_api,
        data: {
          scheduledProtocolId: scheduledProtocolId
        },
        callbackDone: function (json) {
          json = json.data
          that.gV.copyJson = JSON.parse(JSON.stringify(json))
          that.gV.copyJson.scheduledProtocolId = scheduledProtocolId
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
          fundCode = json.fundCode
          that.gV.json = json
          that.events();
          console.log(that.gV.json);
          var fixState, str
          switch (json.fixState) {
            case 'A':
              fixState = "进行中"
              str = '<div class="stop ">终止</div> <div class="cen pause">暂停</div> <div class="active edit ">修改</div>'
              break;

            case 'H':
              fixState = "已终止"
              str = ""
              break;

            case 'P':
              fixState = "暂停"
              str = '<div class="stop  >终止</div> <div class="active goBuy">续保</div>';
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
          json.tradeRecordStutas = tradeRecord.length > 0 ? 1 : 0
          tradeRecord.forEach(n => {
            n.tradeTime = n.tradeTime.split(" ")[0]
            n.status = n.status === "1" ? 1 : 0
          });
          var html = template(json);
          $(".tplBox").html(html);

        },
        callbackFail: function (json) {
          tipAction(json.msg);
        }
      }]
      $.ajaxLoading(obj);
    },
    changeStatus: function (pwd) {

      var that = this;
      that.gV.copyJson.fixState = "P"
      that.gV.copyJson.password = pwd
      //请求页面数据
      var obj = [{
        url: site_url.pofFixedChange_api,
        data: that.gV.copyJson,
        callbackDone: function (json) {
          tipAction(json.message);
          $("#passwordWrap").hide()
          $("#passwordWrap input").val("");
          
        },
        callbackFail: function (json) {
          tipAction(json.message);
          $("#passwordWrap").hide()
          $("#passwordWrap input").val("");
        }
      }]
      $.ajaxLoading(obj);
    },
    events: function () {
      var that = this;
      var fundType = that.gV.json.fundType
      // 详情
      mui("body").on("tap", ".posRight", function () {

        window.location.href = site_url.pofPublicDetail_url + '?fundCode=' + fundCode + '&fundType=' + fundType;
      });
      // 修改
      mui("body").on("tap", ".edit", function (e) {
        var scheduledProtocolId = getQueryString('scheduledProtocolId')
        window.location.href = site_url.pofOrdinarySetThrow_url + '?scheduledProtocolId=' + scheduledProtocolId + '&fundCode=' + fundCode;
      });
      // 终止
      mui("body").on("tap", ".stop", function (e) {
        $("#passwordWrap").show();
        payPass(function (pwd) {
          console.log(pwd);

          that.changeStatus(pwd)
        });
        return

        // var scheduledProtocolId = getQueryString('scheduledProtocolId')
        // window.location.href = site_url.pofOrdinarySetThrow_url + '?scheduledProtocolId=' + scheduledProtocolId + '&fundCode=' + fundCode;
      });
      // 暂停
      mui("body").on("tap", ".pause", function (e) {
        var scheduledProtocolId = getQueryString('scheduledProtocolId')
        window.location.href = site_url.pofOrdinarySetThrow_url + '?scheduledProtocolId=' + scheduledProtocolId + '&fundCode=' + fundCode;
      });
      // 续投
      mui("body").on("tap", ".goBuy", function (e) {
        var scheduledProtocolId = getQueryString('scheduledProtocolId')
        window.location.href = site_url.pofOrdinarySetThrow_url + '?scheduledProtocolId=' + scheduledProtocolId + '&fundCode=' + fundCode;
      });

    },


  }
  /*调用*/
  regard.init()
})


