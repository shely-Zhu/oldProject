/*
私募交易交易明细
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({ 
	code:"",//错误码     
	status:"0000",     
	message:"success", 
	data: { 
        "pageItems": {
            "totalCount":"" ,//多少条
            "totalPages":"",//页数
        },
        'pageList':[
            { 
                "buyDate": "2016-08-09", //申购日              
                "buyAmount": "350,000.00", //买入金额               
                "setupDate": "2016-08-09",//成立日期
                "redemptionOpenDay": "", //赎回开放日
                "redemptionApplyDay": "", //赎回申请日 
                "redemptionType": "", //赎回方式 0-普通赎回 1-快速赎回                
                "redemptionShare": "" ,//赎回份额               
                "tradeType": "0", //交易类型0：认购 1：申购 2:   赎回
                                
            }, { 
                "buyDate": "2016-08-09", //申购日              
                "buyAmount": "100,000.00", //买入金额               
                "setupDate": "2016-08-09",//成立日期
                "redemptionOpenDay": "", //赎回开放日
                "redemptionApplyDay": "", //赎回申请日 
                "redemptionType": "", //赎回方式 0-普通赎回 1-快速赎回                
                "redemptionShare": "" ,//赎回份额               
                "tradeType": "1", //交易类型0：认购 1：申购 2:   赎回
                                
            }, { 
                "buyDate": "2016-08-09", //申购日              
                "buyAmount": "100,000.00", //买入金额               
                "setupDate": "2016-08-09",//成立日期
                "redemptionOpenDay": "", //赎回开放日
                "redemptionApplyDay": "", //赎回申请日 
                "redemptionType": "0", //赎回方式 0-普通赎回 1-快速赎回                
                "redemptionShare": "" ,//赎回份额               
                "tradeType": "2", //交易类型0：认购 1：申购 2:   赎回
                                
            }
            
        ]
	 	
	}, 
});


module.exports=data;