/**
 * [renderBankList 银行卡列表数据渲染]
 * @author songxiaoyu 2018-10-16
 * @param  {[type]} data [数据]
 * @param  {[type]} $ele [插入模板的元素]
 * @param  {[type]} $id  [模板id]
 */
var generateTemplate = require('./generateTemplate.js');

// 展开收起
require('../openOrClose.js');


module.exports = function(data, $ele, $id) {
    var that = this,
        $ele = $ele || $('.dealCard .bankList'),
        $id = $id || $('#bankList-template');

    if (!$.util.objIsEmpty(data.bankList)) {
        //有银行卡数据
        var bankList = data.bankList;

        //hide:1 ，表示这一条是隐藏起来的
        $.each(bankList, function(i, el) {
            // 默认展示2条，如果需要其他配置，需重新传参
            if (i > (2 - 1)) {
                el.hide = 1;
            }
            var ba = el.bankAccount;
            el.banknum = ba.substring(ba.length - 4);
        })

        //more:1，表示需要更多收起按钮
        var data = {
            more: bankList.length > 2 ? 1 : 0,
            list: bankList
        }

        // 模板渲染
        generateTemplate(data, $ele, $id);
        // 默认选中第一张银行卡
        $('.bankList .mui-radio').eq(0).find('input[type=radio]').attr('checked', 'checked');
    }
};