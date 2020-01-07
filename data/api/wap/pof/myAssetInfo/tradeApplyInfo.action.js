/*
获取交易详情
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var data = Mock.mock({ 
	hmac:"", //预留字段
    msg: "success", 
    code:"",//错误码
    status: "0",
    data: {
         applyId:"201601255",// 交易申请编号 
         fundName:"稳金18号",// 基金名称 
         fundCode:"013005",// 基金代码 
         fundType:"货币型",// 基金类型
         fundStatus:"交易中",// 基金交易状态 
         fundBusinCode:"024",// 业务大类 '022'
         capitalMode:"1",// 资金方式 
         payModeName:"普通支付",// 支付方式名称
         tradeShares:"3000",// 交易申请份额(赎回交易使用)
         tradeAmount:"50000",// 交易申请金额(认/申购交易使用) 
         tradeStatus:"111",// 交易申请状态 '1'
         debitStatus:"3",// 扣款状态 
         tradeDate:"2016-09-08",// 交易申请日期 
         originalDate:"2015-08-23",// 原交易日期 
         estimateConfirmDate:"2016-09-10",// 预估确认日期
         estimateArrivalDate:"2016-09-28",// 预估到账日期 
         confirmShares:"3000",// 确认份额 
         confirmAmount:"50000",//确认金额 
         confirmNav:"1.0235",// 确认净值 
         confirmRate:"0.38",// 手续费 
         confirmDate:"2016-09-10",// 确认日期
         tradeNo:"0053",// 交易账号
         bankAccount:"3217220200005522134",// 银行账户 
         bankIdNo:"63",// 银行编号 
         bankName:"工商银行", // 银行名称 
         isNewFund: true
    }
});
module.exports=data;