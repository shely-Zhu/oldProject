/*
    智能投顾-组合交易账号查询
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "success",
    "data|4":{
        "combinAccList":[
            {
                "tradeAcco":"01245",//组合交易账号
                "bankAccount":"6254158745887554",//银行卡号
                "bankName":"光大银行",//银行名称
                "bankNo":"012"//银行编号
            }
        ]
    }
});

//把生成的假数据当做模块输出
module.exports = data;