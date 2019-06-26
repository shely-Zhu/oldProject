/*
	成长值
*/

// 使用 Mock
var Mock = require('mockjs');

var incomeDetail = Mock.mock({ 
	"data": [{
        	"valueUp": 10000,
        	"valueDown": 0
        }],
    
    "message": "操作成功！",
    "status": "0000"
});

//把生成的假数据当做模块输出
module.exports = incomeDetail;