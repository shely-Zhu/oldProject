/*

  会员权益详情

*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
"data": {
"pageItems": {
"totalCount": 1,
"totalPages": 1
},
"pageList": [{
"assignAmount": "0.00",
"assignDate": null,
"assignShare": "0.00",
"assignStep": null,
"assigneeAmount": "0.00",
"assigneeDate": null,
"assigneeShare": "",
"assigneeStep": null,
"businessCompareReference": "",
"businessCompareReferenceMask": "",
"businessCompareReferenceMax": "",
"businessCompareReferenceMin": "",
"businessType": 0,
"businessTypeDesc": "认购",
"confirmAmount": "0.00",
"confirmDate": null,
"confirmShare": "0.00",
"contractName": "",
"contractUrl": "",
"doneAmount": "0.00",
"empName": "王羽",
"empNo": "H002867",
"firstOrAppend": 1,
"isForElec": "0",
"isQualified": 0,
"leftBottomStatus": "11",
"leftBottomStatusDesc": "待理财师确认",
"leftTopStatus": "0",
"leftTopStatusDesc": "待确认",
"operationNo": "2",
"paymentType": 0,
"productId": 27701,
"projectId": 36243,
"projectName": "中融-汇聚金1号(8.21-8.27)(90天)募集期产品201912100953第一次开放17",
"redeemDate": null,
"redeemPortion": "0.00",
"reserveAmount": "1,000,000.00",
"reserveId": 57001,
"reserveStatusTip": "新客户需理顾确认后才可以进行排队！请联系理顾进行确认",
"reserveTime": "2019-12-23"
}]
},
"message": "操作成功！",
"status": "0000"
}
);
module.exports = data;