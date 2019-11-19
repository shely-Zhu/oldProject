/*
  消息中心-系统通知详情
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({    
	status:"0000",     
	message:"success", 
	data: { 
        id: 1,
        mesType: 1,
        mesTitle: '关于恒乐汇商城国庆节发货的通知',
        mesContent: '<p>公告13公告13公告13公告1311<img src="https://s.chtfundtest.com/upload/ue/image/20190429/1556550192543076419.jpg" title="1556550192543076419.jpg" alt="13.jpg"/></p ><p><br/></p ><p><br/></p ><p><img src="https://s.chtfundtest.com/upload/ue/image/20190505/1557034877100030062.png" title="1557034877100030062.png" alt="tanchuang2.png"/></p >',
        readStatus: 0, // 0未读，1已读
        user: '恒乐汇商城',
        createTimeStr: '2019-10-15 10:25:58' 
	}, 
});

module.exports=data;