/*
私募交易交易明细
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({ 
	data: "",
    message: "您选择的产品与您现在的风险承受能力不匹配，无法购买，建议您选择其他适配产品|尊敬的客户",
    status: "4000"

});


module.exports=data;