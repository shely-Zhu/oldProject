

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    "status":"0000",
    "msg":"处理成功！",
    "data":{

    "1": "0",//大盘价值型
    "2": "0",//大盘平衡型
    "3": "0",//大盘成长型
    "4": "1",//中盘价值型
    "5": "1",//中盘平衡型
    "6": "2",//中盘成长型
    "7": "5",//小盘价值型

    "8": "0",//小盘平衡型
    "9": "0"//小盘成长型

    }
});





//根据传参数的不同进行处理

module.exports = data;