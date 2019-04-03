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

    this.findContentByCategory_api = http_url.web_url + '/content/frontend/findContentByCategory'; // 内容管理接口

    this.custBro_api = http_url.web_url + '/account/broker/custBroRelQuery'; //理财师查询与客户关系接口
 
    this.findBannerByPosition_api = http_url.web_url + '/content/frontend/findBannerByPosition'; // banner信息查询
};