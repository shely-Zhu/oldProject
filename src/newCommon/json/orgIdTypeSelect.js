/**
 * 风险测评页面，证件类型的下拉列表数据
 * @author purpleZhao 2017-02-20
 */

var idTypeList = [
	
	{
		name: '技术监督局代码',
		num: '0'
	},
	{
		name: '营业执照',
		num: '1'
	},
	{
		name: '行政机关',
		num: '2'
	},
	{
		name: '社会团体',
		num: '3'
	},
	{
		name: '军队',
		num: '4'
	},
	{
		name: '武警',
		num: '5'
	},
	{
		name: '下属机构',
		num: '6'
	},
	{
		name: '基金会',
		num: '7'
	},
	{
		name: '其他机构',
		num: '8'
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
