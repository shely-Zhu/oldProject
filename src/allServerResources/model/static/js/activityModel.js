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
 * 由原来的include中移动到allServerResources文件夹下，并改成兼容新版APP的样式
 * @author zhangyanping 2020-01-13
 *
 *
 */

require('@pathCommonBase/base.js');

require('@pathCommonJs/ajaxLoading.js');
require('@pathCommonJsCom/utils.js');
var splitUrl = require('@pathCommonJsCom/splitUrl.js');
require('@pathCommonJs/userCheck.js');
require('@pathCommonJsCom/elasticLayerTypeTwo.js');
// 待确认修改
// require('@pathCommonJsCom/app/requireAppDown.js');

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
        },
        webInit: function() {
			var that = this;
			that.getDate();
		},
        getDate: function() {

            var that = this;

            //发送ajax请求
            if(splitUrl()['type'] == 'H5Public'){
				var obj = [{
					url: site_url.findBannerGeneratorById_api, //接口
					// needLogin:true,//需要判断是否登陆
					data: {
						"id": splitUrl()['id'], //id 
					},
					callbackDone: function(json) { //成功后执行的函数
						var jsonData = json.data;
						// 专题名称
						document.title =jsonData.bannerName;

						$.each(jsonData.pictures,function(i,el){

							var img = "";

							img += "<img src='" + el +"'>" ;
							$(".contentH5Public .images").append(img);
							
						});
						// H5公募基金模板 显示
						that.getElements.contentH5Public.show();
						// 立即购买按钮跳转链接
						that.getElements.linkUrl = jsonData.url; 
						// “立即购买”按钮处理
						if(!!jsonData.pictureButton){
							var buyImg = "<img src='" + jsonData.pictureButton +"'>" ;
							$('.buttonBuy').append(buyImg);
							$('.buttonBuy a').remove();
						}
						$('.buttonBuy').on('click',function(){
							if (window.currentIsApp) {
								window.location.href = '/productPublic/views/comDetail.html?url='+ that.getElements.linkUrl;
							} else {

								$.elasticLayerTypeTwo({
									id: "tip",
									title: '帮助',
									p: '请下载恒天财富APP进行体验本功能',
									buttonTxt: '去下载',
									zIndex: 100,
									callback: function() {
										//点击去下载按钮，跳转到相应的下载页面
		                                window.location.href=window.commonSetting.downAppUrl;

		                            }
								})

							}
						})
					},
					callbackFail: function(json) { //失败后执行的函数
						tipAction(json.message);
					}
				}];
				$.ajaxLoading(obj);
			}else{
                var obj = [{
                    url: site_url.activity_api, //接口
                    //needLogin:true,//需要判断是否登陆
                    data: {
                        "id": splitUrl()['id'], //id 
                    },
                    callbackDone: function(json) { //成功后执行的函数
    
                        var data = json.data;
                        window.document.title = data.name;

                        $('#HeadBarpathName').html(data.name)
    
                        if (data.isCheckLogin == "1" && data.isCheckRisk == "0") { //需要登录不需要判断风测
                            $.userCheck(false, function() {
                                that.pageRendering(data)
                            });
                        } else if (data.isCheckLogin == "1" && data.isCheckRisk == "1") { //需要登录，需要判断风测
                            $.userCheck(true, function() {
                                that.pageRendering(data)
                            });
                        } else {
                            // 其他情况页面渲染
                            that.pageRendering(data);
                        }
                    },
                    callbackFail: function(json) { //失败后执行的函数
                        tipAction(json.message);
                    }
                }];
                $.ajaxLoading(obj);
            }
            
        },
        pageRendering: function(data) {
            var that = this;
            if (splitUrl()['type'] == "others") { //图片模板

                that.getElements.contentImg.find("img").attr("src", data.imgUrlFeatureDetail)
                that.getElements.contentImg.show(); //图片显示

            } else { //公私募列表模板

                that.getElements.contentBox.find("img").attr("src", data.imgUrlFeatureDetail);

                $.each(data.productFeatureList, function(i, el) {

                    if (splitUrl()['type'] == "privatePlacement") {
                        el.type = true; //私募模板

                    } else if (el.bonusTypeOri == "publicOffering") {

                        el.type = false; //公募模板

                    }
                    if (el.pefType == "2") { //固收
                        el.solid = true;
                    } else if (el.pefType == "3") { //浮收
                        el.solid = false;
                    }
                });
                Handlebars.registerHelper('checkEmpty',function(option){
                    if(option == ''){
                        return option = '--';
                    }else{
                        return option ;   
                    }
                });
                var tplm = $("#productList-template").html();
                //预编译模板 
                var template = Handlebars.compile(tplm);
                var html = template(data.productFeatureList);
                //输入模板 
                $("#modelBox").html(html);

                $.each(data.productFeatureList, function(i, el) {
                    var domainName;

                    // //在跳转模板的时候。首先判断是否是apps域名下的

                    if (window.location.hostname.indexOf('apps.') == 0) {
                        if (splitUrl()['type'] == "publicOffering") {
                            domainName = go_url.pofapp_url;
                        }
                    }else if(window.location.hostname.indexOf('h5.') != -1) {
                        domainName = go_url.h5_url;
                    }
                    else if (envOrigin == '1') {
                        domainName = go_url.wap_url;
                    } else {
                        domainName = '';
                    }

                    if(window.location.hostname.indexOf('h5.') != -1){
                        //如果域名用的是私募的apps.chtfund.com但是参数type=publicOffering前端需要将详情页定位到app的公募的域名上面去
                        //之所以这么做是因为后台程龙代码做转发的时候banner配置的路径只转发了wap和apps的，无法转发apppof的，所以前端暂时控制
                        if (splitUrl()['type'] == "publicOffering") { //是apppof
                            $(".pubLocal").eq(i).attr("href", domainName + "/financial/views/publicPlacement/publicDetail.html?fundCode=" + el.productCode + "&fundType=" + el.pofType);
                        } else if (splitUrl()['type'] == "privatePlacement") {
                            //私募模板全部相处路径跳转（不区分app还是wap）//反之跳转wap对应的产品详情
                            $(".priLocal").eq(i).attr("href", domainName + "/financial/views/privatePlacement/privatePlacementDetail.html?projectId=" + el.productCode);
                        } else if (splitUrl()['type'] == "others") { //出图片不做处理
                            console.log("type is others");
                        } else { //type=publicOffering和wap的域名的时候的跳转路径
                            $(".pubLocal").eq(i).attr("href", domainName + "/financial/views/publicPlacement/publicDetail.html?fundCode=" + el.productCode + "&fundType=" + el.pofType);
                        }
                    }else if (window.location.hostname.indexOf('apps.') != -1){
                        //如果域名用的是私募的apps.chtfund.com但是参数type=publicOffering前端需要将详情页定位到app的公募的域名上面去
                        //之所以这么做是因为后台程龙代码做转发的时候banner配置的路径只转发了wap和apps的，无法转发apppof的，所以前端暂时控制
                        if (splitUrl()['type'] == "publicOffering") { //是apppof
                            $(".pubLocal").eq(i).attr("href", domainName + "/productPublic/views/productDetail.html?fundCode=" + el.productCode + "&fundStatus=" + el.fundStatus);
                        } else if (splitUrl()['type'] == "privatePlacement") {
                            //私募模板全部相处路径跳转（不区分app还是wap）//反之跳转wap对应的产品详情
                            $(".priLocal").eq(i).attr("href", domainName + "/productPrivate/views/prdPrvDetails.html?fundCode=" + el.productCode);
                        } else if (splitUrl()['type'] == "others") { //出图片不做处理
                            console.log("type is others");
                        } else { //type=publicOffering和wap的域名的时候的跳转路径
                            $(".pubLocal").eq(i).attr("href", domainName + "/productPublic/views/productDetail.html?fundCode=" + el.productCode + "&fundStatus=" + el.fundStatus);
                        }
                    }else{
                        if (splitUrl()['type'] == "publicOffering") { //是apppof
                            $(".pubLocal").eq(i).attr("href", domainName + "/productPublic/views/productDetail.html?fundCode=" + el.productCode + "&fundStatus=" + el.fundStatus);
                        } else if (splitUrl()['type'] == "privatePlacement") {
                            //私募模板全部相处路径跳转（不区分app还是wap）//反之跳转wap对应的产品详情
                            $(".priLocal").eq(i).attr("href", domainName + "/productPrivate/views/prdPrvDetails.html?fundCode=" + el.productCode);
                        } else if (splitUrl()['type'] == "others") { //出图片不做处理
                            console.log("type is others");
                        } else { //type=publicOffering和wap的域名的时候的跳转路径
                            $(".pubLocal").eq(i).attr("href", domainName + "/productPublic/views/productDetail.html?fundCode=" + el.productCode + "&fundStatus=" + el.fundStatus);
                        }
                    }

                });

                that.getElements.contentBox.show(); //模板显示
            }
        },
    };

    //调用数据
    model.webInit();
})