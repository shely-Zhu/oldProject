/**
* 联系我们，意见反馈
* @author chentiancheng 2019-11-14
*/
require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');

require('@pathCommonJs/ajaxLoading.js');
// var uploadFile = require('@pathCommonJs/components/uploadFile/uploaderFile.js');
// var uploadFile = require('@pathCommonJs/components/uploadFile/uploaderFile.js');
var uploadFile = require('./uploaderFile.js')

var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
$(function() {
    var that = this;
    uploadFile(that.asyncAll, that, 1); //插件初始化
    
})