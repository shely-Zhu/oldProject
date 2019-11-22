/*
  公墓---交易明细
*/
// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "status": "0000",
    "message": "处理成功！",
    "data": {
        "pageItems": {
            "totalCount":"" , //多少条
            "totalPages":"", //多少页
        },
        "pageList|5": [
            {           
                "fundName": "新沃货币", //基金名称           
                "tradeApplyStatus": "0", //交易状态           
                "tradeApplyDesc": "交易失败", //交易状态描述           
                "fundCode": "001916", //基金代码            
                "balance": "10000.00", //发生金额           
                "shares": "0.00", //发生份额           
                "applyDate": "2016-10-11", //申请日期           
                "applyTime": "09:30:00", //申请时间           
                "orderDate": "09:34:58", //下单时间（原申请日期+下单时间=购买时间）           
                "originalDate": "2016-11-02", //下单日期（原申请日期+下单时间=购买时间）           
                "fundBusinCode": "022", //业务代码            
                "allotNo": "20161010000301", //申请编号           
                "taconfirmFlag": "9", //确认表示          
                "deductStatus": "1", //扣款状态          
                "applyType": "1",            
                "fixbusinflag": "04", //辅助业务代码（货基购基添加）
            
            },{           
                "fundName": "新沃货币", //基金名称           
                "tradeApplyStatus": "0", //交易状态           
                "tradeApplyDesc": "交易失败", //交易状态描述           
                "fundCode": "001916", //基金代码            
                "balance": "10000.00", //发生金额           
                "shares": "0.00", //发生份额           
                "applyDate": "2016-10-11", //申请日期           
                "applyTime": "09:30:00", //申请时间           
                "orderDate": "09:34:58", //下单时间（原申请日期+下单时间=购买时间）           
                "originalDate": "2016-11-02", //下单日期（原申请日期+下单时间=购买时间）           
                "fundBusinCode": "022", //业务代码            
                "allotNo": "20161010000301", //申请编号           
                "taconfirmFlag": "9", //确认表示          
                "deductStatus": "1", //扣款状态          
                "applyType": "1",            
                "fixbusinflag": "04", //辅助业务代码（货基购基添加）
                
            },{           
                "fundName": "新沃货币", //基金名称           
                "tradeApplyStatus": "0", //交易状态           
                "tradeApplyDesc": "交易失败", //交易状态描述           
                "fundCode": "001916", //基金代码            
                "balance": "10000.00", //发生金额           
                "shares": "0.00", //发生份额           
                "applyDate": "2016-10-11", //申请日期           
                "applyTime": "09:30:00", //申请时间           
                "orderDate": "09:34:58", //下单时间（原申请日期+下单时间=购买时间）           
                "originalDate": "2016-11-02", //下单日期（原申请日期+下单时间=购买时间）           
                "fundBusinCode": "022", //业务代码            
                "allotNo": "20161010000301", //申请编号           
                "taconfirmFlag": "9", //确认表示          
                "deductStatus": "1", //扣款状态          
                "applyType": "1",            
                "fixbusinflag": "04", //辅助业务代码（货基购基添加）               
            },
            
            ]
        },

});

module.exports = data;