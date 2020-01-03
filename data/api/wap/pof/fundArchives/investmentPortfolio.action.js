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
        "assetAllocation|4":[ // 资产配置信息
	        {
              "publishDate":"2013-02-33",// 信息发布日期
              "endDate":"2013-02-33",// 截止日期
              "assetType":"234",// 资产类型
              "assetTypeName|1": ["股票","债券","其他"],// 资产类型名称
              "assetAllocationRatio":"234" // 配置比例(%)
	        }
    	],
    	"industryAllocation":[ // 行业配置信息
          	{
              "publishDate":"2013-02-33",// 信息发布日期
              "endDate":"2013-02-33",// 截止日期
              "industryId":"3423",// 行业编号
              "industryName":"大方第三方实得分",// 行业名称
              "industryNav":"34",// 行业配置市值(元)
              "industryAllocationRatio":"234" // 占基金资产比例(%)
          	},
          	{
              "publishDate":"2013-02-33",// 信息发布日期
              "endDate":"2013-02-33",// 截止日期
              "industryId":"3423",// 行业编号
              "industryName":"大方第三方实得分",// 行业名称
              "industryNav":"34",// 行业配置市值(元)
              "industryAllocationRatio":"234" // 占基金资产比例(%)
          	},
          	{
              "publishDate":"2013-02-33",// 信息发布日期
              "endDate":"2013-02-33",// 截止日期
              "industryId":"3423",// 行业编号
              "industryName":"大方第三方实得分",// 行业名称
              "industryNav":"34",// 行业配置市值(元)
              "industryAllocationRatio":"234" // 占基金资产比例(%)
          	},
          	{
              "publishDate":"2013-02-33",// 信息发布日期
              "endDate":"2013-02-33",// 截止日期
              "industryId":"3423",// 行业编号
              "industryName":"大方第三方实得分",// 行业名称
              "industryNav":"34",// 行业配置市值(元)
              "industryAllocationRatio":"234" // 占基金资产比例(%)
          	}
		],
		"stockHoldings|2":[ // 重仓股票信息
		    {
		       "publishDate":"2013-02-33",// 信息发布日期
		       "endDate":"2013-02-33",// 截止日期
		       "stockName":"234实得分味儿",// 证券简称
		       "stockHoldingAmount":"234234",// 持股量(万股)
		       "stockHoldingNav":"234234234",// 持有市值(元)
		       "stockHoldingRatio":"23" // 占基金资产比例(%) 
		    }
		],
		"bondHoldings|12":[ // 持仓债券信息
		    {
	           "publishDate":"2013-02-33",// 信息发布日期
	           "endDate":"2013-02-33",// 截止日期
	           "bondName":"asdf ",// 债券简称
	           "bondType":"啊发送到",// 债券类型
	           "bondHoldingNav":"234",// 持有市值(元) 
	           "bondHoldingRatio":"234" // 占基金资产比例(%) 
		    },
		]
  	}
  });


module.exports=financial;