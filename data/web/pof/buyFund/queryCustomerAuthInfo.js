
var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    "status": "0000", 
    "msg": "处理成功！", 
    "data": { 
        "isWealthAccount":0,//是否开通财富账户
        "isRiskEndure":1,// 是否风测(0否1是)
        "isPerfect":1,//是否完善资料(0否1是)
        "isInvestFavour":1,// 是否投资者分类(0否1是)
        "isRiskMatch":1,// 是否风险等级匹配(0否1是)
    }
});




module.exports = data;