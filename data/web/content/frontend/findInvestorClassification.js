/*
    协议查询(含附件信息)
*/

// 使用 Mock
var Mock = require('mockjs');

var queryProtocols = Mock.mock(
{
    "hmac": "hmac",
    "status": "0000",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": [
    {
        "id": "2", //唯一性ID
        "title": "资料下载", //标题
        "isContent": "", //是否有内容
        "content":'',
        // "content": "尊敬的投资者，根据《证券期货投资者适当性管理办法》（以下简称“《管理办法》”），投资者类型分为普通投资者和专业投资者，符合《管理办法》第八条规定的为专业投资者。您可以向您的理财顾问了解专业投资者的条件，如申请成为专业投资者，需提交相应的证明文件；如您不满足专业投资者条件的，可申请成为普通投资者，普通投资者在信息告知、风险警示、适当性匹配等方面享有特别保护。",
        "isAccessory": "1", //是否包含附件（模板）【0.否；1.是】
        "accessorys": [ //附件集合
            {
                "accessoryName": "《收入证明》", //附件名称
                "accessoryUrl": "/upload/htmall/file/investor/397b9c6b-5a19-4810-9660-6425a2beb662.pdf" //附件Url
            },
            {
                "accessoryName": "《我是模板》", //附件名称
                "accessoryUrl": "/upload/htmall/file/investor/397b9c6b-5a19-4810-9660-6425a2beb662.pdf" //附件Url
            },
            {
                "accessoryName": "《专业投资者申请书》", //附件名称
                "accessoryUrl": "/upload/htmall/file/investor/397b9c6b-5a19-4810-9660-6425a2beb662.pdf" //附件Url
            }, //可含多个附件
        ],
    },
    {
        "id": "2", //唯一性ID
        "title": "参考资料", //标题
        "isContent": "", //是否有内容
        "content": "尊敬的投资者，根据《证券期货投资者适当性管理办法》（以下简称“《管理办法》”），投资者类型分为普通投资者和专业投资者，符合《管理办法》第八条规定的为专业投资者。您可以向您的理财顾问了解专业投资者的条件，如申请成为专业投资者，需提交相应的证明文件；如您不满足专业投资者条件的，可申请成为普通投资者，普通投资者在信息告知、风险警示、适当性匹配等方面享有特别保护。",
        "isAccessory": "1", //是否包含附件（模板）【0.否；1.是】
        "accessorys": [ //附件集合
            {
                "accessoryName": "《收入证明》", //附件名称
                "accessoryUrl": "http://www.baidu.com" //附件Url
            },
            {
                "accessoryName": "《我是模板》", //附件名称
                "accessoryUrl": "/upload/htmall/file/investor/397b9c6b-5a19-4810-9660-6425a2beb662.pdf" //附件Url
            },
            {
                "accessoryName": "《专业投资者申请书》", //附件名称
                "accessoryUrl": "/upload/htmall/file/investor/397b9c6b-5a19-4810-9660-6425a2beb662.pdf" //附件Url
            }, //可含多个附件
        ],
    }]
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = queryProtocols;