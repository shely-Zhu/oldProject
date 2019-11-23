/**
 * 已确认交易，待确认交易
 * @author peicongcong 2019-11-21
 * @param  {[type]} data [数据,自定义表头的数据也需要传递进来]
 * @param  {[type]} $ele [插入模板的元素]
 * @param  {[type]} $id  [模板id]
 */


var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var isConfirm = splitUrl['type'];
var operationNoStr = '';
var operationNoList = '';
module.exports = function(data, $ele, $id) {
    var $ele = $ele || $('.contentWrap'),
        $id = $id || $('#trans-template');
    for (var i = 0; i < data.length; i++) {
        // 是否确认交易isConfirm 1-确认 0-未确认
        data[i].isConfirmTrans = isConfirm == 'confirmed' ? 1 : 0; //已确认
        data[i].notConfirmTrans = isConfirm == 'toBeConfirmed' ? 1 : 0; //未确认
        // 申购
        data[i].businessType1 = data[i].businessType == 1 ? 1 : 0;
        //待确认的预约
        // 按钮的字段
        operationNoStr = data[i].operationNo;
        if (operationNoStr) {
            operationNoList = operationNoStr.split(',');
        }
        if (operationNoList.length > 0) {
            for (var j = 0; j < operationNoList.length; j++) {
                if (operationNoList[j] == '1') {
                    data[i].appointmentToAuthentication = true; //展示合格投资者认证
                }
                if (operationNoList[j] == '2') {
                    data[i].appointmentCancel = true; //展示取消按钮
                }
                if (operationNoList[j] == '4') {
                    data[i].appointmentToSign = true; //展示去签署合同
                }
                if (operationNoList[j] == '5') {
                    data[i].appointmentToSee = true; //展示查看合同
                }
                if (operationNoList[j] == '8') {
                    data[i].appointmentToUpload = true; //展示上传汇款凭证
                }
            }
        }
        console.log(operationNoList)
        data[i].appointmentSigned = data[i].reserveStatus == 3 ? 1 : 0; //已签约
        data[i].appointmentSuccess = data[i].reserveStatus == 4 ? 1 : 0; //合同审核成功
        data[i].appointmentFailed = data[i].reserveStatus == 5 ? 1 : 0; //合同审核失败
        data[i].appointmentFinished = data[i].reserveStatus == 4 || 5 ? 1 : 0; //合同成功和失败



        //赎回
        data[i].businessType2 = data[i].businessType == 2 ? 1 : 0;
        data[i].redemptionRejected = data[i].redeemStatus == 4 || 5 ? 1 : 0; //已确认审核驳回状态
        data[i].redemptionAuditSuccess = data[i].redeemStatus == 3 ? 1 : 0; //待确认审核通过状态
        data[i].redemptionSuccess = data[i].redeemStatus == 7 ? 1 : 0; //待确认审核通过状态
        //分红
        data[i].businessType3 = data[i].businessType == 3 ? 1 : 0;
        //预约
        data[i].businessType45 = data[i].businessType == (4 || 5) ? 1 : 0;


    }
    console.log(data)
        //模板渲染页面
    generateTemplate(data, $ele, $id);
};