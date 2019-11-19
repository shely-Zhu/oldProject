/*
  明星理财师-明星理财师列表
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({ 
    "status": "0000", 
    "message": "处理成功！", 
    "data|5":[
        {
            "incomeUnit":"1.2304" ,//万份收益
            "curveDate": "2016-08-09",
            "sevenYearYield": "1.2304", //七日年化率
        },
        {
            "incomeUnit":"1.2304" ,//万份收益
            "curveDate": "2016-08-09",
            "sevenYearYield": "1.2304", //七日年化率
        },
        {
            "incomeUnit":"1.2304" ,//万份收益
            "curveDate": "2016-08-09",
            "sevenYearYield": "1.2304", //七日年化率
        },
    ]
    
    });

module.exports=data;