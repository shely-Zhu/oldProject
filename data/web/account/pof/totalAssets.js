



/*
 * @page: 查询公募总资产
 * @Author: tianjunguo
 * @Date:   2019-11-22 19:42:45
 * @Last Modified by:   tianjunguo
 * @description:
 */


var Mock = require('mockjs');

var mymessage = Mock.mock({
    data: {
    	"myAssetTotal": "164000.89", // 公募总资产（普通基金+现金宝+认申购在途）

    	"myAssetTotalMask": "164,000.89", // 公募总资产千分位展示（普通基金+现金宝+认申购在途） 

    	"todayProfit": "-23.23", // 昨日总收益 （普通基金+现金宝） 

    	"cumulativeProfit": "26772.98", // 持有收益（普通基金+现金宝）

    	"inTransitTotal": "999.23" // 待确认申请金额（申购+认购）
    },

    "message": "操作成功！",
    "status": "0000"
});
module.exports = mymessage;