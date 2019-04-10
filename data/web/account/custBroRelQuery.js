/*
  理财师关系接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({ 
	hmac:"", 
	code:"",//错误码     
	status:"",     
	msg:"success", 
	total_conut:"",//总记录数 
	total_page:"",//总页数
	//理财师列表(专属和服务) 
	// data:[]
	data: { 
	 	advisor: [ 
		   	{ 
			  	empNo:"H013071", //工号   //  broker_account
			 		codeName:"张箬",//姓名      broker_name
			 		careerStatus:"0",//员工状态 0：正常 1：离职 2：锁定   careerStatus
			 		mobileTel:"18600760021",//手机号码   mobileTel
			 		address:"北京市",//地址
			  	dptName:"技术开发部" ,//员工部门   dptName
			 		isMain:"0", //是否为专属0：否 1：是   isMain
		    },
		    { 
			  	empNo:"H013070", //工号 。
			 		codeName:"王荣祥",//姓名 
			 		careerStatus:"2",//员工状态 0：正常 1：离职 2：锁定 
			 		mobileTel:"18600760021",//手机号码 
			 		address:"北京市",//地址
			  	dptName:"技术开发部" ,//员工部门   
			 		isMain:"0", //是否为专属0：否 1：是 
		    },
		    { 
			  	empNo:"H013072", //工号 
			 		codeName:"刘红飞",//姓名 
			 		careerStatus:"2",//员工状态 0：正常 1：离职 2：锁定 
			 		mobileTel:"18600760021",//手机号码 
			 		address:"北京市",//地址
			  	dptName:"技术开发部" ,//员工部门
			 		isMain:"1", //是否为专属0：否 1：是 
		    }, 
	 	], 
	 	// advisor:[],
		existMain: "0"  ,  //1：有专属 0：无专属 
		mobile:'18600754301'
	}, 
});

module.exports=data;