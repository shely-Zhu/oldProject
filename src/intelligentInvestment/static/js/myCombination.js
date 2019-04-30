/*
 * @page: 恒小智我的持仓页面
 * @Author: songxiaoyu
 * @Date:   2018-10-12 16:42:39
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-11-20 10:18:40
 * @description:
 */

require('../../../include/js/vendor/config.js');
require('../../../include/js/vendor/zepto/callback.js');
require('../../../include/js/vendor/zepto/deferred.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
require('../../../common/js/components/elasticLayer.js');
var tipAction = require('../../../common/js/components/tipAction.js');
var splitUrl = require('../../../common/js/components/splitUrl.js')();
// 持仓表格
var holdingTable = require('@pathCommonJsComBus/holdingTable.js');

$(function() {

	var buyCombination = {
		$e: {
			top: $('.top'), // 总资产区域
			combiT: $('.combiT'), // 标题
			amountCom: $('.amountCom'), // 在途金额
			amountShare: $('.amountShare'), // 资产配置区域
			followAdjustment: $('.followAdjustment'), // 资产配置区域
			redemption: $('.redemption'), // 赎回按钮
			buyBtn: $('.buyBtn'), // 买入按钮
		},
		gV: {
            tableTitle: ['基金名称', '持有份额(份)', '市值(元)','市值占比'], // 持仓表格title
			combCode: null,
			transferRemind: null, // 弹窗提示
			transferDate: null, // 调仓时间
			tradeAcco: null, // 组合交易账号
		},
		init: function() {
			var that = this;
			that.getData();
			that.events();
		},
		getData: function() {
			var that = this;

			var obj = [{ // 组合资产详情
				url: site_url.totalAssets_api,
				data: {
					
				},
				//async: false,
				// needDataEmpty: true,
				callbackDone: function(json) {
					var data = json.data,
						totalAmountMask = data.totalAmountMask, // 总资产
						yesterdayIncomeMask = data.yesterdayIncomeMask, // 昨日收益
						accumIncomeMask = data.accumIncomeMask, // 累计收益
						valueOnwayShare = data.valueOnwayShare, // 在途份额
						valueOnwayShareMask = data.valueOnwayShareMask, // 在途份额
						valueOnwayMask = data.valueOnwayMask, // 在途金额
						valueOnway = data.valueOnway,// 在途金额
						transferRemind = data.transferRemind;// 一件调仓弹框提示

					that.gV.totalAmount = data.totalAmount; // 总资产
					that.gV.enableShares = data.enableShares; // 可用份额
					that.gV.combCode = data.combCode; // 组合编码
					that.gV.tradeAcco = data.tradeAcco; // 组合交易账号
					that.gV.transferDate = data.transferDate; // 调仓时间
					that.gV.combName = data.combName; // 组合名称

					that.$e.top.find('.totalMoney').html(totalAmountMask);
					that.$e.top.find('.income').html(yesterdayIncomeMask);
					that.$e.top.find('.addupIncome').html(accumIncomeMask);
					that.$e.combiT.html(that.gV.combName);

					// 有待确认金额，赎回按钮,买入按钮不可用
					if ((valueOnway != 0) && !!valueOnway) {
						that.$e.amountCom.find('.alignR').html(valueOnwayMask)
						that.$e.redemption.attr("disabled", true).addClass('disable');
						that.$e.buyBtn.attr("disabled", true).addClass('disable');
					} else {
						// 隐藏待确认金额区域
						that.$e.amountCom.hide()
					}

					// 有待确认份额
					((valueOnwayShare != 0) && !!valueOnwayShare) ? that.$e.amountShare.find('.alignR').html(valueOnwayShareMask): that.$e.amountShare.hide();


					// 一键跟调弹窗是否显示
					if(transferRemind == 1){
						that.$e.followAdjustment.show();

					}
				},
				     
			}, { // 恒小智-组合持仓列表
				url: site_url.shareList_api,
				data: {
				},
				//async: false,
				needDataEmpty: true,
				callbackDone: function(json) {
					var data = {};

					data.list = json.data.pageList;
					data.title = that.gV.tableTitle;
					data['myCombination'] = true; // 表格渲染的时候区分

					// 持仓表格渲染
					holdingTable(data);
				},
				     
			}];
			$.ajaxLoading(obj);
		},
		giveUpAdjustment: function(t) {
			var that = this;
			var obj = [{ // 放弃跟调
				url: site_url.combinTransferGiveUp_api,
				data: {
					hmac: "", //预留的加密信息
					params: { //请求的参数信息
						"combCode": that.gV.combCode, // 组合代码
						"transferDate": that.gV.transferDate //调仓日期
					}
				},
				//async: false,
				needDataEmpty: false,
				callbackDone: function(json) {
					// 放弃调仓请求成功
					$('.elasticLayer').hide();
					that.$e.followAdjustment.hide();

				},
				     
			}];
			$.ajaxLoading(obj);

		},
		events: function() {
			var that = this;

			// 赎回
			mui("body").on('tap', '.redemption', function() {
				if (!!Number(that.gV.enableShares) && Number(that.gV.enableShares) > 0) {
					window.location.href = site_url.redemption_url;
				} else {
					tipAction('没有可赎回份额')
				}
			})

			// 买入
			mui("body").on('tap', '.buyBtn', function() {
				window.location.href = site_url.buyCombination_url +'?groupCode=' + that.gV.combCode + '&supplementary=true'+'&combinationName=' + encodeURI(that.gV.combName);
			})

			// 组合详情
			mui("body").on('tap', '.tradeDetail', function() {
				window.location.href = site_url.combinationDetails_url + '?combCode=' + that.gV.combCode;
			})

			// 收益明细
			mui("body").on('tap', '.incomeDetail', function() {
				window.location.href = site_url.incomeDetail_url;
			})

			// 交易记录
			mui("body").on('tap', '.record', function() {
				window.location.href = site_url.transactionList_url;
			})

			// 调仓关闭按钮
			mui("body").on('tap', '.close', function() {
				that.$e.followAdjustment.hide();
			})

			// 调仓查看详情
			mui("body").on('tap', '.viewDetails', function() {
				window.location.href = site_url.adjustmentRecord_url + '?groupCode=' + that.gV.combCode;
			})

			// 一键调仓按钮
			mui("body").on('tap', '.keyAdjustment', function() {
				window.location.href = site_url.adjustment_url + '?combCode=' + that.gV.combCode + '&tradeAcco=' + that.gV.tradeAcco;
			})

			// 放弃跟调按钮
			mui("body").on('tap', '.giveUp', function() {

				$.elasticLayer({
					title: '提醒',
					p: '放弃跟调后，您将保持现有持仓产品，我们不再对本次调仓进行提醒，您也无法再跟随本次调仓操作。确定放弃？',
					yesTxt: '放弃跟调',
					celTxt: '我再想想',
					yesButtonPosition: 'right',
					callback: function(t) {
						that.giveUpAdjustment(t);
					}
				});
			})
		},
	};
	buyCombination.init();
});