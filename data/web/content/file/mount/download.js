

/*
 * @page: 电子确认书接口
 * @Author: tianjunguo
 * @Date:   2019-11-27 21:11:06
 * @Last Modified by:   tianjunguo
 * @Last Modified time: 2019-11-27 21:11:39
 * @description:
 */


// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var data = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
        "fileName": "064f4395-aa2c-4a1d-a419-040ab97afba1.png"
    }
});
module.exports = data;