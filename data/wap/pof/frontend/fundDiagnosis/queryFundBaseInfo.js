/*
 * @page: 
 * @Author: songxiaoyu
 * @Date:   2019-08-19 11:31:30
 * @Last Modified by:   songxiaoyu
 * @description:
 */


var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    "status": "0000",
    "msg": "处理成功！",
    "data": {
        "fundCode": "000846", //基金代码
        "fundName": "基金名称", //基金名称
        "newNetValue": "1", //最新净值
        "newOneDayGains": "2", //最新日涨幅
        "yearEarnRate": "12", //年化收益率
        "type": "", //,
        "fundState": "12", //基金状态
        "grade":"5", //评级
        "fundLableList": [{
        }] //基金标签

    }

});


//根据传参数的不同进行处理

module.exports = data;