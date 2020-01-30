app.controller('personMgt', ['$scope', '$http', function (s, r) {
    s.name = "testdis";
    s.alldata;
    s.alldata = [];
    s.isLoading = false;
    s.add = false;
    s.update = false;
    var lastId = 0;
    s.xdata = null;
    s.sdata = "";
    loaddata();



    s.testsearch = function () {
        lastId = 0;
        s.alldata = [];
        loaddata()
    }

    function loaddata() {
        s.isLoading = true;
        r.get("../api/EmployeesInfoes/?id=" + lastId + "&key=" + s.sdata)
         .then(function (d) {
             console.log(d.data)

             angular.forEach(d.data, function (v, key) {
                 v.Bdate = new Date(parseInt(v.Bdate.substr(6)))
             })


             s.alldata = s.alldata.concat(d.data)
             s.isLoading = false;
             if (d.data.length > 0) {
                 lastId = d.data[d.data.length - 1].recNo;
             }
         })
    }



    s.rdata = function () {
        s.add = true;
        s.update = false;
        $("#pMgt").modal("show");
    }

    s.addEmp = function () {
        console.log(s.add)
        console.log(s.update)
        console.log(s.adata);
        if (s.add == true) {
            r.post("../api/EmployeesInfoes", s.adata)
        .then(function (d) {
            lastId = 0;
            s.alldata = [];
            loaddata();
            swal({
                title: 'success',
                text: 'Role added successfully!',
                type: 'success'
            }).then(function () {
                $('#pMgt').modal('hide');
            })
            console.log(d.data);
        })
        } if (s.update == true) {
            r.put("../api/EmployeesInfoes/EmployeeschangeName", s.adata)
        .then(function (d) {
            if (d.data == "success") {
                lastId = 0;
                s.alldata = [];
                loaddata();
                swal({
                    title: 'Success',
                    text: 'Role name updated successfully!',
                    type: 'success'
                }).then(function () {
                    $('#pMgt').modal('hide');
                })
            }
            else {
                alert('You an error')
            }
        })
        }
        s.adata = {};
        s.add = false;
        s.update = false;
    }


    s.refresh = function () {
        s.adata = {};
        s.add = false;
        s.update = false;
        s.alldata = [];
        lastId = 0;
        loaddata();
    }

   

    s.editName = function (data) {
        s.adata = data;
        s.add = false;
        s.update = true;
        console.log(s.adata)
        $("#pMgt").modal("show");
    }

    s.openModal = function (odata) {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            showLoaderOnConfirm: true,
            preConfirm: function () {
                r.put("../api/EmployeesInfoes/EmployeesDeleteName", odata)
                .then(function (d) {
                    if (d.data == "Done") {
                        sweettest();

                    }
                })
            }
        })
    }

    function sweettest() {
        s.alldata = [];
        lastId = 0;
        loaddata();
        swal(" ", "Deleted", "success");
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
            if (!s.isLoading) {
                loaddata();
            }
        }
    });
}]);