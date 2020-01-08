/*
 * @page: 放弃跟调
 * @Author: songxiaoyu
 * @Date:   2019-01-07 16:53:36
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

    }
});

//把生成的假数据当做模块输出
module.exports = data;