/**
* 私募交易规则
* @author yanruiting 2020-1-2
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
            id: splitUrl['id']
        },
        //页面初始化函数
        init:function(){         
            this.getTemplateData();
        },
        // 获取
        getTemplateData:function() {
            var that=this;
            //赎回说明接口
            var obj = [{
                url: site_url.findMessageCenterById_api, 
                contentTypeSearch: true,
                data: {
                    "id": that.gV.id,  
                },
                needDataEmpty: true,
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
                }
            }];
            $.ajaxLoading(obj);
        }
    };
    templatePage.init();
});