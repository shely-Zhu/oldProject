/**
 * wap项目页面路径和evtList对应表
 *
 * 金服wap&app可用
 */


var clickList = {
	

	//'private_btn_deal': { evtid: '0', topic: '页面加载', info: ''} ,


	// 'load' : {type:'load', evtid:0,  topic:'页面加载', info: '页面加载' },
	// 'beforeunload' : {type:'beforeunload', evtid:1,  topic:'页面离开', info: '页面离开' },

	// 'register_btn_register': {type:'click', evtid:2,  topic:'注册页面-注册按钮点击', info: '' },
	// 'login_btn_login': {type:'click', evtid:3,  topic:'登录页面-登录按钮点击', info: '' },
	
	// 'index_btn_myaccount': {type:'click', evtid:4,  topic:'首页-我的账户按钮点击', info: '' },
	// 'index_btn_banner': {type:'click', evtid:5,  topic:'首页-banner点击', info: '' },
	// 'index_btn_about': {type:'click', evtid:6,  topic:'首页-关于恒天-左侧悬浮框按钮点击', info: '' },
	// 'index_btn_news': {type:'click', evtid:7,  topic:'首页-恒天新闻-左侧悬浮框按钮点击', info: '' },
	// 'index_btn_vip': {type:'click', evtid:8,  topic:'首页-会员尊享-左侧悬浮框按钮点击', info: '' },
	// 'index_btn_partner': {type:'click', evtid:9,  topic:'合作伙伴按钮点击', info: '首页-合作伙伴-左侧悬浮框按钮点击' },
	// 'index_btn_orderFinancialPlanner': {type:'click', evtid:10,  topic:'预约理财师按钮点击', info: '首页-预约理财师-右侧悬浮框按钮点击' },
	// 'index_btn_newGuidelines': {type:'click', evtid:11,  topic:'新手指引按钮点击', info: '首页-新手指引-右侧悬浮框按钮点击' },
	// 'index_btn_onlineCustomerService': {type:'click', evtid:12,  topic:'在线客服按钮点击', info: '首页-在线客服-右侧悬浮框按钮点击' },
	// 'index_btn_APP': {type:'click', evtid:13,  topic:'APP按钮点击', info: '首页-APP-右侧悬浮框按钮点击' },
	// 'index_btn_magazine': {type:'click', evtid:14,  topic:'恒天期刊按钮点击', info: '首页-恒天期刊-右侧悬浮框按钮点击' },
	
	// 'index_nav_intoHt': {type:'click', evtid:15,  topic:'走进恒天按钮点击', info: '首页-走进恒天-导航一级菜单按钮点击' },
	// 'index_nav_introduceCompany': {type:'click', evtid:16,  topic:'公司介绍按钮点击', info: '首页-公司介绍-导航二级菜单按钮点击' },
	// 'index_nav_manageTeam': {type:'click', evtid:17,  topic:'管理团队按钮点击', info: '首页-管理团队-导航二级菜单按钮点击' },
	// 'index_nav_introduceShareholder': {type:'click', evtid:18,  topic:'股东介绍按钮点击', info: '首页-股东介绍-导航二级菜单按钮点击' },
	// 'index_nav_speech': {type:'click', evtid:19,  topic:'董事长致辞点击', info: '首页-董事长致辞-导航二级菜单按钮点击' },
	// 'index_nav_culture': {type:'click', evtid:20,  topic:'企业文化按钮点击', info: '首页-企业文化-导航二级菜单按钮点击' },
	// 'index_nav_honor': {type:'click', evtid:21,  topic:'荣誉体系按钮点击', info: '首页-荣誉体系-导航二级菜单按钮点击' },
	// 'index_nav_riskManage': {type:'click', evtid:22,  topic:'风险管理按钮点击', info: '首页-风险管理-导航二级菜单按钮点击' },
	// 'index_nav_notice': {type:'click', evtid:23,  topic:'恒天公告按钮点击', info: '首页-恒天公告-导航二级菜单按钮点击' },
	// 'index_nav_news': {type:'click', evtid:24,  topic:'恒天新闻按钮点击', info: '首页-恒天新闻-导航二级菜单按钮点击' },
	
	// 'index_nav_wealthManagement': {type:'click', evtid:25,  topic:'财富管理按钮点击', info: '首页-财富管理-导航一级菜单按钮点击' },
	// 'index_nav_privateInvestment': {type:'click', evtid:26,  topic:'私募投资按钮点击', info: '首页-私募投资-导航二级菜单按钮点击' },
	// 'index_nav_publicFinancial': {type:'click', evtid:27,  topic:'公募理财按钮点击', info: '首页-公募理财-导航二级菜单按钮点击' },
	// 'index_nav_familyOffice': {type:'click', evtid:28,  topic:'家族办公室按钮点击', info: '首页-家族办公室-导航二级菜单按钮点击' },
	// 'index_nav_assetAllocation': {type:'click', evtid:29,  topic:'资产配置按钮点击', info: '首页-资产配置-导航二级菜单按钮点击' },
	// 'index_nav_manageAllocation': {type:'click', evtid:30,  topic:'资产管理按钮点击', info: '首页-资产管理-导航一级菜单按钮点击' },
	// 'index_nav_bondInvestment': {type:'click', evtid:31,  topic:'债券投资按钮点击', info: '首页-债权投资-导航二级菜单按钮点击' },
	// 'index_nav_securityInvestment': {type:'click', evtid:32,  topic:'证券投资按钮点击', info: '首页-证券投资-导航二级菜单按钮点击' },
	// 'index_nav_realty': {type:'click', evtid:33,  topic:'房地产基金按钮点击', info: '首页-房地产基金-导航二级菜单按钮点击' },

	// 'index_nav_overseasInvestment': {type:'click', evtid:34,  topic:'海外投资按钮点击', info: '首页-海外投资-导航二级菜单按钮点击' },//官网未找到
	// 'index_nav_college': {type:'click', evtid:35,  topic:'恒天大学按钮点击', info: '首页-恒天大学-导航一级菜单按钮点击' },
	// 'index_nav_financialTraning': {type:'click', evtid:36,  topic:'理财师培养按钮点击', info: '首页-理财师培养-导航二级菜单按钮点击' },
	// 'index_nav_investorEducation': {type:'click', evtid:37,  topic:'投资者教育按钮点击', info: '首页-投资者教育-导航二级菜单按钮点击' },
	// 'index_nav_gingko': {type:'click', evtid:38,  topic:'银杏研究按钮点击', info: '首页-银杏研究-导航一级菜单按钮点击' },
	// 'index_nav_vip': {type:'click', evtid:39,  topic:'会员尊享按钮点击', info: '首页-会员尊享-导航一级菜单按钮点击' },
	// 'index_nav_activity': {type:'click', evtid:40,  topic:'会员活动按钮点击', info: '首页-会员活动-导航二级菜单按钮点击' },
	// 'index_nav_mall': {type:'click', evtid:41,  topic:'恒乐汇商城按钮点击', info: '首页-恒乐汇商城-导航二级菜单按钮点击' },
	// 'index_nav_businessFinance': {type:'click', evtid:42,  topic:'企业金融按钮点击', info: '首页-企业金融-导航二级菜单按钮点击' },
	// 'index_pageAction_toInvest': {type:'click', evtid:43,  topic:'财富管理按钮点击', info: '首页-财富管理-立即投资-页面功能按钮点击' },
	// 'index_pageAction_manageAllocationMore': {type:'click', evtid:44,  topic:'资产管理按钮点击', info: '首页-资产管理-查看更多-页面功能按钮点击' },
	// 'index_pageAction_collegeMore': {type:'click', evtid:45,  topic:'恒天大学按钮点击', info: '首页-恒天大学-查看更多-页面功能按钮点击' },
	// 'index_footer_helpCenter': {type:'click', evtid:46,  topic:'帮助中心按钮点击', info: '首页-帮助中心-页尾菜单按钮点击' },
	// 'index_footer_copyrightNotice': {type:'click', evtid:47,  topic:'版权声明按钮点击', info: '首页-版权声明-页尾菜单按钮点击' },
	// 'index_footer_contractUs': {type:'click', evtid:48,  topic:'联系我们按钮点击', info: '首页-联系我们-页尾菜单按钮点击' },
	// 'index_footer_joinUs': {type:'click', evtid:49,  topic:'加入我们按钮点击', info: '首页-加入我们-页尾菜单按钮点击' },
	// 'index_footer_complaintChannel': {type:'click', evtid:50,  topic:'客户投诉渠道按钮点击', info: '首页-客户投诉渠道-页尾菜单按钮点击' },
	
	// 'privateList_search': {type:'click', evtid:51,  topic:'搜索按钮点击', info: '私募列表页-搜索按钮点击' },
	// 'privateList_menu_bondInvestment': {type:'click', evtid:52,  topic:'债券投资菜单点击', info: '私募列表页-产品分类菜单' },
	// 'privateList_menu_equityInvestment': {type:'click', evtid:53,  topic:'股权投资菜单点击', info: '私募列表页-产品分类菜单' },
	// 'privateList_menu_secondaryMarket': {type:'click', evtid:54,  topic:'二级市场菜单点击', info: '私募列表页-产品分类菜单' },
	// 'privateList_menu_overseasInvestment': {type:'click', evtid:55,  topic:'海外投资菜单点击', info: '私募列表页-产品分类菜单' },//官网未找到
	// 'privateList_menu_elseService': {type:'click', evtid:56,  topic:'其他服务菜单点击', info: '私募列表页-产品分类菜单' },
	// 'privateList_menu_productTransformation': {type:'click', evtid:57,  topic:'转让产品菜单点击', info: '私募列表页-产品分类菜单' },
	
	// 'privateInfo_tab_productLightspot': {type:'click', evtid:60,  topic:'产品亮点tab点击', info: '私募详情页-tab' },
	// 'privateInfo_tab_historicalPerformance': {type:'click', evtid:61,  topic:'历史业绩tab点击', info: '私募详情页-tab' },
	// 'privateInfo_tab_riskDisclosure': {type:'click', evtid:62,  topic:'风险揭示书tab点击', info: '私募详情页-tab' },
	// 'privateInfo_tab_productInfo': {type:'click', evtid:63,  topic:'产品信息tab点击', info: '私募详情页-tab' },
	// 'privateInfo_btn_riskDisclosure': {type:'click', evtid:64,  topic:'风险揭示书按钮点击', info: '私募详情页-pdf文件' },
	// 'privateInfo_menu_contactFinancial': {type:'click', evtid:65,  topic:'联系我的理财师按钮点击', info: '私募详情页-功能按钮' },
	// 'privateInfo_menu_toOrder': {type:'click', evtid:66,  topic:'我要预约按钮点击', info: '私募详情页-功能按钮' },
	
	
	// 'public_btn_myAccount': {type:'click', evtid:72,  topic:'我的账户按钮点击', info: '公募页面-用户页-我的账户按钮点击' },
	// 'public_btn_safeOut': {type:'click', evtid:73,  topic:'安全退出按钮点击', info: '公募页面-用户页-安全退出按钮点击' },
	// 'public_btn_myAccount': {type:'click', evtid:74,  topic:'去测评按钮点击', info: '公募页面-用户页-去测评按钮点击' },
	// 'public_btn_browsingHistory': {type:'click', evtid:75,  topic:'浏览记录按钮点击', info: '公募页面-用户页-浏览记录按钮点击' },
	// 'public_btn_myChoice': {type:'click', evtid:76,  topic:'我的自选按钮点击', info: '公募页面-用户页-我的自选按钮点击' },
	// 'public_btn_search': {type:'click', evtid:79,  topic:'搜索按钮点击', info: '公募页面-产品列表-搜索按钮点击' },
	
	// 'privateProcess_btn_notification': {type:'click', evtid:80,  topic:'私募基金风险揭示书及售前告知书', info: '私募交易流程-普通投资者弹框提示' },
	// 'privateProcess_btn_agree': {type:'click', evtid:81,  topic:'我同意按钮点击', info: '私募交易流程-普通投资者弹框提示按钮' },
	// 'privateProcess_btn_disagree': {type:'click', evtid:82,  topic:'我不同意按钮点击', info: '私募交易流程-普通投资者弹框提示按钮' },
	// 'privateProcess_btn_addBankcard': {type:'click', evtid:83,  topic:'添加银行卡', info: '私募交易流程-添加银行卡' },
	// 'privateProcess_btn_addSure': {type:'click', evtid:84,  topic:'确定添卡', info: '私募交易流程-确定添卡按钮' },
	// 'privateProcess_btn_pre': {type:'click', evtid:85,  topic:'上一步', info: '私募交易流程-额度预约-上一步弹框提示按钮' },
	// 'privateProcess_btn_orderSure': {type:'click', evtid:86,  topic:'确认预约按钮点击', info: '私募交易流程-确认预约按钮点击' },
	
	// 'privateProcess_btn_refer': {type:'click', evtid:87,  topic:'提交', info: '私募交易流程-合格投资者' },
	// 'privateProcess_btn_reupload': {type:'click', evtid:88,  topic:'重新上传', info: '私募交易流程-合格投资者' },
	// 'privateProcess_btn_orderDetail': {type:'click', evtid:89,  topic:'预约明细', info: '私募交易流程-合格投资者' },
	
	// 'privateProcess_btn_seeContract': {type:'click', evtid:90,  topic:'查看合同', info: '私募交易流程-电子合同页面' },
	// 'privateProcess_btn_seeRiskbook': {type:'click', evtid:91,  topic:'查看风险揭示书', info: '私募交易流程-电子合同页面' },
	// 'privateProcess_btn_seeOrderdetail': {type:'click', evtid:92,  topic:'查看预约明细', info: '私募交易流程-电子合同页面' },
	// 'privateProcess_btn_seeSignContract': {type:'click', evtid:93,  topic:'查看签署合同', info: '私募交易流程-电子合同页面' },
	
	// 'privateProcess_btn_seeOrderdetail': {type:'click', evtid:94,  topic:'确认', info: '私募交易流程-身份验证页面' },
	// 'privateProcess_btn_cancel': {type:'click', evtid:95,  topic:'取消', info: '私募交易流程-身份验证页面' },
	// 'privateProcess_btn_upploadVoucher': {type:'click', evtid:96,  topic:'上传汇款凭证', info: '私募交易流程-转账汇款页面' },
	// 'privateProcess_btn_banName': {type:'click', evtid:97,  topic:'银行名称', info: '私募交易流程-转账汇款页面' },
	// 'privateProcess_btn_uploadSure': {type:'click', evtid:98,  topic:'确认上传', info: '私募交易流程-上传汇款凭证页面' },
	
	// 'myAccount_icon_bindPhone': {type:'click', evtid:99,  topic:'绑定手机', info: '我的账户-左侧菜单图标' },
	// 'myAccount_icon_approveName': {type:'click', evtid:100,  topic:'实名认证', info: '我的账户-左侧菜单图标' },
	// 'myAccount_icon_evaluateRisk': {type:'click', evtid:101,  topic:'风险评测', info: '我的账户-左侧菜单图标' },
	// 'myAccount_icon_qualifiedSure': {type:'click', evtid:102,  topic:'合格投资者确认', info: '我的账户-左侧菜单图标' },
	// 'myAccount_menu_bindPhone': {type:'click', evtid:103,  topic:'我的总资产', info: '我的账户-左侧菜单' },
	// 'myAccount_menu_privateProperty': {type:'click', evtid:104,  topic:'私募投资资产', info: '我的账户-左侧一级菜单' },
	// 'myAccount_menu_propertyDetailPri': {type:'click', evtid:105,  topic:'持仓明细', info: '我的账户-左侧私募投资二级菜单' },
	// 'myAccount_menu_shareTransfer': {type:'click', evtid:106,  topic:'份额转让', info: '我的账户-左侧私募投资二级菜单' },
	// 'myAccount_menu_orderDetail': {type:'click', evtid:107,  topic:'预约明细', info: '我的账户-左侧私募投资二级菜单' },
	// 'myAccount_menu_transactionDetailPri': {type:'click', evtid:108,  topic:'交易明细', info: '我的账户-左侧私募投资二级菜单' },
	// 'myAccount_menu_redemptionDetail': {type:'click', evtid:109,  topic:'赎回明细', info: '我的账户-左侧私募投资二级菜单' },
	// 'myAccount_menu_qualifiedInvestor': {type:'click', evtid:110,  topic:'合格投资者', info: '我的账户-左侧私募投资二级菜单' },
	// 'myAccount_menu_publicProperty': {type:'click', evtid:111,  topic:'公募投资资产', info: '我的账户-左侧一级菜单' },
	// 'myAccount_menu_optionalFund': {type:'click', evtid:113,  topic:'自选基金', info: '我的账户-左侧公募投资二级菜单' },
	// 'myAccount_menu_propertyDetailPub': {type:'click', evtid:114,  topic:'持仓明细', info: '我的账户-左侧公募投资二级菜单' },
	// 'myAccount_menu_myInvestment': {type:'click', evtid:115,  topic:'我的定投', info: '我的账户-左侧公募投资二级菜单' },
	// 'myAccount_menu_transactionDetailPub': {type:'click', evtid:116,  topic:'交易明细', info: '我的账户-左侧公募投资二级菜单' },
	// 'myAccount_menu_assetsPortfolio': {type:'click', evtid:117,  topic:'组合投资资产', info: '我的账户-左侧一级菜单' },
	// 'myAccount_menu_propertyDetailAss': {type:'click', evtid:118,  topic:'持仓明细', info: '我的账户-左侧公募投资二级菜单' },
	// 'myAccount_menu_transactionDetailAss': {type:'click', evtid:119,  topic:'交易明细', info: '我的账户-左侧公募投资二级菜单' },
	// 'myAccount_menu_evaluateRisk': {type:'click', evtid:120,  topic:'风险评测', info: '我的账户-左侧一级菜单' },
	// 'myAccount_menu_classifyInvestor': {type:'click', evtid:121,  topic:'投资者分类', info: '我的账户-左侧一级菜单' },
	// 'myAccount_menu_myIntegration': {type:'click', evtid:122,  topic:'我的积分', info: '我的账户-左侧一级菜单' },
	// 'myAccount_menu_myNotice': {type:'click', evtid:123,  topic:'我的消息', info: '我的账户-左侧一级菜单' },
	// 'myAccount_menu_myFinancialPlanner': {type:'click', evtid:124,  topic:'我的理财师', info: '我的账户-左侧一级菜单' },
	// 'myAccount_menu_recommend': {type:'click', evtid:125,  topic:'推荐有礼', info: '我的账户-左侧一级菜单' },
	// 'myAccount_menu_manageAccount': {type:'click', evtid:126,  topic:'账户管理', info: '我的账户-左侧一级菜单' }, 
	
	"register_btn_register" : { type:'click', evtid: '0', topic: '注册页面-注册按钮点击', info: ''} ,
	"privateIndex_supermarket" : { type:'click', evtid: '1', topic: '私募首页-私募超市', info: ''} ,
	"privateIndex_feature" : { type:'click', evtid: '2', topic: '私募首页-恒天特色', info: ''} ,
	"privateIndex_recommend" : { type:'click', evtid: '3', topic: '私募首页-精品推荐', info: '' } ,
	"privateIndex_guessLike" : { type:'click', evtid: '4', topic: '私募首页-猜你喜欢', info: '' } ,
	"privateIndex_hotSpot" : { type:'click', evtid: '5', topic: '私募首页-热门私募', info: ''} ,
	"privateList_detail" : { type:'click', evtid: '6', topic: '私募列表页-产品详情', info: ''} ,
	/*************************************************************mine文件夹下******************************************************************************************/ 
	//已报名活动
	"activityEnrolment_01" : { type:'click', evtid: '', topic: '已报名活动-tab切换', info: ''} ,
	"activityEnrolment_02" : { type:'click', evtid: '', topic: '已报名活动-分享给好友', info: ''} ,
	//意见反馈
	"concatUsAdvise_01" : { type:'click', evtid: '', topic: '意见反馈-单选按钮', info: ''} ,
	"concatUsAdvise_02" : { type:'click', evtid: '', topic: '意见反馈-添加图片', info: ''} ,
	"concatUsAdvise_03" : { type:'click', evtid: '', topic: '意见反馈-提交按钮', info: ''} ,
	//诊断详情
	"diagnosisDetail_01" :{ type:'click', evtid: '', topic: '诊断详情-雷达图', info: ''},
	"diagnosisDetail_02" :{ type:'click', evtid: '', topic: '诊断详情-折线图', info: ''},
	"diagnosisDetail_03" :{ type:'click', evtid: '', topic: '诊断详情-文案提示', info: ''},
	//基金诊断搜索
	"diagnosisSearch_01" :{ type:'click', evtid: '', topic: '基金诊断搜索-取消搜索按钮', info: ''},
	"diagnosisSearch_02" :{ type:'click', evtid: '', topic: '基金诊断搜索-li标签的事件委托', info: ''},
	//基金诊断
	"fundAccountDiagnosis_01":{ type:'click', evtid: '', topic: '基金诊断-li标签的事件委托', info: ''},
	//基金名称搜索
	"diagnosisSearch_01" : { type:'click', evtid: 'diagnosisSearch_01', topic: '查询基金', info: ''} ,
	"diagnosisSearch_02" : { type:'click', evtid: 'diagnosisSearch_02', topic: '跳转详情页', info: ''} ,
	"diagnosisSearch_03" : { type:'click', evtid: 'diagnosisSearch_03', topic: '获取专属报告', info: ''} ,
	//权益详情
	"detailsUnderstandingDetails_01" : { type:'click', evtid: 'detailsUnderstandingDetails_01', topic: '权益详情-了解详情', info: ''} ,
	//成长值记录
	"adolesceRecord_01" : { type:'click', evtid: 'adolesceRecord_01', topic: '成长值记录-规则说明', info: ''} ,
	//产品咨询
	"consultProduct_01" : { type:'click', evtid: 'consultProduct_01', topic: '产品咨询-提交按钮', info: ''} ,
	//月度报告详情页
	"monthReportDetail_01" : { type:'click', evtid: 'monthReportDetail_01', topic: '月度报告详情页-月末持仓总览本月交易明细tab', info: ''} ,
	"monthReportDetail_02" : { type:'click', evtid: 'monthReportDetail_02', topic: '月度报告详情页-立即投资按钮', info: ''} ,
	"monthReportDetail_03" : { type:'click', evtid: 'monthReportDetail_03', topic: '月度报告详情页-立即预约按钮', info: ''} ,
	"monthReportDetail_04" : { type:'click', evtid: 'monthReportDetail_04', topic: '月度报告详情页-立即咨询按钮', info: ''} ,
	"monthReportDetail_05" : { type:'click', evtid: 'monthReportDetail_05', topic: '月度报告详情页-立即购买按钮', info: ''} ,
	//月度报告列表页
	"monthReportList_01" : { type:'click', evtid: 'monthReportList_01', topic: '月度报告列表页-右箭头', info: ''} ,
	"monthReportList_02" : { type:'click', evtid: 'monthReportList_02', topic: '浏览商品', info: ''} ,
	//修改分红方式
	"bonusMethod_01" : { type:'click', evtid: 'bonusMethod_01', topic: '修改分红方式', info: ''} ,
	//历史明细（没按钮）
	//登录日志查询（没按钮）
	//公募监管账户
	"mineRegulatoryAccounts_01" : { type:'click', evtid: 'mineRegulatoryAccounts_01', topic: '公墓监管账户-复制', info: ''} ,
	"mineRegulatoryAccounts_02" : { type:'click', evtid: 'mineRegulatoryAccounts_02', topic: '公墓监管说明-打开', info: ''} ,
	"mineRegulatoryAccounts_03" : { type:'click', evtid: 'mineRegulatoryAccounts_03', topic: '公墓监管说明-隐藏', info: ''} ,
	//收益明细页面（没按钮）
	//我的奖励页面
	"rewards_01" : { type:'click', evtid: 'rewards_01', topic: '我的奖励-查看详情', info: ''} ,
	//交易明细
	"transactionDetails_01" : { type:'click', evtid: 'transactionDetails_01', topic: '交易明细-私募明细', info: ''} ,
	"transactionDetails_02" : { type:'click', evtid: 'transactionDetails_02', topic: '交易明细-公募自选', info: ''} ,
	"transactionDetails_03" : { type:'click', evtid: 'transactionDetails_03', topic: '交易明细-公募组合', info: ''} ,
	"transactionDetails_04" : { type:'click', evtid: 'transactionDetails_04', topic: '交易明细-公募智投', info: ''} ,
/**************************************************************mine文件夹结束*****************************************************************************************/ 
	
	//私募基金产品详情
 	"privatePlacementDetail_01" : { type:'click', evtid: 'privatePlacementDetail_01', topic: '私募基金产品详情-tab点击切换', info: ''} ,
	"privatePlacementDetail_02" : { type:'click', evtid: 'privatePlacementDetail_02', topic: '私募基金产品详情-折线图点击', info: ''} ,
	"privatePlacementDetail_03" : { type:'click', evtid: 'privatePlacementDetail_03', topic: '私募基金产品详情-信息的拷贝', info: ''} ,
	"privatePlacementDetail_04" : { type:'click', evtid: 'privatePlacementDetail_04', topic: '私募基金产品详情-立即预约', info: ''} ,
	//现金管理
	"cashManagement_01" : { type:'click', evtid: 'cashManagement_01', topic: '现金管理-了解现金管理', info: ''} ,
	"cashManagement_02" : { type:'click', evtid: 'cashManagement_02', topic: '现金管理-转入', info: ''} ,
	"cashManagement_03" : { type:'click', evtid: 'cashManagement_03', topic: '现金管理-转出', info: ''} ,
	//现金转入
	"cashTransformIn_01" : { type:'click', evtid: 'cashTransformIn_01', topic: '现金转入-打开银行卡列表', info: ''} ,
	"cashTransformIn_02" : { type:'click', evtid: 'cashTransformIn_02', topic: '现金转入-关闭银行卡列表', info: ''} ,
	"cashTransformIn_03" : { type:'click', evtid: 'cashTransformIn_03', topic: '现金转入-关闭银行卡列表', info: ''} ,
	"cashTransformIn_04" : { type:'click', evtid: 'cashTransformIn_04', topic: '现金转入-点击转出规则', info: ''} ,
	"cashTransformIn_05" : { type:'click', evtid: 'cashTransformIn_05', topic: '现金转入-清除输入框数字', info: ''} ,
	"cashTransformIn_06" : { type:'click', evtid: 'cashTransformIn_06', topic: '现金转入-选中银行卡', info: ''} ,
	"cashTransformIn_07" : { type:'click', evtid: 'cashTransformIn_07', topic: '现金转入-点击同意协议', info: ''} ,
	"cashTransformIn_08" : { type:'click', evtid: 'cashTransformIn_08', topic: '现金转入-确定', info: ''} ,
	"cashTransformIn_09" : { type:'click', evtid: 'cashTransformIn_09', topic: '现金转入-《公募基金风险揭示及售前告知书》', info: ''} ,
	"cashTransformIn_10" : { type:'click', evtid: 'cashTransformIn_10', topic: '现金转入-忘记密码', info: ''} ,
	"cashTransformIn_11" : { type:'click', evtid: 'cashTransformIn_11', topic: '现金转入-密码校验不通过---取消', info: ''} ,
	"cashTransformIn_12" : { type:'click', evtid: 'cashTransformIn_12', topic: '现金转入-密码校验不通过---忘记密码', info: ''} ,
	"cashTransformIn_13" : { type:'click', evtid: 'cashTransformIn_13', topic: '现金转入-密码校验不通过---重新输入', info: ''} ,
	"cashTransformIn_14" : { type:'click', evtid: 'cashTransformIn_14', topic: '现金转入-密码校验不通过---找回密码', info: ''} ,
	"cashTransformIn_15" : { type:'click', evtid: 'cashTransformIn_15', topic: '现金转入-密码校验不通过---重新输入', info: ''} ,
	"cashTransformIn_16" : { type:'click', evtid: 'cashTransformIn_16', topic: '现金转入-添加银行卡--跳往原生', info: ''} ,
	//现金转出
	"cashTransformOut_01" : { type:'click', evtid: 'cashTransformOut_01', topic: '现金转出-打开银行卡列表', info: ''} ,
	"cashTransformOut_02" : { type:'click', evtid: 'cashTransformOut_02', topic: '现金转出-关闭银行卡列表', info: ''} ,
	"cashTransformOut_03" : { type:'click', evtid: 'cashTransformOut_03', topic: '现金转出-关闭银行卡列表', info: ''} ,
	"cashTransformOut_04" : { type:'click', evtid: 'cashTransformOut_04', topic: '现金转出-银行卡单选', info: ''} ,
	"cashTransformOut_05" : { type:'click', evtid: 'cashTransformOut_05', topic: '现金转出-普通与快速切换', info: ''} ,
	"cashTransformOut_06" : { type:'click', evtid: 'cashTransformOut_06', topic: '现金转出-清除输入框数字', info: ''} ,
	"cashTransformOut_07" : { type:'click', evtid: 'cashTransformOut_07', topic: '现金转出-点击转出规则', info: ''} ,
	"cashTransformOut_08" : { type:'click', evtid: 'cashTransformOut_08', topic: '现金转出-点击同意协议', info: ''} ,
	"cashTransformOut_09" : { type:'click', evtid: 'cashTransformOut_09', topic: '现金转出-赎回确认', info: ''} ,
	"cashTransformOut_10" : { type:'click', evtid: 'cashTransformOut_10', topic: '现金转出-点击其他总资产明白了', info: ''} ,
	"cashTransformOut_11" : { type:'click', evtid: 'cashTransformOut_11', topic: '现金转出-转出全部', info: ''} ,
	"cashTransformOut_12" : { type:'click', evtid: 'cashTransformOut_12', topic: '现金转出-转出金额清零', info: ''} ,
	//我的定投_定投详情
	"castSurelyDetails_01" : { type:'click', evtid: 'castSurelyDetails_01', topic: '现金转出-跳转详情', info: ''} ,
	"castSurelyDetails_02" : { type:'click', evtid: 'castSurelyDetails_02', topic: '现金转出-修改', info: ''} ,
	"castSurelyDetails_03" : { type:'click', evtid: 'castSurelyDetails_03', topic: '现金转出-终止 暂停 续投', info: ''} ,
	//基金档案
	"fundFile_01" : { type:'click', evtid: 'fundFile_01', topic: '基金档案-tab点击切换', info: ''} ,
	"fundFile_02" : { type:'click', evtid: 'fundFile_02', topic: '基金档案-基金公告跳转', info: ''} ,
	//产品档案
	"fundFile_01" : { type:'click', evtid: 'fundFile_01', topic: '基金档案-tab点击切换', info: ''} ,
	"fundFile_02" : { type:'click', evtid: 'fundFile_02', topic: '基金档案-基金公告跳转', info: ''} ,
	//现金管理 -- 转入
	"fundTransformIn_01" : { type:'click', evtid: 'fundTransformIn_01', topic: '现金转入-打开银行卡列表', info: ''} ,
	"fundTransformIn_02" : { type:'click', evtid: 'fundTransformIn_02', topic: '现金转入-关闭银行卡列表', info: ''} ,
	"fundTransformIn_03" : { type:'click', evtid: 'fundTransformIn_03', topic: '现金转入-关闭银行卡列表', info: ''} ,
	"fundTransformIn_04" : { type:'click', evtid: 'fundTransformIn_04', topic: '现金转入-点击转出规则', info: ''} ,
	"fundTransformIn_05" : { type:'click', evtid: 'fundTransformIn_05', topic: '现金转入-清除输入框数字', info: ''} ,
	"fundTransformIn_06" : { type:'click', evtid: 'fundTransformIn_06', topic: '现金转入-选中银行卡', info: ''} ,
	"fundTransformIn_07" : { type:'click', evtid: 'fundTransformIn_07', topic: '现金转入-点击同意协议', info: ''} ,
	"fundTransformIn_08" : { type:'click', evtid: 'fundTransformIn_08', topic: '现金转入-确定', info: ''} ,
	"fundTransformIn_09" : { type:'click', evtid: 'fundTransformIn_09', topic: '现金转入-《公募基金风险揭示及售前告知书》', info: ''} ,
	"fundTransformIn_10" : { type:'click', evtid: 'fundTransformIn_10', topic: '现金转入-忘记密码', info: ''} ,
	"fundTransformIn_11" : { type:'click', evtid: 'fundTransformIn_11', topic: '现金转入-密码校验不通过---取消', info: ''} ,
	"fundTransformIn_12" : { type:'click', evtid: 'fundTransformIn_12', topic: '现金转入-密码校验不通过---忘记密码', info: ''} ,
	"fundTransformIn_13" : { type:'click', evtid: 'fundTransformIn_13', topic: '现金转入-密码校验不通过---重新输入', info: ''} ,
	"fundTransformIn_14" : { type:'click', evtid: 'fundTransformIn_14', topic: '现金转入-密码校验不通过---找回密码', info: ''} ,
	"fundTransformIn_15" : { type:'click', evtid: 'fundTransformIn_15', topic: '现金转入-密码校验不通过---重新输入', info: ''} ,
	"fundTransformIn_16" : { type:'click', evtid: 'fundTransformIn_16', topic: '现金转入-添加银行卡--跳往原生', info: ''} ,
	//我的定投计划
	"myInvestmentPlan_01" : { type:'click', evtid: 'myInvestmentPlan_01', topic: '基金档案-新增 跳原生定投排行页', info: ''} ,
	"myInvestmentPlan_02" : { type:'click', evtid: 'myInvestmentPlan_02', topic: '基金档案-跳转详情页', info: ''} ,
	//定投
	"ordinarySetThrow_01" : { type:'click', evtid: 'ordinarySetThrow_01', topic: '定投-打开银行卡列表', info: ''} ,
	"ordinarySetThrow_02" : { type:'click', evtid: 'ordinarySetThrow_02', topic: '定投-关闭银行卡列表', info: ''} ,
	"ordinarySetThrow_03" : { type:'click', evtid: 'ordinarySetThrow_03', topic: '定投-关闭银行卡列表', info: ''} ,
	"ordinarySetThrow_04" : { type:'click', evtid: 'ordinarySetThrow_04', topic: '定投-点击转出规则', info: ''} ,
	"ordinarySetThrow_05" : { type:'click', evtid: 'ordinarySetThrow_05', topic: '定投-清除输入框数字', info: ''} ,
	"ordinarySetThrow_06" : { type:'click', evtid: 'ordinarySetThrow_06', topic: '定投-选中银行卡', info: ''} ,
	"ordinarySetThrow_07" : { type:'click', evtid: 'ordinarySetThrow_07', topic: '定投-点击同意协议', info: ''} ,
	"ordinarySetThrow_08" : { type:'click', evtid: 'ordinarySetThrow_08', topic: '定投-确定', info: ''} ,
	"ordinarySetThrow_09" : { type:'click', evtid: 'ordinarySetThrow_09', topic: '定投-《公募基金风险揭示及售前告知书》', info: ''} ,
	"ordinarySetThrow_10" : { type:'click', evtid: 'ordinarySetThrow_10', topic: '定投-忘记密码', info: ''} ,
	"ordinarySetThrow_11" : { type:'click', evtid: 'ordinarySetThrow_11', topic: '定投-密码校验不通过---取消', info: ''} ,
	"ordinarySetThrow_12" : { type:'click', evtid: 'ordinarySetThrow_12', topic: '定投-密码校验不通过---忘记密码', info: ''} ,
	"ordinarySetThrow_13" : { type:'click', evtid: 'ordinarySetThrow_13', topic: '定投-密码校验不通过---重新输入', info: ''} ,
	"ordinarySetThrow_14" : { type:'click', evtid: 'ordinarySetThrow_14', topic: '定投-密码校验不通过---找回密码', info: ''} ,
	"ordinarySetThrow_15" : { type:'click', evtid: 'ordinarySetThrow_15', topic: '定投-密码校验不通过---重新输入', info: ''} ,
	"ordinarySetThrow_16" : { type:'click', evtid: 'ordinarySetThrow_16', topic: '定投-添加银行卡--跳往原生', info: ''} ,
	"ordinarySetThrow_17" : { type:'click', evtid: 'ordinarySetThrow_17', topic: '定投-周期选择', info: ''} ,
	//赎回
	"redemptionBuy_01" : { type:'click', evtid: 'redemptionBuy_01', topic: '赎回-打开银行卡列表', info: ''} ,
	"redemptionBuy_02" : { type:'click', evtid: 'redemptionBuy_02', topic: '赎回-关闭银行卡列表', info: ''} ,
	"redemptionBuy_03" : { type:'click', evtid: 'redemptionBuy_03', topic: '赎回-关闭银行卡列表', info: ''} ,
	"redemptionBuy_04" : { type:'click', evtid: 'redemptionBuy_04', topic: '赎回-查看详情', info: ''} ,
	"redemptionBuy_05" : { type:'click', evtid: 'redemptionBuy_05', topic: '赎回-银行卡与基金形成单选', info: ''} ,
	"redemptionBuy_06" : { type:'click', evtid: 'redemptionBuy_06', topic: '赎回-点击全部，初始化最大赎回额度', info: ''} ,
	"redemptionBuy_07" : { type:'click', evtid: 'redemptionBuy_07', topic: '赎回-交易规则', info: ''} ,
	"redemptionBuy_08" : { type:'click', evtid: 'redemptionBuy_08', topic: '赎回-赎回确认', info: ''} ,
	"redemptionBuy_09" : { type:'click', evtid: 'redemptionBuy_09', topic: '赎回-点击同意协议', info: ''} ,
	//定投结果
	"surelyResults_01" : { type:'click', evtid: 'surelyResults_01', topic: '定投结果-跳往现金宝管理页面', info: ''} ,
	//买入结果
	"surelyResultsDetail_01" : { type:'click', evtid: 'surelyResultsDetail_01', topic: '买入结果-跳往持仓列表页', info: ''} ,


	//homePage--------------------------------------------------------------分割线
	//fortuneCollegeList.html
	// "banner" : { type:'click', evtid: '', topic: '轮播图图片', info: ''} ,
	// "slider" : { type:'click', evtid: '', topic: '轮播图小圆点', info: ''} ,
	"fortune_00" : { type:'click', evtid: 'fortune_00', topic: '查看往期热词', info: ''} ,
	"fortune_01" : { type:'click', evtid: 'fortune_01', topic: '播放往期内容', info: ''} ,
	"fortune_02" : { type:'click', evtid: 'fortune_02', topic: '播放往期内容列表', info: ''} ,
	"fortune_03" : { type:'click', evtid: 'fortune_03', topic: '财富讲堂全部', info: ''} ,
	"fortune_04" : { type:'click', evtid: 'fortune_04', topic: '财富讲堂tab', info: ''} ,
	"fortune_05" : { type:'click', evtid: 'fortune_05', topic: '财富讲堂全部列表', info: ''} ,
	"fortune_06" : { type:'click', evtid: 'fortune_06', topic: '财富研究', info: ''} ,
	"fortune_07" : { type:'click', evtid: 'fortune_07', topic: '财富研究列表', info: ''} ,
	"fortune_08" : { type:'click', evtid: 'fortune_08', topic: '财富研究tab', info: ''} ,
	//fortuneFlowKnown.html
	"fortune_09" : { type:'click', evtid: 'fortune_09', topic: '早知道列表', info: ''} ,
	//fortuneClassroom.html
	"fortune_10" : { type:'click', evtid: 'fortune_10', topic: '财富讲堂列表', info: ''} ,
	"fortune_11" : { type:'click', evtid: 'fortune_11', topic: '财富讲堂详情tab', info: ''},
	//wealthResearch.html
	"fortune_12":{ type:'click', evtid: 'fortune_12', topic: '财富研究详情tab', info: ''} ,
	//understandHT.html
	"understandTab_00":{ type:'click', evtid: 'understandTab_00', topic: '了解恒天tab', info: ''} ,
	//noticeCenter.html
	"notice_00":{ type:'click', evtid: 'notice_00', topic: '消息中心', info: ''} ,
	//systemInforms.html
	"notice_01":{ type:'click', evtid: 'notice_01', topic: '系统通知', info: ''}, 
	//starFinancialPlannerList.html
	"starFinancia_00":{ type:'click', evtid: 'starFinancia_00', topic: '城市定位', info: ''} ,
	"starFinancia_01":{ type:'click', evtid: 'starFinancia_01', topic: '热门城市', info: ''} ,
	"starFinancia_02":{ type:'click', evtid: 'starFinancia_02', topic: '返回', info: ''} ,
	"starFinancia_03":{ type:'click', evtid: 'starFinancia_03', topic: '城市索引', info: ''} ,
	"starFinancia_04":{ type:'click', evtid: 'starFinancia_04', topic: '理财师列表', info: ''} ,
	// "starFinancia_search":{ type:'click', evtid: '', topic: '理财师查询', info: ''} ,
	"starFinancia_05":{ type:'click', evtid: 'starFinancia_05', topic: '取消搜索', info: ''} ,
	"starFinancia_06":{ type:'click', evtid: 'starFinancia_06', topic: '点击搜索框触发选中', info: ''} ,

	/************************************** account start *************************************************/
	//publicTradeDetail.hrml
	"publicTradeDetail_0": { type:'click', evtid: 'publicTradeDetail_0', topic: '交易记录_再买一笔', info: ''},
	"publicTradeDetail_1": { type:'click', evtid: 'publicTradeDetail_1', topic: '交易记录_去撤单', info: ''},
	"publicTradeDetail_2": { type:'click', evtid: 'publicTradeDetail_2', topic: '交易记录_买入产品', info: ''},
	"publicTradeDetail_3": { type:'click', evtid: 'publicTradeDetail_3', topic: '交易记录_定投计划', info: ''},
	// informationDisclosure.html
	"informationDisclosure_0":{ type:'click', evtid: 'informationDisclosure_0', topic: '信息披露', info: ''},
	// productFiles.html
	"productFiles_0":{ type:'click', evtid: 'productFiles_0', topic: '产品档案_展开', info: ''},
	"productFiles_1":{ type:'click', evtid: 'productFiles_1', topic: '产品档案_推荐材料', info: ''},
	// publicAssets.html
	"publicAssets_0":{ type:'click', evtid: 'publicAssets_0', topic: '公募资产_交易记录', info: ''},
	"publicAssets_1":{ type:'click', evtid: 'publicAssets_1', topic: '公募资产_普通基金持仓详情', info: ''},
	"publicAssets_2":{ type:'click', evtid: 'publicAssets_2', topic: '公募资产_现金宝持仓详情', info: ''},
	"publicAssets_3":{ type:'click', evtid: 'publicAssets_3', topic: '公募资产_交易明细', info: ''},
	"publicAssets_4":{ type:'click', evtid: 'publicAssets_4', topic: '公募资产_购买', info: ''},
	"publicAssets_5":{ type:'click', evtid: 'publicAssets_5', topic: '公募资产_赎回', info: ''},
	"publicAssets_6":{ type:'click', evtid: 'publicAssets_6', topic: '公募资产_文案提示', info: ''},
	"publicAssets_7":{ type:'click', evtid: 'publicAssets_7', topic: '公募资产_金额隐藏', info: ''},
	"publicAssets_8":{ type:'click', evtid: 'publicAssets_8', topic: '公募资产_资产组合说明', info: ''},
	"publicAssets_9":{ type:'click', evtid: 'publicAssets_9', topic: '公募资产_关闭资产组合说明', info: ''},
	"publicAssets_10":{ type:'click', evtid: 'publicAssets_10', topic: '公募资产_关闭资产组合说明', info: ''},



	/************************************** account end *************************************************/
}

module.exports = clickList;