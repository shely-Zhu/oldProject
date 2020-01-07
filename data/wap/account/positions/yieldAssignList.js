/*
  收益分配明细
*/

// 使用 Mock
var Mock = require('mockjs');

var incomeDetail = Mock.mock({ 
	"data":{
		"pageItems": {
			"totalCount": 100,//多少条
			"totalPages": 10, //多少页
		},
		"pageList":[{ 

			"yieldDate": "2019-11-19",//日期

			"yieldSum": "100,00.00" //金额 

			"assignType": ""//分配类型

			"assignFormula":""//公式

		}]
	},
    "message": "操作成功！",
     "status": "0000", 
    "code": "CS0000", 
});

//把生成的假数据当做模块输出
module.exports = incomeDetail;