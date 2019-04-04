/*
* @page: 
* @Author: songxiaoyu
* @Date:   2019-03-28 
* @Last Modified by:   songxiaoyu
* @description:
*/



//获取当前页面地址
module.exports = function() {
     //检查是否登录,sso后换成jsonp
    this.checkUserInfo_api = http_url.sso_url + '/checkUserInfo.action';

    
};