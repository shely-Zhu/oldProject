/*
 * 金交所持仓
 */

var Mock=require("mockjs") ;

var data=Mock.mock({
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "处理成功！", 
	"data":{ 
		"pageItems": { 
			"totalCount": "100",//总记录数 
			"totalPages": "10"//总页数 
		}, 
		"pageList|0":[ 
			{ 
			"prjName": "护发回复火箭发射房间号",//产品名称 
			"balance":"150,000",//总资产【千分位展示,保留两位小数,单位：元】 
			"deadLine": "24个月",//产品期限
			"profit": "1.4%",//票面利率【百分比】
			"setupDate": "2016-08-09" //成立日期【格式yyyy-mm-dd】
			}, 
			{ 
			"prjName": "怪盗基德嫁汉嫁汉",//产品名称 
			"balance":"150,000",//总资产【千分位展示,保留两位小数,单位：元】 
			"deadLine": "24个月",//产品期限
			"profit": "1.4%",//票面利率【百分比】
			"setupDate": "2016-08-10" //成立日期【格式yyyy-mm-dd】
			}, 
		] 
	} 
})
module.exports=data;