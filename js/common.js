//定义拿到地址栏参数的函数
function getUrl(k){
  var str = decodeURI(location.search);
  str = str.slice(1);
  var arr = str.split('&');
  var obj = {};
  arr.forEach(function(v,i){
    var key = v.split('=')[0];
    var value = v.split('=')[1];
    obj[key]=value;
  })
  return obj[k];
}
//定义找到除了自己以外后面兄弟元素的函数
$.fn.nextAll = function (selector) {
  var nextEls = [];
  var el = this[0];
  if (!el) return $([]);
  while (el.nextElementSibling) {
    var next = el.nextElementSibling;
    if (selector) {
      if($(next).is(selector)) nextEls.push(next);
    }
    else nextEls.push(next);
    el = next;
  }
  return $(nextEls);
};
$(function(){
  //封装用于解析地址栏参数的函数;
//点击返回顶部事件
$('.toUp').on('click',function(){
  $(window).scrollTop(0);
})

}())