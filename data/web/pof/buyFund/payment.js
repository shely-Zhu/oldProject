// 认申购，下单页面点击提交按钮
var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    hmac:"", //预留字段
    msg: "success",
    code:"",//错误码
    status: "POF1186",
    data: {
        "applyDate":"2016-10-11",//申请日期
		"allotNo":"20161010000701",//申请编号
		"fundBusinCode":"022",//业务代码
		"originalDate":null,//短信发送的内容
		"ident":"3",//扣款状态
    "identDesc":"已发送扣款指令",//扣款状态 中文描述
    "fixbusinflag": "1"
    }
});



//根据传参数的不同进行处理

module.exports = data;