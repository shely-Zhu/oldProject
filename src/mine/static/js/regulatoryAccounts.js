 /**  
 * @Page:  公募监管账户
 * @Author: caoqihai  
 * @Date:   2019-11-14
 * 
 */ 

require('@pathCommonBase/base.js');

require('@pathIncludJs/vendor/mui/mui.picker.min.js');

//黑色提示条
var tipAction = require('@pathCommonJs/components/tipAction.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/elasticLayer.js');

var splitUrl = require('@pathCommonJs/components/splitUrl.js');
//引入复制功能
// var Clipboard = require('clipboard');


$(function(){

	var regulatory = {

		getElements : {
			accountName : $('#accountName'),  //公共账户名称
			name        : $('#name'),  //公募账户名
			number      : $('#number'),  //账号
			linenum     : $('#linenum'), //行号
			openingBank : $("#openingBank"),  //开户行
			topc      : $('#topc'),       //提示信息
		},

		webinit:function(){
			var that = this;

			that.getData();
			//
			that.events();

		},

	        //数据初始化
		getData:function(){
			var that = this;
			var param = {

					// hmac:"", //预留的加密信息

					// params:{//请求的参数信息

					// }

				};

			//发送ajax请求
	        var obj = [{
	            url: site_url.findSuperviseBank_api,
	            data: param,
	            needLogin:true,//需要判断是否登陆
	            //needDataEmpty: false,//不需要判断data是否为空
	            callbackDone: function(json){  //成功后执行的函数
					
	                $('#accountName').html(json.data.title);
	                $('#name').html(json.data.accountName);
	                $('#number').html(json.data.bankAccount);
	                $('#linenum').html(json.data.bankNo);
	                $('#openingBank').html(json.data.bankAccountName);

					$('#topc').html(json.data.remarks);


	            },
	            callbackFail: function(json){  //失败后执行的函数

						tipAction(json.msg);

	            }
	        }];
	        $.ajaxLoading(obj);


		},

        /*
            绑定事件
         */
        events: function() {
            var that = this;


            //点击复制按钮
            // $('.copy_btn').on('tap', function(el) {
            // 	var $this = $(this);
			// 	var copyText = $this.siblings('div').text()
			//     //实例化clipboard
			// 	var clipboard = new Clipboard('.copy_btn', {
			// 		text: function () {

			// 			return copyText;
			// 		}
			// 	});
			// 	clipboard.on("success", function (e) {
			// 		//text = '';
			// 		tipAction("复制成功");
			// 	});
			// 	clipboard.on("error", function (e) {
			// 		tipAction("请选择“拷贝”进行复制!");
			// 	});
			// })

			$(".copy_btn").click(function () {
				var $this = $(this);
				var copyText = $this.siblings('div').text()
			    //实例化clipboard
				var clipboard = new Clipboard('.copy_btn', {
					text: function () {

						return copyText;
					}
				});
				clipboard.on("success", function (e) {
					//text = '';
					tipAction("复制成功");
				});
				clipboard.on("error", function (e) {
					tipAction("请选择“拷贝”进行复制!");
				});

			});
			
			$('.toptitle span,.toptitle img').on('tap',function(){
				$('.topcontent').addClass('mui-active').removeClass('mui-hidden');
			})
			
			$('.topimg').on('tap',function(){
				$('.topcontent').addClass('mui-hidden').removeClass('mui-active');
			})

        },

	};
	//调用函数
	regulatory.webinit();

})
