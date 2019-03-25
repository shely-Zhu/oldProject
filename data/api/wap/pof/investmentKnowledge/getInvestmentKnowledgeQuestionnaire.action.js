// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "success",
    "data": [
        {
            "totalCount": 0,
            "orderNo": "42",
            "questionNo": "42",
            "questionContent": "基金的预期收益是未来一定可以取得的收益",
            "totalQuestionCount": "5",
            "optionInfo": [{
                    "questionNo": "42",
                    "optionNo": "1",
                    "optionContent": "正确",
                    "optionScore": "0.00",
                    "orderNo": "1",
                    "totalOptionCount": "2"
                },
                {
                    "questionNo": "42",
                    "optionNo": "2",
                    "optionContent": "错误",
                    "optionScore": "1.00",
                    "orderNo": "2",
                    "totalOptionCount": "2"
                }
            ]
        },
        {
            "totalCount": 0,
            "orderNo": "43",
            "questionNo": "43",
            "questionContent": "投资者购买私募投资基金需向销售提供资产证明文件，满足合格投资者条件",
            "totalQuestionCount": "5",
            "optionInfo": [{
                    "questionNo": "43",
                    "optionNo": "1",
                    "optionContent": "正确",
                    "optionScore": "1.00",
                    "orderNo": "1",
                    "totalOptionCount": "2"
                },
                {
                    "questionNo": "43",
                    "optionNo": "2",
                    "optionContent": "错误",
                    "optionScore": "0.00",
                    "orderNo": "2",
                    "totalOptionCount": "2"
                }
            ]
        },
        {
            "totalCount": 0,
            "orderNo": "44",
            "questionNo": "44",
            "questionContent": "投资于单只私募投资基金的金额不得低于100万",
            "totalQuestionCount": "5",
            "optionInfo": [{
                    "questionNo": "44",
                    "optionNo": "1",
                    "optionContent": "正确",
                    "optionScore": "1.00",
                    "orderNo": "1",
                    "totalOptionCount": "2"
                },
                {
                    "questionNo": "44",
                    "optionNo": "2",
                    "optionContent": "错误",
                    "optionScore": "0.00",
                    "orderNo": "2",
                    "totalOptionCount": "2"
                }
            ]
        },
        {
            "totalCount": 0,
            "orderNo": "45",
            "questionNo": "45",
            "questionContent": "投资私募投资基金需要自行承担一定投资风险，销售机构不能向投资者承诺资金不受损失或最低收益",
            "totalQuestionCount": "5",
            "optionInfo": [{
                    "questionNo": "45",
                    "optionNo": "1",
                    "optionContent": "正确",
                    "optionScore": "1.00",
                    "orderNo": "1",
                    "totalOptionCount": "2"
                },
                {
                    "questionNo": "45",
                    "optionNo": "2",
                    "optionContent": "错误",
                    "optionScore": "0.00",
                    "orderNo": "2",
                    "totalOptionCount": "2"
                }
            ]
        },
        {
            "totalCount": 0,
            "orderNo": "46",
            "questionNo": "46",
            "questionContent": "投资者应尽量选择投资与自身风险承受能力相匹配的基金",
            "totalQuestionCount": "5",
            "optionInfo": [{
                    "questionNo": "46",
                    "optionNo": "1",
                    "optionContent": "正确",
                    "optionScore": "1.00",
                    "orderNo": "1",
                    "totalOptionCount": "2"
                },
                {
                    "questionNo": "46",
                    "optionNo": "2",
                    "optionContent": "错误",
                    "optionScore": "0.00",
                    "orderNo": "2",
                    "totalOptionCount": "2"
                }
            ]
        }
    ]
});

module.exports = data;