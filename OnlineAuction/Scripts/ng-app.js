
var app = angular.module("app", [
    "kendo.directives","angucomplete"
]);

app.filter('dateFilter', ['$filter',function ($filter) {
    return function (input, format) {
        return input ? $filter('date')(new Date(parseInt(input.substr(6))), format) : '';
    }
}])