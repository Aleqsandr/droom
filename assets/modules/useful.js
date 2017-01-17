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

    pxToTime(px){
      return 3000*px/window.innerHeight
    }
}

module.exports = useful;
