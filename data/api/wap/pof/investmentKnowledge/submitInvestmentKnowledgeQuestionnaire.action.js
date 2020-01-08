// 使用 Mock
// 投资问卷提交
var Mock = require('mockjs');

var data = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "success",
    "data": {
        "paperScore":"4", //得分 
        "flag":true, //投资知识问卷是否通过唯一表示 ，true通过， false未通过
        "riskPaperDescription":"通过", //问卷通过文字标识
        "paperErrorCount":"1",
    }
});

module.exports = data;