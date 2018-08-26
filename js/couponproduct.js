$(function(){
  //获取当前页面的id
  var couponid = getUrl('couponId');
  //定义全局变量,动态接收轮播图ul的总宽;
  var ulWidth;
  //动态渲染页头
  $.ajax({
    url:'http://127.0.0.1:9090/api/getcoupon',
    dataType:'json',
    success:function(e){
      e.id = +couponid;
      var str = template('font-fff',e);
      $('.font-fff').html(str);
    }
  })
  //动态渲染列表页
  $.ajax({
    url:'http://127.0.0.1:9090/api/getcouponproduct',
    data:{
      couponid:couponid,
    },
    dataType:'json',
    success:function(e){
      var str = template('items',e);
      $('.items').html(str);
      var mdimg = template('md',e);
      $('.md').html(mdimg);
      ulWidth = e.result.length*200;
      $('.md').css({
        'width':ulWidth,
        'height':200,
      });
      console.log(ulWidth);
    }

  })
  $('.items').on('click','a',function(){
    $('.model').toggleClass('current');
  })
})