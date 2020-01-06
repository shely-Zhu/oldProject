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
        "fundDiagnosisSex": [
        {
        "dicCode": 0,
        "dicType": "fundDiagnosisSex",
        "rank": 0,
        "value": "男"
        },
        {
        "dicCode": 1,
        "dicType": "fundDiagnosisSex",
        "rank": 1,
        "value": "女"
        }
        ],
        "fundDiagnosisInvestDuration": [
        {
        "dicCode": 1,
        "dicType": "fundDiagnosisInvestDuration",
        "rank": 1,
        "value": "没有经验"
        },
        {
        "dicCode": 2,
        "dicType": "fundDiagnosisInvestDuration",
        "rank": 2,
        "value": "2年以下"
        },
        {
        "dicCode": 3,
        "dicType": "fundDiagnosisInvestDuration",
        "rank": 3,
        "value": "2-5年"
        },
        {
        "dicCode": 4,
        "dicType": "fundDiagnosisInvestDuration",
        "rank": 4,
        "value": "5-10年"
        },
        {
        "dicCode": 5,
        "dicType": "fundDiagnosisInvestDuration",
        "rank": 5,
        "value": "10年以上"
        }
        ]
        },
        "message": "操作成功！",
        "status": "0000"
});





//根据传参数的不同进行处理

module.exports = data;