/*
 * @Author: chennn 
 * @Date: 2019-11-22 10:52:18 
 * @Last Modified by: tianjunguo
 * @Last Modified time: 2019-11-28 18:18:54
 */

require('@pathCommonBase/base.js');

//ajax调用
require('@pathCommonJs/ajaxLoading.js');

require('@pathCommonJs/components/headBarConfig.js');
//引入弹出层
require('@pathCommonCom/elasticLayer/elasticLayer/elasticLayer.js');
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
            $("#loading").hide()
            // that.getPdf();
            that.events();
        },
        getPdf:function(){
            var that=this;
//          $('#loading').show();
            that.fileName = splitUrl['ecFileName'];
            that.fileUrl = splitUrl['ecFileUrl'];
            that.email = splitUrl['email'];
            var url = site_url.downloadFile_api+'?fileName='+that.fileName;
            // 将pdf流转为canvas
            var pdfjsLib = window['pdfjs-dist/build/pdf'];
            // The workerSrc property shall be specified.
            pdfjsLib.GlobalWorkerOptions.workerSrc = '/include/js/vendor/pdf/pdf.worker.js';
            pdfjsLib.getDocument(url).then(function getPdfHelloWorld(pdf) {
//				$('#loading').hide();
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
                    title:'',
                    // id: 'emailPop',
                    p:'<p class="">月度投资报告将发送到您的默认邮箱</p>'+
                        '<p class="">'+that.email+'</p>'+
                        '<p class="otherColor" id="changeMail">邮箱有变更，去修改</p>',
                    yesTxt:'确认',
                    celTxt:'取消',
                    zIndex: 1200,
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
                                    t.hide();//关闭弹窗
                                    
                                },
                                callbackFail: function(json) {
//                                  //显示错误提示
                    				tipAction(json.message);
                                    
                                },
                            }];
                            $.ajaxLoading(obj);	
                        }else{
                        	//显示错误提示
                    		tipAction("请去绑定邮箱");
//                          alert('请去绑定邮箱')
                        }
                    },      
                };
                $.elasticLayer(obj)
            })
            // 点击去修改邮箱
            mui("body").on('tap', '#changeMail', function() {
            	// 调用原生方法，或者原生拦截连接
            	window.location.href = site_url.changeMail_url;
            })
        }
    };
    fundPdf.init();
})