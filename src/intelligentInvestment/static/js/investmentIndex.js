/**
 * 恒小智 首页
 * @author ping 2018-10-15
 */

require('../../../include/js/vendor/config.js');

//zepto模块
require('../../../include/js/vendor/zepto/callback.js'); 
require('../../../include/js/vendor/zepto/deferred.js');

require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');

//黑色提示条的显示和隐藏
var tipAction = require('../../../common/js/components/tipAction.js');
var Base64 = require('../../../include/js/vendor/base64/base64.js');  

var tradeList = {

	typeObj:{},
	riskLevel:'',

	init: function(){  //初始化函数
		var that = this;
		
		document.title = '恒小智'
		
		// 获取客户的风险等级
		that.getUserInfo();
		
		//事件监听
		that.events();
	},
	//获取客户风险等级
	getUserInfo: function(){
		var that = this;
		
		var obj = [{
			url: site_url.user_api_two,
			data: {
				hmac: "", //预留的加密信息     
				params: {
				}
			},
			needLogin: true,
			needDataEmpty: false, //需要判断data是否为空
			async: false, 
			callbackDone: function(json){
				var jsonData = json.data;

				riskLevel = Number(jsonData.investFavour);
				var src = '/intelligentInvestment/static/img/'+ riskLevel + '.png';
				// 风险等级对应的参数
				that.typeSelect(riskLevel);

				//风险等级对应的图片
				$('.images img').attr('src', src);

				// 风险承受能力
				$('.riskType').html(that.typeObj.typePd);

				// 不同风险等级的描述文案
				that.findContentByCategory();

			},
			callbackFail: function(json){
				tipAction(json.msg);

				window.location.href = site_url.programFail_url;
			},
			callbackNoData: function(json){
			}

		}];
		$.ajaxLoading(obj);
	},
	events: function(){  //绑定事件
		var that = this;

		//点击制定投资方案
		mui("body").on('tap', '.developPlans', function() {
			var $this = $(this);

				$this.attr("disabled", true).addClass('disable');
           		that.combinFundList($this);
            
        });

	},

	typeSelect:function(num){
		var that=this;
		// var gradeArr = ['保守型','稳健型','平衡型','成长型','进取型'];
		switch (num){
			case 1:
				that.typeObj.typePd='保守型';
				that.typeObj.category = 'riskLevelExplanation_1';
				break;
			case 2:
				that.typeObj.typePd='稳健型';
				that.typeObj.category = 'riskLevelExplanation_2';
				break;
			case 3:
				that.typeObj.typePd='平衡型';
				that.typeObj.category = 'riskLevelExplanation_3';
				break;
			case 4:   
				that.typeObj.typePd='成长型';
				that.typeObj.category = 'riskLevelExplanation_4';
				break;
			case 5:   
				that.typeObj.typePd='进取型';
				that.typeObj.category = 'riskLevelExplanation_5';
				break;
		}
		return that.typeObj
	},

	//获取风测类型的解释文案
	findContentByCategory:function(){
		var that = this;

		var obj = [{
			url: site_url.findContentByCategory_joint_api,
			data: {
				hmac: "", //预留的加密信息     
				params: {
					category:that.typeObj.category,//类型（标志位）
					curPage :"1",// 当前页码 
					pageSize:"1",//每页显示条数     

					groupType:"contentCategory",//组类型（信息网站来源）【请参照备注】 
				}
			},
			needLogin: true,
			needDataEmpty: false, //需要判断data是否为空
			async: false, 
			callbackDone: function(json){
				var jsonData = json.data;

				$('.riskContent').html(jsonData.pageList[0].introduction);

			},
			callbackFail: function(json){
				tipAction(json.msg);
			},
			callbackNoData: function(json){
 
			}

		}];
		$.ajaxLoading(obj);
	},

	combinFundList:function($e){
		var that = this;

		var obj = [{
			url: site_url.combinFundList_api,
			data: {
				hmac: "", //预留的加密信息     
				params: {
					"riskLevel":riskLevel//客户风险等级 
				}
			},
			needLogin: true,
			needDataEmpty: false, //需要判断data是否为空
			async: false, 
			callbackDone: function(json){

				if(!!json.data){
					window.location.href = site_url.combinationDetails_url + '?riskLevel=' + riskLevel;
				}else{
					window.location.href = site_url.programFail_url;
				}
								
			},
			callbackFail: function(json){
				tipAction(json.msg);
				$e.removeAttr("disabled").removeClass('disable');			
			},

		}];
		$.ajaxLoading(obj);

	},

	
}

tradeList.init();
