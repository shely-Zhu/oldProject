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
             "pefConnectionList": [
                {
                    "videoCoverUrl": "http://livet.v114.com/data/attachment/20200212/1581470246355.jpg",
                    "videoDuration": "",
                    "videoId": "104242",
                    "videoName": "恒天千象一期私募证券投资基金2",
                    "videoSpeaker": "黄达"
                }
             ],
             "profitLossPercentageLast": "-5.88%",
             "hs300PerformancePercentLast":'8.33%',
             "prodPerformanceList": [
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "-5.88",
                     "profitLossDate": "2020/03/13",
                     "profitLossPercentage": "12.50"
                 }
             ],
             "productViewpoint": "证券是多种经济权益凭证的统称，也指专门的种类产品，是用来证明券票持有人享有的某种特定权益的法律凭证。 [1] 主要包括资本证券、货币证券和商品证券等。狭义上的证券主要指的是证券主要包括资本证券、货币证券和商品证券等。狭义上的证券主要指的是证券",
             "projectCode": 16301,
             "projectName": "kxd -封账面签"
         },
         {
             "pefConnectionList": [
                {
                    "videoCoverUrl": "http://livet.v114.com/data/attachment/20200217/1581922658250.jpg",
                    "videoDuration": "",
                    "videoId": "104244",
                    "videoName": "测试111",
                    "videoSpeaker": "郎咸平"
                }
             ],
             "prodPerformanceList": [
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "-5.88",
                     "profitLossDate": "2020/03/13",
                     "profitLossPercentage": "12.50"
                 },
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "-6.21",
                     "profitLossDate": "2020/03/20",
                     "profitLossPercentage": "11.11"
                 },
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "1.56",
                     "profitLossDate": "2020/03/27",
                     "profitLossPercentage": "10.00"
                 },
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "0.09",
                     "profitLossDate": "2020/04/03",
                     "profitLossPercentage": "9.09"
                 },
                 {
                     "hs300PerformanceDate": "",
                     "hs300PerformancePercent": "0.9",
                     "profitLossDate": "2020/04/10",
                     "profitLossPercentage": "8.33"
                 }
             ],
             "profitLossPercentageLast": "-5.88%",
             "hs300PerformancePercentLast":'5.88%',
             "productViewpoint": "证券是多种经济权益凭证的统称，也指专门的种类产品，是用来证明券票持有人享有的某种特定权益的法律凭证。 [1] 主要包括资本证券、货币证券和商品证券等。狭义上的证券主要指的是证券主要包括资本证券、货币证券和商品证券等。狭义上的证券主要指的是证券",
             "projectCode": 20301,
             "projectName": "v114"
         }
     ]
 },
    
});
module.exports=mymessage;
