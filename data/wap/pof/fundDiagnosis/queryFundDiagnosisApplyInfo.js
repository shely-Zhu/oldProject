

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    message: "操作成功！",
    status: "0000",
    data:{
        affordableMaxDeficitRateMax: null,
        affordableMaxDeficitRateMin: null,
        age: "20",
        applyDate: null,
        applyStatus: null,
        birthDate: null,
        custName: "天天",
        customerNo: "",
        eInvestDurationLevel: null,
        eYieldratePerYearMax: null,
        eYieldratePerYearMin: null,
        empCode: "",
        empName: "",
        evocation: null,
        evocationExtension: "",
        id: null,
        investDurationLevel: null,
        liquidityRequirement: null,
        pubNo: "",
        readyPurchaseHTFunds: [],
        readyPurchaseQTFunds: [],
        riskLevel: null,
        sex: null,
    }
});





//根据传参数的不同进行处理

module.exports = data;