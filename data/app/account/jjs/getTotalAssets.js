/*

  获取总资产

*/

// 使用 Mock
var Mock = require('mockjs');

var mymessage = Mock.mock({
    "data":{
        "allTotalAssets":"1,000,000.00",
        "combinationAssets":"0.00",
        "combinationProportion":"0%",
        "jJSAssets":"1,000,000.00",
        "jJSProportion":"100%",
        "privateAssets":"0.00",
        "privateProportion":"0%",
        "publicAssets":"0.00",
        "publicProportion":"0%",
        "smartInvestmentAssets":"0.00",
        "smartInvestmentProportion":"0%",
        "sysDate":"2019-07-05 14:15:39"
    },
    "message":"操作成功！",
    "status":"0000"
});
module.exports=mymessage;
