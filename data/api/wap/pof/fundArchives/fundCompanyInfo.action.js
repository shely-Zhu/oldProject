/*
	产品详情 
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var financial = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "FP0001",
    "msg": "处理成功！",
    'data':{
        "companyId":"124324",// 基金公司id
        "companyName":"是短发是发送到发送到发送到发送到发送到发送到发送到发送到发的是",// 基金公司名称
        "managerName":"汤晓东",// 总经理姓名
        "establishDate":"2017-03-22",// 基金公司成立日期
        "registeredCapital":"120",// 基金公司注册资金
        "telephoneNo":"11111111",// 电话号码
        "faxNo":"111",// 传真号码
        "webSite":"www.baidu.com",// 网址
        "officeAddress":"是短发是发送到发送到发送到发送到发送到发送到发送到发送到发的是",// 办公地址
        "fundManagementCount":"123",// 管理基金数
        "shareholderInfo|10":[ // 股东信息
            {
                "publishDate": "2014-03-22",// 信息发布日期
                "shareholderId": "",// 股东ID
                "shareholderName":"国联证券",// 股东名称
                "holdShares":"11",// 持股数量
                "holdSharesRatio":"12" // 持股比例(%)
            }],
        "scaleInfo|6":[ // 规模信息
            {
                "fundTypeName":"阿萨德发松岛枫玩儿玩儿",// 基金类型名称
                "fundCount":"234",// 基金数量
                "fundNav":"0.44" // 基金净值
            }
		]

  	}
  });


module.exports=financial;