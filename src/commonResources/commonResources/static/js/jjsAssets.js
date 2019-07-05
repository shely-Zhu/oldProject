/***
*其他资产(定融定投)
*@author 2019-7-3 shiyunrui
*/
//ajax调用
require('../../../common/js/components/utils.js');

//ajax调用
require('../../../common/js/ajaxLoading.js');
//zepto模块--callback
require('../../../include/js/vendor/zepto/callback.js');
//zepto模块--deferred
require('../../../include/js/vendor/zepto/deferred.js');
//路径配置文件
require('../../../include/js/vendor/config.js');
//下拉加载更多
require('../../../common/js/scrollFullPage.js');
//立即绑定/暂不绑定弹层
require('../../../common/js/components/accountOrBind.js');
require('../../../common/js/components/bottomNav.js');
//下拉加载
require('../../../common/js/components/elasticLayer.js');
//黑色提示条的显示和隐藏
var tipAction = require('../../../common/js/components/tipAction.js');
var Base64 = require('../../../include/js/vendor/base64/base64.js');
//恒天财富部分组件判断显示与隐藏
require('../../../common/js/components/chtwm/ifChtwm.js');
$(function () {

    var dataLists = {

        page: 1,

        dataArray: [],

        uuid: '',

        flag: false,//是否有更多数据 true：无更多数据

        //元素获取
        getElements: {
            pageLists: $("#pageLists"),//数据展示区域
            emptyBox: $('#emptyBox'), //没有数据默认显示区块
            totalCount: $("#totalCount"),//总金额
            container: $(".container"),
            btnBind: $("#btnBind"),//解绑按钮
            pullUp: $("#pullUp"),//上拉加载按钮
            errorTip: $(".againEnter"),//错误提示
            listLoading: $('.listLoading'),  //所有数据区域，第一次加载的loading结构
            aptn: $(".aptn"),//去预约按钮
        },

        webinit: function () {
            var that = this;

            /*页面初始化加载数据ajax请求*/
            that.getList();
        },

        getList: function () {
            var that=this;

            //请求jjs持仓明细入参
            var param = {
                    hmac:"", //预留的加密信息   
                    params:{//请求的参数信息 
                        page_no :"1",// 当前页 
                        page_size:"10",//每页记录数
                        //uuid:that.uuid//token
                    }
            };

            var obj = [{
                url: site_url.jjsAssetsDetail_api,//jjs持仓明细列表
                data: param,
                needLogin:true,//需要判断是否登陆
                //needDataEmpty: false,//不需要判断data是否为空
                callbackDone: function(json){  //成功后执行的函数

                    //jjs列表数据请求成功

                    console.log(JSON.stringify(json.data.pageList));

                    if(!$.util.objIsEmpty(json.data.pageList) ){
                        //加载模板数据
                        var tplm = $("#dataLists").html(); 
                        var template = Handlebars.compile(tplm);
                        var html = template(json.data.pageList); 
                        $("#pageLists").html(html);

                        var pageList = json.data.pageList;

                        if(json.status == '1000'){
                            //返回状态码为1000 无更多数据
                            console.log("加载结束最后一页");

                            that.flag = true;

                        }else{
                            that.page++ ;
                        }

                    }
                    else{
                        that.getElements.pullUp.hide();//上拉加载区域隐藏
                        that.getElements.pageLists.hide();//展示数据区域隐藏
                        that.getElements.emptyBox.show();//没有数据显示状态
                    }

               }
            },{
                url: site_url.JJSTotalAsset_api,//jjs资产查询
                data: {    
                    hmac: "",
                      //预留的加密信息   
                    params: { //请求的参数信息 

                    }
                },
                callbackDone: function(data) {
                    console.log(JSON.stringify(json));

                    that.getElements.totalCount.html(json.data.jJSAssets);
                },

            }];
            $.ajaxLoading(obj);
        },

        pageAction: function () {
            var that = this;

            //设置可拉动区域的高度
            if (envOrigin == 1) {
                var height = windowHeight - $('.banner').height() - $('.bottomNav').height() - $(".chtwm-pay").height();
            } else {
                var height = windowHeight - $('.banner').height() - $('.bottomNav').height();
            }
            $('#wrapper').height(height).css('top', $('.banner').height() + 'px');

            $('.publicOrPrivateBtn').removeClass('mui-active');
            $('.smBtn').addClass('mui-active');

            //下拉加载更多
            var obj = {

                //isGoTop : false,//不显示回到顶部
                callback: function () { //下拉分页的回调函数
                    that.upPage();
                }

            }

            $.slideFullPage(obj);//初始化                  

        },
        upPage: function () {
            var that = this;

            if (that.flag == false) {

                var obj = [{
                    url: site_url.posDetail_api,
                    data: {
                        hmac: "", //预留的加密信息   
                        params: {//请求的参数信息 
                            page_no: that.page,// 当前页 
                            page_size: "10",//每页记录数
                            //uuid:that.uuid//token
                        }
                    },
                    async: false, //同步

                    callbackDone: function (json) {
                        var tplm = $("#dataLists").html();
                        var template = Handlebars.compile(tplm);
                        var html = template(json.data.pageList);
                        //输入模板 
                        $("#pageLists").append(html);
                        var pageList = json.data.pageList;

                        if (json.status == '1000') {
                            //状态码为1000 无更多数据
                            console.log("加载结束最后一页");
                            that.flag = true;

                        } else {
                            that.page++;
                        }

                        $('#pullUp').css('visibility', 'hidden');
                    },

                }];
                $.ajaxLoading(obj);
            }
            else {

                console.log("这是最后一页");
                console.log($(".pullUpLabel").html());

                $("#pullUp").removeClass('loading');

                $(".pullUpIcon").html("");

                $(".pullUpLabel").html("没有更多了")
            }
        },
    };

    dataLists.webinit();//页面初始化
    dataLists.pageAction();//下拉加载
    
})

