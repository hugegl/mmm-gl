$(function () {
  //动态渲染顶部导航条
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getbaicaijiatitle',
    dataType: 'json',
    success: function (e) {
      var str = template('class-navs-small', e);
      $('.class-navs-small').append(str);
      //一进入页面就根据高亮的a渲染商品列表页
      render();
    }
  })
  //封装函数,根据导航条高亮的id发送ajax请求,渲染商品列表
  function render() {
    var titleid = $('.class-navs-small li a.current').data('id');
    $.ajax({
      url: 'http://127.0.0.1:9090/api/getbaicaijiaproduct',
      data: {
        titleid: titleid,
      },
      dataType: 'json',
      success: function (e) {
        var str = template('items', e);
        $('.items').html(str);
      }
    })
  }
  //点击顶部导航条切换类和数据
  $('.class-navs-small').on('click', 'a', function () {
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
    render();
    return false;
  })
  //顶部滑动
  function tapScroll() {
    var startX = 0;
    var moveX = 0;
    $('.class-navs-small').on('touchstart', function (e) {
      startX = e.changedTouches[0].screenX;
    })
    $('.class-navs-small').on('touchmove', function (e) {
      moveX = e.changedTouches[0].screenX - startX;
      $('.class-navs-small')[0].style.transition="none";
      $('.class-navs-small')[0].style.transform = 'translateX('+moveX+'px)';
    })
    $('.class-navs-small').on('touchend', function (e) {
      $('.class-navs-small')[0].style.transition="all .5s";      
      $('.class-navs-small')[0].style.transform = 'translateX(0px)';
      startX = 0;
      moveX = 0;
    })

  };
  tapScroll();

})