
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
            s.getMenu();
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

    s.passData = function (data) {
        s.returnData = data;
    }

    s.getMenu = function () {
        $('#parentMenus').block({ message: null });
        $http.post("../Management/getMenu").then(function (d) {
            s.parentMenus = d.data;
            $('#parentMenus').unblock();
        });
    }

    s.getChildMenu = function () {
        $('#childMenus').block({ message: null });
        $http.post("../Management/getChildMenu").then(function (d) {
            s.childMenus = d.data;
            $('#childMenus').unblock();
        });
    }

    $interval(s.getMenu(), 60000);
    $interval(s.getChildMenu(), 60000);

    s.linkToParent = function (id, menu) {
        $('#L' + id).block({ message: null });
        $('#linktoParentForm').block({ message: null });
        $http.post("../Management/linkToParent", {menu: menu}).then(function (d) {
            swal(d.data.ahead, d.data.abody, d.data.atype);
            s.getMenu();
            s.getChildMenu();
            $('#linkToParent').modal('hide');
            $('#L' + id).unblock();
            $('#linktoParentForm').unblock();
        });
    }

    s.newChild= function (child) {
        $('#newChildForm').block({ message: null });
        $http.post("../Management/newChild", { child: child }).then(function (d) {
            if (d.data.atype == "success") {
                $('#newChild').modal('hide');
                s.child = null;
                s.errorBody = null;
            } else {
                s.errorBody = d.data.abody;
            }
            $('#newChildForm').unblock();
            s.getChildMenu();
        });
    }

    s.updateChild = function (id, child) {
        $('#L' + id).block({ message: null });
        $('#updateChildForm').block({ message: null });
        $http.post("../Management/updateChild", { child: child }).then(function (d) {
            if (d.data.atype == "success") {
                $('#updateChild').modal('hide'); swal(d.data.ahead, d.data.abody, d.data.atype);
                s.child = null;
                s.errorBody = null;
            } else {
                s.errorBody = d.data.abody;
            }
            $('#L' + id).unblock();
            $('#updateChildForm').unblock();
        });
    }

    s.removeChild = function (id, d) {
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
                s.getChildMenu();
            });
        });


    }



    s.newParent = function (parent) {
        $('#newParentForm').block({ message: null });
        $http.post("../Management/newParent", { parent: parent }).then(function (d) {
            if (d.data.atype == "success") {
                $('#newParent').modal('hide');
                s.parent = null;
                s.errorBody = null;
            } else {
                s.errorBody = d.data.abody;
            }
            $('#newParentForm').unblock();
            s.getMenu();
        });
    }

    s.updateParent = function (id, parent) {
        $('#' + id).block({ message: null });
        $('#updateParentForm').block({ message: null });
        parent.menuGroupIcon = s.newIcon;
        $http.post("../Management/updateParent", { parent: parent }).then(function (d) {
            if (d.data.atype == "success") {
                $('#updateParent').modal('hide'); swal(d.data.ahead, d.data.abody, d.data.atype);
                s.parent = null;
                s.errorBody = null;
            } else {
                s.errorBody = d.data.abody;
            }
            s.getMenu();
            $('#' + id).unblock();
            $('#updateParentForm').unblock();
        });
    }

    s.removeParent = function (id, d) {
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
                s.getMenu();
            });
        });


    }

    s.unlinkToFParent = function (id, menu, parent) {
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
                s.getMenu();
                s.getChildMenu();
            });
        });


    }

   
});