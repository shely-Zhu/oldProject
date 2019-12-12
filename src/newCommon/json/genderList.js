/**
 * 性别下拉列表
 * @author zhangweipeng 2017-11-16
 */

var genderList = [
	
	{
		name: '男',
		num: '1'
	},
	{
		name: '女',
		num: '0'
	}
	
];

var list = [];
$.each(genderList, function(i, el){
	list.push({
		value: el.num,
		text: el.name
	})
})

module.exports = list;
