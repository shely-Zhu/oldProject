/*
* @page: 内容相关接口
* @Author: songxiaoyu
* @Date:   2019-03-28 
* @Last Modified by:   songxiaoyu
* @description:
*/

//获取当前页面地址
module.exports = function() {
    
    
    this.download_api = http_url.web_url + '/content/file/fastDFS/download'; //文件下载

    this.prvDetail_api = http_url.web_url + '/pef/queryProductDetail'; //私募详情查询
    this.prvLevel_api = http_url.web_url + '/pef/queryBenefitLevel'; //受益级别查询
    this.prvHisValue_api = http_url.web_url + '/pef/queryHistoryNetValue'; //历史净值查询
    this.prvLight_api = http_url.web_url + '/pef/queryProductImage'; //产品亮点查询
    this.queryReourceLabels_api = http_url.web_url +"/pef/queryReourceLabels"; //获取私募产品材料标签
    this.prvReource_api = http_url.web_url + '/pef/queryReourceList'; //产品材料接口

    this.user_api = http_url.web_url + '/account/getUserInfo'; //用户信息查询
    this.custBro_api = http_url.web_url + '/account/custBroRelQuery'; //理财师查询与客户关系接口
    this.queryFreezeStatus_api = http_url.web_url + '/account/freezeStatus/queryFreezeStatus'; //账户冻结
    this.queryClassification_api = http_url.web_url + '/account/queryClassification'; //投资者分类审核状态查询
    this.applyForClassification_api = http_url.web_url + '/account/investor/applyForClassification'; //投资者分类申请
};