/*
    设置默认风险等级
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var question = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    'data':{
        "paperId":"20161125000018",//问卷编号
        "investRiskTolerance":"4"//投资人风险承受能力
    }
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