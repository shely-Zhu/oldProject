/*
  超宝基金产品-交易记录
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({ 
	"status": "0000",
    "message": "操作成功",
	data: { 
        "list":[

            {
            
            "tradeApplyStatus":"21",//交易状态
            
            "tradeApplyDesc":"转入失败",//交易状态描述
            
            "balance":"10000.00",//发生金额
            
            "balanceMask":"1,000.00",//发生金额千分位显示 
            
            "shares":"0.00",//发生份额
            
            "sharesMask":"0.00",//发生份额千分位显示
            
            "originalDate":"2016-10-11",//原申请日期 (原申请日期+下单时间=购买时间)
            
            "orderDate":"09:30:00",//下单时间 (原申请日期+下单时间=购买时间)
            
            "fundBusinCode":"022",//业务代码
            
            "allotNo":"20161010000301",//申请编号
            
            "taconfirmFlag":"9",//确认表示状态
            
            "deductStatus":"1", //扣款状态 
            
            "fundCode": "003075",
            
            "shareType":"A",//份额分类 A 前收费 B 后收费
            
            "fundName": "恒添宝"
            
            },
            
	 	], 
	 	"pageNum":1,

        "pageSize":10,

        "total":500
	}, 
});

module.exports=data;