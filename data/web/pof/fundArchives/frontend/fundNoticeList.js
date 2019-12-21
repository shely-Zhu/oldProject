/*
	历史净值 净值走势图
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
//var financial = Mock.mock({"data":"","message":"操作成功,数据为空","status":"1000"})
var financial = Mock.mock({
	"status":"0000",
	"msg":"success",
	"data": {
		"totalCount": 20,
        "totalPage": 10,
		"pageList|10":[{
             "noticeId":"785",// 公告ID

             "noticeSecuId":"8563214",// 公告业务编码

             "publishDate":"2018-02-13",// 发布日期

             "title":"标题",// 标题

             "typCode":"1",//类型ID

             "typInfo":"类型说明",// 类型说明

             "linkAddress":"http://www.baidu.com",//链接地址

             "fileType":"2",//附件类型

            "contentLength":"85" //公告内容长度
		}]
	}
});


module.exports=financial;