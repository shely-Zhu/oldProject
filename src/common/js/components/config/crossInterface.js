/*
* @page: 针对app服务器里面，私募访问公募接口的情况
* @Author: songxiaoyu
* @Date:   2018-05-17 15:15:29
* @Last Modified by:   songxiaoyu
* @Last Modified time: 2018-05-17 15:35:44
* @description:
*/


module.exports = function() {

    /*------------------------------财商教育start------------------------------------------*/
    // 财商总资产
    this.myFinancialEducationInfoApi = http_url.cross_url + '/pof/myAssetInfo/myFinancialEducationInfo.action';
    /*------------------------------财商教育end------------------------------------------*/
}   