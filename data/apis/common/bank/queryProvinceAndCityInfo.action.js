/*
 * @page: 查询所有省信息,查询所有市信息
 * @接口地址:http://wiki.htmz.com/pages/viewpage.action?pageId=7018812#V7.19月份需求接口文档-8查询所有省信息
 * @Author: songxiaoyu
 * @Date:   2018-09-04 14:12:52
 * 
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-09-05 13:22:04
 * @description: 银行卡相关接口换为crm接口
 */


// 请求参数
/*{   
  hmac:””, //预留的加密信息 非必填项
  params:{
    code:""    //省市编码  不传值查询省份列表，传相应省编码，查询对应的城市列表
}
}*/
// 使用 Mock
var Mock = require('mockjs');

//注册
var pOver = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "data": [{
        "code": "130000", //省市编码
        "regionName": "河北省", //省市区域名称
        "parentId": "0", //父级编码
        "sortId": "2", //排序id
        "regionId": "10571", //区域id
    }]

    /*"data": {
        "totalCount": 0,
        "regionInfoList": [{
                "code": "130000", //城市编号
                "name": "河北省", //城市名称
                "parentId": "0", //所属城市编号
                "id": 10571, //城市id
                "regionInfos": [ //下辖城市信息
                    {
                        "id": 10607,
                        "code": "130100",
                        "name": "石家庄市",
                        "parentId": "130000",
                        "regionInfos": null
                    },
                    {
                        "id": 10608,
                        "code": "130200",
                        "name": "唐山市",
                        "parentId": "130000",
                        "regionInfos": null
                    }
                ]
            },
            {
                "id": 10572, //城市id
                "code": "130000", //城市编号
                "name": "山东省", //城市名称
                "parentId": "0", //所属城市编号
                "regionInfos": [ //下辖城市信息
                    {
                        "id": 10607,
                        "code": "130100",
                        "name": "潍坊市",
                        "parentId": "130000",
                        "regionInfos": null
                    },
                    {
                        "id": 10608,
                        "code": "130200",
                        "name": "青岛市",
                        "parentId": "130000",
                        "regionInfos": null
                    }
                ]
            }
        ]
    }*/
});

//把生成的假数据当做模块输出
//module.exports = data;

//根据传参数的不同进行处理

module.exports = pOver;