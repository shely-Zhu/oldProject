/*
个人中心实名认证
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var realname = Mock.mock({
    "hmac":"", //预留字段
    "msg": "success",
    "code":"",//错误码
    "status": "0",
    /*"data":  {
		'badRecord':"0",
		'badRecordReason':"",
		'beneficiary':"涵涵",
		'birthday':"19930212",
		'businessScope':"",
		'clientId':"168288",
		'contactName':"",
		'decisionMaker':"范德萨发",
		'idNoEncrypt':"3715**********1623",
		'id_kind_gb':"0",
		'id_kind_gb_desc':"身份证",
		'id_no':"371533199202121783",
		'idnovalidDate':"2027-12-28",
		'isDecisionMaker':"1",
		'maskName':"涵涵",
		'messageAddress':"嘉盛",
		'nationality':"156",
		'nationalityDesc':"中国",
		'officeAddress':"",
		'orgHolding':"范德萨发",
		'orgType':"",
		'orgTypeDesc':"",
		'productSubclass':"",
		'productSubclassDesc':"",
		'productType':"",
		'productTypeDesc':"",
		'recordOrg':"",
		'recordOrgDesc':"",
		'regAddress':"",
		'sex':"1",
		'sexDesc':"男",
		'vocation':"1",
		'vocationDesc':"政府部门",
    }*/
    "data": {}
});

module.exports=realname;