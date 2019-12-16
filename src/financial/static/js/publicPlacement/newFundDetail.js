/**  
 * @Page:  新发基金
 * @Author: zhangyanping
 * @Date:   2019-12-16
 * 
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();

$(function () {
    var newFundDetail = {
        getElements: {
            
        },
        init: function () {
            var that = this;
            // that.getData();
        },
        getData: function () {
            var that = this;
            // 请求页面数据
            var obj = [{
                // url: site_url.newfundDetails_api,
                data: {
                    fundCode: splitUrl['fundCode'],
                },
                callbackDone: function (json) {
                    
                },
                callbackFail: function (json) {
                    tipAction(json.message);
                },
                callbackNoData:function(json){
					tipAction(json.message);
				},
            }]
            $.ajaxLoading(obj);
        },
        events: function () {
         
        },

    }
    /*调用*/
    newFundDetail.init()
})