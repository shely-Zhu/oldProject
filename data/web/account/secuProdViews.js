/*

  获取银行列表

*/

// 使用 Mock
var Mock = require('mockjs');

var mymessage = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
     "prodList": [
         {
             "pefConnectionList": [],
             "profitLossPercentageLast": "-5.88%",
             "hs300PerformancePercentLast":'8.33%',
             "prodPerformanceList": [
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "-5.88",
                     "profitLossDate": "11",
                     "profitLossPercentage": "12.50"
                 },
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "-6.21",
                     "profitLossDate": "12",
                     "profitLossPercentage": "11.11"
                 },
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "1.56",
                     "profitLossDate": "13",
                     "profitLossPercentage": "10.00"
                 },
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "0.09",
                     "profitLossDate": "14",
                     "profitLossPercentage": "9.09"
                 },
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "0.9",
                     "profitLossDate": "15",
                     "profitLossPercentage": "8.33"
                 },
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "0.09",
                     "profitLossDate": "14",
                     "profitLossPercentage": "9.09"
                 },
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "0.9",
                     "profitLossDate": "15",
                     "profitLossPercentage": "8.33"
                 }
             ],
             "productViewpoint": "卡卡西1",
             "projectCode": 16301,
             "projectName": "kxd -封账面签"
         },
         {
             "pefConnectionList": [],
             "prodPerformanceList": [
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "-5.88",
                     "profitLossDate": "13",
                     "profitLossPercentage": "12.50"
                 },
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "-6.21",
                     "profitLossDate": "20",
                     "profitLossPercentage": "11.11"
                 },
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "1.56",
                     "profitLossDate": "/27",
                     "profitLossPercentage": "10.00"
                 },
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "0.09",
                     "profitLossDate": "03",
                     "profitLossPercentage": "9.09"
                 },
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "0.9",
                     "profitLossDate": "10",
                     "profitLossPercentage": "8.33"
                 },
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "0.9",
                     "profitLossDate": "15",
                     "profitLossPercentage": "8.33"
                 }
             ],
             "profitLossPercentageLast": "-5.88%",
             "hs300PerformancePercentLast":'',
             "productViewpoint": "卡卡西1",
             "projectCode": 20301,
             "projectName": "v114"
         }
     ]
 },
    
});
module.exports=mymessage;
