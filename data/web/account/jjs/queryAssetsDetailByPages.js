/*

  获取其他资产(JJS)持仓列表

*/

// 使用 Mock
var Mock = require('mockjs');

var mymessage = Mock.mock({
    "data": {
        "pageItems": {
            "totalCount": 20,
            "totalPages": 15
        },
        "pageList|10": [{
                    "balance": 1000000,
                    "deadLine": "12月",
                    "establishDate": 1528905600000,
                    "establishDateStr": "2018-06-14",
                    "productCode": "",
                    "profit": 5.2,
                    "projectName": "华泰融创晟融2号定向投资工具（中植新能源）（三次开放）"
                },
                // {
                //     "balance":5802563,
                //     "deadLine":"12月",
                //     "establishDate":1528905600000,
                //     "establishDateStr":"2018-06-14",
                //     "productCode":"",
                //     "profit":9.9,
                //     "projectName":"华泰融创晟融3号定向投资工具（中植新能源）（三次开放）"
                // }
        ]
            
    },
    "message": "操作成功！",
    "status": "1000"
});
module.exports = mymessage;