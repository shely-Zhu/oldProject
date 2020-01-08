// 使用 Mock
var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    hmac:"", //预留字段
    msg: "success",
    code:"",//错误码
    status: "0",
    data: {
         "myAssetTotal":"2,150,000.00",// 我的资产总额
         "todayProfit":"",// 今日收益
         "cumulativeProfit":"",// 累计收益
         "possessCount":"",// 已持有基金数量
         "inTransitCount":"" ,// 在途基金数量
         "myAssetTotalMask":"223131231"
    }
});



//根据传参数的不同进行处理

module.exports = data;