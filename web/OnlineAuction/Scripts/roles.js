
app.controller("roles", function ($scope, $http, $interval){

    if (window.location.hash) {
        var hash = window.location.hash;
        $(hash).modal('toggle');
    }

    s.passData = function (data) {
        s.returnData = data;
    }

    s.getUsers = function () {
        $('#userList').block({ message: null });
        $http.post("../Management/getUsers").then(function (d) {
            s.users = d.data;
            $('#userList').unblock();
        });
    }


    s.getRoles = function () {
        $('#roleList').block({ message: null });
        $http.post("../Management/getRoles").then(function (d) {
            s.roles = d.data;
            $('#roleList').unblock();
        });
    }

    $interval(s.getRoles(), 60000);
    $interval(s.getUsers(), 60000);

    s.saveRole = function () {
        $('#newRoleForm').block({ message: null });
        $http.post("../Management/newRole", { userRole: s.role }).then(function (d) {
            if (d.data.atype == "success") {
                $('#newRole').modal('hide');
                s.role = null;
                s.errorBody = null;
            } else {
                s.errorBody = d.data.abody;
            }
            $('#newRoleForm').unblock();
            s.getRoles();
        });
    }


    s.removeRole = function (i, r, d) {
        swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this data!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
        function () {
            $('#r' + i + r).block({ message: null });
            $http.post("../Management/removeRole", { userRole: d }).then(function (d) {
                $('#r' + i + r).unblock();
                swal(d.data.ahead, d.data.abody, d.data.atype);
                s.getRoles();
            });
        });

       
    }

    s.updateRole = function (i, d) {
        $('#editRoleForm').block({ message: null });
        $('#r' + i).block({ message: null });
        $http.post("../Management/updateRole", { userRole: d }).then(function (d) {
            if (d.data.atype == "success") {
                s.errorBody = null;
                $('#editRole').modal('hide');
                s.role = null;
                swal(d.data.ahead, d.data.abody, d.data.atype);
            } else {
                s.errorBody = d.data.abody;
            }
            $('#editRoleForm').unblock();
            $('#r' + i).unblock();
        });
    }

    s.setUserRole = function (i, r, d) {
        $('#setRoleForm').block({ message: null });
        $('#u' + i + r).block({ message: null });
        $http.post("../Management/setUserRole", { userRole: d }).then(function (d) {
            
            if (d.data.atype == 'success') {
                $('#setRole').modal('hide');
            }
            swal(d.data.ahead, d.data.abody, d.data.atype);
            $('#setRoleForm').unblock();
            $('#u' + i + r).unblock();
            s.getUsers();
        });
    }
   
});