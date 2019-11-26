// 调仓申请详情


var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "hmac": "hmac",
    "status": "0000",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": [
        {
            "redeemInfo": 
            {//赎回信息
                "fundCode":"25488",//基金代码
                "fundName":"智能投顾1号",//基金名称
                "applyShare":"100",//申请份额
                "applyShareMask":"1000",//申请份额千分位
                "applySum":"100",//申请金额
                "applySumMask":"1000",//申请金额千分位
                "affirmDate":"2018-10-10",//确认日期
                "confirmFlag":"3",//确认标记
                "confirmFlagMask":"确认成功",//确认标记中文
                "fareSx":"25.00",//手续费
                "tradeConfirmNetvalue":"1.24",//确认净值
                "tradeConfirmShare":"165",//确认份额
                "tradeConfirmShareMask":"1,625",//确认份额千分位
                "tradeConfirmBalance":"10000",//确认金额
                "tradeConfirmBalanceMask":"10,000"//确认金额千分位
            },
            "purchaseInfo":
            {//买入信息
                "fundCode":"25489",
                "fundName":"智能投顾2号",
                "applyShare":"100",
                "applyShareMask":"1000",
                "applySum":"100",
                "applySumMask":"1000",
                "affirmDate":"2018-10-10",
                "confirmFlag":"1",
                "confirmFlagMask":"确认成功",
                "fareSx":"25.00",
                "tradeConfirmNetvalue":"1.24",
                "tradeConfirmShare":"165",
                "tradeConfirmShareMask":"1,625",
                "tradeConfirmBalance":"10000",
                "tradeConfirmBalanceMask":"10,000"
            }
        },
        {
            "redeemInfo": 
            {//赎回信息
                "fundCode":"25488",//基金代码
                "fundName":"智能投顾1号",//基金名称
                "applyShare":"100",//申请份额
                "applyShareMask":"1000",//申请份额千分位
                "applySum":"100",//申请金额
                "applySumMask":"1000",//申请金额千分位
                "affirmDate":"2018-10-10",//确认日期
                "confirmFlag":"0",//确认标记
                "confirmFlagMask":"确认失败",//确认标记中文
                "fareSx":"25.00",//手续费
                "tradeConfirmNetvalue":"1.24",//确认净值
                "tradeConfirmShare":"165",//确认份额
                "tradeConfirmShareMask":"1,625",//确认份额千分位
                "tradeConfirmBalance":"10000",//确认金额
                "tradeConfirmBalanceMask":"10,000"//确认金额千分位
            },
            "purchaseInfo":
            {//买入信息
                "fundCode":"25489",
                "fundName":"智能投顾2号",
                "applyShare":"100",
                "applyShareMask":"1000",
                "applySum":"100",
                "applySumMask":"1000",
                "affirmDate":"2018-10-10",
                "confirmFlag":"4",
                "confirmFlagMask":"确认失败",
                "fareSx":"25.00",
                "tradeConfirmNetvalue":"1.24",
                "tradeConfirmShare":"165",
                "tradeConfirmShareMask":"1,625",
                "tradeConfirmBalance":"10000",
                "tradeConfirmBalanceMask":"10,000"
            }
        },
        {
            "redeemInfo": 
            {//赎回信息
                "fundCode":"25488",//基金代码
                "fundName":"智能投顾1号",//基金名称
                "applyShare":"100",//申请份额
                "applyShareMask":"1000",//申请份额千分位
                "applySum":"100",//申请金额
                "applySumMask":"1000",//申请金额千分位
                "affirmDate":"2018-10-10",//确认日期
                "confirmFlag":"5",//确认标记
                "confirmFlagMask":"下单成功",//确认标记中文
                "fareSx":"25.00",//手续费
                "tradeConfirmNetvalue":"1.24",//确认净值
                "tradeConfirmShare":"165",//确认份额
                "tradeConfirmShareMask":"1,625",//确认份额千分位
                "tradeConfirmBalance":"10000",//确认金额
                "tradeConfirmBalanceMask":"10,000"//确认金额千分位
            },
            "purchaseInfo":
            {//买入信息
                "fundCode":"25489",
                "fundName":"智能投顾2号",
                "applyShare":"100",
                "applyShareMask":"1000",
                "applySum":"100",
                "applySumMask":"1000",
                "affirmDate":"2018-10-10",
                "confirmFlag":"9",
                "confirmFlagMask":"下单成功",
                "fareSx":"25.00",
                "tradeConfirmNetvalue":"1.24",
                "tradeConfirmShare":"165",
                "tradeConfirmShareMask":"1,625",
                "tradeConfirmBalance":"10000",
                "tradeConfirmBalanceMask":"10,000"
            }
    }
]
});
//把生成的假数据当做模块输出
module.exports = data; 
