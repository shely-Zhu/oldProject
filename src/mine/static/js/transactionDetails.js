/**
 * 交易明细页面 js
 * @author 蔡文琦  2019-11-20
 */

require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function() {
	let somePage = {
		//获取页面元素
		$e: {
            lis: $(".wrap li"),
		},
		//全局变量
		gV: {
		},
		//页面初始化函数
		init: function() {
			var that = this;  
			that.events()
			that.getUserInfo()
		},
		        // 获取认证信息
		getUserInfo: function() {
			var that = this;
			// 请求页面数据
			var obj = [{
				url: site_url.queryUserBaseInfo_api,
				data: {},
				callbackDone: function(json) {
					var data = json.data
					if(data.accountType==0||2){
						$(".type").hide()
					}else{
						$(".type").show()
					}
				},
				callbackFail: function(json) {
					tipAction(json.msg);
				}
			}]
			$.ajaxLoading(obj);
		},
		//注册事件
		events: function() {
            let that = this;
            mui("body").on('mdClick','.wrap li',function(e){
				var numAtr = $(this).attr('num');
				if(numAtr == 1){
					window.location.href=site_url.privateDetailList_url
				}          
			},{
                'htmdEvt': 'transactionDetails_01'
            })
			mui("body").on('mdClick','.wrap li',function(e){
				var numAtr = $(this).attr('num');
				 if(numAtr == 2){
					window.location.href=site_url.transactionRecords_url
				}        
			},{
                'htmdEvt': 'transactionDetails_02'
            })
			mui("body").on('mdClick','.wrap li',function(e){
				var numAtr = $(this).attr('num');
				if(numAtr == 3){
					window.location.href=site_url.publicTransactionDetails_url
				}         
			},{
                'htmdEvt': 'transactionDetails_03'
            })
			mui("body").on('mdClick','.wrap li',function(e){
				var numAtr = $(this).attr('num');
				if(numAtr == 4){
					window.location.href=site_url.transactionList_url
				}           
            },{
                'htmdEvt': 'transactionDetails_04'
            })
		}
	};
	somePage.init();
});