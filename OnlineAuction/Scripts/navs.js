
app.controller("navs", function ($scope, $http, $interval){

    $(document).ready(function () {

       
        $(".sortable").on("sortstop", function (event, ui) {
            var itemOrder = $('.sortable').sortable("toArray");
            for (var i = 0; i < itemOrder.length; i++) {
                $http.post("../Management/updateParentOrder", { orderNo: i, menuCode: itemOrder[i] }).then(function (d) {
                    console.log(d.data);
                });
            }
        });

        $(".sortable-child").on("sortstop", function (event, ui) {
            var itemOrder = $('.sortable-child').sortable("toArray");
            var groupCode = "";
            for (var i = 0; i < itemOrder.length; i++) {
                groupCode = itemOrder[i];
                $http.post("../Management/updateChildOrder", { orderNo: i, refCode: itemOrder[i] }).then(function (d) {
                    console.log(d.data);
                });
            }
            $scope.getMenu();
            $("#smn" + groupCode.substring(6)).collapse('show');
        });

        $(".sortable").sortable({
            containment: "parent",
            items: "> li",
            handle: "[data-action=move]",
            tolerance: "pointer",
            cursor: "move",
            opacity: 0.7,
            revert: 300,
            delay: 150,
            dropOnEmpty: true,
            placeholder: "movable-placeholder",
            start: function (e, ui) {
                ui.placeholder.height(ui.helper.outerHeight());
            }
        });

        $(".sortable-child").sortable({
            containment: "parent",
            items: ".child-menu",
            handle: "[data-action=move]",
            tolerance: "pointer",
            cursor: "move",
            opacity: 0.7,
            revert: 300,
            delay: 150,
            dropOnEmpty: true,
            placeholder: "movable-placeholder",
            start: function (e, ui) {
                ui.placeholder.height(ui.helper.outerHeight());
            }
        });


       

    })

    if (window.location.hash) {
        var hash = window.location.hash;
        $(hash).modal('toggle');
    }

    $scope.passData = function (data) {
        $scope.returnData = data;
    }

    $scope.getMenu = function () {
        $('#parentMenus').block({ message: null });
        $http.post("../Management/getMenu").then(function (d) {
            $scope.parentMenus = d.data;
            $('#parentMenus').unblock();
        });
    }

    $scope.getChildMenu = function () {
        $('#childMenus').block({ message: null });
        $http.post("../Management/getChildMenu").then(function (d) {
            $scope.childMenus = d.data;
            $('#childMenus').unblock();
        });
    }

    $interval($scope.getMenu(), 60000);
    $interval($scope.getChildMenu(), 60000);

    $scope.linkToParent = function (id, menu) {
        $('#L' + id).block({ message: null });
        $('#linktoParentForm').block({ message: null });
        $http.post("../Management/linkToParent", {menu: menu}).then(function (d) {
            swal(d.data.ahead, d.data.abody, d.data.atype);
            $scope.getMenu();
            $scope.getChildMenu();
            $('#linkToParent').modal('hide');
            $('#L' + id).unblock();
            $('#linktoParentForm').unblock();
        });
    }

    $scope.newChild= function (child) {
        $('#newChildForm').block({ message: null });
        $http.post("../Management/newChild", { child: child }).then(function (d) {
            if (d.data.atype == "success") {
                $('#newChild').modal('hide');
                $scope.child = null;
                $scope.errorBody = null;
            } else {
                $scope.errorBody = d.data.abody;
            }
            $('#newChildForm').unblock();
            $scope.getChildMenu();
        });
    }

    $scope.updateChild = function (id, child) {
        $('#L' + id).block({ message: null });
        $('#updateChildForm').block({ message: null });
        $http.post("../Management/updateChild", { child: child }).then(function (d) {
            if (d.data.atype == "success") {
                $('#updateChild').modal('hide'); swal(d.data.ahead, d.data.abody, d.data.atype);
                $scope.child = null;
                $scope.errorBody = null;
            } else {
                $scope.errorBody = d.data.abody;
            }
            $('#L' + id).unblock();
            $('#updateChildForm').unblock();
        });
    }

    $scope.removeChild = function (id, d) {
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
            $('#L' + id).block({ message: null });
            $http.post("../Management/deleteChild", { child: d }).then(function (d) {
                $('#L' + id).unblock();
                swal(d.data.ahead, d.data.abody, d.data.atype);
                $scope.getChildMenu();
            });
        });


    }



    $scope.newParent = function (parent) {
        $('#newParentForm').block({ message: null });
        $http.post("../Management/newParent", { parent: parent }).then(function (d) {
            if (d.data.atype == "success") {
                $('#newParent').modal('hide');
                $scope.parent = null;
                $scope.errorBody = null;
            } else {
                $scope.errorBody = d.data.abody;
            }
            $('#newParentForm').unblock();
            $scope.getMenu();
        });
    }

    $scope.updateParent = function (id, parent) {
        $('#' + id).block({ message: null });
        $('#updateParentForm').block({ message: null });
        parent.menuGroupIcon = $scope.newIcon;
        $http.post("../Management/updateParent", { parent: parent }).then(function (d) {
            if (d.data.atype == "success") {
                $('#updateParent').modal('hide'); swal(d.data.ahead, d.data.abody, d.data.atype);
                $scope.parent = null;
                $scope.errorBody = null;
            } else {
                $scope.errorBody = d.data.abody;
            }
            $scope.getMenu();
            $('#' + id).unblock();
            $('#updateParentForm').unblock();
        });
    }

    $scope.removeParent = function (id, d) {
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
            $('#' + id).block({ message: null });
            $http.post("../Management/deleteParent", { parent: d }).then(function (d) {
                $('#' + id).unblock();
                swal(d.data.ahead, d.data.abody, d.data.atype);
                $scope.getMenu();
            });
        });


    }

    $scope.unlinkToFParent = function (id, menu, parent) {
        swal({
            title: "Unlink "+ menu.menuName +" to "+ parent.menuGroupName+"?",
            text: "Your can still link " + menu.menuName + " to " + parent.menuGroupName + " later",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, Unlink it!",
            closeOnConfirm: false
        },
        function () {
            $('#' + id).block({ message: null });
            $http.post("../Management/unlinkToParent", { menu: menu, parent: parent }).then(function (d) {
                $('#' + id).unblock();
                swal(d.data.ahead, d.data.abody, d.data.atype);
                $scope.getMenu();
                $scope.getChildMenu();
            });
        });


    }

   
});