require('@pathCommonBase/base.js');
require('@pathCommonJsCom/tabScroll.js')
require('@pathCommonJs/ajaxLoading.js');
//黑色提示条
var authenticationProcess = require('@pathCommonCom/authenticationProcess/authenticationProcess.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js');
var frozenAccount = require('@pathCommonJs/components/frozenAccount.js');

$(function () {

  var regard = {
    gV: {
      idnoCheckflagArr: ['未认证', '已认证'],//是否实名认证 0-否 1-是 
      isRiskEndureArr: ['未风测', '已风测'],//是否风险测评 0-否 1-是    endurePubIsold 公募风险评测是否过期 0-否 1-是
      isPerfectArr: ['未完善', '已完善'],//是否完善个人信息 0-否 1-是 
      accreditedInvestorArr: ['未通过', '已通过', '已过期', '未做'],//是否合格投资者 空-未做； 0-未通过；1-已通过； 2-已过期 
      accountType:null,   //客户类型  0-机构 1-个人
      transformInFundCode:"",  //转入基金编码
      transformInFundName:"",  //转入基金名称
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

        }
      }]
      $.ajaxLoading(obj);

      var obj1 = [{
        url: site_url.pofGetTotalAssetsCash_api,
        data: {
        },
        callbackDone: function (json) {
          json = json.data
          $('.fundValue').html(json.totalMoney==''?'0.00':json.totalMoney);
          $('.income .profitValue').html(json.incomeMask==""?"0.00":json.incomeMask);
          $('.holdIncome .profitValue').html(json.holdIncomeMask==""?"0.00":json.holdIncomeMask);
          $('.addupIncome .profitValue').html(json.addupIncome==''?'0.00':json.addupIncome);
        }
      }]
      $.ajaxLoading(obj1);

    },
    	 // 客户预约产品所需条件
		 getConditionsOfOrder: function(fundCode) {
      var type = type;
      var that = this;

      //发送ajax请求
      var obj = [{
          url: site_url.queryCustomerAuthInfo_api,
          data: {
              fundCode: fundCode,
          },
          //contentTypeSearch: true,
          //needLogin: true, //需要判断是否登陆
          callbackDone: function(json) { //成功后执行的函数
              var jsonData = json.data,
                  notice = "",
                  noticeObj = "",
                  isPopup = "", //弹框售前告知书
                  isRiskPopup = "", //期限不符弹框
                  PopupElasticLayer = "",
                  objElasticLayer = "", // 产品风险等级与个人承受能力匹配弹框
                  isReal = "", //是否实名认证，因为如果机构切一键认证是实名，点击需要提示弹框。
                  singleaAuthenPath = "", //一键认证跳转链接
                  singleaAuthen = false; //条件框是否展示
                    $(".isRiskMatchBox").show();
                    $(".isRiskMatch_mask").show();
                    if(jsonData.isRiskMatch == "1"){
                          //风险等级匹配
                          $(".isRiskMatchBox_match").show()
                          $(".isRiskMatchBox_noMatch").hide()
                          $(".isRiskMatchBox_header").html("你选择的产品与您现在的风险承受能力相匹配")
                      }else if(jsonData.isRiskMatch == "0"){
                          $(".isRiskMatchBox_noMatch").show()
                          $(".isRiskMatchBox_match").hide()
                          $(".isRiskMatchBox_header").html("你选择的产品与您现在的风险承受能力不相匹配")
                          $(".isRiskMatchResult").html("查看评测结果")
                          $(".isRiskMatchResult").attr("type","noRisk")
                      }else if(jsonData.isRiskMatch == "2"){
                          $(".isRiskMatchBox_noMatch").show()
                          $(".isRiskMatchBox_match").hide()
                          $(".isRiskMatchBox_header").html("您的风险测评已过期,请重新进行风险测评")
                          $(".isRiskMatchResult").html("重新风测")
                          $(".isRiskMatchResult").attr("type","repeatRisk")
                      }

          },
          callbackNoData:function(argument) {
              tipAction(json.message);
    that.data.canClick = true; //变为可点击
          }
      }];
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
      // 转入
      mui("body").on("mdClick", ".fundIn", function () {
        var fundCode = $(this).parent().parent().find(".itemTop .itemTitle span").eq(0).attr("fundCode")
        var fundName = $(this).parent().parent().find(".itemTop .itemTitle span").eq(0).attr("fundName")
        that.gV.transformInFundCode = fundCode;
        that.gV.transformInFundName = fundName;
        // 先判断是否司法冻结以及身份过期，再判断一键认证
        var result = frozenAccount("buyFreeze", window.location.href, false,'cashManagement_07');
        if( !result ) {
          var url = site_url.pofCashTransformIn_url + '?fundCode='+ fundCode + '&fundName=' + fundName;
          authenticationProcess(fundCode, url,'cashManagement')
        };
      }, {
				htmdEvt: 'cashManagement_02'
			});
      // 转出
      mui("body").on("mdClick", ".fundOut", function () {
        var money = $($(this).parent().siblings()[1]).find(".centerValue").eq(0)[0].textContent;
        var productName = $(this).parent().parent().find(".itemTop .itemTitle span").eq(0)[0].innerHTML;
        var fundCode = $(this).parent().parent().find(".itemTop .itemTitle span").eq(0).attr("fundCode")
        // 先判断是否司法冻结以及身份过期，再判断一键认证
        var result = frozenAccount("saleFreeze", window.location.href, false,'cashManagement_08');
        if( !result ) {
          window.location.href = site_url.pofCashTransformOut_url + '?fundCode=' + fundCode + '&productName=' + new Base64().encode(productName);
        };
      }, {
				htmdEvt: 'cashManagement_03'
			});

      //了解现金管理
      mui("body").on("mdClick", ".fundKnow", function () { 
       window.location.href  = site_url.articleTemplate_url + '?articleBelong=12'
      },{
        htmdEvt: 'cashManagement_04'
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
    },{
      htmdEvt: 'cashManagement_05'
    });
    //一键认证
    /*mui("body").on('mdClick', ".tips .tips-btn", function (e) {
        window.location.href = site_url.realName_url
    },{
      htmdEvt: 'cashManagement_06'
    });

    
            //风测等级匹配成功
         mui("body").on('mdClick',".isRiskMatchBox_match",function(){
              $(".isRiskMatch_mask").hide();
              $(".isRiskMatchBox").hide();
              window.location.href = site_url.pofCashTransformIn_url + '?fundCode='+ that.gV.transformInFundCode + '&fundName=' + that.gV.transformInFundName;
         },{
             htmdEvt: 'publicDetail_15'
         })

        //风险等级匹配失败
        mui("body").on("mdClick",".isRiskMatchBox_cancel",function(){
          $(".isRiskMatch_mask").hide();
          $(".isRiskMatchBox").hide();
         // that.gV.isRiskMatchBox.hide();
      },{
          htmdEvt: 'publicDetail_16'
      })

       //风险等级匹配失败结果跳转
      mui("body").on("mdClick",".isRiskMatchResult",function(){
          $(".isRiskMatch_mask").hide();
          $(".isRiskMatchBox").hide();
          var type = $(this).attr("type");
          if(type == "noRisk"){
              //未风测
              window.location.href = site_url.riskAppraisal_url + "?type=private"
          }else if(type == "repeatRisk"){
              //风测过期
              window.location.href = site_url.riskAppraisal_url + "?type=private"
          }
         
      })*/

      // // 跳转详情页
      // mui("body").on("tap", ".hd_to_detail", function (e) {
      //   var fundCode = $($(this).find('.lightColor')[0]).html();
      //   window.location.href = site_url.diagnosisDetail_url + '?fundCode=' + fundCode;
      // });

      // // 获取专属报告
      // mui("body").on("tap", ".btnBottom", function () {
      //   that.getReport();
      // });
    }

  }

  /*调用*/
  regard.init();

})