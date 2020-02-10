$(function () {
    $(".sidebar-main-toggle").click()
});

app.controller("managementCtrl", ["$scope", "$http", function (s, h) {
    s.url = "../api/bidders/";
    //bidders list
    s.loadBidders = function () {
        h.get(s.url).then(function (d) {
            s.biddersList = d.data;
            console.log(d.data)
        });
    }

    s.loadBidders();

    //save bidder
    s.saveBidder = function (flag) {
        if (flag) {
            h.put(s.url + s.bidders.recNo, s.bidders).then(function (d) {
                modalOpt("branchModal", "hide");
            });
        } else {
            h.post(s.url, s.bidders).then(function (d) {
                modalOpt("branchModal", "hide");
            });
        }
    }

    //get bidder by id
    s.bidderAction = function (id) {
        if (flag) { // update
            h.get(s.url + id).then(function (d) {
                s.bidders = d.data;
                modalOpt("biddersModal", "show");
            });
        } else {
            var con = confirm("Are you sure you want to delete?");
            if (con) {
                h.delete(s.url + id).then(function (d) {
                    alert("Congratulations! You have successfully deleted.");
                });
            } else {
                return false;
            }
        }
    }

    function modalOpt(selector, opt) {
        $("#" + selector + "").modal(opt);
        s.loadBidders();
    }
}]);

