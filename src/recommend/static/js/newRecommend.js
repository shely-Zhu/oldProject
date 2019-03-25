
/*
 * @page: 老带新----引导页
 * 
 * @Author: yangjinlai
 * @Date:   2017-10-27 10:48:29
 *  @description: js可以更换版本，但是html是分享出去的链接，不能变;
 *                 关闭弹层按钮，fixed定位在ios，app中会随着屏幕滚动，所以提出来
 * 
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-07-19 19:55:11
 * @description: 引导页，注册成功页面
 */


require('../../../include/js/vendor/config.js');  

//zepto模块 
require('../../../include/js/vendor/zepto/callback.js');   
require('../../../include/js/vendor/zepto/deferred.js'); 
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
var tipAction = require('../../../common/js/components/tipAction.js');   
var splitUrl = require('../../../common/js/components/splitUrl.js');

$(function(){
	var newRecom = { 

		init: function(){
			var that = this;

			// 获取页面初始数据
			that.getData();

			// 设置去注册的链接
			that.events();
		},
		getData: function(){
			var that = this;

			var obj = [{ //获取背景图片
				url: site_url.findBannerByPosition_api,
				data: {   
				 	hmac:"", //预留的加密信息    
				  	params:{//请求的参数信息 
						adPosition : 'oldNewLetter' ,//类型（标志位）【请参照备注】 
					  	limitCount: 3,//展示幅数    
				}},
				needLogin: true,
				needDataEmpty: true,
				callbackDone: function( json ){
					$('.body').css({
						'background-image':'url("'+json.data[0].imgUrl+'")',
						// 'background': 'url("'+json.data[0].imgUrl+'") top center no-repeat',
						// 'background-size': 'cover'
					})

					$('.content img').attr('src',json.data[1].imgUrl);
					$('.btn_wrap img').attr('src',json.data[2].imgUrl);
				},
				callbackFail: function( json ){
					tipAction( json.msg );
				}
			},
			{  //获取微信sdk所需数据
				url: site_url.share_api,
				data: {   
				 	hmac:"", //预留的加密信息    
				  	params:{//请求的参数信息 
						url: window.location.href                                  
				}},    
				needLogin: true,
				needDataEmpty: false,
				callbackDone: function(jsonData){

					//做微信授权
					var data = jsonData.data;

					wx.config({
		                //debug: true,
		                appId: data.appid,
		                timestamp:data.timestamp,
		                nonceStr:data.nonceStr,
		                signature:data.signature, 
		                jsApiList: [
		                    //'checkJsApi',
		                    'onMenuShareAppMessage',
		                    'hideMenuItems',
		                    'onMenuShareTimeline',
		                    // 'onMenuShareQQ',
		                    // 'onMenuShareWeibo',
		                    // 'onMenuShareQZone'
		                ]
		            });
		            //设置分享到微信
		            wx.ready(function(){

						//隐藏其他分享
						wx.hideMenuItems({
						    menuList: [
						    	//'menuItem:share:timeline',
						    	'menuItem:share:qq',
						    	'menuItem:share:weiboApp',
						    	'menuItem:share:facebook',
						    	'menuItem:share:QZone'
						    ],
						    success:function(res){
		                        //alert("隐藏");
		                    },
		                     // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
						});

		            	//分享给朋友
						wx.onMenuShareAppMessage({
				            title : '给你介绍一家靠谱的财富管理公司', // 分享标题
				            desc: '恒天财富\n一日托付，一心呵护', // 分享描述
				            link : window.location.href, // 分享链接
				            imgUrl : window.location.origin + '/recommend/static/img/logo.png', // 分享图标
				            success : function() {
				                // 用户确认分享后执行的回调函数
				            },
				            cancel : function() {
				                // 用户取消分享后执行的回调函数
				            }
				        });

						//分享到朋友圈
		            	wx.onMenuShareTimeline({
		            	    title : '给你介绍一家靠谱的财富管理公司', // 分享标题
		            	    link : window.location.href, // 分享链接
		            	    imgUrl : window.location.origin + '/recommend/static/img/logo.png', // 分享图标
		            	    success: function () { 
		            	        // 用户确认分享后执行的回调函数
		            	    },
		            	    cancel: function () { 
		            	        // 用户取消分享后执行的回调函数
		            	    }
		            	});
					})
		            
				},
				callbackFail: function( jsonData){
					$('.btnButton .mui-btn').removeClass('disable').removeAttr('disabled');
					tipAction( jsonData.msg );
				}
			}];
			$.ajaxLoading(obj);
		},
		events: function(){
			var that = this;

			//点击去注册
			mui("body").on('tap', '.btnButton', function(){
				window.location.href = site_url.recommendRegister_url + '?url=' + splitUrl()['url'];
			})
 		}
	}
	newRecom.init();
})
