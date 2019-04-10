/*
* @page: pc wap 端共用接口
* @Author: chengqingqing
* @Date:   2019-03-28 
* @Last Modified by:   songxiaoyu
* @description:
*/

//获取当前页面地址
module.exports = function() {
    /*-------------------账户相关------------------------------*/
    //获取客户信息
    this.user_api = http_url.web_url + '/account/getUserInfo';
    // 客户冻结状态查询
    this.queryFreezeStatus_api = http_url.web_url + '/account/freezeStatus/queryFreezeStatus';
    this.custBro_api = http_url.web_url + '/account/broker/custBroRelQuery'; //理财师查询与客户关系接口
    this.queryFreezeStatus_api = http_url.web_url + '/account/freezeStatus/queryFreezeStatus'; //账户冻结
    this.queryClassification_api = http_url.web_url + '/account/queryClassification'; //投资者分类审核状态查询
    this.applyForClassification_api = http_url.web_url + '/account/investor/applyForClassification'; //投资者分类申请

    
    /*-------------------账户相关 end ------------------------------*/

    /*-------------------内容相关------------------------------*/
    // 首页banner
    this.findBannerByPosition_api = http_url.web_url + '/content/frontend/findBannerByPosition';
    // 上传图片
    this.uploadApi = http_url.web_url + '/content/file/mount/upload';
    // 图片下载
    this.downloadApi = http_url.web_url + '/content/file/mount/download';
    // 图片删除
    this.removeApi = http_url.web_url + '/content/file/mount/remove';
    //协议查询
    this.findInvestorClassification_api = http_url.web_url + '/content/findInvestorClassification';
    //文件下载
    this.download_api = http_url.web_url + '/content/file/fastDFS/download'; //文件下载
    // 内容管理接口
    this.findContentByCategory_api = http_url.web_url + '/content/frontend/findContentByCategory'; // 内容管理接口
    
    /*-------------------内容相关 end ------------------------------*/


    /*-------------------私募相关  ------------------------------*/
    this.prvDetail_api = http_url.web_url + '/pef/queryProductDetail'; //私募详情查询
    this.prvLevel_api = http_url.web_url + '/pef/queryBenefitLevel'; //受益级别查询
    this.prvHisValue_api = http_url.web_url + '/pef/queryHistoryNetValue'; //历史净值查询
    this.prvLight_api = http_url.web_url + '/pef/queryProductImage'; //产品亮点查询
    this.queryReourceLabels_api = http_url.web_url +"/pef/queryReourceLabels"; //获取私募产品材料标签
    this.prvReource_api = http_url.web_url + '/pef/queryReourceList'; //产品材料接口
    /*-------------------私募相关 end ------------------------------*/


    /*-------------------公募相关------------------------------*/
    /*-------------------公募相关 end ------------------------------*/
};