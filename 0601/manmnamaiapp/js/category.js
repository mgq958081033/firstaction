$(function() {
    // 不支持动态绑定
    // $("#category-title .category-ul >li > a ").on("click", function() {
    //     // alert(1)
    //     $(this).parent().find("ul").toggle();
    //     $(this).parent().siblings().find("ul").slideUp()
    // })

    $("#category-title ").on("click", ".category-ul >li > a ", function() {
        // alert(1)
        $(this).parent().find("ul").toggle();
        $(this).parent().siblings().find("ul").slideUp()
            // 获取点击到的title-id 
            // console.log($(this).attr("data-title-id"))
        var $that = $(this);
        var titleid = $(this).attr("data-title-id");
        // 获取ajax 请求
        // getCategoryProduct(titleid, $that)

        $.ajax({
            url: url + "api/getcategory",
            data: {
                "titleid": titleid
            },
            success: function(data) {
                // console.log(info)
                var html = template("categoryTitleProduct", data);
                // $that 通过$that 缓存 点击的a 
                //  通过ul  缓存下  li 下面的ul
                var $ul = $that.siblings("ul");
                $ul.html(html)
                    //  $ul.children().length  所有的子元素
                var lastLis = $ul.children().length % 3 || 3;
                console.log(lastLis)
                $ul.children("li:nth-last-child(-n+" + lastLis + ")").css("border-bottom", "none")
            }
        })
    })


    getCategoryTitle()
})

//   获取categoty title  数据
function getCategoryTitle() {
    $.ajax({
        url: url + "api/getcategorytitle",
        success: function(info) {
            // console.log(info)
            var html = template("categoryTitleTPL", info);
            $(".category-ul").html(html)
        }

    })
}


function getCategoryProduct(titleid, $that) {
    $.ajax({
        url: url + "api/getcategory?titleid=" + titleid,
        success: function(data) {
            // console.log(info)
            var html = template("categoryTitleProduct", data);
            // $that 通过$that 缓存 点击的a 
            //  通过ul  缓存下  li 下面的ul
            var $ul = $that.siblings("ul");
            $ul.html(html)
                //  $ul.children().length  所有的子元素
            var lastLis = $ul.children().length % 3 || 3;
            console.log(lastLis)
            $ul.children("li:nth-last-child(-n+" + lastLis + ")").css("border-bottom", "none")
        }
    })
}