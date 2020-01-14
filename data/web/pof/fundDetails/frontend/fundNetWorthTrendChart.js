/*
 * @page: 基金净值走势
 * @Author: tianjunguo
 * @Date:   2019-11-22 14:08:10
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2019-11-22 15:27:45
 * @description:
 */


// 使用 Mock
var Mock = require('mockjs');

/*var data = Mock.mock({"status": "1000", "data": [], "message": "数据为空"})*/

//1. 积分
var data = Mock.mock({
    "data": {
        "pageItems": {
            "totalCount": null,
            "totalPages": null
        },
        "pageList": [{
            "accuUnitNav": "1.7570",
            "annYldRat": "0.0000",
            "dayChgRat": "1.63",
            "fundType": "10400",
            "trdDt": "2019-12-16",
            "unitNav": "1.3120",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.7590",
            "annYldRat": "0.0000",
            "dayChgRat": "0.15",
            "fundType": "10400",
            "trdDt": "2019-12-17",
            "unitNav": "1.3140",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.7710",
            "annYldRat": "0.0000",
            "dayChgRat": "0.91",
            "fundType": "10400",
            "trdDt": "2019-12-18",
            "unitNav": "1.3260",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.7270",
            "annYldRat": "0.0000",
            "dayChgRat": "-3.32",
            "fundType": "10400",
            "trdDt": "2019-12-19",
            "unitNav": "1.2820",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.7090",
            "annYldRat": "0.0000",
            "dayChgRat": "-1.40",
            "fundType": "10400",
            "trdDt": "2019-12-20",
            "unitNav": "1.2640",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.6710",
            "annYldRat": "0.0000",
            "dayChgRat": "-3.01",
            "fundType": "10400",
            "trdDt": "2019-12-23",
            "unitNav": "1.2260",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.7100",
            "annYldRat": "0.0000",
            "dayChgRat": "3.18",
            "fundType": "10400",
            "trdDt": "2019-12-24",
            "unitNav": "1.2650",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.7560",
            "annYldRat": "0.0000",
            "dayChgRat": "3.64",
            "fundType": "10400",
            "trdDt": "2019-12-25",
            "unitNav": "1.3110",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.7330",
            "annYldRat": "0.0000",
            "dayChgRat": "-1.75",
            "fundType": "10400",
            "trdDt": "2019-12-26",
            "unitNav": "1.2880",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.6890",
            "annYldRat": "0.0000",
            "dayChgRat": "-3.42",
            "fundType": "10400",
            "trdDt": "2019-12-27",
            "unitNav": "1.2440",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.6890",
            "annYldRat": "0.0000",
            "dayChgRat": "0.00",
            "fundType": "10400",
            "trdDt": "2019-12-30",
            "unitNav": "1.2440",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.6880",
            "annYldRat": "0.0000",
            "dayChgRat": "-0.08",
            "fundType": "10400",
            "trdDt": "2019-12-31",
            "unitNav": "1.2430",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.7200",
            "annYldRat": "0.0000",
            "dayChgRat": "2.57",
            "fundType": "10400",
            "trdDt": "2020-01-02",
            "unitNav": "1.2750",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.6980",
            "annYldRat": "0.0000",
            "dayChgRat": "-1.73",
            "fundType": "10400",
            "trdDt": "2020-01-03",
            "unitNav": "1.2530",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.6940",
            "annYldRat": "0.0000",
            "dayChgRat": "-0.32",
            "fundType": "10400",
            "trdDt": "2020-01-06",
            "unitNav": "1.2490",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.6890",
            "annYldRat": "0.0000",
            "dayChgRat": "-0.40",
            "fundType": "10400",
            "trdDt": "2020-01-07",
            "unitNav": "1.2440",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.6800",
            "annYldRat": "0.0000",
            "dayChgRat": "-0.72",
            "fundType": "10400",
            "trdDt": "2020-01-08",
            "unitNav": "1.2350",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.7230",
            "annYldRat": "0.0000",
            "dayChgRat": "3.48",
            "fundType": "10400",
            "trdDt": "2020-01-09",
            "unitNav": "1.2780",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.7580",
            "annYldRat": "0.0000",
            "dayChgRat": "2.74",
            "fundType": "10400",
            "trdDt": "2020-01-10",
            "unitNav": "1.3130",
            "unitYld": "0.0000"
        }, {
            "accuUnitNav": "1.8320",
            "annYldRat": "0.0000",
            "dayChgRat": "5.64",
            "fundType": "10400",
            "trdDt": "2020-01-13",
            "unitNav": "1.3870",
            "unitYld": "0.0000"
        }],
        "totalCount": 20
    },
    "message": "操作成功！",
    "status": "0000"
});

module.exports = data;