


/**
* 模板页面
* @author 田俊国 2019-11-19
*/
require('../vendor/config.js');

//zepto模块
require('../vendor/zepto/callback.js');
require('../vendor/zepto/deferred.js');
//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');
//require('../../../common/js/components/utils.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

//var tipAction = require('@pathCommonJs/components/tipAction.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();


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
                	id:splitUrl['id']
                },
                needDataEmpty: true,
                callbackDone: function(json) {
                	var resData = json.data.data;
//                  console.log(json.data)
					if(!resData.h5Title){//标题
						that.$e.contentWrap.text(resData.h5Title);
					}
					that.$e.contentWrap.html(resData.content);
					if(resData.h5Type == "2") { //标题 h5模板类型 1图片 2其他
						that.$e.contentWrap.css({
							"margin":"1rem 0 0",
							"padding":".5rem"
						})
					}
					
            
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