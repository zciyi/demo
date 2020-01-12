
window.audioM = {
    audio:null,
    progress:null,
    playPause:null,
    audioTime:null,
    playTime:null,
    progressBg:null,
    loading:null,
    initAudio:function(conf){
        if(conf){
            this.audio = document.getElementById(conf.id)
            this.progress = document.getElementById(conf.progress)
            this.playPause = document.getElementById(conf.playPause)
            this.audioTime = document.getElementById(conf.audioTime)
            this.playTime = document.getElementById(conf.playTime)
            this.progressBg = document.getElementById(conf.progressBg)
            this.loading = document.getElementById(conf.loading)
            var me = this
            this.playPause.addEventListener("click",this.playOrPause.bind(me),false)

            this.audio.addEventListener('timeupdate',this.updateProgress.bind(me),false);
            this.audio.addEventListener("loadedmetadata",function(){
                me.audioTime.innerText = me.transTime(this.duration)
            })
            this.audio.addEventListener('ended',this.audioEnded.bind(me),false);
            this.progressBg.addEventListener("click",function(e){
                console.log(e.clientX)
                console.log(this.offsetLeft)
                console.log(this.offsetWidth)
                var rate = ((e.clientX - this.offsetLeft)/this.offsetWidth);
                    me.audio.currentTime = me.audio.duration * rate;
                    me.updateProgress();
            },false)
        }
    },
    playOrPause:function(){
        let me = this
        if(me.audio.paused){
            me.audio.play();
            me.playPause.classList.remove("iconPlay")
            me.playPause.classList.add("iconPause")
            this.loading.classList.add("loadingStart")
           
        } else{
            me.audio.pause();
            me.playPause.classList.remove("iconPause")
            me.playPause.classList.add("iconPlay")
            if(this.loading.className.indexOf("loadingStart") > -1){
                this.loading.classList.remove("loadingStart")
            }
        }
    },
    transTime:function(time) {
        var duration = parseInt(time);
        var minute = parseInt(duration/60);
        var sec = duration%60+'';
        var isM0 = ':';
        if(minute == 0){
            minute = '00';
        }else if(minute < 10 ){
            minute = '0'+minute;
        }
        if(sec.length == 1){
            sec = '0'+sec;
        }
        return minute+isM0+sec
    },
    updateProgress:function(){
        var value = (this.audio.currentTime / this.audio.duration) * 100;
        this.progress.style.width = value  + '%';
        this.playTime.innerText =this.transTime(this.audio.currentTime);

    },
    audioEnded:function(){
        this.audio.currentTime=0;
        this.audio.pause();
        this.playPause.classList.remove("iconPause")
        this.playPause.classList.add("iconPlay")
    }
}