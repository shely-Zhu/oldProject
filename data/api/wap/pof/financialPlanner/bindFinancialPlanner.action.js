/*
理财师工号查询
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var financial = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    'data|1':[{
         "id|1":["H000001","H011611","H000005","H000011"],// 理财师编号

         "status|1":[0,1,2],// 理财师在职状态

         "name|1": ["赵紫云","杨金来","焦小露","张卫鹏"],// 理财师姓名

         "department|1":["北京大区","上海大区","金服中心","恒天财富"],// 理财师所属部门

         "certificate|1":["有证","无证"] //理财师持证状态

  	}]
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