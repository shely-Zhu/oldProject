/*
    会员权益查询
 */

// 使用 Mock
var Mock = require('mockjs');

//这里直接返回的就是JSON格式
var queryClassification1 = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data|20":  [{ 
    	"id":"1",//权益唯一编号 
		"enjoy|1":["1","0"],//是否享有 0否 1是
		"rightName":"权益名称",//权益名称
		"iconUnlock":"https://s.chtfundtest.com//upload/htmall/images/content/64ba8d33-5eb5-4bec-9e33-5ef63a2339f7.png",//解锁图标
		"iconLocked":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//锁定图标
		"content":"",//富文本
		}
	]
});

var queryClassification2 = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data":  [{ 
    	"id":"1",//权益唯一编号 
		"enjoy":"1",//是否享有 0否 1是
		"rightName":"权益名称",//权益名称
		"iconUnlock":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//解锁图标
		"iconLocked":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//锁定图标
		"content":"",//富文本
		},{
		"id":"1",//权益唯一编号 
		"enjoy":"1",//是否享有 0否 1是
		"rightName":"权益名称",//权益名称
		"iconUnlock":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//解锁图标
		"iconLocked":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//锁定图标
		"content":"",//富文本
		},{ 
    	"id":"1",//权益唯一编号 
		"enjoy":"1",//是否享有 0否 1是
		"rightName":"权益名称",//权益名称
		"iconUnlock":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//解锁图标
		"iconLocked":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//锁定图标
		"content":"",//富文本
		},{
		"id":"1",//权益唯一编号 
		"enjoy":"1",//是否享有 0否 1是
		"rightName":"权益名称",//权益名称
		"iconUnlock":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//解锁图标
		"iconLocked":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//锁定图标
		"content":"",//富文本
		},{ 
    	"id":"1",//权益唯一编号 
		"enjoy":"1",//是否享有 0否 1是
		"rightName":"权益名称",//权益名称
		"iconUnlock":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//解锁图标
		"iconLocked":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//锁定图标
		"content":"",//富文本
		},{
		"id":"1",//权益唯一编号 
		"enjoy":"1",//是否享有 0否 1是
		"rightName":"权益名称",//权益名称
		"iconUnlock":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//解锁图标
		"iconLocked":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//锁定图标
		"content":"",//富文本
		},{ 
    	"id":"1",//权益唯一编号 
		"enjoy":"1",//是否享有 0否 1是
		"rightName":"权益名称",//权益名称
		"iconUnlock":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//解锁图标
		"iconLocked":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//锁定图标
		"content":"",//富文本
		},{
		"id":"1",//权益唯一编号 
		"enjoy":"1",//是否享有 0否 1是
		"rightName":"权益名称",//权益名称
		"iconUnlock":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//解锁图标
		"iconLocked":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//锁定图标
		"content":"",//富文本
		},{ 
    	"id":"1",//权益唯一编号 
		"enjoy":"0",//是否享有 0否 1是
		"rightName":"权益名称",//权益名称
		"iconUnlock":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//解锁图标
		"iconLocked":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//锁定图标
		"content":"",//富文本
		},

	]
});
var queryClassification3 = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data":  [{
    	"id":"1",//权益唯一编号 
		"enjoy":"1",//是否享有 0否 1是
		"rightName":"权益名称",//权益名称
		"iconUnlock":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//解锁图标
		"iconLocked":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//锁定图标
		"content":"",//富文本
		},{ 
		"id":"1",//权益唯一编号 	
		"enjoy":"1",//是否享有 0否 1是
		"rightName":"权益名称",//权益名称
		"iconUnlock":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//解锁图标
		"iconLocked":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//锁定图标
		"content":"",//富文本
		},{ 
		"id":"1",//权益唯一编号 	
		"enjoy":"1",//是否享有 0否 1是
		"rightName":"权益名称",//权益名称
		"iconUnlock":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//解锁图标
		"iconLocked":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//锁定图标
		"content":"",//富文本
		},{
		"id":"1",//权益唯一编号  
		"enjoy":"0",//是否享有 0否 1是
		"rightName":"权益名称",//权益名称
		"iconUnlock":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//解锁图标
		"iconLocked":"https://s.chtfundtest.com//upload/htmall/images/content/8eea9d9f-0409-4ac5-bc79-6b1837298e7a.png",//锁定图标
		}

	]
});
var content1 = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data":  [{ 
		"enjoy":"1",//是否享有 0否 1是
		"rightName":"权益名称",//权益名称
		"iconUnlock":"",//解锁图标
		"iconLocked":"",//锁定图标
		"content":"富文本",//富文本
		}

	]
});
module.exports = [
	{
	  params: {
	  	'params[level]' : '1'   //要在左边的对比参数上加[]，不然比对不上
	  	//console.log(params); 
	  },
  	response: queryClassification1
	},
	{
	  params: {
	  	'params[level]' : '2'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: queryClassification2
	},{
	  params: {
	  	'params[level]' : '3'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: queryClassification2
	},
	{
	  params: {
	  	'params[id]' : '1'   //要在左边的对比参数上加[]，不然比对不上
	  },
  	response: content1
	},
	

]