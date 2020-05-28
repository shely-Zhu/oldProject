/*
 * @page: pc wap 端共用接口
 * @Author: chengqingqing
 * @Date:   2019-03-28
 * @Last Modified by:   songxiaoyu
 * @description:
 */

//获取当前页面地址
module.exports = function() {
    /*-------------------账户相关------------------------------*/
    //资普
    this.standardPoor_api = http_url.web_url + '/account/standardPoor/getTotalAssets';
    //资普 查询客户是否有理顾宝推送资产报告
    this.hasAssetReport_api = http_url.web_url + '/account/standardPoor/hasAssetReport';
    //资普 配置建议书
    this.ReportData_api = http_url.web_url + '/account/getAssetConfigReportData';
    //资普 配置建议书获取echarts数据
    this.getCustomerAssetCharts_api = http_url.web_url + '/account/getCustomerAssetCharts';
    //资普 配置建议书获取配置详情
    this.getCustomerAssetDetailById_api = http_url.web_url + '/account/getCustomerAssetDetailById';
    //资普 配置建议书获数据字典
    this.getCustomerAssetDictionary_api = http_url.web_url + '/account/getCustomerAssetDictionary';

    //检查是否登录,sso后换成jsonp
    this.checkLogin_api = http_url.web_url + '/account/frontend/isLogin';
    //获取客户信息
    this.user_api = http_url.web_url + '/account/getUserInfo';
    // 查询用户基本信息
    this.queryUserBaseInfo_api = http_url.web_url + '/account/queryUserBaseInfo';
    // 查询用户特有信息
    this.queryUserPeculiarInfo_api = http_url.web_url + '/account/queryUserPeculiarInfo';
    // 查询用户认证信息
    this.queryUserAuthInfo_api = http_url.web_url + '/account/queryUserAuthInfo';
    // 客户冻结状态查询
    this.queryFreezeStatus_api = http_url.web_url + '/account/freezeStatus/queryFreezeStatus';
    this.custBro_api = http_url.web_url + '/account/custBroRelQuery'; //理财师查询与客户关系接口
    this.queryFreezeStatus_api = http_url.web_url + '/account/freezeStatus/queryFreezeStatus'; //账户冻结
    this.queryClassification_api = http_url.web_url + '/account/queryClassification'; //投资者分类审核状态查询
    this.applyForClassification_api = http_url.web_url + '/account/investor/applyForClassification'; //投资者分类申请
    this.share_api = http_url.web_url + '/account/frontend/weixin/share'; //老带新微信分享
    this.oldRecommendNew_api = http_url.web_url + '/account/oldRecommendNew'; // 微信公众号获取参数
    // 其他资产

    this.getJJSInTransitAssets_api = http_url.web_url + '/account/jjs/getJJSInTransitAssets'; // 查询金交所在途资产 
    //待确认，已确认列表
    this.getTradeList_api = http_url.web_url + '/pef/getTradeList'
    // 
    this.gainCustStorageList_api = http_url.web_url + '/account/gainCustStorageList'
        //取消预约产品
    this.fundReserveCancel_api = http_url.web_url + '/pef/fundReserveCancel'
        // 查询金交持仓资产、在途资产、总资产
    this.getJJSAssets_api = http_url.web_url + '/account/jjs/getJJSAssets';
    // jjs持仓明细查询
    this.queryAssetsDetailByPages_api = http_url.web_url + '/account/jjs/queryAssetsDetailByPages'
    // 持仓报告 by zhubingshuai
    this.getWeeklyPosition_api = http_url.web_url + '/account/weeklyPosition'
    // 持仓周报产品信息 by zhubingshuai
    this.getProdViewsDetail_api = http_url.web_url + '/account/prodViewsDetail'
    // 持仓周报之产品list by zhubingshuai
    this.getSecuProdViews_api = http_url.web_url + '/account/secuProdViews'
    


    /*-------------------账户相关 end ------------------------------*/

    /*-------------------内容相关------------------------------*/
    this.findBannerLikePosition_api = http_url.web_url + '/content/frontend/findBannerLikePosition'; //获取页面背景及其他图片素材
    // 首页banner
    this.findBannerByPosition_api = http_url.web_url + '/content/frontend/findBannerByPosition';
    // 上传图片
    this.uploadApi = http_url.web_url + '/content/file/mount/upload';
    // 图片下载
    this.downloadApi = http_url.web_url + '/content/file/mount/download';
    // 图片删除
    this.removeApi = http_url.web_url + '/content/file/mount/remove';
    //协议查询
    this.findInvestorClassification_api = http_url.web_url + '/content/frontend/findInvestorClassification';
    //文件下载
    this.download_api = http_url.web_url + '/content/file/fastDFS/download'; //文件下载
    //文件下载新
    this.downloadNew_api = http_url.web_url + '/content/file/fastDFS/downloadNew'; //文件下载
    //文件下载（金服挂载盘）
    this.mountDownload_api = http_url.web_url + '/content/file/mount/download'; //文件下载
     //文件下载（金服挂载盘）
     this.frontendMountDownload_api = http_url.web_url + '/content/file/frontend/mount/download'; //入参如果是url而不是fileName的情况，可以使用此接口用于非登录下载
    // 内容管理接口
    this.findContentByCategory_api = http_url.web_url + '/content/frontend/findContentByCategory'; // 内容管理接口

    this.findContentDetailById_api = http_url.web_url + '/content/frontend/findContentDetailById'; // 内容详情展示
    this.findYXResearchReportDetailById_api = http_url.web_url + "/content/findYXResearchReportDetailById"; // 银杏研究报告详情
    this.queryRightsByLevel_api = http_url.web_url + '/content/findBenefitByLevel'; //用户权益查询
    this.findBannerGeneratorById_api = http_url.web_url + '/content/frontend/findBannerGeneratorById '; //根据idhuoqu banner信息
    this.findLatestContentByCategory_api = http_url.web_url + '/content/frontend/findLatestContentByCategory';

    /*-------------------内容相关 end ------------------------------*/


    /*-------------------私募相关  ------------------------------*/
    // this.prvDetail_api = http_url.web_url + '/pef/queryFundDetail'; //私募详情查询
    this.prvLevel_api = http_url.web_url + '/pef/queryBenefitLevel'; //受益级别查询
    this.prvHisValue_api = http_url.web_url + '/pef/queryHistoryNetValue'; //历史净值查询
    this.prvLight_api = http_url.web_url + '/pef/queryProductImage'; //产品亮点查询
    this.prvReource_api = http_url.web_url + '/pef/queryReourceList'; //产品材料接口
    this.recommend_api = http_url.web_url + '/pef/frontend/findRecommand'; //私募首页--产品推荐
    this.collect_info_api = http_url.web_url + '/pef/getRaiseInfo'; //查询产品募集信息
    this.JumpForSignElec_api = http_url.web_url + '/pef/JumpForSignElec'; //点击签署合同查看跳转页面
    this.queryProjectVedioList_api = http_url.web_url + '/pef/queryProjectVedioList'; //视频列表
    /*-------------------私募相关 end ------------------------------*/


    /*-------------------公募相关------------------------------*/
    this.query_api = http_url.web_url + '/pof/frontend/fund/query'; //热门诊断基金列表搜索
    this.queryFundDiagnosis_api = http_url.web_url + '/pof/frontend/fund/queryFundDiagnosis'; //热门诊断基金列表搜索-只查询非股票型和混合型基金
    this.pofTotalAssets_api = http_url.web_url + '/account/pof/totalAssets'; // 公募总资产
    this.fundNetWorthList_api = http_url.web_url + '/pof/fundDetails/frontend/fundNetWorthList'; //历史明细
    this.queryIncomeList_api = http_url.web_url + '/account/pof/queryIncomeList'; //收益明细

    this.cashQueryIncomeList_api = http_url.web_url + '/account/pof/cash/queryIncomeList'; //超宝收益明细
    this.pofAssessList_api = http_url.web_url + '/account/pof/pofAssessList'; //超宝收益明细
    
    //公募基金购买认证           
    this.queryCustomerAuthInfo_api = http_url.web_url +'/pof/buyFund/queryCustomerAuthInfo';
    /*-------------------公募相关 end ------------------------------*/


    /*-------------------营销相关  ------------------------------*/
    this.award_api = http_url.web_url + "/marketing/getAwardTimes"; // 抽奖次数查询
    this.getToken_api = http_url.web_url + "/marketing/getToken"; //获取唯一的token值
    this.getAwardRecords_api = http_url.web_url + "/marketing/getAwardRecords"; // 我的抽奖记录查询
    this.getDrawRecords_api = http_url.web_url + "/marketing/frontend/getDrawRecords"; // 抽奖流水接口查询
    this.draw_api = http_url.web_url + "/marketing/draw"; // 抽奖接口

    /*-------------------营销相关 end ------------------------------*/

    /*-------------------生活-会员俱乐部 ------------------------------*/
    this.getActivitiesList_api = http_url.web_url + '/marketing/frontend/getActivitiesList'; //会员俱乐部-活动列表
    this.getDetailActivity_api = http_url.web_url + '/marketing/frontend/getDetailActivity'; //会员俱乐部-活动详情
    this.activityApply_api = http_url.web_url + '/marketing/activityApply'; //会员俱乐部-立即报名
    this.shareInfo_api = http_url.web_url + '/marketing/frontend/shareInfo'; //会员俱乐部-分享给好友
    this.getContent_api = http_url.web_url + '/content/frontend/getContent'; //获取返回风测不符内容

    /*-------------------生活-会员俱乐部 end ------------------------------*/
    /*-------------------银杏研究相关 ------------------------------*/


    //成长值查询
    this.queryGrowthValue_api = http_url.web_url + '/account/queryGrowthValue';
    //成长值流水
    this.queryGrowthDetailList_api = http_url.web_url + '/account/queryGrowthDetailList';
    //成长值区间
    this.selectCustomerGrowthTier_api = http_url.web_url + '/account/selectCustomerGrowthTier';

    //登录日志查询接口
    this.getUserTrackRecord_api = http_url.web_url + '/account/getUserTrackRecord';

    //会员权益详情-获取会员权益详情
    this.findBenefitByLevel_api = http_url.web_url + '/content/findBenefitByLevel';
    //超宝---根据产品代码查询协议基本信息
    this.findProtocolBasic_api = http_url.web_url + '/content/findProtocolBasic';

    //文章模板接口
    //  this.getArticle_api = http_url.web_url + '/account/articleExample';
    this.getArticle_api = http_url.web_url + '/content/frontend/getArticle';
    //信息披露
    // 不加New的是 www-from格式的请求 ，加new的是json请求
    this.queryReourceLabels_api = http_url.web_url + '/pef/queryReourceLabels';
    this.queryReourceLabelsNew_api = http_url.web_url + '/pef/queryReourceLabelsNew';
    this.queryReourceList_api = http_url.web_url + '/pef/queryReourceList';
    this.queryReourceListNew_api = http_url.web_url + '/pef/queryReourceListNew';

    //修改分红方式接口
    this.updateDividend_api = http_url.web_url + '/pof/dividend/updateDividend';


    //监管账户（老接口）
    this.findSuperviseBank_api = http_url.web_url + '/content/frontend/findSuperviseBank';

    /*-------------------明星理财师开始 ------------------------------*/

    //明星理财师-列表
    this.queryFinancialer_api = http_url.web_url + '/account/home/frontend/queryFinancialer';

    /*-------------------明星理财师结束 ------------------------------*/
    //会员俱乐部-活动-城市定位列表-根据城市类型或者首字母获取城市list

    this.cityList_api = http_url.web_url + '/marketing/frontend/cityList';
    //我的奖励
    this.getPrizeInfo_api = http_url.web_url + "/account/myPrize/getPrizeInfo";
    //我的奖励查看详情
    this.getPrizeDetail_api = http_url.web_url + "/account/myPrize/getPrizeDetail";

    //明星理财师-活动-城市定位列表-根据城市类型或者首字母获取城市list
    this.cityListStar_api = http_url.web_url + '/account/brokerCity/frontend/queryBrokerCity';

    //会员俱乐部-活动列表-获取城市定位
    this.getCity_api = http_url.web_url + '/marketing/frontend/getCity'
        //新增客户反馈
    this.insertFeedback_api = http_url.web_url + '/account/insertFeedback'
        //上传图片
    this.upload_api = http_url.web_url + '/content/file/upYun/upload'


    /*------------------- 私募 start ------------------------------*/
    //私募历史明细
    this.curveHistoryList_api = http_url.web_url + '/account/positions/curveHistoryList';
    this.yieldAssignList_api = http_url.web_url + '/account/positions/yieldAssignList';
    this.dealDetailList_api = http_url.web_url + '/account/positions/dealDetailList';

    //产品档案
    this.productRecord_api = http_url.web_url + '/account/positions/productRecord';
    //公募交易明细
    this.queryTradeApplyByCode_api = http_url.web_url + '/account/pof/queryTradeApplyByCode'; //热门诊断基金列表搜索
    // 超宝详情页面--现金宝资产总览查询
    this.getTotalAssetsCash_api = http_url.web_url + '/account/pof/cash/getTotalAssetsCash';
    // 超宝详情页面--现金宝
    this.getAssetsCashInfo_api = http_url.web_url + '/account/pof/cash/getAssetsCashInfo';
    this.getCheckInterviewRisk = http_url.web_url + '/account/positions/checkInterviewRisk';
    /*------------------- 消息中心 end ------------------------------*/

    this.assetsDetail_api = http_url.web_url + '/account/positions/assetsDetail'; // 资产详情
    this.earningCurve_api = http_url.web_url + '/account/positions/earningCurve'; // 收益走势
    this.queryHistoryNetValue_api = http_url.web_url + '/account/positions/queryHistoryNetValue'; // 净值走势

    /*------------------- 私募 end ------------------------------*/


    /*------------------- 消息中心 start ------------------------------*/

    // 消息中心
    this.getNoticeTypeList_api = http_url.web_url + '/account/account/getNoticeTypeList';

    // 通知消息列表
    this.systemNotificationList_api = http_url.web_url + '/account/account/systemNotificationList';
    // 非通知消息列表

    // 消息列表
    this.noticeAndTransDynamicList_api = http_url.web_url + '/account/account/noticeAndTransDynamicList';
    // 消息详情
    this.getNoticeAndTransDynamic_api = http_url.web_url + '/account/account/getNoticeAndTransDynamic';
    //查询单条文章(APPCMS后台)
    this.getArticle_api = http_url.web_url + '/content/frontend/getArticle';
    //查询了解恒天配置信息
    this.queryHtInformation_api = http_url.web_url + '/account/home/frontend/queryHtInformation';

    /*------------------- 消息中心 end ------------------------------*/


    /*------------------- 月度报告 start ------------------------------*/

    // 月度报告
    this.queryMonthlyReport_api = http_url.web_url + '/account/queryMonthlyReport';
    //  持仓总览
    this.queryInvestProdHoldShareList_api = http_url.web_url + '/account/report/queryInvestProdHoldShareList';
    // 交易明细
    this.queryInvestTradeDetail_api = http_url.web_url + '/account/report/queryInvestTradeDetail';
    // 当前资产配置列表
    this.queryInvestAssetAnalyse_api = http_url.web_url + '/account/report/queryInvestAssetAnalyse';
    // 建议资产配置列表
    this.queryInvestAssetConfigureAdvise_api = http_url.web_url + '/account/report/queryInvestAssetConfigureAdvise';
    // 报告分析（报告明细）
    this.queryInvestReportDetail_api = http_url.web_url + '/account/report/queryInvestReportDetail';

    // 立即咨询
    this.reportContactNow_api = http_url.web_url + '/account/report/reportContactNow';

    // 我的理财师查询
    this.queryMyFinancialerList_api = http_url.web_url + '/account/home/queryMyFinancialerList'

    /*------------------- 月度报告 end ------------------------------*/


    // 超宝基金产品-交易记录
    this.queryTradeList_api = http_url.web_url + '/account/pof/cash/queryTradeList';

    // 公募交易列表查询
    this.tradeList_api = http_url.web_url + '/account/pof/tradeList';

    // 公募普通产品银行卡列表
    this.normalPofList_api = http_url.web_url + '/account/bankCard/normalPofList';

    // 现金宝公募普通产品银行卡列表
    this.cashList_api = http_url.web_url + '/account/bankCard/cashList';

    /*------------------- 基金确认书 start ------------------------------*/
    this.downloadFile_api = http_url.web_url + '/content/file/mount/download'; //下载pdf
    this.sendMailForConfirmBill_api = http_url.web_url + '/account/positions/sendMailForConfirmBill'; //下载pdf


    /*------------------- 月度报告 end ------------------------------*/

    /*------------------- 私募理财fang——le start ------------------------------*/
    this.protocolList_api = http_url.web_url + '/pof/fixedInvestment/protocol/list'; //金服WEB-定投交易- 我的定投协议列表

    // wiki地址 http://192.168.6.105:8090/pages/viewpage.action?pageId=9470018
    this.pofToBuy_api = http_url.web_url + '/pof/buyFund/toBuy'; // 1.金服WEB-下单-进入下单页面
    this.pofCheckPayType_api = http_url.web_url + '/pof/buyFund/checkPayType'; // 2.金服WEB-下单-校验支付方式
    this.pofPayment_api = http_url.web_url + '/pof/buyFund/payment'; // 3.金服WEB-下单-支付操作

    this.pofCashList_api = http_url.web_url + '/pof/cash/frontend/getcashfundlist'; // 4.金服WEB-获取现金宝列表
    this.pofCashToBuy_api = http_url.web_url + '/pof/cash/doCashTreasureToBuy'; // 5.金服WEB-恒添宝-购买页面
    this.pofCashBuy_api = http_url.web_url + '/pof/cash/doCashTreasureBuy'; // 6.金服WEB-恒添宝-支付操作
    this.pofCashSell_api = http_url.web_url + '/pof/cash/doCashTreasureSell'; // 7.金服WEB-恒添宝-转出操作
    this.pofCashDetail_api = http_url.web_url + '/pof/cash/getCashTreasureDetail'; // 8.金服WEB-恒添宝-交易详情查询
    this.pofCashLimit_api = http_url.web_url + '/pof/cash/frontend/getCashTreasureLimitInfo'; // 9.金服WEB-现金宝-现金宝限额信息查询


    this.pofFixedList_api = http_url.web_url + '/pof/fixedInvestment/rank/frontend/list'; // 10.金服WEB-定投-定投排行列表
    this.pofFixedSign_api = http_url.web_url + '/pof/fixedInvestment/sign'; // 11.金服WEB-定投-定投协议签署
    this.pofFixedDetail_api = http_url.web_url + '/pof/fixedInvestment/protocol/detail'; // 12.金服WEB-定投-我的定投详情
    this.pofFixedDeductDay_api = http_url.web_url + '/pof/fixedInvestment/frontend/firstDeductDay'; // 13.金服WEB-定投-下次扣款日期
    this.pofFixedChange_api = http_url.web_url + '/pof/fixedInvestment/protocol/change'; // 14.金服WEB-定投-定投协议变更
    this.pofFixedLimit_api = http_url.web_url + '/pof/fixedInvestment/tradeLimitAmout'; // 15.金服WEB-定投-查询基金限额


    this.pofTradeApplyInfo_api = http_url.web_url + '/pof/myAssetInfo/tradeApplyInfo'; // 16.金服WEB-交易详情查询
    this.pofRedemptionPay_api = http_url.web_url + '/pof/redemptionPay/redemptionPay'; // 17.金服WEB–基金赎回
    this.pofShortRedeemInfo_api = http_url.web_url + '/pof/redemptionPay/shortRedeemInfo'; // 18.金服WEB-短期理财基金赎回详情
    this.pofUndoTradeApply_api = http_url.web_url + '/pof/undoTradeApply/undoTradeApply'; // 19.金服WEB-撤单
    this.pofProtocolList_api = http_url.web_url + '/pof/fixedInvestment/protocol/list'; // 20.金服WEB-定投交易- 我的定投协议列表
    this.pofQueryDividendByCode_api = http_url.web_url + '/pof/dividend/queryDividendByCode'; // 21.单只基金分红方式查询
    this.pofUpdateDividend_api = http_url.web_url + '/pof/dividend/updateDividend'; // 22.分红方式修改


    this.pofGetTotalAssetsCash_api = http_url.web_url + '/account/pof/cash/getTotalAssetsCash'; // 现金宝资产总览查询
    this.pofGetAssetsCashList_api = http_url.web_url + '/account/pof/cash/getAssetsCashList'; // 现金宝资产列表

    this.newfundDetails_api = http_url.web_url + '/pof/fundDetails/frontend/newfundDetails'; //金服WEB-基金详情
    this.fundMaterial_api = http_url.web_url + '/pof/fundArchives/frontend/fundMaterial'; //金服WEB-基金招募书

    // 产品类
    this.prfFundBasicProfile_api = http_url.web_url + '/pof/fundArchives/frontend/fundBasicProfile'; //1.金服WEB-详情页-基金基本概况查询
    this.prfFundManagerInfo_api = http_url.web_url + '/pof/fundArchives/frontend/fundManagerInfo'; //2.金服WEB-详情页-基金经理信息查询
    this.prfFundCompanyInfo_api = http_url.web_url + '/pof/fundArchives/frontend/fundCompanyInfo'; //3.金服WEB-详情页-基金公司信息查询
    this.prfFnvestmentPortfolio_api = http_url.web_url + '/pof/fundArchives/frontend/investmentPortfolio'; //4.金服WEB-详情页-基金投资组合信息查询
    this.prfFundNoticeList_api = http_url.web_url + '/pof/fundArchives/frontend/fundNoticeList'; //5.金服WEB-详情页-基金公告列表查询
    this.prfFundNoticeDetails_api = http_url.web_url + '/pof/fundArchives/frontend/fundNoticeDetails'; //6.金服WEB-详情页-基金公告详情查询
    this.prfFundQuery_api = http_url.web_url + '/pof/fund/frontend/query'; //7.金服WEB-基金大全-公募基金产品列表查询
    this.prfFundNetWorthTrendChart_api = http_url.web_url + '/pof/fundDetails/frontend/fundNetWorthTrendChart'; //8.金服WEB-详情页-基金净值走势图查询
    this.prfFundCollectionQuery_api = http_url.web_url + '/pof/fundCollection/query'; //9.金服WEB-自选基金-列表查询
    this.prfQueryNoLogin_api = http_url.web_url + '/pof/fundCollection/frontend/queryNoLogin'; //10.金服WEB-自选基金-列表查询（未登录状态）
    this.prfFundCollectionQueryCode_api = http_url.web_url + '/pof/fundCollection/frontend/queryCode'; //11.金服WEB-自选基金-代码查询
    this.prfFundCollectionMG_api = http_url.web_url + '/pof/fundCollection/manage'; //12.金服WEB-自选基金-收藏管理
    this.prfFundNetWorthList_api = http_url.web_url + '/pof/fundDetails/frontend/fundNetWorthList'; //13.金服WEB-基金历史净值-查询
    this.prfFundDividendList_api = http_url.web_url + '/pof/fundDetails/frontend/fundDividendList'; //14.金服WEB-基金分红信息-列表查询
    this.prfFundFeeRate_api = http_url.web_url + '/pof/fundFeeRate/frontend/query'; //15.金服WEB-定投费率-查询
    this.prfFundList_api = http_url.web_url + '/pof/newIssue/frontend/fundList'; //16.金服WEB-新发基金-列表查询
    this.prfQuerynewsletter_api = http_url.web_url + '/pof/fundnewsletter/frontend/querynewsletter'; //17.金服WEB-基金时讯-查询
    this.queryFundTransferAssetsDetail_api = http_url.web_url + '/account/queryFundTransferAssetsDetail'; // 金服WEB-基金时支付列表
    this.collectFund_api = http_url.web_url + '/pof/fundCollection/frontend/collectFund'; // 自选基金-收藏管理（


    /*------------------- 私募理财fang——le end ------------------------------*/
    /*------------------- 财富学院 start ------------------------------*/
    this.queryBanner_api = http_url.web_url + '/account/home/frontend/queryBanner'; //财富首页banner
    this.queryFortuneCollegeFir_api = http_url.web_url + '/account/home/frontend/queryFortuneCollegeFir'; //财富翻译官/早知道

    this.getFortuneTabInfo_api = http_url.web_url + '/account/home/frontend/getFortuneTabInfo'; // 财富讲堂/财富研究 页签查询
    this.queryFortuneArticleList_api = http_url.web_url + '/account/home/frontend/queryFortuneArticleList'; // 财富文章列表

    //已报名活动
    this.getApplyActivity_api = http_url.web_url + '/marketing/activity/getApplyActivity';
    this.queryFortuneCollegeSec_api = http_url.web_url + '/account/home/frontend/queryFortuneCollegeSec'; //财富讲堂/财富研究/市场活动
    this.queryFortuneArticleList_api = http_url.web_url + '/account/home/frontend/queryFortuneArticleList'; //财富文章列表

    /*------------------------------------ 私募接口文档 start -------------------------------------*/
    // 产品详情接口
    this.queryFundDetailV2_api = http_url.web_url + '/pef/queryFundDetailV2';
    // 查询客户预约产品所需条件
    this.conditionsOfOrder_api = http_url.web_url + '/pef/conditionsOfOrder';
    // 查询产品募集信息
    this.getRaiseInfo_api = http_url.web_url + '/pef/getRaiseInfo';
    // 根据标签号查询产品材料
    this.queryReourceListByLabel_api = http_url.web_url + '/pef/queryReourceListByLabel';
    // 查询产品亮点
    this.queryProductImage_api = http_url.web_url + '/pef/queryProductImage';
    // 意见认证和开户弹框
    this.popReal_api = http_url.web_url + '/mine/views/popReal.html';


    /*------------------------------------ 私募接口文档 end -------------------------------------*/


    // 查看已签署文档
    this.querySignedContract_api = http_url.web_url + '/pef/querySignedContract';

    //yan
    this.findMessageCenterById_api = http_url.web_url + '/content/frontend/findMessageCenterById'; //证监会要求查看详情

    this.queryTransferFunds_api = http_url.web_url + '/account/queryTransferFunds'; // 查询基金列表
    this.newfundDetailList_api = http_url.web_url + '/pof/fundDetails/frontend/newfundDetailList'; //基金年化查询
    this.redemptionPay_api = http_url.web_url + '/pof/redemptionPay/redemptionPay'; //赎回确认
    this.findProtocolBasic_api = http_url.web_url + '/content/findProtocolBasic'; //进入基金转出页面调用
    this.cashList_api = http_url.web_url + '/account/bankCard/cashList'; //查询银行卡转出
    this.findProtocolContent_api = http_url.web_url + '/content/frontend/findProtocolContent'; //转出协议查询
    this.doCashTreasureSell_api = http_url.web_url + '/pof/cash/doCashTreasureSell'
    this.getCashTreasureLimitInfo_api = http_url.web_url + '/pof/cash/forntend/getCashTreasureLimitInfo' //转出份额限定 单日等
    this.findProtocolContentRule_api = http_url.web_url + '/content/frontend/findProtocolContent'; //转出规则查询

    this.queryFundTransferAssets_api = http_url.web_url + '/account/queryFundTransferAssets'; //查询活期理财列表
    this.checkVideoDoctor_api = http_url.web_url + '/account/checkVideoDoctor'; //查询用户是否满足视频医生条件
    this.messageCertSend_api = http_url.web_url + '/account/frontend/messageCertSend'; //发送短信验证码
    this.voiceMsgVerify_api = http_url.web_url + '/account/frontend/voiceMsgVerify'; //发送语音验证码
    this.phoneCodeCheckout_api = http_url.web_url + '/account/frontend/phoneCodeCheckout'; //验证手机验证码

};