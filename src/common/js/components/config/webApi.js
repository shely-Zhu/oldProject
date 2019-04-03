/*
* @page: 
* @Author: chengqingqing
* @Date:   2019-03-28 
* @Last Modified by:   chengqingqing
* @description:
*/



//获取当前页面地址
module.exports = function() {
     // 首页banner
     this.findBannerByPosition_api = http_url.web_url + '/content/frontend/findBannerByPosition';
     // 上传图片
     this.uploadApi = http_url.web_url + '/content/file/mount/upload';
     // 图片下载
     this.downloadApi = http_url.web_url + '/content/file/mount/download';
     // 图片删除
     this.removeApi = http_url.web_url + '/content/file/mount/remove';
};