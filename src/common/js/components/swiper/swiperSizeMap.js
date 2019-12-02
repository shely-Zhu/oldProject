/**
 * swiper 轮播第一张大图
 * @author  caoqihai 2019-11-28
 *
 * 参数
 * list 轮播循环的数据
 * child  需要改变大小的 dom 的 class名

                                 
 */

module.exports = function(list,child) {
    for(i = 0; i < list.length; i++){
        slide = list.eq(i);
        slideProgress = list[i].progress;
        prevIndent = 4 == i ? .3228 : .0898;
        scale = 1 > Math.abs(slideProgress + prevIndent) ? .4 * (1 - Math.abs(slideProgress + prevIndent)) + 1 : 1;
        slide.find("." + child).transform("scale3d(" +scale + "," + scale + ",1)");                            
    } 
};