/* 
	*二维码计数
	*zsunfuping 2018/11/13
*/
require('../../../include/js/vendor/config.js');
require('../../../include/js/vendor/mui/mui.picker.min.js');   
//zepto模块--callback
require('../../../include/js/vendor/zepto/callback.js'); 
//zepto模块--deferred
require('../../../include/js/vendor/zepto/deferred.js'); 
//校验
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
var splitUrl = require('../../../common/js/components/splitUrl.js');


$(function(){

	var qrCode = {
 
		init : function(){            
			var that = this;

			that.getData();

		},

		getData:function(){
			var that = this,
				os = "",
				url = "";
			if(mui.os.android) {
				os = 'android';
				url = "http://a.app.qq.com/o/simple.jsp?pkgname=com.chtwm.mall" 
			} else{
				os = 'ios';
				url = "https://itunes.apple.com/cn/app/heng-tian-jin-fu/id1126073262?mt=8"
			};
			var obj = [{
                url: site_url.qrCodeDetails_api, // 组合资产交易详情(买入/赎回)
                data: {
                    hmac: "", //预留的加密信息
                    params: {
                    	code: splitUrl()['code'],// 识别码
						clientType: os,// 客户端类型  (android 或 ios)
                    }
                },
                callbackDone: function(json) { 
                	
                }
            }];	
            $.ajaxLoading(obj);
            window.location.href = url; 
		},

	}

	/*调用*/
	qrCode.init();

})



