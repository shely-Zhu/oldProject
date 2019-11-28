require('./elasticLayer.js');
module.exports = function( message, callback,callbackCel){
    //点击下按钮，显示弹框  
    $('.commonElasticLayer').on('click',function(){ 
        var obj={
            title:'',
            // id: 'emailPop',
            p:'<p class="elastic_p">'+message.title+'</p>',
            yesTxt:message.yesTxt?message.yesTxt:'确认',
            celTxt:message.noText?message.noTxt:'取消',
            zIndex: 999,
            callback:function(t){
                 if(callback){
                    callback(t)
                 }
            },
            callbackCel: function(t){
                if(callbackCel){
                    callbackCel(t)
                }  
            },      
        };
        $.elasticLayer(obj)
    })
}
