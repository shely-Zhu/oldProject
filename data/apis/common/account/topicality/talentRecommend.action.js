/*

举贤荐才

*/

// 使用 Mock
var Mock = require('mockjs');

//开始造假数据…………………………………………………………………………………………………………………………………………………………

var data = Mock.mock({
   "status": "0", 

    "code": "CS0000", 

    "msg": "处理成功！", 

    "data": { 

		"talentCount":"",//被推荐人数 

		"talentStatus|1":["1","0"],//被推荐人是否存在0:存在1:不存在 

	} 
});

module.exports=data;