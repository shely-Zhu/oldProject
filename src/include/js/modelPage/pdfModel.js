// pdfModel

// $.noConflict();
require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js'); 
require('@pathIncludJs/vendor/zepto/deferred.js'); 

require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');

var splitUrl = require('@pathCommonJsCom/splitUrl.js');
var Base64 = require('@pathIncludJs/vendor/base64/base64.js');
var pdfModel={

	init:function(){
		var that = this;

		// pdf转canvas
		// var url = '/productPrivate/static/img/demo.pdf';
		var marUrl = splitUrl()["type"];
		var pageUrl = window.location.href;
		var pdfId;
		var objUrl,dataPdf;

		if(pageUrl.indexOf('protocol') != -1){
			pdfId = '';
		}
		else if(pageUrl.indexOf('policy') != -1){
			pdfId = '131';
		}
		
		var obj = [{
			url: site_url.findInvestorClassification_api,
			data:{
				ids: pdfId,
			},
			contentTypeSearch:true,
			needLogin: true,
			needDataEmpty:false,//不需要判断data是否为空
			callbackDone:function(json){
				var jsonData = json.data;
				// 服务协议和隐私政策公用一个接口，需先判断返回的content（富文本）是否有内容，优先展示富文本，富文本无内容时展示PDF
				if(jsonData[0].content){

					$('#openPdf').html(jsonData[0].content);

				}else{

					// var pdfUrl = '/productPrivate/static/img/demo.pdf';
					// 当返回的PDF只有一条的时候
					if(jsonData[0].accessorys.length == 1){   
						pdfUrl = jsonData[0].accessorys[0].accessoryUrl;

						that.pdfModel(pdfUrl)

					}else{  // 当返回的PDF链接是多条的时候

						$.each(jsonData[0].accessorys,function(i,el){
							pdfUrl = el.accessoryUrl;
							that.pdfModel(pdfUrl);
						})
					}
				}
			}
		}];
		$.ajaxLoading(obj);

	},

	pdfModel:function(url){
		var that = this;


		// var url = new Base64().decode(marUrl);

		// Loaded via <script> tag, create shortcut to access PDF.js exports.
		var pdfjsLib = window['pdfjs-dist/build/pdf'];
		// The workerSrc property shall be specified.
		pdfjsLib.GlobalWorkerOptions.workerSrc = '/include/js/vendor/pdf/pdf.worker.js';
		// pdfjsLib.GlobalWorkerOptions.workerSrc = '/include/js/vendor/pdf/pdf.js';
		// Asynchronous download of PDF
		// var loadingTask = pdfjsLib.getDocument(url);

		pdfjsLib.getDocument(url).then(function getPdfHelloWorld(pdf) {
  
			for (var i = 1; i <= pdf.numPages; i++) {
				//
				// 获取第i页
				//
				pdf.getPage(i).then(function getPageHelloWorld(page) {
					var scale = 1.5;
					var viewport = page.getViewport(scale);

					//
					// Prepare canvas using PDF page dimensions
					//
					var canvas = document.createElement('canvas');
					var context = canvas.getContext('2d');
					canvas.height = viewport.height;
					canvas.width = viewport.width;

					// 这里拿body当pdf容器
					document.getElementById('canvasBox').appendChild(canvas);

					
					// Render PDF page into canvas context
					//
					page.render({canvasContext: context, viewport: viewport});
				});
			}
			
		});
		
	}
}
pdfModel.init()