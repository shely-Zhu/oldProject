


/**
* 模板页面
* @author 田俊国 2019-11-19
*/
require('../vendor/config.js');

//zepto模块
require('../vendor/zepto/callback.js');
require('../vendor/zepto/deferred.js');
//黑色提示条
var tipAction = require('@pathCommonJs/components/tipAction.js');
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/components/headBarConfig.js');
require('@pathCommonJs/ajaxLoading.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js')();


$(function(){
	let templatePage = {
		//获取页面元素
		$e:{
			contentWrap:$('#contentWrap'),
			HeadBarpathName:$("#HeadBarpathName"),
            btnButton:$(".btnButton"),
            btnHref:$(".btnHref"),

		},
        gV: { // 全局变量

            recomTypes: "", //按钮跳转链接

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
					if(resData.h5Type == "2") { //标题 h5模板类型 1图片 2其他
						that.$e.contentWrap.css({
//							"margin":"1rem 0 0",
							"padding":".5rem .5rem 0"
						})
					}else if(resData.h5Type == "3"){

                        //给底部按钮加文字和跳转链接
                        that.$e.btnButton.html(resData.buttonLabel).show();

                        that.recomTypes = resData.recomTypes;
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

            that.$e.btnHref.on('tap', function() {

                //1-超级现金宝;2-普通基金;3-私募基金;4-超宝产品列表;5-私募产品列表
                //后续找小宇确认跳转逻辑和连接
                if(that.recomTypes == "")
                window.location.href = "";
            })
        },
	};
	templatePage.init();
});