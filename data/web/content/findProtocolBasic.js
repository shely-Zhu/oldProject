/*

超宝---根据产品代码查询协议基本信息

*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "data":[
        {
            "catagory": "0",//类型【请参照备注】
            "id": "1",//协议ID
            "title": "申请专业投资者 "//协议名称
        }, {
            "catagory": "4",//类型【请参照备注】
            "id": "2",//协议ID
            "title": "现金宝 "//协议名称
        },
    ],
    "message":"操作成功！",
    "status":"0000"
});
module.exports=data;
