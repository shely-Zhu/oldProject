/*
  明星理财师-收益分配明细
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "status": "0000",
    "message": "处理成功！",
    "data":{
        'pageList':[{
            "yieldDate": "2019-11-22", //日期
            "yieldSum": "180.22",  //金额
            "assignType": "类型1", //类型
            "assignFormula": "我是公式啊我是数据啊我是公式啊我是数据啊我是公式啊我是数据啊我是公式啊我是数据啊1",  //公式
        },
        {
            "yieldDate": "2019-11-23", //日期
            "yieldSum": "180.22",  //金额
            "assignType": "类型2", //类型
            "assignFormula": "公式2",  //公式
        },
        {
            "yieldDate": "2019-11-24", //日期
            "yieldSum": "180.22",  //金额
            "assignType": "类型3", //类型
            "assignFormula": "公式3",  //公式
        },
        {
            "yieldDate": "2019-11-22", //日期
            "yieldSum": "180.22",  //金额
            "assignType": "类型1", //类型
            "assignFormula": "我是公式啊我是数据啊我是公式啊我是数据啊我是公式啊我是数据啊我是公式啊我是数据啊4",  //公式
        },
        {
            "yieldDate": "2019-11-23", //日期
            "yieldSum": "180.22",  //金额
            "assignType": "类型2", //类型
            "assignFormula": "公式5",  //公式
        },
        {
            "yieldDate": "2019-11-24", //日期
            "yieldSum": "180.22",  //金额
            "assignType": "类型3", //类型
            "assignFormula": "公式6",  //公式
        },
        {
            "yieldDate": "2019-11-22", //日期
            "yieldSum": "180.22",  //金额
            "assignType": "类型1", //类型
            "assignFormula": "我是公式啊我是数据啊我是公式啊我是数据啊我是公式啊我是数据啊我是公式啊我是数据啊7",  //公式
        },
        {
            "yieldDate": "2019-11-23", //日期
            "yieldSum": "180.22",  //金额
            "assignType": "类型2", //类型
            "assignFormula": "公式8",  //公式
        },
        {
            "yieldDate": "2019-11-24", //日期
            "yieldSum": "180.22",  //金额
            "assignType": "类型3", //类型
            "assignFormula": "公式9",  //公式
        },
        {
            "yieldDate": "2019-11-22", //日期
            "yieldSum": "180.22",  //金额
            "assignType": "类型1", //类型
            "assignFormula": "公式10",  //公式
        },
        {
            "yieldDate": "2019-11-23", //日期
            "yieldSum": "180.22",  //金额
            "assignType": "类型2", //类型
            "assignFormula": "公式11",  //公式
        },
        {
            "yieldDate": "2019-11-24", //日期
            "yieldSum": "180.22",  //金额
            "assignType": "类型3", //类型
            "assignFormula": "公式12",  //公式
        },
        {
            "yieldDate": "2019-11-22", //日期
            "yieldSum": "180.22",  //金额
            "assignType": "类型1", //类型
            "assignFormula": "公式13",  //公式
        },
        {
            "yieldDate": "2019-11-23", //日期
            "yieldSum": "180.22",  //金额
            "assignType": "类型2", //类型
            "assignFormula": "公式14",  //公式
        },
        {
            "yieldDate": "2019-11-24", //日期
            "yieldSum": "180.22",  //金额
            "assignType": "类型3", //类型
            "assignFormula": "公式15",  //公式
        },
       
    ]
    } 
});

module.exports = data;