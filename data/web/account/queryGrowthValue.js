<<<<<<< HEAD:data/wap/account/queryGrowthValue.js
/*
	成长值
*/

// 使用 Mock
var Mock = require('mockjs');

var incomeDetail = Mock.mock({ 
	"data": {
        "growthValue": "5000",
    },
    "message": "操作成功！",
    "status": "0000"
});

//把生成的假数据当做模块输出
=======
/*
	成长值
*/

// 使用 Mock
var Mock = require('mockjs');

var incomeDetail = Mock.mock({ 
	"data": {
        "growthValue": "400",
    },
    "message": "操作成功！",
    "status": "0000"
});

//把生成的假数据当做模块输出
>>>>>>> e6266796e8d4decceb451fc714b5ee8dd13329d5:data/web/account/queryGrowthValue.js
module.exports = incomeDetail;