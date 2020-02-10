app.controller('productManagement', ['$scope', '$http', '$timeout', function (s, h, t) {

    s.name = "testdis";
    s.title = "Product Management";
    s.tempArr = {};
    s.tempArrAuction = {};
    s.filter = {};
    s.lastId = 0;
    s.lastIdCat = 0;
    s.auctionlastId = 0;
    s.isLoading = false;
    s.add = true;
    s.update = false;
    s.productData = [];
    s.auctionData = [];
    s.filter.productName = "";
    s.filter.catName = "";
    s.test = "";
    s.strLimit = 50;
    s.uploadImgID = false;

    getAuctionData();

    function getAuctionData() {
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

    s.showMore = function (str) {
        s.strLimit = str.length;
    };

    s.showLess = function () {
        s.strLimit = 50;
    };

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

    $("#catName").kendoAutoComplete({
        minLength: 2,
        dataTextField: 'CategoryName',
        dataValueField: 'CategoryId',
        dataSource: {
            transport: {
                read: {
                    url: "../api/Category?id=" + s.lastIdCat + "&key=" + s.filter.catName,
                    contentType: 'application/json; charset=utf-8',
                    type: 'GET',
                    dataType: 'json'
                }
            }
        },
        select: onSelect
    });

    function onSelect(e) {
        s.dataItem = this.dataItem(e.item.index());
    }
               
    s.addProduct = function () {
        s.tempArr.CategoryID = s.dataItem.CategoryId;
        
        if (s.add == true) {                                         
            h.post("../api/products/add", s.tempArr).then(function (d) {
                s.tempArr = {};
                s.productData = [];
                s.lastId = 0;
                getAuctionData();
                swal("Successfully Added!","","success");
            });
            $("#catName").val("");
            $("#newProduct").modal("hide");
            s.uploadImgID = false;
        }
        else {
            h.put("../api/products/" + s.updateProductID, s.tempArr).then(function (d) {
                swal("Successfully Updated!", "", "success");
                s.tempArr = {};
                s.productData = [];
                s.lastId = 0;
                getAuctionData();
                location.reload();
            });

            s.add = true;
            s.update = false;
            $("#catName").val("");
            $("#newProduct").modal("hide");
        }
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
            s.updateProductID = id;
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
        var date = new Date($("#auctionpicker").val());

        h.put("../api/AuctionItems/auctionstatus?id=" + s.auctionRecno).then(function (d) {
                  
            s.tempArrAuction.Status = 0;
            s.tempArrAuction.DateTimeLimit = date;
            s.tempArrAuction.ProductId = s.auctionRecno;

            h.post("../api/AuctionItems", s.tempArrAuction).then(function (d) {
                s.tempArr = {};
                s.tempArrAuction = {};
                s.productData = [];
                s.lastId = 0;
                getAuctionData();

            });

            $("#auctionProduct").modal("hide");
        });
    }

    s.removeProduct = function (id) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Product!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function (isConfirm) {
            if (isConfirm) {
                h.put("../api/products/removeProduct?id=" + id).then(function (d) {
                    s.lastId = 0;
                    s.productData = [];
                    getAuctionData()

                    swal("Product Removed !", "", "success")

                    $("#auctionProduct").modal("hide");
                });
            } else {
                swal("Cancelled", "", "error");
            }
        });
    }

    s.openModal = function (id) {
        s.auctionRecno = id;
        $("#auctionProduct").modal("show");

    }

    $('#fileup').click(function () {
        $('#files').click();

         s.cropImg = $('#cropImg').croppie({
            enableExif: true,
            mouseWheelZoom: false,
            viewport: {
                width: 300,
                height:300,
                type:'square' 
            },
            boundary:{
                width: 350,
                height: 350
            }
        });

        $('#files').on('change', function(){
            var reader = new FileReader();
            reader.onload = function (event) {
                s.cropImg.croppie('bind', {
                    url: event.target.result
                }).then(function(){
                    console.log('jQuery bind complete');
                });
            }
            reader.readAsDataURL(this.files[0]);
            
            $("#newProduct").modal("hide");
            $("#uploadImg").modal("show");
            s.uploadImgID = true;
        });

    });

    s.uploadImg = function () {
        s.cropImg.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (response) {
            s.tempArr.img = response.split(',')[1];
            $("#newProduct").modal("show");
            $("#uploadImg").modal("hide");
        })

    }

    function _base64ToArrayBuffer(base64) {
       
        var binary_stringConverted = window.btoa(base64);
        var binary_string = window.atob(binary_stringConverted);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);  
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#cropImg').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

}])
