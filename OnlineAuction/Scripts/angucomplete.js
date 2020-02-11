/**
 * Angucomplete
 * Autocomplete directive for AngularJS
 * By Daryl Rowland
 */

angular.module('angucomplete', [] )
    .directive('angucomplete', function ($parse, $http, $sce, $timeout, $rootScope) {
    return {
        restrict: 'EA',
        scope: {
            "id": "@id",
            "placeholder": "@placeholder",
            "selectedObject": "=selectedobject",
            "url": "@url",
            "dataField": "@datafield",
            "titleField": "@titlefield",
            "descriptionField": "@descriptionfield",
            "imageField": "@imagefield",
            "imageUri": "@imageuri",
            "inputClass": "@inputclass",
            "parentclass": "@parentclass",
            "userPause": "@pause",
            "localData": "=localdata",
            "searchFields": "@searchfields",
            "minLengthUser": "@minlength",
            "matchClass": "@matchclass",
            "tableRef": "@tableref",
            "searchStr": "@searchstr",
            "selectedvalue": "=selectedvalue",
            "selectedvaluefield": "@selectedvaluefield",
            "searchvar": "@searchvar",
            "newitemurl": "@newitemurl",
            "required": "=require",
            "icon": "=icon",
            "allowAdd": "=allowAdd"
        },
        replace: true,
        template: '<div class="input-group {{parentclass}}">'
    +'<input autocomplete="off" ng-required="{{required}}" style="width:100%" id="{{id}}_value" ng-model="searchStr" type="text" placeholder="{{placeholder}}" class="{{inputClass}}" onmouseup="this.select();" ng-focus="resetHideResults()" ng-blur="hideResults()" />'
    
    +'<div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-if="showDropdown">'
        + '<div class="angucomplete-searching" ng-show="searching">Searching...</div>'
        +'<div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)">'
            +'No results found'
            + '<span ng-if="allowAdd" class="btn btn-link text-primary" ng-click="addThis()">Add <strong id="searchStr">{{searchStr}}</strong> to list.</span>'
        +'</div>'
        +'<div class="angucomplete-row" ng-repeat="result in results" ng-mousedown="selectResult(result)" ng-mouseover="hoverRow()" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}">'
            +'<div ng-if="imageField" class="angucomplete-image-holder">'
                +'<img ng-if="result.image && result.image != \'\'" ng-src="{{result.image}}" class="angucomplete-image" />'
                +'<div ng-if="!result.image && result.image != \'\'" class="angucomplete-image-default"></div>'
            +'</div><div class="angucomplete-title" ng-if="matchClass" ng-bind-html="result"></div><div class="angucomplete-title text-uppercase" ng-if="!matchClass">{{ result.title }}</div>'
            +'<div ng-if="result.description && result.description != \'\'" class="angucomplete-description">{{result.description}}</div>'
        +'</div>'
    +'</div>'
    +'<span class="input-group-addon"><i class="icon-search4"></i></span>'
+'</div>',

        link: function($scope, elem, attrs) {
            s.lastSearchTerm = null;
            s.currentIndex = null;
            s.justChanged = false;
            s.searchTimer = null;
            s.hideTimer = null;
            s.searching = false;
            s.pause = 500;
            s.minLength = 1;
            //s.searchStr = null;

            if (s.minLengthUser && s.minLengthUser != "") {
                s.minLength = s.minLengthUser;
            }

            if (s.userPause) {
                s.pause = s.userPause;
            }

            isNewSearchNeeded = function(newTerm, oldTerm) {
                return newTerm.length >= s.minLength && newTerm != oldTerm
            }

            s.processResults = function(responseData, str) {
                if (responseData && responseData.length > 0) {
                    s.results = [];

                    var titleFields = [];
                    if (s.titleField && s.titleField != "") {
                        titleFields = s.titleField.split(",");
                    }

                    for (var i = 0; i < responseData.length; i++) {
                        // Get title variables
                        var titleCode = [];

                        for (var t = 0; t < titleFields.length; t++) {
                            titleCode.push(responseData[i][titleFields[t]]);
                        }

                        var description = "";
                        if (s.descriptionField) {
                            description = responseData[i][s.descriptionField];
                        }

                        var imageUri = "";
                        if (s.imageUri) {
                            imageUri = s.imageUri;
                        }

                        var image = "";
                        if (s.imageField) {
                            image = imageUri + responseData[i][s.imageField];
                        }

                        var text = titleCode.join(' ');
                        if (s.matchClass) {
                            var re = new RegExp(str, 'i');
                            var strPart = text.match(re)[0];
                            text = $sce.trustAsHtml(text.replace(re, '<span class="'+ s.matchClass +'">'+ strPart +'</span>'));
                        }

                        var resultRow = {
                            title: text,
                            description: description,
                            image: image,
                            originalObject: responseData[i]
                        }

                        s.results[s.results.length] = resultRow;
                    }


                } else {
                    s.results = [];
                }
            }

            s.addThis = function () {
                var data = {};
                data[s.searchvar] = s.searchStr;
                $http.post(s.newitemurl, {d : data}).then(function (d) {
                    s.selectedvalue = d.data[s.selectedvaluefield];
                })
            }


            s.searchTimerComplete = function(str) {
                // Begin the search
                if (str.length >= s.minLength) {
                    if (s.localData) {
                        var searchFields = s.searchFields.split(",");
                        var matches = [];
                        for (var i = 0; i < s.localData.length; i++) {
                            var match = false;
                            for (var s = 0; s < searchFields.length; s++) {
                                match = match || (typeof s.localData[i][searchFields[s]] === 'string' && typeof str === 'string' && s.localData[i][searchFields[s]].toLowerCase().indexOf(str.toLowerCase()) >= 0);
                            }

                            if (match) {
                                matches[matches.length] = s.localData[i];
                            }
                        }

                        s.searching = false;
                        s.processResults(matches, str);

                    } else {
                        $http.post(s.url, { key: str }).
                            //success(function(responseData, status, headers, config) {
                            //    s.searching = false;
                            //    s.processResults(((s.dataField) ? responseData[s.dataField] : responseData ), str);
                            //}).
                            //error(function(data, status, headers, config) {
                        //});
                        then(function (responseData, status, headers, config) {
                            s.searching = false;
                            s.processResults(((s.dataField) ? responseData.data[s.dataField] : responseData.data), str);
                        })
                    }
                }
            }

            s.hideResults = function() {
                s.hideTimer = $timeout(function() {
                    s.showDropdown = false;
                }, s.pause);
            };

            s.resetHideResults = function () {
                if (s.hideTimer) {
                    $timeout.cancel(s.hideTimer);
                };
            };

            s.hoverRow = function(index) {
                s.currentIndex = index;
            }

            s.keyPressed = function (event) {
                s.selectedvalue = null;
                if (!(event.which == 38 || event.which == 40 || event.which == 13)) {
                    if (!s.searchStr || s.searchStr == "") {
                        s.showDropdown = false;
                        s.lastSearchTerm = null
                    } else if (isNewSearchNeeded(s.searchStr, s.lastSearchTerm)) {
                        s.lastSearchTerm = s.searchStr
                        s.showDropdown = true;
                        s.currentIndex = -1;
                        s.results = [];

                        if (s.searchTimer) {
                            $timeout.cancel(s.searchTimer);
                        }

                        s.searching = true;

                        s.searchTimer = $timeout(function() {
                            s.searchTimerComplete(s.searchStr);
                        }, s.pause);
                    }
                } else {
                    event.preventDefault();
                }
            }


            s.selectResult = function (result) {
                if (s.matchClass) {
                    result.title = result.title.toString().replace(/(<([^>]+)>)/ig, '');
                }
                s.searchStr = s.lastSearchTerm = result.title;
                s.selectedObject = result;
                console.log(result.originalObject[s.selectedvaluefield]);
                s.selectedvalue = result.originalObject[s.selectedvaluefield];
                s.showDropdown = false;
                s.results = [];
                //s.$apply();
            }

            var inputField = elem.find('input');

            inputField.on('keyup', s.keyPressed);

            elem.on("keyup", function (event) {
                if(event.which === 40) {
                    if (s.results && (s.currentIndex + 1) < s.results.length) {
                        s.currentIndex ++;
                        s.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    }

                    s.$apply();
                } else if(event.which == 38) {
                    if (s.currentIndex >= 1) {
                        s.currentIndex --;
                        s.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    }

                } else if (event.which == 13) {
                    if (s.results && s.currentIndex >= 0 && s.currentIndex < s.results.length) {
                        s.selectResult(s.results[s.currentIndex]);
                        s.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    } else {
                        s.results = [];
                        s.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    }

                } else if (event.which == 27) {
                    s.results = [];
                    s.showDropdown = false;
                    s.$apply();
                } else if (event.which == 8) {
                    //s.selectedObject = null;
                    s.$apply();
                }
            });

        }
    };
});

