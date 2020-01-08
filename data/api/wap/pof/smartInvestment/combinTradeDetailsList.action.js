/*
	智能投顾-组合资产交易详情(买入/赎回)
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "success", 
	"data": {
        "combinTradeDetailsList": [
             {
                "fundCode":"25488",//基金编号
                "fundName":"智能投顾1号",//基金名称
                "applyShare":"100",//申请份额
                "applyShareMask":"1000.00",//申请份额千分位显示
                "applySum":"100",//申请份额
                "applySumMask":"1000",//申请金额千分位显示
                "affirmDate":"2018-10-10",//确认日期
                "confirmFlag":"1",//确认标志 
                "confirmFlagMask":"确认成功",//确认标志说明
                "fareSx":"25",//手续费
                "tradeConfirmNetvalue":"1.24",//确认净值
                "tradeConfirmShare":"165",//确认份额
                "tradeConfirmShareMask":"1,625",//确认份额千分位展示
                "tradeConfirmBalance":"10000",//确认金额
                "tradeConfirmBalanceMask":"10,000"//确认金额千分位展示
            },{
                "fundCode":"25488",//基金编号
                "fundName":"智能投顾1号",//基金名称
                "applyShare":"100",//申请份额
                "applyShareMask":"1000",//申请份额千分位显示
                "applySum":"100",//申请份额
                "applySumMask":"1000",//申请金额千分位显示
                "affirmDate":"2018-10-10",//确认日期
                "confirmFlag":"0",//确认标志 
                "confirmFlagMask":"确认成功",//确认标志说明
                "fareSx":"25",//手续费
                "tradeConfirmNetvalue":"1.24",//确认净值
                "tradeConfirmShare":"165",//确认份额
                "tradeConfirmShareMask":"1,625",//确认份额千分位展示
                "tradeConfirmBalance":"10000",//确认金额
                "tradeConfirmBalanceMask":"10,000"//确认金额千分位展示
            },{
                "fundCode":"25488",//基金编号
                "fundName":"智能投顾1号",//基金名称
                "applyShare":"100",//申请份额
                "applyShareMask":"1000",//申请份额千分位显示
                "applySum":"100",//申请份额
                "applySumMask":"1000",//申请金额千分位显示
                "affirmDate":"2018-10-10",//确认日期
                "confirmFlag":"9",//确认标志 
                "confirmFlagMask":"确认成功",//确认标志说明
                "fareSx":"25",//手续费
                "tradeConfirmNetvalue":"1.24",//确认净值
                "tradeConfirmShare":"165",//确认份额
                "tradeConfirmShareMask":"1,625",//确认份额千分位展示
                "tradeConfirmBalance":"10000",//确认金额
                "tradeConfirmBalanceMask":"10,000"//确认金额千分位展示
            },{
                "fundCode":"25488",//基金编号
                "fundName":"智能投顾1号",//基金名称
                "applyShare":"100",//申请份额
                "applyShareMask":"1000",//申请份额千分位显示
                "applySum":"100",//申请份额
                "applySumMask":"1000",//申请金额千分位显示
                "affirmDate":"2018-10-10",//确认日期
                "confirmFlag":"2",//确认标志 
                "confirmFlagMask":"确认成功",//确认标志说明
                "fareSx":"25",//手续费
                "tradeConfirmNetvalue":"1.24",//确认净值
                "tradeConfirmShare":"165",//确认份额
                "tradeConfirmShareMask":"1,625",//确认份额千分位展示
                "tradeConfirmBalance":"10000",//确认金额
                "tradeConfirmBalanceMask":"10,000"//确认金额千分位展示
            },
        ]
	}
});

//把生成的假数据当做模块输出
module.exports = data;
