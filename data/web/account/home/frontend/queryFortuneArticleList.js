/*
  财富文章
*/

// 使用 Mock
var Mock = require('mockjs');

var liveData=Mock.mock({
    "data": {
        "pageNum": 1,
        "pageSize": 10,
        "total": 3,
        "pages": 0,
        "list|11": [{
            applyType: 0,
            articleBelong: "2", // 2 为大咖直播
            articleTime: "2019-11-27T00:00:00.000+0000",
            articleTimeStr: "2019-11-27 15:04:37",
            author: "H000503",
            content: "<p>DGFASDGADFGAEGADSG</p>",
            createId: "H000503",
            createName: "隋迎歌",
            createTime: "2019-11-27T07:04:37.000+0000",
            createTimeStr: "2019-11-27 15:04:37",
            externalUrl: "https://www.baidu.com/",
            h5Title: null,
            h5Type: null,
            id: 28,
            "imageAttachId": 56,
            "imageAttachName": "3c28af542f2d49f7-44af7693092324ab-c7519a05ba772541a9594edcae2a2fb1.jpg",
            "imageUrlShowOnline": "http://172.16.163.99:85/group2/M00/02/88/rBCjRF26j3-AaxveAAFKebrcAVE531.jpg",
            intro: "文章简介",
            isDelete: 0,
            isUse: 0,
            memo: null,
            modelId: 22,
            needLogin: null,
            needRisk: null,
            pubId: null,
            pubName: null,
            pubTime: null,
            pubTimeStr: null,
            seqNo: null,
            source: "来源：",
            title: "知识讲堂",
            updateId: "H000503",
            updateName: "隋迎歌",
            updateTime: "2019-11-27T07:04:37.000+0000",
            updateTimeStr: "2019-11-27 15:04:37",
            videoAttachId: null,
            videoAttachName: null,
            voiceAttachId: null,
            voiceAttachName: null
        }]
    },
    "status": "0000",
    "message": "操作成功！"
});

var knownData=Mock.mock({
    "data": {
        "pageNum": 1,
        "pageSize": 10,
        "total": 3,
        "pages": 0,
        "list|11": [{
            applyType: 0,
            articleBelong: "3", // 2 为大咖直播
            articleTime: "2019-11-27T00:00:00.000+0000",
            articleTimeStr: "2019-11-27 15:04:37",
            author: "H000503",
            content: "<p>DGFASDGADFGAEGADSG</p>",
            createId: "H000503",
            createName: "隋迎歌",
            createTime: "2019-11-27T07:04:37.000+0000",
            createTimeStr: "2019-11-27 15:04:37",
            externalUrl: "https://www.baidu.com/",
            h5Title: null,
            h5Type: null,
            id: 28,
            imageAttachId: 25,
            imageAttachName: null,
            "imageUrlShowOnline": "http://172.16.163.99:85/group2/M00/02/88/rBCjRF26j3-AaxveAAFKebrcAVE531.jpg",
            intro: "大咖直播",
            isDelete: 0,
            isUse: 0,
            memo: null,
            modelId: 22,
            needLogin: null,
            needRisk: null,
            pubId: null,
            pubName: null,
            pubTime: null,
            pubTimeStr: null,
            seqNo: null,
            source: "来源：",
            title: "文章标题：",
            updateId: "H000503",
            updateName: "隋迎歌",
            updateTime: "2019-11-27T07:04:37.000+0000",
            updateTimeStr: "2019-11-27 15:04:37",
            videoAttachId: null,
            videoAttachName: null,
            voiceAttachId: null,
            voiceAttachName: null
        }]
    },
    "status": "0000",
    "message": "操作成功！"
});

module.exports = [
    {
        params: {
            'articleBelong' : '2'   //要在左边的对比参数上加[]，不然比对不上 稳金
        },
        response: liveData
    },
    {
        params: {
            'articleBelong' : '3'   //要在左边的对比参数上加[]，不然比对不上 稳金
        },
        response: knownData
    }
]
