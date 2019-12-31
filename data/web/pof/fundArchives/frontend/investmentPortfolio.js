/*
	历史净值 净值走势图
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var financial = Mock.mock({
    "status": 0000,
    "msg": "处理成功！",
    'data':{
        assetAllocation:[{
            assetAllocationRatio: "48.14",
            assetType: "18",
            assetTypeName: "现金",
            endDate: "20190930",
            publishDate: "",
        },{
            assetAllocationRatio: "35.56",
            assetType: "1210",
            assetTypeName: "债券",
            endDate: "20190930",
            publishDate: "",
        },{
            assetAllocationRatio: "0.00",
            assetType: "1110",
            assetTypeName: "股票",
            endDate: "20190930",
            publishDate: "",
        },{
            assetAllocationRatio: "16.30",
            assetType: "9999999999",
            assetTypeName: "其他",
            endDate: "20190930",
            publishDate: "",
        }],
        assetValue: "107696380.5300",
        bondHoldings:[
            {
                bondHoldingNav: "19,999.68",
                bondHoldingRatio: "2.23",
                bondName: "18附息国债26",
                bondType: "null",
                endDate: "20190930",
                publishDate: "20190930",
            }
        ],
        industryAllocation:[ // 行业配置信息
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
        stockHoldings: [],
    }
  });


module.exports=financial;