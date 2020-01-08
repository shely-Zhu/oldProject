/*
	产品详情 
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var financial = Mock.mock({
    "hmac": "hmac",
    "status": 0,
    "code": "CF0004",
    "msg": "处理成功！",
    "data": {

          "noticeId":"58",// 公告ID

          "noticeSecuId":"001",// 公告业务编码

          "publishDate":"2017-01-01",// 发布日期

          "title":"就打进了房间啊老费劲啊两家饭店经理反馈欸啊对jfk了阿克苏的放假啦",// 标题

          "typCode":"",//类型ID

          "typInfo":"",// 类型说明

          "linkAddress":"",//链接地址

          "fileType":"pdf",//附件类型

          "contentLength":"",//公告内容长度

          "content":"啊龙卷风垃圾乱飞啊酒店房间啊理解对方急啊多了几分辣椒粉急啊迪斯科浪费健康垃圾地方角度考虑放假啦看绝对是辣椒粉啦叫阿呆垃圾分类卡",//公告内容

          "companyName":"" //发布机构名称

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