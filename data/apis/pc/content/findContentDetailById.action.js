/*
内容详情
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var data = Mock.mock({
		"data":{
			'title': '两大交易结构对接受益权转让',
			'releaseDate': "2016-08-02",
			'introduction': '商务部发言人沈丹阳8月2日表示，“商务部目前尚未收到滴滴和优步中国相关交易的经营者集中申报。按反垄断法规定申报条件和国务院关于经营者集中申报标准的规定，经营者都应事先向商务部申报，未申报的不得实施兼并。”',
			"reportSource":'21世纪经济报道',
			"clicksNum":"109",
			'content': "<p>Lorem ips Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quam sed ex aperiam voluptate, fugit in excepturi qui dolores eius cupiditate quaerat doloremque, dolore unde. Maiores, odio veniam esse. Vitae.um dolor sit amet, consectetur adipisicing elit. Odio veniam ducimus corporis quas porro eos quisquam, consequuntur atque dolore consequatur minima vitae molestias adipisci distinctio aperiam aliquid aut quos temporibus!</p>"
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
module.exports=data;