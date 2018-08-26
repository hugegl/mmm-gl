(function () {
  function setRem(pageSize) {
    var windowWidth = window.innerWidth;
    if (windowWidth > pageSize) {
      windowWidth = pageSize
    } else if (windowWidth < 320) {
      windowWidth = 320;
    }
    document.querySelector('html').style.fontSize = (windowWidth /pageSize*  100 ) + 'px';
  }
  setRem(640);
  window.onresize = function(){
    setRem(640);
  }
}())