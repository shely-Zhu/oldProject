/*
 * @page: mui轮播图
 * @Author: yangjinlai
 * @Date:   2017-05-08 14:25:24
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-05-08 16:06:29
 * @description: 
 */

/**
 * [exports description]
 * @author yangjinlai 2018-05-08
 * @param  {[string]} $el     [容器]
 * @param  {[arr]} imgArr  [图片数组]
 * @param  {[number]} time    [间隔时间,0不自动播放]
 * @param  {[boolean]} bool    [是否显示轮播点]
 * @param  {[boolean]} notLoop [是否循环播放,默认循环]
 * @return {[type]}         [description]
 */
module.exports = function($el, imgArr, time, bool, notLoop) {
    var interval = 4000, // 时间间隔
        showDot = true; // 滑点

    (typeof(time) != 'undefined') && (interval = time);
    (typeof(bool) != 'undefined') && (showDot = bool);

    //开始生成结构
    var html = '<div class="mui-slider muiSlider" style="height:100%;">',
        htmlEnd = '</div>';

    //图片结构
    var imgHtml = '';
    if (notLoop) {
        // 不循环滑动，不添加mui-slider-loop
        imgHtml = '<div class="mui-slider-group" style="height:100%;">';
    } else {
        // mui在轮播的时候，如果要循环，需要在开始重复插入最后一条
        imgHtml = '<div class="mui-slider-group mui-slider-loop" style="height:100%;">';
        imgHtml += '<div class="mui-slider-item mui-slider-item-duplicate">' +
            '<a href="' + imgArr[imgArr.length - 1].linkUrl + '" style="height:100%;">' +
            '<img src="' + imgArr[imgArr.length - 1].imgUrl + '" style="height:100%;"></a></div>';
    }
    //点结构
    if (showDot) {
        var dotHtml = '<div class="mui-slider-indicator">';
    } else {
        var dotHtml = '<div class="mui-slider-indicator" style="display:none;">';
    }

    $.each(imgArr, function(i, el) {
        debugger
        imgHtml += '<div class="mui-slider-item" style="height:100%;">' +
            '<div href="' + el.externalUrl + '" style="height:100%;" externalUrl="'+ el.externalUrl +'">' +
            '<img src="' + el.imgUrl + '" style="height:100%;">' +
            '</div></div>';
        //点
        dotHtml += '<div class="mui-indicator"></div>';
    })

    if (!notLoop) {
        // mui在轮播的时候，如果要循环，需要在最后重复插入第一条
        imgHtml += '<div class="mui-slider-item mui-slider-item-duplicate">' +
            '<div href="' + imgArr[imgArr.length - 1].linkUrl + '" style="height:100%;" externalUrl="'+ imgArr[imgArr.length - 1].externalUrl +'">' +
            '<img src="' + imgArr[0].imgUrl + '" style="height:100%;"></div></div>';
    }

    imgHtml += '</div>';
    dotHtml += '</div>';

    //把生成的整体结构插入到$el中
    $el.append(html + imgHtml + dotHtml + htmlEnd);

    //为第一张图片和第一个点添加mui-active class
    $el.find('.mui-slider-group .mui-slider-item').eq(0).addClass('mui-active');
    $el.find('.mui-slider-indicator .mui-indicator').eq(0).addClass('mui-active');

    //初始化轮播
    mui.init({
        swipeBack: true //启用右滑关闭功能
    });
    var slider = mui(".muiSlider");
    slider.slider({
        interval: interval //4s一张
    });
}