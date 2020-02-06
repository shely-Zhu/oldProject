/**
 * wap项目页面路径和evtList对应表
 *
 * 金服wap&app可用
 */


var clickList = {
	
	"register_btn_register" : { type:'click', evtid: '0', topic: '注册页面-注册按钮点击', info: ''} ,
	"privateIndex_supermarket" : { type:'click', evtid: '1', topic: '私募首页-私募超市', info: ''} ,
	"privateIndex_feature" : { type:'click', evtid: '2', topic: '私募首页-恒天特色', info: ''} ,
	"privateIndex_recommend" : { type:'click', evtid: '3', topic: '私募首页-精品推荐', info: '' } ,
	"privateIndex_guessLike" : { type:'click', evtid: '4', topic: '私募首页-猜你喜欢', info: '' } ,
	"privateIndex_hotSpot" : { type:'click', evtid: '5', topic: '私募首页-热门私募', info: ''} ,
	"privateList_detail" : { type:'click', evtid: '6', topic: '私募列表页-产品详情', info: ''} ,
	/***********************************************************mine文件夹下***************************************************************/ 
	//已报名活动
	"activityEnrolment_01" : { type:'click', evtid: 'activityEnrolment_01', topic: '已报名活动-tab切换', info: ''} ,
	"activityEnrolment_02" : { type:'click', evtid: 'activityEnrolment_02', topic: '已报名活动-分享给好友', info: ''} ,
	"activityEnrolment_03" : { type:'click', evtid: 'activityEnrolment_03', topic: '已报名活动-跳转详情', info: ''} ,
	//意见反馈
	"concatUsAdvise_01" : { type:'click', evtid: 'concatUsAdvise_01', topic: '意见反馈-单选按钮', info: ''} ,
	"concatUsAdvise_02" : { type:'click', evtid: 'concatUsAdvise_02', topic: '意见反馈-添加图片', info: ''} ,
	"concatUsAdvise_03" : { type:'click', evtid: 'concatUsAdvise_03', topic: '意见反馈-提交按钮', info: ''} ,
	//诊断详情
	"diagnosisDetail_01" :{ type:'click', evtid: 'diagnosisDetail_01', topic: '诊断详情-雷达图', info: ''},
	"diagnosisDetail_02" :{ type:'click', evtid: 'diagnosisDetail_02', topic: '诊断详情-折线图', info: ''},
	"diagnosisDetail_03" :{ type:'click', evtid: 'diagnosisDetail_03', topic: '诊断详情-文案提示', info: ''},
	"diagnosisDetail_04" :{ type:'click', evtid: 'diagnosisDetail_04', topic: '提示_我知道了', info: ''},
	//基金诊断搜索
	"diagnosisSearch_01" :{ type:'click', evtid: 'diagnosisSearch_01', topic: '基金诊断搜索-取消搜索按钮', info: ''},
	"diagnosisSearch_02" :{ type:'click', evtid: 'diagnosisSearch_02', topic: '基金诊断搜索-li标签的事件委托', info: ''},
	//基金诊断
	"fundAccountDiagnosis_01":{ type:'click', evtid: 'fundAccountDiagnosis_01', topic: '基金诊断-展开持仓按钮', info: ''},
	"fundAccountDiagnosis_02":{ type:'click', evtid: 'fundAccountDiagnosis_02', topic: '基金诊断-获取专属报告按钮', info: ''},
	"fundAccountDiagnosis_03":{ type:'click', evtid: 'fundAccountDiagnosis_03', topic: '基金诊断-单个认证按钮', info: ''},
	"fundAccountDiagnosis_04":{ type:'click', evtid: 'fundAccountDiagnosis_04', topic: '基金诊断-一键认证按钮', info: ''},
	"fundAccountDiagnosis_05":{ type:'click', evtid: 'fundAccountDiagnosis_05', topic: '基金诊断-隐藏一键认证按钮', info: ''},
	"fundAccountDiagnosis_06":{ type:'click', evtid: 'fundAccountDiagnosis_06', topic: '基金诊断-无持仓跳转理财首页按钮', info: ''},
	"fundAccountDiagnosis_07":{ type:'click', evtid: 'fundAccountDiagnosis_07', topic: '基金诊断-无持仓情况下获取专属报告按钮', info: ''},
	"fundAccountDiagnosis_08":{ type:'click', evtid: 'fundAccountDiagnosis_08', topic: '基金诊断-明白按钮', info: ''},
	"fundAccountDiagnosis_09":{ type:'click', evtid: 'fundAccountDiagnosis_09', topic: '基金诊断-失败', info: ''},
	//基金账户诊断 --添加/编辑申请
	"fundAccountDiagnosisResult_01":{ type:'click', evtid: 'fundAccountDiagnosisResult_01', topic: '账户诊断-添加其他基金时,购买时间事件', info: ''},
	"fundAccountDiagnosisResult_02":{ type:'click', evtid: 'fundAccountDiagnosisResult_02', topic: '账户诊断-添加其他基金时,确定按钮', info: ''},
	"fundAccountDiagnosisResult_03":{ type:'click', evtid: 'fundAccountDiagnosisResult_03', topic: '账户诊断-添加其他基金时,取消按钮', info: ''},
	"fundAccountDiagnosisResult_04":{ type:'click', evtid: 'fundAccountDiagnosisResult_04', topic: '账户诊断-选择左箭头按钮事件', info: ''},
	"fundAccountDiagnosisResult_05":{ type:'click', evtid: 'fundAccountDiagnosisResult_05', topic: '账户诊断-预期年化收益率/可承受最大回撤 弹框的确定按钮事件', info: ''},
	"fundAccountDiagnosisResult_06":{ type:'click', evtid: 'fundAccountDiagnosisResult_06', topic: '账户诊断-预期年化收益率/可承受最大回撤 弹框的取消按钮事件', info: ''},
	"fundAccountDiagnosisResult_07":{ type:'click', evtid: 'fundAccountDiagnosisResult_07', topic: '', info: '新增其他基金的删除按钮'},
    "fundAccountDiagnosisResult_08":{ type:'click', evtid: 'fundAccountDiagnosisResult_08', topic: '', info: '新增其他基金的添加按钮'},
	"fundAccountDiagnosisResult_09":{ type:'click', evtid: 'fundAccountDiagnosisResult_09', topic: '', info: '提交申请按钮'},
	"fundAccountDiagnosisResult_10":{ type:'click', evtid: 'fundAccountDiagnosisResult_10', topic: '', info: '跳转到申请历史页面按钮'},
	"fundAccountDiagnosisResult_11":{ type:'click', evtid: 'fundAccountDiagnosisResult_11', topic: '', info: '基金勾选事件'},

	
	// 添加已购买基金
	"addAccountDiagnosisResult_01": { type:'click', evtid: 'addAccountDiagnosisResult_01', topic: '添加已购买基金-购买日期选择', info: ''},
	"addAccountDiagnosisResult_02": { type:'click', evtid: 'addAccountDiagnosisResult_02', topic: '添加已购买基金-购买日期选择弹框取消按钮', info: ''},
	"addAccountDiagnosisResult_03": { type:'click', evtid: 'addAccountDiagnosisResult_03', topic: '添加已购买基金-确认添加按钮', info: ''},
	//基金名称搜索
	"hotDiagnosis_01" : { type:'click', evtid: 'hotDiagnosis_01', topic: '查询基金', info: ''} ,
	"hotDiagnosis_02" : { type:'click', evtid: 'hotDiagnosis_02', topic: '跳转详情页', info: ''} ,
	"hotDiagnosis_03" : { type:'click', evtid: 'hotDiagnosis_03', topic: '获取专属报告', info: ''} ,
	"hotDiagnosis_04" : { type:'click', evtid: 'hotDiagnosis_04', topic: '我知道了', info: ''} ,
	// 基金诊断提交申请
	"fundAccountDiagnosisResult_01": { type:'click', evtid: 'fundAccountDiagnosisResult_01', topic: '提交申请-性别选择', info: ''} ,
	"fundAccountDiagnosisResult_02": { type:'click', evtid: 'fundAccountDiagnosisResult_02', topic: '提交申请-弹框内容选择', info: ''} ,
	"fundAccountDiagnosisResult_03": { type:'click', evtid: 'fundAccountDiagnosisResult_03', topic: '提交申请-弹框确定选择', info: ''} ,
	"fundAccountDiagnosisResult_04": { type:'click', evtid: 'fundAccountDiagnosisResult_04', topic: '提交申请-弹框取消选择', info: ''} ,
	"fundAccountDiagnosisResult_05": { type:'click', evtid: 'fundAccountDiagnosisResult_05', topic: '提交申请-新增其他的清除按钮', info: ''} ,
	"fundAccountDiagnosisResult_06": { type:'click', evtid: 'fundAccountDiagnosisResult_06', topic: '提交申请-新增其他新建添加按钮', info: ''} ,
	"fundAccountDiagnosisResult_07": { type:'click', evtid: 'fundAccountDiagnosisResult_07', topic: '提交申请-提交申请', info: ''} ,
	"fundAccountDiagnosisResult_08": { type:'click', evtid: 'fundAccountDiagnosisResult_08', topic: '提交申请-基金勾选', info: ''} ,
	"fundAccountDiagnosisResult_09": { type:'click', evtid: 'fundAccountDiagnosisResult_09', topic: '提交申请-我知道了', info: ''} ,
	"fundAccountDiagnosisResult_10": { type:'click', evtid: 'fundAccountDiagnosisResult_10', topic: '编辑提交成功-我知道了', info: ''} ,
	
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
	"monthReportDetail_06" : { type:'click', evtid: 'monthReportDetail_06', topic: '月度报告详情页-我知道了', info: ''} ,
	//月度报告列表页
	"monthReportList_01" : { type:'click', evtid: 'monthReportList_01', topic: '月度报告列表页-右箭头', info: ''} ,
	"monthReportList_02" : { type:'click', evtid: 'monthReportList_02', topic: '浏览商品', info: ''} ,
	"monthReportList_03" : { type:'click', evtid: 'monthReportList_03', topic: '列表展开收起', info: ''} ,
	//修改分红方式
	"bonusMethod_01" : { type:'click', evtid: 'bonusMethod_01', topic: '修改分红方式', info: ''} ,
	// 组件弹层的点击事件
	"bonusMethod_02" : { type:'click', evtid: 'bonusMethod_02', topic: '修改分红方式_确定', info: ''} ,
	"bonusMethod_03" : { type:'click', evtid: 'bonusMethod_03', topic: '修改分红方式_取消', info: ''} ,
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

	// recommend.html
	"recommend_0": { type:'click', evtid: 'recommend_0', topic: '推荐有礼-取消选择', info: ''} ,
	"recommend_1": { type:'click', evtid: 'recommend_1', topic: '推荐有礼-选择理财师', info: ''} ,
	"recommend_2": { type:'click', evtid: 'recommend_2', topic: '推荐有礼-取消选择', info: ''} ,
	"recommend_3": { type:'click', evtid: 'recommend_3', topic: '推荐有礼-生成专属二维码', info: ''} ,
	"recommend_4": { type:'click', evtid: 'recommend_4', topic: '推荐有礼-关闭所有弹层', info: ''} ,
	"recommend_5": { type:'click', evtid: 'recommend_5', topic: '推荐有礼-分享给好友', info: ''} ,
	"recommend_6": { type:'click', evtid: 'recommend_6', topic: '推荐有礼-分享到朋友圈', info: ''} ,

	"applyHistory_01": { type:'click', evtid: 'applyHistory_01', topic: '基金账户诊断_详情页', info: ''} ,
	"applyHistory_02": { type:'click', evtid: 'applyHistory_02', topic: '基金账户诊断_展开收起', info: ''} ,
	"applyHistory_03": { type:'click', evtid: 'applyHistory_03', topic: '基金账户诊断_编辑', info: ''} ,
	"applyHistory_04": { type:'click', evtid: 'applyHistory_04', topic: '基金账户诊断_新增申请', info: ''} ,

/**************************************************************mine文件夹结束**************************************************************************/ 




/**************************************************************financial start***********************************************************************/ 
	
	//私募基金产品详情   privatePlacementDetail.html
 	"privatePlacementDetail_01" : { type:'click', evtid: 'privatePlacementDetail_01', topic: '私募基金产品详情-tab点击切换', info: ''} ,
	"privatePlacementDetail_02" : { type:'click', evtid: 'privatePlacementDetail_02', topic: '私募基金产品详情-折线图点击', info: ''} ,
	"privatePlacementDetail_03" : { type:'click', evtid: 'privatePlacementDetail_03', topic: '私募基金产品详情-信息的拷贝', info: ''} ,
	"privatePlacementDetail_04" : { type:'click', evtid: 'privatePlacementDetail_04', topic: '私募基金产品详情-复制全部', info: ''} ,
	"privatePlacementDetail_05" : { type:'click', evtid: 'privatePlacementDetail_05', topic: '私募基金产品详情-历史明细', info: ''} ,
	"privatePlacementDetail_06" : { type:'click', evtid: 'privatePlacementDetail_06', topic: '私募基金产品详情-立即预约', info: ''} ,
	"privatePlacementDetail_07" : { type:'click', evtid: 'privatePlacementDetail_07', topic: '私募基金产品详情-产品材料', info: ''} ,
	"privatePlacementDetail_08" : { type:'click', evtid: 'privatePlacementDetail_08', topic: '私募基金产品详情-净值更新', info: ''} ,
	"privatePlacementDetail_09" : { type:'click', evtid: 'privatePlacementDetail_09', topic: '私募基金产品详情-一键预约', info: ''} ,
	"privatePlacementDetail_10" : { type:'click', evtid: 'privatePlacementDetail_10', topic: '私募基金产品详情-查看明细', info: ''} ,
	"privatePlacementDetail_11" : { type:'click', evtid: 'privatePlacementDetail_11', topic: '私募基金产品详情-产品名称', info: ''} ,
	"privatePlacementDetail_12" : { type:'click', evtid: 'privatePlacementDetail_12', topic: '私募基金产品详情-未认证跳转', info: ''} ,
	"privatePlacementDetail_13" : { type:'click', evtid: 'privatePlacementDetail_13', topic: '私募基金产品详情-一键认证', info: ''} ,
	// 组件弹层的点击事件
	"privatePlacementDetail_14" : { type:'click', evtid: 'privatePlacementDetail_14', topic: '私募基金产品详情-开通恒天账户_确定', info: ''} ,
	"privatePlacementDetail_15" : { type:'click', evtid: 'privatePlacementDetail_15', topic: '私募基金产品详情-开通恒天账户_取消', info: ''} ,
	"privatePlacementDetail_16" : { type:'click', evtid: 'privatePlacementDetail_16', topic: '私募基金产品详情-机构_线下开户_确定', info: ''} ,
	"privatePlacementDetail_17" : { type:'click', evtid: 'privatePlacementDetail_17', topic: '私募基金产品详情-机构_线下开户_取消', info: ''} ,
	"privatePlacementDetail_18" : { type:'click', evtid: 'privatePlacementDetail_18', topic: '私募基金产品详情-机构客户完善资料_确定', info: ''} ,
	"privatePlacementDetail_19" : { type:'click', evtid: 'privatePlacementDetail_19', topic: '私募基金产品详情-机构客户完善资料_取消', info: ''} ,
	"privatePlacementDetail_20" : { type:'click', evtid: 'privatePlacementDetail_20', topic: '私募基金产品详情-机构开户联系理财师_线下开户_确定', info: ''} ,
	"privatePlacementDetail_21" : { type:'click', evtid: 'privatePlacementDetail_21', topic: '私募基金产品详情-机构开户联系理财师_线下开户_取消', info: ''} ,
	"privatePlacementDetail_22" : { type:'click', evtid: 'privatePlacementDetail_22', topic: '私募基金产品详情-机构开户联系理财师_联系理财师_确定', info: ''} ,
	"privatePlacementDetail_23" : { type:'click', evtid: 'privatePlacementDetail_23', topic: '私募基金产品详情-机构开户联系理财师_联系理财师_取消', info: ''} ,
	"privatePlacementDetail_24" : { type:'click', evtid: 'privatePlacementDetail_24', topic: '私募基金产品详情-投资期限少于产品期限_确定', info: ''} ,
	"privatePlacementDetail_25" : { type:'click', evtid: 'privatePlacementDetail_25', topic: '私募基金产品详情-投资期限少于产品期限_取消', info: ''} ,
	"privatePlacementDetail_26" : { type:'click', evtid: 'privatePlacementDetail_26', topic: '私募基金产品详情-售前告知书_确定', info: ''} ,
	"privatePlacementDetail_27" : { type:'click', evtid: 'privatePlacementDetail_27', topic: '私募基金产品详情-售前告知书_取消', info: ''} ,
	"privatePlacementDetail_28" : { type:'click', evtid: 'privatePlacementDetail_28', topic: '私募基金产品详情-投资期限少于产品期限_确定', info: ''} ,
	"privatePlacementDetail_29" : { type:'click', evtid: 'privatePlacementDetail_29', topic: '私募基金产品详情-投资期限少于产品期限_取消', info: ''} ,
	"privatePlacementDetail_30" : { type:'click', evtid: 'privatePlacementDetail_30', topic: '私募基金产品详情-产品与风险承受能力相匹配_确定', info: ''} ,
	"privatePlacementDetail_31" : { type:'click', evtid: 'privatePlacementDetail_31', topic: '私募基金产品详情-产品与风险承受能力相匹配_取消', info: ''} ,
	"privatePlacementDetail_32" : { type:'click', evtid: 'privatePlacementDetail_32', topic: '私募基金产品详情-账户冻结_确定', info: ''} ,
	"privatePlacementDetail_33" : { type:'click', evtid: 'privatePlacementDetail_33', topic: '私募基金产品详情-账户冻结_取消', info: ''} ,

	//现金管理  cashManagement.html
	"cashManagement_01" : { type:'click', evtid: 'cashManagement_01', topic: '现金管理-现金宝详情', info: ''} ,
	"cashManagement_02" : { type:'click', evtid: 'cashManagement_02', topic: '现金管理-转入', info: ''} ,
	"cashManagement_03" : { type:'click', evtid: 'cashManagement_03', topic: '现金管理-转出', info: ''} ,
	"cashManagement_04" : { type:'click', evtid: 'cashManagement_04', topic: '现金管理-了解现金管理', info: ''} ,
	"cashManagement_05" : { type:'click', evtid: 'cashManagement_05', topic: '现金管理-认证', info: ''} ,
	"cashManagement_06" : { type:'click', evtid: 'cashManagement_06', topic: '现金管理-一键认证', info: ''} ,
	"cashManagement_07" : { type:'click', evtid: 'cashManagement_07', topic: '现金管理-转入账户冻结判断', info: ''} ,
	"cashManagement_08" : { type:'click', evtid: 'cashManagement_08', topic: '现金管理-转出账户冻结判断', info: ''} ,
	// 现金管理 账户冻结逻辑的判断埋点
	"cashManagement_001":{ type:'click', evtid: 'cashManagement_001', topic: '现金管理-认证', info: ''},
	"cashManagement_002":{ type:'click', evtid: 'cashManagement_002', topic: '现金管理-一键认证', info: ''},
	"cashManagement_003":{ type:'click', evtid: 'cashManagement_003', topic: '现金管理-风险等级匹配失败', info: ''},
	"cashManagement_004":{ type:'click', evtid: 'cashManagement_004', topic: '现金管理-风险等级匹配失败结果跳转', info: ''},
	"cashManagement_005":{ type:'click', evtid: 'cashManagement_005', topic: '现金管理-风测等级匹配成功', info: ''},
	"cashManagement_006":{ type:'click', evtid: 'cashManagement_006', topic: '现金管理_点击弹窗', info: ''},
	"cashManagement_007":{ type:'click', evtid: 'cashManagement_007', topic: '现金管理_关闭按钮隐藏', info: ''},
	//现金转入  cashTransformIn.html
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
	"cashTransformIn_17" : { type:'click', evtid: 'cashTransformIn_17', topic: '现金转入-基金合同,募说明书', info: ''} ,
	"cashTransformIn_18" : { type:'click', evtid: 'cashTransformIn_18', topic: '现金转入-键盘', info: ''} ,
	//现金转出  cashTransformOut.html
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
	"cashTransformOut_13" : { type:'click', evtid: 'cashTransformOut_13', topic: '现金转出-转出到账时间', info: ''} ,
	"cashTransformOut_14" : { type:'click', evtid: 'cashTransformOut_14', topic: '现金转出-阅读规则', info: ''} ,
	"cashTransformOut_15" : { type:'click', evtid: 'cashTransformOut_15', topic: '现金转出-转出金额', info: ''} ,
    // 活期理财
    "demandFinancing_01" : { type:'click', evtid: 'demandFinancing_01', topic: '活期理财-跳转产品详情', info: ''} ,
	//我的定投_定投详情 castSurelyDetails.html
	"castSurelyDetails_01" : { type:'click', evtid: 'castSurelyDetails_01', topic: '现金转出-跳转详情', info: ''} ,
	"castSurelyDetails_02" : { type:'click', evtid: 'castSurelyDetails_02', topic: '现金转出-修改', info: ''} ,
	"castSurelyDetails_03" : { type:'click', evtid: 'castSurelyDetails_03', topic: '现金转出-终止 暂停 续投', info: ''} ,
	"castSurelyDetails_04" : { type:'click', evtid: 'castSurelyDetails_04', topic: '现金转出-定投详情结果页', info: ''} ,
	// demandFinancing.html  活期理财
	"demandFinancing_01" : { type:'click', evtid: 'demandFinancing_01', topic: '活期理财-基金详情页', info: ''} ,
	//基金档案 fundFile.html
	"fundFile_01" : { type:'click', evtid: 'fundFile_01', topic: '基金档案-tab点击切换', info: ''} ,
	"fundFile_02" : { type:'click', evtid: 'fundFile_02', topic: '基金档案-基金公告跳转', info: ''} ,
	//现金管理 -- 转入  fundTransformIn.html
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
	"fundTransformIn_17" : { type:'click', evtid: 'fundTransformIn_17', topic: '现金转入-基金合同,募说明书', info: ''} ,
	"fundTransformIn_18" : { type:'click', evtid: 'fundTransformIn_18', topic: '现金转入-键盘', info: ''} ,
	"fundTransformIn_20" : { type:'click', evtid: 'fundTransformIn_20', topic: '现金转入-风险揭示函_知道了', info: ''} ,
	"fundTransformIn_21" : { type:'click', evtid: 'fundTransformIn_21', topic: '现金转入-返回', info: ''} ,
	// 组件弹层的点击事件
	"fundTransformIn_19" : { type:'click', evtid: 'fundTransformIn_19', topic: '现金转入-风险揭示函', info: ''} ,

	//我的定投计划 myInvestmentPlan.html
	"myInvestmentPlan_01" : { type:'click', evtid: 'myInvestmentPlan_01', topic: '定投计划-新增 跳原生定投排行页', info: ''} ,
	"myInvestmentPlan_02" : { type:'click', evtid: 'myInvestmentPlan_02', topic: '定投计划-跳转详情页', info: ''} ,
	"myInvestmentPlan_03" : { type:'click', evtid: 'myInvestmentPlan_03', topic: '定投计划-已终止的定投计划', info: ''} ,
	// myInvestmentPlanH.html
	"myInvestmentPlanH_01" : { type:'click', evtid: 'myInvestmentPlanH_01', topic: '定投计划-跳转详情页', info: ''} ,
	// newFundDetail.html  新发基金
	"newFundDetail_0" : { type:'click', evtid: 'newFundDetail_0', topic: '新发基金-基金档案', info: ''} ,
	"newFundDetail_1" : { type:'click', evtid: 'newFundDetail_1', topic: '新发基金-基金经理', info: ''} ,
	"newFundDetail_2" : { type:'click', evtid: 'newFundDetail_2', topic: '新发基金-基金公司', info: ''} ,
	"newFundDetail_3" : { type:'click', evtid: 'newFundDetail_3', topic: '新发基金-立即购买', info: ''} ,
	"newFundDetail_4" : { type:'click', evtid: 'newFundDetail_4', topic: '新发基金-买入账户判断', info: ''} ,
	// 账户冻结逻辑判断
	"newFundDetail_001":{ type:'click', evtid: 'newFundDetail_001', topic: '新发基金-认证', info: ''},
	"newFundDetail_002":{ type:'click', evtid: 'newFundDetail_002', topic: '新发基金-一键认证', info: ''},
	"newFundDetail_003":{ type:'click', evtid: 'newFundDetail_003', topic: '新发基金-风险等级匹配失败', info: ''},
	"newFundDetail_004":{ type:'click', evtid: 'newFundDetail_004', topic: '新发基金-风险等级匹配失败结果跳转', info: ''},
	"newFundDetail_005":{ type:'click', evtid: 'newFundDetail_005', topic: '新发基金-风测等级匹配成功', info: ''},
	"newFundDetail_006":{ type:'click', evtid: 'newFundDetail_006', topic: '新发基金_点击弹窗', info: ''},
	"newFundDetail_007":{ type:'click', evtid: 'newFundDetail_007', topic: '新发基金_关闭按钮隐藏', info: ''},



	// 组件弹层的点击事件
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
	"ordinarySetThrow_17" : { type:'click', evtid: 'ordinarySetThrow_17', topic: '定投-基金合同', info: ''} ,
	"ordinarySetThrow_18" : { type:'click', evtid: 'ordinarySetThrow_18', topic: '定投-键盘', info: ''} ,
	"ordinarySetThrow_19" : { type:'click', evtid: 'ordinarySetThrow_19', topic: '定投-周期选择', info: ''} ,
	"ordinarySetThrow_20" : { type:'click', evtid: 'ordinarySetThrow_20', topic: '定投-返回', info: ''} ,
	"ordinarySetThrow_21" : { type:'click', evtid: 'ordinarySetThrow_21', topic: '定投-《定期定额投资业务协议》', info: ''} ,
	// publicDetail.html  公募产品详情页
	"publicDetail_01" : { type:'click', evtid: 'publicDetail_01', topic: '公募产品详情页-基金经理', info: ''} ,
	"publicDetail_02" : { type:'click', evtid: 'publicDetail_02', topic: '公募产品详情页-基金公司', info: ''} ,
	"publicDetail_03" : { type:'click', evtid: 'publicDetail_03', topic: '公募产品详情页-基金档案', info: ''} ,
	"publicDetail_04" : { type:'click', evtid: 'publicDetail_04', topic: '公募产品详情页-历史净值查看更多', info: ''} ,
	"publicDetail_05" : { type:'click', evtid: 'publicDetail_05', topic: '公募产品详情页-交易规则', info: ''} ,
	"publicDetail_06" : { type:'click', evtid: 'publicDetail_06', topic: '公募产品详情页-定投', info: ''} ,
	"publicDetail_07" : { type:'click', evtid: 'publicDetail_07', topic: '公募产品详情页-买入', info: ''} ,
	"publicDetail_08" : { type:'click', evtid: 'publicDetail_08', topic: '公募产品详情页-认证', info: ''} ,
	"publicDetail_09" : { type:'click', evtid: 'publicDetail_09', topic: '公募产品详情页-一键认证', info: ''} ,
	"publicDetail_10" : { type:'click', evtid: 'publicDetail_10', topic: '公募产品详情页-七日年华 万份收益', info: ''} ,
	"publicDetail_11" : { type:'click', evtid: 'publicDetail_11', topic: '公募产品详情页-折线图切换', info: ''} ,
	// "publicDetail_12" : { type:'click', evtid: 'publicDetail_12', topic: '公募产品详情页-//人工服务', info: ''} ,
	"publicDetail_13" : { type:'click', evtid: 'publicDetail_13', topic: '公募产品详情页-分享--跳往原生页面', info: ''} ,
	"publicDetail_14" : { type:'click', evtid: 'publicDetail_14', topic: '公募产品详情页-加自选', info: ''} ,
	"publicDetail_15" : { type:'click', evtid: 'publicDetail_15', topic: '公募产品详情页-风测等级匹配成功', info: ''} ,
	"publicDetail_16" : { type:'click', evtid: 'publicDetail_16', topic: '公募产品详情页-风险等级匹配失败', info: ''} ,
	"publicDetail_17" : { type:'click', evtid: 'publicDetail_17', topic: '公募产品详情页-风险等级匹配失败结果跳转', info: ''} ,

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
	"redemptionBuy_10" : { type:'click', evtid: 'redemptionBuy_10', topic: '赎回-忘记密码跳转', info: ''} ,
	"redemptionBuy_11" : { type:'click', evtid: 'redemptionBuy_11', topic: '赎回-明白了', info: ''} ,
	"redemptionBuy_12" : { type:'click', evtid: 'redemptionBuy_12', topic: '赎回-忘记密码跳转', info: ''} ,
	//转入结果  surelyResults.html
	"surelyResults_01" : { type:'click', evtid: 'surelyResults_01', topic: '定投结果-跳往现金宝管理页面', info: ''} ,
	//买入结果  surelyResultsDetail.html
	"surelyResultsDetail_01" : { type:'click', evtid: 'surelyResultsDetail_01', topic: '买入结果-跳往持仓列表页', info: ''} ,
	// surelyResultShot.html
	"surelyResultShot_01" : { type:'click', evtid: 'surelyResultShot_01', topic: '定投结果-跳往现金宝管理页面', info: ''} ,


/**************************************************************financial  end ***********************************************************************/ 
	
	
/********************************************************homePage  start ***********************************************************/ 

	//fortuneCollegeList.html
	"fortune_00" : { type:'click', evtid: 'fortune_00', topic: '查看往期热词', info: ''} ,
	"fortune_01" : { type:'click', evtid: 'fortune_01', topic: '播放往期内容', info: ''} ,
	"fortune_02" : { type:'click', evtid: 'fortune_02', topic: '播放往期内容列表', info: ''} ,
	"fortune_03" : { type:'click', evtid: 'fortune_03', topic: '财富讲堂全部', info: ''} ,
	"fortune_04" : { type:'click', evtid: 'fortune_04', topic: '财富讲堂tab', info: ''} ,
	"fortune_05" : { type:'click', evtid: 'fortune_05', topic: '财富讲堂全部列表', info: ''} ,
	"fortune_06" : { type:'click', evtid: 'fortune_06', topic: '财富研究', info: ''} ,
	"fortune_07" : { type:'click', evtid: 'fortune_07', topic: '财富研究列表', info: ''} ,
	"fortune_08" : { type:'click', evtid: 'fortune_08', topic: '财富研究tab', info: ''} ,
	"fortune_13":{ type:'click', evtid: 'fortune_13', topic: '财富学院金融翻译官', info: ''} ,
	"fortune_14":{ type:'click', evtid: 'fortune_14', topic: '财富学院banner跳转', info: ''} ,
	//fortuneFlowKnown.html
	"fortune_09" : { type:'click', evtid: 'fortune_09', topic: '早知道列表', info: ''} ,
	//fortuneClassroom.html
	"fortune_10" : { type:'click', evtid: 'fortune_10', topic: '财富讲堂-大咖直播列表点击', info: ''} ,
	"fortune_11" : { type:'click', evtid: 'fortune_11', topic: '财富讲堂-知识讲堂列表点击', info: ''},
	//wealthResearch.html
	"fortune_12":{ type:'click', evtid: 'fortune_12', topic: '财富研究详情tab', info: ''} ,
	//understandHT.html
	"understandTab_00":{ type:'click', evtid: 'understandTab_00', topic: '了解恒天tab', info: ''} ,
	//noticeCenter.html
	"notice_00":{ type:'click', evtid: 'notice_00', topic: '消息中心', info: ''} ,
	//systemInforms.html
	"notice_01":{ type:'click', evtid: 'notice_01', topic: '系统通知', info: ''}, 
	//starFinancialPlannerList.html
	"starFinancialPlannerList_00":{ type:'click', evtid: 'starFinancialPlannerList_00', topic: '城市定位', info: ''} ,
	"starFinancialPlannerList_01":{ type:'click', evtid: 'starFinancialPlannerList_01', topic: '热门城市', info: ''} ,
	"starFinancialPlannerList_02":{ type:'click', evtid: 'starFinancialPlannerList_02', topic: '返回', info: ''} ,
	"starFinancialPlannerList_03":{ type:'click', evtid: 'starFinancialPlannerList_03', topic: '城市索引', info: ''} ,
	"starFinancialPlannerList_04":{ type:'click', evtid: 'starFinancialPlannerList_04', topic: '理财师列表', info: ''} ,
	// "starFinancialPlannerList_search":{ type:'click', evtid: '', topic: '理财师查询', info: ''} ,
	"starFinancialPlannerList_05":{ type:'click', evtid: 'starFinancialPlannerList_05', topic: '取消搜索', info: ''} ,
	"starFinancialPlannerList_06":{ type:'click', evtid: 'starFinancialPlannerList_06', topic: '点击搜索框触发选中', info: ''} ,
	"starFinancialPlannerList_07":{ type:'click', evtid: 'starFinancialPlannerList_07', topic: '返回上一页首页', info: ''} ,
	// 组件弹层的点击事件
	"starFinancialPlannerList_08":{ type:'click', evtid: 'starFinancialPlannerList_08', topic: '绑定成功_浏览产品', info: ''} ,
	"starFinancialPlannerList_09":{ type:'click', evtid: 'starFinancialPlannerList_09', topic: '绑定成功_返回首页', info: ''} ,
	"starFinancialPlannerList_10":{ type:'click', evtid: 'starFinancialPlannerList_10', topic: '已绑定理财师_明白了', info: ''} ,
	// "starFinancialPlannerList_11":{ type:'click', evtid: 'starFinancialPlannerList_11', topic: '已绑定理财师_取消', info: ''} ,
	"starFinancialPlannerList_12":{ type:'click', evtid: 'starFinancialPlannerList_12', topic: '绑定理财师_立即绑定', info: ''} ,
	"starFinancialPlannerList_13":{ type:'click', evtid: 'starFinancialPlannerList_13', topic: '绑定理财师_取消', info: ''} ,
	"starFinancialPlannerList_14":{ type:'click', evtid: 'starFinancialPlannerList_14', topic: '绑定理财师_立即绑定', info: ''} ,
	"starFinancialPlannerList_15":{ type:'click', evtid: 'starFinancialPlannerList_15', topic: '绑定理财师_取消', info: ''} ,

	"starFinancialPlannerList_16":{ type:'click', evtid: 'starFinancialPlannerList_16', topic: '输入理财师工号或姓名_取消', info: ''} ,

/********************************************************homePage  end ***********************************************************/ 

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
	// 组件弹层的点击事件
	"publicAssets_11":{ type:'click', evtid: 'publicAssets_11', topic: '公募资产_筛选银行卡', info: ''},
	"publicAssets_12":{ type:'click', evtid: 'publicAssets_12', topic: '公募资产_银行卡列表点击', info: ''},


	// 公募资产详情的逻辑判断添加相关埋点
	"publicAssets_cash_001":{ type:'click', evtid: 'publicAssets_cash_001', topic: '公募现金宝详情页_认证', info: ''},
	"publicAssets_cash_002":{ type:'click', evtid: 'publicAssets_cash_002', topic: '公募现金宝详情页_一键认证', info: ''},
	"publicAssets_cash_003":{ type:'click', evtid: 'publicAssets_cash_003', topic: '公募现金宝详情页_风险等级匹配失败', info: ''},
	"publicAssets_cash_004":{ type:'click', evtid: 'publicAssets_cash_004', topic: '公募现金宝详情页_风险等级匹配失败结果跳转', info: ''},
	"publicAssets_cash_005":{ type:'click', evtid: 'publicAssets_cash_005', topic: '公募现金宝详情页_风测等级匹配成功', info: ''},
	"publicAssets_cash_006":{ type:'click', evtid: 'publicAssets_cash_006', topic: '公募现金宝详情页_点击弹窗', info: ''},
	"publicAssets_cash_007":{ type:'click', evtid: 'publicAssets_cash_007', topic: '公募现金宝详情页_关闭按钮隐藏', info: ''},

	"publicAssets_001":{ type:'click', evtid: 'publicAssets_001', topic: '公募资产_认证', info: ''},
	"publicAssets_002":{ type:'click', evtid: 'publicAssets_002', topic: '公募资产_一键认证', info: ''},
	"publicAssets_003":{ type:'click', evtid: 'publicAssets_003', topic: '公募资产_风险等级匹配失败', info: ''},
	"publicAssets_004":{ type:'click', evtid: 'publicAssets_004', topic: '公募资产_风险等级匹配失败结果跳转', info: ''},
	"publicAssets_005":{ type:'click', evtid: 'publicAssets_005', topic: '公募资产_风测等级匹配成功', info: ''},
	"publicAssets_006":{ type:'click', evtid: 'publicAssets_006', topic: '公募资产_点击弹窗', info: ''},
	"publicAssets_007":{ type:'click', evtid: 'publicAssets_007', topic: '公募资产_关闭按钮隐藏', info: ''},




	// privateDetail.html
	"privateDetail_0":{ type:'click', evtid: 'privateDetail_0', topic: '私募资产详情_详情的展开与收起', info: ''},
	"privateDetail_1":{ type:'click', evtid: 'privateDetail_1', topic: '私募资产详情_交易明细跳转', info: ''},
	"privateDetail_2":{ type:'click', evtid: 'privateDetail_2', topic: '私募资产详情_收益分配明细跳转', info: ''},
	"privateDetail_3":{ type:'click', evtid: 'privateDetail_3', topic: '私募资产详情_基金确认书跳转', info: ''},
	"privateDetail_4":{ type:'click', evtid: 'privateDetail_4', topic: '私募资产详情_历史明细跳转', info: ''},
	"privateDetail_5":{ type:'click', evtid: 'privateDetail_5', topic: '私募资产详情_净值明细跳转', info: ''},
	"privateDetail_6":{ type:'click', evtid: 'privateDetail_6', topic: '私募资产详情_交易规则跳转', info: ''},
	"privateDetail_7":{ type:'click', evtid: 'privateDetail_7', topic: '私募资产详情_产品档案跳转', info: ''},
	"privateDetail_8":{ type:'click', evtid: 'privateDetail_8', topic: '私募资产详情_信息披露跳转', info: ''},
	"privateDetail_9":{ type:'click', evtid: 'privateDetail_9', topic: '私募资产详情_折线图点击月份区域', info: ''},
	"privateDetail_10":{ type:'click', evtid: 'privateDetail_10', topic: '私募资产详情_赎回按钮点击切换', info: ''},
	"privateDetail_11":{ type:'click', evtid: 'privateDetail_11', topic: '私募资产详情_赎回页面跳转', info: ''},
	"privateDetail_12":{ type:'click', evtid: 'privateDetail_12', topic: '私募资产详情_折线图点击七日年化/万份收益切换区域', info: ''},
	// 组件弹层的点击事件
	"privateDetail_13":{ type:'click', evtid: 'privateDetail_13', topic: '赎回页面_账户冻结_确认', info: ''},
	"privateDetail_14":{ type:'click', evtid: 'privateDetail_14', topic: '赎回确认', info: ''},
	"privateDetail_15":{ type:'click', evtid: 'privateDetail_15', topic: '赎回取消', info: ''},

	// privateDetailList.html
	"privateDetailList_0":{ type:'click', evtid: 'privateDetailList_0', topic: '私募交易详情_筛选按钮点击', info: ''},
	"privateDetailList_1":{ type:'click', evtid: 'privateDetailList_1', topic: '私募交易详情_筛选区域筛选项点击', info: ''},
	"privateDetailList_2":{ type:'click', evtid: 'privateDetailList_2', topic: '私募交易详情_点击遮罩隐藏', info: ''},
	"privateDetailList_3":{ type:'click', evtid: 'privateDetailList_3', topic: '私募交易详情_取消受让、取消预约、取消转让点击', info: ''},
	"privateDetailList_4":{ type:'click', evtid: 'privateDetailList_4', topic: '私募交易详情_我明白了区域点击', info: ''},
	"privateDetailList_5":{ type:'click', evtid: 'privateDetailList_5', topic: '私募交易详情_点击状态文字出现弹框', info: ''},
	"privateDetailList_6":{ type:'click', evtid: 'privateDetailList_6', topic: '私募交易详情_详情按钮点击', info: ''},
	"privateDetailList_7":{ type:'click', evtid: 'privateDetailList_7', topic: '私募交易详情_点击每一条进入详情', info: ''},
	// 组件弹层的点击事件
	"privateDetailList_8":{ type:'click', evtid: 'privateDetailList_8', topic: '取消转让申请_确定', info: ''},
	"privateDetailList_9":{ type:'click', evtid: 'privateDetailList_9', topic: '取消转让申请_取消', info: ''},
	"privateDetailList_10":{ type:'click', evtid: 'privateDetailList_10', topic: '取消受让申请_确定', info: ''},
	"privateDetailList_11":{ type:'click', evtid: 'privateDetailList_11', topic: '取消受让申请_取消', info: ''},
	"privateDetailList_12":{ type:'click', evtid: 'privateDetailList_12', topic: '取消预约_确定', info: ''},
	"privateDetailList_13":{ type:'click', evtid: 'privateDetailList_13', topic: '取消预约_取消', info: ''},
	"privateDetailList_14":{ type:'click', evtid: 'privateDetailList_14', topic: '取消预约_我明白了', info: ''},

	// privateFundPdf.html
	"privateFundPdf_0":{ type:'click', evtid: 'privateFundPdf_0', topic: '私募基金确认书_点击下载', info: ''},
	"privateFundPdf_1":{ type:'click', evtid: 'privateFundPdf_1', topic: '私募基金确认书_点击修改邮箱', info: ''},
	// 组件弹层的点击事件
	"privateFundPdf_2":{ type:'click', evtid: 'privateFundPdf_2', topic: '私募基金确认书_邮箱变更_确认', info: ''},
	"privateFundPdf_3":{ type:'click', evtid: 'privateFundPdf_3', topic: '私募基金确认书_邮箱变更_取消', info: ''},
	"privateFundPdf_4":{ type:'click', evtid: 'privateFundPdf_4', topic: '私募基金确认书_输入指定邮箱_确认', info: ''},
	"privateFundPdf_5":{ type:'click', evtid: 'privateFundPdf_5', topic: '私募基金确认书_输入指定邮箱_取消', info: ''},

	// tobeConfirmTransaction.html
	"tobeConfirmTransaction_0":{ type:'click', evtid: 'tobeConfirmTransaction_0', topic: '待确认交易_筛选按钮点击', info: ''},
	"tobeConfirmTransaction_1":{ type:'click', evtid: 'tobeConfirmTransaction_1', topic: '待确认交易_筛选区域条件点击', info: ''},
	"tobeConfirmTransaction_2":{ type:'click', evtid: 'tobeConfirmTransaction_2', topic: '待确认交易_点击遮罩隐藏', info: ''},
	"tobeConfirmTransaction_3":{ type:'click', evtid: 'tobeConfirmTransaction_3', topic: '待确认交易_取消受让、取消预约、取消转让', info: ''},
	"tobeConfirmTransaction_4":{ type:'click', evtid: 'tobeConfirmTransaction_4', topic: '待确认交易_点击状态文字出现弹框', info: ''},
	"tobeConfirmTransaction_5":{ type:'click', evtid: 'tobeConfirmTransaction_5', topic: '待确认交易_详情按钮点击', info: ''},
	"tobeConfirmTransaction_6":{ type:'click', evtid: 'tobeConfirmTransaction_6', topic: '待确认交易_点击每一条进入详情页', info: ''},
	// 组件弹层的点击事件
	"tobeConfirmTransaction_7":{ type:'click', evtid: 'tobeConfirmTransaction_7', topic: '待确认交易_取消转让申请_确定', info: ''},
	"tobeConfirmTransaction_8":{ type:'click', evtid: 'tobeConfirmTransaction_8', topic: '待确认交易_取消转让申请_取消', info: ''},
	"tobeConfirmTransaction_9":{ type:'click', evtid: 'tobeConfirmTransaction_9', topic: '待确认交易_取消受让申请_确定', info: ''},
	"tobeConfirmTransaction_10":{ type:'click', evtid: 'tobeConfirmTransaction_10', topic: '待确认交易_取消受让申请_取消', info: ''},
	"tobeConfirmTransaction_11":{ type:'click', evtid: 'tobeConfirmTransaction_11', topic: '待确认交易_取消预约_确定', info: ''},
	"tobeConfirmTransaction_12":{ type:'click', evtid: 'tobeConfirmTransaction_12', topic: '待确认交易_取消预约_取消', info: ''},
	"tobeConfirmTransaction_13":{ type:'click', evtid: 'tobeConfirmTransaction_13', topic: '待确认交易_我知道了', info: ''},
	"tobeConfirmTransaction_14":{ type:'click', evtid: 'tobeConfirmTransaction_14', topic: '已确认交易_未确认行为确认单_立即查看', info: ''},

	"cashTreasure_0":{ type:'click', evtid: 'cashTreasure_0', topic: '现金宝详情_展开收起按钮点击', info: ''},
	"cashTreasure_1":{ type:'click', evtid: 'cashTreasure_1', topic: '现金宝详情_折线图中月份点击', info: ''},
	"cashTreasure_2":{ type:'click', evtid: 'cashTreasure_2', topic: '现金宝详情_折线图点击七日年化/万份收益切换区域', info: ''},

	// optionalPublicDetail.html
	"optionalPublicDetail_0":{ type:'click', evtid: 'optionalPublicDetail_0', topic: '公募自选资产详情页_按钮点击展开收起', info: ''},
	"optionalPublicDetail_1":{ type:'click', evtid: 'optionalPublicDetail_1', topic: '公募自选资产详情页_折线图点击月份', info: ''},
	"optionalPublicDetail_2":{ type:'click', evtid: 'optionalPublicDetail_2', topic: '公募自选资产详情页_折线图点击七日年化/万份收益切换区域', info: ''},
	"optionalPublicDetail_3":{ type:'click', evtid: 'optionalPublicDetail_3', topic: '公募自选资产详情页_交易记录跳转', info: ''},
	"optionalPublicDetail_4":{ type:'click', evtid: 'optionalPublicDetail_4', topic: '公募自选资产详情页_分红方式跳转', info: ''},
	"optionalPublicDetail_5":{ type:'click', evtid: 'optionalPublicDetail_5', topic: '公募自选资产详情页_历史明细跳转', info: ''},
	"optionalPublicDetail_6":{ type:'click', evtid: 'optionalPublicDetail_6', topic: '公募自选资产详情页_收益明细跳转', info: ''},
	"optionalPublicDetail_7":{ type:'click', evtid: 'optionalPublicDetail_7', topic: '公募自选资产详情页_头部详情跳转', info: ''},
	"optionalPublicDetail_8":{ type:'click', evtid: 'optionalPublicDetail_8', topic: '公募自选资产详情页_点击赎回', info: ''},
	"optionalPublicDetail_9":{ type:'click', evtid: 'optionalPublicDetail_9', topic: '公募自选资产详情页_点击买入', info: ''},
	"optionalPublicDetail_10":{ type:'click', evtid: 'optionalPublicDetail_10', topic: '公募自选资产详情页_点击定投', info: ''},
	// 组件弹层的点击事件
	"optionalPublicDetail_11":{ type:'click', evtid: 'optionalPublicDetail_11', topic: '公募自选资产详情页_一键认证', info: ''},
	"optionalPublicDetail_12":{ type:'click', evtid: 'optionalPublicDetail_12', topic: '公募自选资产详情页_风险等级匹配失败', info: ''},
	"optionalPublicDetail_13":{ type:'click', evtid: 'optionalPublicDetail_13', topic: '公募自选资产详情页_风险等级匹配失败结果跳转', info: ''},
	"optionalPublicDetail_14":{ type:'click', evtid: 'optionalPublicDetail_14', topic: '公募自选资产详情页_认证', info: ''},
	"optionalPublicDetail_15":{ type:'click', evtid: 'optionalPublicDetail_15', topic: '公募自选资产详情页_一键认证', info: ''},
	"optionalPublicDetail_16":{ type:'click', evtid: 'optionalPublicDetail_16', topic: '公募自选资产详情页_赎回判断', info: ''},
	"optionalPublicDetail_17":{ type:'click', evtid: 'optionalPublicDetail_17', topic: '公募自选资产详情页_买入判断', info: ''},
	"optionalPublicDetail_18":{ type:'click', evtid: 'optionalPublicDetail_18', topic: '公募自选资产详情页_定投判断', info: ''},

	// 公募资产详情的定投逻辑判断添加相关埋点
	"publicDetail_fixed_001":{ type:'click', evtid: 'publicDetail_fixed_001', topic: '公募资产详情_认证', info: ''},
	"publicDetail_fixed_002":{ type:'click', evtid: 'publicDetail_fixed_002', topic: '公募资产详情_一键认证', info: ''},
	"publicDetail_fixed_003":{ type:'click', evtid: 'publicDetail_fixed_003', topic: '公募资产详情_风险等级匹配失败', info: ''},
	"publicDetail_fixed_004":{ type:'click', evtid: 'publicDetail_fixed_004', topic: '公募资产详情_风险等级匹配失败结果跳转', info: ''},
	"publicDetail_fixed_005":{ type:'click', evtid: 'publicDetail_fixed_005', topic: '公募资产详情_风测等级匹配成功', info: ''},
	"publicDetail_fixed_006":{ type:'click', evtid: 'publicDetail_fixed_006', topic: '公募资产详情_点击弹窗', info: ''},
	"publicDetail_fixed_007":{ type:'click', evtid: 'publicDetail_fixed_007', topic: '公募资产详情_关闭按钮隐藏', info: ''},


	// 公募资产详情的买入逻辑判断添加相关埋点
	"publicDetail_buy_001":{ type:'click', evtid: 'publicDetail_buy_001', topic: '公募资产详情_认证', info: ''},
	"publicDetail_buy_002":{ type:'click', evtid: 'publicDetail_buy_002', topic: '公募资产详情_一键认证', info: ''},
	"publicDetail_buy_003":{ type:'click', evtid: 'publicDetail_buy_003', topic: '公募资产详情_风险等级匹配失败', info: ''},
	"publicDetail_buy_004":{ type:'click', evtid: 'publicDetail_buy_004', topic: '公募资产详情_风险等级匹配失败结果跳转', info: ''},
	"publicDetail_buy_005":{ type:'click', evtid: 'publicDetail_buy_005', topic: '公募资产详情_风测等级匹配成功', info: ''},
	"publicDetail_buy_006":{ type:'click', evtid: 'publicDetail_buy_006', topic: '公募资产详情_点击弹窗', info: ''},
	"publicDetail_buy_007":{ type:'click', evtid: 'publicDetail_buy_007', topic: '公募资产详情_关闭按钮隐藏', info: ''},




	"superRecord_0":{ type:'click', evtid: 'superRecord_0', topic: '超宝基金产品-交易记录_列表点击', info: ''},
	
	"superStreasureDetail_0":{ type:'click', evtid: 'superStreasureDetail_0', topic: '自选公募-超宝详情_选项卡切换', info: ''},
	"superStreasureDetail_1":{ type:'click', evtid: 'superStreasureDetail_1', topic: '自选公募-超宝详情_申请专业投资者', info: ''},
	"superStreasureDetail_2":{ type:'click', evtid: 'superStreasureDetail_2', topic: '自选公募-超宝详情_点击转出跳转', info: ''},
	"superStreasureDetail_3":{ type:'click', evtid: 'superStreasureDetail_3', topic: '自选公募-超宝详情_点击转入跳转', info: ''},
	"superStreasureDetail_4":{ type:'click', evtid: 'superStreasureDetail_4', topic: '自选公募-超宝详情_点击历史记录', info: ''},
	"superStreasureDetail_5":{ type:'click', evtid: 'superStreasureDetail_5', topic: '自选公募-超宝详情_收益明细', info: ''},
	"superStreasureDetail_6":{ type:'click', evtid: 'superStreasureDetail_6', topic: '自选公募-超宝详情_转出账户判断', info: ''},
	"superStreasureDetail_7":{ type:'click', evtid: 'superStreasureDetail_7', topic: '自选公募-超宝详情_转入账户判断', info: ''},
	// 超宝详情的逻辑判断添加相关埋点
	"superStreasureDetail_001":{ type:'click', evtid: 'superStreasureDetail_001', topic: '自选公募-超宝详情_认证', info: ''},
	"superStreasureDetail_002":{ type:'click', evtid: 'superStreasureDetail_002', topic: '自选公募-超宝详情_一键认证', info: ''},
	"superStreasureDetail_003":{ type:'click', evtid: 'superStreasureDetail_003', topic: '自选公募-超宝详情_风险等级匹配失败', info: ''},
	"superStreasureDetail_004":{ type:'click', evtid: 'superStreasureDetail_004', topic: '自选公募-超宝详情_风险等级匹配失败结果跳转', info: ''},
	"superStreasureDetail_005":{ type:'click', evtid: 'superStreasureDetail_005', topic: '自选公募-超宝详情_风测等级匹配成功', info: ''},
	"superStreasureDetail_006":{ type:'click', evtid: 'superStreasureDetail_006', topic: '自选公募-超宝详情_点击弹窗', info: ''},
	"superStreasureDetail_007":{ type:'click', evtid: 'superStreasureDetail_007', topic: '自选公募-超宝详情_关闭按钮隐藏', info: ''},


	"transactionRecords_0":{ type:'click', evtid: 'transactionRecords_0', topic: '自选公募-交易记录_筛选分类的点击事件', info: ''},
	"transactionRecords_1":{ type:'click', evtid: 'transactionRecords_1', topic: '自选公募-交易记录_筛选列表内容的点击事件', info: ''},
	"transactionRecords_2":{ type:'click', evtid: 'transactionRecords_2', topic: '自选公募-交易记录_点击列表跳转', info: ''},
	
	"superTransactionRecord_0":{ type:'click', evtid: 'superTransactionRecord_0', topic: '现金宝-交易记录_点击列表跳转', info: ''},

	"seeSign_0": { type:'click', evtid: 'seeSign_0', topic: '查看已签署材料-点击查看pdf', info: ''},
	/************************************** account end *************************************************/



	/************************************** life start *************************************************/
	// activityList.html
	"activityList_0":{ type:'click', evtid: 'activityList_0', topic: '定位选择', info: ''},
	"activityList_1":{ type:'click', evtid: 'activityList_1', topic: '热门城市', info: ''},
	"activityList_2":{ type:'click', evtid: 'activityList_2', topic: '头部返回效果', info: ''},
	"activityList_3":{ type:'click', evtid: 'activityList_3', topic: '定位右侧索引效果', info: ''},
	"activityList_4":{ type:'click', evtid: 'activityList_4', topic: '活动列表跳转', info: ''},
	"activityList_5":{ type:'click', evtid: 'activityList_5', topic: '搜索框输入触发查询数据', info: ''},
	"activityList_6":{ type:'click', evtid: 'activityList_6', topic: '清除搜索框触发查询数据', info: ''},
	"activityList_7":{ type:'click', evtid: 'activityList_7', topic: '点击搜索框触发选中', info: ''},
	"activityList_8":{ type:'click', evtid: 'activityList_8', topic: '城市头部返回', info: ''},
	// activityDetails.html
	"activityDetails_0":{ type:'click', evtid: 'activityDetails_0', topic: '返回按钮事件', info: ''},
	"activityDetails_1":{ type:'click', evtid: 'activityDetails_1', topic: '立即报名方法', info: ''},
	"activityDetails_2":{ type:'click', evtid: 'activityDetails_2', topic: '弹框取消', info: ''},
	"activityDetails_3":{ type:'click', evtid: 'activityDetails_3', topic: '弹框取消方法', info: ''},
	"activityDetails_4":{ type:'click', evtid: 'activityDetails_4', topic: '关闭大弹框', info: ''},
	"activityDetails_5":{ type:'click', evtid: 'activityDetails_5', topic: '分享好友', info: ''},
	"activityDetails_6":{ type:'click', evtid: 'activityDetails_6', topic: '我知道了按钮', info: ''},
	"activityDetails_7":{ type:'click', evtid: 'activityDetails_7', topic: '查看奖励按钮', info: ''},
	// 组件弹层的点击事件
	"activityDetails_8":{ type:'click', evtid: 'activityDetails_8', topic: '请您绑定理财师后再报名活动_去绑定', info: ''},
	"activityDetails_9":{ type:'click', evtid: 'activityDetails_9', topic: '请您绑定理财师后再报名活动_取消', info: ''},
	"activityDetails_10":{ type:'click', evtid: 'activityDetails_10', topic: '风险测评', info: ''},
	"activityDetails_11":{ type:'click', evtid: 'activityDetails_11', topic: '取消', info: ''},
	"activityDetails_12":{ type:'click', evtid: 'activityDetails_12', topic: '合格投资者认证', info: ''},
	"activityDetails_13":{ type:'click', evtid: 'activityDetails_13', topic: '取消', info: ''},
	"activityDetails_14":{ type:'click', evtid: 'activityDetails_14', topic: '实名认证', info: ''},
	"activityDetails_15":{ type:'click', evtid: 'activityDetails_15', topic: '取消', info: ''},
	"activityDetails_16":{ type:'click', evtid: 'activityDetails_16', topic: '产品与风险承受能力不匹配_去重新测评', info: ''},
	"activityDetails_17":{ type:'click', evtid: 'activityDetails_17', topic: '产品与风险承受能力不匹配_取消报名', info: ''},
	"activityDetails_18":{ type:'click', evtid: 'activityDetails_18', topic: '查看产品', info: ''},
	"activityDetails_19":{ type:'click', evtid: 'activityDetails_19', topic: '取消', info: ''},
	"activityDetails_20":{ type:'click', evtid: 'activityDetails_20', topic: '实名认证', info: ''},
	"activityDetails_21":{ type:'click', evtid: 'activityDetails_21', topic: '取消', info: ''},
	"activityDetails_22":{ type:'click', evtid: 'activityDetails_22', topic: '不可重复报名_我知道了', info: ''},
	"activityDetails_23":{ type:'click', evtid: 'activityDetails_23', topic: '服务器异常_我明白了', info: ''},
	"activityDetails_24":{ type:'click', evtid: 'activityDetails_24', topic: '温馨提示_我明白了', info: ''},

    // 返回按钮
    "goBackButton":{ type:'click', evtid: 'goBackButton', topic: '返回按钮', info: ''},

    // 在线客服
    "customerService":{ type:'click', evtid: 'customerService', topic: '在线客服', info: ''},

	/************************************** life end *************************************************/


	// allServerResources

	"articleTemplate_01":{ type:'click', evtid: 'articleTemplate_01', topic: '立即跳转', info: ''},
	"articleTemplate_02":{ type:'click', evtid: 'articleTemplate_02', topic: '调用视频播放', info: ''},

	// mui切换的埋点
	"wealthResearch_0":{ type:'click', evtid: 'wealthResearch_0', topic: '财富研究1', info: ''},
	"wealthResearch_1":{ type:'click', evtid: 'wealthResearch_1', topic: '财富研究2', info: ''},
	"wealthResearch_2":{ type:'click', evtid: 'wealthResearch_2', topic: '财富研究3', info: ''},
	"wealthResearch_3":{ type:'click', evtid: 'wealthResearch_3', topic: '财富研究4', info: ''},
	// 财富学院1
	"fortuneCollegeList_0":{ type:'click', evtid: 'fortuneCollegeList_0', topic: '财富学院1', info: ''},
	"fortuneCollegeList_1":{ type:'click', evtid: 'fortuneCollegeList_1', topic: '财富学院2', info: ''},
	"fortuneCollegeList_2":{ type:'click', evtid: 'fortuneCollegeList_2', topic: '财富学院3', info: ''},
	"fortuneCollegeList_3":{ type:'click', evtid: 'fortuneCollegeList_3', topic: '财富学院4', info: ''},

	"wealthResearch_01":{ type:'click', evtid: 'wealthResearch_01', topic: '财富学院4', info: ''},
	
	
	

	
}

module.exports = clickList;