require('@pathIncludJs/vendor/mui/mui.picker.min.js');

mui("body").on("tap", ".timeSelect", function(e) {
    $('input,textarea').blur();

    if (!$('[check=timeSelect]').hasClass('unable')) {
        var dtpicker = new mui.DtPicker({
            type: "date", //设置日历初始视图模式 
            beginDate: new Date("1901", "00", "01"), //设置开始日期 
            endDate: new Date('2099', '12', '29'), //设置结束日期 
            labels: ['年', '月', '日'], //设置默认标签区域提示语 
        })
        dtpicker.show(function(selectItems) {
            //点击确定
            $(".timeSelect a").html(selectItems.text).addClass("hasSelect").attr("num", "1");
            dtpicker.dispose();
        })
    }
});
