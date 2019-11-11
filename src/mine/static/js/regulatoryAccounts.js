/**
*公募监管账户
* @author zhangyanping 2017-03-13
*/

require('../../../include/js/vendor/config.js');

require('../../../include/js/vendor/mui/mui.picker.min.js');

//zepto模块
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');

//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
require('../../../common/js/components/elasticLayer.js');

var splitUrl = require('../../../common/js/components/splitUrl.js');
//引入复制功能
var Clipboard = require('clipboard');


$(function(){

	var regulatory = {

		getElements : {
			accountName : $('#accountName'),  //公共账户名称
			name        : $('#number span'),  //公募账户名
			number      : $('#number span'),  //账号
			linenum     : $('#linenum span'), //行号
			openingBank : $("#openingBank"),  //开户行
			prompt      : $('#prompt'),       //提示信息
		},

		webinit:function(){
			var that = this;

			//that.getData();
			//
			that.events();

		},

	        //数据初始化
		getData:function(){
			var that = this;

			var param = {

					hmac:"", //预留的加密信息

					params:{//请求的参数信息

					}

				};

			//发送ajax请求
	        var obj = [{
	            url: site_url.pubregulatory_api,
	            data: param,
	            needLogin:true,//需要判断是否登陆
	            //needDataEmpty: false,//不需要判断data是否为空
	            callbackDone: function(json){  //成功后执行的函数

	                console.log(JSON.stringify(json));

	                $('#accountName').html(json.data.title);
	                $('#name span').html(json.data.accountName);
	                $('#number span').html(json.data.bankAccount);
	                $('#linenum span').html(json.data.bankNo);
	                $('#openingBank span').html(json.data.bankAccountName);

	                $('#content').html(json.data.remarks);


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
            $('.copy_btn').on('tap', function(el) {
            	var $this = $(this);

            	//console.log($(this).parent('p').find("span").eq(1).text());

            	var copyText = $this.siblings('span').text()

			    //实例化clipboard
				var clipboard = new Clipboard('.copy_btn', {
					text: function () {

						console.log(copyText);
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



            })

        },

	};
	//调用函数
	regulatory.webinit();

})
