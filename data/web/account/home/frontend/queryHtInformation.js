


/*
  了解恒天列表
*/

// 使用 Mock
var Mock = require('mockjs');

var data=Mock.mock({ 
	code:"",//错误码     
	status:"0000",     
	message:"success", 
	data: { 
        "modelName":"了解恒天",
        "modelId":9,
        "companyIntroductionList": [{
            contentBelong: null,
            descr: "综合实力雄厚",
            linkType: null,
            linkUrl: "/homePage/views/introduction/understandHT.html?articleBelong=101",
            seqNo: "3",
            titleFst: "公司简介",
            titleSnd: null,
            titleTrd: null
        },{
            contentBelong: null,
            descr: "综合实力雄厚",
            linkType: null,
            linkUrl: "/homePage/views/introduction/understandHT.html?articleBelong=101",
            seqNo: "3",
            titleFst: "公司荣誉",
            titleSnd: null,
            titleTrd: null
        },{
            contentBelong: null,
            descr: "综合实力雄厚",
            linkType: null,
            linkUrl: "/homePage/views/introduction/understandHT.html?articleBelong=101",
            seqNo: "3",
            titleFst: "风控体系",
            titleSnd: null,
            titleTrd: null
        },{
            contentBelong: null,
            descr: "综合实力雄厚",
            linkType: null,
            linkUrl: "/homePage/views/introduction/understandHT.html?articleBelong=101",
            seqNo: "3",
            titleFst: "安全认证",
            titleSnd: null,
            titleTrd: null
        }]
        // "modelName":'1',
        // 'manageAndServiceList|4':[
        //     {
        //         "titleFst|1":['了解恒天',"公司荣誉","战斗力","持久力"],//理财师名字
        //         "descr":'H012345',//理财师工号
        // }]
	 	
	}
});

// data.data = JSON.parse('"{"modelName":"了解恒天","modelId":9,"companyIntroductionList":[{"descr":"综合实力雄厚","seqNo":"3","titleFst":"公司简介","titleTrd":null,"linkUrl":"/homePage/views/introduction/understandHT.html?articleBelong=101","titleSnd":null,"linkType":null,"contentBelong":null},{"descr":"社会各界肯定","seqNo":"4","titleFst":"公司荣誉","titleTrd":null,"linkUrl":"/homePage/views/introduction/understandHT.html?articleBelong=102","titleSnd":null,"linkType":null,"contentBelong":null},{"descr":"为客户资产保驾护航","seqNo":"5","titleFst":"风控体系","titleTrd":null,"linkUrl":"/homePage/views/introduction/understandHT.html?articleBelong=103","titleSnd":null,"linkType":null,"contentBelong":null},{"descr":"保障客户信息安全","seqNo":"6","titleFst":"安全认证","titleTrd":null,"linkUrl":"/homePage/views/introduction/understandHT.html?articleBelong=104","titleSnd":null,"linkType":null,"contentBelong":null}],"manageAndServiceList":[{"descr":"1200万","seqNo":"1","titleFst":"服务家庭","titleTrd":null,"linkUrl":"1","titleSnd":null,"linkType":null,"contentBelong":null},{"descr":"10000亿","seqNo":"2","titleFst":"资产配置","titleTrd":null,"linkUrl":"1","titleSnd":null,"linkType":null,"contentBelong":null}],"htHonorList":[{"imgUrlDownLoad":"?filePath=M00/02/95/rBCjQ14O59qAMPE-AAHyT9cv03A162.png&fileName=amlhbmcxQDJ4LnBuZw==&groupName=group2","filePath":"M00/02/95/rBCjQ14O59qAMPE-AAHyT9cv03A162.png","imageUrlShowOnline":"http://203.100.84.82:9000/group2/M00/02/95/rBCjQ14O59qAMPE-AAHyT9cv03A162.png","countdown":null,"linkUrl":"1","memo":null,"linkType":"1","id":498,"title":"金贝奖"},{"imgUrlDownLoad":"?filePath=M00/02/94/rBCjRF4O6DKAVqzoAAGYWki0RrQ692.png&fileName=amlhbmcyQDJ4LnBuZw==&groupName=group2","filePath":"M00/02/94/rBCjRF4O6DKAVqzoAAGYWki0RrQ692.png","imageUrlShowOnline":"http://203.100.84.82:9000/group2/M00/02/94/rBCjRF4O6DKAVqzoAAGYWki0RrQ692.png","countdown":null,"linkUrl":"1","memo":null,"linkType":"1","id":490,"title":"第一财经"},{"imgUrlDownLoad":"?filePath=M00/02/94/rBCjRF4O6S2AMP8WAAIANrJWxy4790.png&fileName=amlhbmczQDJ4LnBuZw==&groupName=group2","filePath":"M00/02/94/rBCjRF4O6S2AMP8WAAIANrJWxy4790.png","imageUrlShowOnline":"http://203.100.84.82:9000/group2/M00/02/94/rBCjRF4O6S2AMP8WAAIANrJWxy4790.png","countdown":null,"linkUrl":"1","memo":null,"linkType":"1","id":499,"title":"金牛奖"},{"imgUrlDownLoad":"?filePath=M00/02/95/rBCjQ14O6UaAUEymAAH_V6IAejg740.png&fileName=amlhbmc0QDJ4LnBuZw==&groupName=group2","filePath":"M00/02/95/rBCjQ14O6UaAUEymAAH_V6IAejg740.png","imageUrlShowOnline":"http://203.100.84.82:9000/group2/M00/02/95/rBCjQ14O6UaAUEymAAH_V6IAejg740.png","countdown":null,"linkUrl":"1","memo":null,"linkType":"1","id":500,"title":"中国财富奖"},{"imgUrlDownLoad":"?filePath=M00/02/95/rBCjQ14O6WmAH8U-AAH7GZ3No4w530.png&fileName=amlhbmc1QDJ4LnBuZw==&groupName=group2","filePath":"M00/02/95/rBCjQ14O6WmAH8U-AAH7GZ3No4w530.png","imageUrlShowOnline":"http://203.100.84.82:9000/group2/M00/02/95/rBCjQ14O6WmAH8U-AAH7GZ3No4w530.png","countdown":null,"linkUrl":"1","memo":null,"linkType":"1","id":501,"title":"财富奖"},{"imgUrlDownLoad":"?filePath=M00/02/94/rBCjRF4O6r6AcUriAAIO5dpW1hg268.png&fileName=amlhbmc2QDJ4LnBuZw==&groupName=group2","filePath":"M00/02/94/rBCjRF4O6r6AcUriAAIO5dpW1hg268.png","imageUrlShowOnline":"http://203.100.84.82:9000/group2/M00/02/94/rBCjRF4O6r6AcUriAAIO5dpW1hg268.png","countdown":null,"linkUrl":"1","memo":null,"linkType":"1","id":502,"title":"金臻奖"}]}"');

module.exports=data;