/*
 * @page: 
 * @Author: songxiaoyu
 * @Date:   2019-01-15 14:00:55
 * @Last Modified by:   songxiaoyu
 * @description:
 */

var xssFilter = require('xssfilter');
var xssfilter = new xssFilter({
    matchStyleTag: false,
    matchScriptTag: false,
    removeMatchedTag: false,
    escape: true
});

module.exports = {

    // 校验在短信验证码之前的表单
    checkBeforeDxzym: function(allInputArr, dxIndex) {
        var checkArr = [];

        $.each(allInputArr, function(i, el) {

            if (el.checkIndex < dxIndex) { //在短信验证码前面的

                var b_r = el.checkObj.beforeCheck(el);

                if (!b_r[1]) { //如果不是回显数据

                    if (!!b_r[0]) { //通过校验

                        if (b_r[0] == '') {
                            b_r[0] = '';
                        }
                        checkArr.push({ //添加到checkArr中
                            check: el.checkAttr,
                            result: $.trim(xssfilter.filter(b_r[0]))
                        })

                    } else {
                        checkArr = false;
                        return false;
                    }

                } else {
                    checkArr.push({ //添加到checkArr中
                        check: el.checkAttr,
                        result: b_r[0]
                    })
                }
                //return checkArr;
            }
        })

        return checkArr;
    },
}