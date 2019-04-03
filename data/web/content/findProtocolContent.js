/*
    协议查询(含附件信息)
*/

// 使用 Mock
var Mock = require('mockjs');

var queryProtocols = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": { 
        "id": "16",//协议ID 
        "protocolName":"协议1",//协议名称
        "type": "pof",//协议类型 pof 公募；pef 私募
        "content": "<p>内容内容…内容内容…内容内容…内容内容…内容内容…内容内容…内容内容…内容内容…内容内容…内容内容…内容内容…内容内容…内容内容…内容内容…内容内容…内容内容…内容内容…内容内容…11111111111111111111111111111111111111111111111111111111111</p>"//内容
    }

});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = queryProtocols;
