//模拟省份及下属地区直辖市


module.exports={
	"hmac":"hmac",
	"status":"0",
	"code":"CS0000",
	"msg":"success",
	"data":{
		"totalCount":0,
		"regionInfoList":[
		{
			"id":10571, //城市id
			"code":"130000",//城市编号
			"name":"河北省",//城市名称
			"parentId":"0",//所属城市编号
			"regionInfos":[ //下辖城市信息
			{
			"id":10607,
			"code":"130100",
			"name":"石家庄市",
			"parentId":"130000",
			"regionInfos":null
			},
			{
			"id":10608,
			"code":"130200",
			"name":"唐山市",
			"parentId":"130000",
			"regionInfos":null
			}
			]
		},
		{
			"id":10572, //城市id
			"code":"130000",//城市编号
			"name":"山东省",//城市名称
			"parentId":"0",//所属城市编号
			"regionInfos":[ //下辖城市信息
			{
			"id":10607,
			"code":"130100",
			"name":"潍坊市",
			"parentId":"130000",
			"regionInfos":null
			},
			{
			"id":10608,
			"code":"130200",
			"name":"青岛市",
			"parentId":"130000",
			"regionInfos":null
			}
			]
		}]
	}
}
