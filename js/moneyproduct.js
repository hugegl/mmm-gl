$(function(){
  var productid =  getUrl('productid');
  $.ajax({
    url:'http://127.0.0.1:9090/api/getmoneyctrlproduct',
    data:{
      productid :productid ,
    },
    dataType:'json',
    success:function(e){
      var str = template('items',e);
      $('.moneyproduct-items').html(str);
      $('.reply .form textarea').css({
        'width':'100%',
        'height':'0.82rem',
        'border':'none',
      });
      console.log(e);
    }
  })
})