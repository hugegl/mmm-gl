$(function(){
  //一进入页面就渲染优惠券页面的分类菜单导航
  $.ajax({
    url:'http://127.0.0.1:9090/api/getcoupon',
    dataType:'json',
    success:function(e){
      var str = template('coupon-items',e);
      $('.coupon-items').html(str);
    }
  })
})