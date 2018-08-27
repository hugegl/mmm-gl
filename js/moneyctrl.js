$(function(){
  //获取第一页数据,前10条数据
  //定义全局变量,储存页数;
  var pageid = 0;
  var all;
  //封装计算总页数的函数,并且渲染所有的items
  function getAll(e){
    //页面数据有误,需要手动-1;totalCount总是是144,pagesize是10;应该是15页,但是真实数据只有14页;
    all =  e.all =  (Math.ceil(e.totalCount/e.pagesize)-1);
    var str = template('items',e);
    $('.items').html(str);
  }
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
    getAll(e);
    //动态将页面总数计算后添加进去
    var optionsStr =  template('options',e);
    $('.pages-text').html(optionsStr);
  });
  //上一页
  $('.pages').on('click','.pages-prev',function(){
    pageid--;
    if(pageid <1){
      pageid = all;
    }
    render(function(e){
      getAll(e);
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
      getAll(e);
    });
    $('.pages-text').val(pageid);
  })
  //中间select改变后,动态修改select默认选中项,并根据所选择的动态渲染列表items
  $('.pages-text').on('change',function(){
    var val = $('.pages-text').val();
    pageid = val;
    render(function(e){
      getAll(e);
    });
  })
})
