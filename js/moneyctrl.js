$(function(){
  //获取第一页数据,前10条数据
  //定义全局变量,储存页数;
  var pageid = 0;
  var all;
  function render(callback){
    $.ajax({
      url:'http://127.0.0.1:9090/api/getmoneyctrl',
      data:{
        pageid :pageid,
      },
      dataType:'json',
      success:function(e){
        callback&&callback(e);
      }
    })  
  }
  //一进页面就加载
  render(function(e){
    e.all =  Math.ceil(e.totalCount/e.pagesize);
        all = e.all;
        var str = template('items',e);
        $('.items').html(str);
        //动态将页面总数计算后添加进去
        var optionsStr =  template('options',e);
        $('.pages-text').html(optionsStr);
        console.log(e);
  });
  //上一页
  $('.pages').on('click','.pages-prev',function(){
    pageid--;
    if(pageid <1){
      pageid = all;
    }
    render(function(e){
      e.all =  Math.ceil(e.totalCount/e.pagesize);
      all = e.all;
      var str = template('items',e);
      $('.items').html(str);
    });
    $('.pages-text').val(pageid);
  })
  //下一页
  $('.pages').on('click','.pages-next',function(){
    pageid++;
    if(pageid >all){
      pageid = 1;
    }
    render(function(e){
      e.all =  Math.ceil(e.totalCount/e.pagesize);
      all = e.all;
      var str = template('items',e);
      $('.items').html(str);
    });
    $('.pages-text').val(pageid);
  })
  $('.pages-text').on('change',function(){
    var val = $('.pages-text').val();
    pageid = val;
    render(function(e){
      e.all =  Math.ceil(e.totalCount/e.pagesize);
      all = e.all;
      var str = template('items',e);
      $('.items').html(str);
    });
  })
})
