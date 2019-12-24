

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    "status":"0000",
    "msg":"处理成功！",
    "data":{
    "holdShareList|5":  [   
        {       
            "fundCode": "2222",//基金代码
            "fundName": "基金名称",//基金名称
            "holdAmount": "123",//持仓金额（元）
            "holdIncome": "11"//持有收益（元）        
        },    
    ],
  
    "totalCount": ""//总条数
    
    }
});





//根据传参数的不同进行处理

module.exports = data;