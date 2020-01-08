/*
	专题模板
*/


// 使用 Mock
var Mock = require('mockjs');


var pOver = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "处理成功！", 
	"data": {
		"id":"",//专题Id 
		"groupType":"",//专题类别（公募：publicOffering，私募：privatePlacement） 
		"name":"xxxxxx",//专题名称 
		"imgUrlThumbnail":"",//专题图片

		"imgUrlFeatureDetail":"https://s.hengtianjf.com//upload/htmall/images/banner/7c06b2e3-c380-4288-ad9f-3951e1441b80.jpg",//专题详情图片

		"recommend":"",//推荐文案（未登录时使用）

		"serialNumber":"",//排列序号

		"releaseDate": "2017-02-22" ,//发布日期

        "isCheckLogin":"1",

        "isCheckRisk" : "1",

		"productFeatureList": [//产品列表（最多10条）
            {
                "productCode": "0003FE",//产品代码
                "productName": "恒天财富稳盛23号私募投资基金（九期）",//产品名称
                "pofType":"",//公募产品类型
                "pofGains": "-2.32",//公募近一年收益（%）
                "pefType": "2",//私募收益类型
                "pefTerm": "3",//私募投资期限（月）
                "pefMinBalance": "100",//私募起投金额（万元）

                "pefExpectedProfitMin": "2",//私募固收预期最低

                "pefExpectedProfitMax": "6",//私募固收预期最高
                "pefCloseDay": "3",//封闭期（月）
                "pefNetValue": "",//私募浮收净值

                "pefNetValueDate": "",//私募浮收净值日期
            },
            {
                "productCode": "0003FE",//产品代码
                "productName": "恒天财富稳盛23号私募投资基金（九期）",//产品名称
                "pofType":"",//公募产品类型
                "pofGains": "-2.32",//公募近一年收益（%）
                "pefType": "2",//私募收益类型
                "pefTerm": "3",//私募投资期限（月）
                "pefMinBalance": "100",//私募起投金额（万元）

                "pefExpectedProfitMin": "2",//私募固收预期最低

                "pefExpectedProfitMax": "6",//私募固收预期最高
                "pefCloseDay": "3",//封闭期（月）
                "pefNetValue": "",//私募浮收净值

                "pefNetValueDate": "",//私募浮收净值日期
            }
        ]

	}
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;
