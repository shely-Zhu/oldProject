/**
 * 内容接口
**/

module.exports = function() {
    // 首页banner
    this.findBannerByPosition_api = http_url.content_url + '/frontend/findBannerByPosition';
    // 上传图片
    this.uploadApi = http_url.content_url + '/file/mount/upload';
    // 图片下载
    this.downloadApi = http_url.content_url + '/file/mount/download';
    // 图片删除
    this.removeApi = http_url.content_url + '/file/mount/remove.action';
}
