/*
 * @page: 投资者分类撤销
 * @Author: songxiaoyu
 * @Date:   2018-07-16 18:52:45
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-07-16 19:32:42
 * @description:
 */


// 使用 Mock
var Mock = require('mockjs');

//这里直接返回的就是JSON格式
var repealForClassification = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": null
});
module.exports = repealForClassification;