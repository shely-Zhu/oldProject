/*

  热门城市

*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "data":{
        modelName:'1',
        cityMap:{
          B:["北京"],
          C:["常州", "长春", "重庆", "成都", "长沙"],
          D:["大庆", "大连", "东莞"]
        },
        hotCityList:[{
          code:"522400",
          hotRegion:1,
          parentId:"520000",
          regionId:"10870",
          regionName:"毕节市",
          shortName:"bjs",
          sortId:1
        }]

    },
    "message":"操作成功！",
    "status":"0000"
});
module.exports=data;
