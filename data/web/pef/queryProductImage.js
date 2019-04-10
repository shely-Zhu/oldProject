/*
  产品亮点接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"message": "处理成功！", 
	"data":[ 
		{
		"projectId": "3131",//产品代码
		"name": "产品名称",//产品名称
		"imgPath": "https://s.hengtianjf.com//upload/htmall/images/content/b74be506-c201-4c77-a8c5-58ee63e7adab.jpg",//"https://s.hengtianjf.com//upload/htmall/images/content/b74be506-c201-4c77-a8c5-58ee63e7adab.jpg",//图片url
		"features": "25638465656"//"公募基金就是把钱委托给专业的基金公司或基金代销机构，交由专业的基金经理进行股票、债券、定增、黄金等投资，获取相应投资收益，是一种利益共享、风险共担的集合投资方式。",//说明描述
		}
	] 
});

module.exports=data;