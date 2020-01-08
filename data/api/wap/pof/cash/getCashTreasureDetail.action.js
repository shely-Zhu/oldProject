/*
  恒添宝转入转出详情页
  */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var treasureDetail = Mock.mock({
  "hmac":"hmac",//预留字段
  "status":"0",//"0"是查询成功;"1"是查询失败;
  "code":"CS0000",//"CF0001" 操作失败;"CS0000" 操作成功;
  "msg":"success",//返回提示信息
  "data":{
    "tradeApplyStatus":"20",//交易状态
    "tradeApplyDesc":"转入成功",//交易状态描述
    "allotNo":"20161010000701",//申请编号
    "ident":"2",//扣款状态
    "identDesc":"有效" ,//扣款状态 中文描述
    "fundBusinCode":"022",//业务代码
    "taconfirmFlag":"1",//确认状态
    "fundCode": "003075",
    "fundName": "恒添宝",
    "startGainsDayStr":"2017-03-22",//预计开始计算收益时间（转入）
    "isStartGainsDay":true,//是否开始计算收益时间（转入）
    "paymentGainsDayStr":"2017-03-23",//预计收益到账时间（转入）
    "isPaymentGainsDay":true,//是否收益到账时间（转入）
    "estimateDateStr":"2017-02-22" ,//预计转出到账日期（转出）
    "isEstimateDay":false ,//是否到账（转出-普通）
    "estimateTimeStr":"22:46:37" ,//预计转出到账时间（转出-快赎）
    "isEstimateTime":true ,//是否到账（转出-快赎）
    "applyDateTime":"2017-03-20 16:18:52", //客户申请时间
    "bankAccount":"6230221111111117" ,//银行账号 
    "bankName":"华夏银行" ,//银行名称
    "bankNo":"012" ,//银行编码
    "bankLogoUrl":"https://s.htjf.com/upload/htmall/images/content/2f313774-7886-42fa-8bc2-cb2098cd0c71.jpg" ,//地址
    "balance":"10000.00" ,//交易金额
    "shares":"0.00"//交易份额
  } 
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理
/*module.exports = [
  {
    params: {name: 1},  //name等于1的时候，返回{error:'error'}
    response: {
      error: 'error'
    }
  }, {
    params: {name: 2},  //name等于2的时候，返回data
    response: data
  }
  ]*/
  module.exports=treasureDetail;