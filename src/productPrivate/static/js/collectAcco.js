/**
 * 募集账户js
 * @author  shiyunrui 2019-7-8
 */

require('../../../include/js/vendor/config.js');

//zepto模块
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');

require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');

require('../../../common/js/components/tabScroll.js');
//黑色提示条的显示和隐藏
var tipAction = require('../../../common/js/components/tipAction.js');

require('../../../common/js/components/goTopMui.js');
var splitUrl = require('../../../common/js/components/splitUrl.js');
require('../../../common/js/components/goTopMui.js');
var arg = require('@pathCommonJsCom/splitUrl.js')();

$(function () {

	var collectAcco = {

		getElements: {
			//募集账户相关
			collect_userName: $('.collect_userName'), //募集户名
			collect_accont: $('.collect_accont'), 	  //募集账户
			collect_prodName: $('.collect_prodName'), //开户银行
			collect_branch: $('.collect_branch'),  //开户支行
		},

		//募集账户信息查询
		getAccountInfo: function () {
			var that = this;
			var obj = [{
				url: site_url.collect_info_api,
				contentTypeSearch: true,
				data: {
					projectId: arg["fundCode"] // 产品代码
				},
				needLogin: true,//需要判断是否登陆
				callbackDone: function (json) {  //成功后执行的函数
					var data = json.data;
					that.getElements.collect_userName.html(data.accountName);
					that.getElements.collect_accont.html(data.account);
					that.getElements.collect_prodName.html(data.bankName);
					that.getElements.collect_branch.html(data.branchBankName);

					//复制相关逻辑
					$(".copy_btn").click(function () {
						//实例化clipboard
						var clipboard = new Clipboard('.copy_btn', {
							text: function () {
								return data.account;
							}
						});
						clipboard.on("success", function (e) {
							tipAction("复制成功");
						});
						clipboard.on("error", function (e) {
							tipAction("请选择“拷贝”进行复制!");
						});

					});
				},
			}];
			$.ajaxLoading(obj);
		},

	}

	collectAcco.getAccountInfo();

})