/*

*/

// 使用 Mock
var Mock = require('mockjs');

var incomeDetail = Mock.mock({ 
	"data": {
		enableAssets: 0,
        enableAssetsStr: "0.00",
        list:[
            {
                cash: false,
                currentAmount: 0,
                currentShare: 0,
                enableShare: 0,
                fundCode: "000847",
                fundName: "中融货币A",
                shareType: "",
                tradeAcco: "",
            },{
                cash: false,
                currentAmount: 0,
                currentShare: 0,
                enableShare: 0,
                fundCode: "000846",
                fundName: "中融货币C",
                shareType: "",
                tradeAcco: "",
            },{
                cash: true,
                currentAmount: 0,
                currentShare: 0,
                enableShare: 0,
                fundCode: "003075",
                fundName: "中融超宝",
                shareType: "",
                tradeAcco: "",
            }
        ],
        openAccount: true,
    },
    message: "操作成功！",
    status: "0000",
});

//把生成的假数据当做模块输出
module.exports = incomeDetail;