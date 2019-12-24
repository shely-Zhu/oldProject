var Mock = require('mockjs');

//1. 接口数据
var data = Mock.mock({
	"data":{
		"2910年12月":[{
			"applyDate": 1576049561000,
			"applyStatus": 1,
			"customerNo": "464102",
			"id": 20
		}, {
			"applyDate": 623453245,
			"applyStatus": 1,
			"customerNo": "464102",
			"id": 12
		}],
		"2910年11月":[{
			"applyDate": 1576049561000,
			"applyStatus": 1,
			"customerNo": "464102",
			"id": 20
		}, {
			"applyDate": 623453245,
			"applyStatus": 1,
			"customerNo": "464102",
			"id": 12
		}]
	},
	"message": "操作成功！",
	"status": "0000"
});
// var data = Mock.mock({"data":"","message":"操作成功,数据为空","status":"1000"})

//根据传参数的不同进行处理
module.exports = data;