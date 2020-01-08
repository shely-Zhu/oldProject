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
        "total": 10,
        "pages": 20,
        
        "list|10": [{
            "customerNo": "", //
            "prizeType|1": ["1","2"], //奖品类型
            "prizeName":"奖品名称奖品名称奖品名称奖品名称",
            "prizeDetailId":"1",//奖品明细id
            "createTime":"2019年1月1日",//创建时间
            "startTime":"2019年1月1日",//起始时间
            "endTime":"2019年2月1日",//截止时间
            "memo":"产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述",//备注
            "isAvailable|1":["0","1"],
            }]
    }
});

//把生成的假数据当做模块输出
module.exports = data;