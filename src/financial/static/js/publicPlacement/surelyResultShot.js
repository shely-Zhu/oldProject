/*
 * @Author: your name
 * @Date: 2019-12-20 15:32:30
 * @LastEditTime : 2019-12-20 18:18:17
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \htjf-app\src\financial\static\js\publicPlacement\surelyResultShot.js
 */
/**
* 定投结果 
* @author wangjiajia 2019-11-23
*/
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
$(function () {
  var somePage = {
    $e: {
        succedText:$(".resultTop .succedText"),   //标题
        errorText:$(".resultTopTwo .succedText"),   //失败标题
        //转入
        shareTimePInto:$(".cashInto .shareTimeP"),   //开始计算收益流程
        earningsTimePInto:$(".cashInto .earningsTimeP"),   //第一笔收益到账流程
        applyTimeInto:$(".cashInto .applyTime .laber-right"),   //申请时间
        shareTimeInto:$(".cashInto .shareTime .laber-right"),  //开始计算收益
        earningsTimeInto:$(".cashInto .earningsTime .laber-right"),  //第一笔收益到账
        fundNameInto:$(".cashInto .fundName"),   //基金名
        fundCodeInto:$(".cashInto .fundCode"),  //基金代码
        amountInto:$(".cashInto .amount"),  //金额
        banKImgInto:$(".cashInto .banKImg"),  //银行图
        bankNameInto:$(".cashInto .bankName"),   //银行名
        bankNumInto:$(".cashInto .bankNum"),  //银行卡尾号后四位
        payTypeInto:$(".cashInto .payType"),   //支付方式

        //定投
        toTimeP:$(".cashOut .toTimeP"),   //到账时间流程
        applyTimeOut:$(".cashOut .applyTime .laber-right"),   //申请时间
        toTimeOut:$(".cashOut .toTime .laber-right"),  //到账时间
        fundNameOut:$(".cashOut .fundName"),   //基金名
        fundCodeOut:$(".cashOut .fundCode"),  //基金代码
        amountOut:$(".cashOut .amount"),  //金额
        banKImgOut:$(".cashOut .banKImg"),  //银行图
        bankNameOut:$(".cashOut .bankName"),   //银行名
        bankNumOut:$(".cashOut .bankNum"),  //银行卡尾号后四位
        payTypeOut:$(".cashOut .payType")   //支付方式
    },
    gV: { // 全局变量
        scheduledProtocolId:splitUrl["scheduledProtocolId"],
        applyDate:splitUrl['applyDate']
    },
    init: function () {
      var that = this;
      that.getData();
      that.event()
    },
    getData:function(){
        var that = this;
        var obj = [{
            url:site_url.pofFixedDetail_api,
            data:{
                scheduledProtocolId:that.gV.scheduledProtocolId
            },
            callbackDone:function(json){
              var data = json.data;
               if(json.status == '0000'){
                $(".resultTop").show()
                //状态为转入中和转入成功全部统一为转入中
                that.$e.succedText.html("申请成功")
                that.$e.applyTimeOut.html(that.gV.applyDate)
                that.$e.toTimeOut.html(data.nextFixrequestDateMask + '&nbsp;24:00 前')
                that.$e.earningsTimeInto.html(data.paymentGainsDayStr + '&nbsp;24:00 前')
                $(".shotData")[0].textContent = data.fixedPeriodMask
                $(".shotMoney")[0].textContent = data.balance
                that.$e.fundNameOut.html(data.fundName)
                that.$e.fundCodeOut.html(data.fundCode)
                $(".cashOut").show()
                //that.$e.fundCodeInto.html(data.fundCode)
                that.$e.amountOut.html(data.balanceMask)
                that.$e.banKImgOut.attr('src',data.bankThumbnailUrl)
                that.$e.bankNameOut.html(data.bankName)
                that.$e.bankNumOut.html(data.bankAccountMask.substr(data.bankAccountMask.length-4))
                that.$e.payTypeOut.html('在线支付')
               }
            }

        }];
        $.ajaxLoading(obj);
    },
    event: function () {
      var that = this;
   
    }
  }
  somePage.init()
})