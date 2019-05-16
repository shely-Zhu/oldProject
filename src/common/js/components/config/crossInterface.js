/*
* @page: 针对app服务器里面，私募访问公募接口的情况
* @Author: songxiaoyu
* @Date:   2018-05-17 15:15:29
* @Last Modified by:   songxiaoyu
* @Last Modified time: 2018-05-17 15:35:44
* @description:
*/

module.exports = function() {
    //获取客户信息
    this.user_api = http_url.account_url + '/getUserInfo';
    this.custBro_api = http_url.account_url + '/broker/custBroRelQuery'; //理财师查询与客户关系接口
    this.queryClassification_api = http_url.account_url + '/queryClassification'; //投资者分类审核状态查询
    this.applyForClassification_api = http_url.account_url + '/investor/applyForClassification'; //投资者分类申请
    this.queryFreezeStatus_api = http_url.account_url + '/freezeStatus/queryFreezeStatus';
};

