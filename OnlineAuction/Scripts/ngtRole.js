app.controller('tManagement', ['$scope', '$http', function (s, r) {
    s.name = "checked";
    s.alldata;
    s.alldata = [];
    s.isLoading = false;
    var lastId = 0;
    s.xdata = null;
    s.sdata = "";
    s.selected = {};
    loaddata();


    s.testsearch = function () {
        lastId = 0;
        s.alldata = [];
        loaddata()
    }

    function loaddata() {
        s.isLoading = true;
        r.get("../api/UserManagements/?id=" + lastId + "&key=" + s.sdata)
         .then(function (d) {
             console.log(d.data);

             angular.forEach(d.data, function (v, key) {
                 v.DateCreated = new Date(v.DateCreated)
             })
             
             s.alldata = s.alldata.concat(d.data)
             s.isLoading = false;
             if (d.data.length > 0) {
                 lastId = d.data[d.data.length - 1].recNo;
             }
             console.log(s.alldata);
         })
    }

    function loadposition() {
        r.get("../api/UserManagements/UsersRoles")
        .then(function (d) {
            console.log(d.data);
            s.newItem = d.data;
        })
    }

    s.newItem = [];
    s.rdata = function () {
        loadposition()
        if (s.newItem == null) {
            swal({
                title: 'No user',
                text: 'Please Add Personel at Record Management',
                type: 'error'
            })
        } else {
            $('#Add').modal('show');
        }
      
    }

    s.addUsr = function (adata, empdata) {
        if (empdata == null) {
            swal({
                title: 'Missing',
                text: 'Incomplete details!',
                type: 'error'
            })
        } else {
            adata.UsersId = empdata;
        }
      
        console.log(adata);
            r.post("../api/UserManagements", adata)
        .then(function (d) {
            lastId = 0;
            s.alldata = [];
            loaddata();
            if (d.data == "exist") {
                swal({
                    title: 'exist',
                    text: 'this person is already registered!',
                    type: 'error'
                })
            } if (d.data == "good") {
                swal({
                    title: 'success',
                    text: 'Account updated successfully!',
                    type: 'success'
                }).then(function () {
                    $('#Add').modal('hide');
                })
            }

        })
        
    }
    //s.selected = {};
    s.saveUOF = function (selected) {
        s.selected = selected
        console.log(s.selected)
        r.put("../api/UserManagements/uRolechangeName", s.selected)
        .then(function (d) {
            console.log(d.data)
            if (d.data == "success") {
                lastId = 0;
                s.alldata = [];
                loaddata();
                swal({
                    title: 'Success',
                    text: 'Role name updated successfully!',
                    type: 'success'
                }).then(function () {

                    $('#Edit').modal('hide');
                })
            }
            else {
                alert('You an error')
            }
        })
    }


    s.refresh = function () {
        s.add = false;
        s.update = false;
        s.alldata = [];
        lastId = 0;
        loaddata();
    }



    s.editName = function (data) {
        loadposition()
        s.selected = data;
        $("#Edit").modal("show");
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