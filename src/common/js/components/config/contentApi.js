/*
* @page: 内容相关接口
* @Author: songxiaoyu
* @Date:   2019-03-28 
* @Last Modified by:   songxiaoyu
* @description:
*/

//获取当前页面地址
module.exports = function() {
    
    //获取客户信息
    // this.user_api = http_url.content_url + '/getUserInfo';
    this.findBannerLikePosition_api = http_url.content_url + '/frontend/findBannerLikePosition'; //获取页面背景及其他图片素材
    this.queryRightsByLevel_api = http_url.content_url + '/queryRightsByLevel';  //用户权益查询
    this.activity_api = http_url.content_url + '/frontend/findSpecialById'; //产品专题
    // 中秋活动 我已完成学习按钮点击请求的接口
    this.eBusinessRecord_api = http_url.content_url + '/eBusinessRecord';
   
};