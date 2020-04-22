//私募资产 净值明细mock数据
// 使用 Mock
var Mock = require('mockjs');

// var data = Mock.mock({
//     "status": "0000",
//     "message": "处理成功！",
//     "totalCount":"100",
//     "totalPages":"10",
//     "data": [{
//             "accuNetValue": "1.2304", //累计净值
//             "netValueBeginDate": "2016-08-09", //查询开始日期
//             "netValueEndDate": "2017-08-09", //查询结束日期
//             "unitNetValue":"单位净值",//单位净值
//             "netValueDate":"净值日期",//净值日期
//             "projectName": "项目名称",//项目名称
//             "unitNetValueGrowthRate":"+0.074%",//单位净值增长率
//         },
//         {
//             "accuNetValue": "1.2304", //累计净值
//             "netValueBeginDate": "2016-08-09", //查询开始日期
//             "netValueEndDate": "2017-08-09", //查询结束日期
//             "unitNetValue":"单位净值",//单位净值
//             "netValueDate":"净值日期",//净值日期
//             "projectName": "项目名称",//项目名称
//             "unitNetValueGrowthRate":"+0.074%",//单位净值增长率
//         },
//         {
//             "accuNetValue": "1.2304", //累计净值
//             "netValueBeginDate": "2016-08-09", //查询开始日期
//             "netValueEndDate": "2017-08-09", //查询结束日期
//             "unitNetValue":"单位净值",//单位净值
//             "netValueDate":"净值日期",//净值日期
//             "projectName": "项目名称",//项目名称
//             "unitNetValueGrowthRate":"+0.074%",//单位净值增长率
//         },
//     ]

