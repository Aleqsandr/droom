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

    bpmToS(bpm) {
        return (bpm/60)*1000
    }
}

module.exports = useful;
