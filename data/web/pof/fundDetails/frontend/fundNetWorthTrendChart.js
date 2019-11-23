


/*
 * @page: 基金净值走势
 * @Author: tianjunguo
 * @Date:   2019-11-22 14:08:10
 * @Last Modified by:   tianjunguo
 * @Last Modified time: 2019-11-22 15:27:45
 * @description:
 */


// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var data = Mock.mock({ 
    "hmac": "hmac", 
    "status": "0", 
    "code": "CS0000", 
    "msg": "处理成功！", 
    "data": {
    	"pageList|10":[{
	        "fundType":"10014", //基金类型代码
			"trdDt":"2019-5-21", //交易日期
			"unitNav":"100",//份额净值
			"accuUnitNav":"102.51",//份额累计净值
			"dayChgRat":"1101",//日涨跌幅（%）
			"annYldRat":"2.32",//七日年化（%）
			"unitYld":"2.233",//日涨跌幅（%）
    		
    	}]
    }
});

module.exports = data;
