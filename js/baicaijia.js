$(function () {
  //全局存储当前ul的宽,动态生成的;
  var ulW;
  //动态设置ul的宽度方法,在渲染后调用
  function getlisW() {
    var lisW = 0;
    $('.class-navs-small li').each(function (i, v) {
      lisW += $(v).width();
    })
    return lisW + 35;//有一个li会掉下来,只能手动加35上去;
  }

  //动态渲染顶部导航条
  $.ajax({
    url: 'http://127.0.0.1:9090/api/getbaicaijiatitle',
    dataType: 'json',
    success: function (e) {
      var str = template('class-navs-small', e);
      $('.class-navs-small').append(str);
      //一进入页面就根据高亮的a渲染商品列表页
      render();
      //动态设置导航条内ul的宽度
      ulW = getlisW();
      $('.class-navs-small').width(ulW);
      //注册的移动事件应该在动态渲染完li后,才能动态获取到li的总;
      tapScroll();
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
    var now = 0;
    var flag = false;
    //动态获取ul的宽度减去外面盒子的宽度,计算出可移动的距离
    var canmove = $('.class-navs').width() - ulW;
    $('.class-navs-small').on('touchstart', function (e) {
      startX = e.changedTouches[0].screenX;
    })
    $('.class-navs-small').on('touchmove', function (e) {
      flag = true;
      moveX = e.changedTouches[0].screenX - startX;
      $('.class-navs-small')[0].style.transition = "none";
      $('.class-navs-small')[0].style.transform = 'translateX(' + (now + moveX) + 'px)';
    })
    $('.class-navs-small').on('touchend', function (e) {
      if(flag){
        now += moveX;
      if (now > 0) {
        now = 0;
        $('.class-navs-small')[0].style.transition = "all .5s";
        $('.class-navs-small')[0].style.transform = 'translateX(0px)';
        return;
      } else if (now < canmove) {
        now = canmove;
        $('.class-navs-small')[0].style.transition = "all .5s";
        $('.class-navs-small')[0].style.transform = 'translateX(' + now + 'px)';
        return;
      } else {
        $('.class-navs-small')[0].style.transition = "none";
        $('.class-navs-small')[0].style.transform = 'translateX(' + now + 'px)';
      }
      startX = 0;
      moveX = 0;
      flag = false;
      }
    })

  };

})