/*
  现金宝交易详情查询接口
  http://192.168.6.105:8090/pages/viewpage.action?pageId=9470018#id-%E5%85%AC%E5%8B%9FWEB%E6%A8%A1%E5%9D%97-8.%E9%87%91%E6%9C%8DWEB-%E6%81%92%E6%B7%BB%E5%AE%9D-%E4%BA%A4%E6%98%93%E8%AF%A6%E6%83%85%E6%9F%A5%E8%AF%A2
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "status": "0000",
    "message": "处理成功！",
    "data": {
      "allotNo": "20200525003785",
      "applyDateTime": "2020-05-25 13:46:42",
      "balance": "0.00",
      "balanceMask": "0.00",
      "bankAccount": "95ccb15329eac104fca4685ea82a3494dee2768fa5d318c36f598819853312d5",
      "bankAccountMask": "621485******4834",
      "bankLogoUrl": "http://www.img.chtwm.com/group2/M00/00/2E/CmQVXVuIz_6AfsKXAAAMv-9bE0c656.jpg",
      "bankName": "中国招商银行",
      "bankNo": "007",
      "bankThumbnailUrl": "http://www.img.chtwm.com/group2/M00/00/2E/CmQVXVuI0WiAQb9BAAASpyEhal4610.png",
      "errorMsg": "",
      "estimateDateStr": "2020-05-25",
      "estimateTimeStr": "15:46:42",
      "fundBusinCode": "098",
      "fundCode": "004865",
      "fundName": "格林日鑫月熠A",
      "ident": "2",
      "identDesc": "有效",
      "isEstimateDay": false,
      "isEstimateTime": false,
      "isPaymentGainsDay": false,
      "isStartGainsDay": false,
      "payType": "0",
      "paymentGainsDayStr": "",
      "shares": "1.00",
      "sharesMask": "1.00",
      "startGainsDayStr": "",
      "taconfirmFlag": "1",
      "tradeApplyDesc": "转出成功",
      "tradeApplyStatus": "23"
    }
});

module.exports = data;