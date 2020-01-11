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
    "data": {
        "pageItems": { "totalCount": 3, "totalPages": 1 },
        "pageList|2": [
            { "accuNetChangePercent": "-9.35", "accuNetValue": "1.2631", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/11", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent|1": ["-84.11", "3", "2.234"], "unitNetValue": "0.1806", "unitNetValueGrowthRate": "-45.55" },
            // { "accuNetChangePercent": "-9.35", "accuNetValue": "0.9448", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/10", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-3", "unitNetValue": "0.3317", "unitNetValueGrowthRate": "-70.82" },
            // { "accuNetChangePercent": "-9.35", "accuNetValue": "1.3934", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/10", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "1.1367", "unitNetValueGrowthRate": "13.67" },
            // { "accuNetChangePercent": "-9.35", "accuNetValue": "1.2631", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/11", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "0.1806", "unitNetValueGrowthRate": "-45.55" },
            // { "accuNetChangePercent": "-9.35", "accuNetValue": "0.9448", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/10", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "0.3317", "unitNetValueGrowthRate": "-70.82" },
            // { "accuNetChangePercent": "-9.35", "accuNetValue": "1.3934", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/10", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "1.1367", "unitNetValueGrowthRate": "13.67" },
            // { "accuNetChangePercent": "-9.35", "accuNetValue": "1.2631", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/11", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "0.1806", "unitNetValueGrowthRate": "-45.55" },
            // { "accuNetChangePercent": "-9.35", "accuNetValue": "0.9448", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/10", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "0.3317", "unitNetValueGrowthRate": "-70.82" },
            // { "accuNetChangePercent": "-9.35", "accuNetValue": "1.3934", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/10", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "1.1367", "unitNetValueGrowthRate": "13.67" },
            // { "accuNetChangePercent": "-9.35", "accuNetValue": "1.2631", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/11", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "0.1806", "unitNetValueGrowthRate": "-45.55" },
            // { "accuNetChangePercent": "-9.35", "accuNetValue": "0.9448", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/10", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "0.3317", "unitNetValueGrowthRate": "-70.82" },
            // { "accuNetChangePercent": "-9.35", "accuNetValue": "1.3934", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/10", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "1.1367", "unitNetValueGrowthRate": "13.67" },
            // { "accuNetChangePercent": "-9.35", "accuNetValue": "1.2631", "netValueBeginDate": "2019/08/24", "netValueDate": "2019/10/11", "netValueEndDate": "2019/11/22", "projectName": "", "unitNetChangePercent": "-84.11", "unitNetValue": "0.1806", "unitNetValueGrowthRate": "-45.55" }
        ]
    }, 
    "message": "操作成功！",
    "status": "0000"
})


module.exports = data;
