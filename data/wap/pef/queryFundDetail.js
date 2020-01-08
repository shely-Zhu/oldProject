/*
 * @page: 产品详情接口
 * @Author: songxiaoyu
 * @Date:   2018-09-21 14:08:10
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-09-25 15:27:45
 * @description:
 */


// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var data = Mock.mock({ 
    "hmac": "hmac", 
    "status": "0", 
    "code": "CS0000", 
    "msg": "处理成功！", 
    "data": {
        "totalShare":  "100,00.00", //持仓总份额 千分位展示
    }
});

module.exports = data;
