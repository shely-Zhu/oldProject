/*
  历史净值接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"message": "处理成功！", 
	"data":{
		"pageItems": { 
			"totalCount": "100",//总记录数 
			"totalPages": "10"//总页数 
		}, 
		"pageList|23":[ 
			{
			"unitNetValue|1": ["1.2300", '1.0352', '1.0832','0.9960','0.8542','0.1100','1.2345'],//产品净值
			"netValueDate|1": ["2017-02-13","2017-02-17","2017-03-13","2017-02-15","2017-06-17"],//净值日期
			"accuNetValue|1": ["1.2300", '2.22', '5.67','9.66','2.44','0.11','10.22'],//总净值
			"projectName": "",//产品名称
			"netValueBeginDate": "",//净值起始日期【yyyy/MM/dd】
			"netValueEndDate": "",//净值终止日期【yyyy/MM/dd】
			}
		] 
	}
});


module.exports=data;