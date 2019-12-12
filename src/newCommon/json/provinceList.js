/**
 * 省份下拉列表
 * @author zhangyanping 2018-01-23
 */

var provinceList = [
	
	{
		name: '浙江',
		num: '浙江'
	},
	{
		name: '北京',
		num: '北京'
	},
	{
		name: '上海',
		num: '上海'
	},
	{
		name: '云南',
		num: '云南'
	},
	{
		name: '重庆',
		num: '重庆'
	},
	{
		name: '吉林',
		num: '吉林'
	},
	{
		name: '辽宁',
		num: '辽宁'
	},
	{
		name: '天津',
		num: '天津'
	},
	{
		name: '河北',
		num: '河北'
	},
	{
		name: '广东',
		num: '广东'
	},
	{
		name: '江苏',
		num: '江苏'
	},
	{
		name: '湖南',
		num: '湖南'
	},
	{
		name: '湖北',
		num: '湖北'
	},
	{
		name: '安徽',
		num: '安徽'
	},
	{
		name: '江西',
		num: '江西'
	},
	{
		name: '福建',
		num: '福建'
	},
	{
		name: '山东',
		num: '山东'
	},
	{
		name: '陕西',
		num: '陕西'
	},
	{
		name: '河南',
		num: '河南'
	},
	{
		name: '宁夏',
		num: '宁夏'
	},
	{
		name: '广西',
		num: '广西'
	},
	{
		name: '四川',
		num: '四川'
	},
	{
		name: '黑龙江',
		num: '黑龙江'
	},
	{
		name: '海南',
		num: '海南'
	}
	
];

var list = [];
$.each(provinceList, function(i, el){
	list.push({
		value: el.num,
		text: el.name
	})
})

module.exports = list;
