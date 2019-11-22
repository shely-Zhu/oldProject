/**
 * 已确认交易，待确认交易
 * @author peicongcong 2019-11-21
 * @param  {[type]} data [数据,自定义表头的数据也需要传递进来]
 * @param  {[type]} $ele [插入模板的元素]
 * @param  {[type]} $id  [模板id]
 */


var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var isConfirm = splitUrl['isConfirm'];
module.exports = function(data, $ele, $id) {
    var $ele = $ele || $('.contentWrap'),
        $id = $id || $('#trans-template');
    // 是否确认交易isConfirm 1-确认 0-未确认
    var isConfirmTrans = isConfirm == 1 ? 1 : 0;
    var notConfirmTrans = isConfirm == 0 ? 1 : 0;
    // 申购
    var businessType1 = data.businessType == 1 ? 1 : 0;
    console.log(isConfirm)
        // if (!$.util.objIsEmpty(data.list) && !$.util.objIsEmpty(data.title)) {
        //     // 根据title数量，设置列的宽度
        //     data['colName'] = 'mui-col-xs-' + (12 / data.title.length);
        //     // 有表头，有表格列表
    generateTemplate(data, $ele, $id);
    // } else {
    //     // 没有数据，隐藏dom
    //     $('.holdingDetail').hide();
    // }
};