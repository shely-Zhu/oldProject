/*
 * 所有资产
 */

var Mock=require("mockjs") ;

var data=Mock.mock({
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "处理成功！", 
	"data":{ 
		totalAssets: "10,180,000.00"//公募+私募+金交所总资产【千分位展示,保留两位小数,单位：元】 
	} 
})
module.exports=data;