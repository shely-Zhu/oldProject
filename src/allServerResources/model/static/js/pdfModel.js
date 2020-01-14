// pdfModel

// $.noConflict();
require('@pathCommonBase/base.js');

require('@pathCommonJs/ajaxLoading.js');

var pdfModel={

	init:function(){
		var that = this;

		// pdf转canvas
		// var url = '/productPrivate/static/img/demo.pdf';
		var pageUrl = window.location.href;
		var pdfId;
		var ecFileName;
		var ecFileUrl;
		// protocol: '服务协议'
		// policy: '隐私权政策协议'
		if(pageUrl.indexOf('protocol') != -1){
			pdfId = '84';
		}
		else if(pageUrl.indexOf('policy') != -1){
			pdfId = '132';
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
						accessoryName = jsonData[0].accessorys[0].accessoryName;
						pdfUrl = jsonData[0].accessorys[0].accessoryUrl;

						that.pdfModel(accessoryName,pdfUrl)

					}else{  // 当返回的PDF链接是多条的时候

						$.each(jsonData[0].accessorys,function(i,el){
							accessoryName = el.accessoryName;
							pdfUrl = el.accessoryUrl;
							that.pdfModel(accessoryName,pdfUrl);
						})
					}
				}
			}
		}];
		$.ajaxLoading(obj);

	},

	pdfModel:function(accessoryName,url){
		var that = this;

        var url = site_url.downloadFile_api+'?name=' + new Base64().encode(accessoryName) + "&show=0&url="+url;
        // 将pdf流转为canvas
        var pdfjsLib = window['pdfjs-dist/build/pdf'];
        
		pdfjsLib.cMapUrl= 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.288/cmaps/'; // include "/"
		
		pdfjsLib.cMapPacked= true; // set cMapPacked = true to ignore Warning: Ignoring invalid character "121" in hex string

        // The workerSrc property shall be specified.
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/allServerResources/include/js/vendor/pdf/pdf.worker.js';
		// var url = new Base64().decode(marUrl);

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
				})
				.catch(function(err) {
					tipAction("pdf文件打开失败")
				});
			}
			
		})
		.catch(function(err) {
			tipAction("pdf文件打开失败")
		});
		
	}
}
pdfModel.init()