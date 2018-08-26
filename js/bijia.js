$(function(){
  //面包屑导航
  var categoryid = getUrl('categoryid');
  var oldHtml;
  $.ajax({
    url:'http://127.0.0.1:9090/api/getcategorybyid',
    data:{
      categoryid:categoryid,
    },
    dataType:'json',
    success:function(e){
      if(e.result.length>0){
        oldHtml = e.result[0].category;
      }else if(e.result.length == 0){
        oldHtml = '全部分类';
      }
    }
  })
  //拿到商品id
  var  productid  = getUrl('productid');
  //一进入页面,发送ajax,渲染商品详情
  $.ajax({
    url:'http://127.0.0.1:9090/api/getproduct',
    data:{
      productid:productid ,
    },
    dataType:'json',
    success:function(e){
      e.categoryid = categoryid;
      e.oldHtml = oldHtml;
      var str = template('product',e);
      $('.product').html(str);
      var breadStr = template('bread-navs',e);
      $('.bread-navs').html(breadStr); 
    }
  })
  //发送ajax获取评价信息
  $.ajax({
    url:'http://127.0.0.1:9090/api/getproductcom',
    data:{
      productid:productid,
    },
    dataType:'json',
    success:function(e){
      var str = template('evaluates-items',e);
      $('.evaluates-items').html(str);
    }
  })
})