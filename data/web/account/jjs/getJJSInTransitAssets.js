/*
 * @page: 查询金交所在途资产
 * @Author: songxiaoyu
 * @Date:   2019-09-12 13:43:59
 * @Last Modified by:   songxiaoyu
 * @description:
 */

var Mock = require('mockjs');

var mymessage = Mock.mock({
    data: {
        "totalInTransitAsset": '200000', // 在途资产汇总
        "totalInTransitAssetMask": '200,00', // 在途资产汇总 千分位
        "pageList|3": [{
            "projectName": "（DZ银杏40号）恒天财富隐裕26号私募投资基金（第三十六次开放）", // 项目名称
            "besTime": "50.55", // 预约时间
            "besTimeStr": "-----", // 预约时间 yyyy-MM-dd格式
            "besAmount": "12.45", // 预约金额
            "besAmountMask": "35.000.00", // 预约金额 千分位
            "transAmount": "16.25", // 到账金额
            "transAmountMask": "16.25", // 到账金额 千分位
            "transAmountMask": "16.25", // 到账金额 千分位
            "accountStatus": true, // 到账状态
            "transDate": "45.000.00", // 到账时间
            "transDate": "45.000.00", // 到账时间
            "transDateStr": "20.75" // 到账时间 yyyy-MM-dd格式
        }],
    },

    "message": "操作成功！",
    "status": "0000"
    // "status": "1000"
});
module.exports = mymessage;