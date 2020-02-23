app.controller('dashboard', ['$scope', '$http', '$timeout', function (s, h, t) {

    s.title = "Dashboard";
    s.filter = {};
    s.ratingTempArr = {};
    s.auctionData = [];
    s.filter.auctionName = "";
    s.auctionlastId = 0;

    //s.startDate = moment().format("YYYY-MM-DD");
    //s.endDate = moment().format("YYYY-MM-DD");

    s.curMonth = new Date().getMonth() + 1;
    s.curYear = new Date().getFullYear();
    s.curDay = new Date().getDate() - 1;
    s.curDate = new Date(s.curYear + "-" + s.curMonth + "-" + s.curDay);
    s.selectedDailyReport = "";

    s.startDate = s.curMonth + "/" + s.curDay + "/" + s.curYear;
    s.endDate = s.curMonth + "/" + s.curDay + "/" + s.curYear;
    
    getAuctionedData();
    rateProduct(10);

    $('#dateTime').daterangepicker({
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        startDate: s.startDate,
        endDate: s.endDate,
        locale: {         
            format: 'MM/DD/YYYY'
        }
    });

    $('#dateTime').on('apply.daterangepicker', function () {
        var startDate = new Date($(this).data('daterangepicker').startDate._d);
        var endDate = new Date($(this).data('daterangepicker').endDate._d);
        s.startDate = startDate;
        s.endDate = endDate;
        //alert(s.startDate);
        //alert(s.endDate);
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
            if (!s.isLoading) {
                getAuctionedData();
                //rateProduct();
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

    //s.dateTimeFormat = function (date) {
    //    return moment(date).format("MMM DD, YYYY hh:mm a")
    //}
    
    function getAuctionedData() {
        s.isLoading = true;
        h.get("../api/AuctionItems/auctionData?id=" + s.auctionlastId + "&key=" + s.filter.auctionName).then(function (d) {
            s.isLoading = false;
            if (d.data.data.length > 0) {
                s.auctionlastId = d.data.data[d.data.data.length - 1].rowNum
            }
            s.auctionData = s.auctionData.concat(d.data.data);
            console.log(s.auctionData)
            s.total = d.data.total;
            s.totalSold = d.data.totalSold;
            (s.auctionData).forEach(function (a) {
                a.dateClaimLimit = new Date(new Date(a.DateTimeLimit).setHours(24 * 3));
                
            });
            console.log(s.auctionData)
        });
    }

    function rateProduct(itemid) {
        h.get("../api/products/rateProduct?str=" + itemid).then(function (d) {
            if (d.data != false) {
                s.ratingTempArr = d.data;
            }
            else {
                swal("Please Input Number!","","error");
            }
        });
    }

    $("#item").kendoComboBox({
        dataTextField: "value",
        dataValueField: "value",
        dataSource: [
            { value: 10 },
            { value: 15 },
            { value: 20 },
            { value: 25 },
            { value: 30 },
            { value: 35 },
            { value: 40 },
            { value: 45 },
            { value: 50 }
        ],
        change: function (e) {
            var value = this.value();
            rateProduct(value);
        }
    });

    s.searchProd = function () {
        s.auctionlastId = 0;
        s.auctionData = [];
        getAuctionedData()
    }

    s.claimAuction = function (id) {
        h.put("../api/AuctionItems/claimAuction?id=" + id).then(function (d) {
            s.auctionlastId = 0;
            s.auctionData = [];
            getAuctionedData()
        });

    }

    s.notClaimAuction = function (id) {
        h.put("../api/AuctionItems/notClaimAuction?id=" + id).then(function (d) {
            getAuctionedData()
        });
    }
}])
