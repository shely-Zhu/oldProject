/*
    社区活动
*/


// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var findExcellentMoments = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
        "pageList": [{
                "id": 1, //主键ID 
                "imgName": "", //图片名称
                "imgIntroduce": "这是图片介绍", //图片介绍
                "serialNumber": "", //序列号
                "imgUrl": "/about/static/img/baidu/club_01.png", //图片路径
                "imgThumbnailUrl": "https://s.chtfund.com//upload/htmall/images/excellentMoment/b2718df9-ee5a-466a-a3a7-4b8051c09fd5.jpg", //缩略图路径
            },
            {
                "id": 2, //主键ID 
                "imgName": "", //图片名称
                "imgIntroduce": "这是图片介绍", //图片介绍
                "serialNumber": "", //序列号
                "imgUrl": "/about/static/img/baidu/club_02.png", //图片路径
                "imgThumbnailUrl": "https://s.chtfund.com//upload/htmall/images/excellentMoment/e6041593-20a2-4846-b0af-3f4084126db8.jpg", //缩略图路径
            },
            {
                "id": 3, //主键ID 
                "imgName": "", //图片名称
                "imgIntroduce": "这是图片介绍", //图片介绍
                "serialNumber": "", //序列号
                "imgUrl": "/about/static/img/baidu/club_03.png", //图片路径
                "imgThumbnailUrl": "https://s.chtfund.com//upload/htmall/images/excellentMoment/eb8cc93c-194c-4128-82fc-769a548eebb5.jpg", //缩略图路径
            },
            {
                "id": 4, //主键ID 
                "imgName": "", //图片名称
                "imgIntroduce": "这是图片介绍", //图片介绍
                "serialNumber": "", //序列号
                "imgUrl": "/about/static/img/baidu/club_04.png", //图片路径
                "imgThumbnailUrl": "https://s.chtfund.com//upload/htmall/images/excellentMoment/b7f92ed2-6486-44a0-acaa-7eb9588c8673.jpg", //缩略图路径
            },
            {
                "id": 5, //主键ID 
                "imgName": "", //图片名称
                "imgIntroduce": "这是图片介绍", //图片介绍
                "serialNumber": "", //序列号
                "imgUrl": "/about/static/img/baidu/club_05.png", //图片路径
                "imgThumbnailUrl": "https://s.chtfund.com//upload/htmall/images/excellentMoment/6a058670-11bb-416a-a282-52f8b3f24ab7.jpg", //缩略图路径
            },
            {
                "id": 6, //主键ID 
                "imgName": "", //图片名称
                "imgIntroduce": "这是图片介绍", //图片介绍
                "serialNumber": "", //序列号
                "imgUrl": "/about/static/img/baidu/club_06.png", //图片路径
                "imgThumbnailUrl": "https://s.chtfund.com//upload/htmall/images/excellentMoment/b354ff36-8870-4a6c-8d26-fbbc453f7616.jpg", //缩略图路径
            },
            {
                "id": 7, //主键ID 
                "imgName": "", //图片名称
                "imgIntroduce": "这是图片介绍", //图片介绍
                "serialNumber": "", //序列号
                "imgUrl": "/about/static/img/baidu/club_07.png", //图片路径
                "imgThumbnailUrl": "https://s.chtfund.com//upload/htmall/images/excellentMoment/6f702e7c-b45e-41bb-b0c4-f431bafe891e.jpg", //缩略图路径
            },
            {
                "id": 8, //主键ID 
                "imgName": "", //图片名称
                "imgIntroduce": "这是图片介绍", //图片介绍
                "serialNumber": "", //序列号
                "imgUrl": "/about/static/img/baidu/club_08.png", //图片路径
                "imgThumbnailUrl": "https://s.chtfund.com//upload/htmall/images/excellentMoment/cd559691-4f34-49bd-97e5-525f280d55cc.jpg", //缩略图路径
            },
            {
                "id": 9, //主键ID 
                "imgName": "", //图片名称
                "imgIntroduce": "这是图片介绍", //图片介绍
                "serialNumber": "", //序列号
                "imgUrl": "/about/static/img/baidu/club_09.png", //图片路径
                "imgThumbnailUrl": "https://s.chtfund.com//upload/htmall/images/excellentMoment/1c76eab8-bcf4-4cdb-bd25-4c35dd7722f5.jpg", //缩略图路径
            },
            {
                "id": 10, //主键ID 
                "imgName": "", //图片名称
                "imgIntroduce": "这是图片介绍", //图片介绍
                "serialNumber": "", //序列号
                "imgUrl": "/about/static/img/baidu/club_10.png", //图片路径
                "imgThumbnailUrl": "https://s.chtfund.com//upload/htmall/images/excellentMoment/f279a1b0-e211-4da0-95e0-6fff799420a7.jpg", //缩略图路径
            },
            {
                "id": 11, //主键ID 
                "imgName": "", //图片名称
                "imgIntroduce": "这是图片介绍", //图片介绍
                "serialNumber": "", //序列号
                "imgUrl": "/about/static/img/baidu/club_11.png", //图片路径
                "imgThumbnailUrl": "https://s.chtfund.com//upload/htmall/images/excellentMoment/aab1c253-56e7-416b-b9a5-1e5ad5e37223.jpg", //缩略图路径
            },
            {
                "id": 12, //主键ID 
                "imgName": "", //图片名称
                "imgIntroduce": "这是图片介绍", //图片介绍
                "serialNumber": "", //序列号
                "imgUrl": "/about/static/img/baidu/club_12.png", //图片路径
                "imgThumbnailUrl":"https://s.chtfund.com//upload/htmall/images/excellentMoment/fac87c9e-5421-41d2-bb05-78ae157a0ef2.jpg", //缩略图路径
            },

        ],
        "pageItems": {
            "slider": [1], //页码条 
            "hasPrePage": false, //是否有上一页 
            "startRow": 1, //开始行条目数 
            "offset": 0, //历史条数 
            "lastPage": true, //当前是否为尾页 
            "prePage": 1, //上一页码 
            "hasNextPage": false, //是否有下一页 
            "nextPage": 1, //下一页码 
            "endRow": 2, //结尾行条目数 
            "totalCount": 2, //总条数 
            "firstPage": true, //当前是否为首页 
            "totalPages": 1, //总页数 
            "limit": 2, //当前页显示条数 
            "page": 1 //当前页码 
        }
    }
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = findExcellentMoments;