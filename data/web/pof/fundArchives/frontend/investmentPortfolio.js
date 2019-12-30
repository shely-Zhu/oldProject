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
        industryAllocation: [],
        stockHoldings: [],
    }
  });


module.exports=financial;