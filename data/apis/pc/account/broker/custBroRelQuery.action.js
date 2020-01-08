/*
理财师工号查询
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var data = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CS0000",
    "msg": "处理成功！",
    'total_conut':"",//总记录数
    'total_page':"",//总页数
    'data|1':[{
            "existMain": 0,//1有专属 0：无专属 
            "advisor": [{ 
                "broker_account|1":["H000001","H011611","H000005","H000011"], //工号 
                "broker_name|1":["赵紫云","杨金来","焦小露","张卫鹏"],//姓名 
                "career_status|1":[0],//员工状态 0：正常 1：离职 2：锁定 
                "mobile_tel|1":["15652234090","13333333333","12312341234","15644449999"],//手机号码 
                "dpt_name|1":["北京大区","上海大区","金服中心","恒天财富"],//地址 
                "is_main|1":[0,1], //是否为专属0：否 1：是 
                }], 
            
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
module.exports=data;