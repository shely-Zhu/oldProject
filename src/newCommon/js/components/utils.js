/**
 * 所有页面都需要的基础函数
 * @author  yangjinlai  2016-11-21
 */

$.extend($, {

    util: {


        currentHref: window.location.href, //当前页面地址
		clearPasswords : function(){//清空密码输入框内容
			$(".pwd-input").val('');
			$(".fake-box input").val('')
		},
        objIsEmpty: function(data) {
            //判断一个对象是否为空对象
            function isObjEmpty(obj) {
                for (var i in obj) {
                    return false; //如果不为空，则会执行到这一步，返回false
                }
                return true; //否则返回true
            }

            //判断是否为函数
            function isFunction(data) {
                //原生写法
                if (Object.prototype.toString.call(data) === "[object Function]") {
                    //是函数，表示
                    return true;
                } else {
                    return false;
                }

                //jQ写法
                //if($.isFunction(data)){
                //是函数
                //}
            }

            //判断是否为数组
            function isArray(data) {
                //原生写法
                if (Object.prototype.toString.call(data) === '[object Array]') {
                    //是函数，表示
                    console.log('数组');
                    return true;
                } else {
                    return false;
                }
            }

            //判断是否为字符串
            function isString(data) {
                //原生写法
                if (Object.prototype.toString.call(data) === '[object String]') {
                    //是函数，表示
                    console.log('字符串');
                    return true;
                } else {
                    return false;
                }
            }


            // 1.[1],isNaN([1])--false,[1]  a num,所以先单独判断
            if (isArray(data) && data.length != 0) {
                return false;
            }

            //根据接口文档，该data不会为数字、字符串和函数
            //2. data为数字，字符串、函数，null或undefined，全部按没有数据处理
            if (!data || !isNaN(data) || isFunction(data) || isString(data)) {
                return true;
            }


            //3. data为空数组
            if (isArray(data) && data.length == 0) {
                return true;
            }

            //4. data为空对象
            if (isObjEmpty(data)) {
                return true;
            }

            return false;

            // if( !data || !isNaN(data) || data || isFunction(data)){ 

            //  //2. data为空数组
            //  if(isArray(data) && data.length == 0){
            //      return true;
            //  }

            //  //3. data为空对象
            //  if(isObjEmpty(data)){
            //      return true;
            //  }
            // } 

        },

        //设置a链接的url
        setHrefUrl: function(that, url) {
            $(that).attr('href', url);
        },

        //返回顶部
        goToTop: function(where) {
            if (where) {
                //不是直接回到顶部
                window.location.href = '#' + where;

            } else {
                //回到顶部
                $('body').animate({
                    scrollTop: 0
                })
                //Firefox
                var a_interval = setInterval(function() {
                    document.documentElement.scrollTop -= 60;
                    if (document.documentElement.scrollTop <= 0) {
                        clearInterval(a_interval);
                    }
                }, 10);
            }

        },

        //给数字添加千分位的逗号
        comdify: function(n) {
            //n是传进来的需要添加千分位的数据，格式需要为字符串
            if (typeof n == 'number') {
                n = n + ''; //n如果为数字，转换成字符串
            }
            //添加千分位
            var re = /\d{1,3}(?=(\d{3})+$)/g;
            var n1 = n.replace(/^(\d+)((\.\d+)?)$/,
                function(s, s1, s2) {
                    return s1.replace(re, "$&,") + s2;
                }
            );
            //返回处理过的字符串

            return n1;
        },
        //元-万
        toThousand:function(num) {
            if (num) {
                var n = num / 10000;
                return n;
            } else {
                return num;
            }

        },
        //给数字添加颜色
        numberAddColor: function(ele) {
            var that = this;

            $.each(ele, function(i, el) {
                var num = Number($(el).html().replace(/\,/g, '').replace(/<em>%<\/em>/g, '').replace(/%/g, ''));
                if (num < 0) {
                    //小于0的，添加绿色
                    if (!$(el).hasClass('green')) {
                        $(el).addClass('green');
                    }

                } else if (num > 0) {
                    //大于0的，添加红色
                    if (!$(el).hasClass('red')) {
                        $(el).addClass('red').html('+' + $(el).html());
                    }

                }
                // else{
                //  $(el).addClass('gray');
                // }
            })
        },

        // 字符串百分比转字符串小数
        percentConversion: function(str) {
            var a = str.substring(0, str.length - 1), // 去掉百分号 0.23
                b = str.indexOf('.'), // .的位置  1
                c = a.replace('.', ''), // 去掉.  023
                d = null; // 小数点前移2位后的值

            if ((b - 2) > 0) {
                d = c.slice(0, b - 2) + '.' + c.slice(b - 2);
            } else if (b == 1) { 
                d = '0.0' + c;
            } else {
                d = '0.' + c;
            }
            return d;
        },

        /**
         * [multiplying 乘法]
         * @author songxiaoyu 2018-10-26
         * @param  {[type]} arg1    [如果是百分数，需添加%后传递]
         * @param  {[type]} arg2    [如果是百分数，需添加%后传递]
         * @return {[type]}         [乘法结果]
         */
        multiplying: function(arg1, arg2) {
            var that = this,
                m = 0,
                s1 = arg1.toString(),
                s2 = arg2.toString();

            if (s1.indexOf('%') != '-1') {
                s1 = that.percentConversion(s1);
            }

            if (s2.indexOf('%') != '-1') {
                s2 = that.percentConversion(s2);
            }

            try {
                m += s1.split(".")[1].length;
            } catch (e) {}
            try {
                m += s2.split(".")[1].length;
            } catch (e) {}

            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        },

        numberSub: function(num1,num2){
            var baseNum, baseNum1, baseNum2;
            var precision;// 精度
            try {
                baseNum1 = num1.toString().split(".")[1].length;
            } catch (e) {
                baseNum1 = 0;
            }
            try {
                baseNum2 = num2.toString().split(".")[1].length;
            } catch (e) {
                baseNum2 = 0;
            }
            baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
            precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
            return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
        },

        // 5.null的判断
        isNull: function(data) {
            if (!data && typeof(data) != "undefined" && data != 0) {
                return true
            }
            return false
        },



        //正则表达式集合
        regList: {
            //去掉所有空格
            removeAllSpace: function(str) {
                return str.replace(/\s/g, "")
            },

            //判断是否全是数字
            isAllNumber: function(str) {
                var reg = /^[0-9]*$/;
                return reg.test(str);
            },

            //判断邮箱格式
            checkEmail: function(str) {
                var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                return reg.test(str);
            },

            //判断数字从0-9或是1-9
            checkNumber: function(str) {
                var reg = /^[1-9][0-9]*$/;
                return reg.test(str);
            },

            //去掉中文和英文逗号
            removeComma: function(str) {
                return str.replace(/,/g, '').replace(/，/g, '');
            },

            //把中文逗号改成英文逗号
            changeChinaComma: function(str) {
                return str.replace(/，/g, ',');
            },

            //判断是否是全部一样的数字
            isSameNumber: function(str, n) {
                var re = new RegExp(n, 'g');
                if (str.match(re).length == str.length) {
                    //全是同样的字符
                    return true;
                }
                return false;
            },

            //判断字符串格式是否超出汉字/英文字母包括大小写/·/空格/下划线,用于姓名校验
            isNameCheck: function(str) {
                var reg_1 = /[\u4e00-\u9fa5]/g;
                var reg_2 = /[_]|[·]|[\s]/g;
                var reg_3 = /[_]|[·]|[a-zA-Z]|[\s]/g;

                if (str.replace(reg_1, '').length != 0) {
                    //不是只有中文
                    if (str.replace(reg_3, '').length != 0) {
                        return false;
                    }
                }
                //var reg = /[\u4e00-\u9fa5]|[_]|[·]|[a-zA-Z]|[\s]/g;
                return true;
            },

            //留下所有数字和第一位的.，去掉其他字符
            onlyNumberDian: function(str) {

                //去掉非数字和.
                str = str.replace(/[^\d.]/g, '');

                if (!str) {
                    return str;
                } else {
                    var s_1 = str.match(/\d+.{1}/g);
                    if (s_1) {
                        s_1 = s_1[0];
                        var s_2 = str.match(/\d+.{1}\d{0,2}/g);
                        if (s_2) {
                            s_2 = s_2[0];
                            return s_2;
                        } else {
                            return s_1;
                        }
                    } else {
                        return str;
                    }
                }

            },

        }

    }

})