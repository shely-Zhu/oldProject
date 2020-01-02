/*

  金服活动详情

*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "status":0000,
    "message": "获取已报名活动成功",
    "data":{
        "activityVOPageInfo": {
            "list": [
                {
                    actId: 16826,
                    actName: "01-23财富沙龙",
                    actType: 2,
                    arriveTime: 1574842164000,
                    channelCode: 0,
                    enterTime: 1515205885000,
                    htjfGeneralizeImgUrl: "http://172.16.163.99:85/group1/M00/06/ED/rBCjPl3V-GCAdzrzAA4bEjEpcqc425.gif",
                    preferential: "123",
                    status: 1,
                }, {
                    actId: 14817,
                    actName: "bbb个人理顾宝金服展示非老带新",
                    actType: 1,
                    arriveTime: null,
                    channelCode: 0,
                    enterTime: 1528270300000,
                    htjfGeneralizeImgUrl: "http://172.16.163.99:85/group1/M00/06/ED/rBCjPl3V-GCAdzrzAA4bEjEpcqc425.gif",
                    preferential: "面额30元京东E卡",
                    status: 0,
                }
            ]
    
        },
        "defaultRecommend": {
            countdown: null,
            filePath: "http://172.16.163.99:85/group1/M00/06/ED/rBCjPl3V-GCAdzrzAA4bEjEpcqc425.gif",
            id: 175,
            imageUrlShowOnline: "group2/M00/06/EC/rBCjPl3VCCSAQ1ZPAAOowHC5cZ8551.jpg",
            imgUrlDownLoad: "?filePath=M00/02/8B/rBCjQ13M78CARMyLAABNuUnwH_k949.jpg&fileName=5LiK5Lyg55SoMS5qcGc=&groupName=group2",
            linkType: "2",
            linkUrl: "20",
            title: "双十一活动",
        }
    }
    
});
module.exports = data;