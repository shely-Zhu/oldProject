/*

  获取银行列表

*/

// 使用 Mock
var Mock = require('mockjs');

var mymessage = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    "data":{
        "projectShortname": "勿动旭霞01(1)(2)(1)(1)(1)(1)",
        "productViewpoint": "受全球瘟疫数据恶化、油价暴跌拖累，3月9日-3月12日期间A股各大指数较前一周反弹之后，低开低走并不同成都收跌【上证指数】周度跌幅-4.85%。数较前一周反弹之后... 受全球瘟疫数据恶化、油价暴跌拖累，3月9日-3月12日期间A股各大指数较前一周反弹之后，低开低走并不同成都收跌【上证指数】周度跌幅-4.85%。数较前一周反弹之后... 受全球瘟疫数据恶化、油价暴跌拖累，3月9日-3月12日期间A股各大指数较前一周反弹之后，低开低走并不同成都收跌【上证指数】周度跌幅-4.85%。数较前一周反弹之后... 受全球瘟疫数据恶化、油价暴跌拖累，3月9日-3月12日期间A股各大指数较前一周反弹之后，低开低走并不同成都收跌【上证指数】周度跌幅-4.85%。数较前一周反弹之后.."  
	    }
    
});
module.exports=mymessage;
