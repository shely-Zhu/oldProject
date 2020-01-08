/*
 * @page: 查询理顾信息--注册页新增接口
 * @Author: songxiaoyu
 * @Date:   2019-02-12 11:14:38
 * @Last Modified by:   songxiaoyu
 * @description:
 */



// 使用 Mock
var Mock = require('mockjs');

//开始造假数据…………………………………………………………………………………………………………………………………………………………

var data = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
        "broker_account": "H0111212", //理顾编号
        "name": "理顾姓名", //理顾姓名
        "photo": "", //照片地址
    },

});

module.exports = data;