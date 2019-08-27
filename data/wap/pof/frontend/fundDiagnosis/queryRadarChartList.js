/*
 * @page: 基金诊断-指标雷达图
 * @Author: songxiaoyu
 * @Date:   2019-08-16 15:17:35
 * @Last Modified by:   songxiaoyu
 * @description:
 */

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    "data": [{
        "ageLimit": "1",
        "antiRiskCapability": "37.54",
        "companyPower": "99.00",
        "decisionCapability": "99.00",
        "earningPower": "59.72",
        "stability": "99.00",
        "standardDate": "2019-08-23",
        "totalScore": "74.92"
    }/*, {
        "ageLimit": "3",
        "antiRiskCapability": "41.74",
        "companyPower": "98.00",
        "decisionCapability": "98.00",
        "earningPower": "10.46",
        "stability": "98.00",
        "standardDate": "2019-08-23",
        "totalScore": "60.48"
    }, {
        "ageLimit": "5",
        "antiRiskCapability": "90.22",
        "companyPower": "97.00",
        "decisionCapability": "97.00",
        "earningPower": "3.02",
        "stability": "97.00",
        "standardDate": "2019-08-23",
        "totalScore": "67.45"
    }*/],
    "message": "操作成功！",
    "status": "0000"
});





//根据传参数的不同进行处理

module.exports = data;