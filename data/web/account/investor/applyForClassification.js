/*
	投资者分类申请
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var applyForClassification = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "message": "处理成功！",
    "data": null
});
module.exports = applyForClassification;
