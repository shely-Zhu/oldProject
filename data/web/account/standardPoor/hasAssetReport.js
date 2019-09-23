/*

  获取总资产

*/

// 使用 Mock
var Mock = require('mockjs');

var mymessage = Mock.mock({
    "data": {
      "hasAssetReport": "1",
      "empNo":"H00163"
    },
    "message":"操作成功！",
    "status":"0000"
});
module.exports=mymessage;
