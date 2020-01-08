

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    "status":"0000",
    "msg":"处理成功！",
    "data":{
    "govBondRatio": "12",//国债比例
    "finanBondRatio": "43",//金融债比例
    "covertBondRatio": "13",//可转债比例
    "corpBondRatio": "23",//企债比例
    "ctrBankBillRatio": "14",//央行票据比例
    "cpValueRatio": "23",//短期融资券比例
    "mtnValueRatio": "23",//中期票据比例
    "cdsRatio": "35",//同业存单比例

    }
});





//根据传参数的不同进行处理

module.exports = data;