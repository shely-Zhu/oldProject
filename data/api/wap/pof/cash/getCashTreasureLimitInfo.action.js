/*
* @page: 现金宝页面
* @Author: songxiaoyu
* @Date:   2018-05-14 10:17:53
* @Last Modified by:   songxiaoyu
* @Last Modified time: 2018-05-14 10:19:30
* @description:
*/// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var data = Mock.mock({
  "hmac":"hmac",//预留字段
  "status":"0",//"0"是查询成功;"1"是查询失败;
  "code":"CS0000",//"CF0001" 操作失败;"CS0000" 操作成功;
  "msg":"success",//返回提示信息
  "data":{
    "dailyOnceMaxLimitWan":"10000",//单笔最高限额
    "dailyMaxLimitWan":"50000",//单日最高限额
    "dailyMaxLimitWan":"12",//单日最高次数
  } 
});
 module.exports=data;