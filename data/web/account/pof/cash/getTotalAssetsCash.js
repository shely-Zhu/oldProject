// 超宝详情页面--现金宝资产总览查询

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock(	
    {
    "status": "0000",
    "message": "操作成功",
    "data": {   
        "isOpened":false,// 现金宝是否开户 true是开户 false是未开户    
        "totalMoney":"1059170.16",// 现金宝总资产   
        "totalMoneyMask":"6,878,075.99",//现金宝总资产千分位展示  
        "income":"30.89",// 现金宝昨日收益  
        "incomeMask":"21.65",//现金包昨日收益千分位展示   
        "addupIncome":"115.80",// 现金宝累计收益    
        "addupIncomeMask":"2,174.89",//现金包累计收益千分位展示 
    }
    });

module.exports = data;