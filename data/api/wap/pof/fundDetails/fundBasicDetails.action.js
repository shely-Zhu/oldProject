/*
	产品详情 
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
         "fundCode": "003075",// 基金代码
          "secuId":"040035",// 基金编码
          "fundName":"建信安心回报定期开放债券型证券投资基金C类份额",// 基金中文全称
          "fundAbbreviation":"建信安心回报定期开放债券型证券投资基金C类份额",// 基金中文简称
          "fundTypeName":"混合型",// 基金类型名称
          "fundComId":"134324",// 基金公司ID
          "tradeDate":"2017-08-99",// 交易日期
          "unitNav":"1.2850",// 份额净值(非货币型)
          "dayChgRat":"-0.25",// 日涨跌幅(%)(非货币型)
          "annYldRat":"0.25",// 7日年化收益率(%)(货币型)
          "unitYld":"0.25",// 每万份基金单位当日收益(货币型)
          "invTypCom":"103000",// 分红方式
          "contrEft":"",// 合同生效日
          "custComName":"",// 基金托管人
          "riskLevel":"2",// 基金风险等级
          "riskLevelName":"中风险",// 基金风险等级名称
          "redemptionTime":"6",// 赎回时长
          "fundStatus":"1",// 交易状态
          "purchaseAmount":"100",// 起购金额
          "purchaseRate":"0.98",// 购买费率
          "discountRate":"",// 折扣费率
          "discount":"",// 折扣率
          "cashTreasure":"",// 现金宝标志
          "redemptionRate":"1.00", //赎回费率
          "purchaseConfirmDay":"2", //认购、申购确认天数
  	}
  });

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理
/*module.exports = [
  {
    params: {name: 1},  //name等于1的时候，返回{error:'error'}
    response: {
      error: 'error'
    }
  }, {
    params: {name: 2},  //name等于2的时候，返回data
    response: data
  }
]*/
module.exports=financial;