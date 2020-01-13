/**
 * require下载app
 * @author  yangjinlai 2017-07-26
 */

 var splitUrl = require('@pathCommonJsCom/splitUrl.js');
 var html = require("html-loader!../../../views/appDown.html");

//当url上有appShow且值为1时，显示app下载区域
if( splitUrl()['appShow'] == '1' ){
	$('body').append(html);  
}	 