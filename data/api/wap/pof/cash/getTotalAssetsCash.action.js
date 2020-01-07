/*
  恒添宝资产总览页面
  */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var totalAssetsCash = Mock.mock({
  "hmac":"hmac",//预留字段
  "status":"0",//"0"是查询成功;"1"是查询失败;
  "code":"CS0000",//"CF0001" 操作失败;"CS0000" 操作成功;
  "msg":"success",//返回提示信息
  "data":{
    // "isOpened": false,// 现金宝是否开户 true是开户 false是未开户
    "income":"30.89",// 现金宝昨日收益
    "incomeMask":"30.89", //现金宝昨日收益千分位显示
    "annYldRat":"3.3270",// 7日年化收益率(%)
    "addupIncome":"115.80", // 现金宝累计收益
    "addupIncomeMask":"115.80", //现金宝累计受益千分位
    "totalMoney":"1059170.16",  //现金宝总资产
    "totalMoneyMask": "1,059,170.16", //现金宝总资产千分位显示
    // "fundCode": "003075",
    // "fundName": "恒添宝"
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
  module.exports=totalAssetsCash;