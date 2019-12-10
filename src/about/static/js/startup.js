/* 
	*创业十年视频
	*zhangyanping 2018/05/07
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


$(function(){

	var startup = {
 
		init : function(){            
			var that = this;

			that.getData();

		},

		getData:function(){
			var that = this;
				// url = 'http://htjj-vod.homecdn.com/fc5d5c28-2fee-4d0f-a76d-661d9d494859.m3u8';

			mui("body").on('tap', '.clubVideo1', function() {
	            playVideo('http://htjj-vod.homecdn.com/fc5d5c28-2fee-4d0f-a76d-661d9d494859.m3u8',"video_wrapper1");
	        })


	        mui("body").on('tap', '.clubVideo2', function() {
	            playVideo('http://htjj-vod.homecdn.com/50216f89-68b6-4d0a-adb0-03af0df3efe4.m3u8',"video_wrapper2");
	        })


	        mui("body").on('tap', '.clubVideo3', function() {
	            playVideo('http://htjj-vod.homecdn.com/7ac9e0cb-8fa4-40be-b359-7c261bac7669.m3u8',"video_wrapper3");
	        })


	        mui("body").on('tap', '.clubVideo4', function() {
	            playVideo('http://htjj-vod.homecdn.com/cb5f9538-5bd5-431d-9b72-ba89fedc6e12.m3u8',"video_wrapper4");
	        })


	        mui("body").on('tap', '.clubVideo5', function() {
	            playVideo('http://htjj-vod.homecdn.com/ac48aa72-321c-4853-81f9-e3968a9ad42a.m3u8',"video_wrapper5");
	        })


	        mui("body").on('tap', '.clubVideo6', function() {
	            playVideo('http://htjj-vod.homecdn.com/630b0907-cf06-4c05-91ed-017aa04805e8.m3u8',"video_wrapper6");
	        })

		}

	}

	/*调用*/
	startup.init();

})



