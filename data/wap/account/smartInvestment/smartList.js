/*
 * @page: 智能投顾-银行卡列表
 * @Author: songxiaoyu
 * @Date:   2018-10-16 15:02:13
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-11-06 16:35:52
 * @description:
 */
// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "hmac": "hmac", //预留字段
    "status": "0", //"0"是查询成功;"1"是查询失败;
    "code": "CS0000", //"CF0001" 操作失败;"CS0000" 操作成功; 
    "msg": "success",
    "data": {
        "pageNum": 1, //预留字段
        "totalCount": 2, //"0"是查询成功;"1"是查询失败;
        "pageSize": 10,
        "totalPage": 1,
        "lowGroupBuyAmount": "10000", //组合购买最小限额
        "lowGroupBuyAmountMask": "10,000", //组合购买最小限额千分位
        "highGroupBuyAmount": "1000000", //组合购买最大限额       
        "highGroupBuyAmountMask": "10,000", //组合购买最大限额千分位
        "pageList": [{
            "profession": "0", //业务场景 0-电子合同手动输入银行卡 “”-其他业务场景
            "bankAccountSecret": "NjIzMDIyMTExMTEwMTA2Mg==", //银行卡加密字段，base64加密
            "bankAccount": "6230221111101062", //银行卡号
            "bankAccountMask": "**** **** **** 6220", //银行账号加星
            "bankNo": "005", //银行代码
            "accountName": "汤俊民", //银行户名
            "bankName": "建设银行", //所属银行名称
            "provinceId": "11935", //支行所属省id
            "provinceName": "北京市", //支行所属省
            "cityId": "10698", //支行所属市id
            "cityName": "东城区", //支行所属市
            "subBranch": "东城区支行", // 支行名称
            "branchNo": "23423423523144", //联行号
            "mobile": "14700000185", // 银行预留手机号
            "isPub": "2", // 是否公募开卡 2公募
            "authentication": "", // 是否鉴权 0：否 1：是
            "priTradeAcco": "", // 私募交易账号
            "tradeAcco": "00999000000006842", //交易账号
            "capitalMode": "M", //资金方式
            "tradeSource": "000000150001", //交易来源，判断现金宝账号
            "idNoType": "0", //证件类型   
            "idNo": "330302196308124863", //证件号
            "show": true, //是否需要显示
            "bankLogoUrl": "https://s.chtfundtest.com/upload/htmall/images/content/2f313774-7886-42fa-8bc2-cb2098cd0c71.jpg", //银行图标
            "bankThumbnailUrl": "https://s.chtfundtest.com/upload/htmall/images/content/b2bece3b-595a-40cf-9fe8-b159f80d3744.png", //银行缩略图
            "singleNum": "10000000", //单笔限额
            "oneDayNum": "200000000", //单日限额数值
            "oneMonthNum": "5000000", //单月限额数值
            "singleNumMask": "100",
            "oneDayNumMask": "2",
            "oneMonthNumMask": "5",
            "combinNum": "10000", //组合限
            "combinNumMask": "10,000", //组合限额千分位
            "disableFlag": "0", //0:正常启用，1 支付渠道已不支持此银行
            "tradeAccountList": [{
                "tradeAcco": "", //交易账号
                "capitalMode": "M", //资金方式
                "transAcctStatus": "0", //交易账号状态
                "tradeSource": "000000150001" //交易来源，判断现金宝账号
            }]
        }]
    }
});

//把生成的假数据当做模块输出
module.exports = data;