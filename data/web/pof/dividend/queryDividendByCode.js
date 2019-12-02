


/*
  单只基金分红查询
  http://192.168.6.105:8090/pages/viewpage.action?pageId=9470018#id-%E5%85%AC%E5%8B%9FWEB%E6%A8%A1%E5%9D%97-21.%E5%8D%95%E5%8F%AA%E5%9F%BA%E9%87%91%E5%88%86%E7%BA%A2%E6%96%B9%E5%BC%8F%E6%9F%A5%E8%AF%A2
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "data": [{
    	"autoBuy": "1", // 分红方式 

    	"autoBuyDes": "现金分红", // 分红方式说明 

    	"remark": "你的分红方式还没有确认", //备注说明 

    	"checkFlag": "" //是否被选中

    }, {
    	"autoBuy": "1", // 分红方式 

    	"autoBuyDes": "现金分红", // 分红方式说明 

    	"remark": "你的分红方式还没有确认", //备注说明 

    	"checkFlag": "1" //是否被选中

    }],
    "message": "操作成功！",
    "status": "0000"
});

module.exports = data;