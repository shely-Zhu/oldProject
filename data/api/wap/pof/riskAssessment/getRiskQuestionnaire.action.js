/*
理财师工号查询
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var question = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    'data':[{
        "orderNo":1, 
        "questionNo":"1",// 题号
        "questionContent":"啊就浪费大量的风景垃圾地方 ",// 题目
        "totalQuestionCount":"",// 总题数
        "optionInfo" :[ // 选项信息
             {
                 "questionNo":"1",// 题号
                 "optionNo":"1",// 选项编号
                 "optionContent":"急啊来得及伐啦",// 选项内容
                 "optionScore":"",// 选项分数
                 "orderNo":"",// 选项序号
                 "totalOptionCount":"" // 总选项数

             },

             {
                 "questionNo":"1",// 题号
                 "optionNo":"2",// 选项编号
                 "optionContent":"啊电话卡减肥",// 选项内容
                 "optionScore":"",// 选项分数
                 "orderNo":"",// 选项序号
                 "totalOptionCount":"" // 总选项数
             },
             {
                 "questionNo":"1",// 题号
                 "optionNo":"3",// 选项编号
                 "optionContent":"阿娇大家快来",// 选项内容
                 "optionScore":"",// 选项分数
                 "orderNo":"",// 选项序号
                 "totalOptionCount":"" // 总选项数
             },
             {
                 "questionNo":"1",// 题号
                 "optionNo":"4",// 选项编号
                 "optionContent":"阿娇大家快来",// 选项内容
                 "optionScore":"",// 选项分数
                 "orderNo":"",// 选项序号
                 "totalOptionCount":"" // 总选项数
             },
        ]

    },{
        "orderNo":"2", 
        "questionNo":"2",// 题号
        "questionContent":"大家理解啊锻炼腹肌啊理解",// 题目
        "totalQuestionCount":"",// 总题数
        "optionInfo" :[ // 选项信息
             {
                 "questionNo":"2",// 题号
                 "optionNo":"1",// 选项编号
                 "optionContent":"急啊来得及伐啦",// 选项内容
                 "optionScore":"",// 选项分数
                 "orderNo":"",// 选项序号
                 "totalOptionCount":"" // 总选项数

             },

             {
                 "questionNo":"2",// 题号
                 "optionNo":"2",// 选项编号
                 "optionContent":"啊电话卡减肥",// 选项内容
                 "optionScore":"",// 选项分数
                 "orderNo":"",// 选项序号
                 "totalOptionCount":"" // 总选项数
             },
             {
                 "questionNo":"2",// 题号
                 "optionNo":"3",// 选项编号
                 "optionContent":"阿娇大家快来",// 选项内容
                 "optionScore":"",// 选项分数
                 "orderNo":"",// 选项序号
                 "totalOptionCount":"" // 总选项数
             }
        ]

    },{
        "orderNo":"3", 
        "questionNo":"3",// 题号
        "questionContent":"就阿斯顿发了看得见伐",// 题目
        "totalQuestionCount":"",// 总题数
        "optionInfo" :[ // 选项信息
             {
                 "questionNo":"3",// 题号
                 "optionNo":"1",// 选项编号
                 "optionContent":"急啊来得及伐啦",// 选项内容
                 "optionScore":"",// 选项分数
                 "orderNo":"",// 选项序号
                 "totalOptionCount":"" // 总选项数

             },

             {
                 "questionNo":"3",// 题号
                 "optionNo":"2",// 选项编号
                 "optionContent":"啊电话卡减肥",// 选项内容
                 "optionScore":"",// 选项分数
                 "orderNo":"",// 选项序号
                 "totalOptionCount":"" // 总选项数
             },
             {
                 "questionNo":"3",// 题号
                 "optionNo":"3",// 选项编号
                 "optionContent":"阿娇大家快来",// 选项内容
                 "optionScore":"",// 选项分数
                 "orderNo":"",// 选项序号
                 "totalOptionCount":"" // 总选项数
             }
        ]

    },{
        "orderNo":"4", 
        "questionNo":"4",// 题号
        "questionContent":"多久啊拉菲克辣椒粉",// 题目
        "totalQuestionCount":"",// 总题数
        "optionInfo" :[ // 选项信息
             {
                 "questionNo":"4",// 题号
                 "optionNo":"1",// 选项编号
                 "optionContent":"额外肌肉起来客人",// 选项内容
                 "optionScore":"",// 选项分数
                 "orderNo":"",// 选项序号
                 "totalOptionCount":"" // 总选项数

             },

             {
                 "questionNo":"4",// 题号
                 "optionNo":"2",// 选项编号
                 "optionContent":"额外奖金",// 选项内容
                 "optionScore":"",// 选项分数
                 "orderNo":"",// 选项序号
                 "totalOptionCount":"" // 总选项数
             },
             {
                 "questionNo":"4",// 题号
                 "optionNo":"3",// 选项编号
                 "optionContent":"打飞机啊看了",// 选项内容
                 "optionScore":"",// 选项分数
                 "orderNo":"",// 选项序号
                 "totalOptionCount":"" // 总选项数
             }
        ]

    }]
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