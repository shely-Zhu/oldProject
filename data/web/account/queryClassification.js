/*
    投资者分类查询
 */

// 使用 Mock
var Mock = require('mockjs');

//这里直接返回的就是JSON格式
var queryClassification = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
        "name": "自然人", //自然人名称或机构名称
        "investType": "1", //当前申请中的投资分类【0普通投资者申请 1专业投资者申请 2普转专 3专转普】
        "auditStatus": "2", //审核状态【参照备注】[0：待审核 1：审核通过 2：审核驳回 3：已撤销]
        "auditStatusDic": "审核状态字典值", //审核状态字典值
        "auditOption": "这是审核失败原因", //审核驳回原因
        "auditDate": "2016-11-07", //审核日期
        "fileList": [{
            "storageId": "文件id", //文件id
            "fileName": "name", //文件名称 
            "filePath": "文件路径", //文件路径
            "fileType": "0", //文件类型  0： 文档类   1：  视频类   2：图片类
            "groupName": "0", //组名称(下载使用)
            "thumbnailPath": "", //缩略图路径
        }]
    }
});
module.exports = queryClassification;