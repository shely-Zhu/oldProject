

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    "status":"0000",
    "msg":"处理成功！",
    "data":{  
        "fundStyle": "基金风格",//基金风格
        "fundType": "基金类型",//基金类型
        "assetConfig": "最高的资产",//资产配置比例最高的资产   
        "heavyIndustry": "重仓行业",//重仓行业
        "bondStyle": "债券类型"//债券类型   
    }
});





//根据传参数的不同进行处理

module.exports = data;