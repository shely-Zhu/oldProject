/*
 * @page: 全平台协议ID查询--公募购买风险揭示函
 * @Author: songxiaoyu
 * @Date:   2018-08-07 15:20:34
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-08-07 15:29:57
 * @description:
 */
/*
    协议查询(含附件信息)
*/

// 使用 Mock
var Mock = require('mockjs');

var queryProtocols = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
        "protocolList": [{
            "id": "",
            "title": "申请资料说明－（无标签申请专业）－自然人",
            "catagory": "0"
        }],
        "electronicList": [{
            "id": "61",
            "title": "电子合同风险揭示书",
            "catagory": "0"
        }, ],
        "riskDocList": [{
            "id": "62",
            "title": "风险揭示书",
            "catagory": "2"
        }]
    }

});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = queryProtocols;