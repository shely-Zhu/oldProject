/*
	基金经理 
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var financial = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "FP0001",
    "msg": "处理成功！",
    'data':{
         // "pageItems："{
         //     totalCount:””,// 总记录数
         //     totalPages:”” //总页数
         //     },
     	"pageList|0":[
	        {
           "publishDate":"2017-02-23",// 信息发布日期
           "managerId":"234",// 基金经理id
           "managerName":"李丽丽",// 基金经理姓名
           "managerEducation|1":["学士","硕士"],// 基金经理学历
           "managerBackground":"个的方式的飞洒的法师打发爱的方式是地方45违法时发生" //基金经理背景介绍
           }
	     ]
  	}
  });

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
module.exports=financial;