// });
var data = Mock.mock({
    // "data": {
    //     "pageItems": { "totalCount": 3, "totalPages": 1 },
    //     "pageList|2": [
    //         { "accuNetChangePercent": "-9.35", "accuNetValue": "1.2631", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/11", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent|1": ["-84.11", "3", "2.234"], "unitNetValue": "0.1806", "unitNetValueGrowthRate": "-45.55" },
    //         // { "accuNetChangePercent": "-9.35", "accuNetValue": "0.9448", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/10", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-3", "unitNetValue": "0.3317", "unitNetValueGrowthRate": "-70.82" },
    //         // { "accuNetChangePercent": "-9.35", "accuNetValue": "1.3934", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/10", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "1.1367", "unitNetValueGrowthRate": "13.67" },
    //         // { "accuNetChangePercent": "-9.35", "accuNetValue": "1.2631", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/11", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "0.1806", "unitNetValueGrowthRate": "-45.55" },
    //         // { "accuNetChangePercent": "-9.35", "accuNetValue": "0.9448", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/10", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "0.3317", "unitNetValueGrowthRate": "-70.82" },
    //         // { "accuNetChangePercent": "-9.35", "accuNetValue": "1.3934", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/10", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "1.1367", "unitNetValueGrowthRate": "13.67" },
    //         // { "accuNetChangePercent": "-9.35", "accuNetValue": "1.2631", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/11", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "0.1806", "unitNetValueGrowthRate": "-45.55" },
    //         // { "accuNetChangePercent": "-9.35", "accuNetValue": "0.9448", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/10", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "0.3317", "unitNetValueGrowthRate": "-70.82" },
    //         // { "accuNetChangePercent": "-9.35", "accuNetValue": "1.3934", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/10", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "1.1367", "unitNetValueGrowthRate": "13.67" },
    //         // { "accuNetChangePercent": "-9.35", "accuNetValue": "1.2631", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/11", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "0.1806", "unitNetValueGrowthRate": "-45.55" },
    //         // { "accuNetChangePercent": "-9.35", "accuNetValue": "0.9448", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/10", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "0.3317", "unitNetValueGrowthRate": "-70.82" },
    //         // { "accuNetChangePercent": "-9.35", "accuNetValue": "1.3934", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/10", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "1.1367", "unitNetValueGrowthRate": "13.67" },
    //         // { "accuNetChangePercent": "-9.35", "accuNetValue": "1.2631", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/11", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "0.1806", "unitNetValueGrowthRate": "-45.55" }
    //     ]
    // }, 
    // "message": "操作成功！",
    // "status": "0000"

    "data":{
        "pageItems":{
            "totalCount":46,
            "totalPages":1
        },
        "pageList":[
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.5528",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2020/03/13",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.5528",
                "unitNetValueGrowthRate":"-6.27"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.6566",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2020/03/06",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.6566",
                "unitNetValueGrowthRate":"7.81"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.5366",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2020/02/28",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.5366",
                "unitNetValueGrowthRate":"-1.15"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.5545",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2020/02/21",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.5545",
                "unitNetValueGrowthRate":"7.56"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.4453",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2020/02/14",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.4453",
                "unitNetValueGrowthRate":"3.59"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.3952",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2020/02/07",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.3952",
                "unitNetValueGrowthRate":"2.04"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.3673",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2020/01/23",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.3673",
                "unitNetValueGrowthRate":"0.92"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.3548",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2020/01/17",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.3548",
                "unitNetValueGrowthRate":"-0.63"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.3634",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2020/01/10",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.3634",
                "unitNetValueGrowthRate":"6.64"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2785",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2020/01/03",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2785",
                "unitNetValueGrowthRate":"0.75"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2690",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/12/27",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2690",
                "unitNetValueGrowthRate":"4.45"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2149",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/12/20",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2149",
                "unitNetValueGrowthRate":"-2.5"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2460",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/12/13",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2460",
                "unitNetValueGrowthRate":"-0.46"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2518",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/12/06",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2518",
                "unitNetValueGrowthRate":"1.2"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2369",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/11/29",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2369",
                "unitNetValueGrowthRate":"-3.18"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2775",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/11/22",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2775",
                "unitNetValueGrowthRate":"-1.25"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2937",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/11/15",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2937",
                "unitNetValueGrowthRate":"1.32"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2769",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/11/08",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2769",
                "unitNetValueGrowthRate":"1.97"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2522",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/11/01",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2522",
                "unitNetValueGrowthRate":"1.49"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2338",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/10/25",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2338",
                "unitNetValueGrowthRate":"-0.46"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2395",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/10/18",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2395",
                "unitNetValueGrowthRate":"0.32"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2356",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/10/11",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2356",
                "unitNetValueGrowthRate":"0.41"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2305",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/09/30",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2305",
                "unitNetValueGrowthRate":"0.54"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2239",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/09/27",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2239",
                "unitNetValueGrowthRate":"-2.08"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2499",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/09/20",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2499",
                "unitNetValueGrowthRate":"0.58"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2427",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/09/12",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2427",
                "unitNetValueGrowthRate":"0.62"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2351",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/09/06",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2351",
                "unitNetValueGrowthRate":"-0.74"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2443",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/08/30",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2443",
                "unitNetValueGrowthRate":"-0.26"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2476",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/08/23",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2476",
                "unitNetValueGrowthRate":"0.21"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2450",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/08/16",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2450",
                "unitNetValueGrowthRate":"-0.66"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2533",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/08/09",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2533",
                "unitNetValueGrowthRate":"1.42"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2357",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/08/05",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2357",
                "unitNetValueGrowthRate":"0"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2357",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/08/02",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2357",
                "unitNetValueGrowthRate":"-0.58"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2429",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/07/26",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2429",
                "unitNetValueGrowthRate":"-0.86"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2537",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/07/19",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2537",
                "unitNetValueGrowthRate":"-0.88"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2648",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/07/12",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2648",
                "unitNetValueGrowthRate":"1.48"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2463",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/07/05",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2463",
                "unitNetValueGrowthRate":"-2.82"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2824",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/06/28",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2824",
                "unitNetValueGrowthRate":"1.16"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2677",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/06/21",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2677",
                "unitNetValueGrowthRate":"-2.37"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2985",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/06/14",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2985",
                "unitNetValueGrowthRate":"1.03"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2852",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/06/06",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2852",
                "unitNetValueGrowthRate":"0.48"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2791",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/05/31",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2791",
                "unitNetValueGrowthRate":"4.71"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2216",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/05/24",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2216",
                "unitNetValueGrowthRate":"0.3"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2179",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/05/17",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2179",
                "unitNetValueGrowthRate":"0.08"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.2169",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/05/10",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.2169",
                "unitNetValueGrowthRate":"7.37"
            },
            {
                "accuNetChangePercent":"38.95",
                "accuNetValue":"1.1334",
                "netValueBeginDate":"2019/04/27",
                "netValueDate":"2019/04/30    ",
                "netValueEndDate":"2020/04/21",
                "projectName":"",
                "unitNetChangePercent":"38.95",
                "unitNetValue":"1.1334",
                "unitNetValueGrowthRate":"13.34"
            }
        ]
    },
    "message":"操作成功！",
    "status":"0000"
})


module.exports = data;
