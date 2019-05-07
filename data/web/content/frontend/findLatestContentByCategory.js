/*
    app帮助中心接口
*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "hmac": "hmac",
    "status": "0000",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
    	"id":919,
    	"title":"爆款基金来袭，如何挑选好基金",
    	"introduction":"爆款基金来袭，如何挑选好基金",
    	"subject_tag":"",
    	"clicksNum":395,
    	"productType":"",
    	"content":"就大了附近啊冷风机甲氨蝶呤附近奥里吉 发了极度分裂剪短发了就爱理发店爱的房间里就爱离开家 发家乐福到啦复读机啊零点几分了看防静电服辣椒粉啦放老家阿凡达卡拉放假拉风啊附近啊的房间卡拉丁服李开复大了咖啡机",
    	"releaseDate":"2018-02-12",
    	"reportDate":null,
    	"reportSource":"",
    	"targetUrl":""
    }
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = data;
