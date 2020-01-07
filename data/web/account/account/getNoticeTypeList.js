/*
  消息中心-系统通知列表
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({    
    status:"0000",     
    message:"success", 
    data: [{
        mesType: 0,
        mesTitle: '系统通知',
        mesContent: '关于恒天财富APP升级的公告，尊敬的客户：因为啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
        readStatus: 0 // 0未读，1已读
    },{
        mesType: 1,
        mesTitle: '产品公告',
        mesContent: '防范金融诈骗特别提示，尊敬的客户：为了回花花地方都是后i阿迪斯发…',
        readStatus: 0 // 0未读，1已读
    },{
        mesType: 2,
        mesTitle: '活动通知',
        mesContent: '“锦绣好礼，恒天赠送”，尊敬的客户：为了回888888888888888',
        readStatus: 1 // 0未读，1已读
    },{
        mesType: 3,
        mesTitle: '交易动态',
        mesContent: '您于2019年10月19日买入1,000,000.00元中融888888888888888',
        readStatus: 1 // 0未读，1已读
    }]
});

module.exports=data;