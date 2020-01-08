/*
	历史净值 净值走势图
 */

// 使用 Mock
var Mock = require('mockjs');

/*var financial = Mock.mock({"data":"","message":"操作成功,数据为空","status":"1000"})*/
//这里直接返回的就是JSON格式
var financial = Mock.mock({
　　"status":"0000",
　　"msg":"success",
　　"data": {
　　　　"totalCount": 20,
        "totalPage": 10,
　　　　 "pageList|10":[{
　　　　　　　"totalCount":0,
　　　　　　　"id":"4721026424",
　　　　　　　"planPublishDate":"2017-12-04", //预案公布日
            "equityRegistrationDate":"2017-12-07",//股权登记日
　　　　　　　"dividendAmountBeforeTaxRMB":"0.08",//每份税前派现金额（人民币）（元）
　　　　　　　"dividendAmountAfterTaxRMB":"0.08",//每份税后派现金额（人民币）（元）
　　　　　　　"dividendNum":"20",//成立以来累计分红次数
　　　　　　　"accuCash":2.411,//成立以来每份累计分红（元）
　　　　　　　"dividendToAccountDate":"",//红利到帐日
             "dividendOfDate":"2018-04-24",//"分红日期"
　　　　　　　"dividendToShareDate":"",//份额结转日
　　　　　　　"exRdDtOtc":"2017-12-07" //场外除息日
　　　　}]
　　}
});


module.exports=financial;