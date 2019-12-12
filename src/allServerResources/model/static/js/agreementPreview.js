
/*
 * @page: 通过id获取协议模板
 * @Author: purpleZhao
 * @Date:   2017-06-08 16:42:39
 * @description:本页面逻辑是所有通过id查询协议的模板结果详情页
 *              要求：需要通过地址栏将id传过来
 *
 *
 * 
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-11-20 10:18:44
 * @description:恒小智，app里协议，需公募调用私募接口，这个接口需转发
 */
require('../vendor/config.js');

//zepto模块
require('../vendor/zepto/callback.js');
require('../vendor/zepto/deferred.js');

//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
var splitUrl = require('../../../common/js/components/splitUrl.js')();


$(function() {

    var model = {
        $el:{
            showPreview:$(".showPreview")
        },
        gV:{
            url:'',
            type:''
        },
        webInit: function() {
            var that = this;
            that.event()
            debugger
            // that.$el.showPreview.attr('src',splitUrl['link'])
            that.gV.url = 'http:'+ window.location.href.split('link=')[1].split(':')[1].split('&type=')[0];
            $("#uploadService").attr('href',that.gV.url)
            that.gV.type =  window.location.href.split('link=')[1].split(':')[1].split('&type=')[1];
            if(that.gV.type == '1'){
                $("#HeadBarpathName").html('基金合同')
            }
            if(that.gV.type == '2'){
                $("#HeadBarpathName").html('招募说明书')
            }
            $("#loading").hide()

            that.pdfModel(that.gV.url)
        },
        //点击下载
        event:function() {
			mui("body").on('mdClick','#goBack',function(){
				//返回上一页
                if(document.referrer == ''){
                    var u = navigator.userAgent, 
                        app = navigator.appVersion;
                    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
                    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                    if (isAndroid) {
                        //这个是安卓操作系统
                        window.jsObj.backNative();
                    }
                    if (isIOS) {
                        //这个是ios操作系统
                        window.webkit.messageHandlers.backNative.postMessage('backNative');
                    }
                }else{
                    location.href="javascript:history.go(-1)";
                } 
			}, {
				htmdEvt: 'fundTransformIn_04'
			}) 
        },
        pdfModel:function(url){
            var that = this;
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
    };

    //调用数据
    model.webInit();
})