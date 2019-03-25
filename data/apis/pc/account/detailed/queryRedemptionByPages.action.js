/*

赎回明细数据模拟

*/

// 使用 Mock
var Mock = require('mockjs');

//开始造假数据…………………………………………………………………………………………………………………………………………………………
//共10个

//1. 交易明细
var ransomDetail = Mock.mock({
  "hmac": "hmac",
  "status": 0,
  "code": "CS0000",
  "msg": "处理成功！",
  "data":{
          "pageList":[{
              "fundName":"恒天财富鼎龙精选6号证券投资基金",//产品名称
              "status|1": [1,2,3,4,5,6],
              "redemptionShares": "30000",//赎回份额 
              "redemptionDate": "2016--11-30"//赎回申请日期【yyyy-MM-dd
          },
          {
              "fundName":"恒天财富鼎龙精选6号证券投资基金",//产品名称
              "status|1": [1,2,3,4,5,6],
              "redemptionShares": "30000",//赎回份额 
              "redemptionDate": "2016--11-30"//赎回申请日期【yyyy-MM-dd
          },
          {
              "fundName":"恒天财富鼎龙精选6号证券投资基金",//产品名称
              "status|1": [1,2,3,4,5,6],
              "redemptionShares": "30000",//赎回份额 
              "redemptionDate": "2016--11-30"//赎回申请日期【yyyy-MM-dd
          },
          {
              "fundName":"恒天财富鼎龙精选6号证券投资基金",//产品名称
              "status|1": [1,2,3,4,5,6],
              "redemptionShares": "30000",//赎回份额 
              "redemptionDate": "2016--11-30"//赎回申请日期【yyyy-MM-dd
          },
          {
              "fundName":"恒天财富鼎龙精选6号证券投资基金",//产品名称
              "status|1": [1,2,3,4,5,6],
              "redemptionShares": "30000",//赎回份额 
              "redemptionDate": "2016--11-30"//赎回申请日期【yyyy-MM-dd
          }],
          "pageItems": {
              "totalCount": "100",//总记录数
              "totalPages": "10"//总页数
          }
      }
  
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = ransomDetail;