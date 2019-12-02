/*
  月度报告持仓总览
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({    
    status:"0000",     
    message:"success", 
    // data: {
    //     "generalModelList": [//通用销售数据
    //         {
    //             "createTime": "20190619",//成立日期
    //             "fundCode": "100004",//产品编号
    //             "fundName": "普通货币型基金",//产品名称
    //             "totalAssets": 11.00//总资产
    //         }
    //     ],
    //     "pefSaleList": [//私募销售数据
    //         {
    //             "fundCode": "000846", //产品编号
    //             "fundName": "中融货币C",//产品名称
    //             "investPerformanceComparison": null,//业绩比较基准
    //             "marketValue": 4233.60,//参考市值
    //             "netValue": 1.00, //参考净值
    //             "totalAssets": 4233.60, //总资产
    //             "totalShares": 4233.60 //总份额
    //         },{
    //             "fundCode": "000846", //产品编号
    //             "fundName": "中融货币C",//产品名称
    //             "investPerformanceComparison": null,//业绩比较基准
    //             "marketValue": 4233.60,//参考市值
    //             "netValue": null, //参考净值
    //             "totalAssets": 4233.60, //总资产
    //             "totalShares": 4233.60 //总份额
    //         },{
    //             "fundCode": "000846", //产品编号
    //             "fundName": "中融货币C",//产品名称
    //             "investPerformanceComparison": '11.1',//业绩比较基准
    //             "marketValue": 4233.60,//参考市值
    //             "netValue": 1.00, //参考净值
    //             "totalAssets": 4233.60, //总资产
    //             "totalShares": 4233.60 //总份额
    //         },
    //         {
    //             "fundCode": "000846", //产品编号
    //             "fundName": "中融货币C",//产品名称
    //             "investPerformanceComparison": '11.1',//业绩比较基准
    //             "marketValue": 4233,//参考市值
    //             "netValue": null, //参考净值
    //             "totalAssets": 4233.60, //总资产
    //             "totalShares": 4233.60 //总份额
    //         }

    //     ],
    //     "pofList":[ {//公募数据 
    //             'fundCode': '000846', //产品编号
    //             'fundName': '中融货币C', //产品名称
    //             'totalAssets': '4233.60', //总资产
    //             'currentShare': '4233.60', //持有份额
    //             'netValue':'1.00',  //净值
    //             'marketValue':'1.00', //市值
    //             'netDate':'2019-5-31', //净值日期
    //         },
    //         {//公募数据 
    //             'fundCode': '000846', //产品编号
    //             'fundName': '中融货币C', //产品名称
    //             'totalAssets': '4233.60', //总资产
    //             'currentShare': '4233.60', //持有份额
    //             'netValue':'1.00',  //净值
    //             'marketValue':'1.00', //市值
    //             'netDate':'2019-5-31', //净值日期
    //         },
    //         {//公募数据 
    //             'fundCode': '000846', //产品编号
    //             'fundName': '中融货币C', //产品名称
    //             'totalAssets': '4233.60', //总资产
    //             'currentShare': '4233.60', //持有份额
    //             'netValue':'1.00',  //净值
    //             'marketValue':'1.00', //市值
    //             'netDate':'2019-5-31', //净值日期
    //         }
    //     ]

    // }
    data:{}
});

module.exports=data;