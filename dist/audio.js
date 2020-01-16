function AudioM() {
    this.audio = null;
    this.progress = null;
    this.playPause = null;
    this.audioTime = null;
    this.playTime = null;
    this.progressBg = null;
    this.loading = null;
    this.status = ""
    this.timesCount = null
    this.timeEnd = false
    this.count = 0

    this.initAudio = function(conf) {
        if (conf) {
            this.audio = document.getElementById(conf.id)
            this.progress = document.getElementById(conf.progress)
            this.playPause = document.getElementById(conf.playPause)
            this.audioTime = document.getElementById(conf.audioTime)
            this.playTime = document.getElementById(conf.playTime)
            this.progressBg = document.getElementById(conf.progressBg)
            this.loading = document.getElementById(conf.loading)
            var me = this
            this.playPause.addEventListener("click", this.playOrPause.bind(me), false)

            this.audio.addEventListener('timeupdate', this.updateProgress.bind(me), false);
            this.audio.addEventListener("loadedmetadata", function() {
                me.audioTime.innerText = me.transTime(this.duration)
            })
            this.audio.addEventListener('ended', this.audioEnded.bind(me), false);
            this.progressBg.addEventListener("click", function(e) {
                var rate = ((e.clientX - this.offsetLeft) / this.offsetWidth);
                me.audio.currentTime = me.audio.duration * rate;
                me.updateProgress();
            }, false)
        }
    }
    this.playOrPause = function() {
        let me = this
        if (me.audio.paused) {
            if (!this.status || this.status === 'end') {
                this.status = "start"
            }
            this.timeEnd = false
            me.audio.play();
            me.playPause.classList.remove("iconPlay")
            me.playPause.classList.add("iconPause")
            this.loading.classList.add("loadingStart")

        } else {
            let cur = this.transTime(this.audio.currentTime, 1)
            if ((cur.hour || cur.min || cur.sec > 2) && this.status === "start") {
                this.count++;
                console.log("播放次数", this.count)
            }
            this.timeEnd = true
            this.status = "pause"
            clearInterval(this.timesCount)
            this.timesCount = null

            me.audio.pause();
            me.playPause.classList.remove("iconPause")
            me.playPause.classList.add("iconPlay")
            if (this.loading.className.indexOf("loadingStart") > -1) {
                this.loading.classList.remove("loadingStart")
            }
        }
    }
    this.transTime = function(times, type) {
        var t = "";
        var hour, min, sec
        if (times > -1) {
            hour = Math.floor(times / 3600);
            min = Math.floor(times / 60) % 60;
            sec = Math.floor(times % 60);
            if (hour < 10) {
                t = '0' + hour + ":";
            } else {
                t = hour + ":";
            }

            if (min < 10) {
                t += "0";
            }
            t += min + ":";
            if (sec < 10) {
                t += "0";
            }
            t += sec.toFixed(2);
        }
        t = t.substring(0, t.length - 3);
        if (type) {
            return {
                hour: hour,
                min: min,
                sec: sec
            }
        } else {
            return t;
        }

    }
    this.updateProgress = function() {
        var value = (this.audio.currentTime / this.audio.duration) * 100;
        this.progress.style.width = value + '%';
        this.playTime.innerText = this.transTime(this.audio.currentTime);
        //每隔两秒统计一次
        let me = this
        if (!this.timeEnd && !this.audio.paused) {
            if (!this.timesCount) {
                this.timesCount = setInterval(() => {
                    if (me.timeEnd) {
                        clearInterval(me.timesCount)
                        clearInterval(this)
                        me.timesCount = null

                    }

                    console.log(me.transTime(me.audio.currentTime))


                }, 2000)
            }
        } else {
            clearInterval(this.timesCount)
        }



    }
    this.audioEnded = function() {
        this.timesCount = null
        clearInterval(this.timesCount)
        this.timeEnd = true
        this.status = "end"
        this.audio.currentTime = 0;
        this.audio.pause();
        this.playPause.classList.remove("iconPause")
        this.playPause.classList.add("iconPlay")
        if (this.loading.className.indexOf("loadingStart") > -1) {
            this.loading.classList.remove("loadingStart")
        }
    }
}