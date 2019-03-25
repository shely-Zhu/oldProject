/**
 * 我的  设置js文件
 * @author  yangjinlai 2017-03-07
 */

require('../../../../include/js/vendor/config.js');

//zepto模块
require('../../../../include/js/vendor/zepto/callback.js'); 
require('../../../../include/js/vendor/zepto/deferred.js');

require('../../../../common/js/components/utils.js');
require('../../../../common/js/ajaxLoading.js');
//黑色提示条
var tipAction = require('../../../../common/js/components/tipAction.js');

require('../../../../common/js/components/elasticLayer.js');
require('../../../../common/js/components/quiteBtn.js');

require('../../../../common/js/components/bottomNav.js');
$(function(){

	var setUp = {
		getElements: {

		},

		init: function(){
			var that = this;

			that.getData();

			that.events();
		},

		getData: function(){
			var that = this;
			
			if( envOrigin == 1 ){
				$(".goRemember").html("关于恒天财富");
			}
			var obj = [{
				url: site_url.user_api,
				data: {
					hmac:"", //预留的加密信息     
					params:{//请求的参数信息 
    				}
				},
				needLogin: true,
				needDataEmpty: false,
				callbackDone: function(json){
					//判断公募账号是否开户clientId
					if( !!json.data.clientId ){
						//已开户
						if( envOrigin != 1 && json.data.custType == "1"){
							$('.mergeYes').show();
							$('.mui-table-view-cell').removeClass('noBor');
						}
					}
					if(json.data.isCertification == "2"){
						if(json.data.custType=="0"){
							$(".bassInfo a").attr("href",site_url.orgBass_url);
						}else if(json.data.custType=="1"){
							$(".bassInfo a").attr("href",site_url.perBass_url);
						}else if(json.data.custType=="2"){
							$(".bassInfo a").attr("href",site_url.pdBass_url);
						}
					}else{
						$(".bassInfo").hide();
					}
					//显示登录账号
					if( json.data.loginPhone ){
						$('.accountPhone .word').html(json.data.loginPhone);
					}
					//显示手机号
					if( json.data.linkPhone ){
						$('.changePhone .word').html(json.data.linkPhone);
					}
				},
				callbackFail: function(json){

				}
			}]
			$.ajaxLoading(obj);
		},

		events: function(){
			var that=this;
			
			mui("body").on("tap",'.bassInfo a',function(){
				window.location.href=$(this).attr("href");
			})
		}
	}

	setUp.init();

})