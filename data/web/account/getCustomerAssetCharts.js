/*

  获取总资产

*/

// 使用 Mock
var Mock = require('mockjs');

var mymessage = Mock.mock(
  { 
    "status": "0000", 
    "message": "接口请求成功",
    "data": [
      {"id":10401,"assetConfigId":10051,"assetNow":104000,"assetNowRatio":16.00,"assetRecommend":200000,"assetRecommendRatio":10.00,"assetClassify":5,"assetType":5},
      {"id":10402,"assetConfigId":10051,"assetNow":106000,"assetNowRatio":16.00,"assetRecommend":0000,"assetRecommendRatio":0.00,"assetClassify":4,"assetType":4},
      {"id":10403,"assetConfigId":10051,"assetNow":110000,"assetNowRatio":17.00,"assetRecommend":300000,"assetRecommendRatio":15.00,"assetClassify":3,"assetType":3},
      {"id":10404,"assetConfigId":10051,"assetNow":109000,"assetNowRatio":17.00,"assetRecommend":150000,"assetRecommendRatio":8.00,"assetClassify":2,"assetType":3},
      {"id":10405,"assetConfigId":10051,"assetNow":107000,"assetNowRatio":17.00,"assetRecommend":1026000,"assetRecommendRatio":51.00,"assetClassify":1,"assetType":6},
      {"id":10406,"assetConfigId":10051,"assetNow":108000,"assetNowRatio":17.00,"assetRecommend":324000,"assetRecommendRatio":16.00,"assetClassify":6,"assetType":2}]
  }
);
module.exports=mymessage;
