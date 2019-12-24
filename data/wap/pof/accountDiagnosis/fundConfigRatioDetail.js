

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    "status":"0000",

    "msg":"处理成功！",
    "data":{
        "stockRatio": "13",//股票类比例
        "mixRatio":"12",
        "bondRatio":"13",
        "breakEvenRatio":"22",
        "goodsRatio":"55",
        "currencyRatio":"33",
        
    }
});





//根据传参数的不同进行处理

module.exports = data;