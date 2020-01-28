
app.controller("roles", function ($scope, $http, $interval){

    if (window.location.hash) {
        var hash = window.location.hash;
        $(hash).modal('toggle');
    }

    $scope.passData = function (data) {
        $scope.returnData = data;
    }

    $scope.getUsers = function () {
        $('#userList').block({ message: null });
        $http.post("../Management/getUsers").then(function (d) {
            $scope.users = d.data;
            $('#userList').unblock();
        });
    }


    $scope.getRoles = function () {
        $('#roleList').block({ message: null });
        $http.post("../Management/getRoles").then(function (d) {
            $scope.roles = d.data;
            $('#roleList').unblock();
        });
    }

    $interval($scope.getRoles(), 60000);
    $interval($scope.getUsers(), 60000);

    $scope.saveRole = function () {
        $('#newRoleForm').block({ message: null });
        $http.post("../Management/newRole", { userRole: $scope.role }).then(function (d) {
            if (d.data.atype == "success") {
                $('#newRole').modal('hide');
                $scope.role = null;
                $scope.errorBody = null;
            } else {
                $scope.errorBody = d.data.abody;
            }
            $('#newRoleForm').unblock();
            $scope.getRoles();
        });
    }


    $scope.removeRole = function (i, r, d) {
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
                $scope.getRoles();
            });
        });

       
    }

    $scope.updateRole = function (i, d) {
        $('#editRoleForm').block({ message: null });
        $('#r' + i).block({ message: null });
        $http.post("../Management/updateRole", { userRole: d }).then(function (d) {
            if (d.data.atype == "success") {
                $scope.errorBody = null;
                $('#editRole').modal('hide');
                $scope.role = null;
                swal(d.data.ahead, d.data.abody, d.data.atype);
            } else {
                $scope.errorBody = d.data.abody;
            }
            $('#editRoleForm').unblock();
            $('#r' + i).unblock();
        });
    }

    $scope.setUserRole = function (i, r, d) {
        $('#setRoleForm').block({ message: null });
        $('#u' + i + r).block({ message: null });
        $http.post("../Management/setUserRole", { userRole: d }).then(function (d) {
            
            if (d.data.atype == 'success') {
                $('#setRole').modal('hide');
            }
            swal(d.data.ahead, d.data.abody, d.data.atype);
            $('#setRoleForm').unblock();
            $('#u' + i + r).unblock();
            $scope.getUsers();
        });
    }
   
});