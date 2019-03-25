/*
 * @page: 智能投顾-组合下单
 * @Author: songxiaoyu
 * @Date:   2018-10-18 19:04:52
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-10-18 19:06:59
 * @description:
 */

var Mock = require('mockjs');

var data = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
        "combinBuyInfo": {
            "allotNo": "1254122", //申请编号
            "applyDate": "2018-10-10 12:35:55", //申请日期
            "tradeAcco": "2475" //智能投顾交易账号
        }
    }
});

//把生成的假数据当做模块输出
module.exports = data;