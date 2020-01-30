app.controller('tManagement', ['$scope', '$http', function (s, r) {

    s.name = "testdis";


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
        s.add = true;
        s.update = false;
        $("#tMgt").modal("show");
    }

    s.addUsr = function (empdata) {
       
        if (s.add == true) {
            s.adata.UsersId = empdata;
            r.post("../api/UserManagements", s.adata)
        .then(function (d) {
            lastId = 0;
            s.alldata = [];
           // loaddata();
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
                    $('#tMgt').modal('hide');
                })
            }
            console.log(d.data);
        })
        }
    }


}]);