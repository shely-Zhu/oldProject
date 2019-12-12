/**
 * [setCombinationName 恒小智标题设置]
 * @author songxiaoyu 2018-10-19
 */

var splitUrl = require('../splitUrl.js')();
module.exports = function() {
    $('.combiT').html(decodeURI(decodeURI(splitUrl['combinationName'])));
};