/*
个人数据   接口模拟
备注的是wap中用到的老的接口名称
前面的是新改的字段名称
*/

// 使用 Mock
var Mock = require('mockjs');

//1. 接口数据
var data = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "", //CF0004
    "msg": "处理成功！",
    'data': {
        "name": "张三", //用户名，未认证则显示加*手机号------maskName
        'accountType|1': ["1", "0", '2'], //客户类型【0.机构 1.个人 2.产品机构】----custType
        'idnoCheckflag|1': ["1"], //是否实名认证 0-否 1-是 ----------老的 是否已实名认证【1.否 2.是]
        'isBindPhone|1': ["1", "2"], //是否已绑定手机号【1.否 2.是】
        'isRiskAppraisal|1': ["2"], //是否已风险测评【1.否 2.是】
        "identityType|1": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D"], //证件类型【参照备注】-----------certType
        "identityTypeDesc|1": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D"], //证件类型翻译【参照备注】------------certTypeDesc
        'identityNo|1': ["15210****0000000000", "12340****000444"], //证件号【加*】-----maskCertNo
        'email|1': ["2222@124.com", "234234234@ee.com"], //邮箱地址
        'phone|1': ["111****111", '33****4555'], //联系人手机号【加*】------linkPhone
        'address|1': ["sdfsdfsf未发生大幅度", '撒打发斯蒂芬事发地点时发的发斯蒂芬阿斯蒂芬', "asdfasdfsdf是法师打发斯蒂芬"], //联系地址----------linkAddress
        "orgContractName|1": ["sdf", "234"], //机构联系人---------organLinkMan
        "ticket": ['SDER'], //私募跳转公募信息解密口令
        "pubNo|1": ["123"], //公募客户编号，空代表未开户------------clientId  
        "mergeStatus|1": ["0"], //公私募账号是否合并，0是，1否
        "riskRank": "5", //公募客户风险等级
        "isPerfect": '0', //私募基本信息是否完善0是1否-----------infoTotallyStatus
        "investFavour": "0", //投资者分类【参照备注：空表示未做投资者分类 0：普通投资者 1：专业投资者 2：当然专业投资者-----------investorClassify
        "pofExpired": "", // 公募风险评测是否过期 0-风险测评没有过期  1-风险测评已过期
        "customerNo": "123456", //统一客户编号
        "newcomer": "0", //是否新手账号
        "riskLevel": "", // 风险承受能力
        "endurePri": "", //投资偏好---------之前是investFavour\
        "endurePubIsold": '0', // 公募风险评测是否过期 0-否 1-是    -----------------------pofExpired
        "isRiskEndure":0, //是否风险测评 0-否 1-是

        "maskCertNo": "341221198906102008", //证件号【加*】---------接口文档没有出
        "pofIsAllRound": "0", //公募用户信息是否完整0是1否--------接口文档没出
        "sex": "0",

        "age": "18", //年龄--------------------------------------------以下字段wap中未用到
        "knowledgeQuestionStatus": '1', //0 未通过 1 通过


        //--------------------------------------------以下字段wap中未用到
        'accreditedInvestor|1': ["0", "2"], //合格投资者状态  是否合格投资者 空-未做； 0-未通过；1-已通过； 2-已过期
        'accreditedInvestorValiddate': '2019-09-09', //合格投资者有效期
        "pu2prState": '2', //公转私签署状态 0未签约 1待签约 2已签约 3已拒绝
        "loginPhoneEncrypt": "", //Aes加密注册手机号
        "linkPhoneEncrypt": "", //Aes加密联系人手机号
        //'qualifyStatus|1':["0","1","2","3","4","5"],//审核状态【参照备注】--没有用到
        //'qualifyReason|1':['审核驳回原因'], //审核驳回原因-----没有用到
    }
});



module.exports = data;