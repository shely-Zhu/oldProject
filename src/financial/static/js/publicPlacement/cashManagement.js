require('@pathCommonBase/base.js');
require('@pathCommonJsCom/tabScroll.js')
require('@pathCommonJs/ajaxLoading.js');
//黑色提示条
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
          json.data.pageList.forEach(function(item){
            if(Number(item.totalMoney) === 0){
              item.show = false
            }else{
              item.show = true
            }
          });
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
          $('.income .profitValue').html(json.incomeMask);
          $('.holdIncome .profitValue').html(json.holdIncomeMask);
          $('.addupIncome .profitValue').html(json.addupIncome);
        },
        callbackFail: function (json) {
          tipAction(json.msg);
        }
      }]
      $.ajaxLoading(obj1);

    },
    events: function () {
      var that = this;
      //调往现金宝详情
      mui("body").on("tap", ".cashItem .itemTitle", function () {
        var fundCode = $(this).attr("fundCode")
        window.location.href = site_url.superStreasureDetail_url + '?fundCode='+ fundCode ;
      }, {
				htmdEvt: 'cashManagement_01'
			});

      mui("body").on("tap", ".fundIn", function () {
        var fundCode = $(this).parent().parent().find(".itemTop .itemTitle span").eq(0).attr("fundCode")
        var fundName = $(this).parent().parent().find(".itemTop .itemTitle span").eq(0).attr("fundName")
        window.location.href = site_url.pofCashTransformIn_url + '?fundCode='+ fundCode + '&fundName=' + fundName;
      }, {
				htmdEvt: 'cashManagement_02'
			});
      mui("body").on("tap", ".fundOut", function () {
        var money = $($(this).parent().siblings()[1]).find(".centerValue").eq(0)[0].textContent;
        var productName = $(this).parent().parent().find(".itemTop .itemTitle span").eq(0)[0].innerHTML;
        var fundCode = $(this).parent().parent().find(".itemTop .itemTitle span").eq(0).attr("fundCode")
        var obj = {
          "money":money,
          "productName":productName,
          "fundCode":fundCode
        };
        sessionStorage.setItem("transformMessage",JSON.stringify(obj));
        window.location.href = site_url.pofCashTransformOut_url;
      }, {
				htmdEvt: 'cashManagement_03'
			});

      //了解现金管理
      mui("body").on("tap", ".fundKnow", function () {
       alert("跳转现金管理引导页")
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