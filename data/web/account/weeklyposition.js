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
               "projectName": "K1403"
          },
          {
               "marketValueRatio": "100.00%",
               "projectName": "勿动旭霞01(1)(2)(1)(1)(1)(1)(1)(1)"
          },
          {
               "marketValueRatio": "83.00%",
               "projectName": "K1403"
          },
          {
               "marketValueRatio": "83.00%",
               "projectName": "K1403"
          },
          {
               "marketValueRatio": "76.00%",
               "projectName": "勿动旭霞01(1)(2)(1)(1)(1)(1)"
          },
          {
               "marketValueRatio": "76.00%",
               "projectName": "勿动旭霞01(1)(2)(1)(1)(1)(1)"
          },
          {
               "marketValueRatio": "100.00%",
               "projectName": "罗全部简称"
          },
          {
               "marketValueRatio": "100.00%",
               "projectName": "0917_01K"
          }
          ],
          "marketValue": 65950000.00,
          "marketView": "市场观点市场观点市场观点市场观点",
          "period": "04月06日-04月10日",
          "totalShare": 59030000.00,
          "updateDate": ""
     },

    
});
module.exports=mymessage;
