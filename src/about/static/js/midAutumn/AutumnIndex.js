/**
 * 中秋活动专题  js文件
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
$(function() {
	var AutumnIndex = {

		init: function() {
			var that = this;

			that.getData();
			that.event();
		},
		getData : function(){

			var that=this;
			var obj=[{
				url: site_url.findBannerByPosition_api,
				data: {
					hmac:"", //预留的加密信息   非必填项
					//请求的参数信息  非必填项
					adPosition :"AutumnIndexAPP",//类型（标志位）【请参照备注】
					limitCount:"8", //展示条数
					groupType:"bannerCategoryGF",
				},
				// needCrossDomain: true,
				needLoading: true,
				callbackDone: function(json){  //成功后执行的函数
					var jsonData = json.data;

					if( !$.util.objIsEmpty(jsonData) ){
						$.each(jsonData,function(i,el){
							if (!!el.linkUrl) {

								var targetUrl = el.linkUrl;

								// $('#video_wrapper1 img').attr('src',jsonData[5].imgUrl);


								that.event(targetUrl);

							};

						})
					}
					$('#video_wrapper1 img').attr('src',jsonData[7].imgUrl);

					$('.index_1 img').attr('src',jsonData[0].imgUrl);
					$('.index_3 img').attr('src',jsonData[2].imgUrl);
					$('.index_4 img').attr('src',jsonData[3].imgUrl);
					$('.index_5 img').attr('src',jsonData[4].imgUrl);
					$('.index_6 img').attr('src',jsonData[5].imgUrl);
					$('.index_7 img').attr('src',jsonData[6].imgUrl);

					$('.index_2').css({
						'background-image': 'url("'+jsonData[1].imgUrl+'")',
					});

				},
				callbackFail: function() {
					console.log("失败");
				}
			}];
			$.ajaxLoading(obj);
		},
		event: function(targetUrl) {
			var that = this;

			mui("body").on('tap', '.videoWrap', function() {
				playVideo(targetUrl,"video_wrapper1");
			})


			mui("body").on('tap','.index_4 img', function(){
				window.location.href = site_url.privateActivity_url;
				// window.open(site_url.privateActivity_url);
			});

			mui("body").on('tap','.index_6 img', function(){
				window.location.href = site_url.publicActivityOne_url;
				// window.open(site_url.publicActivityOne_url);
			})
		},
	}
	AutumnIndex.init();

})

