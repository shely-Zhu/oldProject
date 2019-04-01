/*
* @page: 公募相关接口
* @Author: songxiaoyu
* @Date:   2019-03-28 
* @Last Modified by:   songxiaoyu
* @description:
*/


module.exports = function() {
    this.prvDetail_api = http_url.pof_url + '/queryProductDetail'; //私募详情查询
    /*------------------------------财商教育start------------------------------------------*/
    // 是否展示推广信息
    this.ifShowPromotionApi = http_url.pof_url + '/fqEducation/ifShowPromotion';
    // 初始化财商教育记录
    this.initApi = http_url.pof_url + '/fqEducation/init';
    // 查询财商教育记录
    this.findApi = http_url.pof_url + '/fqEducation/find';
    // 更新财商教育记录
    this.updateApi = http_url.pof_url + '/fqEducation/update';
    // 财商总资产
    this.myFinancialEducationInfoApi = http_url.pof_url + '/myAssetInfo/myFinancialEducationInfo';
    /*------------------------------财商教育end------------------------------------------*/

};