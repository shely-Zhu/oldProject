/*
  公募交易详情查询接口
  http://192.168.6.105:8090/pages/viewpage.action?pageId=9470018#id-%E5%85%AC%E5%8B%9FWEB%E6%A8%A1%E5%9D%97-16.%E9%87%91%E6%9C%8DWEB-%E4%BA%A4%E6%98%93%E8%AF%A6%E6%83%85%E6%9F%A5%E8%AF%A2
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock(
    {
        "data":{
            "applyId":"20200102005811",
            "bankAccount":"f743e034adf375c7a4dbf1725ddca572dee2768fa5d318c36f598819853312d5",
            "bankAccountMask":"623022******4622",
            "bankIdNo":"012",
            "bankLogoUrl":"http://www.img.chtwm.com/group2/M00/00/2E/CmQVXVuI0BCAQKqQAAAQIdV4nY8539.jpg",
            "bankName":"华夏银行",
            "bankThumbnailUrl":"http://www.img.chtwm.com/group2/M00/00/2E/CmQVXVuI0XuABh-rAAANKzFrWkU393.png",
            "cancelable":"1",
            "capitalMode":"M",
            "combinationFundInfo":[
    
            ],
            "confirmAmount":"500.00",
            "confirmDate":"2020-01-06",
            "confirmNav":"1.0000",
            "confirmRate":"0.00",
            "confirmShares":"500.00",
            "debitStatus":"1",
            "estimateArrivalDate":"2020-01-07",
            "estimateConfirmDate":"2020-01-06",
            "fundBusinCode":"020",
            "fundCode":"001388",
            "fundName":"中融新经济C",
            "fundStatus":"0",
            "fundType":"10400",
            "originalDate":"2020-01-03 10:27:06",
            "payModeName":"在线支付",
            "secondFundCode":"",
            "secondFundName":"",
            "tradeAmount":"500.00",
            "tradeApplyDesc":"买入失败",
            "tradeApplyDescMessage":"",
            "tradeDate":"2020-01-03 10:27:06",
            "tradeNo":"3974",
            "tradeShares":"0.00",
            "tradeStatus":"9",
            "isNewFund": true
        },
        "message":"操作成功！",
        "status":"0000"
    }
);

module.exports = data;