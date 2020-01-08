/*
	智能投顾-组合持仓列表
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "success",
    "data": {
        "totalCount": 12, //总条数
        "totalPage": 3, //总页数
        "comShareList|3": [{
            "fundCode": "003075", //基金编号
            "fundName": "中融货币A", //基金名称
            "worth": "1000000", //市值
            "worthMask": "10,000", //市值千分位
            "holdShare": "1000", //持有份额
            "holdShareMask": "1,000", //持有份额千分位"
            "availShare": "2", //可用份额
            "availShareMask": "800", //可用份额千分位
            "yesUnitNav": "0.72" //昨日净值
        }],
        // "comShareList":''
    }
    // "data":null

});

//把生成的假数据当做模块输出
module.exports = data;