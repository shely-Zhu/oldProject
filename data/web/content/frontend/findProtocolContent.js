/*
   查询协议内容
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock( {
    "data": {
        "content": "内容内容…",//内容
        "id": "16",//协议ID【请参照备注】
        "protocolName": "协议1",//协议名称
        "type": "pof"//协议类型 pof-公募, pef-私募
    },
    "msg": "成功",
    "status": "0000"
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = data;
