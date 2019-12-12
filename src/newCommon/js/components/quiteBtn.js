/**
 * 退出登录按钮点击
 *
 * sso修改：、
 * site_url.logOut_html_url +'?redirectUrl='+new Base64().encode(site_url.index_url) +'&stayFlag=back';
 * redirectUrl  退出后在登录需要跳转的页面
 * &stayFlag=back  表示退出后立马返回redirectUrl指定的页面（该页面一定是非登录可展示的页面），不携带表示退出后停留在登录页面
 * 
 */

require('./elasticLayer.js');
require('./tipAction.js');

mui("body").on('tap', '.quiteBtn', function() {

    var showObj = {
        //id : 'confirmAway' , //该弹层的id，不传的话，默认为 'elasticLayer'
        //title: '尊敬的用户', //大标题
        p: '<p class="elastic_p">您是否确定要退出登录？</p>',
        //yesButtonPosition: 'right',
        callback: function(t) {
            //确认离开  
            t.hide();
             window.location.href = site_url.logOut_html_url + '?redirectUrl=' + encodeURI(encodeURI(site_url.cft_index_url));

        },
        callbackCel: function(t) {
            //取消离开
            t.hide();
        },
        zIndex: 100, //z-index
    };
    $.elasticLayer(showObj);
})