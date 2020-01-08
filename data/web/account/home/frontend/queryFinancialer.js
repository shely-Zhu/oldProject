/*
  明星理财师-明星理财师列表
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({ 
	code:"",//错误码     
	status:"0000",     
	message:"success", 
	data: { 
        modelName:'1',
        'financialerList':[
            {
                name:'阎环环',//理财师名字
                code:'H012345',//理财师工号
                summary:'有近十年金融从业经验，持有国家一级理财规划师CHFP资格证书，证券及保险等金融从业证书。入司7年，为近100名客户配置240支产品，累计管理规模近6亿。',//简介
                imageUrlShowOnline:'/starFinancialPlanner/static/img/home_Head.png',//头像路径
                mobile:'1888888888',//手机号
                cityName:'北京',//所属城市
                isPass: 'Y'
            },
            {
                name:'阎环环1',//理财师名字
                code:'H012345',//理财师工号
                summary:'有近十年金融从业经验，持有国家一级理财规划师CHFP资格证书，证券及保险等金融从业证书。入司7年，为近100名客户配置240支产品，累计管理规模近6亿。',//简介
                imageUrlShowOnline:'/starFinancialPlanner/static/img/home_Head2.png',//头像路径
                mobile:'1888888888',//手机号
                cityName:'北京',//所属城市
                isPass: 'N'
            }
        ]
	 	
	}, 
});

module.exports=data;