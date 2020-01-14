/*
 * @Author: chennn 
 * @Date: 2019-11-22 10:52:18 
 * @Last Modified by:   songxiaoyu
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
            $(".listLoading").hide()
            that.getPdf();
            that.getEmail();
            that.events();
        },
        getEmail:function(){
        	var that = this;
        	var emailObj = [{
                    url:site_url.user_api,
                    data: {
                        hmac: "", //预留的加密信息     
                        params: {
                            
                        }
                    },
                    needLogin: true,
                    needLoading:false,
                    needDataEmpty: false, //需要判断data是否为空
                    callbackDone: function(json) {
                        var jsonData = json.data;
						that.data.email = jsonData.email;
                        

                    },
                }]
        	$.ajaxLoading(emailObj);
        },
        getPdf:function(){
            var that=this;
//          $('#loading').show();
            that.data.fileName = splitUrl['ecFileName'];
            that.data.fileUrl = new Base64().decode(splitUrl['ecFileUrl']);
            var url = site_url.downloadFile_api+'?name='+that.data.fileName+"&show=0&url="+that.data.fileUrl;
            // 将pdf流转为canvas
            var pdfjsLib = window['pdfjs-dist/build/pdf'];
            
			pdfjsLib.cMapUrl= 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.288/cmaps/'; // include "/"
			
			pdfjsLib.cMapPacked= true; // set cMapPacked = true to ignore Warning: Ignoring invalid character "121" in hex string

            // The workerSrc property shall be specified.
            pdfjsLib.GlobalWorkerOptions.workerSrc = '/allServerResources/include/js/vendor/pdf/pdf.worker.js';
            pdfjsLib.getDocument(url).then(function getPdfHelloWorld(pdf) {
//				$('#loading').hide();
                for (var i = 1; i <= pdf.numPages; i++) {
                    //
                    // 获取第i页
                    //
                    pdf.getPage(i).then(function getPageHelloWorld(page) {
                        var scale = 1.0;
                        var viewport = page.getViewport(scale);
        
                        //
                        // Prepare canvas using PDF page dimensions
                        //
                        var canvas = document.createElement('canvas');
                        canvas.height = viewport.height;
                          canvas.width = viewport.width;
                          var context = canvas.getContext('2d');
//                      canvas.width = window.screen.width
        
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
            mui("body").on('mdClick', '.downLoad', function() {
            	if(that.data.email){//如果有邮箱
	                var objHave={
	                    title:'',
	                    id: 'emailPop',
	                    p:'<p class="">下载确认书</p>'+
	                        '<p class="">'+that.data.email+'</p>'+
	                        '<p class="otherColor" id="changeMail">邮箱有变更，去修改</p>',
	                    yesTxt:'确认',
	                    celTxt:'取消',
                        htmdEvtYes:'privateFundPdf_2',  // 埋点确定按钮属性
                        htmdEvtCel:'privateFundPdf_3',  // 埋点取消按钮属性
	                    zIndex: 1200,
	                    callback:function(t){
	                        if(that.data.email){
	                            var obj1 = [{
	                                url: site_url.sendMailForConfirmBill_api, 
	                                data: {
	                                    fileName: that.data.fileName,
	                                    fileUrl: that.data.fileUrl,
	                                    email: that.data.email
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
	                            $.ajaxLoading(obj1);	
	                        }else{
	                        	//显示错误提示
	                    		tipAction("请去绑定邮箱");
	//                          alert('请去绑定邮箱')
	                        }
	                    },      
	                };
	                $.elasticLayer(objHave)
            		
            	}else{
            		var objNo={
	                    title:'',
	                    id: 'emailNoPop',
	                    p:'<p class="">下载确认书</p>'+
	                        '<p class=""><input class="emailInput" placeholder="请输入指定邮箱如 123@qq.com" type="text" /></p>',
	                    yesTxt:'确认',
	                    celTxt:'取消',
                        htmdEvtYes:'privateFundPdf_4',  // 埋点确定按钮属性
                        htmdEvtCel:'privateFundPdf_5',  // 埋点取消按钮属性
	                    zIndex: 1200,
	                    callback:function(t){
                            var emailObj = [{
                                url: site_url.sendMailForConfirmBill_api, 
                                data: {
                                    fileName: that.data.fileName,
                                    fileUrl: that.data.fileUrl,
                                    email: $(".emailInput").val()
                                },
                                needLogin: true,
                                callbackDone: function(json) {
                                    t.hide();//关闭弹窗
                                    tipAction(json.message);
                                },
                                callbackFail: function(json) {
//                                  //显示错误提示
                    				tipAction(json.message);
                                    
                                }
                            }];
                            $.ajaxLoading(emailObj);	
	                        
	                    },      
	                }
            		$.elasticLayer(objNo);
            	}
            },{
                'htmdEvt': 'privateFundPdf_0'
            })
            // 点击去修改邮箱
            mui("body").on('mdClick', '#changeMail', function() {
            	// 调用原生方法，或者原生拦截连接
            	window.location.href = site_url.changeMail_url;
            },{
                'htmdEvt': 'privateFundPdf_1'
            })
        }
    };
    fundPdf.init();
})