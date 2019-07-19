/*
* @page: 请求app接口
* @Author: shiyunrui
* @Date:   2019-07-5 
* @Last Modified by:   shiyunrui
* @description:
*/

//获取当前页面地址
module.exports = function() {
    /*-------------------账户相关------------------------------*/
    //jjs持仓明细查询
    this.jjsAssetsDetail_api = http_url.app_url + '/account/jjs/queryAssetsDetailByPages',
	//总资产查询 （公募+私募+金交所+组合+恒小智）
	this.totalAssets_appApi = http_url.app_url + '/account/jjs/getTotalAssets'
};