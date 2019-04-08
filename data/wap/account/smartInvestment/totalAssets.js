/*
 * @page: 智能投顾-组合资产详情
 * @Author: songxiaoyu
 * @Date:   2018-10-16 10:10:32
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-10-18 19:58:37
 * @description:
 */
var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
        "combinTotalAsset": {
            "combCode": "012", //组合编号
            "combName": "组合产品21", //组合名称
            "yesterdayIncome": "100.71", //昨日收益"
            "yesterdayIncomeMask": "100.71", //昨日收益千分位展示"
            "accumIncome": "1000", //累计收益
            "accumIncomeMask": "1,000", //累计收益千分位展示
            "totalAmount": "10000.00", //总资产
            "totalAmountMask": "10,000.00", //总资产千分位展示
            "valueOnway": "", //在途金额
            "valueOnwayMask": "5,000.00", //在途金额千分位展示
            "valueOnwayShare": "5000.00", //在途份额
            "valueOnwayShareMask": "", //在途份额千分位展示
            "tradeAcco": "12457841545646546", //组合交易账号
            "transferRemind": "1", //弹框提示
            "transferDate": "2019-01-02" //调仓时间"
        }
    }
});

//把生成的假数据当做模块输出
module.exports = data;