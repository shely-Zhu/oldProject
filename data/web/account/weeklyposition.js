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
         "period":"3月9日-3月13日",
         "marketValue": "33,331,634.87",
         "totalShare": "31,357,883.95",
         "marketView": "marketView",
         "updateDate": "updateDate",
         "list":[
            {
                 "productName":  "华润元大景泰A",// 产品名称
                 "marketValueRatio":"100",
                 "price":"66,666.52"
            },
            {
               "productName":  "华润元大景泰A",// 产品名称
               "marketValueRatio":"80",
               "price":"66,666.52"
          }
         ]
	}
    
});
module.exports=mymessage;
