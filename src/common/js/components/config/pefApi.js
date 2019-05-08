/*
* @page: 
* @Author: songxiaoyu
* @Date:   2019-03-28 
* @Last Modified by:   songxiaoyu
* @description:
*/



//获取当前页面地址
module.exports = function() {
    this.prvDetail_api = http_url.pef_url + '/queryProductDetail'; //私募详情查询
    this.prvLevel_api = http_url.pef_url + '/queryBenefitLevel'; //受益级别查询
    this.prvHisValue_api = http_url.pef_url + '/queryHistoryNetValue'; //历史净值查询
    this.prvLight_api = http_url.pef_url + '/queryProductImage'; //产品亮点查询
    this.queryReourceLabels_api = http_url.pef_url +"/queryReourceLabels"; //获取私募产品材料标签
    this.prvReource_api = http_url.pef_url + 'queryReourceList'; //产品材料接口
    this.recommend_api = http_url.pef_url + '/frontend/findRecommand';  //私募首页--产品推荐
    //老带新
    this.oldRecommendNew_api = http_url.pef_url + '/user/oldRecommendNew.action';
    //老带新微信
    this.share_api = http_url.joint_url + '/weixin/share.action';
};