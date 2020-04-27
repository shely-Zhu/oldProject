/*
 * @page: 
 * @Author: songxiaoyu
 * @Date:   2019-04-29 11:38:14
 * @Last Modified by:   songxiaoyu
 * @description:
 */

var Mock = require('mockjs');

//这里直接返回的就是JSON格式
var data = Mock.mock({
    "data": {
        "accountType": "0",
        "accreditedInvestor": 0,
        "accreditedInvestorValiddate": null,
        "buyFreeze": "0",
        "customerNo": 486472,
        "dealStatus": 0,
        "endurePri": "5",
        "endurePriDesc": "保守型",
        "endurePriIsold": 0,
        "endurePubIsold": 0,
        "endureValiddate": 1651075200000,
        "idnoCheckflag": 1,
        "investFavour": "1",
        "investFavourDic": "保守型",
        "isPerfect": 1,
        "isRiskEndure": 1,
        "knowevalPri": "",
        "lawFreezeStatus": 0,
        "newComer": "1",
        "orgAuth": 0,
        "outdateFreezeStatus": 0,
        "pu2prState": 0,
        "riskRank": "5",
        "riskRankName": "保守型",
        "saleFreeze": 0
    },
    "message": "操作成功！",
    "status": "0000"
});
module.exports = data;