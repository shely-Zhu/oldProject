/**
 * 已确认交易，待确认交易
 * @author peicongcong 2019-11-21
 * @param  {[type]} data [数据,自定义表头的数据也需要传递进来]
 * @param  {[type]} $ele [插入模板的元素]
 * @param  {[type]} $id  [模板id]
 */


var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var getCookie = require('@pathNewCommonJsCom/getCookie.js');
var setCookie = require('@pathNewCommonJsCom/setCookie.js');
var isConfirm = splitUrl['type'];
// 按钮变量
var operationNoStr = '';
var operationNoList = '';
module.exports = function(data, $ele, $id, type) {
    var $ele = $ele || $('.contentWrap'),
        $id = $id || $('#trans-template');
    if (isConfirm == 'confirmed') {
        setCookie('isconfirm', 1)
    } else if (isConfirm == 'toBeConfirmed') {
        setCookie('isconfirm', 0)
    }
    for (var i = 0; i < data.length; i++) {
        // 是否确认交易isConfirm 1-确认 0-未确认
        data[i].isConfirmTrans = getCookie('isconfirm') == 1 ? 1 : 0; //已确认
        data[i].notConfirmTrans = getCookie('isconfirm') == 0 ? 1 : 0; //未确认
        // 申购/认购
        data[i].businessType01 = (data[i].businessType == 0 || data[i].businessType == 1) ? 1 : 0;
        data[i].businessType0 = data[i].businessType == 0 && (data[i].leftTopStatus == 5) ? 1 : 0; //认购
        data[i].businessType1 = data[i].businessType == 1 && (data[i].leftTopStatus == 5) ? 1 : 0; //申购
        data[i].businessTypeSucc = data[i].leftTopStatus == 5 ? 1 : 0; //申购
        //待确认的预约

        // 按钮的字段
        operationNoStr = data[i].operationNo;
        if (operationNoStr) {
            operationNoList = operationNoStr.split(',');
        } else {
            operationNoList = [];
        }
        if (operationNoList && operationNoList.length > 0) {
            for (var j = 0; j < operationNoList.length; j++) {
                if (operationNoList[j] == '1') {
                    data[i].appointmentToAuthentication = true; //展示合格投资者认证
                }
                if (operationNoList[j] == '2') {
                    data[i].appointmentCancel = true; //展示取消预约按钮
                }
                if (operationNoList[j] == '3') {
                    data[i].reAppointment = true; //展示重新预约按钮
                }
                if (operationNoList[j] == '4' || operationNoList[j] == '9') {
                    data[i].appointmentToSign = true; //展示去签署合同
                }
                if (operationNoList[j] == '5' || operationNoList[j] == '10') {
                    data[i].appointmentToSee = true; //展示查看合同
                }
                if (operationNoList[j] == '8' || operationNoList[j] == '7' || operationNoList[j] == '12') {
                    data[i].appointmentToUpload = true; //展示上传汇款凭证
                }
                if (operationNoList[j] == '13' || operationNoList[j] == '14' || operationNoList[j] == '15') {
                    data[i].assignVideo = true; //展示视频双录按钮13 视频面签坐席14 视频面签状态15 视频面签开启
                }
                if (operationNoList[j] == '16') {
                    data[i].appointmentAffirm = true; //展示立即确认按钮（客户预约确认入口）
                }
                if (operationNoList[j] == '21') {
                    data[i].assignCancel = true; //展示取消转让按钮
                }
                if (operationNoList[j] == '31') {
                    data[i].assigneeCancel = true; //展示取消受让按钮
                }
                if (operationNoList[j] == '22') {
                    data[i].assignObj = true; //展示选择受让方
                }
                if (operationNoList[j] == '23') {
                    data[i].assignToVideo = true; //展示转让视频双录按钮
                }
                if (operationNoList[j] == '32') {
                    data[i].assigneeToVideo = true; //展示受让视频双录按钮
                }
            }
        }


        data[i].appointmentSuccess = data[i].leftBottomStatus == 18 ? 1 : 0; //合同审核成功
        data[i].appointmentFailed = data[i].leftBottomStatus == 19 ? 1 : 0; //合同审核失败
        //赎回
        data[i].businessTypeRedeem = (data[i].businessType == 2) || (data[i].businessType == 9) || (data[i].businessType == 8) ? 1 : 0;
        //分红
        data[i].businessTypeBonus = data[i].businessType == 7 ? 1 : 0;
        //已完成的预约
        data[i].businessTypeOrder = (data[i].businessType == 0 || data[i].businessType == 1) && (data[i].leftTopStatus == '21' || data[i].leftTopStatus == '22' || data[i].leftTopStatus == '23') ? 1 : 0;
        //转让
        data[i].businessType3 = data[i].businessType == 3 ? 1 : 0;
        //受让
        data[i].businessType4 = data[i].businessType == 4 ? 1 : 0;
        //是否签约中 展示转受让双录状态
        data[i].signing = (data[i].assignSubStatus == '05') || (data[i].assigneeSubStatus == '03') ? 1 : 0;
        data[i].redeemDate = data[i].redeemDate?data[i].redeemDate:'--'

    }
    console.log(data)
        //模板渲染页面
    generateTemplate(data, $ele, $id, type);
};