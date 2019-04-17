/***
*我的积分
*@author 2016-12-29 purpleZhao
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
var Base64=require('../../../include/js/vendor/base64/base64.js');
//恒天财富部分组件判断显示与隐藏
require('../../../common/js/components/chtwm/ifChtwm.js');
$(function(){

    var dataLists={

        page : 1,

        dataArray:[],

        uuid:'',

        flag:false,

        //元素获取
        getElements: {
            pageLists:$("#pageLists"),//数据展示区域
            emptyBox : $('#emptyBox'), //没有数据默认显示区块
            totalCount : $("#totalCount"),//总金额
            container : $(".container"),
            btnBind : $("#btnBind"),//解绑按钮
            pullUp : $("#pullUp"),//上拉加载按钮
            errorTip: $(".againEnter"),//错误提示
            listLoading: $('.listLoading'),  //所有数据区域，第一次加载的loading结构
            aptn: $(".aptn") ,//去预约按钮
        }, 

        webinit:function(){  
            var that=this;

            //从localstarage中获取uuid用于入参使用
            //that.uuid = sessionStorage.getItem("uuid");
            
         
            /*页面初始化加载数据ajax请求*/
            that.getList();


        },
/*        getuuId:function(){
            var that = this;

            var num = splitUrl();

            that.uuid = decodeURIComponent(num['uuid']);

            sessionStorage.setItem('uuid',that.uuid);

            //console.log(sessionStorage.getItem("uuid"));
            console.log(that.uuid);
        },*/
        getList:function(){
            var that=this;


            //请求我的资产总金额的入参
            var param1 = {    
                    hmac:"", //预留的加密信息
                    params:{//请求的参数信息
                        //uuid:that.uuid//token
                    }
                };

            //请求我的资产持仓明细的入参
            var param2 = {
                    hmac:"", //预留的加密信息   
                    params:{//请求的参数信息 
                        page_no :"1",// 当前页 
                        page_size:"10",//每页记录数
                        //uuid:that.uuid//token
                    }
            };

            var obj = [{
                url: site_url.totalNum_api,//总资产
                data: param1,
                needLogin:true,//需要判断是否登陆
                //needDataEmpty: false,//不需要判断data是否为空
                callbackDone: function(json){  //成功后执行的函数
                    
                    //积分列表数据请求成功

                    console.log(JSON.stringify(json));

                    that.getElements.totalCount.html(json.data.allTotalAssets);


                },
                callbackNoData:function(json){
 
                }
            },{
                url: site_url.posDetail_api,//持仓明细列表
                data: param2,
                needLogin:true,//需要判断是否登陆
                //needDataEmpty: false,//不需要判断data是否为空
                callbackDone: function(json){  //成功后执行的函数
                    
                    //积分列表数据请求成功

                    console.log(JSON.stringify(json.data.pageList));

                    if( !$.util.objIsEmpty(json.data.pageList) ){
                        $.each(json.data.pageList,function(i,el){
                            if(el.isAllowRedemption=="2"){
                                el.shuhui=true;
                                if(!!el.benefitsFormula){
                                    el.showIncome=true;
                                }
                                if(el.cmsProductType == "2"){
                                    el.showTime=true;
                                }
                            }else{
                                el.shuhui=false;
                            }
                        })
                        var tplm = $("#dataLists").html(); 
                        var template = Handlebars.compile(tplm);
                        var html = template(json.data.pageList); 
                        $("#pageLists").html(html);

                        var pageList = json.data.pageList;

                        if(json.data.pageItems.totalPages == that.page){
                            //$(".load").hide();
                            
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
                url: site_url.JJSTotalAsset_api,
                data: {    
                    hmac: "",
                      //预留的加密信息   
                    params: { //请求的参数信息 

                    }
                },
                callbackDone: function(data) {
                    if( data.data.totalAssets == "0.00" ){
                        $(".dingBtn").hide();
                    }
                },
                     
            }];
            $.ajaxLoading(obj);
        },

        pageAction : function(){
            var that=this;

            //设置可拉动区域的高度
            if(envOrigin == 1){
                var height = windowHeight - $('.banner').height() - $('.bottomNav').height()-$(".chtwm-pay").height() ;
            }else{
                var height = windowHeight - $('.banner').height() - $('.bottomNav').height() ;
            }
            $('#wrapper').height(height).css('top', $('.banner').height() + 'px');

            $('.publicOrPrivateBtn').removeClass('mui-active');
            $('.smBtn').addClass('mui-active'); 

            //下拉加载更多
            var obj = {

                //isGoTop : false,//不显示回到顶部
                callback : function(){ //下拉分页的回调函数
                    that.upPage(); 
                } 

            }

            $.slideFullPage(obj);//初始化                  

        },
        upPage : function(){
            var that=this;

            if(that.flag == false){

                var obj = [{
                    url : site_url.posDetail_api,
                    data: {
                        hmac:"", //预留的加密信息   
                        params:{//请求的参数信息 
                            page_no :that.page,// 当前页 
                            page_size:"10",//每页记录数
                            //uuid:that.uuid//token
                        }
                    },
                    async:false, //同步

                    callbackDone : function(json){
                        $.each(json.data.pageList,function(i,el){
                            if(el.isAllowRedemption=="2"){
                                el.shuhui=true;
                                if(!!el.benefitsFormula){
                                    el.showIncome=true;
                                }
                                if(el.cmsProductType == "2"){
                                    el.showTime=true;
                                }
                            }else{
                                el.shuhui=false;
                            }
                        })
                        var tplm = $("#dataLists").html(); 
                        var template = Handlebars.compile(tplm);
                        var html = template(json.data.pageList); 
                        //输入模板 
                        $("#pageLists").append(html);
                        var pageList = json.data.pageList;

                        if(json.data.pageItems.totalPages == that.page){
                            //$(".load").hide();
                            
                            console.log("加载结束最后一页");
                            that.flag = true;


                        }else{
                            that.page++ ;
                        }      

                        $('#pullUp').css('visibility', 'hidden');          
                    },
                    
                }];
                $.ajaxLoading(obj);  
            }
            else{

                console.log("这是最后一页");
                console.log( $(".pullUpLabel").html());

                $("#pullUp").removeClass('loading');

                $(".pullUpIcon").html("");
               
                $(".pullUpLabel").html("没有更多了")
            }           
        },
        //触发事件
        event : function(){
            var that=this;
            $(".publicPrivateTwo .gmBtn").on('click',function(){
                that.getElements.listLoading.show();
                var obj = [{
                    url: site_url.user_api,
                    data:{    
                        hmac:"", //预留的加密信息     
                        params:{//请求的参数信息 
                        }
                    } ,
                    needLogin: true,
                    needDataEmpty: false,
                    //needRisk: true,
                    //riskTxt: '' ,
                    callbackDone: function(json){
                         that.getElements.listLoading.hide();

                        var jsonData = json.data;


                        //判断私募是否已实名认证
                        if( jsonData.isCertification == 1 || !jsonData.clientId){
                            if( envOrigin==1 ){//财富页面   4.0后改版直接跳转不提示
                                window.location.href=site_url.htcf_asset_url;
                                return false;
                            }else{
                                //私募未做实名认证，或公募未开户
                                $('.openAccount').show();
                                return false;
                            }
                        }
                        //以上都通过，跳转到公募资产页面
                        window.location.href="/pay/views/payThemeCash.html";
                    },
                    callbackFail:function(json){
                         that.getElements.listLoading.hide();
                         tipAction(json.msg);
                    }
                }]
                $.ajaxLoading(obj);
            })
            that.getElements.pageLists.on("click",".datalist",function(e){
                if( envOrigin==1 ){//财富页面
                    //财富页面   4.0后改版直接跳转不提示
                    window.location.href=site_url.htcf_asset_url;
                }else{
                    if(e.target==$(this).find(".operate")[0]||e.srcElement==$(this).find(".operate")[0]){                   
                        var t=$(this).find(".operate")[0];
                        $.elasticLayer({
                            id:"ransom",
                            title: '提示',  //如果不传默认为'尊敬的用户'
                            p: '赎回后不可撤单，确定要赎回？', 
                            yesTxt : '确定' ,
                            celTxt : '取消', 
                            zIndex: 30, 
                            yesButtonPosition: 'right', 
                            callbackCel: $.noop, 
                            callback :function(){
                                sessionStorage.prvFundName=$(t).attr("fundName");
                                sessionStorage.prvAllowRedemptionShare=$(t).attr("allowRedemptionShare");
                                sessionStorage.prvFundCode=$(t).attr("fundCode");
                                window.location.href="/pay/views/prvPayRansomOne.html?cmsProductType="+$(t).attr("cmsProductType");                         
                            }
                        });
                    }else if(e.target==$(this).find(".intro")[0]||e.srcElement==$(this).find(".intro")[0]||
                    e.target==$(this).find(".intro .iconfont")[0] || e.srcElement==$(this).find(".intro .iconfont")[0]){
                        if($(this).find('.iconfont').length != 0){
                            $.elasticLayerTypeTwo({
                                title: '收益计算公式', //如果不传默认为'尊敬的用户'
                                p: '计算公式：'+$(this).find('.intro').attr('description'),
                                buttonTxt: '知道了', //
                                //yesTxt : '确定' , //确定按钮的文案，不传默认为确定
                                //celTxt : '取消', //返回按钮的文案，不传默认为返回
                                zIndex: 100, //该弹层的z-index，因为不知道有几个弹层和弹层顺序，不传默认为100
                                //yesButtonPosition: 'left', //确定按钮在左边还是在右边，不传的话，默认为'left'，在左边，如果在右边，传'right'
                                //callbackCel: $.noop, //取消按钮的回调函数，默认为空
                                callback: $.noop, //确定按钮的回调函数，默认为空(jQuery的空函数，仅仅想要传递一个空函数的时候可以使用)
                                //iconTxt: '', //icon的值
                                isHide: true, //弹窗是否隐藏,默认隐藏
                            })
                        }else{
                            window.location.href='/productPrivate/views/prdPrvDetails.html?fundCode='+$(this).attr("fundCode");
                        }
                    }else{
                        window.location.href='/productPrivate/views/prdPrvDetails.html?fundCode='+$(this).attr("fundCode");
                    }
                }
            });
            that.getElements.aptn.on("click",function(){
                if( envOrigin==1 ){//财富页面
                    //财富页面   4.0后改版直接跳转不提示
                    window.location.href=site_url.htcf_asset_url;
                }else{
                    that.getElements.listLoading.show();
                    //请求用户信息接口
                    var obj = [{
                        url: site_url.user_api,
                        data: {
                            hmac:"", //预留的加密信息     
                            params:{//请求的参数信息 
                            }
                        },
                        needLogin: true,
                        needDataEmpty: false,
                        callbackDone: function(json){
                            that.getElements.listLoading.hide();
                            if(json.data.isRiskAppraisal=="1"){
                                //弹框提示
                                var riskObj = {
                                    p: '<p class="elastic_p">根据《证券期货投资者适当性管理办法》，我司需了解您的风险承受能力，为您提供明确的适当性匹配意见，请您填写完成风险测评问卷，测评确定您的风险承受能力，为您匹配选择合适的理财产品。</p>',
                                    yesTxt: '暂不测评',
                                    celTxt: '立即测评', 
                                    callback: function(t){
                                        t.hide();
                                    },
                                    callbackCel: function(t){
                                        //弹出风险测评弹出层后的处理
                                        //执行传进来的去风险测评的回调函数
                                        if( json.data.custType == 1 ){
                                            //个人，跳转到私募风险测评，
                                            //originUrl需要配置为私募产品列表页
                                            window.location.href = site_url.questionnairePer_url +'&originUrl='+ new Base64().encode(site_url.prdPrvLists_url);
                                        }else{
                                            //机构
                                            window.location.href = site_url.questionnaireOrg_url +'&originUrl='+ new Base64().encode(site_url.prdPrvLists_url);
                                        }
    
                                        t.hide();
                                    }
                                }
                                $.elasticLayer( riskObj );
                            }else{
                                //成功，跳转到私募列表页
                                that.getElements.listLoading.hide();
                                window.location.href = site_url.prdPrvLists_url;
                            }
                        },
                        callbackFail: function(json){
                            that.getElements.listLoading.hide();
                            tipAction( json.msg );
                        }, 
                    }]
                    $.ajaxLoading(obj);
                }
            });
            $(".dingBtn").on("click",function(){
                window.location.href="/personal/views/pledge.html";  
            });
        },

        unBindFn:function(t){
            var that=this;

            var obj = [{
                url : site_url.unbind_api,
                data: {
                    hmac:"", //预留的加密信息   
                    params:{//请求的参数信息 
                        //uuid:that.uuid//token
                    }
                },
                needDataEmpty: false,//不需要判断data是否为空

                callbackDone : function(json){

                    t.hide();

                    that.getElements.errorTip.show();
                    that.getElements.errorTip.find(".tipWrapper").html("您已成功退出登录");//登录超时提示

                    setTimeout(function(){
                        that.getElements.errorTip.hide();//提示消失

                        //跳转到微信授权登陆页
                        window.location.href = go_url.wx_login_url + window.location.origin + window.location.pathname;
                     
                        console.log("跳转到登录页");  
                                                        
                    },2000)
                                            
                },

                callbackFail: function(json){
                    t.hide();
                    t.$yes.removeAttr('disabled').removeClass('disable');

                    that.getElements.errorTip.show();
                    that.getElements.errorTip.find(".tipWrapper").html(json.msg);//登录超时提示

                    setTimeout(function(){
                        that.getElements.errorTip.hide();
                    }, 2000);
                }
            }];
            $.ajaxLoading(obj);
        }
    };

    dataLists.webinit();//页面初始化
    dataLists.pageAction();//下拉加载

    dataLists.event();//解绑事件



    
})

