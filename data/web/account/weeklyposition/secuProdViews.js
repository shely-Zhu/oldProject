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
    "data":{
         "prodList":[
            {
                 "projectName":  "华润元大景泰A",// 产品名称
                 "productViewpoint": "证券是多种经济权益凭证的统称，也指专门的种类产品，是用来证明券票持有人享有的某种特定权益的法律凭证。 [1] 主要包括资本证券、货币证券和商品证券等。狭义上的证券主要指的是证券市…", //产品介绍
                 "prodPerformanceList":[
                      {
                           "profitLossPercentage":"profitLossPercentage"
                      }
                 ],
                 "pefConnectionList":{
                      "videoCoverUrl": "videoCoverUrl",
                      "videoId": "40"
                 }
            },
            {
               "projectName":  "华润元大景泰A",// 产品名称
               "productViewpoint": "证券是多种经济权益凭证的统称，也指专门的种类产品，是用来证明券票持有人享有的某种特定权益的法律凭证。 [1] 主要包括资本证券、货币证券和商品证券等。狭义上的证券主要指的是证券市…", //产品介绍
               "prodPerformanceList":[
                    {
                         "profitLossPercentage":"profitLossPercentage"
                    }
               ],
               "pefConnectionList":{
                    "videoCoverUrl": "videoCoverUrl",
                    "videoId": "40"
               }
             }
         ]
	}
    
});
module.exports=mymessage;
