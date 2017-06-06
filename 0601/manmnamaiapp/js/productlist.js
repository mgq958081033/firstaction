$(function() {
    // console.log(GetQueryString("category"));
    // console.log(GetQueryString("categoryid"));
    // 获取地址栏中的categoryid 的值
    var categoryid = GetQueryString("categoryid")


    // console.log(location.search)
    $.ajax({
        url: url + "api/getcategorybyid",
        data: {
            "categoryid": categoryid
        },
        success: function(data) {
            // console.log(data)
            // console.log(data.result)
            // console.log(data.result[0])
            // console.log(data.result[0].category)
            var categoryName = data.result[0].category;
            $(".category-name a").html(categoryName)
        }

    })

    // 获取地址栏中的categoryid 的值
    var pageid = GetQueryString("pageid")
        //  获取商品列表
    getCategotyProduct(categoryid, pageid)
})


// 用JS获取地址栏参数的方法（超级简单）  http://www.cnblogs.com/fishtreeyu/archive/2011/02/27/1966178.html
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


//  获取商品列表 


function getCategotyProduct(categoryid, pageid) {
    pageid = parseInt(pageid)
    $.ajax({
        url: url + "api/getproductlist",
        data: {
            "categoryid": categoryid,
            "pageid": pageid || 1
        },
        success: function(data) {
            // console.log(data)
            var html = template("productListTpl", data);
            $("#product-con ul").html(html)
                // console.log(data.pagesize)
                // console.log(data.totalCount)

            var pagesize = data.pagesize;
            var totalCount = data.totalCount;
            var page = Math.ceil(totalCount / pagesize) - 0;
            console.log(page)
            var option = "";
            //  ``  esc  下面
            for (var i = 0; i < page; i++) {

                if ((i + 1) == pageid) {
                    option += `<option selected value="${i+1}">${i+1}</option> `
                } else {
                    option += `<option  value="${i+1}">${i+1}</option> `
                }

            }
            // console.log(option)
            $("#select").html(option)

            $("#select").on("change", function() {
                console.log($(this).val())

                window.location.href = `productlist.html?categoryid=${categoryid}&pageid=${$(this).val()}`
            })
            var previous = `productlist.html?categoryid=${categoryid}&pageid=${pageid -1 }`
            var next = `productlist.html?categoryid=${categoryid}&pageid=${pageid + 1 }`
            $(".previous a").attr("href", previous)
            $(".next a").attr("href", next)

        }
    })
}