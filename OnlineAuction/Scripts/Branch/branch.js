$(function () {
    $(".sidebar-main-toggle").click()
});

app.controller("managementCtrl", ["$scope", "$http", "$timeout", function (s, h, t) {
    s.url = "../api/branch/";
    s.submitButton = true;
    //load branch
    s.loadBranch = function () {
        s.status = "Loading Data...";
        s.statusDescription = "Waiting for data to be loaded...";
        h.get(s.url).then(function (d) {
            s.branchList = d.data;
            if (!d.data.length != 0) {
                t(function () {
                    s.status = "No data";
                    s.statusDescription = "No data has been loaded";
                }, 30000);
            }
            console.log(d.data);
        });
    }

    s.loadBranch();

    //save branch
    //flag 1 update 0 save
    s.saveBranch = function (flag) {
        if (flag) {
            h.put(s.url + s.branch.recNo, s.branch).then(function (d) {
                swal("Success", "Data has been successfully failed!");
                s.modalOpt("branchModal", "hide");
                s.branch = null;
            });
        } else {
            h.post(s.url, s.branch).then(function (d) {
                swal("Success", "Data has been successfully failed!");
                s.modalOpt("branchModal", "hide");
            });
        }

    }
    //branch action edit and delete
    s.branchAction = function (id, flag) {
        if (flag) { // update
            s.submitButton = false;
            h.get(s.url + id).then(function (d) {
                s.branch = d.data;
                s.modalOpt("branchModal", "show");
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

    s.createBranch = function () {
        s.submitButton = true;
    }

    s.sort = function (flag) {
        if (flag === 1) {
            h.get("../api/branch?flag=" + flag + "").then(function (d) {
                s.branchList = d.data;
            });
        } else {
            h.get("../api/branch?flag=" + flag + "").then(function (d) {
                s.branchList = d.data;
            });
        }
    }

    s.modalOpt = function (selector, opt) {
        $("#" + selector + "").modal(opt);
        s.loadBranch();
    }

}]);
