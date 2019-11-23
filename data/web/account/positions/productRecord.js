/*
  产品档案
*/
// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "status": "0000",
    "message": "处理成功！",
    "data": {
            "productName":"(DZ银杏909号)恒天融泽稳泰3号投资基金(特定资产收益权)",//产品名称
            "productRecord":"0098088888890000",//产品备案号
            "riskLevel":"平衡级",//风险等级
            "custodianUser":"北京易迪基金管理有限公司",//管理人
            "custodianOrg":"北京易迪基金管理有限公司",//托管机构
            "shareRegisterOrg":"北京易迪基金管理有限公司",//份额登记机构
            "newScale":"20,000万",//最新规模
            "investTactics":"证券",//投资策略
            "productTerms":"60个月",//产品期限
            "productCharges":"营业部毛利分享比例10%【认购费1.5% (价外收取) 】 +【管理费:前2.5年0.2%/年，一次性提取2.5年，自2.5年起1%/年，剩余管理费按日计提，于基金终止时一次性支付】 + 【后端:超额收益分配比例客户：恒天=9:1 (有限合伙清算时收取) 】1111111111111111111111111111111",//产品费用          
        },

});

module.exports = data;