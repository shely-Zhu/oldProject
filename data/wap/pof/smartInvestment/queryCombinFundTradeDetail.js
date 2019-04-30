/*
	智能投顾-组合赎回接口
*/

// 使用 Mock
var Mock = require('mockjs');


var data = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0000", 
	"msg": "success", 
	"data": {
	    "combinTradeInfo": 
             {
                "combCode":"25488",//组合编号
                "combName":"智能投顾1号",//组合名称
                "fundBusinCode":"12",//业务类型
                "applySum":"1000",//申请金额(买入金额)
                "applySumMask":"100",//申请金额千分位
                "tradeStatus":"1",//交易状态
				"tradeStatusMask":"已完成",//交易状态名称
				"payTypeMask":"在线支付",//支付方式名称
                "payType":"1",//支付方式
                "bankName":"光大银行",//银行名称
                "bankAccount":"",//银行卡号
                "bankAccountMask":"6547**********5645",//银行卡号
                "applyTime":"2018-10-14 12:35:55",//申请时间
                "tradeConfirmBalance":"511",//确认金额
                "tradeConfirmBalanceMask":"165",//确认金额千分位
                "fareSx":"124",//手续费
                "fareSxMask":"124.00",//手续费格式化显示
                "affirmDate":"2018-09-29"//确认日期
            } 
	}
});

//把生成的假数据当做模块输出
module.exports = data;