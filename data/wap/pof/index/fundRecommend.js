/*
 * @page: 
 * @Author: songxiaoyu
 * @Date:   2019-08-09 17:33:44
 * @Last Modified by:   songxiaoyu
 * @description:
 */

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    status: "0",
    message: '成功',
    data: {
        "totalCount": "200",
        "fundRecommendList": [{
            "recomTypeNumber":"12345", // 推荐类型编号
            "fundCode":"54321", // 基金代码
            "fundName":"基金名称", // 基金名称
            "serialNumber":"1", // 基金推荐序号
            "copyWriting":"宣传文案", // 宣传文案
        },{
            "recomTypeNumber":"12345", // 推荐类型编号
            "fundCode":"54321", // 基金代码
            "fundName":"基金名称", // 基金名称
            "serialNumber":"1", // 基金推荐序号
            "copyWriting":"宣传文案", // 宣传文案
        }]
    }
});



//根据传参数的不同进行处理

module.exports = data;