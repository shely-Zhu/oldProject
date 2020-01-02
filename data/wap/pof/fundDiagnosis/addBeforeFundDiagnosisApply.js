/*
 * @page: 基金诊断-点击获取专属诊断报告
 * @Author: songxiaoyu
 * @Date:   2019-08-20 16:50:11
 * @Last Modified by:   songxiaoyu
 * @description:
 */

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    message: "操作成功！",
    status: "0000",
    "data": {
        acctInfo: null,
        affordableMaxDeficitRateMax: null,
        affordableMaxDeficitRateMin: null,
        age: 31,
        applyDate: null,
        applyStatus: null,
        birthDate: 590688000000,
        custName: "乱跳",
        customerNo: "",
        eInvestDurationLevel: null,
        eYieldratePerYearMax: null,
        eYieldratePerYearMin: null,
        empCode: "",
        empName: "",
        evocation: 10,
        evocationExtension: "",
        id: null,
        imageCode: "",
        investDurationLevel: null,
        liquidityRequirement: null,
        pubNo: "",
        readyPurchaseHTFunds:[
            {
                diagnoseApplyId: null,
                fundCode: "003075",
                id: null,
                purchaseAmount: 100,
                purchaseDate: 1547712963000,
                purchaseDateStr: "2019-01-17",
                purchaseSourceType: 1,
            }
        ],
        readyPurchaseQTFunds: [],
        riskLevel: null,
        sex: 1,
    }
});





//根据传参数的不同进行处理

module.exports = data;