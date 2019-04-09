/*
<<<<<<< HEAD
* @page: pc wap 端共用接口
* @Author: chengqingqing
=======
* @page: 内容相关接口
* @Author: songxiaoyu
>>>>>>> feature/recommend
* @Date:   2019-03-28 
* @Last Modified by:   songxiaoyu
* @description:
*/

//获取当前页面地址
module.exports = function() {
    //获取客户信息
    this.user_api = http_url.web_url + '/account/getUserInfo';
    // 客户冻结状态查询
    this.queryFreezeStatus_api = http_url.web_url + '/account/freezeStatus/queryFreezeStatus';
    // 首页banner
    this.findBannerByPosition_api = http_url.web_url + '/content/frontend/findBannerByPosition';
    // 上传图片
    this.uploadApi = http_url.web_url + '/content/file/mount/upload';
    // 图片下载
    this.downloadApi = http_url.web_url + '/content/file/mount/download';
    // 图片删除
    this.removeApi = http_url.web_url + '/content/file/mount/remove';
    //协议查询
    this.findInvestorClassification_api = http_url.web_url + '/content/findInvestorClassification';
    
    this.download_api = http_url.web_url + '/content/file/fastDFS/download'; //文件下载
    this.prvDetail_api = http_url.web_url + '/pef/queryProductDetail'; //私募详情查询
    this.prvLevel_api = http_url.web_url + '/pef/queryBenefitLevel'; //受益级别查询
    this.prvHisValue_api = http_url.web_url + '/pef/queryHistoryNetValue'; //历史净值查询
    this.prvLight_api = http_url.web_url + '/pef/queryProductImage'; //产品亮点查询
    this.queryReourceLabels_api = http_url.web_url +"/pef/queryReourceLabels"; //获取私募产品材料标签
    this.prvReource_api = http_url.web_url + '/pef/queryReourceList'; //产品材料接口
    this.findContentByCategory_api = http_url.web_url + '/content/frontend/findContentByCategory'; // 内容管理接口
    this.custBro_api = http_url.web_url + '/account/broker/custBroRelQuery'; //理财师查询与客户关系接口

    this.share_api = http_url.web_url + '/account/frontend/weixin/share';  //老带新微信分享
    this.oldRecommendNew_api = http_url.web_url + '/account/oldRecommendNew'; //	微信公众号获取参数
    this.award_api = http_url.web_url + "/activity/getAwardTimes"; // 抽奖次数查询
    this.getToken_api = http_url.web_url + "/activity/getToken"; //获取唯一的token值
    this.getAwardRecords_api = http_url.web_url + "/activity/getAwardRecords"; // 我的抽奖记录查询
    this.getDrawRecords_api = http_url.web_url + "/activity/frontend/getDrawRecords"; // 抽奖流水接口查询
    this.draw_api = http_url.web_url + "/activity/draw"; // 抽奖借口
};