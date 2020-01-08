/*
	投资者分类查询
 */

// 使用 Mock
var Mock = require('mockjs');

//这里直接返回的就是JSON格式
var queryClassification = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
        "name": "呵呵",
        "investType": "1", //当前申请中的投资分类【0.专业投资者；1.普通投资者】
        "auditStatus": "", //审核状态【参照备注】  1：待审核 3：审核失败
        "auditStatusDic": "", //审核状态字典值
        "auditOption": "hehe,失败了", //审核驳回原因
        "auditDate": "2016-11-07",//审核日期
        "currentClassification": "0", //当前投资者类型 0 普通
        "currentClassificationDic": "" //当前投资者类型字典值
    }
});
module.exports = queryClassification;
