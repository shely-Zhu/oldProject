/*
 * @page: 智能投顾----系统调仓记录列表
 * @Author: songxiaoyu
 * @Date:   2019-01-07 
 * @Last Modified by:   songxiaoyu
 * @description:
 */

// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
        "totalCount": 10,
        "totalPage": 20,
        "transferRecordList|5": [{
            "transferDate": "2019-01-01", //调仓时间
            "transferCause": "调仓原因调仓原因调仓原因调仓原因调仓原因调仓原因调仓原因", //调仓原因
            "fundList": [{
                "fundCode": "12457", //基金代码
                "fundName": "组合一号", //基金名称
                "fundOriginalScale": "23.2", //调仓前占比(乘了100没加百分号)
                "fundNewScale": "23.2" //调仓后占比(乘了100没加百分号)
            },{
                "fundCode": "12457", //基金代码
                "fundName": "组合一号", //基金名称
                "fundOriginalScale": "23.2", //调仓前占比(乘了100没加百分号)
                "fundNewScale": "28.2" //调仓后占比(乘了100没加百分号)
            },{
                "fundCode": "12457", //基金代码
                "fundName": "组合一号", //基金名称
                "fundOriginalScale": "23.2", //调仓前占比(乘了100没加百分号)
                "fundNewScale": "0" //调仓后占比(乘了100没加百分号)
            }]
        },{
            "transferDate": "2019-01-01", //调仓时间
            "transferCause": "调仓原因调仓原因调仓原因调仓原因调仓原因调仓原因调仓原因", //调仓原因
            "fundList": [{
                "fundCode": "12457", //基金代码
                "fundName": "组合一号", //基金名称
                "fundOriginalScale": "23.2", //调仓前占比(乘了100没加百分号)
                "fundNewScale": "23.2" //调仓后占比(乘了100没加百分号)
            },{
                "fundCode": "12457", //基金代码
                "fundName": "组合一号", //基金名称
                "fundOriginalScale": "23.2", //调仓前占比(乘了100没加百分号)
                "fundNewScale": "28.2" //调仓后占比(乘了100没加百分号)
            },{
                "fundCode": "12457", //基金代码
                "fundName": "组合一号", //基金名称
                "fundOriginalScale": "23.2", //调仓前占比(乘了100没加百分号)
                "fundNewScale": "0" //调仓后占比(乘了100没加百分号)
            }]
        }]
    }
});

//把生成的假数据当做模块输出
module.exports = data;