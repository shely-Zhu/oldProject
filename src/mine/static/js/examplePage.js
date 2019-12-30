/***
 *专题模板
 *@author purpleZhao 2017-07-20
 *
 */
/***
 *本页面逻辑是页面必须带俩个参数 
 *路径访问：/include/views/activityModel.html?id=21&type=publicOffering
 *id：请求接口用    
 *type：others/privatePlacement/publicOffering目前只有这三个参数，分别代表三种模板样式
 *此模板用于后台管理器生成模板用
 *
 */



require('@pathCommonBase/base.js');
require('@pathCommonJs/ajaxLoading.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

$(function() {

    var model = {

        getElements: {
        	applyType:$(".applyType"),//应用方式
        	articleTitle:$('.articleTitle'),//文章标题
            a:$('#aaaa'),
            video:$('#video'),//视频的容器
            articleTime:$('.articleTime'),//文章时间
			author:$('.author'),//文章作者
            
        },
        gV:{
        	showData:{}
        },
        webInit: function() {
			var that = this;
			that.getDate();
		},
        getDate: function() {
            var that = this;

            /*if(splitUrl()['appActivity'] == "1"){//app中引入专题时产品列表跳转到app服务器的详情页

                that.getElements.priLocal.attr("href", go_url.apps_url + "/productPrivate/views/prdPrvDetails.html?fundCode={{productCode}}");
                that.getElements.pubLocal.attr("href", go_url.pofapp_url + "/productPublic/views/productDetail.html?fundCode={{productCode}}");

            }else{//非app中引入专题时产品列表跳转到wap服务器的详情页

            }*/
           
           //获取地址栏的数据
           	let arg = [];
           	let path = window.location.href;
           	var s = path.substring(path.indexOf('?') + 1);
           	var ss = s.split('&');
           	for( var i = 0; i< ss.length; i++){
				var index = ss[i].indexOf('=');
				if( index != -1 ){
					if( !arg[ ss[i].substring(0, index) ] ){
						//地址栏url上可能有经过base64加密的参数，此处不处理
						arg[ ss[i].substring(0, index) ] = ss[i].substring( index+1 );
					}
				}
			}
           	console.log(arg)
			var obj = [{
				url: site_url.getArticle_api,
				data:{id:9},
				callbackDone: function(json) {
					console.log(json.data.data)
					that.gV.showData.applyType = json.data.data.applyType == 0 
					? "h5自主生成"
					: "原生";
					that.gV.showData.articleTitle = json.data.data.title;
					that.gV.showData.articleTime = json.data.data.updateTimeStr;
					console.log(that.gV.showData);
					that.getElements.applyType.html(that.gV.showData.applyType);
					that.getElements.articleTitle.html(that.gV.showData.articleTitle);
//					that.getElements.a.attr({"href":json.data.data.videoAttachUrl})
					let src = json.data.data.videoAttachUrl;
					let sourceDom = $("<source src=\""+ src +"\">");
					that.getElements.video.append(sourceDom);
					that.getElements.video[0].play();
					
//					that.getElements.aaaa.html("快点点我")
//					that.getElements.contentImg.attr({"src":json.data[0].content})
				},
				callbackFail: function(json) { //失败后执行的函数
					tipAction(json.message);	
					console.log(json.message)
					console.log("22222")
				}
			}]
			$.ajaxLoading(obj);
            //发送ajax请求
//          if(splitUrl()['type'] == 'H5Public'){
//				var obj = [{
//					url: site_url.articleExample_api, //接口
//					// needLogin:true,//需要判断是否登陆
//					data: {
//						"id": splitUrl()['id'], //id 
//					},
//					callbackDone: function(json) { //成功后执行的函数
//						var jsonData = json.data;
//						// 专题名称
//						document.title =jsonData.bannerName;
//
//						$.each(jsonData.pictures,function(i,el){
//
//							var img = "";
//
//							img += "<img src='" + el +"'>" ;
//							$(".contentH5Public .images").append(img);
//							
//						});
//						// H5公募基金模板 显示
//						that.getElements.contentH5Public.show();
//						// 立即购买按钮跳转链接
//						that.getElements.linkUrl = jsonData.url; 
//						// “立即购买”按钮处理
//						if(!!jsonData.pictureButton){
//							var buyImg = "<img src='" + jsonData.pictureButton +"'>" ;
//							$('.buttonBuy').append(buyImg);
//							$('.buttonBuy a').remove();
//						}
//						$('.buttonBuy').on('click',function(){
//							if (window.currentIsApp) {
//								window.location.href = '/productPublic/views/comDetail.html?url='+ that.getElements.linkUrl;
//							} else {
//
//								$.elasticLayerTypeTwo({
//									id: "tip",
//									title: '帮助',
//									p: '请下载恒天财富APP进行体验本功能',
//									buttonTxt: '去下载',
//									zIndex: 100,
//									callback: function() {
//										//点击去下载按钮，跳转到相应的下载页面
//		                                window.location.href=window.commonSetting.downAppUrl;
//
//		                            }
//								})
//
//							}
//						})
//					},
//					callbackFail: function(json) { //失败后执行的函数
//						tipAction(json.message);
//					}
//				}];
//				$.ajaxLoading(obj);
//			}else{
//              var obj = [{
//                  url: site_url.activity_api, //接口
//                  //needLogin:true,//需要判断是否登陆
//                  data: {
//                      "id": splitUrl()['id'], //id 
//                  },
//                  callbackDone: function(json) { //成功后执行的函数
//  
//                      var data = json.data;
//                      window.document.title = data.name;
//  
//                      if (data.isCheckLogin == "1" && data.isCheckRisk == "0") { //需要登录不需要判断风测
//                          $.userCheck(false, function() {
//                              that.pageRendering(data)
//                          });
//                      } else if (data.isCheckLogin == "1" && data.isCheckRisk == "1") { //需要登录，需要判断风测
//                          $.userCheck(true, function() {
//                              that.pageRendering(data)
//                          });
//                      } else {
//                          // 其他情况页面渲染
//                          that.pageRendering(data);
//                      }
//                  },
//                  callbackFail: function(json) { //失败后执行的函数
//                      tipAction(json.message);
//                  }
//              }];
//              $.ajaxLoading(obj);
//          }
            
        }
    };

    //调用数据
    model.webInit();
})