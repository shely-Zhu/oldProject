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
require('../vendor/config.js');

//zepto模块
require('../vendor/zepto/callback.js');
require('../vendor/zepto/deferred.js');

//黑色提示条
var tipAction = require('../../../common/js/components/tipAction.js');
require('../../../common/js/components/utils.js');
require('../../../common/js/ajaxLoading.js');
var splitUrl = require('../../../common/js/components/splitUrl.js');
require('../../../common/js/userCheck.js');

require('../../../common/js/components/app/requireAppDown.js');

$(function() {

    var model = {

        getElements: {
            contentImg: $("#contentImg"), //图片
            contentBox: $('#contentBox'), //有产品模板
            priLocal: $(".priLocal"), //私募产品列表跳转链接
            pubLocal: $(".pubLocal"), //公募产品列表跳转链接
        },
        webInit: function() {

            var that = this;

            /*if(splitUrl()['appActivity'] == "1"){//app中引入专题时产品列表跳转到app服务器的详情页

                that.getElements.priLocal.attr("href", go_url.apps_url + "/productPrivate/views/prdPrvDetails.html?fundCode={{productCode}}");
                that.getElements.pubLocal.attr("href", go_url.pofapp_url + "/productPublic/views/productDetail.html?fundCode={{productCode}}");

            }else{//非app中引入专题时产品列表跳转到wap服务器的详情页

            }*/

            //发送ajax请求
            var obj = [{
                url: site_url.activity_api, //接口
                //needLogin:true,//需要判断是否登陆
                data: {
                    "hmac": "", //预留的加密信息
                    "params": { //请求的参数信息
                        "id": splitUrl()['id'], //id 
                    }
                },
                callbackDone: function(json) { //成功后执行的函数

                    var data = json.data;
                    window.document.title = data.name;

                    if (data.isCheckLogin == "1" && data.isCheckRisk == "0") { //需要判断是否评测
                        $.userCheck(false, function() {
                            that.pageRendering(data)
                        });
                    } else if (data.isCheckLogin == "1" && data.isCheckRisk == "1") { //需要判断是否评测
                        $.userCheck(true, function() {
                            that.pageRendering(data)
                        });
                    } else {
                        // 其他情况页面渲染
                        that.pageRendering(data);
                    }
                },
                callbackFail: function(json) { //失败后执行的函数
                    tipAction(json.msg);
                }
            }];
            $.ajaxLoading(obj);
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

                var tplm = $("#productList-template").html();
                //预编译模板 
                var template = Handlebars.compile(tplm);
                var html = template(data.productFeatureList);
                //输入模板 
                $("#modelBox").html(html);

                $.each(data.productFeatureList, function(i, el) {
                    var domainName;
                    var domainName;

                    //在跳转模板的时候。首先判断是否是apps域名下的

                    if (window.location.hostname.indexOf('apps.') == 0) {
                        if (splitUrl()['type'] == "publicOffering") {
                            domainName = go_url.pofapp_url;
                        }
                    } else if (envOrigin == '1') {
                        domainName = go_url.wap_url;
                    } else {
                        domainName = '';
                    }

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
                });

                that.getElements.contentBox.show(); //模板显示
            }
        }
    };

    //调用数据
    model.webInit();
})