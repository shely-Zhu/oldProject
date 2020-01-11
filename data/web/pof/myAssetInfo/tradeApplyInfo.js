/*
  公募交易详情查询接口
  http://192.168.6.105:8090/pages/viewpage.action?pageId=9470018#id-%E5%85%AC%E5%8B%9FWEB%E6%A8%A1%E5%9D%97-16.%E9%87%91%E6%9C%8DWEB-%E4%BA%A4%E6%98%93%E8%AF%A6%E6%83%85%E6%9F%A5%E8%AF%A2
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock(
  {
    "data":{
        "accountAmount":"",
        "applyId":"20200110000885",
        "bankAccount":"bbfa1d511f82b8d6ac48bbd5fa0221a7dee2768fa5d318c36f598819853312d5",
        "bankAccountMask":"621483******7988",
        "bankIdNo":"007",
        "bankLogoUrl":"http://www.img.chtwm.com/group2/M00/00/2E/CmQVXVuIz_6AfsKXAAAMv-9bE0c656.jpg",
        "bankName":"招商银行",
        "bankThumbnailUrl":"http://www.img.chtwm.com/group2/M00/00/2E/CmQVXVuI0WiAQb9BAAASpyEhal4610.png",
        "cancelable":"1",
        "capitalMode":"K",
        "combinationFundInfo":[

        ],
        "confirmAmount":"5,000,000.00",
        "confirmDate":"2020-01-12",
        "confirmNav":"1.0000",
        "confirmRate":"0.00",
        "confirmShares":"5,000,000.00",
        "debitStatus":"0",
        "estimateArrivalDate":"2020-01-13",
        "estimateConfirmDate":"2020-01-12",
        "fundBusinCode":"022",
        "fundCode":"000846",
        "fundName":"中融货币C",
        "fundStatus":"0",
        "fundType":"10300",
        "isNewFund":0,
        "originalDate":"2020-01-11 10:37:26",
        "payModeName":"汇款支付",
        "secondFundCode":"000847",
        "secondFundName":"中融货币A",
        "tradeAmount":"5,000,000.00",
        "tradeApplyDesc":"等待汇款",
        "tradeApplyDescMessage":"",
        "tradeDate":"2020-01-11 10:37:26",
        "tradeNo":"10100660",
        "tradeShares":"0.00",
        "tradeStatus":"9"
    },
    "message":"操作成功！",
    "status":"0000"
}
);

module.exports = data;