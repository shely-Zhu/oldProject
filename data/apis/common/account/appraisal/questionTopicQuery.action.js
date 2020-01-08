/*
风险测评调查问卷
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var question = Mock.mock(   
{
    "hmac":"hmac", //预留字段
    "msg": "success",
    "code":"CS0000",//错误码
    "status": "0",
    "data": [
        {
             //"orderNo":"1",// 序号
             "paperId":"1", //问卷编号
             "questionNo":"1",// 题号
             "questionContent":"基金的预期收益是未来一定可以取得得收益",// 题目
             //"totalQuestionCount":"",// 总题数
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
       },{
             //"orderNo":"2",// 序号
             "paperId":"2", //问卷编号
             "questionNo":"2",// 题号
             "questionContent":"基金的预期收益是未来一定可以取得得收益",// 题目
             //"totalQuestionCount":"",// 总题数
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
       }
       ,{
             //"orderNo":"3",// 序号
             "paperId":"3", //问卷编号
             "questionNo":"3",// 题号
             "questionContent":"问题三",// 题目
             //"totalQuestionCount":"",// 总题数
             "optionInfo":[ // 选项信息
                  {
                        "questionNo":"3",// 题号
                        "optionNo":"1",// 选项编号
                        "optionContent":"选项一",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },
                  {
                        "questionNo":"3",// 题号
                        "optionNo":"2",// 选项编号
                        "optionContent":"选项二",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },{
                        "questionNo":"3",// 题号
                        "optionNo":"3",// 选项编号
                        "optionContent":"选项三",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },{
                        "questionNo":"3",// 题号
                        "optionNo":"4",// 选项编号
                        "optionContent":"选项四",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   }
             ]
       },{
            // "orderNo":"4",// 序号
             "paperId":"4", //问卷编号
             "questionNo":"4",// 题号
             "questionContent":"问题四",// 题目
             //"totalQuestionCount":"",// 总题数
             "optionInfo":[ // 选项信息
                  {
                        "questionNo":"4",// 题号
                        "optionNo":"1",// 选项编号
                        "optionContent":"选项一",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },
                  {
                        "questionNo":"4",// 题号
                        "optionNo":"2",// 选项编号
                        "optionContent":"选项二",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },{
                        "questionNo":"4",// 题号
                        "optionNo":"3",// 选项编号
                        "optionContent":"选项三",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },{
                        "questionNo":"4",// 题号
                        "optionNo":"4",// 选项编号
                        "optionContent":"选项四",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   }
             ]
       },{
            // "orderNo":"5",// 序号
             "paperId":"5", //问卷编号
             "questionNo":"5",// 题号
             "questionContent":"问题五",// 题目
            // "totalQuestionCount":"",// 总题数
             "optionInfo":[ // 选项信息
                  {
                        "questionNo":"5",// 题号
                        "optionNo":"1",// 选项编号
                        "optionContent":"选项一",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },
                  {
                        "questionNo":"5",// 题号
                        "optionNo":"2",// 选项编号
                        "optionContent":"选项二",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },{
                        "questionNo":"5",// 题号
                        "optionNo":"3",// 选项编号
                        "optionContent":"选项三",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },{
                        "questionNo":"5",// 题号
                        "optionNo":"4",// 选项编号
                        "optionContent":"选项四",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   }
             ]
       },{
            // "orderNo":"6",// 序号
             "paperId":"6", //问卷编号
             "questionNo":"6",// 题号
             "questionContent":"问题六",// 题目
            // "totalQuestionCount":"",// 总题数
             "optionInfo":[ // 选项信息
                  {
                        "questionNo":"6",// 题号
                        "optionNo":"1",// 选项编号
                        "optionContent":"选项一",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },
                  {
                        "questionNo":"6",// 题号
                        "optionNo":"2",// 选项编号
                        "optionContent":"选项二",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },{
                        "questionNo":"6",// 题号
                        "optionNo":"3",// 选项编号
                        "optionContent":"选项三",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },{
                        "questionNo":"6",// 题号
                        "optionNo":"4",// 选项编号
                        "optionContent":"选项四",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   }
             ]
       },{
            // "orderNo":"7",// 序号
             "paperId":"7", //问卷编号
             "questionNo":"7",// 题号
             "questionContent":"问题七",// 题目
            // "totalQuestionCount":"",// 总题数
             "optionInfo":[ // 选项信息
                  {
                        "questionNo":"7",// 题号
                        "optionNo":"1",// 选项编号
                        "optionContent":"选项一",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },
                  {
                        "questionNo":"7",// 题号
                        "optionNo":"2",// 选项编号
                        "optionContent":"选项二",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },{
                        "questionNo":"7",// 题号
                        "optionNo":"3",// 选项编号
                        "optionContent":"选项三",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },{
                        "questionNo":"7",// 题号
                        "optionNo":"4",// 选项编号
                        "optionContent":"选项四",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   }
             ]
       },{
            // "orderNo":"8",// 序号
             "paperId":"8", //问卷编号
             "questionNo":"8",// 题号
             "questionContent":"问题八",// 题目
            // "totalQuestionCount":"",// 总题数
             "optionInfo":[ // 选项信息
                  {
                        "questionNo":"8",// 题号
                        "optionNo":"1",// 选项编号
                        "optionContent":"选项一",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },
                  {
                        "questionNo":"8",// 题号
                        "optionNo":"2",// 选项编号
                        "optionContent":"选项二",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },{
                        "questionNo":"8",// 题号
                        "optionNo":"3",// 选项编号
                        "optionContent":"选项三",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   },{
                        "questionNo":"8",// 题号
                        "optionNo":"4",// 选项编号
                        "optionContent":"选项四",// 选项内容
                        "optionScore":"",// 选项分数
                        "orderNo":"",// 选项序号
                        "totalOptionCount":"" // 总选项数
                   }
             ]
       }
    ]
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理
/*module.exports = [
  {
    params: {name: 1},  //name等于1的时候，返回{error:'error'}
    response: {
      error: 'error'
    }
  }, {
    params: {name: 2},  //name等于2的时候，返回data
    response: data
  }
]*/
module.exports=question;