// 使用 Mock
var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    hmac:"", //预留字段
    msg: "success",
    code:"",//错误码
    status: "0",
    data: {
        "operationType":"2",//操作类型
        "managementFee":"1.50", //管理费率
        "custodyFee":"0.25", //托管费率
        "salesFee":"--", //销售服务费率
        "redeemTime":"2",//赎回时长
        "purchaseConfirmDay":"5",//认申购确认天数
		"fundToAccountDay":"2",//赎回资金到账日
		"checkShareDay": "5", //查看份额日
        "detailList":[{
	        "conditions":"0年<持有时长<1年",//条件
	        "fundFeeRate":"0.50"//费率
	    },{
	        "conditions":"0年<持有时长<1年",//条件
	        "fundFeeRate":"0.50"//费率
	    },{
	        "conditions":"0年<持有时长<1年",//条件
	        "fundFeeRate":"0.50"//费率
	    },{
	        "conditions":"0年<持有时长<1年",//条件
	        "fundFeeRate":"0.50"//费率
	    }]
    }
});



//根据传参数的不同进行处理

module.exports = data;