$(function () {
    $(".sidebar-main-toggle").click()
});

app.controller("adminCtrl", ["$scope", "$http", "$timeout", function (s, h, t) {
    s.url = "../api/Bidders/";
    s.first = true;
    s.grid = true;
    s.facing = "Front";

    s.loadBidders = function () {
        s.status = "Loading Data...";
        s.statusDescription = "Waiting for data to be loaded...";
        h.get(s.url).then(function (d) {
            s.biddersList = d.data;
            if (!d.data.length != 0) {
                t(function () {
                    s.status = "No data";
                    s.statusDescription = "No data has been loaded";
                }, 30000);
            }
        });
    }

    s.loadBidders();

    //show modal and information
    s.viewInfo = function (id, flag) {
        $("#viewInfoModal").modal("show");

        h.get(s.url + id).then(function (d) {
            s.biddersInfo = d.data;
        });
        if (flag) {
            s.verifiedButton = true;
        }
    }

    //verify bidder
    s.verify = function (bidder, f, m, l) {
        swal({
            title: "Are you sure?",
            text: " ",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, Verify",
            confirmButtonColor: "#2196F3",
            closeOnConfirm: false
        },
        function () {
            h.put("../api/bidders?id=" + bidder).then(function (d) {
                swal("Verified!", f.concat(' ', m, ' ', l, ' has been verified.'), "success");
                $("#viewInfoModal").modal("hide");
                s.loadBidders();
            });
        });
    }

    //sort: verified/not verified
    s.sort = function (flag) {
        if (flag === 1) {
            h.get("../api/bidders?flag=" + flag + "").then(function (d) {
                s.biddersList = d.data;
            });
        } else {
            h.get("../api/bidders?flag=" + flag + "").then(function (d) {
                s.biddersList = d.data;
            });
        }
    }

    s.sliderButton = function (a) {
        if (a) {
            s.first = false;
            s.facing = "Back";
            $("#sliderRight").attr("disabled", "disabled");
            $("#sliderLeft").removeAttr("disabled");
        } else {
            s.first = true;
            s.facing = "Front";
            $("#sliderLeft").attr("disabled", "disabled");
            $("#sliderRight").removeAttr("disabled");

        }
    }

    s.modalOpt = function (selector, opt) {
        $("#" + selector + "").modal(opt);
        s.loadBranch();
    }

}]);
