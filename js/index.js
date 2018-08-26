($(function(){
  //动态渲染navs
  function renderNavs(){
    //导航页ajax请求
    $.ajax({
      url:'http://127.0.0.1:9090/api/getindexmenu',
      dataType:'json',
      success:function(e){
        var str = template('navs',e);
        $('.navs ul').html(str);
      }
    })
    //列表页ajax请求
    $.ajax({
      url:'http://127.0.0.1:9090/api/getmoneyctrl',
      dataType:'json',
      success:function(e){
        var str = template('items',e);
        $('.items').html(str);
      }
    })
  };
  renderNavs();
  //更多显示和隐藏
  $('.navs').on('click','li:nth-child(8)',function(){
    var rr = $(this).nextAll().toggleClass('current');
    console.log(rr);
  });
}))