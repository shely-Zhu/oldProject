/*

持仓明细数据模拟

*/

// 使用 Mock
var Mock = require('mockjs');

//开始造假数据…………………………………………………………………………………………………………………………………………………………
//共10个

//1. 持仓明细
var posDetail = Mock.mock({
  "hmac": "hmac",
  "status": 0,
  "code": "CS0000",
  "msg": "处理成功！",
  "data":{
        "pageList":[{
            "investDirection|1": [1,2,3,4,5],//产品投向【1.现金管理 2.债权投资 3.股权投资 4.海外投资 5.其他服务】
            "fundName":"恒天财富鼎龙精选6号证券投资基金",//产品名称
            "fundCode": "0000G2",//产品代码
            "totalShare": "30000",//总份额
            "totalAssets": "100000",//总资产
            "setupDate": "2016-08-09",//成立日期
            "allowRedemptionShare": '100,000', ///可赎回份额
            "isAllowRedemption": 2,//是否可以赎回【1.否 2.是】
            "isAllowAppend|1": ["1"], //是否可以追加【1.否 2.是】
            "allowRedemptionTime" : "2016-05-06",
            "cmsProductType" : 1
        },
        {
            "investDirection|1": [1,2,3,4,5],//产品投向【1.现金管理 2.债权投资 3.股权投资 4.海外投资 5.其他服务】
            "fundName":"恒天财富鼎龙精选2号证券投资基金",//产品名称
            "fundCode": "0000G2",//产品代码
            "totalShare": "30000",//总份额
            "totalAssets": "100000",//总资产
            "setupDate": "2016-08-09",//成立日期
            "allowRedemptionShare": '100,000', ///可赎回份额
            "isAllowRedemption": 2,//是否可以赎回【1.否 2.是】
            "isAllowAppend": ["1","2"], //是否可以追加【1.否 2.是】
            "allowRedemptionTime" : "2016-05-08",  //赎回提交时间
            "cmsProductType" : 2   //产品类型【1.稳金类 2.权益类】
            
        },
        {
            "investDirection|1": [1,2,3,4,5],//产品投向【1.现金管理 2.债权投资 3.股权投资 4.海外投资 5.其他服务】
            "fundName":"恒天财富鼎龙精选1号证券投资基金",//产品名称
            "fundCode": "0000G2",//产品代码
            "totalShare": "30000",//总份额
            "totalAssets": "100000",//总资产
            "setupDate": "2016-08-09",//成立日期
            "allowRedemptionShare": '100,000', ///可赎回份额
            "isAllowRedemption|1": ["1","2"],//是否可以赎回【1.否 2.是】
            "isAllowAppend|1": ["1","2"], //是否可以追加【1.否 2.是】
            "allowRedemptionTime" : "2016-05-08",  //赎回提交时间
            "cmsProductType" : 1   //产品类型【1.稳金类 2.权益类】
        },
        {
            "investDirection|1": [1,2,3,4,5],//产品投向【1.现金管理 2.债权投资 3.股权投资 4.海外投资 5.其他服务】
            "fundName":"恒天财富鼎龙精选4号证券投资基金",//产品名称
            "fundCode": "0000G2",//产品代码
            "totalShare": "30000",//总份额
            "totalAssets": "100000",//总资产
            "setupDate": "2016-08-09",//成立日期
            "allowRedemptionShare": '100,000', ///可赎回份额
            "isAllowRedemption|1": ["1","2"],//是否可以赎回【1.否 2.是】
            "isAllowAppend|1": ["1","2"], //是否可以追加【1.否 2.是】
            "allowRedemptionTime" : "2016-05-08",  //赎回提交时间
            "cmsProductType" : 2   //产品类型【1.稳金类 2.权益类】
        },
        {
            "investDirection|1": [1,2,3,4,5],//产品投向【1.现金管理 2.债权投资 3.股权投资 4.海外投资 5.其他服务】
            "fundName":"恒天财富鼎龙精选5号证券投资基金",//产品名称
            "fundCode": "0000G2",//产品代码
            "totalShare": "30000",//总份额
            "totalAssets": "100000",//总资产
            "setupDate": "2016-08-09",//成立日期
            "allowRedemptionShare": '100,000', ///可赎回份额
            "isAllowRedemption|1": ["1","2"],//是否可以赎回【1.否 2.是】
            "isAllowAppend|1": ["1","2"], //是否可以追加【1.否 2.是】
            "allowRedemptionTime" : "2016-05-08",  //赎回提交时间
            "cmsProductType" : 1  //产品类型【1.稳金类 2.权益类】
        }],
        "pageItems":{
          "totalCount": 10,
          "totalPages": 5
        }
      }
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = posDetail;

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = posDetail;