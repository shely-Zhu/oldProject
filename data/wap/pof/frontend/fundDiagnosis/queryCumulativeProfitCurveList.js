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
        "fundProfit": {
            "fundCode": "", //基金代码
            "fundType": "", //基金类型
            "time": "", //时间
            "maxEarnRate": "", //最大收益率
            "minEarnRate": "", //最小收益率
            "fundProfit": [{
                "currentDate": "", //当前时间
                "earnRate": "" //收益率
            }], 
            "shanghaiCompositeIndexAvgreturn": [{ //基金收益
                "currentDate": "", //当前时间
                "earnRate": "" //收益率
            }], 
            "hs300IndexAvgreturn": [{ //上证指数累计收益
                "currentDate": "", //当前时间
                "earnRate": "" //收益率
            }] //沪深300指数累计收益
        }
    }
});


//根据传参数的不同进行处理

module.exports = data;