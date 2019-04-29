/*
 * @page: 智能投顾-组合资产详情
 * @Author: songxiaoyu
 * @Date:   2018-10-16 10:10:32
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-10-18 19:58:37
 * @description:
 */
var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "data": {
        "accumIncome": "14.72",
        "accumIncomeMask": "14.72",
        "combCode": "0370",
        "combName": "",
        "enableShares": "5050.00",
        "totalAmount": "5050.00",
        "totalAmountMask": "5,050.00",
        "tradeAcco": "ZHLC000000003983",
        "transferDate": null,
        "transferRemind": "0",
        "valueOnway": "0.00",
        "valueOnwayMask": "0.00",
        "valueOnwayShare": "0.00",
        "valueOnwayShareMask": "0.00",
        "yesterdayIncome": "0.35",
        "yesterdayIncomeMask": "0.35"
    },
    "message": "操作成功！",
    "status": "0000"
});

//把生成的假数据当做模块输出
module.exports = data;