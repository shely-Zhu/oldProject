
var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    "status": "0000", 
    "msg": "处理成功！", 
    "data": { 
        "isWealthAccount":0,//是否开通财富账户:
/*0、是
 1、身份证上传
 2、人脸识别
 3a、进线下申请状态-视频双录
 3b 进线下申请状态-影像采集
 4、视频双录
 5、身份证过期冻结
 6、身份证司法冻结*/
        "isRiskEndure":1,// 是否风测(0否1是)
        "isPerfect":1,//是否完善资料(0否1是)
        "isInvestFavour":1,// 是否投资者分类(0否1是)
        "isRiskMatch":1,// 是否风险等级匹配(0否，1是，2.风测已过期)
        "isHighAge": 1, //是否大龄(0否1是)
        "isZdTaLimit": 0, //是否中登(0否1是)
        "isIdnovalid": 0, //证件是否已过期（0否1是）
        "investorStatus": 0, //投资者状态（0.待审核）
    }
});




module.exports = data;