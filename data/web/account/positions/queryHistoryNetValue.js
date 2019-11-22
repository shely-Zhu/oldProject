/*
	净值走势
*/

// 使用 Mock
var Mock = require('mockjs');

var incomeDetail = Mock.mock({ 
	"data": {
		"pageList|10": [
			{
		        "netValue|1": ["5000", "33", "2222" ], // 单位净值
		        "netValueDate" : '2019-11-10',  //收益日期
		        "totalNetValue|1": ['0', '3', '3.999']  //累计净值
		    }
	]},
    "message": "操作成功！",
    "status": "0000", 
    "code": "CS0000", 
});

//把生成的假数据当做模块输出
module.exports = incomeDetail;