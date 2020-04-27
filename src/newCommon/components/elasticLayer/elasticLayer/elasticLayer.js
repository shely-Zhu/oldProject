/**
 * 弹出层插件
 * @author yangjinlai 
 * @time 2016-09-19
 *
 * 生成弹出层结构并插入到body标签的最底部
 * 在调用弹出层的地方插入，因此一次只会初始化一个弹出层
 * 
 * 调用方式：
 * var obj = {
 *  title: '',  //标题，插件里默认设置为'尊敬的客户'
 *  id: '', //插件里会默认设置，可不传
 *  p: '', //弹层上显示的文案，是一段dom结构，如:
 *          //<p class="elastic_p">文字文字文字<span>变色文字变色文字</span>文字文字文字</p>
 *          //<span>是文案中需要变色的部分
 *  yesTxt: '', //确定按钮的文案，插件里默认为确定
 *  celTxt： '', //取消按钮的文案，插件里默认为取消
 *  yesButtonPosition: '', //确定按钮的位置，插件里默认设置为'left'，在左边
 *  callback: function(t){}, //确定按钮的回调函数，插件里默认设置为一个空函数，
 *                          //这里的t，代表该插件
 *                          //提供了插件的隐藏事件，使用方式：
 *                          //callback: function(t){
 *                              //t.hide();
 *                          //}
 *                          //这样就可以在点击确定按钮后隐藏本弹层
 *  callbackCel: function(t){}, //取消按钮的回调函数，逻辑同callback()
 *  zIndex: '', 弹层的z-index值，插件里默认设置为100
 *  iconTxt: '', 是否需要显示icon，传值时，表示有icon, 该值即为icon的值，插件默认不显示icon
 * }
 * $.elasticLayer(obj);
 * 
 * 如果外部代码需要使用该弹出层，则可以传id参数，用于区分，如果不在外部使用，id参数可不传
 * obj只是传给插件的配置参数，$.elasticLayer(obj)这句话才是初始化弹层
 *
 */

