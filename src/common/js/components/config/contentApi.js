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
    this.recommend_api = http_url.content_url + '/frontend/productRecommend';  //私募首页--产品推荐
    this.download_api = http_url.content_url + '/file/fastDFS/download'; //文件下载
};