



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
    	"fundDetailList": [{
    			"fundCode": "003075",

    			"fundName": "中融货币E",//累计收益 

    			"totalMoney": "1059170.16", // 基金总资产 

    			"totalMoneyMask": "6,878,075.99", //基金总资产千分位展示

    			"income": "30.89", //基金昨日收益  

    			"incomeMask": "21.65", //基金昨日收益千分位展示 

    			"addupIncome": "115.80" ,// 基金持有收益 

    			"addupIncomeMask": "2,174.89", //基金持有收益千分位展示  

    			"addupIncomeRat": "5.8" ,// 基金持有收益率(%)
    			
    			"addupIncome":"115.80" // 基金持有收益 

    			"enableShares": "1059170.16", // 可用份额 

    			"currentShare": "1059170.16", // 持有份额
    			
    			"sevenDayYield": "4.13",//七日年化收益率
    			
    			"unitYld":"1.20"//万份收益 
    	}]
    },

    "message": "操作成功！",
    "status": "0000"
});
module.exports = mymessage;