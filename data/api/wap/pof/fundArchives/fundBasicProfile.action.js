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
         "fundCode": "040035",// 基金代码
          "fundName":"建信安心回报定期开放债券型证券投资基金C类份额",// 基金中文全称
          "fundAbbreviation":"建信安心回报定期开放债券型证券投资基金C类份额",// 基金中文简称
          "fundTypeName":"混合型",// 基金类型名称
          "invTypCom":"10300",// 基金类型
     		  "dividendWay": "现金分红",// 分红方式
     		  "establishDate": "2012-03-22",// 成立日期
     		  "fundComName": "发送到发送到公司",// 基金公司名称
     		  "custComName": "发送到发送到公司",// 基金托管人
    		  "riskLevel":"中风险",// 基金风险等级
    			"riskLevelName":"中风险",// 基金风险等级名称
			     "perfBen": "",// 业绩比较基准
			     "shareType":"", //份额分类
				    "assetValue":"100000000",// 资产净值
           "assetValueTime":"20018-02-11",// 资产净值日期
			     "investmentScope":"是短发是发送到发送到发送到发送到发送到发送到发送到发送到发的是",// 投资范围
			     "riskTarget": "sdfsdfsdf",// 风险收益目标
			       "riskCharacteristics":"fsdfwr阿萨德发生的方法是微软", // 风险收益特征
 			      "fundStatus":"" // 交易状态

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