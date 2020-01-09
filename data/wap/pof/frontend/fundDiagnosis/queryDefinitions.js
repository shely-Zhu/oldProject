/*
 * @page: 基金诊断字典接口
 * @Author: songxiaoyu
 * @Date:   2019-08-20 18:02:03
 * @Last Modified by:   songxiaoyu
 * @description:
 */

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({"data":{"fundDiagnosisSex":[{"dicCode":0,"dicType":"fundDiagnosisSex","text":"男","value":0},{"dicCode":1,"dicType":"fundDiagnosisSex","text":"女","value":1}],"fundDiagnosisLiquidityRequirement":[{"dicCode":1,"dicType":"fundDiagnosisLiquidityRequirement","text":"高","value":1},{"dicCode":2,"dicType":"fundDiagnosisLiquidityRequirement","text":"低","value":2}],"fundDiagnosisInvestDuration":[{"dicCode":1,"dicType":"fundDiagnosisInvestDuration","text":"没有经验","value":1},{"dicCode":2,"dicType":"fundDiagnosisInvestDuration","text":"2年以下","value":2},{"dicCode":3,"dicType":"fundDiagnosisInvestDuration","text":"2-5年","value":3},{"dicCode":4,"dicType":"fundDiagnosisInvestDuration","text":"5-10年","value":4},{"dicCode":5,"dicType":"fundDiagnosisInvestDuration","text":"10年以上","value":5}],"fundDiagnosisRiskLevel":[{"dicCode":1,"dicType":"fundDiagnosisRiskLevel","text":"保守型","value":1},{"dicCode":2,"dicType":"fundDiagnosisRiskLevel","text":"稳健型","value":2},{"dicCode":3,"dicType":"fundDiagnosisRiskLevel","text":"平衡型","value":3},{"dicCode":4,"dicType":"fundDiagnosisRiskLevel","text":"成长型","value":4},{"dicCode":5,"dicType":"fundDiagnosisRiskLevel","text":"进取型","value":5}],"fundDiagnosisVocation":[{"dicCode":1,"dicType":"fundDiagnosisVocation","text":"政府部门","value":1},{"dicCode":2,"dicType":"fundDiagnosisVocation","text":"教科文","value":2},{"dicCode":3,"dicType":"fundDiagnosisVocation","text":"金融","value":3},{"dicCode":4,"dicType":"fundDiagnosisVocation","text":"商贸","value":4},{"dicCode":5,"dicType":"fundDiagnosisVocation","text":"房地产","value":5},{"dicCode":6,"dicType":"fundDiagnosisVocation","text":"制造业","value":6},{"dicCode":7,"dicType":"fundDiagnosisVocation","text":"自由职业","value":7},{"dicCode":9,"dicType":"fundDiagnosisVocation","text":"事业单位","value":9},{"dicCode":10,"dicType":"fundDiagnosisVocation","text":"国有企业","value":10},{"dicCode":11,"dicType":"fundDiagnosisVocation","text":"公务员","value":11},{"dicCode":12,"dicType":"fundDiagnosisVocation","text":"专业技术人员","value":12},{"dicCode":13,"dicType":"fundDiagnosisVocation","text":"办事人员","value":13},{"dicCode":14,"dicType":"fundDiagnosisVocation","text":"军人","value":14},{"dicCode":15,"dicType":"fundDiagnosisVocation","text":"商业和服务类人员","value":15},{"dicCode":16,"dicType":"fundDiagnosisVocation","text":"生产、运输设备操作人员","value":16},{"dicCode":18,"dicType":"fundDiagnosisVocation","text":"农、林、牧、渔、水利业生产人员","value":18},{"dicCode":98,"dicType":"fundDiagnosisVocation","text":"其它","value":98}],"fundDiagnosisEInvestDurationLevel":[{"dicCode":1,"dicType":"fundDiagnosisEInvestDurationLevel","text":"1年以下","value":1},{"dicCode":2,"dicType":"fundDiagnosisEInvestDurationLevel","text":"1-3年","value":2},{"dicCode":3,"dicType":"fundDiagnosisEInvestDurationLevel","text":"3-5年","value":3},{"dicCode":4,"dicType":"fundDiagnosisEInvestDurationLevel","text":"5年以上","value":4}]},"message":"操作成功！","status":"0000"});





//根据传参数的不同进行处理

module.exports = data;