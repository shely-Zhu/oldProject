/*
	智能投顾-组合交易记录
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "处理成功！", 
	"data":
        {

           "totalCount":12,//总条数
           "totalPage":3,//总页数
            "comRradeRecordList|8":[{
				"applyDate":"2018-06-12",//申请日期
				"applyTime":"12:15:20",//申请时间
				"applySum":"10000",//申请金额
				"applySumMask":"10,000",//申请金额千分位
				"clientId":"456123",//客户编号
				"combCode":"25487",//组合编号
				"combName":"组合测试",//组合名称
				"combRequestNo":"1245",//组合申请编号
				"combinRedemRatio":"50",//赎回比例
				"fundBusinCode":"022",//业务代码
				"tradeAcco":"458621",//交易编号
				"combinationStatus":"1",//交易状态
				"combinationStatusMask":"已完成"//交易状态中文说明
            }]

        }
});

//把生成的假数据当做模块输出
module.exports = data;