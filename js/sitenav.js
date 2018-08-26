$(function(){
  $.ajax({
    url:'http://127.0.0.1:9090/api/getsitenav',
    dataType:'json',
    success:function(e){
      var str = template('items',e);
      $('.items').html(str);
      console.log(e);
    }
  })
})