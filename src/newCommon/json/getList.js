/**
 * 实名认证页面，投资类型的下拉列表数据
 * @author yangjinlai 2017-02-15
 */

var investList = [
	
	{
		name: '本机构',
		num: '0'
	},
	{
		name: '	其他主体',
		num: '1'
	}
	
];

var list = [];
$.each(investList, function(i, el){
	list.push({
		value: el.num,
		text: el.name
	})
})

module.exports = list;
