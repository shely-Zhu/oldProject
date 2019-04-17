/**
 * 实名认证---成功页面（公募开户）
 * @author zhangweipeng 2017-06-05
 */

require('../../../../include/js/vendor/config.js');

//zepto模块
require('../../../../include/js/vendor/zepto/callback.js');
require('../../../../include/js/vendor/zepto/deferred.js');

require('../../../../common/js/components/utils.js');
require('../../../../common/js/ajaxLoading.js');

//黑色提示条
var tipAction = require('../../../../common/js/components/tipAction.js');
var Base64 = require('../../../../include/js/vendor/base64/base64.js');

$(function() {

	var realName = {

		getElements: {
			// submitBtn: '.riskBtn a', //提交按钮
			stepBtn: '.stepBtn', //返回按钮
			immediatelyGo: 'immediatelyGo',   //立即完善
		},

		//初始化函数
		init: function() {
			var that = this;

			//页面打开后最先执行
			that.beforeSetFunc();
			//页面初始化数据
			that.getData();
			//调用绑定事件函数
			that.eventsFunc();
		},

		//页面打开后最先执行的逻辑
		beforeSetFunc: function() {
			var that = this;

			//初始化mui
			mui.init();
			
		 	that.url = sessionStorage.getItem('originUrl');

		 	//清空localstorage里保存的实名认证相关数据
		 	sessionStorage.removeItem("name");
		 	sessionStorage.removeItem("idTypeNum");
		 	sessionStorage.removeItem("idTypeTxt");
		 	sessionStorage.removeItem("idNum");
		 	sessionStorage.removeItem("bankNum");
		 	sessionStorage.removeItem("bankInfoNum");
		 	sessionStorage.removeItem("bankInfoTxt");
		 	sessionStorage.removeItem("province");
		 	sessionStorage.removeItem("city");
		 	sessionStorage.removeItem("branchNo");
		 	sessionStorage.removeItem("branchTxt");
		 	sessionStorage.removeItem("birthDay");
		 	sessionStorage.removeItem("birthNo");
		 	sessionStorage.removeItem("vocationTxt");
		 	sessionStorage.removeItem("vocationNo");
		 	sessionStorage.removeItem("address");
		 	sessionStorage.removeItem("investNo");
		 	sessionStorage.removeItem("investTxt");
		 	sessionStorage.removeItem("investTxt");
		 	sessionStorage.removeItem("beneificiaryName");

			sessionStorage.hasData="";
		 	//清空sessionStorage里的originUrl
		 	sessionStorage.removeItem("originUrl");
		},

		getData: function() {
			var that = this;

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
					if(json.data.isCertification == "2"){
						if(json.data.custType=="0"){
							$(".complete a").attr("href",site_url.orgBass_url);
						}else if(json.data.custType=="1"){
							$(".complete a").attr("href",site_url.perBass_url);
						}else if(json.data.custType=="2"){
							$(".complete a").attr("href",site_url.pdBass_url);
						}
					}else{
						$(".complete a").attr("href");
					}
				},
				     
			}]
			$.ajaxLoading(obj);

		},
		//该函数里绑定事件
		eventsFunc: function() {
			var that = this;

			mui("body").on("tap",that.getElements.stepBtn,function(){
				if(that.url){
					window.location.href = new Base64().decode(that.url);
				}else{
					window.location.href = site_url.mine_url;
				}
			});
		}
	}
	realName.init();
})