/*
*音频组件js
*purpleZhao   2019-12-04
*
*使用说明：
*1，页面引入音频组件html————————————@@include('@pathCommonCom/audio/audio.html')
*2，less文件引入音频组件less————————@import url("@pathCommonCom/audio/audio.less");
*3，在对应的页面js中设置————————————var playAudio = require('@pathCommonCom/audio/audio.js');
*4，在页面js中调用音频播放组件js方法——————————playAudio(url,title,size);
*5，url:音频地址;title:音频对应的tile;size:音频的体积;
*
*
*/


module.exports = function(url,title,size) {
    var playAudio = {
        //$audioEle: $('body #' + audioEle ),
        $e:{
            //audioEle: $('body #' + audioEle ),
            //timeEle:$('body #' + timeEle ),
            //timeEle:$("#audioCurTime"),
            audio:document.getElementsByTagName('audio')[0],
            audioPlayer:document.getElementById('audioPlayer'),
            audioCurTime:$('#audioCurTime'),
            audioDisc:$(".audioDisc"),
            audioSize:$("#audioSize"),
        },
        audioConfig: {
            width: '', //视频区域宽度
            height: '', //视频区域高度
            //SD: url,  //http://vod.butel.com/734c64ef-b924-48f9-bfcd-2c79fb377263.m3u8
        },
        timer: '',
        num:0,
        init: function() {
            var that = this;

            that.initAudioEvent();
            that.event();

        },

        initAudioEvent:function () {

            var that = this;

            console.log(that.$e.audio);

            that.$e.audio.src = url;//音频路径
            that.$e.audioDisc.html(title);//视频标题
            that.$e.audioSize.html(size);//视频大小


            var timer = setInterval(function(){
                if(!isNaN(that.$e.audio.duration)) {
                    clearInterval(timer);
                }
            },200);

        },
        /**
         * 更新进度条与当前播放时间
         * @param {object} audio - audio对象
         */
        updateProgress: function(audio) {

            var that = this;

            var value = audio.currentTime / audio.duration;
            /*document.getElementById('progressBar').style.width = value * 100 + '%';
            document.getElementById('progressDot').style.left = value * 100 + '%';*/
            that.$e.audioCurTime.text(that.transTime(audio.currentTime));

        },

        event:function(){

            var that = this;


            // 监听音频播放时间并更新进度条
            that.$e.audio.addEventListener('timeupdate', function () {
                that.updateProgress(that.$e.audio);
            }, false);

            // 监听播放完成事件
            that.$e.audio.addEventListener('ended', function () {
                that.audioEnded();
            }, false);

            // 点击播放/暂停图片时，控制音乐的播放与暂停
            that.$e.audioPlayer.addEventListener('click', function () {

                var $this = $(this);
                // 改变播放/暂停图片
                if (that.$e.audio.paused) {
                    // 开始播放当前点击的音频
                    that.$e.audio.play();
                    $this.html('&#xe641;');
                } else {
                    that.$e.audio.pause();
                    $this.html('&#xe640;');

                }
            }, false);

        },
        /**
         * 播放完成时把进度调回开始的位置
         */
        audioEnded:function () {

            var that = this;
            /*document.getElementById('progressBar').style.width = 0;
            document.getElementById('progressDot').style.left = 0;*/
            that.$e.audioCurTime.text(that.transTime(0)) ;
            that.$e.audioPlayer.html('&#xe640;') ;
        },
        /**
         * 音频播放时间换算
         * @param {number} value - 音频当前播放时间，单位秒
         */
        transTime:function(value) {

            var that = this;

            var time = "";
            var h = parseInt(value / 3600);
            value %= 3600;
            var m = parseInt(value / 60);
            var s = parseInt(value % 60);
            if (h > 0) {
                time = that.formatTime(h + ":" + m + ":" + s);
            } else {
                time = that.formatTime(m + ":" + s);
            }

            return time;
        },
        /**
         * 格式化时间显示，补零对齐
         * eg：2:4  -->  02:04
         * @param {string} value - 形如 h:m:s 的字符串
         */
        formatTime:function(value) {

            var that = this;

            var time = "";
            var s = value.split(':');
            var i = 0;
            for (; i < s.length - 1; i++) {
                time += s[i].length == 1 ? ("0" + s[i]) : s[i];
                time += ":";
            }
            time += s[i].length == 1 ? ("0" + s[i]) : s[i];

            return time;
        },

    };
    playAudio.init();

}











