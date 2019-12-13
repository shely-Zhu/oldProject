/**
 * 实名认证页面，证件类型的下拉列表数据
 * @author yangjinlai 2017-02-15
 */

var idTypeList = [
	
	{
		name: '身份证',
		num: '0'
	},
	{
		name: '回乡证',
		num: '4'
	},
	{
		name: '台胞证',
		num: '13'
	}

];

var list = [];
$.each(idTypeList, function(i, el){
	list.push({
		value: el.num,
		text: el.name
	})
})

module.exports = list;
