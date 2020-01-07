

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock(	
    {
    "status": "0000",
    "message": "操作成功",
    "data": [
        {
            linkAddress: "http://news.windin.com/bulletin/49594213.pdf?mediatype=03&&pkid=49594213&&id=105930564",
            materialType: "2",
        },{
            linkAddress: "http://news.windin.com/bulletin/31652977.pdf?mediatype=03&&pkid=31652977&&id=91347120",
            materialType: "1",
        }
    ]
    });

module.exports = data;