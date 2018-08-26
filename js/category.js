$(function(){
  $.ajax({
    url:'http://127.0.0.1:9090/api/getcategorytitle',
    dataType:'json',
    success:function(e){
      var str = template('titles',e);
      $('.titles').html(str);
    }
  })
  //点击事件获取点击的是哪个a
  $('.titles').on('click','.titles-big',function(){
    var id = $(this).data('id');
    $(this).siblings('ul').toggleClass('current');
    $.ajax({
      url:'http://127.0.0.1:9090/api/getcategory',
      data:{
        titleid:id,
      },
      dataType:'json',
      success:function(e){
        var idstr = '.titles-small-'+id;
        var str = template('titles-small',e);
        $(idstr).html(str);
      }
    })
  })
  //点击小分类跳转到商品详情页

})