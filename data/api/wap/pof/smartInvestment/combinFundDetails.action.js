/*
 * @page: 合详情信息查询
 * @Author: songxiaoyu
 * @Date:   2018-10-15 19:41:55
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-10-19 16:20:13
 * @description:
 */
var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
        "combinFundDetails": {
            "groupCode": "000001", //组合编号
            "groupName": "智能投顾1号", //组合名称
            "nav": "1.023", //昨日净值
            "dayRate": "1.27%", //日涨幅
            "tradingDay": "09-29", //净值日期
            "comFundLevel":"2",//组合风险等级
            "prdDetailList": [{
                "prdAttr": "1", //资产配置标识
                "prdAttrName": "现金管理", //资产配置名称
                "totalPercent": "50%", //总占比
                "prdList": [{
                    "fundCode": "000837", //基金编号
                    "fundName": "嘉实超短债券", //基金名称
                    "prdPercent": "15.00%", //占比
                }]
            },{
                "prdAttr": "3", //资产配置标识
                "prdAttrName": "现金管理", //资产配置名称
                "totalPercent": "50%", //总占比
                "prdList": [{
                    "fundCode": "000837", //基金编号
                    "fundName": "嘉实超短债券", //基金名称
                    "prdPercent": "15.00%", //占比
                }]
            },{
                "prdAttr": "4", //资产配置标识
                "prdAttrName": "现金管理", //资产配置名称
                "totalPercent": "50%", //总占比
                "prdList": [{
                    "fundCode": "000837", //基金编号
                    "fundName": "嘉实超短债券", //基金名称
                    "prdPercent": "15.00%", //占比
                }]
            },{
                "prdAttr": "6", //资产配置标识
                "prdAttrName": "现金管理", //资产配置名称
                "totalPercent": "50%", //总占比
                "prdList": [{
                    "fundCode": "000837", //基金编号
                    "fundName": "嘉实超短债券", //基金名称
                    "prdPercent": "15.00%", //占比
                }]
            }]
        }
    }
});

//把生成的假数据当做模块输出
module.exports = data;