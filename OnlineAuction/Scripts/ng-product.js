app.controller('productManagement', ['$scope', '$http', function (s, h) {

    s.name = "testdis";
    s.title = "Product Management";
    s.tempArr = {};
    s.filter = {};
    s.lastId = 0;
    s.auctionlastId = 0;
    s.isLoading = false;
    s.add = true;
    s.update = false;
    s.productData = [];
    s.auctionData = [];
    s.filter.productName = "";
    s.test = "";


    getAuctionData();
    getAuctionedData();

    function getAuctionData() {
        console.log(s.test)
        s.isLoading = true;
       
        h.get("../api/products?id=" + s.lastId + "&key=" + s.filter.productName).then(function (d) {
            s.isLoading = false;
            if (d.data.length > 0) {
                s.lastId = d.data[d.data.length - 1].rowNum
            }
            console.log(s.lastId)
            s.productData = s.productData.concat(d.data);
            console.log(d.data);
        });
    }

    function getAuctionedData() {
        s.isLoading = true;
        h.get("../api/products/auctionData?id=" + s.auctionlastId + "&key=" + s.filter.productName).then(function (d) {
            s.isLoading = false;
            if (d.data.length > 0) {
                s.auctionlastId = d.data[d.data.length - 1].rowNum
            }
            console.log(s.auctionlastId)
            s.auctionData = s.auctionData.concat(d.data);
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

    $("#auctionpicker").kendoDateTimePicker({
        value: new Date(),
        format: "MMMM dd, yyyy hh:mm",
        dateInput: true
    });

    s.addProduct = function () {
        var date = new Date($("#monthpicker").val());
        s.tempArr.DateTimeLimit = date;

        //var blobFile = $('#filechooser').files[0];
        //var formData = new FormData();
        //formData.append("fileToUpload", blobFile);


        //alert(JSON.stringify(formData));

        //$.ajax({
        //    //url: "upload.php",
        //    type: "POST",
        //    data: formData,
        //    processData: false,
        //    contentType: false,
        //    success: function (response) {
        //        // .. do something
        //    },
        //    error: function (jqXHR, textStatus, errorMessage) {
        //        console.log(errorMessage); // Optional
        //    }
        //});

        h.post("../api/products", s.tempArr).then(function (d) {
            s.tempArr = {};
            s.productData = [];
            s.lastId = 0;
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

    s.setToAuction = function () {
        h.put("../api/products/auctionstatus?id=" + s.auctionRecno).then(function (d) {
            s.lastId = 0;
            s.productData = [];
            getAuctionData()

            $("#auctionProduct").modal("hide");
        });
    }

    s.removeProduct = function (id) {
        h.put("../api/products/removeProduct?id=" + id).then(function (d) {
            s.lastId = 0;
            s.productData = [];
            getAuctionData()

            $("#auctionProduct").modal("hide");
        });
    }
    s.openModal = function (recno) {
        s.auctionRecno = recno;
        $("#auctionProduct").modal("show");

    }

}])
