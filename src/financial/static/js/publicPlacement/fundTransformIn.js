/**  
* @Page:  现金管理 -- 转入
* @Author: yangjinlai
* @Date:   2019-11-25
* 
*/

require('@pathIncludJs/vendor/config.js');
//ajax调用
require('@pathCommonJs/ajaxLoading.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js');
require('@pathIncludJs/vendor/zepto/deferred.js');

require('@pathCommonJs/components/headBarConfig.js');

require('@pathCommonCom/elasticLayer/transOutRule/transOutRule.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function () {

	var regulatory = {
		$el:{
			fundName:$(".title .fundName"),  //基金名
			fundCode:$(".title .fundCode"),   //基金代码
			transformInput:$("#transformInput"),  //输入金额
			CostEstimate:$(".CostEstimate .num"), // 费用估算
			payConfirmDate:$(".payConfirm .date"),  //购买确认日
			brforre15Date:$(".brforre15 .date"),  // 15点之后交易日
			popupUl: $('.popup-ul'), // 银行卡模板容器
			bankListTemplate: $('#bankList-template'), //银行卡模板
			onlinepay: $('.onlinepay .onright-left'), // 在线支付银行卡模板容器
			remittance: $('.remittance .onright-left'), // 汇款支付银行卡模板容器
			bankListCheckTemplate: $('#bankListCheck-template'), //选中银行卡模板
			iconCheck: $(".item2 .iconfont"), //同意协议选择框
			contract: $(".file .contract"), //同意协议选择框
			recruiting: $(".file .recruiting"), //同意协议选择框
			confirmBtn: $(".btn_box .btn"), //确定按钮
		},
		gV: { // 全局变量
			fundBusinCode:'022',
			purchaseRate:0,  // 购买费率 
			discount:'',  //折扣率
			feeCalcMed:'',  //费率类型
			feeRateList:[], //费率
            fundName:splitUrl['fundName'] ? splitUrl['fundName'] : null,   //基金名称
			fundCode:splitUrl['fundCode'] ? splitUrl['fundCode'] : '000847',  //基金代码
			tradeSource:splitUrl['tradeSource'] ? splitUrl['tradeSource'] : null, //交易来源
			payType:'' ,   //支付方式（0、在线支付 1、汇款支付）
			bankName:'',  // 银行名称
			bankNo:''   //银行编码
        },
		webinit: function () {
			var that = this;

			//
			that.events();
			that.getData();
			that.getAgreeUrl()
		},

		//获取基金数据
		getData: function(t) {
            var that = this;

            var obj = [{ 
                url: site_url.newfundDetails_api,
                data: {
                    "fundCode": that.gV.fundCode, 
                    "tradeSource": that.gV.tradeSource,
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
					if(json.status == '0000'){
						var data = json.data;
						that.$el.fundName.html(data.chiName)
						that.$el.fundCode.html(data.trdCode)
						
						that.$el.payConfirmDate.html(data.fundConfirmDate)
						that.$el.brforre15Date.html(data.after15tradeDate)
						that.gV.discount = Number(data.discount);
						that.gV.feeRateList = data.fundPurchaseFeeRate.detailList
						for (var index = 0; index < data.tradeLimitList.length; index++) {
							if(that.gV.fundBusinCode ==  data.tradeLimitList[index].fundBusinCode){
							   that.$el.transformInput.attr('placeholder',data.tradeLimitList[index].minValue)
							   that.$el.transformInput.attr('min',Number(data.tradeLimitList[index].minValue).toFixed(2))
							   that.$el.transformInput.attr('max',Number(data.tradeLimitList[index].maxValue).toFixed(2))
							}
							
						}
						
					}
                  
                },

            }];
            $.ajaxLoading(obj);
		},

		//获取银行列表
		getBankCard: function(useEnv) {
            var that = this;

            var obj = [{ 
                url: site_url.normalPofList_api,
                data: {
                    useEnv:useEnv
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
					if(json.status == '0000'){
						// 将列表插入到页面上
						var data = [] ;
						data = json.data.pageList;
						generateTemplate(data, that.$el.popupUl, that.$el.bankListTemplate,true);
						$('.popup').css('display','block')
					}
                  
                },

            }];
            $.ajaxLoading(obj);
		},

		//获取告知书，招募书链接
		getAgreeUrl: function() {
            var that = this;

            var obj = [{ 
                url: site_url.fundMaterial_api,
                data: {
                    fundCode:that.gV.fundCode
                },
                //async: false,
                needDataEmpty: true,
                callbackDone: function(json) {
					if(json.status == '0000'){
						// 将列表插入到页面上
						var data = [] ;
						data = json.data;
						data.forEach(element => {
							if(element.materialType == '1'){
								that.$el.contract.attr('href',element.linkAddress)
							}
							if(element.materialType == '2'){
								that.$el.recruiting.attr('href',element.linkAddress)
							}
						});
						
					}
                  
                },

            }];
            $.ajaxLoading(obj);
		},
        /*
            绑定事件
         */
		events: function () {
			var that = this;

			/** 下面三个事件： 银行卡列表出现/隐藏 **/
			$('body').on('tap','.paymoney',function(){
				$(".imgc").hide()
				$(".iimg").show()
				$(this).find(".imgc").show();
				$(this).find(".iimg").hide();
				that.gV.payType = $(this).attr('pay-type')
				var useEnv = $(this).attr('pay-type')
				that.getBankCard(useEnv)
				
				
			}) 

			$('body').on('tap','.popup-close',function(){
				$('.popup').css('display','none')
			}) 

			$('body').on('tap','.popup-mask',function(){
				$('.popup').css('display','none')
			}) 


			//点击转出规则
			$('body').on('tap','.goRule',function(){
				$('.elasticLayer.transOutRule').show()
			}) 
			
			$("#transformInput").on('input propertychange',function(){
				console.log('this.val',$(this).val())
				debugger
				for (var i = 0; i < that.gV.feeRateList.length; i++) {
					//先判断 计算方式
					if (that.gV.feeRateList[i].feeCalcMed == '1') {//固定费用 (最多有一条此数据)
						if (Number($(this).val()) >= Number(that.gV.feeRateList[i].minValue).toFixed * 10000) {//当前输入Money 小于等于 此区间最小值
							that.gV.purchaseRate= Number(that.gV.feeRateList[i].maxRate).toFixed;//将此区间费用赋值给rate
							that.gV.feeCalcMed = "1";
						}
					} else if (that.gV.feeRateList[i].feeCalcMed == '2') {//固定费率
						if (Number($(this).val()) < Number(that.gV.feeRateList[i].maxValue).toFixed * 10000 && Number($(this).val()) >= Number(that.gV.feeRateList[i].minValue).toFixed * 10000) {//当前输入Money 属于此区间
							that.gV.purchaseRate = Number(that.gV.feeRateList[i].maxRate).toFixed / 100;//将此区间费率赋值给rate   需要除以100是 其值
							that.gV.feeCalcMed = "2";
						}
					}
				}
				var value = 0;
				if(that.gV.feeCalcMed == "1"){
					value = Number($(this).val())
				}
				if(that.gV.feeCalcMed == "2"){
				   var rate = that.gV.purchaseRate/100 * that.gV.discount/100
				   value = Number($(this).val())*(1-1/(1 + rate))
				}
				
				that.$el.CostEstimate.html(value)
			})
			//清除输入框数字
			$('body').on('tap','.deleteNum',function(){
				$('.transformInput').val(null)
			}) 

			//选中银行卡
			$('body').on('tap','.bank-li',function(){
				$(".bank-li .true").hide();
				$(this).find(".true").show()
				that.gV.bankName = $(this).attr('bankName');
				that.gV.bankNo = $(this).attr('bankNo');
				var data = []
				data.push({
					bankThumbnailUrl:$(this).attr('bankThumbnailUrl'),
					bankName:$(this).attr('bankName'),
					bankNo:$(this).attr('bankNo'),
					singleNum:$(this).attr('singleNum'),
					oneDayNum:$(this).attr('oneDayNum')
				})

				if(that.gV.payType == '0'){
					generateTemplate(data, that.$el.onlinepay, that.$el.bankListCheckTemplate,true);
				}
				if(that.gV.payType == '1'){
					generateTemplate(data, that.$el.remittance, that.$el.bankListCheckTemplate,true);
				}
				setTimeout(function(){
					$('.popup').css('display','none')
				},500)
			}) 

			//点击同意协议
			that.$el.iconCheck.on('click', function() {
                if ($(this).hasClass("check")) {
					$(this).removeClass("check").html('&#xe668;');
					that.$el.confirmBtn.attr('disabled',true)
                } else {
					$(this).addClass("check").html('&#xe669;');
					that.$el.confirmBtn.removeAttr("disabled");
                }
			});
			
			//确定
			$('body').on('tap','.btn_box .btn',function(){
				$("#passwordWrap").show();
			}) 
		},

		

	};
	//调用函数
	regulatory.webinit();

})
