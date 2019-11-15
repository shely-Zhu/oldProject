
/*
	成长值
*/

// 使用 Mock
var Mock = require('mockjs');

var incomeDetail = Mock.mock({ 
	"data": {
        "growthValue": "80",
    },
    "message": "操作成功！",
    "status": "0000"
});

//把生成的假数据当做模块输出
module.exports = incomeDetail;