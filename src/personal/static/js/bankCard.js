
/**
*银行卡列表
* @author zhangyanping 2017-03-13
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
			bankcardDetail : $('#bankcardDetail span'),  //银行名
			bankcardNumber : $('#bankcardNumber'),  //银行卡账号
			bankCardList   : $(".bankCardList"),//银行列表
			haveOpened     : $(".haveOpened"),
			publicTrade    : $(".publicTrade"),
		},

		webinit:function(){
			var that = this;

			that.getData();

			that.click();

			that.events();

		},

			//数据初始化
		getData:function(){
			var that = this;

			var param = {    

					hmac:"", //预留的加密信息 非必填项   

					params:{
						fundType : "00000", // 基金类型
						type : "0",// 0:全部 1:私募 2:公募
						bankAccountSecret : "",
						pageNum :　1,
						pageSize : "" ,
					}//请求的参数信息

				};

			//发送ajax请求
			var obj = [{
				url: site_url.changeDealBankList_api,
				data: param,
				needLogin:true,//需要判断是否登陆
				//async:false,
				//needDataEmpty: false,//不需要判断data是否为空
				callbackDone: function(json){  //成功后执行的函数

					var path = window.location.href;

					//console.log(JSON.stringify(json.data.bankList));
					//动态获取数据，然后写入页面
					if( !$.util.objIsEmpty(json.data.bankList) ){
						
						$.each(json.data.bankList,function(i,el){
							// 银行卡字段更改，isPub 1 : 未公募开卡 2: 已公募开卡
							if(el.isPub == "2"){
								el.isPub = true;
							}else{
								el.isPub = false;
							}
							
						})
						var tplm = $("#bankCards").html(); 
						var template = Handlebars.compile(tplm);
						var html = template(json.data.bankList); 
						$(".bankCard").html(html);

						var bankList = json.data.bankList;
					}
					else{
						// that.getElements.pullUp.hide();//上拉加载区域隐藏
						// that.getElements.bankLists.hide();//展示数据区域隐藏
						that.getElements.emptyBox.show();//没有数据显示状态
					}

					// //判断银行卡是否开通公募交易
					// if (path.indexOf(that.getElements.clientId)== -1) {
					// 	//未开户，显示立即开户
					// 	$('.publicTrade').show();
					// } else {
					// 	//已开户，显示一键绑定
					// 	$('.haveOpened').show();
					// }
				},
				callbackNoData:function(){

					tipAction(json.message);
				}
			}];
			$.ajaxLoading(obj);


		},

		//事件
		click:function(){

			var that = this;
			
					   
			$(".bankCard").on("click" , ".bankCardList" , function(e){

				sessionStorage.bankName = $(this).find("#bankcardTitle").find("span").html();
				sessionStorage.bankAccountMask = $(this).find("#bankcardNumber").find("span").html();
				sessionStorage.singleNum = $(this).attr("singleNum");
				sessionStorage.oneDayNum = $(this).attr("oneDayNum");
				
				window.location.href = site_url.cardsDetail_url;
			}); 
		},
		events: function(){
			var that = this;

			//点击?
			mui("body").on('tap', '.help' , function(){
				var obj = {
					title: '开通公募交易说明', //如果不传默认为'尊敬的用户',
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
