/*
 * @page: 登录接口模拟---判断登录状态
 * @Author: songxiaoyu
 * @Date:   2018-09-21 14:08:10
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-09-25 15:27:45
 * @description:
 */


// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var data = Mock.mock({ 
    "hmac": "hmac", 
    "status": "0", 
    "code": "CS0000", 
    "msg": "处理成功！", 
    "data": {
        "isLogin":"1", //登录状态【1.登录 2.未登录】
		"custType":"0", //客户类型【0.机构 1.个人】
		"maskName":"张三",//用户名
		"orgContactName":"张三",//机构代理人名称
		"customerNo":"1101",//客户编号
    }
});

module.exports = data;
