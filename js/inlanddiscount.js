$(function(){
  $.ajax({
    url:'http://127.0.0.1:9090/api/getinlanddiscount',
    dataType:'json',
    success:function(e){
      var str = template('items',e);
      $('.items').html(str);
      console.log(e);
    }
  })
  $(window).on('scroll',function(){
    var top = $(window).scrollTop();
    var pageH = $('.items')[0].offsetHeight/2;
    if(top>pageH){
      $('.items li.current').removeClass('current');
    }

  })
})