/*
 * @page: wap 端共用接口
 * @Author: zhangyanping
 * @Date:   2019-11-26
 * 
 * 
 */

//获取当前页面地址
module.exports = function () {
    /*------------------------------------------------------原pefApi.js文件  start----------------------------------------------*/
    // this.prvLevel_api = http_url.wap_url + '/pef/queryBenefitLevel'; //受益级别查询
    // this.prvHisValue_api = http_url.wap_url + '/pef/queryHistoryNetValue'; //历史净值查询
    // this.prvLight_api = http_url.wap_url + '/pef/queryProductImage'; //产品亮点查询
    // this.queryReourceLabels_api = http_url.wap_url +"/pef/queryReourceLabels"; //获取私募产品材料标签
    // this.prvReource_api = http_url.wap_url + '/pef/queryReourceList'; //产品材料接口
    //老带新
    // this.oldRecommendNew_api = http_url.wap_url + '/pef/user/oldRecommendNew.action';
    //老带新微信
    // this.share_api = http_url.joint_url + '/pef/weixin/share.action';

    /*------------------------------------------------------原pefApi.js文件  end ----------------------------------------------*/

    /*------------------------------------------------------原pofApi.js文件  start----------------------------------------------*/

    /*------------------------------------------------------恒小智接口  start----------------------------------------------*/
    // 组合列表查询
    this.combinFundList_api = http_url.wapApi_url + '/pof/smartInvestment/combinFundList';
    // 组合详情信息查询
    this.combinFundDetails_api = http_url.wapApi_url + '/pof/smartInvestment/combinFundDetails';
    
    // 银行卡列表
    this.smartCardList_api = http_url.wapApi_url + '/pof/smartInvestment/cardList';
    // 恒小智-组合产品买入占比列表
    this.combinFundProportionList_api = http_url.wapApi_url + '/pof/smartInvestment/combinFundProportionList';
    // 恒小智-组合下单
    this.combinFundBuy_api = http_url.wapApi_url + '/pof/smartInvestment/combinFundBuy';

    // 恒小智-组合赎回接口
    this.combinFundRedempInfo_api = http_url.wapApi_url + '/pof/smartInvestment/combinFundRedempInfo';

    // 恒小智-组合交易账号查询
    //this.combinAccList_api = http_url.wapApi_url + '/pof/smartInvestment/combinAccList';
    
    // 恒小智-组合资产交易详情(买入/赎回)
    this.combinTradeDetailsList_api = http_url.wapApi_url + '/pof/smartInvestment/combinTradeDetailsList';

    // 恒小智-组合交易详情(买入/赎回)
    this.queryCombinFundTradeDetail_api = http_url.wapApi_url + '/pof/smartInvestment/queryCombinFundTradeDetail';
    
    // 恒小智-组合详情折线图(收益走势/净值走势)
    this.trendGraphInfo_api = http_url.wapApi_url + '/pof/smartInvestment/trendGraphInfo';
    // 一键调仓 
    this.holdChange_api = http_url.wapApi_url + '/pof/smartInvestment/holdChange';
    
    // 调仓申请详情
    this.combinTransferDetail_api = http_url.wapApi_url + '/pof/smartInvestment/combinTransferDetail';

    // 系统调仓记录列表
    this.combinTransferList_api = http_url.wapApi_url + '/pof/smartInvestment/combinTransferList';
    // 放弃跟调接口
    this.combinTransferGiveUp_api = http_url.wapApi_url + '/pof/smartInvestment/combinTransferGiveUp';
    // 调仓
    this.combinTransfer_api = http_url.wapApi_url + '/pof/smartInvestment/combinTransfer';

    /*------------------------------------------------------恒小智接口  end----------------------------------------------*/

    
    /*------------------------------财商教育start------------------------------------------*/
    // 是否展示推广信息
    this.ifShowPromotionApi = http_url.wapApi_url + '/pof/fqEducation/ifShowPromotion';
    // 初始化财商教育记录
    this.initApi = http_url.wapApi_url + '/pof/fqEducation/init';
    // 查询财商教育记录
    this.findApi = http_url.wapApi_url + '/pof/fqEducation/find';
    // 更新财商教育记录
    this.updateApi = http_url.wapApi_url + '/pof/fqEducation/update';
    // 财商总资产
    this.myFinancialEducationInfoApi = http_url.wapApi_url + '/pof/myAssetInfo/myFinancialEducationInfo';
    /*------------------------------财商教育end------------------------------------------*/


    /*------------------------------基金诊断start------------------------------------------*/
    //基金诊断-基金基本信息
    this.queryFundBaseInfo_api = http_url.wapApi_url + '/pof/frontend/fundDiagnosis/queryFundBaseInfo';
    //通用-热门基金查询
    this.fundRecommend_api = http_url.wapApi_url + '/pof/frontend/fundDiagnosis/fundRecommend';
    // 基金诊断-指标雷达图
    this.queryRadarChartList_api = http_url.wapApi_url + '/pof/frontend/fundDiagnosis/queryRadarChartList';
    // 基金诊断-综合定性评价
    this.querySynthesizeQualitativeEvaluate_api = http_url.wapApi_url + '/pof/frontend/fundDiagnosis/querySynthesizeQualitativeEvaluate';
    // 基金诊断-累计收益曲线
    this.queryCumulativeProfitCurveList_api = http_url.wapApi_url + '/pof/frontend/fundDiagnosis/queryCumulativeProfitCurveList';
    // 基金诊断-点击获取专属诊断报告
    this.exclusiveDiagnosisReport_api = http_url.wapApi_url + '/pof/fundDiagnosis/exclusiveDiagnosisReport';
    // 基金诊断字典接口
    this.queryDictionary_api = http_url.wapApi_url + '/pof/frontend/fundDiagnosis/queryDefinitions';
    //基金账户诊断优化-提交新增申请前的数据回显
    this.addBeforeFundDiagnosisApply_api = http_url.wapApi_url + '/pof/fundDiagnosis/addBeforeFundDiagnosisApply';
    //基金账户诊断优化-提交基金诊断申请记录
    this.addFundDiagnosisApply_api = http_url.wapApi_url + '/pof/fundDiagnosis/addFundDiagnosisApply';
    //基金账户诊断优化-所有基金诊断申请记录
    this.queryAllByCustomerNo_api = http_url.wapApi_url + '/pof/fundDiagnosis/queryAllByCustomerNo';
    //基金账户诊断优化-查询基金诊断申请详情
    this.queryFundDiagnosisApplyInfo_api = http_url.wapApi_url + '/pof/fundDiagnosis/queryFundDiagnosisApplyInfo';
    //基金账户诊断优化-修改基金诊断申请记录
    this.updateFundDiagnosisApply_api = http_url.wapApi_url + '/pof/fundDiagnosis/updateFundDiagnosisApply';

    /*------------------------------基金诊断end------------------------------------------*/

    /*------------------------------------------------------原pofApi.js文件  end----------------------------------------------*/
    

    /*------------------------------------------------------原contentApi.js文件  start----------------------------------------------*/
    //获取客户信息
    // this.findContentByCategory_api = http_url.wapApi_url + '/content/frontend/findContentByCategory';
    //协议查询
    // this.findInvestorClassification_api = http_url.wapApi_url + '/content/findInvestorClassification';
    // this.findBannerLikePosition_api = http_url.wapApi_url + '/frontend/findBannerLikePosition'; //获取页面背景及其他图片素材
    
    this.activity_api = http_url.wapApi_url + '/content/frontend/findSpecialById'; //产品专题
    // 中秋活动 我已完成学习按钮点击请求的接口
    this.eBusinessRecord_api = http_url.wapApi_url + '/content/eBusinessRecord';

    /*------------------------------------------------------原contentApi.js文件  end ----------------------------------------------*/


    /*------------------------------------------------------原accountApi  start ----------------------------------------------*/


    this.login_url =  '/app/account/frontend/loginCheck'; //登录
    // 判断登录状态
    this.queryClassification_api = http_url.wapApi_url + '/account/queryClassification'; //投资者分类审核状态查询
    this.applyForClassification_api = http_url.wapApi_url + '/account/investor/applyForClassification'; //投资者分类申请

    // 恒小智-组合收益明细查询
    this.incomeList_api = http_url.wapApi_url + '/account/smartInvestment/incomeList';
    // 恒小智-组合基金持仓中
    this.shareList_api = http_url.wapApi_url + '/account/smartInvestment/shareList';
    // 银行卡列表
    this.smartList_api = http_url.wapApi_url + '/account/smartInvestment/smartList';
    // 组合资产详情
    this.totalAssets_api = http_url.wapApi_url + '/account/smartInvestment/totalAssets';
    // 恒小智-交易列表
    this.recordList_api = http_url.wapApi_url + '/account/smartInvestment/recordList';
    // 恒小智-组合交易账号查询
    this.combinAccList_api = http_url.wapApi_url + '/account/smartInvestment/tradAcctList';

    /*------------------------------------------------------原accountApi  end ----------------------------------------------*/

  //基金诊断--start
   // 账户持仓详情
   this.accountHoldShareDetail_api = http_url.wapApi_url + '/pof/accountDiagnosis/accountHoldShareDetail';
   // 基金配置比例详情
   this.fundConfigRatioDetail_api = http_url.wapApi_url + '/pof/accountDiagnosis/fundConfigRatioDetail';
   // 资产配置比例
   this.assetConfigRatioDetail_api = http_url.wapApi_url + '/pof/accountDiagnosis/assetConfigRatioDetail';
   // 重仓行业配置
   this.heavyIndustryConfigRatioDetail_api = http_url.wapApi_url + '/pof/accountDiagnosis/heavyIndustryConfigRatioDetail';
   // 组合券种分布
   this.bondTypeAndValue_api = http_url.wapApi_url + '/pof/accountDiagnosis/bondTypeAndValue';
   //账户风格  
    this.diagnosisAccountStyle_api = http_url.wapApi_url + '/pof/accountDiagnosis/diagnosisAccountStyle';
   // 诊断结果
   this.diagnoseResult_api = http_url.wapApi_url + '/pof/accountDiagnosis/diagnoseResult';
};