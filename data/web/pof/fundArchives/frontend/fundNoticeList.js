/*
	��ʷ��ֵ ��ֵ����ͼ
 */

// ʹ�� Mock
var Mock = require('mockjs');


//����ֱ�ӷ��صľ���JSON��ʽ
//var financial = Mock.mock({"data":"","message":"�����ɹ�,����Ϊ��","status":"1000"})
var financial = Mock.mock({
	"status":"0000",
	"msg":"success",
	"data": {
		"totalCount": 20,
        "totalPage": 10,
		"pageList|10":[{
             "noticeId":"785",// ����ID

             "noticeSecuId":"8563214",// ����ҵ�����

             "publishDate":"2018-02-13",// ��������

             "title":"����",// ����

             "typCode":"1",//����ID

             "typInfo":"����˵��",// ����˵��

             "linkAddress":"http://www.baidu.com",//���ӵ�ַ

             "fileType":"2",//��������

            "contentLength":"85" //�������ݳ���
		}]
	}
});


module.exports=financial;