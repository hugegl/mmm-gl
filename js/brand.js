$(function(){
  var brandtitleid = getUrl('brandtitleid');
  var oldid = getUrl('oldid');
  var productid;
  //获取当前访问的页面是哪一个,动态生成名字;
  $.ajax({
    url:'http://127.0.0.1:9090/api/getbrandtitle',
    dataType:'json',
    success:function(e){
      oldid = e.result[oldid].brandTitle
    }
  })
  //获取当前前十的排名,动态渲染
  $.ajax({
      url:'http://127.0.0.1:9090/api/getbrand',
      data:{
        brandtitleid:brandtitleid,
      },
      dataType:'json',
      success:function(e){
        // 动态渲染抬头
        var old = template('brands-tittle',{oldid:oldid});
        $('.brands-tittle').before(old);
        // 动态渲染列表页
        var str = template('brands',e);
        $('.brands').html(str);
      }
  })
  //获取产品销量排行
  $.ajax({
      url:'http://127.0.0.1:9090/api/getbrandproductlist',
      dataType:'json',
      data:{
        brandtitleid:brandtitleid,
        pagesize :4,
      },
      success:function(e){
        var str = template('sales-volume',e);
        $('.sales-volume').html(str);
        productid = e.result[0].productId;
        var productImg = e.result[0].productImg;
        var productName = e.result[0].productName;
        getcomment(productImg,productName);
      }
  })
  //获取最新评论,y因为ajax异步的,有时候没有拿到productid,
  //会返回undefind,就拿不到评论,所以需要在获取产品销量排行后执行
  function getcomment(productImg,productName){
    $.ajax({
      url:'http://127.0.0.1:9090/api/getproductcom',
      data:{
        productid:productid,
      },
      dataType:'json',
      success:function(e){
        e.productImg = productImg;
        e.productName = productName;
        var str = template('comment',e);
        $('.comment').html(str);
        console.log(e);
      }
    })
  }
})