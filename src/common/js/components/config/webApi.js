/*
* @page: pc wap 端共用接口
* @Author: chengqingqing
* @Date:   2019-03-28 
* @Last Modified by:   songxiaoyu
* @description:
*/



//获取当前页面地址
module.exports = function() {
    //获取客户信息
    this.user_api = http_url.web_url + '/account/getUserInfo';
    // 客户冻结状态查询
    this.queryFreezeStatus_api = http_url.web_url + '/account/freezeStatus/queryFreezeStatus';





    
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

   

};