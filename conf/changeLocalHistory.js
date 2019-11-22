/**
 * 本地环境且没有eruda参数时，自动将url上带上eruda=true参数
 *
 * gulp打包js的时候，添加在文件顶部
 */


// if( window.env == 0 && window.location.href.indexOf('eruda=') == -1){
// 	var href = window.location.href,
// 		newUrl = href.indexOf('?') != -1 ? href + '&eruda=true' : href + '?eruda=true';
// 	history.replaceState(null, null ,  newUrl );
// }

