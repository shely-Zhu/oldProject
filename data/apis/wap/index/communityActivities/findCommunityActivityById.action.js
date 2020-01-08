/*
    社区活动
*/


// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var findCommunityActivityById = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
        "id": 16, //主键ID 
        "actName": "恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一", //社区活动名称
        "serialNumber": "", //序列号
        "actPlace": "这是地点", //活动地点
        "actIntroduce": "恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一恒天对话系列活动一", //活动介绍
        "beginTime": "2010-89", //开始时间
        "isWarmUp": "1", //是否预热中 0否 1是
        "isOpenServer": "", //是否开启服务 0否 1是
        "imgUrl": "/index/static/img/2.png", //图片
        "enrollNum": "400", //报名人数
        "actUrl":"http://vod.butel.com/734c64ef-b924-48f9-bfcd-2c79fb377263.m3u8",
    }
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = findCommunityActivityById;