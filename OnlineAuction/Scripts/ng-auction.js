app.controller('auctionManagement', ['$scope', '$http', function (s, h) {

    s.name = "testdis";
    s.title = "Auction Management";
    s.tempArrAuction = {};
    s.filter = {};
    s.auctionlastId = 0;
    s.isLoading = false;
    s.add = true;
    s.update = false;
    s.auctionData = [];
    s.filter.auctionName = "";
    s.strLimit = 50;

    getAuctionedData();

    function getAuctionedData() {
        s.isLoading = true;
        h.get("../api/AuctionItems/auctionData?id=" + s.auctionlastId + "&key=" + s.filter.auctionName).then(function (d) {
            s.isLoading = false;
            if (d.data.length > 0) {
                s.auctionlastId = d.data[d.data.length - 1].rowNum
            }
            console.log(s.auctionlastId)
            s.auctionData = s.auctionData.concat(d.data);
        });
    }

    s.searchProd = function () {
        s.auctionlastId = 0;
        s.auctionData = [];
        getAuctionedData()
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
            if (!s.isLoading) {
                getAuctionedData();
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

    s.dateFormat = function (date) {
        var data = new Date(date);
        return moment(date).format("MMMM DD,YYYY hh:mm a");
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

    s.removeAuction = function (id) {
        h.put("../api/AuctionItems/auctionStatusRemove?id=" + id).then(function (d) {
            s.auctionlastId = 0;
            s.auctionData = [];
            getAuctionedData();
            
        });
    }
    s.reAuction = function () {
        var date = new Date($("#auctionpicker").val());

        s.tempArrAuction.ProductId = s.reAuctionID;
        s.tempArrAuction.DateTimeLimit = date;

        h.post("../api/AuctionItems", s.tempArrAuction).then(function (d) {
           
            h.put("../api/AuctionItems/reauctionStatus?id=" + s.reAuctionintID).then(function (d) {
                s.tempArrAuction = {};
                s.auctionlastId = 0;
                s.auctionData = [];
                getAuctionedData();
                $("#auctionProduct").modal("hide");
            })
        });
    }

    s.reAuctionModal = function (id, intID) {
        s.reAuctionintID = intID;
        s.reAuctionID = id
        $("#auctionProduct").modal("show");
    }
}])
