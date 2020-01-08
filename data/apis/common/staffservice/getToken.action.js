/*
 * @page: 人工客服-token获取
 * @Author: songxiaoyu
 * @Date:   2018-11-12 13:22:42
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-11-12 13:36:00
 * @description:
 */


var Mock = require('mockjs');

var data = Mock.mock({
    "hmac": "hmac", //预留加密字段
    "status": "0", // 0：成功 1：失败
    "code": "0", //业务操作代码
    "msg": "处理成功！", //业务操作msg
    "data": "a278e430-7a34-436e-935b-b3d50a00491f" //当前用户的token  
});


//根据传参数的不同进行处理
module.exports = data;