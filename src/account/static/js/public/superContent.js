/**
* 自选公募-超宝详情--内容
* @author wangjiajia 2019-11-27
*/
require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


$(function(){
	let templatePage = {
		//获取页面元素
		$e:{
			contentWrap:$('#contentWrap'),
			HeadBarpathName:$("#HeadBarpathName")
		},
		//页面初始化函数
		init:function(){         
            this.getTemplateData();
            this.events()
        },
        // 获取消息getnoticeItemData中心列表
        getTemplateData() {
        	var that=this;
            var obj=[{
                url: site_url.getArticle_api,
                data:{
                	articleBelong:splitUrl['articleBelong'],
                	applyType:splitUrl['applyType']*1,
                },
                needDataEmpty: true,
                callbackDone: function(json) {
                	var resData = json.data;
					if(!!resData.h5Title){//标题
						that.$e.HeadBarpathName.text(resData.h5Title);
					}
					that.$e.contentWrap.html(resData.content);       
                },
                callbackFail: function(json) {
                    tipAction(json.message);
                }
            }];                        
            $.ajaxLoading(obj); 
        },
        events() {
            var that = this;
        },
	};
	templatePage.init();
});