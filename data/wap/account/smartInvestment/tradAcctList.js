/*
 * @page: 
 * @Author: songxiaoyu
 * @Date:   2019-04-29 15:41:59
 * @Last Modified by:   songxiaoyu
 * @description:
 */


/*
    智能投顾-组合持仓列表
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var data = Mock.mock({
    "data": [{
        "bankAccount": "6230228745126241",
        "bankAccountMask": "623*********6241",
        "bankAccountSecret": "7818c04b8f15196854065c461c68c36edee2768fa5d318c36f598819853312d5",
        "bankName": "华夏银行",
        "bankNo": "012",
        "tradeAcco": "ZHLC000000003983"
    }],
    "message": "操作成功！",
    "status": "0000"
});

//把生成的假数据当做模块输出
module.exports = data;