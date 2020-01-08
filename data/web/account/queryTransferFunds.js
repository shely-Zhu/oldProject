

var Mock = require('mockjs');

//这里直接返回的就是JSON格式
var data = Mock.mock({
    "data": [
        {
            fundCode: "000846",
            fundName: "中融货币C",
        },{
            fundCode: "000847",
            fundName: "中融货币A",
        },{
            fundCode: "003075",
            fundName: "中融超宝",
        }
    ],
    message: "操作成功！",
    status: "0000",
});
module.exports = data;