/*
	投资者分类申请
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var modAccount = Mock.mock({
    hmac: "", //预留字段
    msg: "success",
    code: "", //错误码
    status: "0",
    data: {
        allotNo: "" //申请编号  
    }

});
module.exports = modAccount;
