var useful = {
    isMobile() {
        if(window.innerWidth <= 768)
            return true;
        else
            return false;
    },

    getOffset(el) {
        el = el.getBoundingClientRect();
        return {
          left: el.left + window.scrollX,
          top: el.top + window.scrollY
        }
    },

    pxToTime(time, px){
        let realTime = time

        if(time===0)
            realTime = 3000;

      return realTime*px/window.innerHeight
    },

    bpmToMs(bpm) {
        return bpm * 2000 / 120
    },

    bpmToS(bpm) {
        return this.bpmToMs(bpm) / 1000
    },

    checkColor(val) {
        if(val<0)
            return 0;
        else if(val>255)
            return 255;
        return val;
    },

    checkTime(val) {
        if(val < 0)
            return 0;
        return val;
    },

    toggleFullScreen() {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
           (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            this.goFullScreen();
          } else {
            this.exitFullScreen();
          }
    },

    goFullScreen() {
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    },

    exitFullScreen() {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
    }
}

module.exports = useful;
