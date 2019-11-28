/*
  财富文章
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({
    "data": {
        "pageNum": 1,
        "pageSize": 10,
        "total": 3,
        "pages": 0,
        "list|11": [{
            applyType: 0,
            articleBelong: "1",
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
            imageAttachId: "/homePage/static/img/picture1_1@2x.png",
            imageAttachName: null,
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

module.exports=data;
