/**
 * 证件到期弹框提示
 * @author  sunfuping 2019-1-2
 *
 * 私募、公募、我的三个页面初始化调用
 * val1：false 不需要请求checkuserinfo和getuserinfo   true请求checkuserinfo和getuserinfo 
 */

/**
 * [isLogin 未知客户类型，请求用户信息接口，如果登录了，再执行弹窗逻辑，未登录不做信息冻结处理]
 * @author songxiaoyu 2019-02-18
 * @param  {[type]}  comeUrl [当前url]
 * @return {Boolean}         [description]
 */
function isLogin(comeUrl) {
    var obj = [{
        url: site_url.checkUserInfo_api,
        data: null,
        async: false,
        needLogin: true,
        dataType: 'jsonp',
        needCrossDomain: true,
        loginNotJump: true,
        needDataEmpty: false,
        callbackDone: function() {
            isCustType(comeUrl);
        },
        callbackFail: function(data) {
            tipAction(data.msg);
        }
    }]
    $.ajaxLoading(obj);
};

function isCustType(comeUrl) {
    var userObj = [{
        url: site_url.user_api,
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
            var value = (jsonData.custType == "0" || jsonData.custType == "2") ? true : false; //机构为true
            alertMsg(value, comeUrl);
        },
        callbackFail: function(data) {
            tipAction(data.msg);
        }
    }]
    $.ajaxLoading(userObj);
};

/**
 * [alertMsg 弹窗]
 * @author sunfuping
 * @param  {[type]} value   [是否是机构客户]
 * @param  {[type]} comeUrl [当前url]
 * @return {[type]}         [description]
 */
function alertMsg(value, comeUrl) {
    var obj = [{
        url: site_url.unreadMsgCount_api, // 未读消息数量
        data: {
            hmac: "", //预留的加密信息     
            params: { //请求的参数信息                  
                msgCode: "idexpire"
            }
        },
        needLogin: true,
        callbackDone: function(data) {
            var msgAmount = data.data.msgAmount;
            if (msgAmount > 0) { // 有未读消息
                // 获取弹框提示的内容
                var getMessageByPages = [{
                    url: site_url.getMessageByPages_api, // 我的消息查询
                    data: {
                        hmac: "", //预留的加密信息     
                        params: { //请求的参数信息                  
                            page_no: "1", // 当前页 
                            page_size: "10", //每页记录数 
                            msgCode: "idexpire", //消息类型(不传为所有类型，idexpire:证件即将到期) 
                            msgStatus: "1" //消息状态(不传为所有状态，0已读1未读) 
                        }
                    },
                    needLogin: true,
                    callbackDone: function(data) {
                        var pageList = data.data.pageList;
                        var idDateObj = {
                            title: '温馨提示',
                            p: pageList[0].msgContent,
                            yesTxt: value ? '确认' : '完善资料',
                            celTxt: '不再提示',
                            id: 'idDate',
                            yesButtonPosition: 'right',
                            callback: function(t) {
                                if (!value) {
                                    window.location.href = site_url.perBass_url + '?originUrl=' + new Base64().encode(comeUrl); // 点击完善资料跳转到基本信息页 
                                };
                                readed(pageList[0].msgId);
                                t.hide();
                            },
                            callbackCel: function(t) { // 点击不在提示设置消息未读变已读
                                readed(pageList[0].msgId);
                            },
                        }
                        $.elasticLayer(idDateObj);
                    },
                    callbackFail: function(data) {
                        tipAction(data.msg);
                    }
                }];
                $.ajaxLoading(getMessageByPages);
            }
        },
        callbackFail: function(data) {
            tipAction(data.msg);
        }
    }];
    $.ajaxLoading(obj);
};


/**
 * [readed 消息不在提示接口]
 * @author songxiaoyu 2019-02-18
 * @param  {[type]} msgId [消息id]
 */
function readed(msgId) {
    var alterMsgStatus = [{
        url: site_url.alterMsgStatus_api, // 未读消息变已读
        data: {
            hmac: "", //预留的加密信息     
            params: { //请求的参数信息                  
                msgId: msgId //消息id
            }
        },
        needLogin: true,
        callbackDone: function(data) {

        },
        callbackFail: function(data) {
            tipAction(data.msg);
        }
    }];
    $.ajaxLoading(alterMsgStatus);
}
/**
 * [exports 如果已知客户类型，]
 * @author sunfuping
 * @param  {[type]} val1    [是否已知客户类型]
 * @param  {[type]} comeUrl [当前url]
 * @param  {[type]} val2    [客户类型]
 */
module.exports = function(val1, comeUrl, val2) {
    if (!val1) { // 已知客户类型，直接弹窗
        var iscustType = val2 == "0" ? true : false; //机构为true
        alertMsg(iscustType, comeUrl);
    } else { // 未知客户类型，请求用户信息接口，再弹窗逻辑
        isLogin(comeUrl);
    }

}