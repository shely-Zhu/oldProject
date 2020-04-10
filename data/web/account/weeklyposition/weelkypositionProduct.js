/*
	实名认证---支行信息查询
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var mymessage = Mock.mock({
    
    'hmac': "", //预留字段
    'msg': "success",
    'code': "",//错误码
    'status': "0",
    'data':  {
             'pageItems':{
                 'totalCount': "",// 总记录数
                 'totalPages': "" //总页数
              },
             'pageList':[
                 {
                     'province|1' : ['海南', '河南'],// 省份
                     'city|1' : ['三亚市','郑州市'], // 城市
                     'bankIdNo|1': ['111','222'],// 银行编号
                     'branchName': ['三亚工商银行','三亚交通银行','三亚农商银行'],// 支行名称
                     'branchNo': '11100' //联行号
                 },
                {
                     'province|1' : ['海南', '河南'],// 省份
                     'city|1' : ['三亚市','郑州市'], // 城市
                     'bankIdNo|1': ['111','222'],// 银行编号
                     'branchName': ['三亚工商银行','三亚交通银行','三亚农商银行'],// 支行名称
                     'branchNo': '11100' //联行号
                 },
                {
                     'province|1' : ['海南', '河南'],// 省份
                     'city|1' : ['三亚市','郑州市'], // 城市
                     'bankIdNo|1': ['111','222'],// 银行编号
                     'branchName': ['三亚工商银行','三亚交通银行','三亚农商银行'],// 支行名称
                     'branchNo': '11100' //联行号
                 },
                {
                     'province|1' : ['海南', '河南'],// 省份
                     'city|1' : ['三亚市','郑州市'], // 城市
                     'bankIdNo|1': ['111','222'],// 银行编号
                     'branchName': ['三亚工商银行','三亚交通银行','三亚农商银行'],// 支行名称
                     'branchNo': '11100' //联行号
                 }
             ]
    }

    
  });
module.exports=mymessage;