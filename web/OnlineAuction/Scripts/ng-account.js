app.controller("Registration", ["$scope", "$http", function (s, h) {

    s.addCom = function (d) {

        if (d != undefined) {
            console.log(d)
            if (d.Username != undefined && d.Password != undefined) {

                console.log("b")
                h.post("../api/account/register", d).then(function (res) {

                    if (res.status == 200) {
                        swal({
                            title: 'Account Created!',
                            text: "You will be redirect in 3s, if redirection fails please click 'Go to Login' button",
                            type: 'success',
                        });

                        setTimeout(function () {
                            window.location.href = "../"
                        }, 3000)
                    }
                }, function (error) {
                    swal({
                        title: 'Error',
                        text: "Username name exist",
                        type: 'error',
                    })
                })

            } else {
                s.error = "ERROR PLEASE PROVIDE USERNAME AND PASSWORD";
            }

        }
    }

}]);