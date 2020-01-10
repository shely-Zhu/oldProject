/**
 * 账户冻结弹框提示
 * @author  sunfuping 2019-1-2
 *
 * 私募预约、私募赎回、公募买入、公募赎回、购买，赎回的详情页面初始化调用
 *
 *value买入传buyFreeze  卖出传saleFreeze 
 *
 * 买入 需要判断是否证件过期以及是否司法冻结 卖出只需判断是否司法冻结
 *
 *url 调用的方法的当前页面 
 *
 * custType  机构客户和个人  如果拿不到传false   能拿到传具体的值
 * 
 */
var tipAction = require('./tipAction.js');
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js');

function isCustTypeOne(outdateFreezeStatus, lawFreezeStatus, url, custType, value, htmdEvt) {
    var f = false;
    var userObj = [{
        //由于恒小智-赎回用到了，改成新接口
        //url: site_url.user_api,
        url: site_url.queryUserBaseInfo_api,
        data: {
            hmac: "", //预留的加密信息     
            params: { //请求的参数信息
            }
        },
        async: false,
        riskIsData: true,
        appRisk: true,
        needDataEmpty: false,
        needLogin: true,
        callbackDone: function(data, fnc) {

            var jsonData = data.data;
            // 获取客户是机构客户还是个人客户
            f = elasticLayer(outdateFreezeStatus, lawFreezeStatus, url, jsonData.accountType, value, htmdEvt); // 调用弹框
        },

    }]
    $.ajaxLoading(userObj);
    return f;
};

function elasticLayer(outdateFreezeStatus, lawFreezeStatus, url, custType, value, htmdEvt) {

    var custType = (custType == "0" || custType == "2") ? true : false; //机构为true

    if (lawFreezeStatus == 1) {
        //$.elasticLayerTypeTwo({
        $.elasticLayer({
            id: "tip",
            title: '温馨提示',
            p: '<p>因司法原因该账户被冻结，请联系客服咨询！客服电话：400-8980-618</p>',
            yesTxt: '确定',
            hideCelButton: true, //为true时隐藏cel按钮，仅使用yes按钮的所有属性
            htmdEvtYes: htmdEvt,
            zIndex: 100,
            callback: function() {}
        });
        return true;
    } else if (outdateFreezeStatus == 1 && value == 'buyFreeze') {
        var idDateObj = {};

        if (custType) { // 机构客户

            idDateObj = {
                title: '温馨提示',
                p: '因过期原因该账户被冻结，请联系理财师或咨询客服！客服电话：400-8980-618',
                htmdEvtYes: htmdEvt,
                yesTxt: '明白了',
                hideCelButton: true, //为true时隐藏cel按钮，仅使用yes按钮的所有属性
                zIndex: 100,
                callback: function(t) {},
            }
        } else { // 个人展示完善资料
            idDateObj = {
                title: '温馨提示',
                p: '您的证件已过期，补充证件信息后才可能继续交易',
                yesTxt: '完善资料', // 个人展示完善资料
                celTxt: '取消',
                yesButtonPosition: 'right',
                htmdEvtYes: htmdEvt,
                callback: function(t) {
                    t.hide();
                    window.location.href = site_url.perfectInfo_url + '?originUrl=' + new Base64().encode(url); // 点击完善资料跳转到基本信息页
                },

            }
        }

        $.elasticLayer(idDateObj);
        return true;
    }
};

module.exports = function(value, url, custType, htmdEvt) {
    var r = false;

    var alterMsgStatus = [{
        url: site_url.queryFreezeStatus_api,
        data: {
            hmac: "", //预留的加密信息     
            params: { //请求的参数信息

            }
        },
        async: false,
        needLogin: true,
        callbackDone: function(data) {
            var data = data.data,
                buyFreeze = data.buyFreeze,
                saleFreeze = data.saleFreeze;
            if ((value == "buyFreeze" && buyFreeze == 1) || (value == "saleFreeze" && saleFreeze == 1)) {
                if (custType) { // 如果传客户类型调用弹框的方法
                    r = elasticLayer(data.outdateFreezeStatus, data.lawFreezeStatus, url, custType, value, htmdEvt);
                } else { // 如果没传调用getuserinfo接口获取客户类型
                    r = isCustTypeOne(data.outdateFreezeStatus, data.lawFreezeStatus, url, custType, value, htmdEvt);
                }
            }
        },
        callbackFail: function(json) {
            tipAction(json.message);
            r = true;
        }
    }];
    $.ajaxLoading(alterMsgStatus);

    return r;
}