/**
* 私募交易规则
* @author yanruiting 2019-11-29
*/
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function(){
    var templatePage = {
        //获取页面元素
        $e:{
            contentWrap:$('#contentWrap'),
            HeadBarpathName:$("#HeadBarpathName"),
            noDataCon: $(".noData")
        },
        gV: {
            projectType: splitUrl['projectType']
        },
        //页面初始化函数
        init:function(){         
            this.getTemplateData();
        },
        // 获取
        getTemplateData:function() {
            var that=this;
            switch(that.gV.projectType) {
                case '0': var params = {category: 'rule_wenjin'};break;
                case '1': var params = {category: 'rule_wenyu'};break;
                case '4': var params = {category: 'rule_zhengquan'};break;
            }
            //产品详情接口
            var obj = [{
                url: site_url.findLatestContentByCategory_api, 
                data: params,
                needLogin: true,
                contentTypeSearch: true,
                callbackDone: function(json) {
                    if(json.data.content && json.data.content!= '') {
                        that.$e.contentWrap.html(json.data.content); 
                    } else {
                        that.$e.noDataCon.show();
                        that.$e.contentWrap.hide();
                    }
                },
                callbackNoData: function(json) {
                    that.$e.noDataCon.show();
                    that.$e.contentWrap.hide();
                },
                callbackFail: function(json) {
                    tipAction(json.message);
                }
            }];
            $.ajaxLoading(obj);
        }
    };
    templatePage.init();
});