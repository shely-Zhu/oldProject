
// 使用 Mock
var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock(
	{
    hmac:"", //预留字段
    msg: "success",
    code:"",//错误码
    status: "0",
    data: {
         pageItems:{
                 totalCount:"100",// 总记录数
                 totalPages:"5" //总页数
        },
        "pageList|10":[
            {
                 todayProfit:"5.22%",// 今日收益
                 cumulativeProfit:"4.22%",// 累计收益
                 fundName:"建信安心回报定期开放债券型证券投资基金",// 基金名称
                 fundCode:"010056",// 基金代码
                 fundType:"",// 基金类型
                 fundRiskLevel:"",// 基金风险等级
                 fundRiskLevelName:"",// 基金风险等级名称
                 holdingAmount:"5200",// 持有金额
                 holdingShare:"4500",// 持有份额
                 availableShare:"60000",// 可用份额
                 enMinshare:"2000",// 最低持有份额
                 redeemTime:"",// 基金赎回时长
                 redeemRate:"0.75",// 基金赎回费率（最大值）
                 redeemFlag:"0",// 基金赎回标志
                 estimateArrivalDate:"2016-09-28",// 预估到账日期
                 tradeNo:"0053",// 交易账号
                 bankAccount:"6230221111111117",// 银行账户
                 bankIdNo:"",// 银行编号
                 bankName:"华夏银行",//银行名称
                 shareType:"",//份额分类
                 capitalMode:"", // 资金方式
                 tradeLimit:[ //交易限制信息列表
                       {
                           fundBusinCode:"024",// 业务类型
                           maxValue:"9999999",// 首次最大值
                           minValue:"20",// 首次最小值
                           additionMinValue:"30" // 追加最小值 
                       },
                       
                  ]
            }
         ]
    }
}
);



//根据传参数的不同进行处理

module.exports = data;