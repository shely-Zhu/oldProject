/*

  金服活动列表

*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "status": 0000,
    "message": "处理成功！",
    "data":{
        startPage:'1',//当前页
        pageSize:'10',//获取数据条数
        pages:'1',//总记录数
        "activityVoPageInfo":{
            'list|10':[
                {
                    id:'1',//主键唯一ID
                    actType:'1',//活动类型：1-线上活动，2-线下活动
                    actId:'11',//营销活动线上、线下活动id（活动编号）
                    actName:'活动名称666666',//活动名称
                    actStartDate:'2019-10-10',//活动开始时间
                    actEndDate:'2019-10-11',//活动结束时间
                    actProvince:'海南',//活动举办省份名称
                    actProvinceNO:'100',//活动举办省份编号
                    actCity:'三亚',//	活动举办城市名称
                    actCityNO:'3',//活动举办城市编号
                    actImgUrl:'http://172.16.163.99:85/group1/M00/06/ED/rBCjPl3V-GCAdzrzAA4bEjEpcqc425.gif',//金服推广图片URL
                    prizeFlag:true,//是否有奖品,
                    prize:'参与赠送30元电话卡30元电话卡',
                    actForm: 0, // 0 直播
                    actPlayStartTim: '2019-10-11 19:00:00',
                    actPlayEndTime: '2019-10-11 19:00:00',
                    isPlayback: 1
                }
                
            ]
        },
        /*"defaultRecommend": [
            {
                id:'1',//主键唯一ID
                actType:'1',//活动类型：1-线上活动，2-线下活动
                actId:'11',//营销活动线上、线下活动id（活动编号）
                actName:'555555555',//活动名称
                actStartDate:'2019年10月10号',//活动开始时间
                actEndDate:'2019年10月10号',//活动结束时间
                actProvince:'海南',//活动举办省份名称
                actProvinceNO:'100',//活动举办省份编号
                actCity:'三亚',// 活动举办城市名称
                actCityNO:'3',//活动举办城市编号
                actImgUrl:'http://172.16.163.99:85/group1/M00/06/ED/rBCjPl3V-GCAdzrzAA4bEjEpcqc425.gif',//金服推广图片URL
                prizeFlag:true,//是否有奖品,
                prize:'参与赠送30元电话卡30元电话卡',
                linkType: 'http://172.16.163.99:85/group1/M00/06/ED/rBCjPl3V-GCAdzrzAA4bEjEpcqc425.gif',
                filePath: '12333'
            }
            
        ]*/
        

	}
    
});
module.exports=data;
