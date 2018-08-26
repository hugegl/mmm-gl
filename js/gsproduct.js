$(function(){
    //封装渲染导航条的函数
    function renderNavs(){
        //动态渲染导航条-京东
        $.ajax({
          url:'http://127.0.0.1:9090/api/getgsshop',
          dataType:'json',
          success:function(e){
            var str = template('jd-navs',e);
            $('.jd-navs').html(str);
          }
        })
        //动态渲染导航条-华北
        $.ajax({
          url:'http://127.0.0.1:9090/api/getgsshoparea',
          dataType:'json',
          success:function(e){
            var str = template('hb-navs',e);
            $('.hb-navs').html(str);
          }
        })


    }
    //一进入页面渲染一次即可,后面动态设置值;
    renderNavs();
  //根据点击的这个li动态渲染下面对应的ul
  $('.gsproduct-navs').on('click','a',function(){
    console.log(111);
    $(this).siblings('ul').toggleClass('current').parent().siblings().find('ul').removeClass('current');
    render();
    return false;
  })
  //点击单个a事件
  $('.small-navs').on('click','a',function(){
    console.log(22);
    //打上对号
    $(this).toggleClass('current').parent().siblings().find('a').removeClass('current');
    //让点击后这个ul隐藏;
    $(this).parent().parent().toggleClass('current');
    //动态将选中的列表放到大标题上
    var index = $(this).text().trim().indexOf('（');
    var text = $(this).text().trim().slice(0,index);
    if(text=='天猫超'){
      text = '天猫超市';
    }else if(text=='全部价'){
      text='全部价格';
    }
    $(this).parent().parent().parent().find('span').text(text);
    render();
    return false;
  })
  //封装渲染函数
  function render(){
    var shopid = $('.small-navs a.current').eq(0).data('shopid')||0;//防止页面第一次没有拿到数据返回undefind
    var areaid = $('.small-navs a.current').eq(1).data('areaid')||0;//防止页面第一次没有拿到数据返回undefind
    $.ajax({
      url:'http://127.0.0.1:9090/api/getgsproduct',
      data:{
        shopid:shopid,
        areaid :areaid,
      },
      success:function(e){
        var str = template('items',e);
        $('.items').html(str);
      }
    })
  }
  //一进入页面就渲染第一页
  render();

 

})