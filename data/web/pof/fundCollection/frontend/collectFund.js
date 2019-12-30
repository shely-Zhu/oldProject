
var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    status: "0000",
    msg: "处理成功",
    "data":[
        {"fundCode":"000001",
        "collected":"0",   // 0表示取消收藏，1表示收藏
        "fundNameShort":"AA公募基金",
        "invTypCom":"10300"},
    ]      
});




module.exports = data;