/*
	获取用户信息接口
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var user = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "处理成功！", 
	"data": { 
		maskName:"张三",//用户名，未认证则显示加*手机号 
		custType:"1",//客户类型【0.机构 1.个人】 
		isCertification:"1",//是否已实名认证【1.否 2.是】 
		isBindPhone:"1",//是否已绑定手机号【1.否 2.是】 
		isRiskAppraisal:"1",//是否已风险测评【1.否 2.是】 
		isQualifiedInvest:"1",//是否合格投资者【0.否 1.是】 
		certType:"0",//证件类型【参照备注】 
		maskCertNo:"6227000191208888",//证件号【加*】
		certTypeDesc:"生风筝", 
		email:"",//邮箱地址 
		linkPhone:"15652234090",//联系人手机号【加*】 
		linkAddress:"",//联系地址 
		investFavour:"2",//投资偏好【参照备注】 
		qualifyStatus:"",//审核状态【参照备注】 
		qualifyReason:"",//审核驳回原因 
		organLinkMan:"",//机构联系人
		proveValidDate:"",//合格投资者认定有效期【yyyy-MM-dd】
	} 
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = user;