/**
 * 公募接口
 */



module.exports = function() {

    this.pubMyShare_api = http_url.api_url + '/pof/myAssetInfo/myAssetsShareInfo.action'; //持仓中
    this.pubTrade_api = http_url.api_url + '/pof/myAssetInfo/transitTradeInfo.action'; //在途基金，即处理中
    this.pubTradeConfirm_api = http_url.api_url + '/pof/myTrade/queryTradeConfirm.action'; //历史持有基金即已完成
    this.pubAllAssets_api = http_url.api_url + '/pof/myAssetInfo/myAssetsOverview.action'; //公募总资产

    this.Planner_search_api = http_url.api_url + '/pof/financialPlanner/financialPlannerInfo.action'; //公募理财师查询
    this.Planner_bind_api = http_url.api_url + '/pof/financialPlanner/bindFinancialPlanner.action'; //公募理财师绑定
	//公募banner
	this.findPofBannerByPosition_api= http_url.api_url+'/pof/index/banners/findBannerByPosition.action'
		
    //公募监管账户
    this.pubregulatory_api = http_url.api_url + '/pof/supervise/view.action';

    //银行卡列表
    // bankCard_api =http_url.api_url+'/pof/myBanks/cardList.action';

    /********************设置网站交易密码****************************/

    //校验原交易密码
    this.checkOldDealPassword_api = http_url.api_url + '/pof/myPassword/updatePasswordForPayFirst.action';
    //修改网站交易密码
    this.changeDealPassword_api = http_url.api_url + '/pof/myPassword/updatePasswordForPaySecond.action';
    //请求银行列表
    this.changeDealBankList_api = http_url.api_url + '/pof/myBanks/cardList.action';

    //忘记网站交易密码，第一步，获取流水号，后台发短信验证码
    this.setPasswordForPayFirst_api = http_url.api_url + '/pof/myPassword/setPasswordForPayFirst.action';
    //忘记网站交易密码，第二步，下一步请求接口
    this.setPasswordForPaySecond_api = http_url.api_url + '/pof/myPassword/setPasswordForPaySecond.action';
    //忘记网站交易密码，第三步，提交新密码
    this.setPasswordForPayThird_api = http_url.api_url + '/pof/myPassword/setPasswordForPayThird.action';

    //公募产品列表
    this.gongmuQueryList_api = http_url.api_url + '/pof/fund/query.action';
    //公募产品详情
    this.fundBasicDetails_api = http_url.api_url + '/pof/fundDetails/fundBasicDetails.action';
    //画图
    this.fundNetWorthTrendChart_api = http_url.api_url + '/pof/fundDetails/fundNetWorthTrendChart.action';


    //公募理财师查询  统一客户需求转换为请求私募理财师接口，废弃
    //this.pubPlanner_search_api = http_url.api_url + "/pof/financialPlanner/financialPlannerInfo.action";
    //公募绑定或者解绑理财师  统一客户需求转换为请求私募理财师接口 废弃
    //this.pubPlanner_bind_api = http_url.api_url + "/pof/financialPlanner/bindFinancialPlanner.action";
    //公募风险测评查询
    this.pubQuestion_search_api = http_url.api_url + "/pof/riskAssessment/getRiskAssessment.action";
    //公募风险评测试题
    this.pubQuestion_item_api = http_url.api_url + "/pof/riskAssessment/getRiskQuestionnaire.action";
    //公募风险测评打分
    this.pubQuestion_score_api = http_url.api_url + "/pof/riskAssessment/submitRiskQuestionnaire.action";
    //公募交易列表
    this.pubTradeApply_api = http_url.api_url + "/pof/myTrade/queryTradeApply.action";

    this.pubQuestion_score_api = http_url.api_url + "/pof/riskAssessment/submitRiskQuestionnaire.action";

    //下单
    //进入下单页面
    this.toBuy_api = http_url.api_url + '/pof/buyFund/toBuy.action';
    //校验支付方式
    this.checkPayType_api = http_url.api_url + '/pof/buyFund/checkPayType.action';
    //点击提交
    this.payment_api = http_url.api_url + '/pof/buyFund/payment.action';


    //历史净值
    this.fundNetWorthList_api = http_url.api_url + '/pof/fundDetails/fundNetWorthList.action';
    //获取交易详情
    this.pubApplyInfo_api = http_url.api_url + '/pof/myAssetInfo/tradeApplyInfo.action';
    //公募赎回接口
    this.pubRedemptionPay_api = http_url.api_url + '/pof/redemptionPay/redemptionPay.action';
    //公募撤单
    this.pubUndoTradeApply_api = http_url.api_url + '/pof/undoTradeApply/undoTradeApply.action';
    //购买须知
    this.viewFeeInfo_api = http_url.api_url + '/pof/fundFee/viewFeeInfo.action';
    //基金详情档案
    this.fundBasicProfile_api = http_url.api_url + '/pof/fundArchives/fundBasicProfile.action';
    //基金公司
    this.fundCompanyInfo_api = http_url.api_url + '/pof/fundArchives/fundCompanyInfo.action';
    //基金经理
    this.fundManagerInfo_api = http_url.api_url + '/pof/fundArchives/fundManagerInfo.action';
    //基金公告详情
    this.fundNoticeDetails_api = http_url.api_url + '/pof/fundArchives/fundNoticeDetails.action';
    //投资组合
    this.investmentPortfolio_api = http_url.api_url + '/pof/fundArchives/investmentPortfolio.action';
    //基金公告列表
    this.fundNoticeList_api = http_url.api_url + '/pof/fundArchives/fundNoticeList.action';
    //基金公告详情
    this.fundNoticeDetail_api = http_url.api_url + '/pof/fundArchives/fundNoticeDetails.action';

    //设置默认风险等级
    this.updateInvestRiskTolerance_api = http_url.api_url + '/pof/riskAssessment/updateInvestRiskTolerance.action';


    //中融货币E接口
    //资产总览
    this.getTotalAssetsCash_api = http_url.api_url + '/pof/cash/getTotalAssetsCash.action';
    //进入转入页面
    this.doCashTreasureToBuy_api = http_url.api_url + '/pof/cash/doCashTreasureToBuy.action';
    //转入接口
    this.doCashTreasureBuy_api = http_url.api_url + '/pof/cash/doCashTreasureBuy.action';
    //转出接口
    this.doCashTreasureSell_api = http_url.api_url + '/pof/cash/doCashTreasureSell.action';
    //我的银行卡列表查询
    this.getCardList_api = http_url.api_url + '/pof/cash/cardList.action';
    //交易明细--转入;转出
    this.queryTradeList_api = http_url.api_url + '/pof/cash/queryTradeList.action';
    //交易明细--收益
    this.queryIncomeList_api = http_url.api_url + '/pof/cash/queryIncomeList.action';
    //转入转出详情页
    this.getCashTreasureDetail_api = http_url.api_url + '/pof/cash/getCashTreasureDetail.action';
    //中融货币E快速转出限额提示
    this.getCashTreasureLimitInfo_api = http_url.api_url + '/pof/cash/getCashTreasureLimitInfo.action';
    //现金管理资产列表
    this.getAssetsCashList_api = http_url.api_url + '/pof/cash/getAssetsCashList.action';

    // 投资知识问卷查询
    this.getInvestmentKnowledgeQuestionnaire_api = http_url.api_url + '/pof/investmentKnowledge/getInvestmentKnowledgeQuestionnaire.action';
    // 投资知识问卷提交
    this.submitInvestmentKnowledgeQuestionnaire_api = http_url.api_url + '/pof/investmentKnowledge/submitInvestmentKnowledgeQuestionnaire.action';





    /*------------------------------------------------------恒小智接口  start----------------------------------------------*/

    /*// 组合详情
    this.combinFundList_api = http_url.api_url + '/pof/smartInvestment/combinFundList.action';
    // 组合详情信息查询
    this.combinFundDetails_api = http_url.api_url + '/pof/smartInvestment/combinFundDetails.action';
    // 组合资产详情
    this.combinFundTotalAsset_api = http_url.api_url + '/pof/smartInvestment/combinFundTotalAsset.action';
    // 银行卡列表
    this.smartCardList_api = http_url.api_url + '/pof/smartInvestment/cardList.action';
    // 恒小智-组合产品买入占比列表
    this.combinFundProportionList_api = http_url.api_url + '/pof/smartInvestment/combinFundProportionList.action';
    // 恒小智-组合下单
    this.combinFundBuy_api = http_url.api_url + '/pof/smartInvestment/combinFundBuy.action';

    // 恒小智-组合赎回接口
    this.combinFundRedempInfo_api = http_url.api_url + '/pof/smartInvestment/combinFundRedempInfo.action';

    // 恒小智-组合交易账号查询
    this.combinAccList_api = http_url.api_url + '/pof/smartInvestment/combinAccList.action';
    
    // 恒小智-组合收益明细查询
    this.combinFundIncomeList_api = http_url.api_url + '/pof/smartInvestment/combinFundIncomeList.action';

    // 组合基金持仓中
    this.myShare_api = http_url.api_url + '/pof/smartInvestment/myShare.action';

    // 恒小智-组合资产交易详情(买入/赎回)
    this.combinTradeDetailsList_api = http_url.api_url + '/pof/smartInvestment/combinTradeDetailsList.action';

    // 恒小智-组合交易详情(买入/赎回)
    this.queryCombinFundTradeDetail_api = http_url.api_url + '/pof/smartInvestment/queryCombinFundTradeDetail.action';
    // 组合交易记录
    this.myRecord_api = http_url.api_url + '/pof/smartInvestment/myRecord.action';
    // 恒小智-组合详情折线图(收益走势/净值走势)
    this.trendGraphInfo_api = http_url.api_url + '/pof/smartInvestment/trendGraphInfo.action';
    // 一键调仓 
    this.holdChange_api = http_url.api_url + '/pof/smartInvestment/holdChange.action';
    
    // 调仓申请详情
    this.combinTransferDetail_api = http_url.api_url + '/pof/smartInvestment/combinTransferDetail.action';

    // 系统调仓记录列表
    this.combinTransferList_api = http_url.api_url + '/pof/smartInvestment/combinTransferList.action';
    // 放弃跟调接口
    this.combinTransferGiveUp_api = http_url.api_url + '/pof/smartInvestment/combinTransferGiveUp.action';
    // 调仓
    this.combinTransfer_api = http_url.api_url + '/pof/smartInvestment/combinTransfer.action';*/

    /*------------------------------------------------------恒小智接口  end----------------------------------------------*/




}