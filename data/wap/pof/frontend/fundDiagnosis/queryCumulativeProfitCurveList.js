/*
 * @page: 基金诊断-累计收益曲线
 * @Author: songxiaoyu
 * @Date:   2019-08-16 15:17:35
 * @Last Modified by:   songxiaoyu
 * @description:
 */

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    "status": "0000",
    "msg": "处理成功！",
    "data": {
        "fundCode": "", //基金代码
        "fundType": "", //基金类型
        "time": "", //时间
        "maxEarnRate": "1", //最大收益率
        "minEarnRate": "", //最小收益率
        "fundProfitRateSection": [{
            "fundProfitRate": '1', //基金收益率
            "shanghaiCompositeIndexAvgreturnRate": '2', //上证指数累计收益率
            "hs300IndexAvgreturnRate": '-3', //沪深300指数累计收益率   
            "currentDate": "2019-4-1", //当前时间
        },
        {
            "fundProfitRate": '3', //基金收益率
            "shanghaiCompositeIndexAvgreturnRate": '4', //上证指数累计收益率
            "hs300IndexAvgreturnRate": '-5', //沪深300指数累计收益率   
            "currentDate": "2019-5-1", //当前时间
        },{
            "fundProfitRate": '5', //基金收益率
            "shanghaiCompositeIndexAvgreturnRate": '6', //上证指数累计收益率
            "hs300IndexAvgreturnRate": '7', //沪深300指数累计收益率   
            "currentDate": "2019-6-1", //当前时间
        }]

    }
});


//根据传参数的不同进行处理

module.exports = data;