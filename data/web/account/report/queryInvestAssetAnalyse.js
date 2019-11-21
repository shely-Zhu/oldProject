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
    "data": {
	    "monthHoldShareList": [{
	    	'assetType': "204",
			'assetTypeDesc': "固收投资产品",
			'confirmValuePercent': "1.0000",
			'holdShareValue': "6500000.00",
	    	},
	    	{
	    	'assetType': "205",
			'assetTypeDesc': "浮收投资产品",
			'confirmValuePercent': "0.0000",
			'holdShareValue': "0.00",
	    	},
	    	{
	    	'assetType': "203",
			'assetTypeDesc': "货币类基金",
			'confirmValuePercent': "0.0000",
			'holdShareValue': "0.00",
	    	},
	    	// {
	    	// "assetType ": "4", //资产类别
	    	// "assetTypeDesc":  '保险产品', //资产类别中文描述
	    	// "confirmValuePercent" :  '234.34' //建议投资占比
	    	// },
	    	// {
	    	// "assetType ": "5", //资产类别
	    	// "assetTypeDesc":  '海外产品', //资产类别中文描述
	    	// "confirmValuePercent" : '234', //建议投资占比
	    	// },
	    	// {
	    	// "assetType ": "6", //资产类别
	    	// "assetTypeDesc":  '家族办公室', //资产类别中文描述
	    	// "confirmValuePercent" : '1', //建议投资占比
	    	// }
    	],
        // "monthHoldShareList":[],
        'currentMonthTotalValue':'9254.38',
        'lastMonthTotalHoldValue':'6850.87',
    }
    
});


module.exports = data;