// $.noConflict();
require('../../../include/js/vendor/config.js');
var splitUrl = require('../../../common/js/components/splitUrl.js');
var Base64 = require('@pathIncludJs/vendor/base64/base64.js');
var openPdf={

	init:function(){



		// pdf转canvas
        // var url = '/productPrivate/static/img/demo.pdf';
        var marUrl = splitUrl()["marUrl"]
        var url = new Base64().decode(marUrl);

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
        var $openPdf = $('#openPdf'),
            $btn = $(".btn");
        $openPdf.scroll(function(){
        　　var scrollTop = $(this).scrollTop();
        　　var scrollHeight = $(this).find('#canvasBox')[0].offsetHeight;
        　　var height = $(this).height();
        　　if(scrollTop + height == scrollHeight){
                $btn.addClass("yesBtn");
        　　}
        });
        $(".btn").on("tap", function(){
            if($btn.hasClass("yesBtn")) {
                window.location.href = site_url.prdPrvSure_url + '?fundCode=' + splitUrl()["fundCode"];
            }; 
        });
	
	},
}
openPdf.init()