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
          "marketList": [
          {
               "marketValueRatio": "83.00%",
               "marketValue": "123",
               "projectName": "K1403"
          },
          {
               "marketValueRatio": "100.00%",
               "marketValue": "123",
               "projectName": "勿动旭霞01(1)(2)(1)(1)(1)(1)(1)(1)"
          },
          {
               "marketValueRatio": "83.00%",
               "marketValue": "123",
               "projectName": "K1403"
          },
          {
               "marketValueRatio": "83.00%",
               "marketValue": "123",
               "projectName": "K1403"
          },
          {
               "marketValueRatio": "76.00%",
               "marketValue": "123",
               "projectName": "勿动旭霞01(1)(2)(1)(1)(1)(1)"
          },
          {
               "marketValueRatio": "76.00%",
               "marketValue": "123",
               "projectName": "勿动旭霞01(1)(2)(1)(1)(1)(1)"
          },
          {
               "marketValueRatio": "100.00%",
               "marketValue": "66,666.52",
               "projectName": "罗全部简称"
          },
          {
               "marketValueRatio": "100.00%",
               "marketValue": "123",
               "projectName": "0917_01K"
          }
          ],
          "marketValue": 65950000.00,
          "marketView": "证券是多种经济权益凭证的统称，也指专门的种类产品，是用来证明券票持有人享有的某种特定权益的法律凭证。 [1] 主要包括资本证券、货币证券和商品证券等。狭义上的证券主要指的是证券主要包括资本证券、货币证券和商品证券等。狭义上的证券主要指的是证券",
          "period": "04月06日-04月10日",
          "totalShare": 59030000.00,
          "updateDate": ""
     },

    
});
module.exports=mymessage;
