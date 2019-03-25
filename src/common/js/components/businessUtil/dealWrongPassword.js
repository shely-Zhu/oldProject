/**
 * [dealWrongPassword 交易密码失败处理]
 * @author songxiaoyu 2018-10-18
 * @param  {[type]} json [description]
 * @return {[type]}      [description]
 */

var tipAction = require('../tipAction.js');

module.exports = function(json) {
    var that = this;
    $('.payPassword .eventBtn').removeAttr('disabled').removeClass('disabled');

    //失败，判断状态
    if (json.code == 'POF1353' || json.code == 'POF0192') {
        //隐藏网站交易密码弹框
        $('.payPassword').hide();
        //锁定
        tipAction('网站交易密码已锁定，请点击忘记密码进行找回', function() {
            //隐藏网站交易密码弹框
            $('.payPassword').show();
        });
    } else if (json.code == 'POF0102') { //输入错误
        //隐藏网站交易密码弹框
        $('.payPassword').hide();
        tipAction('网站交易密码错误', function() {
            //隐藏网站交易密码弹框
            $('.payPassword').show();
        });
    } else if (json.code == 'POF1101' || json.code == 'POF1152' ||
        json.code == 'POF1907' || json.code == 'POF3123' ||
        json.code == 'POF4609' || json.code == 'POF7453' ||
        json.code == 'POF7457' || json.code == 'POF9020' ||
        json.code == 'POF9036') {
        //银行卡余额不足

        //隐藏网站交易密码弹框
        $('.payPassword').hide();
        tipAction('购买金额大于银行卡余额', function() {
            //隐藏网站交易密码弹框
            $('.payPassword').show();
        });
    } else {
        //隐藏网站交易密码弹框
        $('.payPassword').hide();
        tipAction(json.msg, function() {
            //隐藏网站交易密码弹框
            $('.payPassword').show();
        });
    }
};