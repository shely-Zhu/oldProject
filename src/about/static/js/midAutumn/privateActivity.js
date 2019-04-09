/**
 * 中秋活动专题 --私募会场  js文件
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
	var privateActivity = {

		clickBtn:null,

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
					adPosition :"privateActivityAPP",//类型（标志位）【请参照备注】
					groupType:"bannerCategoryGF",
					limitCount:"6" //展示条数
				},
				// needCrossDomain: true,
				needLoading: true,
				callbackDone: function(json){  //成功后执行的函数
					var jsonData = json.data;

					if( !$.util.objIsEmpty(jsonData) ){
						$.each(jsonData,function(i,el){
							if (!!el.linkUrl) {

								var targetUrl = el.linkUrl;

								that.event(targetUrl);

							};

						})
					}
					$('#video_wrapper1 img').attr('src',jsonData[5].imgUrl);

					$('.private_01 img').attr('src',jsonData[0].imgUrl);
					$('.private_02').css({
						'background-image': 'url("'+jsonData[1].imgUrl+'")',
					});
					$('.private_03 img').attr('src',jsonData[2].imgUrl);
					$('.private_04 img').attr('src',jsonData[3].imgUrl);
					$('.private_05 img').attr('src',jsonData[4].imgUrl);


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


			mui("body").on('tap','.private_04 img', function(){
				window.location.href = site_url.htcf_prvIndex_url;
			});
		},
	}
	privateActivity.init();

})
