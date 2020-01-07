/*

  获取总资产

*/

// 使用 Mock
var Mock = require("mockjs");

var mymessage = Mock.mock(
  { 
    "status": "0000", 
    "message": "接口请求成功",
    "data":{
      "1000": [
              {
                  "keyNo": 1,
                  "keyValue": "是",
                  "dicNo": 1002
              },
              {
                  "keyNo": 0,
                  "keyValue": "否",
                  "dicNo": 1001
              }
          ],
          "1001": [
              {
                  "keyNo": 1,
                  "keyValue": "单身期",
                  "dicNo": 1001
              },
              {
                  "keyNo": 2,
                  "keyValue": "形成期",
                  "dicNo": 1002
              },
              {
                  "keyNo": 3,
                  "keyValue": "成长期",
                  "dicNo": 1003
              },
              {
                  "keyNo": 4,
                  "keyValue": "成熟期",
                  "dicNo": 1004
              },
              {
                  "keyNo": 5,
                  "keyValue": "老年期",
                  "dicNo": 1005
              }
          ],
          "1002": [
              {
                  "keyNo": 1,
                  "keyValue": "险承受",
                  "dicNo": 1002
              },
              {
                  "keyNo": 2,
                  "keyValue": "险承受",
                  "dicNo": 1003
              },
              {
                  "keyNo": 3,
                  "keyValue": "险承受",
                  "dicNo": 1004
              }
          ],
          "1003": [
              {
                  "keyNo": 1,
                  "keyValue": "资产分类1",
                  "dicNo": 1002
              },
              {
                  "keyNo": 2,
                  "keyValue": "资产分类2",
                  "dicNo": 1003
              },
              {
                  "keyNo": 3,
                  "keyValue": "资产分类3",
                  "dicNo": 1004
              },
              {
                  "keyNo": 4,
                  "keyValue": "资产分类4",
                  "dicNo": 1002
              },
              {
                  "keyNo": 5,
                  "keyValue": "资产分类5",
                  "dicNo": 1003
              },
              {
                  "keyNo": 6,
                  "keyValue": "资产分类6",
                  "dicNo": 1004
              }
          ],
          "1004": [
              {
                  "keyNo": 1,
                  "keyValue": "资产类别1",
                  "dicNo": 1002
              },
              {
                  "keyNo": 2,
                  "keyValue": "资产类别2",
                  "dicNo": 1003
              },
              {
                  "keyNo": 3,
                  "keyValue": "资产类别3",
                  "dicNo": 1004
              },
              {
                  "keyNo": 4,
                  "keyValue": "资产类别4",
                  "dicNo": 1002
              },
              {
                  "keyNo": 5,
                  "keyValue": "资产类别5",
                  "dicNo": 1003
              },
              {
                  "keyNo": 6,
                  "keyValue": "资产类别6",
                  "dicNo": 1004
              }
          ],
          "1005": [
              {
                  "keyNo": 1,
                  "keyValue": "项目类型1",
                  "dicNo": 1002
              },
              {
                  "keyNo": 2,
                  "keyValue": "项目类型2",
                  "dicNo": 1003
              },
              {
                  "keyNo": 3,
                  "keyValue": "项目类型3",
                  "dicNo": 1004
              }
          ],
          "1006": [
              {
                  "keyNo": 1,
                  "keyValue": "细分策略1",
                  "dicNo": 1002
              },
              {
                  "keyNo": 2,
                  "keyValue": "细分策略2",
                  "dicNo": 1003
              },
              {
                  "keyNo": 3,
                  "keyValue": "细分策略3",
                  "dicNo": 1004
              }
          ],
          "1007": [
              {
                  "keyNo": 1,
                  "keyValue": "家庭未来现金流稳定性1",
                  "dicNo": 1002
              },
              {
                  "keyNo": 2,
                  "keyValue": "家庭未来现金流稳定性2",
                  "dicNo": 1003
              },
              {
                  "keyNo": 3,
                  "keyValue": "家庭未来现金流稳定性3",
                  "dicNo": 1004
              }
          ]
    }
  }
);
module.exports = mymessage;
