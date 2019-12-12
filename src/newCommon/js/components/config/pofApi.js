/*
* @page: 公募相关接口
* @Author: songxiaoyu
* @Date:   2019-03-28 
* @Last Modified by:   songxiaoyu
* @description:
*/


module.exports = function() {
    /*------------------------------------------------------恒小智接口  start----------------------------------------------*/
    // 组合列表查询
    this.combinFundList_api = http_url.pof_url + '/smartInvestment/combinFundList';
    // 组合详情信息查询
    this.combinFundDetails_api = http_url.pof_url + '/smartInvestment/combinFundDetails';
    
    // 银行卡列表
    this.smartCardList_api = http_url.pof_url + '/smartInvestment/cardList';
    // 恒小智-组合产品买入占比列表
    this.combinFundProportionList_api = http_url.pof_url + '/smartInvestment/combinFundProportionList';
    // 恒小智-组合下单
    this.combinFundBuy_api = http_url.pof_url + '/smartInvestment/combinFundBuy';

    // 恒小智-组合赎回接口
    this.combinFundRedempInfo_api = http_url.pof_url + '/smartInvestment/combinFundRedempInfo';

    // 恒小智-组合交易账号查询
    //this.combinAccList_api = http_url.pof_url + '/smartInvestment/combinAccList';
    
    // 恒小智-组合资产交易详情(买入/赎回)
    this.combinTradeDetailsList_api = http_url.pof_url + '/smartInvestment/combinTradeDetailsList';

    // 恒小智-组合交易详情(买入/赎回)
    this.queryCombinFundTradeDetail_api = http_url.pof_url + '/smartInvestment/queryCombinFundTradeDetail';
    
    // 恒小智-组合详情折线图(收益走势/净值走势)
    this.trendGraphInfo_api = http_url.pof_url + '/smartInvestment/trendGraphInfo';
    // 一键调仓 
    this.holdChange_api = http_url.pof_url + '/smartInvestment/holdChange';
    
    // 调仓申请详情
    this.combinTransferDetail_api = http_url.pof_url + '/smartInvestment/combinTransferDetail';

    // 系统调仓记录列表
    this.combinTransferList_api = http_url.pof_url + '/smartInvestment/combinTransferList';
    // 放弃跟调接口
    this.combinTransferGiveUp_api = http_url.pof_url + '/smartInvestment/combinTransferGiveUp';
    // 调仓
    this.combinTransfer_api = http_url.pof_url + '/smartInvestment/combinTransfer';

    /*------------------------------------------------------恒小智接口  end----------------------------------------------*/

    
    /*------------------------------财商教育start------------------------------------------*/
    // 是否展示推广信息
    this.ifShowPromotionApi = http_url.pof_url + '/fqEducation/ifShowPromotion';
    // 初始化财商教育记录
    this.initApi = http_url.pof_url + '/fqEducation/init';
    // 查询财商教育记录
    this.findApi = http_url.pof_url + '/fqEducation/find';
    // 更新财商教育记录
    this.updateApi = http_url.pof_url + '/fqEducation/update';
    // 财商总资产
    this.myFinancialEducationInfoApi = http_url.pof_url + '/myAssetInfo/myFinancialEducationInfo';
    /*------------------------------财商教育end------------------------------------------*/


    /*------------------------------基金诊断start------------------------------------------*/
    //基金诊断-基金基本信息
    this.queryFundBaseInfo_api = http_url.pof_url + '/frontend/fundDiagnosis/queryFundBaseInfo';
    //通用-热门基金查询
    this.fundRecommend_api = http_url.pof_url + '/frontend/fundDiagnosis/fundRecommend';
    // 基金诊断-指标雷达图
    this.queryRadarChartList_api = http_url.pof_url + '/frontend/fundDiagnosis/queryRadarChartList';
    // 基金诊断-综合定性评价
    this.querySynthesizeQualitativeEvaluate_api = http_url.pof_url + '/frontend/fundDiagnosis/querySynthesizeQualitativeEvaluate';
    // 基金诊断-累计收益曲线
    this.queryCumulativeProfitCurveList_api = http_url.pof_url + '/frontend/fundDiagnosis/queryCumulativeProfitCurveList';
    // 基金诊断-点击获取专属诊断报告
    this.exclusiveDiagnosisReport_api = http_url.pof_url + '/fundDiagnosis/exclusiveDiagnosisReport';
    // 基金诊断字典接口
    this.queryDictionary_api = http_url.pof_url + '/frontend/fundDiagnosis/queryDictionary';

    /*------------------------------基金诊断end------------------------------------------*/

      /*------------------- 私募理财fang——le start ------------------------------*/
    this.protocolList_api = http_url.pof_url + '/fixedInvestment/protocol/list'; //金服WEB-定投交易- 我的定投协议列表
     
 
 
      /*------------------- 月度报告 end ------------------------------*/
};