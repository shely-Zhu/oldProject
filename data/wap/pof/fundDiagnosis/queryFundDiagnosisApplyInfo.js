

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({"data":{"affordableMaxDeficitRateMax":20.0000,"affordableMaxDeficitRateMin":10.0000,"age":54,"applyDate":1578580536000,"applyStatus":1,"birthDate":-108028800000,"custName":"","customerNo":"649241","eInvestDurationLevel":1,"eYieldratePerYearMax":20.0000,"eYieldratePerYearMin":10.0000,"empCode":"H011973","empName":"王林","evocation":1,"evocationExtension":"","id":112,"investDurationLevel":1,"liquidityRequirement":1,"pubNo":"456128","readyPurchaseHTFunds":[],"readyPurchaseQTFunds":[{"diagnoseApplyId":112,"fundCode":"000847","id":365,"purchaseAmount":1000.0000,"purchaseDate":1578528000000,"purchaseDateStr":"2020-01-09","purchaseSourceType":2}],"riskLevel":1,"sex":0},"message":"操作成功！","status":"0000"});





//根据传参数的不同进行处理

module.exports = data;