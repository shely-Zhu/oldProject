/*
 * @page: 智能投顾-组合详情折线图(收益走势/净值走势)
 * @Author: songxiaoyu
 * @Date:   2018-10-25 16:11:54
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-11-06 10:21:33
 * @description:
 */


var Mock = require('mockjs');

var data = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "success",
    "data|2": [{
        "nav": "1.45", //组合净值
        "totalDayRate": "125.52",//组合累计收益
        "tradingDay": "2018-10-22", //交易日期
    },{
        "nav": "1.37", //组合净值
        "totalDayRate": "326",//组合累计收益
        "tradingDay": "2018-10-23", //交易日期
    },{
        "nav": "1.89", //组合净值
        "totalDayRate": "825",//组合累计收益
        "tradingDay": "2018-10-24", //交易日期
    }]

});

//把生成的假数据当做模块输出
module.exports = data;