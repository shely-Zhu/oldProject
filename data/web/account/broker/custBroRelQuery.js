/*
  理财师关系接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({ 
	hmac:"", 
	code:"",//错误码     
	status:"",     
	message:"success", 
	total_conut:"",//总记录数 
	total_page:"",//总页数
	//理财师列表(专属和服务) 
	// data:[]
	data: { 
	 	"advisor|3": [ 
		   	{ 
				brokerAccount:"H013071", //工号 
				brokerName:["张箬","意义"],//姓名 
				careerStatus:"0",//员工状态 0：正常 1：离职 2：锁定 
				mobileTel:"18600760021",//手机号码 
			    address:"北京市",//地址
				dptName:"技术开发部" ,//员工部门
				isMain:"1", //是否为专属0：否 1：是 
				isCertificate: 'Y',  //是否通过基金从业考试 Y：通过 N：未通过
		    }
	 	], 
	 	// advisor:[],
		existMain: "1"  ,  //1：有专属 0：无专属 
		mobile:'18600754301'
	}, 
});

module.exports=data;