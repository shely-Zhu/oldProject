/*
  热门诊断基金搜索
  http://192.168.6.105:8090/pages/viewpage.action?pageId=8695660#id-%E5%85%AC%E5%8B%9F%E6%A8%A1%E5%9D%97%E6%8E%A5%E5%8F%A3-4.%E9%A6%96%E9%A1%B5-%E5%9F%BA%E9%87%91%E5%88%97%E8%A1%A8
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "data": {
        "pageList|10": [{
                "fiveYearGainsOfFix": "--",
                "fmcComId": "0484D3106D",
                "fmcComName": "中海基金",
                "fourYearGainsOfFix": "--",
                "frrPubDt": "",
                "fundStatus": "",
                "invTypCom": "10200",
                "issBgnDt": "2013-02-25",
                "issEndDt": "2013-03-15",
                "oneDayGains": "-1.65",
                "oneMonthGains": "6.22",
                "oneWeekGains": "0.14",
                "oneYearGains": "7.50",
                "oneYearGainsOfFix": "--",
                "psnName": "",
                "publicFundsKeyWords": "",
                "purSt": "",
                "secuId": "000004.OF",
                "secuSht": "中海可转换债券C",
                "sevenDayYield": "--",
                "sinceBeginGains": "-15.70",
                "sinceThisYearGains": "13.27",
                "sixMonthGains": "13.45",
                "sortColumn": "",
                "sortType": "",
                "starCode": "1.0000",
                "tenThousandEarnings": "--",
                "threeMonthGains": "-10.49",
                "threeYearGainsOfFix": "--",
                "trdCode": "000004",
                "trdDt": "",
                "trdDtFmt": "",
                "trdDtShort": "",
                "twoYearGainsOfFix": "--",
                "unitNav": "0.7170"
            },{
                "fiveYearGainsOfFix": "--",
                "fmcComId": "0484D3106D",
                "fmcComName": "中海基金",
                "fourYearGainsOfFix": "--",
                "frrPubDt": "",
                "fundStatus": "",
                "invTypCom": "10200",
                "issBgnDt": "2013-02-25",
                "issEndDt": "2013-03-15",
                "oneDayGains": "-1.65",
                "oneMonthGains": "6.22",
                "oneWeekGains": "0.14",
                "oneYearGains": "7.50",
                "oneYearGainsOfFix": "--",
                "psnName": "",
                "publicFundsKeyWords": "",
                "purSt": "",
                "secuId": "000004.OF",
                "secuSht": "中海可转换债券C",
                "sevenDayYield": "--",
                "sinceBeginGains": "-15.70",
                "sinceThisYearGains": "13.27",
                "sixMonthGains": "13.45",
                "sortColumn": "",
                "sortType": "",
                "starCode": "1.0000",
                "tenThousandEarnings": "--",
                "threeMonthGains": "-10.49",
                "threeYearGainsOfFix": "--",
                "trdCode": "121212",
                "trdDt": "",
                "trdDtFmt": "",
                "trdDtShort": "",
                "twoYearGainsOfFix": "--",
                "unitNav": "0.7170"
            },
        ],
        "totalCount": 20
    },
    "message": "操作成功！",
    "status": "0000"
});

module.exports = data;