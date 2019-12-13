/**
 * [generateTemplate 页面模板拼接]
 * @author songxiaoyu 2018-10-16
 * @param  {[type]} data [数据]
 * @param  {[type]} $ele [插入元素]
 * @param  {[type]} $id  [模板id]
 * @param  {[type]} clear  [清除之前的]
 */

module.exports = function(data, $ele, $id, clear) {
    // 模板
    var that = this,
        source = $id.html(),
        template = Handlebars.compile(source),
        html = template(data);
    if (clear) {
        $ele.html(html);
    } else {
        $ele.append(html);

    }
}