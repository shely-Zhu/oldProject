/*
联系人手机号查询
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var data = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "",
    "msg": "处理成功！",
    "data": {
        "beginRedemptionTime": null,
        "custName": "二二一",
        "endRedemptionTime": null,
        "isAllowFastRedemption": "1",
        "linkPhone": "13261506603",
        "managerName": "财通基金管理有限公司",
        "maskCertNo": "1101**********5775",
        "openTime": null,
        "productName": "财通基金恒增鑫享16号资产管理计划",
        "systemTime": "2018-05-18",
        "totalShare": "2,450,000.00",
        "salesType": '0', //销售类型  0 直销 1代销 (新增)
        "accountList|4": [{
            "bankCode": "13123", //银行编码  (新增)
            "bankName": "建设", //银行名称  (新增)
            "bankAccount": "12322", //银行卡号 (新增，只展示后四位，前面加*)
            "share": "10000", //账号上的份额  (新增)
            "bankAccountSecret":"2121212"  // 加密卡号（ 新增， 赎回申请时卡号送此字段）
        }],
    }
});
module.exports = data;