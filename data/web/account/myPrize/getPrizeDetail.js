/*
 * @page: 智能投顾----系统调仓记录列表
 * @Author: songxiaoyu
 * @Date:   2019-01-07
 * @Last Modified by:   Marte
 * @description:
 */

// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "hmac": "hmac",
    "status": "0000",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
        "prizeCode": "21917492349785897274923749785897",
        "prizeCodePwd": "200000020000000020000000000",
    }
});

//把生成的假数据当做模块输出
module.exports = data;