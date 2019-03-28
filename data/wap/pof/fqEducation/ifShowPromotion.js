/*
* @page: 是否展示推广信息
* @Author: songxiaoyu
* @Date:   2018-05-08 10:32:14
* @Last Modified by:   songxiaoyu
* @Last Modified time: 2018-05-08 14:34:40
* @description:
*/
var Mock = require('mockjs');

var data = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	// "code": "CF0004", 
	"msg": "处理成功！", 
	"data": { 
		"toShow": 1    // 0不展示 1展示
	} 
});

//把生成的假数据当做模块输出
module.exports = data;