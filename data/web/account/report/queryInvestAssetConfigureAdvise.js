/*
	建议资产配置比列表
 */


// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var data = Mock.mock({
    "hmac": "hmac",
    "status": "0000",
    "code": "CS0000",
    "msg": "处理成功",
    "data": [{
    	'assetRatio': "0.1000",
        'assetType': "200",
        'assetTypeDesc': "保险产品",
        "productList":[{//产品列表
                'allocationAmount': "100000.00",
                'allocationRatio': "0.1000",
                'investExpiration': null,
                'minPurchaseAmount': null,
                'productId': "I0000181",
                'productName': "国内保险年金险",
                'productType': "175",
                'productTypeDesc': "保险",
                'sevenYearYield': null,
                'subdivisionStrategy': "206",
                'subdivisionStrategyDesc': "国内保险",
            },{//产品列表
                "productId":'2131',// 产品ID
                "productName":'productName',// 产品名称
                "minPurchaseAmount":'100',// 起投金额
                "investExpiration":'5个月', //投资期限
                "allocationAmount":'100', // 配置金额
                "allocationRatio":'0.1000',// 配置比例
                "productType":'173',// 产品类型
                "isPrivateSale":1, //私募产品在金服是否可售标识 1 私募可售 0 非私募可售
                "subdivisionStrategy":'www',  // 产品类别
                "sevenYearYield":'32',  // 七日年化收益率
            },{//产品列表
                "productId":'2131',// 产品ID
                "productName":'productName',// 产品名称
                "minPurchaseAmount":'100',// 起投金额
                "investExpiration":'5个月', //投资期限
                "allocationAmount":'100', // 配置金额
                "allocationRatio":'0.1000',// 配置比例
                "productType":'173',// 产品类型
                "isPrivateSale":1 ,//私募产品在金服是否可售标识 1 私募可售 0 非私募可售
                "subdivisionStrategy":'www',  // 产品类别
                "sevenYearYield":'32',  // 七日年化收益率
            },{//产品列表
                "productId":'2131',// 产品ID
                "productName":'productName',// 产品名称
                "minPurchaseAmount":'100',// 起投金额
                "investExpiration":'5个月', //投资期限
                "allocationAmount":'100', // 配置金额
                "allocationRatio":'0.1000',// 配置比例
                "productType":'177',// 产品类型
                "subdivisionStrategy":'www',  // 产品类别
                "sevenYearYield":'32',  // 七日年化收益率
            }
            ]
        },
    	{
        	'assetRatio': "0.6400",
            'assetType': "204",
            'assetTypeDesc': "固收投资产品",
        "productList":[{//产品列表
                "productId":'2131',// 产品ID
                "productName":'productName',// 产品名称
                "minPurchaseAmount":'100',// 起投金额
                "investExpiration":'5个月', //投资期限
                "allocationAmount":'100', // 配置金额
                "allocationRatio":'0.1000',// 配置比例
                "productType":'177',// 产品类型
                "subdivisionStrategy":'www',  // 产品类别
                "sevenYearYield":'32',  // 七日年化收益率
            },{//产品列表
                "productId":'2131',// 产品ID
                "productName":'productName',// 产品名称
                "minPurchaseAmount":'100',// 起投金额
                "investExpiration":'5个月', //投资期限
                "allocationAmount":'100', // 配置金额
                "allocationRatio":'0.1000',// 配置比例
                "productType":'200',// 产品类型
                "subdivisionStrategy":'www',  // 产品类别
                "sevenYearYield":'32',  // 七日年化收益率
            },{//产品列表
                "productId":'2131',// 产品ID
                "productName":'productName',// 产品名称
                "minPurchaseAmount":'100',// 起投金额
                "investExpiration":'5个月', //投资期限
                "allocationAmount":'100', // 配置金额
                "allocationRatio":'0.1000',// 配置比例
                "productType":'200',// 产品类型
                "subdivisionStrategy":'www',  // 产品类别
                "sevenYearYield":'32',  // 七日年化收益率
            },{//产品列表
                "productId":'2131',// 产品ID
                "productName":'productName',// 产品名称
                "minPurchaseAmount":'100',// 起投金额
                "investExpiration":'5个月', //投资期限
                "allocationAmount":'100', // 配置金额
                "allocationRatio":'0.1000',// 配置比例
                "productType":'200',// 产品类型
                "subdivisionStrategy":'www',  // 产品类别
                "sevenYearYield":'32',  // 七日年化收益率
            }
            ]
    	},
    	{
    	'assetRatio': "0.1400",
        'assetType': "205",
        'assetTypeDesc': "浮收投资产品",
    	},
    	{
    	"assetType": "200", //资产类别
    	"assetTypeDesc":  '保险产品', //资产类别中文描述
    	"assetRatio|1" :  '234.34' ,//建议投资占比
        "productList":[{//产品列表
                "productId":'2131',// 产品ID
                "productName":'productName',// 产品名称
                "minPurchaseAmount":'100',// 起投金额
                "investExpiration":'5个月', //投资期限
                "allocationAmount":'100', // 配置金额
                "allocationRatio":'0.1000',// 配置比例
                "productType":'200',// 产品类型
                "subdivisionStrategy":'www',  // 产品类别
                "sevenYearYield":'32',  // 七日年化收益率
            },{//产品列表
                "productId":'2131',// 产品ID
                "productName":'productName',// 产品名称
                "minPurchaseAmount":'100',// 起投金额
                "investExpiration":'5个月', //投资期限
                "allocationAmount":'100', // 配置金额
                "allocationRatio":'0.1000',// 配置比例
                "productType":'200',// 产品类型
                "subdivisionStrategy":'www',  // 产品类别
                "sevenYearYield":'32',  // 七日年化收益率
            },{//产品列表
                "productId":'2131',// 产品ID
                "productName":'productName',// 产品名称
                "minPurchaseAmount":'100',// 起投金额
                "investExpiration":'5个月', //投资期限
                "allocationAmount":'100', // 配置金额
                "allocationRatio":'0.1000',// 配置比例
                "productType":'200',// 产品类型
                "subdivisionStrategy":'www',  // 产品类别
                "sevenYearYield":'32',  // 七日年化收益率
            },{//产品列表
                "productId":'2131',// 产品ID
                "productName":'productName',// 产品名称
                "minPurchaseAmount":'100',// 起投金额
                "investExpiration":'5个月', //投资期限
                "allocationAmount":'100', // 配置金额
                "allocationRatio":'0.1000',// 配置比例
                "productType":'200',// 产品类型
                "subdivisionStrategy":'www',  // 产品类别
                "sevenYearYield":'32',  // 七日年化收益率
            }
            ]
    	},
    	// {
    	// "assetType": "5", //资产类别
    	// "assetTypeDesc":  '海外产品', //资产类别中文描述
    	// "assetRatio|1" : '234', //建议投资占比
    	// },
    	// {
    	// "assetType": "6", //资产类别
    	// "assetTypeDesc":  '家族办公室', //资产类别中文描述
    	// "assetRatio|1" : '1', //建议投资占比
    	// }
    ]
});


module.exports = data;