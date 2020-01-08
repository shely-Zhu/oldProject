/*
 * @page: 手机验证码校验
 * @Author: songxiaoyu
 * @Date:   2019-01-02 17:52:49
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2019-01-02 17:53:21
 * @description:
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var data = Mock.mock({
    "hmac": "hmac", //预留字段
    "status": "0",
    "code": "",
    "msg": "success", //返回提示信息
    "data": {
        "hmac": "hmac",
        "status": "0",
        "code": "CS0000",
        "msg": "处理成功！",
        "data": {

        }
    }
});
module.exports = data;