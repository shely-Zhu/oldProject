/*
    产品材料标签查询
*/

// 使用 Mock
var Mock = require('mockjs');

var queryReourceLabels = Mock.mock({
    "hmac": "hmac",
    "status": "0000",
    "code": "CS0000",
    "message": "处理成功！",
    "data": [-1,0,2,4] //见备注
});

/*标签名称对应编号：
风险揭示书 0 
产品信息 1
管理报告 2 
资金分配 3  
重要公告及通知 4
恒天简报 5
*/

//根据传参数的不同进行处理

module.exports = queryReourceLabels;