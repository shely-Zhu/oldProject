/*
 *	查询用户是否通过投资者测试
 */

// 使用 Mock
var Mock = require('mockjs');

//这里直接返回的就是JSON格式
var answerSubmit = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
        "isPass": "0",  // 0 是 1否
        "errorCount":5,  //答错题数
    }
});
module.exports = answerSubmit;
