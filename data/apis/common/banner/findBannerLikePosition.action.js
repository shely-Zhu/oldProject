/*

 Banner查询（专门用于会员权益卡片组）

*/

// 使用 Mock
var Mock = require('mockjs');

//开始造假数据…………………………………………………………………………………………………………………………………………………………

var vip = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "处理成功！", 
	"data":[{ 
		"id": "1",//主键ID 
		"imgUrl":"https://s.chtfundtest.com//upload/htmall/images/banner/2d44edda-d4e6-4ce3-9ebc-e316880aaa99.png",//图片URL 
		"activityName": "持仓资产***万以上可解锁",//活动名称(会员卡片说明)  *后台直接维护整句话的解锁下一等级的解锁文案
		"linkUrl": "http://www.baidu.com ",//链接URL（跳转URL） 
		"adPosition" :"vip1",//类型（包含会员等级信息） 
		},{ 
		"id": "1",//主键ID 
		"imgUrl":"https://s.chtfundtest.com//upload/htmall/images/banner/0c8bc128-b44f-4e00-9bc6-92d52f699e82.png",//图片URL 
		"activityName": "持仓资产***万以上可解锁",//活动名称(会员卡片说明)
		"linkUrl": "http://www.baidu.com ",//链接URL（跳转URL） 
		"adPosition" :"vip2",//类型（包含会员等级信息） 
		},{ 
		"id": "1",//主键ID 
		"imgUrl":"https://s.chtfundtest.com//upload/htmall/images/banner/1c7d58c6-35c4-4f3b-b0a8-366ee23dd710.png",//图片URL 
		"activityName": "持仓资产***万以上可解锁",//活动名称(会员卡片说明)
		"linkUrl": "http://www.baidu.com ",//链接URL（跳转URL）
		"adPosition" :"vip3",//类型（包含会员等级信息）  
		},
	] 
});
//添加抽奖活动数据
var LotteryWAP = Mock.mock({
	"hmac": "hmac",
	"status": 0,
	"code": "CS0000",
	"msg": "处理成功！",
	'data':[{
        "adPosition": "LotteryWAPLayer1",
        "imgUrl": "/recommend/static/img/award/award_02.jpg",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPLayer2",
        "imgUrl": "/recommend/static/img/award/award_03.jpg",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPLayer3",
        "imgUrl": "/recommend/static/img/award/award_04.jpg",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPLayer4",
        "imgUrl": "/recommend/static/img/award/award_05.png",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPClose",
        "imgUrl": "/recommend/static/img/award/close.png",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPPop",
        "imgUrl": "/recommend/static/img/award/award_pop.png",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPListtitle",
        "imgUrl": "/recommend/static/img/award/awardList.png",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPRule",
        "imgUrl": "/recommend/static/img/award/rule_01.png",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPWarning",
        "imgUrl": "/recommend/static/img/award/warning.png",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPBusy",
        "imgUrl": "/recommend/static/img/award/none.png",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPNoChance",
        "imgUrl": "/recommend/static/img/award/noChance.png",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPPointer",
        "imgUrl": "/recommend/static/img/award/pointer.png",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPTurntable",
        "imgUrl": "/recommend/static/img/award/turntable1.png",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPPrize",
        "imgUrl": "/recommend/static/img/award/1.png",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPPrize",
        "imgUrl": "/recommend/static/img/award/2.png",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPPrize",
        "imgUrl": "/recommend/static/img/award/3.png",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPPrize",
        "imgUrl": "/recommend/static/img/award/4.png",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPPrize",
        "imgUrl": "/recommend/static/img/award/5.png",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPPrize",
        "imgUrl": "/recommend/static/img/award/6.png",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPPrize",
        "imgUrl": "/recommend/static/img/award/7.png",
        "activityName": ""
    },{
        "adPosition": "LotteryWAPPrize",
        "imgUrl": "/recommend/static/img/award/8.png",
        "activityName": ""
    }]
});
module.exports =LotteryWAP;