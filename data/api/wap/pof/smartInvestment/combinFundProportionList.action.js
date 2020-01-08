/*
 * @page: 智能投顾-组合产品买入占比列表
 * @Author: songxiaoyu
 * @Date:   2018-10-16 16:15:24
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-10-30 16:12:06
 * @description:
 */


// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
        "combinFundProportionList|2": [{
            "fundCode": "000837", //产品代码
            "fundName": "智能投顾1号", //产品名称
            "prdPercent": "0.5" //占比
        },{
            "fundCode": "9999", //产品代码
            "fundName": "智能投顾2号", //产品名称
            "prdPercent": "50.00" //占比
        }]
    }
});

//把生成的假数据当做模块输出
module.exports = data;