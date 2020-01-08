/*
  恒添宝交易明细--收益
  */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var incomeList = Mock.mock({
  "hmac":"hmac",//预留字段
  "status":"0",//"0"是查询成功;"1"是查询失败;
  "code":"CS0000",//"CF0001" 操作失败;"CS0000" 操作成功;
  "msg":"success",//返回提示信息
  "data":{
    "pageList":[
       {
      "todayIncome":"3022.89",//每日收益
      "todayIncomeMask":"3,022.89",//每日收益
      "belongdate":"2017-02-19",//收益日期 
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
  module.exports=incomeList;