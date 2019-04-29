/*
 * @page: 智能投顾-组合产品买入占比列表
 * @Author: songxiaoyu
 * @Date:   2018-10-16 16:15:24
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-10-30 16:12:06
 * @description:
 */


// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "data": {
        "combinFundProportionList": [{
                "fundCode": "000846",
                "fundName": "中融货币A",
                "prdPercent": "50.00"
            },
            {
                "fundCode": "000847",
                "fundName": "中融货币C",
                "prdPercent": "50.00"
            }
        ]
    },
    "message": "操作成功！",
    "status": "0000"
});

//把生成的假数据当做模块输出
module.exports = data;