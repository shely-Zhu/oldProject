/*
  公募撤单
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({
	hmac:"", //预留字段
    msg: "success",
    code:"",//错误码
    status: "0",
    data:  {}
});

module.exports=data;