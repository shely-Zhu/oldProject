/**
 * 通过图片地址，获取图片并转成blob
 * @author yangjinlai 2017/11/16
 */


var getFileBlob = function (url, cb) {
  	var xhr = new XMLHttpRequest();
  	xhr.open("GET", url);
  	xhr.responseType = "blob";
  	xhr.addEventListener('load', function() {
  		cb(xhr.response);
  	});
  	xhr.send();
};

var blobToFile = function (blob, name) {
  	blob.lastModifiedDate = new Date();
  	blob.name = name;
  	return blob;
};

/**
 * 
 * @param  {[type]}   filePathOrUrl [外部传递进来的文件名，或图片地址，根据不同页面的不同情况可以进行判断执行不同的代码]
 * @param  {Function} cb            [获取文件后执行的回调函数]
 * @return {[type]}                 [description]
 */
module.exports = function(filePathOrUrl, cb) {

    var apiUrl = filePathOrUrl;


    if( window.location.href.indexOf('views/eContract/voucher.html') != -1){
       //加上接口地址
       apiUrl = site_url.download_api + '?fileName=' + filePathOrUrl;
    }
    
  	getFileBlob(apiUrl, function (blob) {
      //filePathOrUrl是文件名，必传，此处因接口返回的就是文件名，因此直接用了 
  		 cb(blobToFile(blob, filePathOrUrl));
  	});
   
    
    //因使用图文验证码图片开发，暂时把上面的代码隐藏
    //暂时用这个代码，文件名'test.png'随便写的
    /*getFileBlob(apiUrl, function (blob) {
        cb(blobToFile(blob, 'test.png'));
    });*/
  	
};

