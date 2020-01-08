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
         "pageItems": {
             "totalCount":'',// 总记录数
             "totalPages": "" //总页数
          },
         "pageList|1":[
            {
                 "bankIdNo|1":  "934",// 银行编号
                 "bankName|1": "邮政储蓄" //银行名称
            },
            {
                 "bankIdNo|1":  "010",// 银行编号
                 "bankName|1": "浦东发展与银行" //银行名称
            },
            {
                 "bankIdNo|1":  ["01","02","03","04"],// 银行编号
                 "bankName|1": ["建设银行","招商银行","工商银行","交通银行"] //银行名称
            },
            {
                 "bankIdNo|1": ["01","02","03","04"],// 银行编号
                 "bankName|1":["建设银行","招商银行","工商银行","交通银行"] //银行名称
            }
         ]
	}
    
});
module.exports=mymessage;
