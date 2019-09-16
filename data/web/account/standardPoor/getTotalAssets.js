/*

  获取总资产

*/

// 使用 Mock
var Mock = require('mockjs');

var mymessage = Mock.mock({
    "data": {
      "consumptionAssets": "100,000.00",
      "consumptionProportion": "50.55",
      "guaranteeAssets": "0",
      "guaranteeProportion": "0",
      "valueAddedAssets": "35.000.00",
      "valueAddedProportion": "16.25",
      "valuePreservingAssets": "45.000.00",
      "valuePreservingProportion": "20.75"
    },
    "message":"操作成功！",
    "status":"0000"
});
module.exports=mymessage;
