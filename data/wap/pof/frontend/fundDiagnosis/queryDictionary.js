/*
 * @page: 基金诊断字典接口
 * @Author: songxiaoyu
 * @Date:   2019-08-20 18:02:03
 * @Last Modified by:   songxiaoyu
 * @description:
 */

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    "data": {
        "list": [{
                "createId": "C1",
                "createTime": "2019-08-20 10:20:26.0",
                "dicCode": 1,
                "dicType": "fundDiagnosisKey",
                "id": 12,
                "parentId": null,
                "rank": 4,
                "remark": "基金诊断字典",
                "updateId": "C1",
                "updateTime": "2019-08-20 10:20:26.0",
                "value": "测试基金诊断字典值1"
            },
            {
                "createId": "C1",
                "createTime": "2019-08-20 10:20:26.0",
                "dicCode": 2,
                "dicType": "fundDiagnosisKey",
                "id": 13,
                "parentId": null,
                "rank": 4,
                "remark": "基金诊断字典",
                "updateId": "C1",
                "updateTime": "2019-08-20 10:20:26.0",
                "value": "测试基金诊断字典值2"
            },
            {
                "createId": "C1",
                "createTime": "2019-08-20 10:20:26.0",
                "dicCode": 3,
                "dicType": "fundDiagnosisKey",
                "id": 14,
                "parentId": null,
                "rank": 4,
                "remark": "基金诊断字典",
                "updateId": "C1",
                "updateTime": "2019-08-20 10:20:26.0",
                "value": "测试基金诊断字典值3"
            }
        ]
    },
    "message": "操作成功！",
    "status": "0000"
});





//根据传参数的不同进行处理

module.exports = data;