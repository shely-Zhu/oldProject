/*
    记得网站交易密码  校验原密码
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var pOver = Mock.mock({
    "hmac": "hmac",
    "status": "0000",
    "code": "CS0000",
    "msg": "网站原交易密码输入不正确，请重新输入",
    "data": {

        "pageList|4": [{
                "accountName": "汤俊民", //银行户名
                "accountNameMask": "**民", //银行户名加星
                "bankNo": "005", //银行代码
                "bankAccount": "6217000010067046220", //银行账号
                "bankAccountMask": "**** **** **** 6220", //银行账号加星
                "bankName": "建设银行", //所属银行名称
                "isPub": "2",
                "bankAccountSecret":'123123',
                "tradeAcco": "10000015", //交易账号
                "capitalMode": "M", //资金方式
                "singleNum": "1000000", //单笔限额数值
                "oneDayNum": "50", //单日限额数值
                "oneMonthNum": "500", //单月限额数值
                "singleNumMask": "500,000", //单笔限额数值（加千位符）
                "oneDayNumMask": "2,000,000", //单日限额数值（加千位符）
                "oneMonthNumMask": "5,000,000", //单月限额数值（加千位符）
                "idNoType": "0", //证件类型
                "idNo": "330302196308124863", //证件号
                "branchNo": "23423423523144", //联行号
                "subBranch":'东城区支行', // 支行名称
                "tradeAccountList": [{
                        "tradeAcco": "10000015", //交易账号
                        "capitalMode": "M", //资金方式
                        "oneDayNum": "50", //单日限额数值
                        "singleNum": "1000000", //单笔限额数值
                        "oneMonthNum": "500" //单月限额数值
                    },
                    {
                        "tradeAcco": "10000015", //交易账号
                        "capitalMode": "M", //资金方式
                        "oneDayNum": "50", //单日限额数值
                        "singleNum": "1000000", //单笔限额数值
                        "oneMonthNum": "500" //单月限额数值
                    }
                ],
            },



        ]
    }
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;