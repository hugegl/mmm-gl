$(function(){
  //获取当前页面的id
  var couponid = getUrl('couponId');
  //定义全局变量,储存当前是哪张图片
  var index;
  //定义全局变量,动态储存拿到的li的总个数
  var indexAll;
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
      indexAll = e.result.length-1;
    }

  })
  //点击列表,模态框效果出现//轮播图效果是定位版
  $('.items').on('click','a',function(){
    //模态框显示
    $('.model').addClass('current');
    //自动跳转到当前的图片页面
    //获取当前图片下标;
    index = $(this).data('index');
    //让当前图片显示,其他图片隐藏
    $('.md li').eq(index).toggleClass('current').siblings().removeClass('current');
    //判断长度,如果只有1张图片,那么左右箭头隐藏
    if(indexAll == 0){
      $('.al').addClass('current');
      $('.ar').addClass('current');
    }
  })
  //左按钮点击事件
  $('.al').on('click',function(){
    index--;
    if(index<0){
      index=indexAll;
    };
    $('.md li').eq(index).toggleClass('current').siblings().removeClass('current');
  })
  //右按钮点击事件
  $('.ar').on('click',function(){
    index++;
    if(index>indexAll){
      index=0;
    }
    $('.md li').eq(index).toggleClass('current').siblings().removeClass('current');
  })
  //模态框关闭
  $('.off').on('click',function(){
    $('.model').removeClass('current');
  })

})