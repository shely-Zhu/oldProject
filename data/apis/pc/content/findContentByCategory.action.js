/*

首页数据模拟-----内容管理

*/

// 使用 Mock
var Mock = require('mockjs');

var img_url = ['/index/static/img/index/video.jpg','/index/static/img/index/banner.jpg',
'/index/static/img/index/news.jpg','/index/static/img/index/advert1.jpg',
'/index/static/img/index/advert2.jpg'];


var source = ["凤凰网","百度","新浪","搜房","腾讯","我爱我家","搜狐","360","阿里巴巴"];

var mock_data = {
		"id|+1": 0,
		"isSubject|0-1": 1 ,//是否专题页  0 不是；1是
		'imageUrl|1' : img_url,
		"title|1-5" : "标题是标题是标题是" ,
		"introduction|1-20": "内容概要",//简介
		'targetUrl' : "http://www.baidu.com",
		"releaseDate": Mock.Random.date('yyyy-MM-dd'),//发表日期
		"reportSource|1": source//来源
	}

/*****

产品专题---more的时候category   详情的时候不用加
理财问答、理财百科----more的时候category   详情的时候category id
权威资讯----more的时候category   详情的时候category id

剩下的找紫云

*****/

//开始造假数据…………………………………………………………………………………………………………………………………………………………
//共8个

//1. 网站公告
var notice = Mock.mock({
  "hmac": "hmac",
  "status": 0,
  "code": "CS0000",
  "msg": "处理成功！",
  'data':{
  	'pageList|6' : [mock_data],
  	'pageItems' : {}
  }
});

//2. 金服动态、 金服研究
var dynamic_study = Mock.mock({
    "hmac": "hmac",
	  "status": 0,
	  "code": "CS0000",
	  "msg": "处理成功！",
	  'data':{
	  	'pageList|3' : [mock_data],
	  	'pageItems' : {}
	  }
});

//2. 权威咨询 
var news = Mock.mock({
    "hmac": "hmac",
	  "status": 0,
	  "code": "CS0000",
	  "msg": "处理成功！",
	  'data':{
	  	'pageList|7' : [{
	  		"category" : "news",
			"id|+1": 0,
			"isSubject|0-1": 1 ,//是否专题页  0 不是；1是
			'imageUrl|1' : img_url,
			"title|1-5" : "标题是标题是标题是" ,
			"introduction|1-200": "内容概要",//简介
			'targetUrl' : "http://www.baidu.com",
			"releaseDate": Mock.Random.date('yyyy-MM-dd'),//发表日期
			"reportSource|1": source//来源
		}],
	  	'pageItems' : {
	  		"totalPages": 8,//总页数
	  		"totalCount": 20//总条数
	  	}
	  }
});


//3. 产品专题
var special = Mock.mock({
    "hmac": "hmac",
	  "status": 0,
	  "code": "CS0000",
	  "msg": "处理成功！",
	  'data':{
	  	'pageList|6' : [{
	  		"category" : "special",
			"id|+1": 0,
			"isSubject|0-1": 1 ,//是否专题页  0 不是；1是
			'imageUrl|1' : img_url,
			"title|1-5" : "标题是标题是标题是" ,
			"introduction|1-200": "内容概要",//简介
			'targetUrl' : "http://www.baidu.com",
			"releaseDate": Mock.Random.date('yyyy-MM-dd'),//发表日期
			"productType|1": source//来源
		}],
	  	'pageItems' : {
	  		"totalPages": 8,//总页数
	  		"totalCount": 20//总条数
	  	}
	  }
});

//4. 媒体报道
var newsreport = Mock.mock({
    "hmac": "hmac",
	  "status": 0,
	  "code": "CS0000",
	  "msg": "处理成功！",
	  'data':{
	  	'pageList|4' : [mock_data],
	  	'pageItems' : {}
	  }
});

//5.理财问答  理财百科
var licai = Mock.mock({
    "hmac": "hmac",
	  "status": 0,
	  "code": "CS0000",
	  "msg": "处理成功！",
	  'data':{
	  	'pageList|4' : [{
	  		"category" : "financing",
			"id|+1": 0,
			"isSubject|0-1": 1 ,//是否专题页  0 不是；1是
			'imageUrl|1' : img_url,
			"title|1-5" : "标题是标题是标题是" ,
			"introduction|1-20": "内容概要",//简介
			'targetUrl' : "http://www.baidu.com",
			"releaseDate": Mock.Random.date('yyyy-MM-dd'),//发表日期
			"reportSource|1": source//来源
		}],
	  	'pageItems' : {
	  		"totalPages": 8,//总页数
	  		"totalCount": 20//总条数
	  	}
	  }
});


var encyclopedia = Mock.mock({
    "hmac": "hmac",
	  "status": 0,
	  "code": "CS0000",
	  "msg": "处理成功！",
	  'data':{
	  	'pageList|4' : [{
	  		"category" : "encyclopedia",
			"id|+1": 0,
			"isSubject|0-1": 1 ,//是否专题页  0 不是；1是
			'imageUrl|1' : img_url,
			"title|1-5" : "标题是标题是标题是" ,
			"introduction|1-20": "内容概要",//简介
			'targetUrl' : "http://www.baidu.com",
			"releaseDate": Mock.Random.date('yyyy-MM-dd'),//发表日期
			"reportSource|1": source//来源
		}],
	  	'pageItems' : {
	  		"totalPages": 8,//总页数
	  		"totalCount": 20//总条数
	  	}
	  }
});




//根据传参数的不同进行处理

module.exports = [
	{
	  params: {
	  	'params[category]' : 'notice'   //要在左边的对比参数上加[]，不然比对不上
	  	//console.log(params); 
	  },
  	response: notice
	},
	{
	  params: {
	  	'params[category]' : 'dynamic'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: dynamic_study
	},
	{
	  params: {
	  	'params[category]' : 'study'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: dynamic_study
	},
	{
	  params: {
	  	'params[category]' : 'news'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: news
	},
	{
	  params: {
	  	'params[category]' : 'special'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: special
	},
	{
	  params: {
	  	'params[category]' : 'newsreport'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: newsreport
	},
	{
	  params: {
	  	'params[category]' : 'financing'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: licai
	},
	{
	  params: {
	  	'params[category]' : 'encyclopedia'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: encyclopedia
	}

]
