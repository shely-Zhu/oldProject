/*

产品推荐数据模拟

*/

// 使用 Mock
var Mock = require('mockjs');

//开始造假数据…………………………………………………………………………………………………………………………………………………………
//共10个

//1. 产品推荐
var prdRec = Mock.mock({
  "hmac": "hmac",
  "status": 0,
  "code": "CS0000",
  "msg": "处理成功！",
  "data":[
        {
            "productName": "恒天财富鼎龙精选6号证券投资基金",//产品名称
            "performanceBenchmark":"7%~8%",  //业绩比较基准
            "productTerms":"12个月",//产品期限
            "raisingStartDate":"2016-09-08",//募集起始日期
            "raisingEndDate":"2016-09-09",//募集结束日期
            "url":"http://www.baidu.com"//产品URL
        },
        {
            "productName": "恒天财富鼎龙精选6号证券投资基金",//产品名称
            "performanceBenchmark":"7%~8%",  //业绩比较基准
            "productTerms":"12个月",//产品期限
            "raisingStartDate":"2016-09-08",//募集起始日期
            "raisingEndDate":"2016-09-09",//募集结束日期
            "url":"http://www.baidu.com"//产品URL
        },
         {
            "productName": "恒天财富鼎龙精选6号证券投资基金",//产品名称
            "performanceBenchmark":"7%~8%",  //业绩比较基准
            "productTerms":"12个月",//产品期限
            "raisingStartDate":"2016-09-08",//募集起始日期
            "raisingEndDate":"2016-09-09",//募集结束日期
            "url":"http://www.baidu.com"//产品URL
        },
         {
            "productName": "恒天财富鼎龙精选6号证券投资基金",//产品名称
            "performanceBenchmark":"7%~8%",  //业绩比较基准
            "productTerms":"12个月",//产品期限
            "raisingStartDate":"2016-09-08",//募集起始日期
            "raisingEndDate":"2016-09-09",//募集结束日期
            "url":"http://www.baidu.com"//产品URL
        },
         {
            "productName": "恒天财富鼎龙精选6号证券投资基金",//产品名称
            "performanceBenchmark":"7%~8%",  //业绩比较基准
            "productTerms":"12个月",//产品期限
            "raisingStartDate":"2016-09-08",//募集起始日期
            "raisingEndDate":"2016-09-09",//募集结束日期
            "url":"http://www.baidu.com"//产品URL
        },
         {
            "productName": "恒天财富鼎龙精选6号证券投资基金",//产品名称
            "performanceBenchmark":"7%~8%",  //业绩比较基准
            "productTerms":"12个月",//产品期限
            "raisingStartDate":"2016-09-08",//募集起始日期
            "raisingEndDate":"2016-09-09",//募集结束日期
            "url":"http://www.baidu.com"//产品URL
        }
      ]
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = prdRec;