/*
	智能投顾-收益明细查询
*/

// 使用 Mock
var Mock = require('mockjs');

var holdChange = Mock.mock({ 
	"hmac":"hmac",
	"status":"0",
	"code":"CS0000",
	"msg":"处理成功！",
	"data": [
        {
            "fundCode":"003075",
            "fundName":"中融货币A",
            "fundOriginalScale":"20.10",
            "fundNewScale":"0.00"
        },{
        	"fundCode":"003076",
            "fundName":"中融货币B",
            "fundOriginalScale":"20.10",
            "fundNewScale":"30.00"
        },{
        	"fundCode":"003077",
            "fundName":"中融货币C",
            "fundOriginalScale":"20.10",
            "fundNewScale":"0.00"
        },{
        	"fundCode":"003078",
            "fundName":"中融货币D",
            "fundOriginalScale":"20.10",
            "fundNewScale":"30.00"
        },{
        	"fundCode":"00309",
            "fundName":"中融货币E",
            "fundOriginalScale":"20.10",
            "fundNewScale":"0.00"
        },{
        	"fundCode":"003011",
            "fundName":"中融货币F",
            "fundOriginalScale":"20.10",
            "fundNewScale":"30.00"
        },{
        	"fundCode":"003022",
            "fundName":"中融货币G",
            "fundOriginalScale":"20.10",
            "fundNewScale":"0.00"
        },{
        	"fundCode":"003033",
            "fundName":"中融货币H",
            "fundOriginalScale":"20.10",
            "fundNewScale":"30.00"
        },{
        	"fundCode":"003044",
            "fundName":"中融货币I",
            "fundOriginalScale":"20.10",
            "fundNewScale":"0.00"
        }
    ]

});

//把生成的假数据当做模块输出
module.exports = holdChange;