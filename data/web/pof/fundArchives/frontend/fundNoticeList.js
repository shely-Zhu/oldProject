/*
	ÀúÊ·¾»Öµ ¾»Öµ×ßÊÆÍ¼
 */

// Ê¹ÓÃ Mock
var Mock = require('mockjs');


//ÕâÀïÖ±½Ó·µ»ØµÄ¾ÍÊÇJSON¸ñÊ½
//var financial = Mock.mock({"data":"","message":"²Ù×÷³É¹¦,Êý¾ÝÎª¿Õ","status":"1000"})
var financial = Mock.mock({
	"status":"0000",
	"msg":"success",
	"data": {
		"totalCount": 20,
        "totalPage": 10,
		"pageList|10":[{
             "noticeId":"785",// ¹«¸æID

             "noticeSecuId":"8563214",// ¹«¸æÒµÎñ±àÂë

             "publishDate":"2018-02-13",// ·¢²¼ÈÕÆÚ

             "title|1":["的都是浮动浮动发","回超出吗的都是浮动浮动发的都是浮动浮动发的都是浮动浮动发的都是浮动浮动发的都是浮动浮动发的都是浮动浮动发的都是浮动浮动发"],// ±êÌâ

             "typCode":"1",//ÀàÐÍID

             "typInfo|1":["的都是浮动浮动发"],// ÀàÐÍËµÃ÷

             "linkAddress":"http://www.baidu.com",//Á´½ÓµØÖ·

             "fileType":"2",//¸½¼þÀàÐÍ

            "contentLength":"85" //¹«¸æÄÚÈÝ³¤¶È
		}]
	}
});


module.exports=financial;