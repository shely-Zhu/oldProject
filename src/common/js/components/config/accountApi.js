/*
* @page: 账户相关接口
* @Author: songxiaoyu
* @Date:   2019-03-28 
* @Last Modified by:   songxiaoyu
* @description:
*/

//获取当前页面地址
module.exports = function() {
    this.login_url =  '/app/account/frontend/loginCheck'; //登录
    
    this.custBro_api = http_url.account_url + '/broker/custBroRelQuery'; //理财师查询与客户关系接口
    this.queryClassification_api = http_url.account_url + '/queryClassification'; //投资者分类审核状态查询
    this.applyForClassification_api = http_url.account_url + '/investor/applyForClassification'; //投资者分类申请


    // 恒小智-组合收益明细查询
    this.incomeList_api = http_url.account_url + '/smartInvestment/incomeList';
    // 恒小智-组合基金持仓中
    this.shareList_api = http_url.account_url + '/smartInvestment/shareList';
    // 银行卡列表
    this.smartList_api = http_url.account_url + '/smartInvestment/smartList';
    // 组合资产详情
    this.totalAssets_api = http_url.account_url + '/smartInvestment/totalAssets';
    
};