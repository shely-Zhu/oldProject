/*
 * @page: 因新增汇付天下支付-需重新鉴权逻辑
 * @Author: songxiaoyu
 * @Date:   2018-11-09 13:26:46
 * 
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-11-09 17:22:14
 * @description:涉及页面：现金宝购买，公募购买
 */
require('@pathCommonJsCom/elasticLayerTypeTwo.js');
// 密码错误处理
var dealWrongPassword = require('@pathCommonJsComBus/dealWrongPassword.js');

module.exports = function(json) {
    if (json.code == 'HS347' || json.code == 'HS0862' || json.code == 'HSPF6') {
        //隐藏网站交易密码弹框
        $('.payPassword .eventBtn').removeAttr('disabled').removeClass('disabled');
        $('.payPassword').hide();
        // 引导客户重新鉴权
        $.elasticLayerTypeTwo({
            id: "tip",
            title: '提示',
            p: '<p>当前银行卡已失效，请选择其他银行卡或登录恒天官网/恒天财富APP重新签约该卡后继续支付。</p>',
            buttonTxt: '好的',
            zIndex: 100,
        })
    } else {
        // 走密码错误判断
        dealWrongPassword(json)
    }
}