


// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var data = Mock.mock({ 
    "status":"0000",
    "message":"处理成功！",
    "data":{
    
    "successType":"0",//0-成功否则失败
    
    "allotNo":"1111",//申请编号
    
    "scheduledProtocolId":"1111111",//协议号
    
    "nextFixrequestDate":"2020-1-1",//下次扣款日期
    
    "applyDate":"2018-1-1",//申请日期
    
    }
});

module.exports = data;
