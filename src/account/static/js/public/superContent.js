/**
* 自选公募-超宝详情--内容
* @author wangjiajia 2019-11-27
*/
require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');


$(function(){
	let templatePage = {
		//获取页面元素
		$e:{
			contentWrap:$('#contentWrap'),
			HeadBarpathName:$("#HeadBarpathName"),
            noData: $('.noData') //没有数据的结构
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
                url: site_url.findProtocolContent_api,
                data:{
                	id:splitUrl['id'],
                },
                contentTypeSearch: true,
                needDataEmpty: true,
                callbackDone: function(json) {
                	var resData = json.data;
                    that.$e.HeadBarpathName.text(resData.protocolName);
					that.$e.contentWrap.html(resData.content);       
                },
                callbackNoData: function() {
                    $("#richTemplateWrap").css("display", "none");
                    $(".zhanweifu").css("display", "none")
                    that.$e.noData.show();
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