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
    // "status": "1000",
    "status": "0000",
    "msg": "处理成功！",
    // "data":null,
    "data": [{
        "earningPower": "20", //收益表现
        "antiRiskCapability": "30", //抗风险性
        "stability": "40", //稳定性
        "decisionCapability": "50", //择股择时能力
        "companyPower": "60", //基金公司实力
        "totalScore": "70", //总分，
        "ageLimit": "", //成立时间年限
        "standardDate": "", //计算基准日期
    },{
        "earningPower": "40", //收益表现
        "antiRiskCapability": "40", //抗风险性
        "stability": "40", //稳定性
        "decisionCapability": "40", //择股择时能力
        "companyPower": "40", //基金公司实力
        "totalScore": "40", //总分，
        "ageLimit": "", //成立时间年限
        "standardDate": "", //计算基准日期
    },{
        "earningPower": "70", //收益表现
        "antiRiskCapability": "70", //抗风险性
        "stability": "70", //稳定性
        "decisionCapability": "70", //择股择时能力
        "companyPower": "70", //基金公司实力
        "totalScore": "70", //总分，
        "ageLimit": "", //成立时间年限
        "standardDate": "", //计算基准日期
    }]
});





//根据传参数的不同进行处理

module.exports = data;