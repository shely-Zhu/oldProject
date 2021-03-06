/*

  会员权益详情

*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock(
  {
    "data":{
        "pageItems":{
            "totalCount":73,
            "totalPages":8
        },
        "pageList":[
            {
                "assignAmount":"0.00",
                "assignDate":null,
                "assignShare":"0.00",
                "assignStep":null,
                "assigneeAmount":"0.00",
                "assigneeDate":null,
                "assigneeShare":"",
                "assigneeStep":null,
                "businessCompareReference":"",
                "businessCompareReferenceMask":"",
                "businessCompareReferenceMax":"",
                "businessCompareReferenceMin":"",
                "businessType":1,
                "businessTypeDesc":"申购",
                "confirmAmount":"0.00",
                "confirmDate":null,
                "confirmShare":"0.00",
                "contractName":"",
                "contractUrl":"",
                "doneAmount":"0.00",
                "empName":"",
                "empNo":"",
                "firstOrAppend":0,
                "isForElec":"0",
                "isQualified":0,
                "leftBottomStatus":"11",
                "leftBottomStatusDesc":"待理财师确认",
                "leftTopStatus":"0",
                "leftTopStatusDesc":"待确认",
                "operationNo":"2,16",
                "paymentType":0,
                "productId":17666,
                "projectId":32057,
                "projectName":"sale-发行中-浮收-非专销",
                "redeemDate":null,
                "redeemPortion":"0.00",
                "reserveAmount":"1,000,000.00",
                "reserveId":55977,
                "reserveStatusTip":"新客户需理顾确认后才可以进行排队！请联系理顾进行确认",
                "reserveTime":"2019-12-16"
            },{
                "assignAmount":"0.00",
                "assignDate":null,
                "assignShare":"0.00",
                "assignStep":null,
                "assigneeAmount":"0.00",
                "assigneeDate":null,
                "assigneeShare":"",
                "assigneeStep":null,
                "businessCompareReference":"",
                "businessCompareReferenceMask":"",
                "businessCompareReferenceMax":"",
                "businessCompareReferenceMin":"",
                "businessType":1,
                "businessTypeDesc":"申购",
                "confirmAmount":"0.00",
                "confirmDate":null,
                "confirmShare":"0.00",
                "contractName":"",
                "contractUrl":"",
                "doneAmount":"0.00",
                "empName":"",
                "empNo":"",
                "firstOrAppend":0,
                "isForElec":"0",
                "isQualified":0,
                "leftBottomStatus":"11",
                "leftBottomStatusDesc":"待理财师确认",
                "leftTopStatus":"0",
                "leftTopStatusDesc":"待确认",
                "operationNo":"2,14",
                "paymentType":0,
                "productId":17666,
                "projectId":32057,
                "projectName":"sale-发行中-浮收-非专销",
                "redeemDate":null,
                "redeemPortion":"0.00",
                "reserveAmount":"1,000,000.00",
                "reserveId":55977,
                "reserveStatusTip":"新客户需理顾确认后才可以进行排队！请联系理顾进行确认",
                "reserveTime":"2019-12-16"
            },
            {
                "assignAmount":"0.00",
                "assignDate":null,
                "assignShare":"0.00",
                "assignStep":null,
                "assigneeAmount":"0.00",
                "assigneeDate":null,
                "assigneeShare":"",
                "assigneeStep":null,
                "businessCompareReference":"",
                "businessCompareReferenceMask":"",
                "businessCompareReferenceMax":"",
                "businessCompareReferenceMin":"",
                "businessType":2,
                "businessTypeDesc":"赎回",
                "confirmAmount":"0.00",
                "confirmDate":null,
                "confirmShare":"0.00",
                "contractName":"",
                "contractUrl":"",
                "doneAmount":"0.00",
                "empName":"",
                "empNo":"",
                "firstOrAppend":null,
                "isForElec":"",
                "isQualified":null,
                "leftBottomStatus":"",
                "leftBottomStatusDesc":"",
                "leftTopStatus":"0",
                "leftTopStatusDesc":"待确认",
                "operationNo":"2,14",
                "paymentType":null,
                "productId":21860,
                "projectId":20354,
                "projectName":"稳金1号测试产品20190322第1次开放",
                "redeemDate":"2019-12-12",
                "redeemPortion":"10,000.00",
                "reserveAmount":"0.00",
                "reserveId":null,
                "reserveStatusTip":"",
                "reserveTime":null
            },
            {
                "assignAmount":"0.00",
                "assignDate":null,
                "assignShare":"0.00",
                "assignStep":null,
                "assigneeAmount":"0.00",
                "assigneeDate":null,
                "assigneeShare":"",
                "assigneeStep":null,
                "businessCompareReference":"",
                "businessCompareReferenceMask":"",
                "businessCompareReferenceMax":"",
                "businessCompareReferenceMin":"",
                "businessType":2,
                "businessTypeDesc":"赎回",
                "confirmAmount":"0.00",
                "confirmDate":null,
                "confirmShare":"0.00",
                "contractName":"",
                "contractUrl":"",
                "doneAmount":"0.00",
                "empName":"",
                "empNo":"",
                "firstOrAppend":null,
                "isForElec":"",
                "isQualified":null,
                "leftBottomStatus":"",
                "leftBottomStatusDesc":"",
                "leftTopStatus":"3",
                "leftTopStatusDesc":"审核通过",
                "operationNo":"",
                "paymentType":null,
                "productId":21860,
                "projectId":20354,
                "projectName":"稳金1号测试产品20190322第1次开放",
                "redeemDate":"2019-12-10",
                "redeemPortion":"10,000.00",
                "reserveAmount":"0.00",
                "reserveId":null,
                "reserveStatusTip":"",
                "reserveTime":null
            },
            {
                "assignAmount":"0.00",
                "assignDate":null,
                "assignShare":"0.00",
                "assignStep":null,
                "assigneeAmount":"0.00",
                "assigneeDate":null,
                "assigneeShare":"",
                "assigneeStep":null,
                "businessCompareReference":"",
                "businessCompareReferenceMask":"",
                "businessCompareReferenceMax":"",
                "businessCompareReferenceMin":"",
                "businessType":2,
                "businessTypeDesc":"赎回",
                "confirmAmount":"0.00",
                "confirmDate":null,
                "confirmShare":"0.00",
                "contractName":"",
                "contractUrl":"",
                "doneAmount":"0.00",
                "empName":"",
                "empNo":"",
                "firstOrAppend":null,
                "isForElec":"",
                "isQualified":null,
                "leftBottomStatus":"",
                "leftBottomStatusDesc":"",
                "leftTopStatus":"3",
                "leftTopStatusDesc":"审核通过",
                "operationNo":"",
                "paymentType":null,
                "productId":21860,
                "projectId":20354,
                "projectName":"稳金1号测试产品20190322第1次开放",
                "redeemDate":"2019-12-10",
                "redeemPortion":"10,000.00",
                "reserveAmount":"0.00",
                "reserveId":null,
                "reserveStatusTip":"",
                "reserveTime":null
            },
            {
                "assignAmount":"0.00",
                "assignDate":null,
                "assignShare":"0.00",
                "assignStep":null,
                "assigneeAmount":"0.00",
                "assigneeDate":null,
                "assigneeShare":"",
                "assigneeStep":null,
                "businessCompareReference":"",
                "businessCompareReferenceMask":"",
                "businessCompareReferenceMax":"",
                "businessCompareReferenceMin":"",
                "businessType":2,
                "businessTypeDesc":"赎回",
                "confirmAmount":"0.00",
                "confirmDate":null,
                "confirmShare":"0.00",
                "contractName":"",
                "contractUrl":"",
                "doneAmount":"0.00",
                "empName":"",
                "empNo":"",
                "firstOrAppend":null,
                "isForElec":"",
                "isQualified":null,
                "leftBottomStatus":"",
                "leftBottomStatusDesc":"",
                "leftTopStatus":"3",
                "leftTopStatusDesc":"审核通过",
                "operationNo":"",
                "paymentType":null,
                "productId":21860,
                "projectId":20354,
                "projectName":"稳金1号测试产品20190322第1次开放",
                "redeemDate":"2019-12-09",
                "redeemPortion":"10,000.00",
                "reserveAmount":"0.00",
                "reserveId":null,
                "reserveStatusTip":"",
                "reserveTime":null
            },
            {
                "assignAmount":"0.00",
                "assignDate":null,
                "assignShare":"0.00",
                "assignStep":null,
                "assigneeAmount":"0.00",
                "assigneeDate":null,
                "assigneeShare":"",
                "assigneeStep":null,
                "businessCompareReference":"",
                "businessCompareReferenceMask":"",
                "businessCompareReferenceMax":"",
                "businessCompareReferenceMin":"",
                "businessType":2,
                "businessTypeDesc":"赎回",
                "confirmAmount":"0.00",
                "confirmDate":null,
                "confirmShare":"0.00",
                "contractName":"",
                "contractUrl":"",
                "doneAmount":"0.00",
                "empName":"",
                "empNo":"",
                "firstOrAppend":null,
                "isForElec":"",
                "isQualified":null,
                "leftBottomStatus":"",
                "leftBottomStatusDesc":"",
                "leftTopStatus":"3",
                "leftTopStatusDesc":"审核通过",
                "operationNo":"",
                "paymentType":null,
                "productId":21860,
                "projectId":20354,
                "projectName":"稳金1号测试产品20190322第1次开放",
                "redeemDate":"2019-12-09",
                "redeemPortion":"10,000.00",
                "reserveAmount":"0.00",
                "reserveId":null,
                "reserveStatusTip":"",
                "reserveTime":null
            },
            {
                "assignAmount":"0.00",
                "assignDate":null,
                "assignShare":"0.00",
                "assignStep":null,
                "assigneeAmount":"0.00",
                "assigneeDate":null,
                "assigneeShare":"",
                "assigneeStep":null,
                "businessCompareReference":"",
                "businessCompareReferenceMask":"",
                "businessCompareReferenceMax":"",
                "businessCompareReferenceMin":"",
                "businessType":2,
                "businessTypeDesc":"赎回",
                "confirmAmount":"0.00",
                "confirmDate":null,
                "confirmShare":"0.00",
                "contractName":"",
                "contractUrl":"",
                "doneAmount":"0.00",
                "empName":"",
                "empNo":"",
                "firstOrAppend":null,
                "isForElec":"",
                "isQualified":null,
                "leftBottomStatus":"",
                "leftBottomStatusDesc":"",
                "leftTopStatus":"3",
                "leftTopStatusDesc":"审核通过",
                "operationNo":"",
                "paymentType":null,
                "productId":21860,
                "projectId":20354,
                "projectName":"稳金1号测试产品20190322第1次开放",
                "redeemDate":"2019-12-06",
                "redeemPortion":"10,000.00",
                "reserveAmount":"0.00",
                "reserveId":null,
                "reserveStatusTip":"",
                "reserveTime":null
            },
            {
                "assignAmount":"0.00",
                "assignDate":null,
                "assignShare":"0.00",
                "assignStep":null,
                "assigneeAmount":"0.00",
                "assigneeDate":null,
                "assigneeShare":"",
                "assigneeStep":null,
                "businessCompareReference":"",
                "businessCompareReferenceMask":"",
                "businessCompareReferenceMax":"",
                "businessCompareReferenceMin":"",
                "businessType":2,
                "businessTypeDesc":"赎回",
                "confirmAmount":"0.00",
                "confirmDate":null,
                "confirmShare":"0.00",
                "contractName":"",
                "contractUrl":"",
                "doneAmount":"0.00",
                "empName":"",
                "empNo":"",
                "firstOrAppend":null,
                "isForElec":"",
                "isQualified":null,
                "leftBottomStatus":"",
                "leftBottomStatusDesc":"",
                "leftTopStatus":"3",
                "leftTopStatusDesc":"审核通过",
                "operationNo":"2,14",
                "paymentType":null,
                "productId":21860,
                "projectId":20354,
                "projectName":"稳金1号测试产品20190322第1次开放",
                "redeemDate":"2019-12-06",
                "redeemPortion":"10,000.00",
                "reserveAmount":"0.00",
                "reserveId":null,
                "reserveStatusTip":"",
                "reserveTime":null
            },
            {
                "assignAmount":"0.00",
                "assignDate":null,
                "assignShare":"0.00",
                "assignStep":null,
                "assigneeAmount":"0.00",
                "assigneeDate":null,
                "assigneeShare":"",
                "assigneeStep":null,
                "businessCompareReference":"",
                "businessCompareReferenceMask":"",
                "businessCompareReferenceMax":"",
                "businessCompareReferenceMin":"",
                "businessType":2,
                "businessTypeDesc":"赎回",
                "confirmAmount":"0.00",
                "confirmDate":null,
                "confirmShare":"0.00",
                "contractName":"",
                "contractUrl":"",
                "doneAmount":"0.00",
                "empName":"",
                "empNo":"",
                "firstOrAppend":null,
                "isForElec":"",
                "isQualified":null,
                "leftBottomStatus":"",
                "leftBottomStatusDesc":"",
                "leftTopStatus":"3",
                "leftTopStatusDesc":"审核通过",
                "operationNo":"",
                "paymentType":null,
                "productId":21860,
                "projectId":20354,
                "projectName":"稳金1号测试产品20190322第1次开放",
                "redeemDate":"2019-12-06",
                "redeemPortion":"10,000.00",
                "reserveAmount":"0.00",
                "reserveId":null,
                "reserveStatusTip":"",
                "reserveTime":null
            },
            {
                "assignAmount":"0.00",
                "assignDate":null,
                "assignShare":"0.00",
                "assignStep":null,
                "assigneeAmount":"0.00",
                "assigneeDate":null,
                "assigneeShare":"",
                "assigneeStep":null,
                "businessCompareReference":"",
                "businessCompareReferenceMask":"",
                "businessCompareReferenceMax":"",
                "businessCompareReferenceMin":"",
                "businessType":2,
                "businessTypeDesc":"赎回",
                "confirmAmount":"0.00",
                "confirmDate":null,
                "confirmShare":"0.00",
                "contractName":"",
                "contractUrl":"",
                "doneAmount":"0.00",
                "empName":"",
                "empNo":"",
                "firstOrAppend":null,
                "isForElec":"",
                "isQualified":null,
                "leftBottomStatus":"",
                "leftBottomStatusDesc":"",
                "leftTopStatus":"3",
                "leftTopStatusDesc":"审核通过",
                "operationNo":"",
                "paymentType":null,
                "productId":21860,
                "projectId":20354,
                "projectName":"稳金1号测试产品20190322第1次开放",
                "redeemDate":"2019-12-06",
                "redeemPortion":"10,000.00",
                "reserveAmount":"0.00",
                "reserveId":null,
                "reserveStatusTip":"",
                "reserveTime":null
            }
        ]
    },
    "message":"操作成功！",
    "status":"0000"
}
);
module.exports = data;