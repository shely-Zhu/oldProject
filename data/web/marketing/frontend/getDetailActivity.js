/*

  金服活动详情

*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "status": 0000,
    "message": "处理成功！",
    "data": {
        actType: '1', //活动类型：1-线上活动，2-线下活动
        actId: '100000', //营销活动线上、线下活动id（活动编号）
        actName: '女性婚姻财富保全与花艺沙龙', //活动名称,
        actTag: '1111', //活动标签
        actProvince: '1111', //活动举办省份名称
        actProvinceNO: '1111', //活动举办省份编号
        actCity: '北京市', //活动举办城市名称
        actCityNO: '1111', //活动举办城市编号
        actStartDate: '123565434', //活动开始时间
        actStartDateStr: '2019-05-03',
        actEndDate: '124565453432324', //活动结束时间
        actEndDateStr: '2019-06-30',
        actIntroduce: '通过邀请客户参加高端红酒活动，从而为客户带来不一样的活动体验并对公司留下深刻印象，品尝全酒宴，满足客户体验，增加客户与理财师交流，对于客户增信、签单有很大的促进作用11', //活动介绍
        signUpFlag: false, //是否已经报名：false-未报名，true-已报名
        actStatus: 1,
        domainIP: "http://172.16.163.99:85/",
        htjfGeneralizeImgUrl: "M00/02/39/rBCjQl4O9KCAY0NfAABjYRRYimg003.jpg",
        htjfGeneralizeImgUrlPrex: "group1/",

    }

});
module.exports = data;