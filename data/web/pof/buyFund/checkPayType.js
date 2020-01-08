// 进入下单页面
var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    hmac:"", //预留字段
    msg: "success",
    code:"PF0002",//错误码
    // status: "1",
    status: "0000",
    data: {
        "payType":"0",//支付方式（0、在线支付 1、汇款支付）
		"capitalMode":"M",//实际应使用的支付渠道
		"oldCapitalMode":"M"//页面传入的原支付渠道
    }
});



//根据传参数的不同进行处理

module.exports = data;