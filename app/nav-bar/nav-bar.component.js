angular.module('navBar').component('navBar', {
    templateUrl: 'nav-bar/nav-bar.template.html',

    controller: ['$scope', '$location', function navBarController($scope, $location) {
        var self = this;
        updateNavBar($location, self);

        $scope.$on('$routeChangeSuccess', function () {
            updateNavBar($location, self);
        });
    }

    ]
});

function updateNavBar(location, self) {
    self.path = location.path();
    self.url = location.url();
    self.projects = /projects$/.test(self.path);
    self.project = /project$/.test(self.path);
    self.events = /events$/.test(self.path);
    self.event = /event$/.test(self.path);
    self.meetTheTeam = /meet-the-team$/.test(self.path);
    self.join = /join$/.test(self.path);
    self.contact = /contact$/.test(self.path);
    self.about = /about$/.test(self.path);
}