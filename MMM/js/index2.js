$(function(){

    getIndexMenu();
    $("#menu").on("click",".item:nth-child(8)",function(){
        $("#menu .item:nth-last-child(-n+4)").toggle();
        
    })

    getDiscountProduct();
});



// 封装  getIndexMenu 方法

function getIndexMenu(){
    $.ajax({
        url:url + "api/getindexmenu",
        success:function(data){
            // console.log(data);
            var html = template("indexMenuTpl", data);
            $("#menu").html(html);
        }
    })
}

// 封装  getDiscountProduct 方法
function getDiscountProduct (){
    $.ajax({
        url:url + "api/getmoneyctrl",
        success:function(data){
            var html = template("indexDiscountTpl",data);
            $("#discount .discount-product").html(html);
        }
    })
}