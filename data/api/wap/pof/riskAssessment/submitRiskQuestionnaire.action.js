/*
理财师工号查询
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var question = Mock.mock({ "hmac": "hmac", "status": "0", "code": "CS0000", "msg": "success", "data": { "totalCount": 0, "riskLevel": "2", "riskLevelName": "稳健型", "riskLevelDescription": "在保证本金安全的基础上追求稳定的投资增值，可承担较低的风险。", "newFundInfoList": [{ "errorCode": "", "errorInfo": "", "successType": "0", "acceptHqDate": "20171207", "fundCode": "001389", "shareType": "A", "fundName": "中融新优势混合A", "nav": "1.0000", "fundShare": "0.00", "fundStatus": "0", "fundCurrIncome": "0.00", "fundCurrRatio": "0.0000", "perMyriadIncome": "0.0000", "hqDate": "20171206", "taNo": "0F", "ofundRisklevel": "4", "ofundType": "b", "fundFullName": "中融新优势混合A", "forbidModiAutobuyFlag": "0", "navTotal": "1.0000", "preIncomeRatio": "0.0000", "prodTerm": "0", "enMinshare": "100.00", "totalCount": "1", "rowcount": "1" }, { "errorCode": "", "errorInfo": "", "successType": "0", "acceptHqDate": "20171207", "fundCode": "001390", "shareType": "A", "fundName": "中融新优势混合C", "nav": "1.0000", "fundShare": "0.00", "fundStatus": "0", "fundCurrIncome": "0.00", "fundCurrRatio": "0.0000", "perMyriadIncome": "0.0000", "hqDate": "20171206", "taNo": "0F", "ofundRisklevel": "3", "ofundType": "b", "fundFullName": "中融新优势混合C", "forbidModiAutobuyFlag": "", "navTotal": "1.0000", "preIncomeRatio": "0.0000", "prodTerm": "0", "enMinshare": "100.00", "totalCount": "1", "rowcount": "2" }, { "errorCode": "", "errorInfo": "", "successType": "0", "acceptHqDate": "20171207", "fundCode": "003010", "shareType": "A", "fundName": "中融盈泽债券C", "nav": "1.0000", "fundShare": "0.00", "fundStatus": "0", "fundCurrIncome": "0.00", "fundCurrRatio": "0.0000", "perMyriadIncome": "0.0000", "hqDate": "20171206", "taNo": "0F", "ofundRisklevel": "5", "ofundType": "6", "fundFullName": "中融盈泽债券C", "forbidModiAutobuyFlag": "0", "navTotal": "1.0000", "preIncomeRatio": "0.0000", "prodTerm": "0", "enMinshare": "100.00", "totalCount": "1", "rowcount": "3" }] } });

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理
/*module.exports = [
  {
    params: {name: 1},  //name等于1的时候，返回{error:'error'}
    response: {
      error: 'error'
    }
  }, {
    params: {name: 2},  //name等于2的时候，返回data
    response: data
  }
]*/
module.exports = question;