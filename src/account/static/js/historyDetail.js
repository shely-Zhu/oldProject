
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');

var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var commonHistoryDetailList=require('@pathCommonJs/components/commonHistoryDetailList.js');
$(function() {
    commonHistoryDetailList(site_url.curveHistoryList_api)
});