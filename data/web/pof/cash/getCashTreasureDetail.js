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

        "tradeApplyStatus": "21",//交易状态

        "tradeApplyDesc": "转入失败",//交易状态描述

        "allotNo": "20161010000701",//申请编号

        "ident": "2",//扣款状态

        "identDesc": "有效",//扣款状态 中文描述

        "fundBusinCode": "022",//业务代码

        "taconfirmFlag": "1",//确认状态

        "fundCode": "003075",

        "fundName": "恒添宝",

        "startGainsDayStr": "2017-03-22",//预计开始计算收益时间（转入）

        "isStartGainsDay": true,//是否开始计算收益（转入）

        "paymentGainsDayStr": "2017-03-23",//预计收益到账时间（转入）

        "isPaymentGainsDay": true,//是否收益到账（转入）

        "estimateDateStr": "2017-02-22",//预计转出到账日期（转出）

        "isEstimateDay": false,//是否到账（转出-普通）

        "estimateTimeStr": "22:46:37",//预计转出到账时间（转出-快赎）

        "isEstimateTime": false,//是否赎回到账（转出-快赎）

        "applyDateTime": "2017-03-20 16:18:52", //客户申请时间

        "bankAccount": "6230221111111117",//银行账号 

        "bankName": "华夏银行",//银行名称

        "bankNo": "012",//银行编码

        "bankLogoUrl": "https://s.htjf.com/upload/htmall/images/content/2f313774-7886-42fa-8bc2-cb2098cd0c71.jpg",//地址

        "balance": "10000.00",//交易金额

        "balanceMask": "10,000.00",//交易金额千分位

        "shares": "0.00",//交易份额

        "sharesMask": "0.00", //交易份额千分位显示

        "errorMsg": "确认失败",//交易失败说明

        "payModeName": "在线支付",//支付方式

        "bankThumbnailUrl": "https://s.htjf.com/upload/htmall/images/content/2f313774-7886-42fa-8bc2-cb2098cd0c71.jpg",//银行卡logo链接

    }
});

module.exports = data;