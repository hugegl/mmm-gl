$(function(){
  var productid  = getUrl('productId');
  $.ajax({
    url:'http://127.0.0.1:9090/api/getdiscountproduct',
    data:{
      productid :productid,
    },
    dataType:'json',
    success:function(e){
      var str = template('discount-items',e);
      $('.discount-items').html(str);
      $('.reply .form textarea').css({
        'width':'100%',
        'height':'0.82rem',
        'border':'none',
      });
      console.log(e);//没有'库存城市','评价详情';
    }
  })
})