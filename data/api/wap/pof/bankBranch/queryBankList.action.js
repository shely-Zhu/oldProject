/*
* @page: 银行列表 接口地址
* @接口地址: http://wiki.htmz.com/pages/viewpage.action?pageId=7018812#V7.19月份需求接口文档-10查询银行信息
* @Author: songxiaoyu
* @Date:   2018-09-04 14:12:52
*
* 18.9.0版本后弃用
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var pOver = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "网站原交易密码输入不正确，请重新输入", 
	"data": { 
		"pageItems" : {
             "totalCount": "",// 总记录数
             "totalPages": "" //总页数
         },
	     "pageList":[
            {
                 "bankIdNo":  "934",// 银行编号
                 "bankName": "邮政储蓄" //银行名称
            },
            {
                 "bankIdNo":  "010",// 银行编号
                 "bankName": "浦东发展与银行" //银行名称
            },
            {
                 "bankIdNo|1":  ["01","02","03","04"],// 银行编号
                 "bankName|1": ["建设银行","招商银行","工商银行","交通银行"] //银行名称
            },
            {
                 "bankIdNo|1": ["01","02","03","04"],// 银行编号
                 "bankName|1":["建设银行","招商银行","工商银行","交通银行"] //银行名称
            }
         ]
	} 
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;