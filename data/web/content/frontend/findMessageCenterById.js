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
        id:"2222",
        category:"8888",
        title:"fhjdsdf",
        introduction:"33",
        displayOrder:"4",
        productType:"1",
        source:"22",
        reportDate:"2018-09-09",
        isInvokeSubject:"1",
        isLoginSubject:"0",
        subjectId:"9999",
        synopsis:"3333",
        content:"fsfjkdsfhisfiejfhdksfhkakdjlad",
        imageUrl:"",
        targetUrl:"",
        isRecommend:"1",
        isRiskAssessment:"1",
    }
});

module.exports = data;