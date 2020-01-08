/*
  恒添宝交易明细--转入转出
  */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var tradeList = Mock.mock({
    "hmac":"hmac",//预留字段
    "status":"0",//"0"是查询成功;"1"是查询失败;
    "code":"CS0000",//"CF0001" 操作失败;"CS0000" 操作成功;
    "msg":"success",//返回提示信息
    "data":{
      "pageList|5":[
      {
        "tradeApplyStatus":"20",//交易状态
        "tradeApplyDesc":"转入成功",//交易状态描述
        "balance":"10000.00",//发生金额
        "balanceMask":"10,000.00", //发生金额千分位显示
        "shares":"0.00",//发生份额
        "sharesMask":"0.00",//发生份额千分位显示
        "originalDate":"2016-10-11",//原申请日期 (原申请日期+下单时间=购买时间)
        "orderDate":"09:30:00",//下单时间 (原申请日期+下单时间=购买时间)
        "fundBusinCode":"022",//业务代码
        "allotNo":"20161010000301",//申请编号
        "taconfirmFlag":"9",//确认表示状态
        "deductStatus":"1", //扣款状态
        "fundCode": "003075",
        "fundName": "恒添宝"
      },
      ],  
    "pageItems":{
      "slider":[1,2,3,4,5,6,7],
      "hasPrePage":false,
      "startRow":1,
      "offset":0,
      "lastPage":false,
      "prePage":1,
      "hasNextPage":true,
      "nextPage":2,
      "endRow":5,
      "totalCount":147,
      "firstPage":true,
      "totalPages":30,
      "limit":5,
      "page":1
    }
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
  module.exports=tradeList;