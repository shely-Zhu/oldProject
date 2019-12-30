/**
 * 性别下拉列表
 * @author zhangweipeng 2017-11-16
 */

var idtimeTypeList = [
	
	{
		name: '长期有效',
		num: '0'
	},
	{
		name: '非长期有效',
		num: '1'
	}
	
];

var list = [];
$.each(idtimeTypeList, function(i, el){
	list.push({ 
		value: el.num,
		text: el.name
	})
})

module.exports = list;
