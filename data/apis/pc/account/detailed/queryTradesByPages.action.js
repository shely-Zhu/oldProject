/*

交易明细数据模拟

*/

// 使用 Mock
var Mock = require('mockjs');

//开始造假数据…………………………………………………………………………………………………………………………………………………………
//共10个

//1. 交易明细
var payDetail = Mock.mock({
  "hmac": "hmac",
  "status": 0,
  "code": "CS0000",
  "msg": "处理成功！",
  "data":{
          "pageList":[{
              "fundName":"恒天财富鼎龙精选6号证券投资基金",//产品名称
              "fundCode": "0000G2",//产品代码
              "totalShare": "30000",//总份额
              "businName|1":["认购","赎回","强制赎回","撤销","申购"],
              "confirmBalance": "100000",//确认金额
              "confirmType":"100000",    //确认份额
              "confirmDate": "2016-08-09"//成立日期
          },
          {
              "fundName":"恒天财富鼎龙精选6号证券投资基金",//产品名称
              "fundCode": "0000G2",//产品代码
              "totalShare": "30000",//总份额
              "businName|1":["认购","赎回","强制赎回","撤销","申购"],
              "confirmBalance": "100000",//确认金额
              "confirmType":"100000",    //确认份额
              "confirmDate": "2016-08-09"//成立日期
          },
          {
              "fundName":"恒天财富鼎龙精选6号证券投资基金",//产品名称
              "fundCode": "0000G2",//产品代码
              "totalShare": "30000",//总份额
              "businName|1":["认购","赎回","强制赎回","撤销","申购"],
              "confirmBalance": "100000",//确认金额
              "confirmType":"100000",    //确认份额
              "confirmDate": "2016-08-09"//成立日期
          },
          {
              "fundName":"恒天财富鼎龙精选6号证券投资基金",//产品名称
              "fundCode": "0000G2",//产品代码
              "totalShare": "30000",//总份额
              "businName|1":["认购","赎回","强制赎回","撤销","申购"],
              "confirmBalance": "100000",//确认金额
              "confirmType":"100000",    //确认份额
              "confirmDate": "2016-08-09"//成立日期
          },
          {
              "fundName":"恒天财富鼎龙精选6号证券投资基金",//产品名称
              "fundCode": "0000G2",//产品代码
              "totalShare": "30000",//总份额
              "businName|1":["认购","赎回","强制赎回","撤销","申购"],
              "confirmBalance": "100000",//确认金额
              "confirmType":"100000",    //确认份额
              "confirmDate": "2016-08-09"//成立日期
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

module.exports = payDetail;