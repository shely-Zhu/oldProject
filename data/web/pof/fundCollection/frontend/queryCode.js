
var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    status: "0000",
    msg: "处理成功",
   "data":["288201","157941","161419"]//基金代码

});




module.exports = data;