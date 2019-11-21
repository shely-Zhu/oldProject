/*
	私募历史明细
*/

// 使用 Mock
var Mock = require('mockjs');

var incomeDetail = Mock.mock({ 
	"data|10":[
		{
	        "profitThoudValue|1": ["5000", "33", "2222" ], //历史收益
	        "profitThoudDate" : '2019-11-10',  //收益日期
	        "sevenIncomeRate|1": ['0', '2', '4.999']  //七日年化
	        
	       	

	    }
	],
    "message": "操作成功！",
     "status": "0000", 
    "code": "CS0000", 
});

//把生成的假数据当做模块输出
module.exports = incomeDetail;