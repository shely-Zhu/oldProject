//文章模板模拟数据
// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
	data: {
		"growthValue": 300,
		"levelUpValue": '',
		"percent": 100,
	},
	"message": "successful",
	"status": "0000"
});

module.exports = data;