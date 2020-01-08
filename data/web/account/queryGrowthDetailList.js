/*
	成长值
*/

// 使用 Mock
var Mock = require('mockjs');

var incomeDetail = Mock.mock({ 
	"data": {
		"pageItems":{
			"totalCount": 100,
			"totalPages": 2,
		},
        "pageList|10": [{
        	"growthDetail": 100,
        	"growthDesc": "成长值描述",
        	"growthDate": "2019-08-22",
        	"growthIndate": '2020-08-22'
        }],
    },
    "message": "操作成功！",
    "status": "0000"
});

//把生成的假数据当做模块输出
module.exports = incomeDetail;