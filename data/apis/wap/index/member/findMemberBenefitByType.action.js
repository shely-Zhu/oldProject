//推荐会员权益分类查询

module.exports={ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "处理成功！", 
	"data":
	{
		"pageList":[
			{ 
			"id": 16,//主键ID 
			"benefitNo":"",//权益编号
			"benefitClassific": "healthCare",//权益分类（见备注） 
			"benefitShortName": "",//权益名称
			"benefitName": "恒天财富乐享人生",//权益简称
			"coverPhoto": "../static/img/banner.png",//封面图片 
			"benefitAbstract": "",//权益简介
			"benefitUrl": "",//权益链接
			"activityTime": "",//活动时间
			"activityPlace": "",//活动地点 
			"hotline": "",//咨询热线（无；400客服）
			"shareTitle": "",//分享标题
			"shareAbstract": "",//分享简介
			"sharePhoto": "",//分享图片
			"benefitContent": "",//权益内容
			} ,
			
		],
		"pageItems": { 
			"slider": [1],//页码条 
			"hasPrePage": false,//是否有上一页 
			"startRow": 1,  //开始行条目数 
			"offset": 0,//历史条数 
			"lastPage": true,//当前是否为尾页 
			"prePage": 1,  //上一页码 
			"hasNextPage": false,//是否有下一页 
			"nextPage": 1,//下一页码 
			"endRow": 2,//结尾行条目数 
			"totalCount": 2,//总条数 
			"firstPage": true,//当前是否为首页 
			"totalPages": 3,//总页数 
			"limit": 2,//当前页显示条数 
			"page": 1//当前页码 
		} 
	} 
}