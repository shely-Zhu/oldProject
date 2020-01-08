/*
 * @page: 组合产品列表查询
 * @Author: songxiaoyu
 * @Date:   2018-10-15 15:47:06
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-12-10 10:20:14
 * @description:
 */
// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    // "code": "CF0001",
    "msg": "error",
    "data": {
        "combinFundList": [{
            "groupCode": "000001", //组合编号
            "groupName": "智能投顾1号", //组合名称
            "nav": "1.023", //昨日净值
            "dayRate": "1.27%", //日涨幅
            "tradingDay": "09-29" //净值日期
        }]
    }
});

//把生成的假数据当做模块输出
module.exports = data;