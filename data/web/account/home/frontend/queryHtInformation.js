


/*
  了解恒天列表
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({ 
	code:"",//错误码     
	status:"0000",     
	message:"success", 
	data: { 
        "modelName":'1',
        'manageAndServiceList|4':[
            {
                "titleFst|1":['了解恒天',"公司荣誉","战斗力","持久力"],//理财师名字
                "descr":'H012345',//理财师工号
        ]
	 	
	}, 
});

module.exports=data;