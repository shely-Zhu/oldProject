

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock(	
    {
        "status":"0000",
        "message":"处理成功！",
        "data":{       
            "dailyOnceMaxLimit":"500000",// 单日单笔最高限额
            "dailyMaxLimit":"500000", // 单日最高限额
            "dailyTimesMaxLimit":10,// 单日最高次数，整形
            "dailyOnceMaxLimitMask":"500,000", //单日单笔最高限额千分位
            "dailyMaxLimitMask":"500,000", //单日最高限额千分位
            "dailyOnceMaxLimitWan":"50", //单日单笔最高限额 *万
            "dailyMaxLimitWan":"50", //单日最高限额 *万       
        }
    });

module.exports = data;