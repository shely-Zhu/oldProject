/**
 * 跳转链接配置
 */



module.exports = function() {

    this.login_html_url = go_url.no_url + '/login';  //手动触发登录,需将redirectUrl值传回去
    this.logOut_html_url = go_url.no_url +'/logout.action';  //退出登录
    this.registerUrl = go_url.cft_url + '/user/views/register.html';  //注册页面

    // oauth登录页面地址
    this.oauth_url = go_url.oauth_url + '/user/views/toAuthLogin.html'; 

    //我的账户：
    this.myAccount_url = go_url.no_url + '/personal/views/myAccount.html';

    //设置页面
    this.mySetUp_url = go_url.no_url + '/user/views/setUp/setUp.html';

    //修改网站交易密码
    this.changeDealPassword_url = go_url.no_url + '/user/views/dealPassword/changeDealPassword.html';
    //忘记网站交易密码
    this.forgetDealPassword_url = go_url.no_url + '/user/views/dealPassword/forgetDealForm.html';

    //关于金服
    this.aboutJF_url = go_url.no_url + '/about/views/aboutJF.html';

    //公募开户（交易密码）
    this.realNameStepThree_url = go_url.no_url + '/user/views/realName/realNameStepThree.html';
    //实名认证第二步，填写验证码
    this.realNameStepTwo_url = go_url.no_url + '/user/views/realName/realNameStepTwo.html';
    //实名认证第一步
    this.realNameStepOne_url = go_url.no_url + '/user/views/realName/realNameStepOne.html';
    //实名认证结果
    this.realNameResult_url = go_url.no_url + '/user/views/realName/realNameResult.html';
    //实名认证第4步
    this.realNameStepFour_url = go_url.no_url + '/user/views/realName/realNameStepFour.html';

    //重新设置手机号码
    this.resetLinkPhone_url = go_url.no_url + '/user/views/setUp/resetLinkPhone.html';
    //重新设置登录密码
    this.resetLoginPassword_url = go_url.no_url + '/user/views/setUp/resetLoginPassword.html';
    //找回密码
    this.findpwd_url = go_url.cft_url + '/user/views/setUp/resetLoginPassword.html';
    // 登录页面上的重置密码，点击后的手机验证页面-wap单点登录后，重置密码放在股份上
    this.phoneVerify_url = go_url.cft_url + '/user/views/forgetLoginPassword/phoneVerify.html';
    // 忘记密码上的重置密码页面
    this.resetPassword_url = go_url.cft_url + '/user/views/forgetLoginPassword/resetPassword.html';

    //协议模板
    this.agreementModel_url = go_url.no_url + '/include/views/agreementModel.html';

    //首页
    this.index_url = go_url.no_url + '/index/views/index.html';

    //公募产品列表
    this.gmProduct_url = go_url.no_url + '/productPublic/views/publicList.html';
    //私募产品列表
    this.prdPrvLists_url = go_url.no_url + '/productPrivate/views/prdPrvLists.html';
    // 私募产品预约页面
    this.prdPrvSure_url = go_url.no_url + '/productPrivate/views/prdPrvSure.html';

    //私募资产页面
    this.smMyAsset_url = go_url.no_url + '/personal/views/myAsset.html';
    //公墓资产+中融货币E页面
    this.payThemeCash_url = go_url.no_url + '/pay/views/payThemeCash.html';

     //标普配置页面
     this.assetAllocation_url = go_url.no_url + '/personal/views/assetAllocation.html';

    //我的
    this.mine_url = go_url.no_url + '/personal/views/accountMerge.html';

    //申请详情
    this.payDetail_html_url = go_url.no_url + '/pay/views/payDetails.html';

    //监管账户
    this.regulatoryAccounts_url = go_url.no_url + '/personal/views/regulatoryAccounts.html';

    //私募个人风险测评
    this.questionnairePer_url = go_url.no_url + '/personal/views/questionnaire.html?type=per';
    //私募机构风险测评
    this.questionnaireOrg_url = go_url.no_url + '/personal/views/questionnaire.html?type=org';
    //风险测评结果页
    this.riskResult_url = go_url.no_url + '/personal/views/risk.html';
    //风险测评提示页面
    this.riskTip_url = go_url.no_url + '/personal/views/riskTip.html';

    //公募产品详情
    this.productPublicDetail_url = go_url.no_url + '/productPublic/views/productDetail.html';

    //公募产品分享链接 需要拼接要分享的fundCode
    this.productPublicShare_url = go_url.wap_url + '/productPublic/views/productDetail.html?fundCode=';

    //私募产品详情
    this.productPrvDetail_url = go_url.no_url + '/productPrivate/views/prdPrvDetails.html';
    //猜你喜欢产品推荐
    this.prvIndex_url = go_url.no_url + '/productPrivate/views/prvIndex.html';
    //猜你喜欢产品推荐
    this.prvRec_url = go_url.no_url + '/productPrivate/views/prvRecom.html';
    //私募基金搜索页面
    this.prvSearch_url = go_url.no_url + '/productPrivate/views/search.html';


    //我的积分
    this.myPots_url = go_url.no_url + '/personal/views/myPots.html';
    //我的-风险测评
    this.riskAssessment_url = go_url.no_url + '/personal/views/riskAssessment.html';
    //我的理财师
    this.plannerSearch_url = go_url.no_url + '/planner/views/plannerSearch.html';

    //我的-理财师
    this.plannerIndex_url = go_url.no_url + '/planner/views/plannerIndex.html';
    //我的-银行卡列表页
    this.bankCard_url = go_url.no_url + '/personal/views/bankCard.html';
    //我的银行卡详情页
    this.cardsDetail_url = go_url.no_url + '/personal/views/bankcardDetail.html';

    //基金购买须知
    this.payNotice_url = go_url.no_url + '/productPublic/views/payNotice.html';
    //历史净值页面
    this.oldIncome_url = go_url.no_url + '/productPublic/views/oldIncome.html';
    //基金档案页面
    this.fundFile_url = go_url.no_url + '/productPublic/views/fundFile.html';
    //基金公司

    //基金公告详情
    this.notice_url = go_url.no_url + '/productPublic/views/notice.html';

    //购买基金1/2
    this.payFundStepOne_url = go_url.no_url + '/pay/views/payFundStepOne.html';

    //中融货币E
    //总资产详情页
    this.totalAssets_url = go_url.no_url + '/cashTreasure/views/totalAssets.html';
    //交易明细列表页
    this.tradeList_url = go_url.no_url + '/cashTreasure/views/tradeList.html';
    //转入转出详情页
    this.tradeDetail_url = go_url.no_url + '/cashTreasure/views/tradeDetail.html';
    //转入转出页面
    this.treasureTrade_url = go_url.no_url + '/cashTreasure/views/treasureTrade.html';
    //中融货币E产品的协议页面
    this.cashXml_url = go_url.no_url + '/cashTreasure/views/cashXml.html';

    //实名认证下的三个协议
    this.tradeserviceAgreement_url = go_url.no_url + '/include/views/agreementModel.html?id=81';
    this.investorinterests_url = go_url.no_url + '/include/views/agreementModel.html?id=82';
    this.bankAuthorization_url = go_url.no_url + '/include/views/agreementModel.html?id=83';

    /*----------------------------------------投资者分类 start----------------------------------*/
    //分类页面
    this.classification_url = go_url.wap_url + '/compliance/views/classification.html';
    //认证结果页面
    this.certificationResult_url = go_url.wap_url + '/compliance/views/certificationResult.html';
    //上传页面
    this.uploadMaterial_url = go_url.wap_url + '/compliance/views/uploadMaterial.html';
    // 资料模板页
    this.referanceMaterial_url = go_url.wap_url + '/compliance/views/referanceMaterial.html';
    /*----------------------------------------投资者分类 end----------------------------------*/

    this.offlineReview_url = go_url.no_url + '/compliance/views/offlineReview.html';

    //机构基本信息
    this.orgBass_url = go_url.no_url + '/user/views/bassMessage/bassOrg.html';
    //个人基本信息
    this.perBass_url = go_url.no_url + '/user/views/bassMessage/bassPer.html';
    //产品机构基本信息
    this.pdBass_url = go_url.no_url + '/user/views/bassMessage/bassOrgPd.html';
    

    

    //老带新
    // 老带新二维码页面--股份和明泽离得推荐有礼都跳转明泽
    this.recommend_url = go_url.wap_url + '/recommend/views/recommend.html';
    // 分享页面
    this.newRecommend_url = window.location.origin.replace('h5', 'wap') + '/recommend/views/newRecommend.html';
    // 老带新注册页面
    this.recommendRegister_url = go_url.no_url + '/user/views/recommendRegister.html';
    // 恭喜页面
    this.congratulation_url = go_url.no_url + '/recommend/views/congratulation.html';


    //恒乐汇
    this.club_url = go_url.no_url + '/club/views/club.html';
    this.activitiesList_url = go_url.no_url + '/club/views/activitiesList.html';
    this.activityDetail_url = go_url.no_url + '/club/views/activityDetail.html';
    this.entery_url = go_url.no_url + '/club/views/entery.html';
    this.club_wap_url = go_url.wap_url + '/club/views/club.html';
    this.club_leaguerList_url = go_url.wap_url + '/club/views/leaguerList.html';
    this.club_member_url = go_url.wap_url + '/club/views/member.html';
    this.club_leaguerDetail_url = go_url.wap_url + '/club/views/leaguerDetail.html';

    //恒天财富
    this.homePage_url = go_url.no_url + '/mobilePage/views/homePage.html';
    this.about_com_intro = go_url.wm_url + '/website-app/about_com_intro.do?type=1';  //公司介绍
    this.about_honor = go_url.wm_url + '/website-app/about_honor.do';  //荣誉奖项
    this.about_com_intro_2 = go_url.wm_url + '/website-app/about_com_intro.do?type=2';  //股东介绍
    this.about_manage_team = go_url.wm_url + '/website-app/about_manage_team.do';  //管理团队
    this.about_com_intro_3 = go_url.wm_url + '/website-app/about_com_intro.do?type=3';  //董事长致辞
    this.about_com_intro_4 = go_url.wm_url + '/website-app/about_com_intro.do?type=4';  //企业文化
    this.htcf_chnl_media_news_1 = go_url.wm_url + '/website-app/htcf_chnl_media_news.do?ind=01';  //公司新闻
    this.htcf_chnl_media_news_5 = go_url.wm_url + '/website-app/htcf_chnl_media_news.do?ind=05';  //公司公告
    this.business_2 = go_url.wm_url + '/website-app/business.do?kind=2';  //资产管理
    this.business_1 = go_url.wm_url + '/website-app/business.do?kind=1';  //财富管理
    this.business_5 = go_url.wm_url + '/website-app/business.do?kind=5';  //教育服务
    this.risk_controll_sys = go_url.wm_url + '/website-app/risk_controll_sys.do';  //风控体系
    this.chtfund_url = go_url.wap_url;  //恒天金服
    this.rock_url = go_url.rock_url;  //恒天资管
    this.institute_1 = go_url.wm_url + '/website-app/htcf_chnl_institute_news.do?ind=1';  //研究观点
    this.institute_2 = go_url.wm_url + '/website-app/htcf_chnl_institute_news.do?ind=2';  //研究团队
	this.contactUs = go_url.wm_url + '/website-app/recruit.do';  //加入我们
	this.copyIntro = go_url.wm_url + '/website-app/a_copyright.do';  //版权声明
	
	//恒天明泽在恒天财富中的链接
	this.htcf_paytheme_url = go_url.wap_url + '/pay/views/payThemeCash.html';
	this.htcf_asset_url = go_url.wap_url + '/personal/views/myAsset.html';
	this.htcf_accountMerge_url = go_url.wap_url + '/personal/views/accountMerge.html';
	this.htcf_riskMent_url  = go_url.wap_url + '/personal/views/riskAssessment.html';
	this.htcf_publicList_url = go_url.wap_url + '/productPublic/views/publicList.html';
    this.htcf_prvIndex_url = go_url.wap_url + '/productPrivate/views/prvIndex.html';
	
	//恒天中岩及明泽的风控体系---PC配置
	this.cathayrock_url = "http://www.cathayrock.com";
	this.rongzeAsset_url = "http://www.rongzeasset.com";
	
	//恒天明泽跳转恒天财富的首页
    this.cft_index_url = go_url.cft_url + '/mobilePage/views/homePage.html';
    //理财师  ---由明泽域名下放到财富域名下
    this.cft_plannerSearch_url = go_url.cft_url + '/planner/views/plannerSearch.html';

    //新客专享产品立即邀请跳转连接
	this.newcomer_url = 'http://tg.chtwm.com/app04/gift.html';

    // 预约明细
    this.orderDetail_url = go_url.no_url + '/personal/views/orderDetail.html';

    // 投资者测试
    // 私募投资者测试
    this.questionnaireInvest_url = go_url.no_url + '/personal/views/questionnaire.html';
    //举贤荐才的推荐页
    this.recruit_url = go_url.no_url + '/about/views/recruitIndex.html';

    /*-------------------------------财商教育start-----------------------*/
    // 落地页
    this.landingPageUrl = go_url.no_url + '/financialEducation/views/landingPage.html';
    // 推广页
    this.guidePageUrl = go_url.no_url + '/financialEducation/views/guidePage.html';
    // 成长计划详情页
    this.growthPlanUrl = go_url.no_url + '/financialEducation/views/growthPlan.html';
    // 创建成长计划页
    this.createPlanUrl = go_url.no_url + '/financialEducation/views/createPlan.html';
    /*-------------------------------财商教育end-------------------------*/

    // 基民教育活动专题
    this.baseResult_url = go_url.no_url + '/about/views/baseEducation/baseResult.html';

    //中秋活动专题
    this.AutumnIndex_url = go_url.no_url + '/about/views/midAutumn/AutumnIndex.html';  //主会场
    this.privateActivity_url = go_url.no_url + '/about/views/midAutumn/privateActivity.html';  //私募会场
    this.publicActivityOne_url = go_url.no_url + '/about/views/midAutumn/publicActivityOne.html';  //公募会场 第一页
//我的明细
    this.myDetail_url = go_url.no_url + '/personal/views/myDetail.html';

    /*-------------------------------恒小智 start -----------------------*/
    // 交易结果 -- 赎回结果、买入结果
    this.transactionResult_url = go_url.no_url + '/intelligentInvestment/views/transactionResult.html';
    // 买入
    this.buyCombination_url = go_url.no_url + '/intelligentInvestment/views/buyCombination.html';
    // 我的组合
    this.myCombination_url = go_url.no_url + '/intelligentInvestment/views/myCombination.html';  
    //恒小智方案制定失败页面
    this.programFail_url = go_url.no_url + '/intelligentInvestment/views/programFail.html';
    //智能组合详情页
    this.combinationDetails_url = go_url.no_url + '/intelligentInvestment/views/combinationDetails.html';
    //资产赎回/买入详情
    this.assetBuyAndRedemptionDetails_url = go_url.no_url + '/intelligentInvestment/views/assetBuyAndRedemptionDetails.html';
    //赎回/买入详情
    this.buyAndRedemptionDetails_url = go_url.no_url + '/intelligentInvestment/views/buyAndRedemptionDetails.html';
    // 收益明细
    this.incomeDetail_url = go_url.no_url + '/intelligentInvestment/views/incomeDetail.html';
    // 交易记录
    this.transactionList_url = go_url.no_url + '/intelligentInvestment/views/transactionList.html';
    // 赎回页面
    this.redemption_url = go_url.no_url + '/intelligentInvestment/views/redemption.html';
    // 调仓历史页面
    this.adjustmentRecord_url = go_url.no_url + '/intelligentInvestment/views/adjustmentRecord.html';
    // 一键调仓页面
    this.adjustment_url = go_url.no_url + '/intelligentInvestment/views/adjustment.html';
    /*-------------------------------恒小智 end -----------------------*/


    // 在线客服-第三方地址
    this.onlineCustomer_url = go_url.onlineCustomer_url+'/webchat/jsp/standard/interfacePools.jsp?queue=106&device=mobile';
    // 在线客服中转页
    this.onlineCustomerTransfer_url = go_url.cft_url+ '/allServerResources/include/views/onlineCustomer.html';
    // app中私募首页，视频直播跳转路径
    this.videoPlay_url = go_url.no_url + '/productPrivate/views/videoPlay.html';

    // 私募售前告知书
    this.openPdf_url = go_url.no_url + '/productPrivate/views/openPdf.html';
    // 协议模板页
    this.openPdf_url = go_url.no_url + '/allServerResources/model/views/superContent.html';



    /*-------------------------------基金诊断 start -----------------------*/
    // 热门诊断
    this.hotDiagnosis_url = go_url.no_url + '/commonResources/fundDiagnosis/views/hotDiagnosis_url.html';
    // 诊断搜索页面
    this.diagnosisSearch_url = go_url.no_url + '/commonResources/fundDiagnosis/views/diagnosisSearch.html';
    // 诊断详情页
    this.diagnosisDetail_url = go_url.no_url + '/commonResources/fundDiagnosis/views/diagnosisDetail.html';
    /*-------------------------------基金诊断 end -----------------------*/

    // 营销活动
    this.marketCampaign_url = go_url.marketCampaign_url;
};