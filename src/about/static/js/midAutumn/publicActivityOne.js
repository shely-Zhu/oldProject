/**
 * 中秋活动专题 -- 公募会场 js文件
 * @author  zhangyanping
 * @time 2018-09-04
 */

require('@pathIncludJs/vendor/config.js');
require('@pathIncludJs/vendor/mui/mui.picker.min.js');
//zepto模块--callback
require('@pathIncludJs/vendor/zepto/callback.js');
//zepto模块--deferred
require('@pathIncludJs/vendor/zepto/deferred.js');
//校验
require('@pathCommonJs/components/utils.js');
require('@pathCommonJs/ajaxLoading.js');
var playVideo = require('@pathCommonJs/components/playVideo/playVideo.js');
var tipAction = require('@pathCommonJs/components/tipAction.js');


$(function() {
	var publicActivityOne = {
		clickBtn:null,

		init: function() {
			var that = this;

			that.getData();
			that.event();
		},

		// 页面初始化请求banner接口，渲染页面
		getData : function(){

			var that=this;
			var obj=[{
				url: site_url.findBannerByPosition_api,
				data: {
					hmac:"", //预留的加密信息   非必填项
					//请求的参数信息  非必填项
					adPosition :"publicActivityAPP",//类型（标志位）【请参照备注】
					groupType:"bannerCategoryGF",
					limitCount:"4" //展示条数
				},
				// needCrossDomain: true,
				needLoading: true,
				callbackDone: function(json){  //成功后执行的函数
					var jsonData = json.data;

					that.clickBtn = jsonData[2].linkUrl

					$('.public_01 img').attr('src',jsonData[0].imgUrl);
					$('.public_02 img').attr('src',jsonData[1].imgUrl);
					$('.public_03 img').attr('src',jsonData[2].imgUrl);
					$('.public_04 img').attr('src',jsonData[3].imgUrl);

				}
				    
			}];
			$.ajaxLoading(obj);
		},
		event: function(targetUrl) {
			var that = this;

			mui("body").on('tap','.public_03 img', function(){
                that.checkLogin(false, function() {
                    that.judge();
                });
            });
		},
		// 判断是否登录
		checkLogin:function(params,callback){
			var that = this;
            var obj = [{
                url: site_url.checkLogin_api,
					data:null,
					// async: false,
					// dataType: 'jsonp',
            		// needCrossDomain: true,
					needDataEmpty:false,
					loginNotJump:params, //true不跳，false--跳
					needLogin:true,//需要判断是否登录
					callbackDone: function(json){
                    that.eBusinessRecord();
                    // (typeof(callback) == 'function') && callback();
					},
					   
					callbackNoData:function(){
						console.log('我在nodata里面')
					},
					callbackLoginFunc:function(){
						//未登录
						if(that.isLogin != 1){
							that.judge();
						}

					},
            }];
			$.ajaxLoading(obj);
		},
		judge:function(){
			var that = this;
			if(that.jumpParam == "true"){ //已登录
				if( $("#script_login").length !=0 && $("#script_login").attr("src").indexOf("appLogOut") !=-1 ){//此时表示APP也是未登录
					return false;
				}
			}else{
				if(window.currentIsApp){
					return false;
				}else{
					window.location.href=site_url.login_html_url+'?originUrl=' + new Base64().encode(window.location.href);
				}
			}
		},
        // 在点击‘我已完成学习按钮’增加记录
        eBusinessRecord: function() {
            var that = this;
            var obj = [{
                url: site_url.eBusinessRecord_api,
                data: {
                    hmac: "", //预留的加密信息   非必填项
                    //请求的参数信息  非必填项
                    communityActId: "1002", //活动id，communityActId参数说明 1001 基民教育 1002 中秋电商活动
				},
				contentTypeSearch:true,
                async: false,
                needDataEmpty: false,
                needLogin: true, //需要判断是否登录
                callbackDone: function(json) {
                    window.location.href = that.clickBtn;
                }

            }];
            $.ajaxLoading(obj);

        }
    }
	publicActivityOne.init();

})