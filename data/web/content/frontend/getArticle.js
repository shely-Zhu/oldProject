//文章模板模拟数据
// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
  "data": {
    "applyType": "2",
    "articleBelong": "3",//文章归属（字典）
    "articleTimeStr": "11:34",//音频播放时间
    "author": "purpleZhao",//作者
    "buttonLabel": "立即转入现金管理",//按钮文案
    "content": "证券是多种经济权益凭证的统称，也指专门的种类产品，是用来证明券票持有人享有的某种特定权益的法律凭证。证券是多种经济权益凭证的统称，也指专门的种类产品，是用来证明券票持有人享有的某种特定权益的法律凭证。",
    "createId": "H023512",
    "createName": "",
    "createTime": 1573085434000,
    "createTimeStr": "2019-11-07 08:10:34",
    "externalUrl": "",
    "h5Title": "模板页面",//模板title
    "h5Type": "1",//模板类型
    "id": 8,
    "imageAttachId": 56,
    "imageAttachName": "",
    //"imageAttachUrl": "http://172.16.163.99:85/group2/M00/02/88/rBCjRF26j3-AaxveAAFKebrcAVE531.jpg",//在线图片路劲
    "intro": "kaixuan3",
    "isDelete": 0,
    "isUse": 1,
    "memo": "",
    "modelId": 22,
    "needLogin": null,
    "needRisk": null,
    "pubId": "",
    "pubName": "",
    "pubTime": null,
    "pubTimeStr": "",
    "recomCodes": "",
    "recomTypes": null,
    "seqNo": null,
    "source": "",
    "title": "文章标题文章标题文章标题文章标题文章标文章标题文章标题文章标题题文章标题",
    "updateId": "H016691",
    "updateName": "",
    "updateTime": 1574937540000,
    "updateTimeStr": "2019-11-28 18:39:00",
    "videoAttachId": null,
    "videoAttachName": "",
    "videoAttachUrl": "",
    "voiceAttachId": null,
    "fileSize":"15.27MB",
    "imageAttachUrl":"/include/img/arcticleheaderimg.png",
    "voiceAttachName": "音频附件名音频附件名称音频附件名称音频附件名称音频附件名称音频附件名称称",
    "voiceAttachUrl": "http://train-vedio.test.upcdn.net/lgb/voice/richgo_15687904592044433.mp3",//http://train-vedio.test.upcdn.net/lgb/voice/richgo_15687904592044433.mp3    z在线视频地址
    "videoExternalUrl":"htjj-vod.homecdn.com/50216f89-68b6-4d0a-adb0-03af0df3efe4.m3u8",//http://htjj-vod.homecdn.com/50216f89-68b6-4d0a-adb0-03af0df3efe4.m3u8   播放视频url
  },
  "message": "操作成功！",
  "status": "0000"
});

module.exports = data;