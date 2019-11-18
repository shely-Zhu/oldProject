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
require('@pathIncludJs/vendor/config.js');

//zepto模块
require('@pathIncludJs/vendor/zepto/callback.js'); 
require('@pathIncludJs/vendor/zepto/deferred.js'); 

require('@pathCommonJsCom/utils.js');
require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJs/components/headBarConfig.js');
var generateTemplate = require('@pathCommonJsComBus/generateTemplate.js');

//黑色提示条
var tipAction = require('@pathCommonJs/components/tipAction.js');
//require('../../../common/js/components/utils.js');
//require('../../../common/js/ajaxLoading.js');
//var splitUrl = require('../../../common/js/components/splitUrl.js');
//require('../../../common/js/userCheck.js');
//require('../../../common/js/components/elasticLayerTypeTwo.js');
//
//require('../../../common/js/components/app/requireAppDown.js');

$(function() {

    var model = {

        getElements: {
            contentImg: $("#contentImg"), //图片
			contentBox: $('#contentBox'), //有产品模板
			contentH5Public : $("#contentH5Public"),  //h5公募基金模板
			priLocal: $(".priLocal"), //私募产品列表跳转链接
			pubLocal: $(".pubLocal"), //公募产品列表跳转链接
			custType: "", // 客户类型【0.机构 1.个人】 
            linkUrl: "", //立即购买按钮跳转链接
            islogin:$(".islogin"),
			adjustmentRecord: $('.adjustmentRecord'), // 调仓记录
            recordList: $('.recordList'), // 调仓记录
            adjustmentTemp: $('#adjustment-template'), // 模板赋值
            noData: $('.noData'), //没有数据的结构
            listLoading: $('.listLoading'),
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
			var obj = [{
				url: site_url.articleExample_api,
				data:{id:9},
				callbackDone: function(json) {
					console.log("!111111111")
					console.log(json.data)
					
//					generateTemplate(json.data, that.getElements.recordList, that.getElements.adjustmentTemp);
//					that.getElements.contentImg.html(json.data[0].content)
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
            
        },
    };

    //调用数据
    model.webInit();
})