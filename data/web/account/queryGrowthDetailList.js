/*
	成长值
*/

// 使用 Mock
var Mock = require('mockjs');

var incomeDetail = Mock.mock({ 
	"data": {
		"pageItems":{
			"totalCount": 100,
			"totalPage": 10,
		},
        "pageList|20": [{
        	"growthDetail": 1,
        	"growthDesc": "成长值描述",
        	"growthDate": "2019-08-22",
        	"growthIndate": ''
        }],
    },
    "message": "操作成功！",
    "status": "0000"
});

//把生成的假数据当做模块输出
module.exports = incomeDetail;