/*
 * @page: 登录接口模拟---判断登录状态
 * @Author: songxiaoyu
 * @Date:   2018-09-21 14:08:10
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-09-25 15:27:45
 * @description:
 */


// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var data = Mock.mock({ 
    "hmac": "hmac", 
    "status": "0000", 
    "msg": "处理成功！", 
    "data": {
        "pageList|10":[
            {
                "fixState|1": ["H", "P"],
                fixedBalance: "1002.00",
                fixedBalanceMask: "1,002.00",
                fixedDay: "2019-12-19",
                fundCode: "000847",
                fundName: "中融货币A",
                nextFixrequestDate: "2020-01-06",
                payBank: "",
                protocolPeriodUnit: "每月 6日",
                scheduledProtocolId: "201912180046",
                totalTradeTimes: "0",
            }
            // ,{
            //     fixState: "P",
            //     fixedBalance: "1000.00",
            //     fixedBalanceMask: "1,000.00",
            //     fixedDay: "2019-12-19",
            //     fundCode: "000846",
            //     fundName: "中融货币C",
            //     nextFixrequestDate: "2020-01-02",
            //     payBank: "",
            //     protocolPeriodUnit: "每月 1日",
            //     scheduledProtocolId: "201912180045",
            //     totalTradeTimes: "0",
            // },{
            //     fixState: "P",
            //     fixedBalance: "1000.00",
            //     fixedBalanceMask: "1,000.00",
            //     fixedDay: "2019-12-19",
            //     fundCode: "000847",
            //     fundName: "中融货币A",
            //     nextFixrequestDate: "2020-01-02",
            //     payBank: "",
            //     protocolPeriodUnit: "每月 1日",
            //     scheduledProtocolId: "201912180044",
            //     totalTradeTimes: "0",
            // }
        ]
    }
});

module.exports = data;
