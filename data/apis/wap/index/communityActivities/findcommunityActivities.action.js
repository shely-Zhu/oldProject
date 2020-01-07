/*
	社区活动
*/


// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var findcommunityActivities = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
        "pageList|3": [{
            "id": 16, //主键ID 
            "actName": "这是社区活动", //社区活动名称
            "serialNumber": "", //序列号
            "actPlace": "这是活动地点", //活动地点
            "actIntroduce": "", //活动介绍
            "beginTime": "2017-0-0", //开始时间
            "isWarmUp": '0', //是否预热中 0否 1是
            "isOpenServer": "", //是否开启服务 0否 1是
            "imgUrl": "", //图片
            "enrollNum": "", //报名人数
        }],
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

module.exports = findcommunityActivities;
