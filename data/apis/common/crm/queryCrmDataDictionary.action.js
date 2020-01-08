/*
	国际信息
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var user = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "", 
	"msg": "处理成功！", 
	"data": [{ 
		'dicNo':"1005",
		'djKeyNo':"004",
		'gmKeyNo':"004",
		'keyNo':"4",
		'keyValue':"阿富汗",
		'sonDicNo':"",
	},{ 
		'dicNo':"1006",
		'djKeyNo':"004",
		'gmKeyNo':"004",
		'keyNo':"4",
		'keyValue':"同一家",
		'sonDicNo':"",
	},{ 
		'dicNo':"1007",
		'djKeyNo':"004",
		'gmKeyNo':"004",
		'keyNo':"4",
		'keyValue':"更多的",
		'sonDicNo':"",
	},{ 
		'dicNo':"1008",
		'djKeyNo':"004",
		'gmKeyNo':"004",
		'keyNo':"4",
		'keyValue':"太远了",
		'sonDicNo':"",
	},{ 
		'dicNo':"1005",
		'djKeyNo':"004",
		'gmKeyNo':"004",
		'keyNo':"4",
		'keyValue':"发货的共和党",
		'sonDicNo':"",
	},
	]  
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = user;