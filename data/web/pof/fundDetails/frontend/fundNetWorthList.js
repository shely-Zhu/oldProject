/*
	历史净值 净值走势图
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var financial = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "FP0001",
    "msg": "处理成功！",
    'data':{
             "pageItems": {
                     "totalCount": "45",// 总记录数
                     "totalPages": "5" //总页数
                     },
             "pageList|10":[
                {
                     "trdDt":"2017-03-12",// 交易日期
                     "unitNav":"1.3332",// 份额净值
                     "accuUnitNav":"1.3332",// 份额累计净值
                     "dayChgRat|1":["-1.3332","+2.3242"],// 日涨跌幅（%）
                     "annYldRat":"-1.3332",// 最近7日折算年收益率
                     "unitYld":"1.3332"//每万份基金单位当日收益
                     },
             ]
    }
  });


module.exports=financial;