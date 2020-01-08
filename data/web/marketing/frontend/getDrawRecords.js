/*
荣耀月   接口模拟

*/

console.log(124);

// 使用 Mock
var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
	"hmac": "hmac", 
	"status": "0000", 
	"code": "", 
	"msg": "success", 
	"data":{
        "startTime":'',
        "endTime":'',
		"recordlist":[
            {
                "id":"17891",
                "userId":"294671", //客户编号
                "awardid":7362,
                "award":"5", //1-一等奖，2-二等奖，3-三等奖，4-四等奖，5-五等奖,6-六等奖
                "createtime":"2018-01-15",
                "telphone":"185xxxx0538",
                "periods":"10",
                "source":"wap"
            },
            {
                "id":16877,
                "userId":"294671",
                "awardid":7388,
                "award":"6",
                "createtime":"2018-01-11",
                "telphone":"185xxxx0538",
                "periods":"10",
                "source":"pc"
            },
            {
                "id":17891,
                "userId":"294671", //客户编号
                "awardid":7362,
                "award":"1", //1-一等奖，2-二等奖，3-三等奖，4-四等奖，5-五等奖,6-六等奖
                "createtime":"2018-01-15",
                "telphone":"185xxxx0538",
                "periods":"10",
                "source":"wap"
            },
            {
                "id":17891,
                "userId":"294671", //客户编号
                "awardid":7362,
                "award":"2", //1-一等奖，2-二等奖，3-三等奖，4-四等奖，5-五等奖,6-六等奖
                "createtime":"2018-01-15",
                "telphone":"185xxxx0538",
                "periods":"10",
                "source":"wap"
            },
            {
                "id":17891,
                "userId":"294671", //客户编号
                "awardid":7362,
                "award":"3", //1-一等奖，2-二等奖，3-三等奖，4-四等奖，5-五等奖,6-六等奖
                "createtime":"2018-01-15",
                "telphone":"185xxxx0538",
                "periods":"10",
                "source":"wap"
            },
            {
                "id":17891,
                "userId":"294671", //客户编号
                "awardid":7362,
                "award":"4", //1-一等奖，2-二等奖，3-三等奖，4-四等奖，5-五等奖,6-六等奖
                "createtime":"2018-01-15",
                "telphone":"185xxxx0538",
                "periods":"10",
                "source":"wap"
            },
            {
                "id":"17891",
                "userId":"294671", //客户编号
                "awardid":7362,
                "award":"5", //1-一等奖，2-二等奖，3-三等奖，4-四等奖，5-五等奖,6-六等奖
                "createtime":"2018-01-15",
                "telphone":"185xxxx0538",
                "periods":"10",
                "source":"wap"
            },
            {
                "id":16877,
                "userId":"294671",
                "awardid":7388,
                "award":"6",
                "createtime":"2018-01-11",
                "telphone":"185xxxx0538",
                "periods":"10",
                "source":"pc"
            },
            {
                "id":17891,
                "userId":"294671", //客户编号
                "awardid":7362,
                "award":"1", //1-一等奖，2-二等奖，3-三等奖，4-四等奖，5-五等奖,6-六等奖
                "createtime":"2018-01-15",
                "telphone":"185xxxx0538",
                "periods":"10",
                "source":"wap"
            },
            {
                "id":17891,
                "userId":"294671", //客户编号
                "awardid":7362,
                "award":"2", //1-一等奖，2-二等奖，3-三等奖，4-四等奖，5-五等奖,6-六等奖
                "createtime":"2018-01-15",
                "telphone":"185xxxx0538",
                "periods":"10",
                "source":"wap"
            },
            {
                "id":17891,
                "userId":"294671", //客户编号
                "awardid":7362,
                "award":"3", //1-一等奖，2-二等奖，3-三等奖，4-四等奖，5-五等奖,6-六等奖
                "createtime":"2018-01-15",
                "telphone":"185xxxx0538",
                "periods":"10",
                "source":"wap"
            },
            {
                "id":17891,
                "userId":"294671", //客户编号
                "awardid":7362,
                "award":"4", //1-一等奖，2-二等奖，3-三等奖，4-四等奖，5-五等奖,6-六等奖
                "createtime":"2018-01-15",
                "telphone":"185xxxx0538",
                "periods":"10",
                "source":"wap"
            },
        ],
        "endtime":"2018.01.31", //活动开始时间
        "starttime":"2018.01.01"//活动截止时间
    }
});



module.exports = data;