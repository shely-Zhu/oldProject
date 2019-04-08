/*
* @page: 公募相关接口
* @Author: chengqingqing
* @Date:   2019-03-28 
* @Last Modified by:   chengqingqing
* @description:
*/


module.exports = function() {
    this.user_api = http_url.web_url + '/account/getUserInfo'; //用户信息查询
     // 首页
     this.findBannerByPosition_api = http_url.web_url + '/content/frontend/findBannerByPosition';
     // 中秋活动 我已完成学习按钮点击请求的接口
    this.eBusinessRecord_api = http_url.web_url + '/content/eBusinessRecord';
   
};