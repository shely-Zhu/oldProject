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

var rule_wenjin = Mock.mock({ 
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
        "content":"=====快赎规则=====快赎轴前文案T日（交易日）=====快赎轴后文案T日（交易日）=====快赎交易说明10:50为T日，10:50后不支持快赎赎回=====快赎费率说明快速赎回手续费为0.1%=====普赎规则=====普赎轴前文案T日（交易日）=====普赎轴后文案T日+1（交易日）=====普赎交易说明13点前为T日，13点后为T+1日赎回",
        "releaseDate":"2018-02-12",
        "reportDate":null,
        "reportSource":"",
        "targetUrl":""
    }
});

var rule_wenyu = Mock.mock({ 
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
        "content":"=====普赎规则=====普赎轴前文案T日（交易日）=====普赎轴后文案T日+5（交易日）=====普赎交易说明15点前为T日，15点后为T+1日赎回。",
        "releaseDate":"2018-02-12",
        "reportDate":null,
        "reportSource":"",
        "targetUrl":""
    }
});

var rule_zhengquan = Mock.mock({ 
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
        "content":"=====普赎规则=====普赎轴前文案T日（交易日）=====普赎轴后文案T日+5（交易日）=====普赎交易说明15点前为T日，15点后为T+1日赎回。",
        "releaseDate":"2018-02-12",
        "reportDate":null,
        "reportSource":"",
        "targetUrl":""
    }
});


//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

// module.exports = data;

module.exports = [
    {
        params: {
            'category' : 'rule_wenjin'   //要在左边的对比参数上加[]，不然比对不上 稳金
        },
        response: rule_wenjin
    },
    {
        params: {
            'category' : 'rule_wenyu'   //要在左边的对比参数上加[]，不然比对不上 稳金
        },
        response: rule_wenyu
    },
    {
        params: {
            'category' : 'rule_zhengquan'   //要在左边的对比参数上加[]，不然比对不上 稳金
        },
        response: rule_zhengquan
    },
]
