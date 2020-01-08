

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    "status":"0000",

    "msg":"处理成功！",
    "data":{
        "bondAssetRatio": "1",//债券资产比例
        "stockAssetRatio": "23",//股票资产比例
        "cashAssetRatio": "33",//现金资产比例
        "otherAssetRatio": "21"//其他资产比例     
    }
});





//根据传参数的不同进行处理

module.exports = data;