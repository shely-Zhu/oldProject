/*
* @page: 内容列表展示
* @Author: songxiaoyu
* @Date:   2019-04-01 16:46:28
* @Last Modified by:   songxiaoyu
* @description:
*/

// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var data = Mock.mock({ 
    "hmac": "hmac", 
    "status": "0", 
    "code": "CS0000", 
    "msg": "处理成功！", 
    "data": {
        "pageList|2":[ 
            { 
                "category":"appspecial",//类型（标志位） 
                "id": 16,//主键ID 
                "isSubject":"",//是否专题页【0 不是；1是】 
                "imageUrl": "https://s.hengtianjf.com//upload/htmall/images/banner/777deb8e-7429-4df2-b891-9357eed26bc5.jpg",//图片URL 
                "title": "内容title",//标题 
                "introduction": "这是内容简介这是内容简介这是内容简介这是内容简介这是内容简介这是内容简介",//简介 
                "targetUrl": "http://www.baidu.com",//目的URL 
                "subject_tag":"阳光私募",//专题标签 
                "releaseDate": "2016-07-28",//发表日期 
                "reportDate": "2016-07-28",//报道日期 
                "reportSource": "凤凰网",//来源 
                "clicksNum": "109",//阅读数 
                "content":'<p><span style="color: rgb(255, 0, 0);"><strong>分享规则</strong></span></p><p>规则规则规则规则规则规则</p><p>规则规则规则规则规则规则</p><p>规则规则规则规则规则规则</p><p>规则规则规则规则规则规则</p>'
            }], 
        "pageItems": { 
            "slider": [//页码条 
                1 
            ], 
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
            "totalPages": 1,//总页数 
            "limit": 2,//当前页显示条数 
            "page": 1//当前页码 
        } 
    }
});


module.exports = data;