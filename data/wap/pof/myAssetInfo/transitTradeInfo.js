
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
             pageList:[
                {
	                 applyId:"",// 申请编号
	                 fundCode:"010031",// 基金代码
	                 fundName:"稳金1号",// 基金名称
	                 fundBusinCode:"024",// 业务大类
	                 tradeStatus:"",// 交易申请状态
	                 tradeDate:"",// 交易日期
	                 tradeNo:"0053",// 交易账号
	                 estimateConfirmDate:"2016-09-28",// 预估确认日期
	                 confirmAmount:"",// 待确认金额(认/申购交易使用)
	                 receivableAccount:"6217220200005522135",// 赎回银行账户(赎回交易使用)
	                 confirmShare:"1000" // 待确认份额(赎回交易使用)
                },
                {
	                 applyId:"",// 申请编号
	                 fundCode:"020035",// 基金代码
	                 fundName:"稳金5号",// 基金名称
	                 fundBusinCode:"020",// 业务大类
	                 tradeStatus:"",// 交易申请状态
	                 tradeDate:"",// 交易日期
	                 tradeNo:"0053",// 交易账号
	                 estimateConfirmDate:"2016-10-25",// 预估确认日期
	                 confirmAmount:"1,500,000",// 待确认金额(认/申购交易使用)
	                 receivableAccount:"",// 赎回银行账户(赎回交易使用)
	                 confirmShare:"" // 待确认份额(赎回交易使用)
                },
                {
	                 applyId:"",// 申请编号
	                 fundCode:"030058",// 基金代码
	                 fundName:"稳金18号",// 基金名称
	                 fundBusinCode:"022",// 业务大类
	                 tradeStatus:"",// 交易申请状态
	                 tradeDate:"",// 交易日期
	                 tradeNo:"0063",// 交易账号
	                 estimateConfirmDate:"2016-10-02",// 预估确认日期
	                 confirmAmount:"1,500,000",// 待确认金额(认/申购交易使用)
	                 receivableAccount:"",// 赎回银行账户(赎回交易使用)
	                 confirmShare:"" // 待确认份额(赎回交易使用)
                },
                
             ]
    }
}
);



//根据传参数的不同进行处理

module.exports = data;