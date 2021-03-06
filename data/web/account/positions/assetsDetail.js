/**
 * 资产详情
 */


// 使用 Mock
var Mock = require('mockjs');

//1. 积分
var data = Mock.mock({ 
    "hmac": "hmac", 
    "status": "0000", 
    "code": "CS0000", 
    "msg": "处理成功！", 
    "data": {
        "projectName": "恒天问津1号恒天问津1号恒天问津1号恒天恒天问津1号恒天问津1号恒天问津1号恒天", //项目名称
        "sevenYearYield":"4", //七日年化收益率
        "sevenYearYieldUpdateDate":"2019.33", //七日年化收益率更新时间 mm.dd
        "capitalisation":"100.00", //当前市值
        "allowRedemptionShare": "12", //可赎回份额
        "beginRedemptionTime": "2019-11-19", //赎回申请开始时间
        "endRedemptionTime": "2019-11-19", //赎回申请结束时间
        "redemptionOpenDay": "2019-11-19", //赎回开放日
        "expectedProfit": "", //业绩比较基准(购买时)
        "endDate": "",//到期日期
        "totalShare": "", //持仓份额
        "buyAmount": "100,1000.00", //认购金额
        "setupDate": "",//成立日期
        "prodTerm":"日",//产品期限-单位（日 月 年）
        "investPeriod":"2",//投资期
        "quitPeriod":"1",//退出期
        "delayPeriod":"3",//延长期
        "navUnit":"",//单位净值
        "navUnitDate":"01.22",//单位净值更新日期 mm.dd
        "assetsGainAndLoss":"1.111",//持仓盈亏
        "incomeUnit":"123123",//万份收益
        "incomeUnitDate":"2019-11-19",//万份收益更新日期
        "incomeAssign":"0.00",//收益分配
        "holdDays":"23",//持有天数
        "totalNetValue":"",//累计净值
        "totalNetValueDate":"2019-11-19",//累计净值日期
        "redemptionOpenFrequency":"132%",//赎回开放频率
        "supportJfRedeem" : "1",//是否支持金服赎回(0否1是)
        "notSupportJfRedeemMsg" : "该产品暂时不支持线上赎回",//不支持金服赎回时的提示文案
        "tradeRecordFlag":"1",//是否有交易明细(0否1是)
        "incomeAssignFlag":"1",//是否有收益分配明细(0否1是)
        "fundConfirmDealFalg":"1",//是否有基金确认书(0否1是)
        "ecFileName":"啦啦啦啦啦啦",//电子确认单名称(基金确认单)
        "ecFileUrl":"546545312123153455",//电子确认单文件路径
        "redemptionOpenFrequency": "小叮当小叮当小叮当" // 赎回开放指引
    }
});

module.exports = data;
