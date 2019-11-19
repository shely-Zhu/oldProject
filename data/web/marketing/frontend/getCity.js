/*

  金服活动列表-获取定位城市

*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "status": 0000,
    "message": "处理成功！",
    "data":{
        cityCode:'120000',//城市编码（未启用）
        cityName:'北京',//城市名称
        provinceCode:'120000',//省份编码
        provinceName:'北京',//省份名称
	}
    
});
module.exports=data;
