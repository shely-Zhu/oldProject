/*
	我的资产 接口模拟
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var mymessage = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
		"msg": "处理成功！",
		"data":[{
			            "investDirection": "1",//产品投向【1.现金管理 2.债权投资 3.股权投资 4.海外投资 5.其他服务】
									"totalShare": "3003450",//总份额
									"totalAssets": "100,00",//总资产
			           },{
			            "investDirection": "3",//产品投向【1.现金管理 2.债权投资 3.股权投资 4.海外投资 5.其他服务】
									"totalShare": "30000",//总份额
									"totalAssets": "4340,00.345435",//总资产
			           }]
  });
module.exports=mymessage;