app.controller('productManagement', ['$scope', '$http', function (s, h) {

    s.title = "Product Management";
    s.tempArr = {};
    s.filter = {};
    s.lastId = 0;
    s.isLoading = false;
    s.add = true;
    s.update = false;
    s.productData = [];
    s.filter.productName = "";

    getAuctionData();

    function getAuctionData() {
        s.isLoading = true;
       
        h.get("../api/products?id=" + s.lastId + "&key=" + s.filter.productName).then(function (d) {
            s.isLoading = false;
            if (d.data.length > 0) {
                s.lastId = d.data[d.data.length - 1].recNo
            }
            s.productData = s.productData.concat(d.data);
        });
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
            if (!s.isLoading) {
                getAuctionData();
            }
            console.log('true1')
        }

        if ($(window).scrollTop() > 100) {
            s.$apply(function () {
                s.showScrollToTop = true;
            })
            console.log('true2')
        } else {
            s.$apply(function () {
                s.showScrollToTop = false;
                console.log('true3')
            })
        }
    });

    s.scrollToTop = function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow', function () {
        });
    }

    function dateFormat(date) {
        //var date = new Date(date).toString("MMMM dd, yyyy hh:mm");
        //return date;
        return moment(date).format("MMMM DD YYYY");
    }

    $("#monthpicker").kendoDateTimePicker({
        value: new Date(),
        format: "MMMM dd, yyyy hh:mm",
        dateInput: true
    });

    s.addProduct = function () {
        var date = new Date($("#monthpicker").val());
        s.tempArr.DateTimeLimit = date;
      
        h.post("./api/products", { data: s.tempArr }).then(function (d) {
            s.tempArr = {};
            alert(d.data);
            getAuctionData();
        });
    }

    s.openAddProductModal = function () {
        s.add = true;
        s.update = false;
        s.tempArr = {};
        $("#newProduct").modal("show");
    }

    s.updateProduct = function (id) {
        h.get("../api/Products/" + id ).then(function (d) {
            s.tempArr = d.data;

            s.add = false;
            s.update = true;

            $("#newProduct").modal("show");
        });
    }

    s.searchProd = function () {
        s.lastId = 0;
        s.productData = [];
        getAuctionData()
    }

    s.setToAuction = function (id) {
        h.put("../api/products/auctionstatus?id=" + id ).then(function (d) {
           alert(d.status);
        });
    }

}])
