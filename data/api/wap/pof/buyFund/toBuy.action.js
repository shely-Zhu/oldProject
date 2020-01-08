// 进入下单页面
var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    hmac:"", //预留字段
    msg: "success",
    code:"",//错误码
    status: "0",
    data: {
        "fundCode":"001916",//基金代码
        "fundName":"新沃货币",//基金名称
        "ofundType":"货币型",//基金类型
        "queryType":"2",//查询类别
        "ofundRisklevel":"1",//基金风险等级 数字
        "riskLevle":"低风险",//基金风险等级 中文描述
        "fundStatus":"5",//基金状态
         "investRiskTolerance":"2",//客户风险等级 数字
        "custRiskLevel":"0",//“0”是基金风险等级不大于客户风险等级；"1"是基金风险等级大于客户风险等级
        "redeemTime":"4"//基金赎回时长
    }
});



//根据传参数的不同进行处理

module.exports = data;