/*
个人中心-我的消息
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var mymessage = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    "data":{
      "pageList|10":[
        {
          "msgTitle|1-20":"预约活动",
          "msgContent|1-20":"预约活动",
          "msgDate":Mock.Random.date('yyyy-MM-dd hh:mm:ss')
        }
      ],
      "pageItems":{
        "totalPages": 5,//总页数 
        "totalCount": 50//总条数
      }
    }
    
  });
module.exports=mymessage;