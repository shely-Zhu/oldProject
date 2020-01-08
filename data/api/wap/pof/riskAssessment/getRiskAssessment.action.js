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
    'data|1':[{
         "paperId":"",// 问卷编号

         "clientId":"",// 客户编号

         "custName":"",// 客户姓名

         "paperScore":"",// 试卷得分

         "updateDate":"",// 记录更新日期

         "eligContent":"",// 客户答题内容

         "riskLevel|1":["稳健性","积极性","进取型","消极性"],// 风险等级

         "riskLevelDescription|1":["进阿里的风景啊理解的罚款垃圾地方啦大家","啊金发晶拉筋法开了家看电视了放假了卡卡","就阿凡达放假啊龙卷风垃圾发电垃圾分类就就fda了解了"],// 风险等级描述

         "riskLevelName|1":["稳健性","积极性","进取型","消极性"],// 风险等级

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