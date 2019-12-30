// 认申购，下单页面点击提交按钮
var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    hmac:"", //预留字段
    msg: "success",
    code:"",//错误码
    status: "0000",
    data:[
        {
            bankAccout: "623588******5858",
            bankAccoutEncrypt: "a8aaeea2a60109214640266112f6896adee2768fa5d318c36f598819853312d5",
            bankLogoUrl: "http://www.img.chtwm.com/group2/M00/00/2E/CmQVXVuIz-yAMqWnAAAQZiNZTms635.jpg",
            bankName: "中国农业银行",
            bankNo: "003",
            bankThumbnailUrl: "http://www.img.chtwm.com/group2/M00/00/2E/CmQVXVuI0VeAMQrIAAAPayoj1Nw681.png",
            branchId: "103100000091",
            branchName: "中国农业银行迪拜人民币清算行",
            capitalMode: "1",
            enableAmount: 2001,
            fundAccount: "*0F000005718",
            fundCode: "000847",
            fundName: "中融货币A",
            shareClassify: "A",
            tradeAcco: "45345",
            tyBankNo: "3",
        },{
            bankAccout: "623022******7471",
            bankAccoutEncrypt: "7e68e99901ceb083c0987f55fb558318dee2768fa5d318c36f598819853312d5",
            bankLogoUrl: "http://www.img.chtwm.com/group2/M00/00/2E/CmQVXVuI0BCAQKqQAAAQIdV4nY8539.jpg",
            bankName: "华夏银行",
            bankNo: "012",
            bankThumbnailUrl: "http://www.img.chtwm.com/group2/M00/00/2E/CmQVXVuI0XuABh-rAAANKzFrWkU393.png",
            branchId: "304100000768",
            branchName: "华夏银行北京北沙滩支行",
            capitalMode: "M",
            enableAmount: 102163,
            fundAccount: "*0F000005718",
            fundCode: "000847",
            fundName: "中融货币A",
            shareClassify: "A",
            tradeAcco: "5718",
            tyBankNo: "17",
        }
    ]
});



//根据传参数的不同进行处理

module.exports = data;