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
    this.user_api = http_url.content_url + '/getUserInfo';
    // 首页banner
    this.findBannerByPosition_api = http_url.content_url + '/frontend/findBannerByPosition';
    // 上传图片
    this.uploadApi = http_url.content_url + '/file/mount/upload';
    // 图片下载
    this.downloadApi = http_url.content_url + '/file/mount/download';
    // 图片删除
    this.removeApi = http_url.content_url + '/file/mount/remove';
};