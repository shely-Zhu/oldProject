// 使用 Mock
var Mock = require('mockjs');

//这里直接返回的就是JSON格式
var data = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "success",
    "data": {
       "outdateFreezeStatus" :"1",//是否证件冻结 0否 1是
       "lawFreezeStatus" :"1",//是否司法冻结 0否 1是
       "buyFreeze" :"0",//是否买入冻结 0否 1是
       "saleFreeze" :"0",//是否卖出冻结 0否 1是
    }
});
module.exports = data;