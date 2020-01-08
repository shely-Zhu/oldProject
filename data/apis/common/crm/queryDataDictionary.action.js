/*
查询字典接口
 */

// 使用 Mock
var Mock = require('mockjs');


//这里直接返回的就是JSON格式
var data = Mock.mock({ 
        "hmac": "hmac", 
        "status": "0", 
        "code": "CS0000",  
        "msg": "处理成功！", 
	    "data": [         
			{
	            "caption": "职业",
	            "key_no": "1027",
	            "keyValue": "#",
	            "english": "",
	            "memo": "",
	            "sys_name": "TA"
	        },
	        {
	            "caption": "政府部门",
	            "key_no": "1027",
	            "keyValue": "01",
	            "english": "",
	            "memo": "",
	            "sys_name": "TA"
	        },
	        {
	            "caption": "教科文",
	            "key_no": "1027",
	            "keyValue": "02",
	            "english": "",
	            "memo": "",
	            "sys_name": "TA"
	        },
	        {
	            "caption": "金融",
	            "key_no": "1027",
	            "keyValue": "03",
	            "english": "",
	            "memo": "",
	            "sys_name": "TA"
	        },
	        {
	            "caption": "商贸",
	            "key_no": "1027",
	            "keyValue": "04",
	            "english": "",
	            "memo": "",
	            "sys_name": "TA"
	        },
	        {
	            "caption": "房地产",
	            "key_no": "1027",
	            "keyValue": "05",
	            "english": "",
	            "memo": "",
	            "sys_name": "TA"
	        },
	        {
	            "caption": "制造业",
	            "key_no": "1027",
	            "keyValue": "06",
	            "english": "",
	            "memo": "",
	            "sys_name": "TA"
	        },
	        {
	            "caption": "自由职业",
	            "key_no": "1027",
	            "keyValue": "07",
	            "english": "",
	            "memo": "",
	            "sys_name": "TA"
	        },
	        {
	            "caption": "公务员",
	            "key_no": "1027",
	            "keyValue": "11",
	            "english": "",
	            "memo": "",
	            "sys_name": "TA"
	        },
	        {
	            "caption": "专业技术人员",
	            "key_no": "1027",
	            "keyValue": "12",
	            "english": "",
	            "memo": "",
	            "sys_name": "TA"
	        },
	        {
	            "caption": "办事人员",
	            "key_no": "1027",
	            "keyValue": "13",
	            "english": "",
	            "memo": "",
	            "sys_name": "TA"
	        },
	        {
	            "caption": "军人",
	            "key_no": "1027",
	            "keyValue": "14",
	            "english": "",
	            "memo": "",
	            "sys_name": "TA"
	        },
	        {
	            "caption": "商业和服务类人员",
	            "key_no": "1027",
	            "keyValue": "15",
	            "english": "",
	            "memo": "",
	            "sys_name": "TA"
	        },
	        {
	            "caption": "生产、运输设备操作人员",
	            "key_no": "1027",
	            "keyValue": "16",
	            "english": "",
	            "memo": "",
	            "sys_name": "TA"
	        },
	        {
	            "caption": "农、林、牧、渔、水利业生产人员",
	            "key_no": "1027",
	            "keyValue": "18",
	            "english": "",
	            "memo": "",
	            "sys_name": "TA"
	        },
	        {
	            "caption": "其它",
	            "key_no": "1027",
	            "keyValue": "98",
	            "english": "",
	            "memo": "",
	            "sys_name": "TA"
	        }
	    ]
});
module.exports=data;