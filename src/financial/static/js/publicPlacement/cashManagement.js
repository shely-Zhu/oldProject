require('@pathCommonBase/base.js');
require('@pathCommonJsCom/tabScroll.js')
require('@pathCommonJs/ajaxLoading.js');
//黑色提示条
var authenticationProcess = require('@pathCommonJs/components/authenticationProcess.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js');

$(function () {

  var regard = {
    gV: {
      idnoCheckflagArr: ['未认证', '已认证'],//是否实名认证 0-否 1-是 
      isRiskEndureArr: ['未风测', '已风测'],//是否风险测评 0-否 1-是    endurePubIsold 公募风险评测是否过期 0-否 1-是
      isPerfectArr: ['未完善', '已完善'],//是否完善个人信息 0-否 1-是 
      accreditedInvestorArr: ['未通过', '已通过', '已过期', '未做'],//是否合格投资者 空-未做； 0-未通过；1-已通过； 2-已过期 
      tipStatus: false,
  },
    init: function () {
      var that = this;

      //页面初始化
      $('.tips').hide()
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
     // 获取认证信息
    getUserInfo: function (fundCode,fundName) {
      var that = this;
      // 请求页面数据
      var obj = [{
          url: site_url.user_api,
          data: {
          },
          callbackDone: function (json) {
              json = json.data
              json.isRiskEndure = (json.isRiskEndure === 1 && json.endurePubIsold === 0) ? 1 : 0 //已经风险测评且没有过期 才展示已风测
              if (json.idnoCheckflag) {
                  $($('.tips .tips-li')[0]).hide()
              } else {
                  $($('.tips .bank-status')[0]).text(that.gV.idnoCheckflagArr[json.idnoCheckflag])
              }
              if (json.isRiskEndure) {
                  $($('.tips .tips-li')[1]).hide()
              } else {
                  $($('.tips .bank-status')[1]).text(that.gV.isRiskEndureArr[json.isRiskEndure])
              }
              if (json.isPerfect) {
                  $($('.tips .tips-li')[2]).hide()
              } else {
                  $($('.tips .bank-status')[2]).text(that.gV.isPerfectArr[json.isPerfect])
              }
              if (json.accreditedInvestor) {
                  $($('.tips .tips-li')[3]).hide()
              } else {
                  $($('.tips .bank-status')[3]).text(json.accreditedInvestor ? that.gV.accreditedInvestorArr[json.accreditedInvestor] : '未做')
              }
              if (json.idnoCheckflag || json.isRiskEndure || json.isPerfect || json.accreditedInvestor) {
                 // $('.tips').show()
                  that.gV.tipStatus = true
                  window.location.href = site_url.pofCashTransformIn_url + '?fundCode='+ fundCode + '&fundName=' + fundName;
              } else {
                  that.gV.tipStatus = true
                  window.location.href = site_url.pofCashTransformIn_url + '?fundCode='+ fundCode + '&fundName=' + fundName;
              }

          },
          callbackFail: function (json) {
              tipAction(json.msg);
          }
      }]
      $.ajaxLoading(obj);
    },
    events: function () {
      var that = this;
      //调往现金宝详情
      mui("body").on("mdClick", ".cashItem .itemTitle", function () {
        var fundCode = $(this).attr("fundCode")
        window.location.href = site_url.superStreasureDetail_url + '?fundCode='+ fundCode ;
      }, {
				htmdEvt: 'cashManagement_01'
			});

      mui("body").on("mdClick", ".fundIn", function () {
        var fundCode = $(this).parent().parent().find(".itemTop .itemTitle span").eq(0).attr("fundCode")
        var fundName = $(this).parent().parent().find(".itemTop .itemTitle span").eq(0).attr("fundName")
        window.location.href = site_url.pofCashTransformIn_url + '?fundCode='+ fundCode + '&fundName=' + fundName;
        // that.getUserInfo(fundCode,fundName)  //暂时屏蔽
       
      }, {
				htmdEvt: 'cashManagement_02'
			});
      mui("body").on("mdClick", ".fundOut", function () {
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
      //认证
      mui("body").on('mdClick', ".tips .tips-li-right", function (e) {
        console.log($(this).attr('type'));
        var type = $(this).attr('type')
        switch (type) {
            case "1":
                window.location.href = site_url.realName_url
                break;

            case "2":
                window.location.href = site_url.realName_url
                break;

            case "3":
                window.location.href = site_url.realName_url
                break;

            case "4":
                window.location.href = site_url.realName_url
                break;

            default:
                break;
        }
    });
    //一键认证
    mui("body").on('mdClick', ".tips .tips-btn", function (e) {
        window.location.href = site_url.realName_url
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