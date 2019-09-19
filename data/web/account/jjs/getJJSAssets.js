/*
 * @page: 查询金交持仓资产、在途资产、总资产
 * @Author: songxiaoyu
 * @Date:   2019-09-18 19:42:45
 * @Last Modified by:   songxiaoyu
 * @description:
 */


var Mock = require('mockjs');

var mymessage = Mock.mock({
    data: {
        "jjsHoldAsset": '200000', // 持仓资产
        "jjsHoldAssetMask": '200,000.00', // 持仓资产千分位
        "jjsInTransitAsset": '300000', // 在途资产
        "jjsInTransitAssetMask": '300,000.00', // 在途资产
        "jjsTotalAsset": '500000', // 总资产
        "jjsTotalAssetMask": '500,000.00', // 总资产 千分位
    },

    "message": "操作成功！",
    "status": "0000"
});
module.exports = mymessage;