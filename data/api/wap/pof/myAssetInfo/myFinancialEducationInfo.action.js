/*
 * @page: 财商总资产
 * @Author: songxiaoyu
 * @Date:   2018-05-15 21:29:02
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-05-16 10:37:40
 * @description:接口提供方--吴海军
 */


var Mock = require('mockjs');

var data = Mock.mock({
    "msg": "success",
    "hmac": "hmac",
    "status": "0",
    "data": {
        "myTotalAsset": "1234.21", //财商总资产
        "myTotalAssetMask": "1234.21", //财商总资产说明
        "unConfirmedAsset": "1234.21", //待确认资产
        "unConfirmedAssetMask": "1234.21", //待确认资产说明
        "cumulativeProfit": "1234.34", //持仓收益
        "cumulativeProfitMask": "1234.21", //持仓收益说明
        "yesterdayProfit": "-12.23", //昨日收益
        "yesterdayProfitMask": "-12.23", //昨日收益说明
        "recommendFundList": [ //推荐基金
            {
                "fundType": "10300", //基金类型
                "fundLevel": "3", //基金级别
                "fundRiskLevelDescription": "低风险",
                "fundRiskLevel": "1",
                "fundStatusDescription": "正常开放",
                "fundCode": "000847",
                "incomeIndex": "七日年化收益",
                "purchaseMoney": "10000.00",
                "fundTypeDesc": "货币型",
                "fundStatus": "0",
                "fundName": "中融货币A",
                "incomeData": "3.7770%"
            },
            {
                "fundType": "10300", //基金类型
                "fundLevel": "3", //基金级别
                "fundRiskLevelDescription": "低风险",
                "fundRiskLevel": "1",
                "fundStatusDescription": "正常开放",
                "fundCode": "000847",
                "incomeIndex": "七日年化收益",
                "purchaseMoney": "10000.00",
                "fundTypeDesc": "货币型",
                "fundStatus": "0",
                "fundName": "中融货币A",
                "incomeData": "3.7770%"
            }
        ],
        "fundPositionList": [ //持仓明细
            {
                "fundStatus": "",
                "onwayAssetTotal": "",
                "fundCode": "003076",
                "fundName": "中融货币A",
                "totalMoney": "1059170.16",
                "totalMoneyMask": "6,878.09",
                "income": "30.89",
                "incomeMask": "21.65",
                "addupIncome": "115.80",
                "addupIncomeMask": "2,174.89",
                "addupIncomeRat": "5.8",
                "enableShares": "105.16",
                "currentShare": "1059.16",
                "nav": "105.16",
                "dayChgRat": "1059.16",
                "sevenDayYield": "4.13",
                "invTypCom": "10300",
                "inTransitNum": "0",
                "trDate": "2018-04-08",
                "unitYld": "1.20",
                "tradeNo": "",
                "bankAccount": "",
                "bankIdNo": "",
                "bankName": "",
                "riskLevel": "",
                "riskLevelName": "",
                "invTypComDesc": "混合型",
                "capitalMode": "M",
                "enMinshare": "",
                "estimateArrivalDate": "",
                "bankLogoUrl": "",
                "bankThumbnailUrl": "",
                "shareType": "",
                "tradeLimitList": [{
                    "fundBusinCode": "024",
                    "minValue": "",
                    "maxValue": "",
                    "secondMin": ""
                }]
            },
            {
                "fundStatus": "",
                "onwayAssetTotal": "",
                "fundCode": "003076",
                "fundName": "中融货币A",
                "totalMoney": "1059170.16",
                "totalMoneyMask": "6,878.99",
                "income": "30.89",
                "incomeMask": "21.65",
                "addupIncome": "115.80",
                "addupIncomeMask": "2,174.89",
                "addupIncomeRat": "5.8",
                "enableShares": "1059170.16",
                "currentShare": "1059.16",
                "nav": "1059.16",
                "dayChgRat": "1059.16",
                "sevenDayYield": "4.13",
                "invTypCom": "10300",
                "inTransitNum": "0",
                "trDate": "2018-04-08",
                "unitYld": "1.20",
                "tradeNo": "",
                "bankAccount": "",
                "bankIdNo": "",
                "bankName": "",
                "riskLevel": "",
                "riskLevelName": "",
                "invTypComDesc": "混合型",
                "capitalMode": "M",
                "enMinshare": "",
                "estimateArrivalDate": "",
                "bankLogoUrl": "",
                "bankThumbnailUrl": "",
                "shareType": "",
                "tradeLimitList": [{
                    "fundBusinCode": "024",
                    "minValue": "",
                    "maxValue": "",
                    "secondMin": ""
                }]
            }
        ],
        "totalCount": 0
    },
    
});

module.exports = data;