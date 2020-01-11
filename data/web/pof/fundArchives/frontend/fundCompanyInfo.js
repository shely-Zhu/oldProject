// 使用 Mock
var Mock = require('mockjs');
var data = Mock.mock({
    status: "0000",
    msg: "处理成功",
    "data": {
        companyId: "2134455", // 基金公司id
        companyName: "基金公司名称", // 基金公司名称
        managerName: "总经理姓名", // 总经理姓名
        establishDate: "2018-12-09", // 基金公司成立日期
        registeredCapital: "10000000", // 基金公司注册资金
        telephoneNo: "13243234567", // 电话号码
        faxNo: "0312-233333", // 传真号码
        webSite: "www.baidu.com", // 网址
        officeAddress: "山东省高校合格卢卡斯得分", // 办公地址
        fundManagementCount: "11111112222", // 管理基金数
        "shareholderInfo|6": [ // 股东信息
            {
                publishDate: "2018-09-09", // 信息发布日期
                shareholderId: "112222", // 股东ID
                shareholderName: "股东名称", // 股东名称
                holdShares: "1000", // 持股数量
                holdSharesRatio: "2" // 持股比例(%)
            }, {
                publishDate: "2018-09-09", // 信息发布日期
                shareholderId: "112222", // 股东ID
                shareholderName: "股东名称", // 股东名称
                holdShares: "1000", // 持股数量
                holdSharesRatio: "2" // 持股比例(%)
            },
        ],
        "scaleInfo|6": [ // 规模信息
            {
                fundTypeName: "基金类型名称", // 基金类型名称
                fundCount: "100", // 基金数量
                fundNav: "99", // 基金净值
            }, {
                fundTypeName: "基金类型名称", // 基金类型名称
                fundCount: "100", // 基金数量
                fundNav: "99", // 基金净值
            },
        ]
    },


});

module.exports = data;