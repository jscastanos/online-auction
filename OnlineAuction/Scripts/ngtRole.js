app.controller('tManagement', ['$scope', '$http', function (s, r) {
    s.name = " ";
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

    function switchery() {
        if (Array.prototype.forEach) {
            var elems = Array.prototype.slice.call(document.querySelectorAll('.switchery'));
            elems.forEach(function (html) {
                var switchery = new Switchery(html);
            });
        }
        else {
            var elems = document.querySelectorAll('.switchery');
            for (var i = 0; i < elems.length; i++) {
                var switchery = new Switchery(elems[i]);
            }
        }
    }

    function loaddata() {
        s.isLoading = true;
        r.get("../api/UserManagements/?id=" + lastId + "&key=" + s.sdata)
         .then(function (d) {
             console.log(d.data);

             angular.forEach(d.data, function (v, key) {
                 v.DateCreated = new Date(v.DateCreated)
               //  v.conName = v.nameFirst + " " + v.nameMiddle.slice(0, 1) + ". " + v.nameLast;
             })

             s.alldata = s.alldata.concat(d.data)
             s.isLoading = false;
             if (d.data.length > 0) {
                 lastId = d.data[d.data.length - 1].recNo;
             }
            console.log(s.alldata);
             setTimeout(function () {

                 switchery()
             }, 10)
         })
    }
    s.switchID = {}
    s.cStatus = function (Sstatus) {
        s.switchID = Sstatus
        console.log(s.switchID)
        r.put("../api/UserManagements/sStatus", s.switchID)

        .then(function (d) {
            s.alldata = [];
            lastId = 0;
            loaddata();
            console.log(d.data)
        })
    }

    function loadposition() {
        r.get("../api/UserManagements/GetAllPosition")
        .then(function (d) {
            s.newItem = d.data;
            //console.log(s.newItem)
        })
    }

    function loadpersonel() {
        r.get("../api/UserManagements/Personel")
        .then(function (d) {
            s.personelCount = d.data;
            // console.log(s.personelCount)
        })
    }

    // s.personelCount = null;
    s.newItem = [];
    s.rdata = function () {
        loadposition()
        //if (s.newItem == 0) {
        //    swal({
        //        title: 'No Role',
        //        text: 'Please Add Role at Control Panel',
        //        type: 'error'
        //    })

        //}
        //else {
            $('#Add').modal('show');
       // }
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
        if (d.data == "no user") {
            swal({
                title: 'Personel not recognize',
                text: 'Please see personel at Record Management!',
                type: 'error'
            })
        }
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
                $('#usrnm').val('');
                $('#psswrd').val('');
                //  $('#slctrole').reset();
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
                s.newItem = [];
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
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
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