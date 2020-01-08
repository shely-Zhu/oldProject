/*
* @page: 初始化财商教育记录
* @Author: songxiaoyu
* @Date:   2018-05-08 10:31:46
* @Last Modified by:   songxiaoyu
* @Last Modified time: 2018-05-09 09:43:12
* @description:
*/

var Mock = require('mockjs');

var data = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	// "code": "CS0000", 
	"code": "CF0004", 
	"msg": "处理成功！", 
	"data": null
});

//把生成的假数据当做模块输出
module.exports = data;