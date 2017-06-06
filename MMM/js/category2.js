 $(function(){

$("#category-title").on("click",".category-ul>li>a",
  function (){
    // alert(1);
    $(this).parent().find("ul").toggle();
    $(this).parent().siblings().find("ul").slideUp();
    var $that = $(this);
    console.log(this);
    var titleid = $(this).attr("data-title-id");
    console.log(titleid);

    getCategoryProduct(titleid,$that);

  })
  getCategoryTitle();
 })


//  获取category title 数据
 function getCategoryTitle(){
  $.ajax({
    url:url + "api/getcategorytitle",
    success:function(info){
      // console.log(info);
      var html = template("categoryTitleTPL",info);
      $(".category-ul").html(html)
    }
  })
 }

// 封装  getCategoryProduct 方法
 function getCategoryProduct(titleid,$that){
   $.ajax({
     url: url + "api/getcategory?titleid=" + titleid,
     success:function(data){
      //  console.log(info);
       var html = template("categoryTitleProduct",data);
       var $ul = $that.siblings("ul");
       $ul.html(html);
       var lastLis = $ul.children().length % 3 || 3;
      //  console.log(lastLis);
       $ul.children("li:nth-last-child(-n" + lastLis + ")").css("border-bottom","none")

     }
   })
 }

