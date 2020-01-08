/*
	智能投顾-组合赎回接口
*/

// 使用 Mock
var Mock = require('mockjs');


var data = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "success", 
	"data": {
	   "combinRedempInfo":{
            "allotNo":"456",//交易编号
            "applyDate":"2018-09-28 15:30",//申请日期
        }
	}
});

//把生成的假数据当做模块输出
module.exports = data;