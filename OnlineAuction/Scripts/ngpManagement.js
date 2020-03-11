app.controller('personMgt', ['$scope', '$http', function (s, r) {
    s.name = "testdis";
    s.alldata;
    s.alldata = [];
    s.isLoading = false;
 
    var lastId = 0;
    s.sdata = "";
    loaddata();
    s.branchId = "";


    s.testsearch = function () {
        lastId = 0;
        s.alldata = [];
        loaddata()
    }
    
    function loaddata() {
        s.branchId = localStorage.getItem("branchID")

        s.isLoading = true;
        r.get("../api/EmployeesInfoes/?id=" + lastId + "&key=" + s.sdata + "&branchId=" + s.branchId)
         .then(function (d) {
             
             angular.forEach(d.data, function (v, key) {
                 v.Bdate = new Date((v.Bdate).split('T')[0])
                 if(v.MiddleName != null)
                     v.ConcatName = v.FirstName + " " + v.MiddleName.slice(0, 1) + ". " + v.LastName;
                 else
                     v.ConcatName = v.FirstName + " " + v.LastName;

                 
                 
             })

             
             s.alldata = s.alldata.concat(d.data)
             s.isLoading = false;
             if (d.data.length > 0) {
                 lastId = d.data[d.data.length - 1].recNo;
             }
         })
    }



    s.rdata = function () {
        //$("#pMgt").modal("show");
    }

    s.saveUOF = function (selected) {
        console.log(selected)
        r.put("../api/EmployeesInfoes/EmployeeschangeName", selected)
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

                    $('#Edit').modal('hide');
                })
            }
            else {
                alert('You an error')
            }
        })
        }
    


    s.addEmp = function (adata) {
        console.log(adata);
        adata.BranchId = $("#branchID").val();

        r.post("../api/EmployeesInfoes", adata)
    .then(function (d) {
        lastId = 0;
        s.alldata = [];
        loaddata();
        swal({
            title: 'success',
            text: 'Personel added successfully!',
            type: 'success'
        }).then(function () {
            $('#Add').modal('hide');
            $('#fname').val('');
            $('#mname').val('');
            $('#lname').val('');
            $('#bdate').val('');
            $('#addrss').val('');
            $('#position').val('');
        })
        console.log(d.data);
    })
    }



    s.refresh = function () {
        s.add = false;
        s.update = false;
        s.alldata = [];
        lastId = 0;
        loaddata();
    }

    //var date = new Date($('#date-input').val());
    //day = date.getDate();
    //month = date.getMonth() + 1;
    //year = date.getFullYear();

    s.editName = function (data) {
        //data = new Date(parseInt(data.Bdate.substr(6)))
        s.selected = data;
        console.log(s.selected)
        $("#Edit").modal('show');
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