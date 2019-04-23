/*
	首页 内容管理
*/


// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var pOver = Mock.mock({
    "hmac": "hmac",
    "status": "0000",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
        "pageNum": 1, //总页数
        "pageSize": 1, // 每页数量
        /*"pageList|2": [{
            "category": "appspecial", //类型（标志位） 
            "id": 16, //主键ID 
            "isSubject": "", //是否专题页【0 不是；1是】 
            "imageUrl": "https://s.hengtianjf.com//upload/htmall/images/banner/777deb8e-7429-4df2-b891-9357eed26bc5.jpg", //图片URL 
            "title": "内容title内容title内容title内容title", //标题 
            "introduction": "这是内容简介这是内容简介这是内容简介这是内容简介这是内容简介这是内容简介", //简介 
            "targetUrl": "http://www.baidu.com", //目的URL 
            "subject_tag": "阳光私募", //专题标签 
            "releaseDate": "2016-07-28", //发表日期 
            "reportDate": "2016-07-28", //报道日期 
            "reportSource": "凤凰网", //来源 
            "clicksNum": "109", //阅读数 
            "content": '<p><span style="color: rgb(255, 0, 0);"><strong>分享规则</strong></span></p><p>规则规则规则规则规则规则</p><p>规则规则规则规则规则规则</p><p>规则规则规则规则规则规则</p><p>规则规则规则规则规则规则</p>'
        }],*/
        "pageList":[]

    }
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;