;
(function($, window, document, undefined) {

    /*
     * 给jQuery插件扩展elasticLayer方法
     * 外部调用方式：$.elasticLayer(obj);
     *
     * 弹层在使用的时候初始化，因此初始化的时候只会有一个弹层
     */
    $.extend($, {

        elasticLayer: function(options) {

            var Layer = function(opts) {

                this.$body = $('body'); //body元素

                //默认参数
                this.defaults = {
                    id: 'elasticLayer', //弹层的唯一id 不传默认为elasticLayer，如果多个弹层的话要传，否则区分不了
                    title: '', //如果不传，默认不显示标题
                    p: '',  //弹层上文案
                    zIndex: 10000000, //该弹层的z-index，因为不知道有几个弹层和弹层顺序，不传默认为100

                    //yes按钮相关
                    yesTxt: '确定', //确定按钮的文案，不传默认为确定
                    yesButtonPosition: 'right', //确定按钮在左边还是在右边，不传的话，默认为'left'，在左边，如果在右边，传'right'
                    callback: $.noop, //确定按钮的回调函数，默认为空(jQuery的空函数，仅仅想要传递一个空函数的时候可以使用)
                    needYesHref: false, //是否需要把确定按钮改成a标签，默认false
                    yesHref: 'javascript:;', //确定按钮a链接的默认href

                    //cel按钮相关
                    celTxt: '取消', //返回按钮的文案，不传默认为返回
                    callbackCel: $.noop, //取消按钮的回调函数，默认为空
                    needCelHref: false, //是否需要把取消按钮改成a标签，默认false
                    celHref: 'javascript:;', //取消按钮a链接的默认href
                    celIsHide:true,//点击返回按钮是否关闭弹窗 默认关闭
                    iconTxt: '', //icon的值
                    iconType: 'green', //icon的颜色
                    
                    hideCelButton: false, //为true时隐藏cel按钮，仅使用yes按钮的所有属性

                    htmdEvtYes:'',  // 埋点确定按钮属性
                    htmdEvtCel:'',  // 埋点取消按钮属性
                    isClose:true,
                }

                this.options = $.extend({}, this.defaults, opts)
            }


            Layer.prototype = {

                /*
                    初始化
                    进行弹层结构的生成并插入，绑定各事件等
                 */
                init: function() {
                    var that = this;

                    var $id = $('#' + that.options.id);
                    if ($id.length != 0) {
                        //如果页面上已经有这个弹层了，删除弹出层，重新进行页面初始化
                        $id.remove();
                    }

                    //生成结构并插入
                    that.creatDom();

                    //绑定确定按钮和关闭按钮事件
                    that.celEvent();
                    that.yesEvent();
                },


                /*
                    生成弹层的DOM结构，并插入到body标签的最底部
                 */
                creatDom: function() {
                    var that = this;

                    //弹层DOM结构
                    var html = '<div class="elasticLayer" id="' + that.options.id + '" style="z-index:' + that.options.zIndex + '">' +
                        '<div class="elasticWrapper">' +
                        '<div class="elasticMid">' +
                        '<div class="elasticTxt">';

                    //判断是否需要显示icon
                    if (that.options.iconTxt) {
                        //有icon值，需要显示
                        html += '<div class="elasticTitle"><i class="iconfont ' + that.options.iconType + '">' + that.options.iconTxt + '</i></div>';
                    } else if ( that.options.title) {
                        //没有icon，有title的时候，显示标题
                        html += '<div class="elasticTitle"><p class="elasticTitleP">' + that.options.title + '</p></div>';
                    }

                    //显示中间部分文案
                    html += '<div class="elasticP"><div class="elasticPMiddle">' + that.options.p + '</div></div></div>' +
                        '<div class="elasticButtons">';

                    if( that.options.hideCelButton ){
                        //只有一个按钮
                        if (that.options.needYesHref) {
                            //需要变成a链接
                            html += '<a class="positionMiddle elasticYes" href="' + that.options.yesHref + '">' + that.options.yesTxt + '</a>';
                        } else {
                            html += '<button class="positionMiddle elasticYes"><span class="elasticSpan">' + that.options.yesTxt + '</span></button>';
                        }
                    }
                    else if (that.options.yesButtonPosition == 'left') {
                        //确定按钮在左边
                        if (that.options.needYesHref) {
                            //确定按钮需要变成a链接
                            html += '<a class="positionLeft elasticYes" href="' + that.options.yesHref + '">' + that.options.yesTxt + '</a>';
                        } else {
                            html += '<button class="positionLeft elasticYes"><span class="elasticSpan">' + that.options.yesTxt + '</span></button>';
                        }
                        if (that.options.needCelHref) {
                            //取消按钮需要变成a链接
                            html += '<a class="positionLeft elasticYes" href="' + that.options.yesHref + '">' + that.options.yesTxt + '</a>';
                        } else {
                            html += '<button class="positionRight elasticCel"><span class="elasticSpan">' + that.options.celTxt + '</span></button>';
                        }
                    } else {

                        if (that.options.needCelHref) {
                            //取消按钮需要变成a链接
                            html += '<a class="positionLeft elasticCel" href="' + that.options.celHref + '">' + that.options.celTxt + '</a>';
                        } else {
                            html += '<button class="positionLeft elasticCel"><span class="elasticSpan">' + that.options.celTxt + '</span></button>';
                        }
                        if (that.options.needYesHref) {
                            //确定按钮需要变成a链接
                            html += '<a class="positionRight elasticYes" href="' + that.options.yesHref + '">' + that.options.yesTxt + '</a>';
                        } else {
                            html += '<button class="positionRight elasticYes"><span class="elasticSpan">' + that.options.yesTxt + '</span></button>';
                        }
                    }

                    html += '</div></div></div></div>';


                    that.$body.append(html);

                    //获取元素
                    that.setElements();

                    //文案中间的span变颜色
                    that.elastic.find('.elastic_p span').addClass('sTxt');

                },

                setElements: function() {
                    var that = this;

                    that.elastic = $('#' + that.options.id);

                    //that.$yes为该弹层的确定按钮
                    that.$yes = that.elastic.find('.elasticYes');

                    //that.$cel 为该弹层的关闭按钮
                    that.$cel = that.elastic.find('.elasticCel');

                },


                /*
                    绑定关闭按钮点击事件
                 */
                celEvent: function() {
                    var that = this;
                    that.$cel.on('click', function() {
                        //关闭按钮事件即隐藏当前弹层
                        if(that.options.celIsHide){
                            $(this).parents('.elasticLayer').hide();
                        }
                        window._submitMd && window._submitMd( 3, that.options.htmdEvtCel, this);
                        that.options.callbackCel(that);

                    })
                },

                /*
                    确定按钮事件
                 */
                yesEvent: function() {
                    var that = this;
                    that.$yes.on('click', function() {
                        //调用的是callback回调函数
                        window._submitMd && window._submitMd( 3, that.options.htmdEvtYes, this );
                        that.options.callback(that);
                        if(that.options.isClose){
                            $(this).parents('.elasticLayer').hide();
                        }
                    })
                },

                /*
            隐藏当前弹出层
            */
                hide: function() {
                    var that = this;
                    that.$yes.parents('.elasticLayer').hide();
                }

            }




            //初始化弹层
            var layer = new Layer(options);
            layer.init();

        }



    })


})(Zepto, window, document);