/*
	内容管理
*/
/*
获取短信验证码

*/

// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var findDataByType = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "",
    "msg": "处理成功！",
    {
        "dataType": "assetsScale", //数据类型
        "dataValue": "5800" //数值（单位亿）
    }
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = findDataByType;