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
              "statusDic": "待审核",//审核状态【转义值】
              "redemptionShares": "30000",//赎回份额 
              "redemptionDate": "2016--11-30"//赎回申请日期【yyyy-MM-dd
          },
          {
              "fundName":"恒天财富鼎龙精选6号证券投资基金",//产品名称
              "status|1": [1,2,3,4,5,6],
              "statusDic": "已撤销",//审核状态【转义值】
              "redemptionShares": "30000",//赎回份额 
              "redemptionDate": "2016--11-30"//赎回申请日期【yyyy-MM-dd
          },
          {
              "fundName":"恒天财富鼎龙精选6号证券投资基金",//产品名称
              "status|1": [1,2,3,4,5,6],
              "statusDic": " 审核通过",//审核状态【转义值】
              "redemptionShares": "30000",//赎回份额 
              "redemptionDate": "2016--11-30"//赎回申请日期【yyyy-MM-dd
          },
          {
              "fundName":"恒天财富鼎龙精选6号证券投资基金",//产品名称
              "status|1": [1,2,3,4,5,6],
              "statusDic": "已导出",//审核状态【转义值】
              "redemptionShares": "30000",//赎回份额 
              "redemptionDate": "2016--11-30"//赎回申请日期【yyyy-MM-dd
          },
          {
              "fundName":"恒天财富鼎龙精选6号证券投资基金",//产品名称
              "status|1": [1,2,3,4,5,6],
              "statusDic": "已确认",//审核状态【转义值】
              "redemptionShares": "30000",//赎回份额 
              "redemptionDate": "2016--11-30"//赎回申请日期【yyyy-MM-dd
          }],
          "pageItems": {
              "totalCount": "100",//总记录数
              "totalPages": "2"//总页数
          }
      }
  
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = ransomDetail;