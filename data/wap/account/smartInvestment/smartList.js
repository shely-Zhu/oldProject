/*
 * @page: 智能投顾-银行卡列表
 * @Author: songxiaoyu
 * @Date:   2018-10-16 15:02:13
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-11-06 16:35:52
 * @description:
 */
// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "data": {
        "highGroupBuyAmount": "999999999.00",
        "highGroupBuyAmountMask": "999,999,999.00",
        "lowGroupBuyAmount": "2000.00",
        "lowGroupBuyAmountMask": "2,000.00",
        "pageItems": { "totalCount": null, "totalPages": null },
        "pageList": [{
            "accountName": "湛才人",
            "accountNameMask": "**人",
            "authentication": "1",
            "bankAccount": "",
            "bankAccountMask": "623022******1067",
            "bankAccountSecret": "7818c04b8f15196854065c461c68c36edee2768fa5d318c36f598819853312d5",
            "bankChanel": "M",
            "bankLogoUrl": "http://www.img.chtwm.com/group2/M00/00/2E/CmQVXVuI0BCAQKqQAAAQIdV4nY8539.jpg",
            "bankName": "华夏银行",
            "bankNo": "012",
            "bankThumbnailUrl": "http://www.img.chtwm.com/group2/M00/00/2E/CmQVXVuI0XuABh-rAAANKzFrWkU393.png",
            "branchNo": "304100000768",
            "capitalMode": "M",
            "cityId": "10569",
            "cityName": "北京市",
            "disableFlag": "0",
            "idNo": "371312197810094511",
            "idNoMask": "**************4511",
            "idNoType": "0",
            "isPub": "2",
            "mobile": "13871223180",
            "oneDayNum": "1000000",
            "oneDayNumMask": "1,000,000",
            "oneMonthNum": "5000000",
            "oneMonthNumMask": "5,000,000",
            "priTradeAcco": "",
            "provinceId": "0",
            "provinceName": "北京市",
            "show": true,
            "singleNum": "500000",
            "singleNumMask": "500,000",
            "subBranch": "华夏银行北京北沙滩支行",
            "tradeAcco": "5022",
            "tradeAccountList": [{ "branchNo": "304100000768", "capitalMode": "M", "tradeAcco": "5022", "tradeSource": "", "transAcctStatus": "0" }],
            "tradeSource": "",
            "tyBankNo": ""
        }]
    },
    "message": "操作成功！",
    "status": "0000"
});

//把生成的假数据当做模块输出
module.exports = data;