/*

预约明细数据模拟

*/

// 使用 Mock
var Mock = require('mockjs');

//开始造假数据…………………………………………………………………………………………………………………………………………………………
//共10个

//1. 预约明细
var appDetail = Mock.mock({
  "hmac": "hmac",
  "status": 0,
  "code": "CS0000",
  "msg": "处理成功！",
  "data":{
        "pageList":[{
            "changeDate":"2016-03-09",//积分日期
            "desceiption":"产品购买",//来源
            "operate":"+",//积分数
            "count|1":[1200,1400],
            "currentAvailablePoints":"2333", //可兑换积分
            "endDate":"2018-03-09" //有效期
        },
        {
            "changeDate":"2016-03-09",//积分日期
            "desceiption":"产品购买",//来源
            "operate":"+",//积分数
            "count":"1200",
            "currentAvailablePoints":"2333", //可兑换积分
            "endDate":"2018-03-09" //有效期
        },
        {
            "changeDate":"2016-03-09",//积分日期
            "desceiption":"产品购买",//来源
            "operate":"+",//积分数
            "count":"1200",
            "currentAvailablePoints":"2333", //可兑换积分
            "endDate":"2018-03-09" //有效期
        },
        {
            "changeDate":"2016-03-09",//积分日期
            "desceiption":"产品购买",//来源
            "operate":"+",//积分数
            "count":"1200",
            "currentAvailablePoints":"2333", //可兑换积分
            "endDate":"2018-03-09" //有效期
        },
        {
            "changeDate":"2016-03-09",//积分日期
            "desceiption":"产品购买",//来源
            "operate":"+",//积分数
            "count":"1200",
            "currentAvailablePoints":"2333", //可兑换积分
            "endDate":"2018-03-09" //有效期
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

module.exports = appDetail;