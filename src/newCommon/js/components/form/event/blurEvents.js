/*
 * @page: 离焦事件统一绑定
 * @Author: songxiaoyu
 * @Date:   2019-01-14 14:47:55
 * @Last Modified by:   songxiaoyu
 * @description:
 */


/**
 * 若当前页面上有表单，为了使点击按钮时不触发输入框的离焦校验事件
 * 给所有按钮绑定事件
 *
 * （按钮上有btn class才能绑定上）
 */


// 表单相关事件绑定
var eventsFunc = require('./eventsFunc.js');

var windowHref = window.location.href;


$(function() {
    $(document)
        .on('touchstart', '.btnButton .nextBtn', function(e) {
            $(this).attr('hover', 'isHover');
        })
})


module.exports = function(allInputArr, dxIndex) {
    $('body')
        //当鼠标放在这几个节点上时，添加class，此时点击按钮不会触发离焦事件
        //避免点击按钮时校验，离焦也校验
        .on('touchstart', '.btnButton .nextBtn', function(e) {
            $(this).attr('hover', 'isHover');
        })

        // 短信验证码的离焦
        .on('blur', 'input[check=dxyzm]', function(e) {
            var $this = $(this),
                result;

            if (windowHref.indexOf('register.html') == -1 && windowHref.indexOf('phoneVerify.html') == -1) {
                // 不是注册和忘记密码页面，不执行离焦,不判断；
                return false;
            } else {
                if ($('.nextBtn').attr('hover') == 'isHover') {
                    //此时是直接点击了下一步按钮，不执行离焦事件了，防止执行2次离焦事件
                    return false;
                }

                if (!$this.val()) { // 非空不判断了
                    return false;
                }

                // 校验验证码之前表单
                result = eventsFunc.checkBeforeDxzym(allInputArr, dxIndex);

                if (!result) {
                    console.log('未通过校验');
                    return false;
                }

                // 触发校验短信验证码自身校验
                allInputArr[dxIndex].checkObj.beforeCheck(allInputArr[dxIndex]);
            }
        })
        // 短信验证码的聚焦
        .on('focus', 'input[check=dxyzm]', function(e) {
            // 聚焦移除提交按钮的hover
            $('.btnButton .nextBtn').removeAttr('hover');
        })
}