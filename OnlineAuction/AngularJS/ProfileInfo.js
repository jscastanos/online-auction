app.controller("profileCtrl", function ($scope, $http, $filter) {

    var _s = $scope;
    var _h = $http;

    _s.editMode = 0;
    _s.personalData = [];
    _s.data_personnel = [];
    _s.isLoading = 0;
    showUsers();
    function showUsers(){
        loader("loaderJS");
        _s.isLoading = 1;
        _h.post("../Profile/showUsers").then(function (d) {
            _s.data_personnel = _s.data_personnel.concat(d.data);
        
            _s.isLoading = 0;
            $("#loaderJS").unblock();
            angular.forEach(d.data, function (d) {
                var obj = {
                    personID: d.personID,
                    name: d.personalName
                }
                _s.personalData.push(obj);
            });
            console.log(d.data)
            
        })
    }
    _s.cmdSave = function () {
   
        _h.post("../Profile/savePersonnel", { s: _s.s }).then(function (d) {
            new PNotify({
                addclass: 'bg-success',
                text: 'Saved Successfully',
                icon: 'icon-checkmark3',
                type: 'success',
                delay:1000
            });
            showUsers();
            $('#drModal').modal('hide');
            console.clear()
        })
           
    }
    _s.addUser = function () {
        if(_s.editMode == 1) {
            _s.cmdUpdate();

        }
        else {
            _s.cmdSave();

        }
    }
    _s.cmdUpdateView = function (per) {
        _s.s = per
        _s.editMode = 1
    }
    _s.fEditMode = function () {
        console.log("add ni siya")
        _s.s = {};
        _s.editMode = 0;
    }
    _s.cmdUpdate = function (per) {
        console.log("sadas")
        _h.post("../Profile/updatePerson", { p: _s.s }).then(function (d) {
            $('#drModal').modal('hide');
            new PNotify({
                addclass: 'bg-success',
                text: 'Updated Successfully',
                icon: 'icon-checkmark3',
                type: 'success',
                delay:1000
            });
            showUsers();
            _s.s = {};
        })
          
        
    }

    function searchPersonnel(a) {
        _h.post("../Profile/searchPersonnel", { a: a }).then(function (d) {
            _s.data_personnel = d.data;
        })
    }

    var obj2 = {
        name:'water'
    }
    $('#typeahead_3').typeahead({
        source: _s.personalData,
    });
    var $input = $("#typeahead_3");
    $input.change(function () {
        var current = $input.typeahead("getActive");
        if (current) {
            if (current.name == $input.val()) {
                searchPersonnel(current.personID);
                _s.personalData = [];
            }
        }

    });
    _s.clearSearch = function () {
        if (_s.txtSearch == "") {
            _h.post("initCookie").then(function (d){
                _s.personalData = [];
                _s.data_personnel = []
                showUsers();
            })
        }
    }


    //
    const video = document.getElementById("video"),
          canvas = document.getElementById("canvas"),
          capture = document.getElementById("capture");
    _s.captureImage = function(captureID) {
        _s.capID = captureID;
        video.play();
        video.style.display = "";
        //set the flag 0 for capture image
        $(".video-wrap").show();
        $("#openCamera").modal("show");
        $("#captureImageText").hide();//hide capture image text

        //loading animation while waiting for the webcam
        $("#loadingDot").text("");
        $(".video-wrap").append("<div style='font-size: 20px;' id='loadingOnVW'>Please wait! This may take a while<span id='loadingDot'></span></div>");
        setInterval(function() {
            var loadingDot = $("#loadingDot");
            loadingDot.append(".");

            if(loadingDot.text().length > 3) {
                $("#loadingDot").text(null);
            }
        }, 500);
        //constraints for user media
        const constraints = {
            audio: false,
            video: {
                width: 1280, height: 720
            }
        };
        // Access webcam
        async function init() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                handleSuccess(stream);
            } catch (e) {
                errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
            }
        }
        // Success
        function handleSuccess(stream) {
            $("#loadingOnVW").remove();
            $("#capture").show();
            window.stream = stream;
            video.srcObject = stream;
        }
        // Load init
        init();
        // Draw image
        var context = canvas.getContext('2d');
        context.webkitImageSmoothingEnabled = true;
        context.mozImageSmoothingEnabled = true;
        context.imageSmoothingEnabled = true;
        
        _s.capture = function () {
            _s.editMode = "";
            context.drawImage(video, 0, 0, 350, canvas.height);
            $("#imgCrop").empty();
            let img = document.createElement("img");
            img.id = "image";
            img.src = canvas.toDataURL('image/png');
            $("#imgCrop").append(img);
            
            $("#image").cropper({
                aspectRatio: 1,
                viewMode: 1
            });
            setTimeout(function() {
                $("#profileCrop").modal('show');
            }, 500);

            $("#openCamera").modal('hide');
            $("#profileCrop").modal("show");
        }
    }

    _s.cropImages = function() {
        var resultImg = $("#image").cropper("getCroppedCanvas", {
            width: 300,
            height: 300,
            imageSmoothingQuality: 'high'
        }).toDataURL("image/png");
        $("#"+_s.capID+"").attr("src", resultImg);
        _h.post("../Profile/uploadIMG", {id: _s.capID, image: resultImg});
        //reader.readAsDataURL(blob);

        //reader.onload = function (e) {
        //    var base64data = e.target.result;
        //    //$("#"+_s.capID+"").val(base64data.split(',')[1]);
        //}
        var resultImg = "";
        $("#profileCrop").modal("hide");
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 50) {
            if (!_s.isLoading) {
                showUsers();
            }
        }
    });
});
