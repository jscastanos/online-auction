
var app = angular.module("app", [
    "kendo.directives","angucomplete","smart-table",
    "jcs-autoValidate",
    "kendo.directives"
]);

app.run([
                'validator',
                function (validator) {
                    validator.setValidElementStyling(false);
                }]);
app.run([
    'defaultErrorMessageResolver',
    function (defaultErrorMessageResolver) {
        // passing a culture into getErrorMessages('fr-fr') will get the culture specific messages
        // otherwise the current default culture is returned.
        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
            errorMessages['phoneError'] = 'Please enter 11 digit numbers, starts with (09).';
            errorMessages['name'] = 'Names can only contain letters, (.), (-) and spaces.';
            errorMessages['date'] = 'Please enter a valid date. Format (mm/dd/yyyy).';
            errorMessages['xname'] = 'Extension Names can only contain letters and (.).';
            errorMessages['minAmout'] = 'Minimum amount is {0}.';
            errorMessages['minLength'] = 'Minimum value is {0}.';
            errorMessages['payment'] = 'Please select payment method.';
        });
    }
]);
app.run([
    'bootstrap3ElementModifier',
    function (bootstrap3ElementModifier) {
        bootstrap3ElementModifier.enableValidationStateIcons(false);
    }]);
app.filter('dateFilter', ['$filter', function ($filter) {
    return function (input, format) {
        return input ? $filter('date')(new Date(parseInt(input.substr(6))), format) : '';
    }
}])

app.filter('absolute', ['$filter', function () {
    return function (num) { return Math.abs(num); }
}]);


