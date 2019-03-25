
/**
*银行卡详情
* @author zhangyanping 2017-03-14
*/

require('../../../include/js/vendor/config.js');

//zepto模块
require('../../../include/js/vendor/zepto/callback.js'); 
require('../../../include/js/vendor/zepto/deferred.js'); 

//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
require('../../../common/js/components/elasticLayer.js');

var splitUrl = require('../../../common/js/components/splitUrl.js');

require('../../../common/js/components/elasticLayerTypeTwo.js');


$(function(){

	var bankCard = {

		getElements : {
			bankName : $('#bankName'),  //银行名
			bankcaclientIdrdNumber : $('#bankcardNumber'),  //银行卡号
			clientId       : splitUrl()['clientId'],//clientId  
		},

		webinit:function(){
			var that = this;

			that.events();

			//that.getData();
			//
			$('.bankName').html( sessionStorage.bankName + '储蓄卡');
			$("#bankcardNumber").html(sessionStorage.bankAccountMask);
			$("#payNumber p span").html(sessionStorage.singleNum);
			$("#dailyLimit p span").html(sessionStorage.oneDayNum);

			//判断银行卡时候开通公募交易
			if (!!that.getElements.clientId) {
				//已开户，显示一键绑定
				$('.haveOPen').show();
				$('.haveOPen').attr("disabled", true).addClass('disable');
			} else {
				//未开户，显示立即开户
				$('.goOpen').show();
			}

		},

		events: function(){
			var that = this;

			//点击?
			mui("body").on('tap', '.help' , function(){
				var obj = {
					p:'<p class="elastic_p">银行卡可用于私募业务(签署合同、转账汇款，不支持在线支付），' + 
						'如已开通公募交易账户，则可用于公募在线交易；' + 
						'否则需开通公募交易账户后才可进行公募交易。</p>'
				}
				$.elasticLayerTypeTwo(obj);
			})
			
		},

	};
	//调用函数
	bankCard.webinit();

})
