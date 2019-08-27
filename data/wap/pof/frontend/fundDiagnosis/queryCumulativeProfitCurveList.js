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
        "fundProfitRateSection": [{"currentDate":"2019-07-29","fundProfitRate":0.00,"hs300IndexAvgreturnRate":0.00,"shanghaiCompositeIndexAvgreturnRate":0.00},{"currentDate":"2019-07-30","fundProfitRate":0.00,"hs300IndexAvgreturnRate":0.00,"shanghaiCompositeIndexAvgreturnRate":0.00},{"currentDate":"2019-07-31","fundProfitRate":0.00,"hs300IndexAvgreturnRate":0.00,"shanghaiCompositeIndexAvgreturnRate":0.00},{"currentDate":"2019-08-01","fundProfitRate":-1.00,"hs300IndexAvgreturnRate":1.00,"shanghaiCompositeIndexAvgreturnRate":0.00},{"currentDate":"2019-08-02","fundProfitRate":-3.00,"hs300IndexAvgreturnRate":1.00,"shanghaiCompositeIndexAvgreturnRate":0.00},{"currentDate":"2019-08-05","fundProfitRate":-4.00,"hs300IndexAvgreturnRate":1.00,"shanghaiCompositeIndexAvgreturnRate":0.00},{"currentDate":"2019-08-06","fundProfitRate":-5.00,"hs300IndexAvgreturnRate":1.00,"shanghaiCompositeIndexAvgreturnRate":1.00},{"currentDate":"2019-08-07","fundProfitRate":-5.00,"hs300IndexAvgreturnRate":1.00,"shanghaiCompositeIndexAvgreturnRate":1.00},{"currentDate":"2019-08-08","fundProfitRate":-4.00,"hs300IndexAvgreturnRate":2.00,"shanghaiCompositeIndexAvgreturnRate":1.00},{"currentDate":"2019-08-09","fundProfitRate":-6.00,"hs300IndexAvgreturnRate":2.00,"shanghaiCompositeIndexAvgreturnRate":1.00},{"currentDate":"2019-08-12","fundProfitRate":-4.00,"hs300IndexAvgreturnRate":2.00,"shanghaiCompositeIndexAvgreturnRate":1.00},{"currentDate":"2019-08-13","fundProfitRate":-5.00,"hs300IndexAvgreturnRate":2.00,"shanghaiCompositeIndexAvgreturnRate":1.00},{"currentDate":"2019-08-14","fundProfitRate":-4.00,"hs300IndexAvgreturnRate":2.00,"shanghaiCompositeIndexAvgreturnRate":1.00},{"currentDate":"2019-08-19","fundProfitRate":-1.00,"hs300IndexAvgreturnRate":3.00,"shanghaiCompositeIndexAvgreturnRate":1.00},{"currentDate":"2019-08-20","fundProfitRate":-1.00,"hs300IndexAvgreturnRate":3.00,"shanghaiCompositeIndexAvgreturnRate":1.00},{"currentDate":"2019-08-21","fundProfitRate":-1.00,"hs300IndexAvgreturnRate":3.00,"shanghaiCompositeIndexAvgreturnRate":1.00},{"currentDate":"2019-08-22","fundProfitRate":-1.00,"hs300IndexAvgreturnRate":3.00,"shanghaiCompositeIndexAvgreturnRate":1.00},{"currentDate":"2019-08-26","fundProfitRate":-1.00,"hs300IndexAvgreturnRate":null,"shanghaiCompositeIndexAvgreturnRate":null}]

    }
});


//根据传参数的不同进行处理

module.exports = data;