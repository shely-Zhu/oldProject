/*
  超宝基金产品-交易记录
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({ 
	"status": "0000",
    "message": "操作成功",
    data: [
        {
            "modulename":"新模板.pdf",//电子合同名称
            
            "contracturl":"/home/nfs/cfca/ht/20190510/31504/新模板.pdf",//电子合同地址
        }
    ]
});

module.exports=data;