/*

首页数据模拟---banner、video等

*/

// 使用 Mock
var Mock = require('mockjs');

var img_url = ['/index/static/img/index/video.jpg',
'/index/static/img/index/banner.jpg',
'/index/static/img/index/news.jpg',
'/index/static/img/index/advert1.jpg',
'/index/static/img/index/advert2.jpg'];



// var static_data = {
// 	"id|+1": 0,
// 	"activityName|1-4": "活动名称",
// 	'imgUrl|1' : img_url,
// 	'linkUrl' : 'http://'
// }

//开始造假数据…………………………………………………………………………………………………………………………………………………………
//共10个

//1. 新首页banner
var newpcindextop = Mock.mock({
  "hmac": "hmac",
  "status": 0,
  "code": "CS0000",
  "msg": "处理成功！",
  'data|6':[{
		"id|+1": 0,
		"activityName": "新首页banner",
		'imgUrl|1' : img_url,
		'linkUrl' : "http://localhost:3000/name"
	}]
});

//2. 上屏广告
var topadvertise = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    'data':[{
			"id|+1": 0,
			"activityName": "上屏广告",
			'imgUrl|1' : img_url,
			'linkUrl' : "http://localhost:3000/name"
		}]
});

//3. 上屏视频
var topvideo = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    'data|2':[{
			"id|+1": 0,
			"activityName|1-4": "上屏视频",
			'imgUrl|1' : img_url,
			'linkUrl' : "http://localhost:3000/name"
		}]
});

//4. 新首页上banner
var topbanner = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    'data':[{
			"id|+1": 0,
			"activityName|1-4": "新首页上banner",
			'imgUrl|1' : img_url,
			'linkUrl' : "http://localhost:3000/name"
		}]
});

//5. 新首页中banner
var centrebanner = Mock.mock({
    "hmac": "hmac",
   "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    'data':[{
  		"id|+1": 0,
  		"activityName|1-4": "新首页中banner",
  		'imgUrl|1' : img_url,
  		'linkUrl' : "http://localhost:3000/name"
  	}]
});

//6. 新首页下banner
var lastbanner = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    'data':[{
    		"id|+1": 0,
    		"activityName|1-4": "新首页下banner",
    		'imgUrl|1' : img_url,
    		'linkUrl' : "http://localhost:3000/name"
    	}]
});

//7. 新首页广告位1
var advertiseone = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    'data':[{
    		"id|+1": 0,
    		"activityName|1-4": "新首页广告位1",
    		'imgUrl|1' : img_url,
    		'linkUrl' : "http://localhost:3000/name"
    	}]
	})

//8. 新首页广告位2
var advertisetwo = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    'data':[{
    		"id|+1": 0,
    		"activityName|1-4": "新首页广告位2",
    		'imgUrl|1' : img_url,
    		'linkUrl' : "http://localhost:3000/name"
    	}]
	})

//9. 下屏视频
var lastvideo = Mock.mock({
	"hmac": "hmac",
  "status": 0,
  "code": "CS0000",
  "msg": "处理成功！",
  'data':[{
  		"id|+1": 0,
  		"activityName|1-4": "下屏视频",
  		'imgUrl|1' : img_url,
  		'linkUrl' : "http://localhost:3000/name"
  	}]
})

//10. 合作伙伴
var cooperativepartner = Mock.mock({
  "hmac": "hmac",
  "status": 0,
  "code": "CS0000",
  "msg": "处理成功！",
  'data|10':[{
  		"id|+1": 0,
  		"activityName|1-4": "合作伙伴",
  		'imgUrl' : '/index/static/img/index/video.jpg',
  		'linkUrl' : "http://localhost:3000/name"
  	}]
})

//11.二级页面广告位1
  var sladvertiseone = Mock.mock({
    "hmac": "hmac",
    "status|0-1": 1,
    "code": "CS0000",
    "msg": "处理成功！",
    'data':[{
        "id|+1": 0,
        "activityName|1-4": "二级页面广告位1",
        'imgUrl|1' : "/index/static/img/secPage/ad.png",
        'linkUrl' : "http://localhost:3000/name"
      }]
  })

//11.二级页面广告位2
var sladvertisetwo = Mock.mock({
  "hmac": "hmac",
  "status|0-1": 1,
  "code": "CS0000",
  "msg": "处理成功！",
  'data':[{
      "id|+1": 0,
      "activityName|1-4": "二级页面广告位2",
      'imgUrl|1' : "/index/static/img/secPage/ad.png",
      'linkUrl' : "http://localhost:3000/name"
    }]
})

//11.公募首页banner
var pofBanner = Mock.mock({
  "hmac": "hmac",
  "status|0": 0,
  "code": "CS0000",
  "msg": "处理成功！",
  'data|3':[{
      "id|+1": 0,
      "activityName|1-4": "二级页面广告位2",
      'imgUrl|1' : "/index/static/img/secPage/ad.png",
      'linkUrl' : "http://localhost:3000/name"
    }]
})
//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = [
	{
	  params: {
	  	'params[adPosition]' : 'newpcindextop'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: newpcindextop
	},
	{
	  params: {
	  	'params[adPosition]' : 'topadvertise'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: topadvertise
	},
	{
	  params: {
	  	'params[adPosition]' : 'topvideo'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: topvideo
	},
	{
	  params: {
	  	'params[adPosition]' : 'topbanner'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: topbanner
	},
	{
	  params: {
	  	'params[adPosition]' : 'centrebanner'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: centrebanner
	},
	{
	  params: {
	  	'params[adPosition]' : 'lastbanner'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: lastbanner
	},
	{
	  params: {
	  	'params[adPosition]' : 'advertiseone'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: advertiseone
  },
	{
	  params: {
	  	'params[adPosition]' : 'advertisetwo'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: advertisetwo
	},
	{
	  params: {
	  	'params[adPosition]' : 'lastvideo'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: lastvideo
	},
	{
	  params: {
	  	'params[adPosition]' : 'cooperativepartner'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: cooperativepartner
	},
  {
    params: {
      'params[adPosition]' : 'sladvertiseone'   //要在左边的对比参数上加[]，不然比对不上
    },
    response: sladvertiseone
  },
  {
    params: {
      'params[adPosition]' : 'sladvertisetwo'   //要在左边的对比参数上加[]，不然比对不上
    },
    response: sladvertisetwo
  },
  {
    params: {
      'params[adPosition]' : 'pofBanner'   //要在左边的对比参数上加[]，不然比对不上
    },
    response: pofBanner
  }

]
