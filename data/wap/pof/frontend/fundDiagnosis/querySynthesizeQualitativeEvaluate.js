/*
 * @page: 基金诊断-综合定性评价
 * @Author: songxiaoyu
 * @Date:   2019-08-16 15:17:35
 * @Last Modified by:   songxiaoyu
 * @description:
 */

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    "status": "0000",
    "msg": "处理成功！",
    "data": {
        "content": "", //内容
    }
});





//根据传参数的不同进行处理

module.exports = data;