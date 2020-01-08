/*
* @page: 查询财商教育记录
* @Author: songxiaoyu
* @Date:   2018-05-08 10:31:32
* @Last Modified by:   songxiaoyu
* @Last Modified time: 2018-05-16 09:32:55
* @description:接口提供方--程珑
*/

var Mock = require('mockjs');

var data = Mock.mock({ 
	"hmac": "hmac", 
	"status": "0", 
	"code": "CS0000", 
	"msg": "处理成功！", 
	"data": { 
		"imgUrl":"https://s.haomaojf.com//upload/htmall/images/communityActivities/168589bb-7b22-44df-a962-fb6f6f68faa6.png",//封面图片
        "planName":"项目名字",//项目名字
        "kidName":"haha",//孩子姓名
        "kidGender":"0",//孩子性别
        "kidBirthday":"20180503",//孩子生日
        "kidAge":"5岁4个月",//孩子年龄展示（5岁4个月）
        "kidMessage":"孩子你已经是一名小小少年了！/n/n少年时期是充满生机、充满希望的时光。在这个时期，你应该有自己的目标，有自己的理想。花有重开日，人无再少年。有了梦想就要大胆的去实现。"//成长寄语
	} 
});

//把生成的假数据当做模块输出
module.exports = data;