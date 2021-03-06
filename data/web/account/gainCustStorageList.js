/*
  客户查询多个存证文件查询接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({    
	status:"0000",     
	msg:"success",
	data: [{
		ordernum: 123, // 预约单号
		custNo: 456, // 客户编号
		custName: '张哈哈', // 客户姓名
		custConfirmFlag: 0, // 客户确认标志 0-未确认  1-已确认
		fundcode: '000846', // 基金代码
		sourceType: 1, // 系统类型  1-私募  2-公募基金 3-公募组合基金
		storageTime: '2019-10-15', // 存证时间
		storageFilePath: 'http://baidu.com', // 文件路径
		storageFileName: '确认单', // 文件名称
		storageGroupName: '分组', //  文件服务器组名
		storageRelId: '666', // 项目id 或 基金代码 或 组合基金编号
		storageRelName: '小叮当' // 项目名称 或 基金名称 或 组合基金名称
	}]
});

module.exports=data;