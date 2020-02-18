app.controller('rManagement', ['$scope', '$http', function (s, r) {

    s.name = "testdis";

    
    s.alldata;
    s.alldata = [];
    s.isLoading = false;
    s.add = false;
    s.update = false;
    var lastId = 3;
    s.xdata = null;
    s.sdata = "";
    loaddata();
    

    s.testsearch = function () {
        lastId = 3;
        s.alldata = [];
        loaddata()
    }

    function loaddata() {
        s.isLoading = true;
        r.get("../api/UsersRole?id=" + lastId + "&key=" + s.sdata)
         .then(function (d) {
             console.log(d.data)

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
        $("#theRole").modal("show");
    }
    
    s.addRole = function () {
        console.log(s.add)
        console.log(s.update)
        console.log(s.adata);
        if (s.add == true) {
            r.post("../api/UsersRole", s.adata)
        .then(function (d) {
            lastId = 3;
            s.alldata = [];
            loaddata();
            swal({
                title: 'success',
                text: 'Role added successfully!',
                type: 'success'
            }).then(function () {
                $('#theRole').modal('hide');
            })
            console.log(d.data);
        })
        } if(s.update == true){
            r.put("../api/UsersRole/RolechangeName", s.adata)
        .then(function (d) {
            if (d.data == "success") {
                lastId = 3;
                s.alldata = [];
                loaddata();
                swal({
                    title: 'Success',
                    text: 'Role name updated successfully!',
                    type: 'success'
                }).then(function () {
                    $('#theRole').modal('hide');
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
        lastId = 3;
        loaddata();
    }


    function sweettest() {
        s.alldata = [];
        lastId = 3;
        loaddata();
        swal(" ", "Deleted", "success");
    }


    s.editName = function (data) {
        s.adata = data;
        s.add = false;
        s.update = true;
        console.log(s.adata)
        $("#theRole").modal("show");
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
            if (!s.isLoading) {
                loaddata();
            }
        }
    });


    s.openModal = function (odata) {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            showLoaderOnConfirm: true,
            preConfirm: function () {
                r.put("../api/UsersRole/RoleDeleteName", odata)
                .then(function (d) {
                    if (d.data == "Done") {
                        sweettest();
                        
                    }
                })
            }
        })
    }

    

}]);



