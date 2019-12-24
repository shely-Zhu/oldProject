/*
  公募交易详情查询接口
  http://192.168.6.105:8090/pages/viewpage.action?pageId=9470018#id-%E5%85%AC%E5%8B%9FWEB%E6%A8%A1%E5%9D%97-16.%E9%87%91%E6%9C%8DWEB-%E4%BA%A4%E6%98%93%E8%AF%A6%E6%83%85%E6%9F%A5%E8%AF%A2
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "status":"0000",
    "message":"处理成功！",
    "data":{
    
    allotNo:"123433322",// 申请编号
    
    applyDate:"2018-09-09",// 申请日期
    
    redemptionTime:"222",//赎回时长
    
    fixbusinflag:"0"// 赎回到公募基金才返回该值
    
    }
});

module.exports = data;