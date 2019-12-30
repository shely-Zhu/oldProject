/**
 * 动态加载到某个数字
 * @author  songxiaoyu 2017-7-31
 */


(function($) {

    $.fn.counterUp = function(options) {

        // Defaults
        var settings = $.extend({
            'time': 2000,
            'delay': 100,
        }, options);

        return this.each(function() {

            // Store the object
            var $this = $(this);
            var $settings = settings;

            var counterUpper = function() {
                var nums = [];
                var divisions = $settings.time / $settings.delay;
                var num = $this.text();
                var isComma = /[0-9]+,[0-9]+/.test(num);
                num = num.replace(/,/g, '');
                var isInt = /^[0-9]+$/.test(num);
                var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
                var decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;

                for (var i = divisions; i >= 1; i--) {

                    var newNum = parseInt(num / divisions * i);

                    if (isFloat) {
                        newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
                    }

                    if (isComma) {
                        while (/(\d+)(\d{3})/.test(newNum.toString())) {
                            newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
                        }
                    }

                    nums.unshift(newNum);
                }

                $this.text('0');
                var f = function() {
                    $this.text(nums.shift());

                    if (nums.length) {
                        setTimeout($this.countFun, $settings.delay);
                    } else {
                        $this.countFun = null;
                    }
                };

                $this.countFun = f;

                setTimeout($this.countFun, $settings.delay);
            };

            counterUpper()
        });
    };

})(Zepto);