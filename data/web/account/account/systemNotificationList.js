/*
  消息中心-系统通知列表
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({    
	status:"0000",     
	message:"success", 
	data: { 
        total: 10,
        pages: 2,
        list: [{
            id: 1,
            mesType: 1,
            mesTitle: '关于恒天财富APP升级的公告',
            mesContent: '因国庆庆祝活动在北京举行，2019年9月25日-2019年10月7日期间的订单将延迟发货，延迟发货期间可正常6666666666666666666666',
            readStatus: 0, // 0未读，1已读
            createTimeStr: '2019-10-15 10:25:58'
        },{
            id: 2,
            mesType: 1,
            mesTitle: '关于恒天财富APP升级的公告',
            mesContent: '因国庆庆祝活动在北京举行，2019年9月25日-201迟发货，延迟发货期间可正常6666666666666666666666',
            readStatus: 0, // 0未读，1已读
            createTimeStr: '2019-10-15 10:25:58'
        },{
            id: 3,
            mesType: 1,
            mesTitle: '关于恒天财富APP升级的公告',
            mesContent: '因国庆庆祝活动在北5日-2019年10月7日期间的订单将延迟发货，延迟发货期间可正常6666666666666666666666',
            readStatus: 0, // 0未读，1已读
            createTimeStr: '2019-10-15 10:25:58'
        },{
            id: 4,
            mesType: 1,
            mesTitle: '关于恒天财富APP升级的公告',
            mesContent: '因国庆庆祝活动在北京举行，2019年9月25日-2019年10月7日期发货期间可正常6666666666666666666666',
            readStatus: 0, // 0未读，1已读
            createTimeStr: '2019-10-15 10:25:58'
        },{
            id: 5,
            mesType: 1,
            mesTitle: '关于恒天财富APP升级的公告',
            mesContent: '因国庆庆祝活动在北京举行，2019年9月25日-2019年10月7日期发货期间可正常6666666666666666666666',
            readStatus: 0, // 0未读，1已读
            createTimeStr: '2019-10-15 10:25:58'
        },{
            id: 6,
            mesType: 1,
            mesTitle: '关于恒天财富APP升级的公告',
            mesContent: '因国庆庆祝活动在北京举行，2019年9月25日-2019年10月7日期发货期间可正常6666666666666666666666',
            readStatus: 0, // 0未读，1已读
            createTimeStr: '2019-10-15 10:25:58'
        },{
            id: 7,
            mesType: 1,
            mesTitle: '关于恒天财富APP升级的公告',
            mesContent: '因国庆庆祝活动在北京举行，2019年9月25日-2019年10月7日期发货期间可正常6666666666666666666666',
            readStatus: 0, // 0未读，1已读
            createTimeStr: '2019-10-15 10:25:58'
        },{
            id: 8,
            mesType: 1,
            mesTitle: '关于恒天财富APP升级的公告',
            mesContent: '因国庆庆祝活动在北京举行，2019年9月25日-2019年10月7日期发货期间可正常6666666666666666666666',
            readStatus: 0, // 0未读，1已读
            createTimeStr: '2019-10-15 10:25:58'
        },{
            id: 9,
            mesType: 1,
            mesTitle: '关于恒天财富APP升级的公告',
            mesContent: '因国庆庆祝活动在北京举行，2019年9月25日-2019年10月7日期发货期间可正常6666666666666666666666',
            readStatus: 0, // 0未读，1已读
            createTimeStr: '2019-10-15 10:25:58'
        },{
            id: 10,
            mesType: 1,
            mesTitle: '关于恒天财富APP升级的公告',
            mesContent: '因国庆庆祝活动在北京举行，2019年9月25日-2019年10月7日期发货期间可正常6666666666666666666666',
            readStatus: 0, // 0未读，1已读
            createTimeStr: '2019-10-15 10:25:58'
        },{
            id: 11,
            mesType: 1,
            mesTitle: '关于恒天财富APP升级的公告',
            mesContent: '因国庆庆祝活动在北京举行，2019年9月25日-2019年10月7日期发货期间可正常6666666666666666666666',
            readStatus: 0, // 0未读，1已读
            createTimeStr: '2019-10-15 10:25:58'
        },{
            id: 12,
            mesType: 1,
            mesTitle: '关于恒天财富APP升级的公告',
            mesContent: '因国庆庆祝活动在北京举行，2019年9月25日-2019年10月7日期发货期间可正常6666666666666666666666',
            readStatus: 0, // 0未读，1已读
            createTimeStr: '2019-10-15 10:25:58'
        },{
            id: 13,
            mesType: 1,
            mesTitle: '关于恒天财富APP升级的公告',
            mesContent: '因国庆庆祝活动在北京举行，2019年9月25日-2019年10月7日期发货期间可正常6666666666666666666666',
            readStatus: 0, // 0未读，1已读
            createTimeStr: '2019-10-15 10:25:58'
        },{
            id: 14,
            mesType: 1,
            mesTitle: '关于恒天财富APP升级的公告',
            mesContent: '因国庆庆祝活动在北京举行，2019年9月25日-2019年10月7日期发货期间可正常6666666666666666666666',
            readStatus: 0, // 0未读，1已读
            createTimeStr: '2019-10-15 10:25:58'
        }]
	}, 
});

module.exports=data;