

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    "data": "提交申请成功",
    "message": "操作成功！",
    "status": "0000"
});





//根据传参数的不同进行处理

module.exports = data;