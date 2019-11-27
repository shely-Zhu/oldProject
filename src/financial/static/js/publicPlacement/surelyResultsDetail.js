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

$(function() {
    var somePage = {
      $el: {
        succedText:$(".resultTopTwo .succedText"),  //在线支付标题
        applyTime:$(".applyTime .laber-right"),  //申请时间
        shareTime:$(".shareTime .laber-right"),  //预计确认时间
        earningsTime:$(".earningsTime .laber-right"), //预计查看收益时间
        
        amount1:$(".resultTop .amount"),  //汇款支付金额
        buyStatusText:$(".resultTop .buyStatusText"),  //汇款支付标题
        bankName:$(".resultTop .bankName"),  //银行名称
        bankNum:$(".resultTop .bankNum"),  //银行卡尾号
        
        accountName:$(".resultTop .accountName"),  //户名
        bankAccount:$(".resultTop .bankAccount"),  //账户
        bankNo:$(".resultTop .bankNo"),  //行号
        bankAdress:$(".resultTop .bankAdress"),  //开户行

        fundName:$(".listWrap .fundName"),  //基金名称
        fundCode:$(".listWrap .fundCode"),  //基金代码
        amount2:$(".listWrap .amount"),  //买入金额
        bankName2:$(".listWrap .bankName"),  //银行名称
        bankNum2:$(".listWrap .bankNum"),  //银行卡尾号
        banKImg:$(".listWrap .banKImg"),  //银行卡缩略图
        payType:$(".listWrap .payType"),  //支付方式
      },  
      gV: { // 全局变量
        payType:splitUrl['payType'] || '1',  // 0  在线  1  汇款
        applyId:splitUrl['applyId'],
        fundCode:splitUrl['fundCode'],
        fundBusinCode:splitUrl['fundBusinCode'],
        // applyId:'20190827005586',
        // fundCode:'000847',
        // fundBusinCode:'090',
      },
      init:function(){
        var that = this;
        $('#loading').show();
        that.event()
        that.getData();
      },
      //获取交易结果
      getData:function(){
        var that = this;
        var obj = [{ 
          url: site_url.pofTradeApplyInfo_api,
          data: {
            applyId:that.gV.applyId,
            fundCode:that.gV.fundCode,
            fundBusinCode:that.gV.fundBusinCode,
          },
          //async: false,
          needDataEmpty: true,
          callbackDone: function(json) {
            if(json.status == '0000'){
              if(that.gV.payType == '0'){
                $('#loading').hide();
                $(".resultTop").hide()
                $(".resultTopTwo").show()
                $(".changeNone").removeClass("changeNone")
                that.$el.succedText.html(json.data.tradeApplyDesc)
                that.$el.applyTime.html(json.data.originalDate)
                that.$el.shareTime.html(json.data.estimateConfirmDate)
                that.$el.earningsTime.html(json.data.confirmDate)
                that.$el.payType.html('在线支付')
              }
              if(that.gV.payType == '1'){
                $(".resultTop").show()
                $(".resultTopTwo").hide()
                $(".changeNone").addClass("changeNone")
                that.getBankInfo()
                that.$el.amount1.html(json.data.tradeAmount)
                that.$el.buyStatusText.html(json.data.tradeApplyDesc)
                that.$el.bankName.html(json.data.bankName)
                that.$el.bankNum.html(json.data.bankAccountMask.substr(json.data.bankAccountMask.length-4))
                that.$el.payType.html('汇款支付')
              }
              that.$el.fundName.html(json.data.fundName)
              that.$el.fundCode.html(json.data.fundCode)
              that.$el.amount2.html(json.data.tradeAmount)
              that.$el.banKImg.attr('src',json.data.bankThumbnailUrl)
              that.$el.bankName2.html(json.data.bankName)
              that.$el.bankNum2.html(json.data.bankIdNo)
              
            }else{
              tipAction(json.message);
            }
            
          },

        }];
        $.ajaxLoading(obj);
      },
      //获取本公司账户信息
      getBankInfo:function(){
        var that = this;
        var obj = [{ 
          url: site_url.findSuperviseBank_api,
          data: {
            
          },
          //async: false,
          needDataEmpty: true,
          callbackDone: function(json) {
            if(json.status == '0000'){
              $('#loading').hide();
              that.$el.accountName.html(json.data.accountName)
              that.$el.bankAccount.html(json.data.bankAccount)
              that.$el.bankNo.html(json.data.bankNo)
              that.$el.bankAdress.html(json.data.bankAccountName)
              
            }else{
              tipAction(json.message);
            }
            
          },

        }];
        $.ajaxLoading(obj);
      },
      event:function(){
        var that = this;
        //点击转出规则
        $('body').on('tap','.over',function(){
          //跳往持仓列表页
        }) 
        
      },
      objcallback(json){
        console.log(json)
      }
    }
    somePage.init()
  })