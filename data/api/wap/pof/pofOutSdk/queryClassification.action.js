/*
	投资者分类查询
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var queryClassification = Mock.mock({
    hmac: "", //预留字段
    msg: "success",
    code: "", //错误码
    status: "0",
    data: {
        pubProfFlag: "0" ,//分类标签：0-普通投资者 1-专业投资者,"" 没有选择
        dtauditFlag: "1",//复核状态  0 未复核1 复核通过 2 驳回
        rejectReason: "hehe,就是失败了" ,//驳回原因
        clientName:"张三",//用户名称
    }

});
module.exports = queryClassification;
