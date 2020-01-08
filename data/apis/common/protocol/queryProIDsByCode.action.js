/*
		协议查询(含附件信息)
*/

// 使用 Mock
var Mock = require('mockjs');

var queryProIDsByCode = Mock.mock({
	"hmac":"hmac",//预留字段
	"status":"0",
	"code":"",
	"msg":"success",//返回提示信息
	"data":[{
		"id": "123",//协议ID
		"title":"泰达宏利货币A",//协议名称
		"catagory":"4",//类型【参照备注】
		},{
		"id": "456",//协议ID
		"title":"快速转出规则",//协议名称
		"catagory":"4",//类型【参照备注】
		},{
		"id": "789",//协议ID
		"title":"转出规则",//协议名称
		"catagory":"4",//类型【参照备注】
		},

	]

});

//把生成的假数据当做模块输出
//module.exports = data;

// 备注：catagory字段说明：
// 0：申请专业投资者
// 1：申请普通投资者
// 2：普通投资者在转专业投资者
// 3：通用
// 4：现金宝
// 5：专户电子合同
// 6：专户风险揭示书
// 7：专户电子签名约定书

//根据传参数的不同进行处理

module.exports = queryProIDsByCode;
