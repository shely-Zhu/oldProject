/*
	获取用户信息接口
*/

// 使用 Mock
var Mock = require('mockjs');

//注册
var user = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "",
    "msg": "处理成功！",
    "data": {
        maskName: "张三", //用户名，未认证则显示加*手机号 
        custType: "1", //客户类型【0.机构 1.个人】 
        isCertification: "2", //是否已实名认证【1.否 2.是】
        isBindPhone: "2", //是否已绑定手机号【1.否 2.是】 
        isRiskAppraisal: "2", //是否已风险测评【1.否 2.是】 

        //isQualifiedInvest:"1",//是否合格投资者【0.否 1.是】 

        certType: "0", //证件类型【参照备注】 
        certTypeDesc: "身份证", //证件类型转译
        maskCertNo: "341221198906102008", //证件号【加*】
        certTypeDesc: "生风筝",
        email: "", //邮箱地址 
        linkPhone: "156****4090", //联系人手机号【加*】 
        linkAddress: "北京市朝阳区东三环北路甲19号嘉盛中心30层", //联系地址 
        investFavour: "5", //投资偏好【参照备注】1：保守型   2：稳健型  3：平衡型  4：成长型  5：进取型
        organLinkMan: "周斌", //机构联系人
        ticket: "", //私募跳转公募信息解密口令

        //qualifyStatus:"",//审核状态【参照备注】 
        //qualifyReason:"",//审核驳回原因 

        clientId: '1', // 公募是否开户，有值代表开户，没值代表没有开户
        mergeStatus: '0', //公私募账号是否合并 0:公私募帐户已合并 1:公募帐户未开户 2:公募帐户已开户但未合并 3:公募帐户查询异常
        organLinkMan: "", //机构联系人
        riskRank: "5", //公募客户风险等级
        //proveValidDate:"",//合格投资者认定有效期【yyyy-MM-dd】
        infoTotallyStatus: "0", //私募基本信息是否完善0是1否
        investorClassify: "0", //投资者分类【参照备注：空表示未做投资者分类 0：普通投资者 1：专业投资者 2：当然专业投资者
        pofExpired: "0", //公募风险测评是否过期 0-风险测评没有过期  1-风险测评已过期
        pofIsAllRound: "0", //公募用户信息是否完整0是1否

        customerNo:"123456"//统一客户编号
    }
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = user;