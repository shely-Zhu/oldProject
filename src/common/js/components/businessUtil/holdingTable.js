/**
 * [bankList 持仓表格渲染]
 * @author songxiaoyu 2018-10-16
 * @param  {[type]} data [数据,自定义表头的数据也需要传递进来]
 * @param  {[type]} $ele [插入模板的元素]
 * @param  {[type]} $id  [模板id]
 */


var generateTemplate = require('./generateTemplate.js');

module.exports = function(data, $ele, $id) {
    var $ele = $ele || $('.holdingDetail'),
        $id = $id || $('#holdingTable-template');
        if (!$.util.objIsEmpty(data.list) && !$.util.objIsEmpty(data.title)) {
            // 根据title数量，设置列的宽度
            data['colName'] = 'mui-col-xs-'+ (12/data.title.length);
            // 有表头，有表格列表
            generateTemplate(data, $ele, $id);
        } else{
            // 没有数据，隐藏dom
            $('.holdingDetail').hide();
        }
};