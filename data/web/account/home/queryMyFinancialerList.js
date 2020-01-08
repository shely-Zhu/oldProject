/*
	我的理财师查询
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var data = Mock.mock({
	"hmac": "hmac",
	"status": "0000",
	"code": "CS0000",
	"message": "处理成功！",
	"data": {
		'exclusiveFinancialerList':[{
			'code':'H118992',   //理财师编号
			'name':'耶耶耶',   //理财师名称
			'certificate': '',  //证书
			'imageUrlShowOnline':'',  //头像地址
			'summary': '',   // 简介
			'mobile':'',   //手机号
			'cityName':'',  // 城市

		}],
		'serviceFinancialerList':[{
			'code':'H118992',   //理财师编号
			'name':'打开的',   //理财师名称
			'certificate': '',  //证书
			'imageUrlShowOnline':'',  //头像地址
			'summary': '',   // 简介
			'mobile':'',   //手机号
			'cityName':'',  // 城市
		}]
	}
	// 'data':''
});
module.exports = data;
