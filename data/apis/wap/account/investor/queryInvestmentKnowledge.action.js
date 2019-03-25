/*
风险测评调查问卷
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var queryInvestmentKnowledge = Mock.mock(   
{
    "hmac":"hmac", //预留字段
    "msg": "success",
    "code":"CS0000",//错误码
    "status": "0",
    "data": [
      {
             "orderNo":"1",// 序号
             "questionNo":"1",// 题号
             "questionContent":"投资者购买私募投资基金须向销售提供资产证明，满足合格投资者条件",// 题目
             "totalQuestionCount":"",// 总题数
             "optionInfo":[ // 选项信息
                  {
                        "questionNo":"1",// 题号
                        "optionNo":"1",// 选项编号
                        "optionContent":"正确",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },
                  {
                        "questionNo":"1",// 题号
                        "optionNo":"2",// 选项编号
                        "optionContent":"错误",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   }
             ]
       }
       ,{
             "orderNo":"2",// 序号
             "paperId":"2", //问卷编号
             "questionNo":"2",// 题号
             "questionContent":"投资者购买私募投资基金须向销售提供资产证明，满足合格投资者条件",// 题目
             "totalQuestionCount":"",// 总题数
             "optionInfo":[ // 选项信息
                  {
                        "questionNo":"2",// 题号
                        "optionNo":"1",// 选项编号
                        "optionContent":"正确",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },
                  {
                        "questionNo":"2",// 题号
                        "optionNo":"2",// 选项编号
                        "optionContent":"错误",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   }
             ]
       },{
             "orderNo":"3",// 序号
             "paperId":"3", //问卷编号
             "questionNo":"3",// 题号
             "questionContent":"投资者购买私募投资基金须向销售提供资产证明，满足合格投资者条件",// 题目
             "totalQuestionCount":"",// 总题数
             "optionInfo":[ // 选项信息
                  {
                        "questionNo":"3",// 题号
                        "optionNo":"1",// 选项编号
                        "optionContent":"正确",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },
                  {
                        "questionNo":"3",// 题号
                        "optionNo":"2",// 选项编号
                        "optionContent":"错误",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   }
             ]
       }
       // ,{
       //       "orderNo":"4",// 序号
       //       "paperId":"4", //问卷编号
       //       "questionNo":"4",// 题号
       //       "questionContent":"投资者购买私募投资基金须向销售提供资产证明，满足合格投资者条件",// 题目
       //       "totalQuestionCount":"",// 总题数
       //       "optionInfo":[ // 选项信息
       //            {
       //                  "questionNo":"4",// 题号
       //                  "optionNo":"1",// 选项编号
       //                  "optionContent":"正确",// 选项内容
       //                  "optionScore":"",// 选项分数
       //                  "orderNo":"",// 选项序号
       //                  "totalOptionCount":"" // 总选项数
       //             },
       //            {
       //                  "questionNo":"4",// 题号
       //                  "optionNo":"2",// 选项编号
       //                  "optionContent":"错误",// 选项内容
       //                  "optionScore":"",// 选项分数
       //                  "orderNo":"",// 选项序号
       //                  "totalOptionCount":"" // 总选项数
       //             }
       //       ]
       // },{
       //       "orderNo":"5",// 序号
       //       "paperId":"5", //问卷编号
       //       "questionNo":"5",// 题号
       //       "questionContent":"投资者购买私募投资基金须向销售提供资产证明，满足合格投资者条件",// 题目
       //       "totalQuestionCount":"",// 总题数
       //       "optionInfo":[ // 选项信息
       //            {
       //                  "questionNo":"5",// 题号
       //                  "optionNo":"1",// 选项编号
       //                  "optionContent":"正确",// 选项内容
       //                  "optionScore":"",// 选项分数
       //                  "orderNo":"",// 选项序号
       //                  "totalOptionCount":"" // 总选项数
       //             },
       //            {
       //                  "questionNo":"5",// 题号
       //                  "optionNo":"2",// 选项编号
       //                  "optionContent":"错误",// 选项内容
       //                  "optionScore":"",// 选项分数
       //                  "orderNo":"",// 选项序号
       //                  "totalOptionCount":"" // 总选项数
       //             }
       //       ]
       // },{
       //       "orderNo":"6",// 序号
       //       "paperId":"6", //问卷编号
       //       "questionNo":"6",// 题号
       //       "questionContent":"问题六，投资者购买私募投资基金须向销售提供资产证明，满足合格投资者条件",// 题目
       //       "totalQuestionCount":"",// 总题数
       //       "optionInfo":[ // 选项信息
       //            {
       //                  "questionNo":"6",// 题号
       //                  "optionNo":"1",// 选项编号
       //                  "optionContent":"正确",// 选项内容
       //                  "optionScore":"",// 选项分数
       //                  "orderNo":"",// 选项序号
       //                  "totalOptionCount":"" // 总选项数
       //             },
       //            {
       //                  "questionNo":"6",// 题号
       //                  "optionNo":"2",// 选项编号
       //                  "optionContent":"错误",// 选项内容
       //                  "optionScore":"",// 选项分数
       //                  "orderNo":"",// 选项序号
       //                  "totalOptionCount":"" // 总选项数
       //             }
       //       ]
       // },{
       //       "orderNo":"7",// 序号
       //       "paperId":"7", //问卷编号
       //       "questionNo":"7",// 题号
       //       "questionContent":"投资者购买私募投资基金须向销售提供资产证明，满足合格投资者条件",// 题目
       //       "totalQuestionCount":"",// 总题数
       //       "optionInfo":[ // 选项信息
       //            {
       //                  "questionNo":"7",// 题号
       //                  "optionNo":"1",// 选项编号
       //                  "optionContent":"正确",// 选项内容
       //                  "optionScore":"",// 选项分数
       //                  "orderNo":"",// 选项序号
       //                  "totalOptionCount":"" // 总选项数
       //             },
       //            {
       //                  "questionNo":"7",// 题号
       //                  "optionNo":"2",// 选项编号
       //                  "optionContent":"错误",// 选项内容
       //                  "optionScore":"",// 选项分数
       //                  "orderNo":"",// 选项序号
       //                  "totalOptionCount":"" // 总选项数
       //             }
       //       ]
       // },{
       //       "orderNo":"8",// 序号
       //       "paperId":"8", //问卷编号
       //       "questionNo":"8",// 题号
       //       "questionContent":"投资者购买私募投资基金须向销售提供资产证明，满足合格投资者条件",// 题目
       //       "totalQuestionCount":"",// 总题数
       //       "optionInfo":[ // 选项信息
       //            {
       //                  "questionNo":"8",// 题号
       //                  "optionNo":"1",// 选项编号
       //                  "optionContent":"正确",// 选项内容
       //                  "optionScore":"",// 选项分数
       //                  "orderNo":"",// 选项序号
       //                  "totalOptionCount":"" // 总选项数
       //             },
       //            {
       //                  "questionNo":"8",// 题号
       //                  "optionNo":"2",// 选项编号
       //                  "optionContent":"错误",// 选项内容
       //                  "optionScore":"",// 选项分数
       //                  "orderNo":"",// 选项序号
       //                  "totalOptionCount":"" // 总选项数
       //             }
       //       ]
       // }
    ]
});

module.exports=queryInvestmentKnowledge;