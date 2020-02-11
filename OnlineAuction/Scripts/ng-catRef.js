app.controller('categoryRef', ['$scope', '$http', function (s, h) {

    s.name = "Category";
    s.add = true;
    s.update = false;
    s.isLoading = false;
    s.categoryData = [];
    s.tempArr = {};
    s.filter = {};
    s.lastId = 0;
    s.filter.catName = "";

    s.scrollToTop = function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow', function () {
        });
    }

    getCatData();

    function getCatData() {
        s.isLoading = true;

        h.get("../api/Category?id=" + s.lastId + "&key=" + s.filter.catName).then(function (d) {
            s.isLoading = false;
            if (d.data.length > 0) {
                s.lastId = d.data[d.data.length - 1].rowNum
            }
            s.categoryData = s.categoryData.concat(d.data);
        });
    }

    s.addCat = function () {

        if (s.add == true) {
            h.post("../api/category", s.tempArr).then(function (d) {
                s.tempArr = {};
                s.categoryData = [];
                s.lastId = 0;
                swal("Successfully Save !", "", "success")
                $("#newCat").modal("hide");
                getCatData();
            });
        }
        else {
            h.put("../api/category/" + s.updateCatID, s.tempArr).then(function (d) {
                s.tempArr = {};
                s.categoryData = [];
                s.lastId = 0;
                swal("Successfully Update !", "", "success")
                $("#newCat").modal("hide");
                getCatData();

                s.add = true;
                s.update = false;
            });

          
        }
       
    }

    s.updateCat = function (id) {
        s.updateCatID = id;
        h.get("../api/category/" + id).then(function (d) {
            s.tempArr = d.data;
            s.add = false;
            s.update = true;
            $("#newCat").modal("show");
        });

    }

    s.removeCat = function (id) {
        h.put("../api/category/removeCat?id=" + id).then(function (d) {
            s.lastId = 0;
            s.categoryData = [];
            swal("Successfully Removed !","","success")
            getCatData()

        });
    }
}])
