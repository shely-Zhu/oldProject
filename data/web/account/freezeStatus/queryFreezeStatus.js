/*
* @page: 客户冻结状态查询
* @Author: songxiaoyu
* @Date:   2019-04-02 16:30:58
* @Last Modified by:   songxiaoyu
* @description:
*/

var Mock = require('mockjs');

//这里直接返回的就是JSON格式
var data = Mock.mock({
    "hmac": "hmac",
    "status": "0000",
    "msg": "success",
    "data":{
       "outdateFreezeStatus":"0", //是否证件冻结 0否 1是
       "lawFreezeStatus":"0", //是否司法冻结 0否 1是
       "buyFreeze":"1", //是否买入冻结 0否 1是
       "saleFreeze":"0" //是否卖出冻结 0否 1是
    }
});
module.exports = data;