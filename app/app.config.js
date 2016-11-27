angular.module('humani-techApp').config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.when('/about', {
            template: '<about></about>'
        }).when('/projects', {
            template: '<projects></projects>'
        }).when('/project', {
            template: '<project></project>'
        }).when('/events', {
            template: '<events></events>'
        }).when('/event', {
            template: '<event></event>'
        }).when('/meet-the-team', {
            template: '<meet-the-team></meet-the-team>'
        }).when('/join', {
            template: '<join></join>'
        }).when('/contact', {
            template: '<contact></contact>'
        }).otherwise('/about');


        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }

]);