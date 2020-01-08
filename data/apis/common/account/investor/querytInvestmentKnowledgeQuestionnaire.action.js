/*
 * @page: 投资知识问卷结果查询
 * @Author: songxiaoyu
 * @Date:   2018-07-16 19:38:47
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-07-24 10:45:08
 * @description:
 */
// 使用 Mock
var Mock = require('mockjs');

//这里直接返回的就是JSON格式
var querytInvestmentKnowledgeQuestionnaire = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "success",
    "data": {
        "isPass": "0", //投资知识问卷是否通过唯一表示             
    }
});
module.exports = querytInvestmentKnowledgeQuestionnaire;