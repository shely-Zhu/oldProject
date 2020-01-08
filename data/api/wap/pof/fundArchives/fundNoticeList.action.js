/*
	基金公告
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var financial = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "FP0001",
    "msg": "处理成功！",
    'data':{
        // pageItems：{
	       //   totalCount:””,// 总记录数
	       //   totalPages:”” //总页数
        //  },
		 "pageList|12":[
		    {
		         "noticeId":"423",// 公告ID
		         "noticeSecuId":"234234",// 公告业务编码
		         "publishDate":"2013-02-03",// 发布日期
		         "title":"阿道夫噶第三方的说法的是发送到发送到发送到发送到",// 标题
		         "typCode":"234234",//类型ID
		         "typInfo":"阿萨德飞阿萨德飞",// 类型说明
		         "linkAddress":"www.baidu.com",//链接地址
		         "fileType":"324",//附件类型
		        "contentLength":"6" //公告内容长度
	        }
		]
  	}
  });

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理
/*module.exports = [
  {
    params: {name: 1},  //name等于1的时候，返回{error:'error'}
    response: {
      error: 'error'
    }
  }, {
    params: {name: 2},  //name等于2的时候，返回data
    response: data
  }
]*/
module.exports=financial;