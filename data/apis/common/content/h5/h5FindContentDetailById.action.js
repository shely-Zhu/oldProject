/*
    app帮助中心接口
*/

// 使用 Mock
var Mock = require('mockjs');

var h5FindContentDetailById = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
    	"id":919,
    	"title":"爆款基金来袭，如何挑选好基金",
    	"introduction":"爆款基金来袭，如何挑选好基金",
    	"subject_tag":"",
    	"clicksNum":395,
    	"productType":"",
    	"content":"<p><img src=\"https://s.chtfund.com/upload/ue/image/20180212/1518428739363086274.jpg\" title=\"1518428739363086274.jpg\" alt=\"公募专题——20180130.jpg\"/></p>",
    	"releaseDate":"2018-02-12",
    	"reportDate":null,
    	"reportSource":"",
    	"targetUrl":""
    }
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = h5FindContentDetailById;
