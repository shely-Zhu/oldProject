/*
个人数据   接口模拟

*/

console.log(124);

// 使用 Mock
var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
  "hmac": "hmac",
  "status": 0,
  "code": "",//CF0004
  "msg": "处理成功！",
  'data':{ 
			"maskName"						:"张三",//用户名，未认证则显示加*手机号
			'custType|1'					:["1","0"],//客户类型【0.机构 1.个人】
			'isCertification|1'			:["2"],//是否已实名认证【1.否 2.是】
			'isBindPhone|1'					:["1","2"],//是否已绑定手机号【1.否 2.是】
			'isRiskAppraisal|1'			:["1","2"],//是否已风险测评【1.否 2.是】
			'isQualifiedInvest|1'		:["0","2"],//是否合格投资者【0.否 1.是】
			"certType|1": ["0","1","2","3","4","5","6","7","8","9","A","B","C","D"],//证件类型【参照备注】
			'maskCertNo|1'				:["15210****0000000000","12340****000444"],//证件号【加*】
			'email|1'							:["2222@124.com","234234234@ee.com"],//邮箱地址
			'linkPhone|1'					:["111****111",'33****4555'],//联系人手机号【加*】
			'linkAddress|1'				:["sdfsdfsf未发生大幅度",'撒打发斯蒂芬事发地点时发的发斯蒂芬阿斯蒂芬',"asdfasdfsdf是法师打发斯蒂芬"],//联系地址
			'investFavour|1'			:["1","2","3","4","5"],//投资偏好【参照备注】
			'qualifyStatus|1'			:["0","1","2","3","4","5"],//审核状态【参照备注】
			'qualifyReason|1'			:['审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因审核驳回原因'], //审核驳回原因
			"organLinkMan|1": ["sdf","234"],//机构联系人
			"clientId|1":  ["123"], //公募客户编号，空代表未开户
			"mergeStatus|1":  ["0"] , //公私募账号是否合并，0是，1否
			"ticket": ['SDER'], //私募跳转公募信息解密口令
	}
});



module.exports = data;