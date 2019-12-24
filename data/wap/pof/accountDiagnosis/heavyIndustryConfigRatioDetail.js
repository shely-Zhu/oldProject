

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    "status":"0000",

"msg":"处理成功！",
"data":{

industryConfigRatioList:  [
    {
    "industryName": "行业名称",//行业名称
    "industryNavRatio": "12"//行业所占比重
    },
    {
        "industryName": "jjjdf",//行业名称
        "industryNavRatio": "30"//行业所占比重
    },
]
}
});





//根据传参数的不同进行处理

module.exports = data;