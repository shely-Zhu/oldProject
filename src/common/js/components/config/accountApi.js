/*
* @page: 账户相关接口
* @Author: songxiaoyu
* @Date:   2019-03-28 
* @Last Modified by:   songxiaoyu
* @description:
*/

//获取当前页面地址
module.exports = function() {
    
    //获取客户信息
    this.user_api = http_url.account_url + '/getUserInfo';
    this.custBro_api = http_url.account_url + '/broker/custBroRelQuery'; //理财师查询与客户关系接口
    this.queryClassification_api = http_url.account_url + '/queryClassification'; //投资者分类审核状态查询
    this.applyForClassification_api = http_url.account_url + '/investor/applyForClassification'; //投资者分类申请
    this.queryFreezeStatus_api = http_url.account_url + '/freezeStatus/queryFreezeStatus';
    
};