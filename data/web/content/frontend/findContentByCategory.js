/*
    首页 内容管理
*/


// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var pOver = Mock.mock({
    "data": {
        "pageItems": {
            "totalCount": 1,
            "totalPages": 1
        },
        "pageList": [{
            "clicksNum": 0,
            "content": "",
            "id": 527,
            "imageUrl": "https://s.chtfundtest.comnull",
            "imageUrlApp": "https://s.chtfundtest.com",
            "introduction": "风险等级解释-保守型  说明...",
            "isSubject": 0,
            "releaseDate": "2018-10-15",
            "reportDate": null,
            "reportSource": "",
            "subjectTag": "",
            "targetUrl": "",
            "title": "风险等级解释"
        }]
    },
    "message": "操作成功！",
    "status": "0000"
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;