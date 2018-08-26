$(function(){
  $.ajax({
    url:'http://127.0.0.1:9090/api/getbrandtitle',
    dataType:'json',
    success:function(e){
      var str = template('rankings',e);
      $('.rankings').html(str);
    }
  })
})