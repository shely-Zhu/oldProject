/*
 * @Author: chennn 
 * @Date: 2019-11-22 10:52:18 
 * @Last Modified by: chennn
 * @Last Modified time: 2019-11-22 17:55:14
 */

require('@pathCommonJsCom/utils.js');
//ajax调用
require('@pathCommonJs/ajaxLoading.js');
//zepto模块--callback
require('@pathIncludJs/vendor/zepto/callback.js');
//zepto模块--deferred
require('@pathIncludJs/vendor/zepto/deferred.js');
//路径配置文件
require('@pathIncludJs/vendor/config.js');
require('@pathCommonJs/components/headBarConfig.js');
//引入弹出层
require('@pathCommonJs/components/elasticLayer.js');
var splitUrl = require('@pathCommonJs/components/splitUrl.js')();
$(function(){
    var fundPdf={
        data:{
            fileName: '',
            fileUrl:'',
            email: '',

        },
        init:function(){
            var that = this;
            that.getPdf();
            that.events();
        },
        getPdf:function(){
            var that=this;
            that.fileName = splitUrl['ecFileName'];
            that.fileUrl = splitUrl['ecFileUrl'];
            that.email = splitUrl['email'];
            var url = site_url.downloadFile_api+'?fileName='+that.fileName;
            // 将pdf流转为canvas
            var pdfjsLib = window['pdfjs-dist/build/pdf'];
            // The workerSrc property shall be specified.
            pdfjsLib.GlobalWorkerOptions.workerSrc = '/include/js/vendor/pdf/pdf.worker.js';
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
                        document.getElementById('pdfBox').appendChild(canvas);
        
                        
                        // Render PDF page into canvas context
                        //
                        page.render({canvasContext: context, viewport: viewport});
                    });
                }
                
            });
        },
        events:function(){
            var that = this;
            //点击下载按钮，显示弹框  
            $('.downLoad').on('click',function(){ 
                var obj={
                    title:'ttt',
                    // id: 'emailPop',
                    p:'<p class="elastic_p">月度投资报告将发送到您的默认邮箱</p>'+
                        '<p class="elastic_p">'+that.email+'</p>'+
                        '<p class="elastic_p otherColor">邮箱有变更，去修改</p>',
                    yesTxt:'确认',
                    celTxt:'取消',
                    zIndex: 100,
                    callback:function(t){
                        if(that.email){
                            var obj = [{
                                url: site_url.sendMailForConfirmBill_api, 
                                data: {
                                    fileName: that.fileName,
                                    fileUrl: that.fileUrl,
                                    email: that.email
                                },
                                needLogin: true,
                                callbackDone: function(json) {
                                    var jsonData = json.data;
                                    //设置数据到页面上
                                    // that.setDomData( jsonData );
                                    //请求其他接口
                                    // if( (that.data.projectType == 0) || (that.data.projectType == 1) ){ 
                                    //     //稳金类项目，请求七日年化/万份收益折线图
                                    //     // that.getTypeOneData();
                                    //     //请求快速赎回和普通赎回的文案
                                    //     // that.getTxt();
                                    // }
                                },
                            }];
                            $.ajaxLoading(obj);	
                        }
                    },      
                };
                $.elasticLayer(obj)
            })
        }
    };
    fundPdf.init();
})